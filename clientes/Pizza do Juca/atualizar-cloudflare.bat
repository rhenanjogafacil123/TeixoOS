@echo off
chcp 65001 >nul
echo ====================================================================
echo   TEIXO AI - PUBLICAR NO CLOUDFLARE PAGES (pizzadojuca.pages.dev)
echo ====================================================================
echo.
echo [1/2] Sincronizando arquivos atualizados do TeixoAI...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$src = '%~dp0'; $dst = 'C:\Users\rhena\Downloads\PIZZADOJUCA_CLOUDFLARE_PAGES'; if (-not (Test-Path $dst)) { New-Item -ItemType Directory -Path $dst | Out-Null }; Get-ChildItem -Path $src -File | Where-Object { $_.Extension -notin @('.bat', '.ps1', '.md') } | Copy-Item -Destination $dst -Force; @('assets', 'cardapio', 'menu', 'painel', 'politica-privacidade', 'rastreio') | ForEach-Object { if (Test-Path (Join-Path $src $_)) { Copy-Item (Join-Path $src $_) -Destination $dst -Recurse -Force } }"

echo.
echo [2/2] Enviando para o Cloudflare Pages...
bunx wrangler pages deploy "C:\Users\rhena\Downloads\PIZZADOJUCA_CLOUDFLARE_PAGES" --project-name=pizzadojuca

echo.
echo ====================================================================
echo   CONCLUIDO! ACESSE EM: https://pizzadojuca.pages.dev
echo ====================================================================
pause
