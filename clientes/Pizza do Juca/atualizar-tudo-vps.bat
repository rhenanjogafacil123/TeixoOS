@echo off
chcp 65001 >nul
echo ====================================================================
echo   TEIXO AI - ATUALIZADOR DEFINITIVO DA VPS (PIZZA DO JUCA)
echo ====================================================================
echo.
echo [1/3] Autorizando chave SSH no servidor (digite sua senha do VPS pela ultima vez)...
ssh -p 22022 root@143.95.174.216 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && (grep -qF 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKLu5bU8YuOfzkmfEcWcayl79c1n1XZeYSZtereRdT0d rhena@Rhenan' ~/.ssh/authorized_keys 2>/dev/null || echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKLu5bU8YuOfzkmfEcWcayl79c1n1XZeYSZtereRdT0d rhena@Rhenan' >> ~/.ssh/authorized_keys) && chmod 600 ~/.ssh/authorized_keys"

echo.
echo [2/3] Sincronizando todos os arquivos e telas novas para a VPS...
scp -P 22022 "%~dp0index.html" root@143.95.174.216:/usr/share/nginx/html/index.html
scp -P 22022 -r "%~dp0painel" root@143.95.174.216:/usr/share/nginx/html/

echo.
echo [3/3] Ajustando permissoes do AlmaLinux / Nginx...
ssh -p 22022 root@143.95.174.216 "chmod -R 755 /usr/share/nginx/html && chcon -R -t httpd_sys_content_t /usr/share/nginx/html"

echo.
echo ====================================================================
echo   SUCESSO TOTAL! TUDO ATUALIZADO NA VPS.
echo   A chave permanente foi gravada. A partir de agora, o
echo   Antigravity atualiza tudo automaticamente sem voce precisar
echo   abrir o terminal ou digitar mais nada!
echo ====================================================================
pause
