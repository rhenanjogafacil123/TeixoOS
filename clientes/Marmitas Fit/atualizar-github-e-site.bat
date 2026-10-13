@echo off
chcp 65001 >nul
echo ====================================================================
echo   TEIXO AI - ATUALIZAR REPOSITORIO & SITE (MARMITAS FIT)
echo ====================================================================
echo.
echo [1/2] Sincronizando arquivos da Marmitas Fit...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$src = '%~dp0site'; $dst = 'C:\Users\rhena\Downloads\marmitasfit'; Get-ChildItem -Path $src -File | Copy-Item -Destination $dst -Force"

echo.
echo [2/2] Enviando para o GitHub oficial (Cloudflare Pages sincroniza sozinho)...
cd /d "C:\Users\rhena\Downloads\marmitasfit"
git add .
git commit -m "Atualiza cardapio e painel operacional Marmitas Fit"
git push origin main

echo.
echo ====================================================================
echo   SUCESSO! GITHUB ATUALIZADO.
echo   A Cloudflare Pages detecta o commit e atualiza em 10 segundos!
echo ====================================================================
pause
