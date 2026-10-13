# ====================================================================
#   TEIXO OS - GERADOR AUTOMATICO DE LOJAS DE DELIVERY (POWERSHELL)
# ====================================================================

param (
    [Parameter(Mandatory=$true)]
    [string]$Nome,

    [Parameter(Mandatory=$false)]
    [ValidateSet("hamburgueria", "pizzaria", "pastelaria", "lanchonete", "acaiteria")]
    [string]$Nicho = "hamburgueria",

    [Parameter(Mandatory=$false)]
    [string]$Bairro = "Zona Oeste",

    [Parameter(Mandatory=$false)]
    [string]$WhatsApp = "5521999999999",

    [Parameter(Mandatory=$false)]
    [int]$Porta = 3001
)

$RootDir = Split-Path -Parent $PSScriptRoot
$TemplateDir = Join-Path $RootDir "templates\delivery-store"
$PresetPath = Join-Path $TemplateDir "presets\$Nicho.json"
$TargetDir = Join-Path $RootDir "clientes\$Nome"

if (-not (Test-Path $PresetPath)) {
    Write-Host "Erro: Preset $Nicho nao encontrado em $PresetPath" -ForegroundColor Red
    exit 1
}

$preset = Get-Content $PresetPath -Raw -Encoding UTF8 | ConvertFrom-Json

Write-Host ""
Write-Host " [TEIXO] Clonando ecossistema de delivery para: '$Nome' ($($preset.segment))..." -ForegroundColor Cyan

# 1. Criar pasta de destino
if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
}

# 2. Copiar estrutura da matriz
$itemsToCopy = Get-ChildItem -Path $TemplateDir -Exclude "presets", "node_modules"
foreach ($item in $itemsToCopy) {
    Copy-Item -Path $item.FullName -Destination $TargetDir -Recurse -Force
}

# 3. Customizar index.html
$indexPath = Join-Path $TargetDir "index.html"
if (Test-Path $indexPath) {
    $content = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("Pizza do Juca", $Nome)
    $content = $content.Replace("Pizzaria Artesanal", $preset.segment)
    $content = $content.Replace("pizzaria artesanal", $preset.segment.ToLower())
    $content = $content.Replace("pizzas artesanais", "$($preset.segment.ToLower()) e delícias")
    $content = $content -replace "Paci[eê]ncia", $Bairro
    $cleanWhats = $WhatsApp -replace '\D', ''
    $content = $content.Replace("5521973142264", $cleanWhats)

    # Injetar produtos e upsell do nicho
    $productsJson = $preset.products | ConvertTo-Json -Depth 5
    $upsellJson = $preset.upsell | ConvertTo-Json -Depth 5

    $content = $content -replace 'const allProducts = \[[\s\S]*?\];', "const allProducts = $productsJson;"
    $content = $content -replace 'const UPSELL_CATALOG = \[[\s\S]*?\];', "const UPSELL_CATALOG = $upsellJson;"

    # Substituir cores tematicas
    if ($preset.theme.primary) {
        $content = $content.Replace("#b23a26", $preset.theme.primary)
        $content = $content.Replace("#2f4a32", $preset.theme.accent)
    }

    [System.IO.File]::WriteAllText($indexPath, $content, [System.Text.Encoding]::UTF8)
}

