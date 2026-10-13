# ====================================================================
#   TEIXO OS - ATUALIZADOR DEFINITIVO DA VPS (PIZZA DO JUCA)
# ====================================================================

Write-Host "🍕 [1/3] Autorizando chave SSH no servidor (para nunca mais pedir senha)..." -ForegroundColor Cyan
ssh -p 22022 root@143.95.174.216 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && (grep -qF 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKLu5bU8YuOfzkmfEcWcayl79c1n1XZeYSZtereRdT0d rhena@Rhenan' ~/.ssh/authorized_keys 2>/dev/null || echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKLu5bU8YuOfzkmfEcWcayl79c1n1XZeYSZtereRdT0d rhena@Rhenan' >> ~/.ssh/authorized_keys) && chmod 600 ~/.ssh/authorized_keys"

Write-Host "`n🍕 [2/3] Sincronizando todos os arquivos e telas novas para a VPS..." -ForegroundColor Cyan
scp -P 22022 "$PSScriptRoot\index.html" root@143.95.174.216:/usr/share/nginx/html/index.html
scp -P 22022 -r "$PSScriptRoot\painel" root@143.95.174.216:/usr/share/nginx/html/

Write-Host "`n🍕 [3/3] Aplicando permissões do AlmaLinux / Nginx..." -ForegroundColor Cyan
ssh -p 22022 root@143.95.174.216 "chmod -R 755 /usr/share/nginx/html && chcon -R -t httpd_sys_content_t /usr/share/nginx/html"

Write-Host "`n====================================================================" -ForegroundColor Green
Write-Host "  SUCESSO TOTAL! TUDO ATUALIZADO NA VPS." -ForegroundColor Green
Write-Host "  A chave permanente foi gravada. A partir de agora, o" -ForegroundColor Green
Write-Host "  Antigravity atualiza tudo sozinho sem você precisar" -ForegroundColor Green
Write-Host "  abrir o PowerShell ou digitar mais nada!" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Green
Pause
