@echo off
chcp 65001 >nul
echo ====================================================================
echo   TEIXO AI - PUBLICAR NO CLOUDFLARE PAGES (marmitasfit.pages.dev)
echo ====================================================================
echo.
echo [1/2] Sincronizando arquivos atualizados do TeixoAI...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$src = '%~dp0site'; $dst = 'C:\Users\rhena\Downloads\MARMITASFIT_CLOUDFLARE_PAGES'; Get-ChildItem -Path $src -File | Where-Object { $_.Extension -notin @('.bat', '.ps1', '.md') } | Copy-Item -Destination $dst -Force"

echo.
echo [2/2] Enviando para o Cloudflare Pages...
bunx wrangler pages deploy "C:\Users\rhena\Downloads\MARMITASFIT_CLOUDFLARE_PAGES" --project-name=marmitasfit

echo.
echo ====================================================================
echo   CONCLUIDO! ACESSE EM: https://marmitasfit.pages.dev
echo ====================================================================
pause