# 4. Customizar Painel de Pedidos
$pedidosPath = Join-Path $TargetDir "painel\pedidos\index.html"
if (Test-Path $pedidosPath) {
    $content = [System.IO.File]::ReadAllText($pedidosPath, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("Pizza do Juca", $Nome)
    $kitchen = if ($preset.kitchenSector) { $preset.kitchenSector } else { "COZINHA" }
    $content = $content.Replace("COZINHA / FORNO", $kitchen)
    [System.IO.File]::WriteAllText($pedidosPath, $content, [System.Text.Encoding]::UTF8)
}

# 5. Customizar Painel de Produtos
$produtosPath = Join-Path $TargetDir "painel\produtos\index.html"
if (Test-Path $produtosPath) {
    $content = [System.IO.File]::ReadAllText($produtosPath, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("Pizza do Juca", $Nome)
    [System.IO.File]::WriteAllText($produtosPath, $content, [System.Text.Encoding]::UTF8)
}

# 5.1 Customizar Rastreio do Pedido
$rastreioPath = Join-Path $TargetDir "rastreio\index.html"
if (Test-Path $rastreioPath) {
    $content = [System.IO.File]::ReadAllText($rastreioPath, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("Pizza do Juca", $Nome)
    $content = $content.Replace("5521973142264", $cleanWhats)
    [System.IO.File]::WriteAllText($rastreioPath, $content, [System.Text.Encoding]::UTF8)
}

# 6. Customizar Backend API
$serverPath = Join-Path $TargetDir "backend-api\server.js"
if (Test-Path $serverPath) {
    $content = [System.IO.File]::ReadAllText($serverPath, [System.Text.Encoding]::UTF8)
    $content = $content.Replace("Pizza do Juca", $Nome)
    [System.IO.File]::WriteAllText($serverPath, $content, [System.Text.Encoding]::UTF8)
}

# 7. Criar CLAUDE.md do cliente
$claudeMdContent = @"
# $Nome - Operacao de Delivery TeixoAI

> Loja configurada automaticamente pelo Clonador TeixoOS (/clonar-loja).

- **Nicho:** $($preset.segment)
- **Localizacao:** $Bairro, Rio de Janeiro - RJ
- **WhatsApp:** $WhatsApp
- **Modelo Comercial:** Taxa de conveniencia R$ 0,67 por pedido no checkout.
- **Porta Backend API:** $Porta

## Estrutura da Loja
- \`index.html\` - Cardapio digital oficial (Storefront com Checkout Bricks Mercado Pago e Turbo Upsell).
- \`rastreio/\` - Pagina publica de acompanhamento ao vivo do pedido para o cliente.
- \`painel/pedidos/\` - Central de Pedidos Kanban com Fechamento Noturno de Motoboys, Economiometro Teixo vs iFood e Notinhas Dual ($($preset.kitchenSector)).
- \`painel/produtos/\` - Gerenciador de cardapio com Acoes em Massa e Destaque da Casa.
- \`backend-api/\` - API REST Express + SQLite WAL para pedidos, carrinhos abandonados e Mercado Pago.
"@
[System.IO.File]::WriteAllText((Join-Path $TargetDir "CLAUDE.md"), $claudeMdContent, [System.Text.Encoding]::UTF8)

# 8. Criar script de deploy rapido
$cleanSlug = $Nome.ToLower() -replace '\s+', '-'
$deployBatContent = @"
@echo off
chcp 65001 >nul
echo Sincronizando $Nome com a VPS...
scp -P 22022 -r "%~dp0index.html" root@143.95.174.216:/usr/share/nginx/html/$cleanSlug/
pause
"@
[System.IO.File]::WriteAllText((Join-Path $TargetDir "atualizar-vps.bat"), $deployBatContent, [System.Text.Encoding]::UTF8)

Write-Host "==============================================================" -ForegroundColor Green
Write-Host " LOJA CLONADA COM SUCESSO!" -ForegroundColor Green
Write-Host " Pasta do Cliente: clientes\$Nome\" -ForegroundColor Green
Write-Host " Nicho: $($preset.segment) ($($preset.products.Count) produtos carregados)" -ForegroundColor Green
Write-Host " Checkout: Mercado Pago Bricks com modo demonstracao pronto" -ForegroundColor Green
Write-Host " Notinhas: Cozinha ($($preset.kitchenSector)) + Balcao" -ForegroundColor Green
Write-Host "==============================================================" -ForegroundColor Green
Write-Host ""
