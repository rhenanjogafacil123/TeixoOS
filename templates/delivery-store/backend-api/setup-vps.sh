#!/bin/bash
# ========================================================
# Script de Configuração do Backend e Banco da Pizza do Juca
# Compatível com AlmaLinux, RHEL, CentOS e Ubuntu/Debian
# ========================================================

set -e

echo "🍕 [1/5] Verificando Node.js e ferramentas..."
if ! command -v node &> /dev/null; then
    echo "Instalando Node.js 20 LTS..."
    if command -v dnf &> /dev/null; then
        curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
        dnf install -y nodejs gcc-c++ make
    elif command -v apt-get &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs build-essential
    fi
else
    echo "Node.js já instalado: $(node -v)"
fi

API_DIR="/var/www/pizzadojuca-api"
HTML_API_DIR="/usr/share/nginx/html/backend-api"

echo "🍕 [2/5] Copiando arquivos do backend para $API_DIR..."
mkdir -p "$API_DIR"
if [ -d "$HTML_API_DIR" ]; then
    cp -r "$HTML_API_DIR"/* "$API_DIR"/
fi

cd "$API_DIR"

echo "🍕 [3/5] Instalando dependências (Express, SQLite)..."
npm install --production

echo "🍕 [4/5] Configurando serviço systemd (inicialização automática)..."
cat << 'EOF' > /etc/systemd/system/pizzadojuca.service
[Unit]
Description=Pizza do Juca REST API & SQLite Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/pizzadojuca-api
ExecStart=/usr/bin/node /var/www/pizzadojuca-api/server.js
Restart=always
RestartSec=5
Environment=PORT=3001
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable pizzadojuca
systemctl restart pizzadojuca

echo "🍕 [5/5] Configurando Nginx e liberando permissões/SELinux..."

# Permissões do site e SELinux (AlmaLinux)
chmod -R 755 /usr/share/nginx/html
chown -R nginx:nginx /usr/share/nginx/html 2>/dev/null || chown -R www-data:www-data /usr/share/nginx/html 2>/dev/null || true
if command -v chcon &> /dev/null; then
    chcon -R -t httpd_sys_content_t /usr/share/nginx/html 2>/dev/null || true
    restorecon -Rv /usr/share/nginx/html 2>/dev/null || true
fi

# Liberar proxy de rede para o Nginx no SELinux
if command -v setsebool &> /dev/null; then
    setsebool -P httpd_can_network_connect 1 2>/dev/null || true
fi

# Configuração de rota /api/ no Nginx
if [ -d "/etc/nginx/default.d" ]; then
    # AlmaLinux / RHEL / CentOS
    cat << 'EOF' > /etc/nginx/default.d/juca-api.conf
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
}
EOF
else
    # Ubuntu / Debian
    NGINX_TARGET="/etc/nginx/conf.d/default.conf"
    if [ ! -f "$NGINX_TARGET" ]; then
        NGINX_TARGET="/etc/nginx/sites-available/default"
    fi

    if [ -f "$NGINX_TARGET" ] && ! grep -q "location /api/" "$NGINX_TARGET"; then
        sed -i '/location \/ {/i \    location /api/ {\n        proxy_pass http://127.0.0.1:3001;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection "upgrade";\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n' "$NGINX_TARGET"
    fi
fi

nginx -t && systemctl reload nginx || systemctl restart nginx

echo "========================================================"
echo "✅ Backend e Painel Configurados com Sucesso!"
echo "📡 Teste local: curl http://127.0.0.1:3001/api/health"
echo "🌐 Teste público: curl http://143.95.174.216/api/health"
echo "🍕 Painel liberado: http://143.95.174.216/painel/"
echo "========================================================"
