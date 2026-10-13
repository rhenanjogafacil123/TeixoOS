/**
 * gerar-delivery.js - Gerador Automático de Lojas de Delivery TeixoOS
 * 
 * Uso via linha de comando ou via skill /clonar-loja:
 * node scripts/gerar-delivery.js --nome "Burguer da Vila" --nicho "hamburgueria" --bairro "Campo Grande" --whatsapp "21977778888"
 */

const fs = require('fs');
const path = require('path');

// 1. Processar argumentos da linha de comando
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    nome: '',
    nicho: 'hamburgueria',
    bairro: 'Zona Oeste',
    cidade: 'Rio de Janeiro - RJ',
    endereco: '',
    whatsapp: '5521999999999',
    porta: 3001
  };

  for (let i = 0; i < args.length; i++) {
    const key = args[i].replace(/^--/, '');
    const val = args[i + 1];
    if (val && !val.startsWith('--')) {
      params[key] = val;
      i++;
    }
  }

  return params;
}

const params = parseArgs();

if (!params.nome) {
  console.log(`
==============================================================
🍕 TEIXO CLONADOR DE LOJAS - USO:
==============================================================
node scripts/gerar-delivery.js --nome "Nome da Loja" --nicho "hamburgueria" --bairro "Bairro" --whatsapp "21999999999"

Nichos disponíveis:
  - hamburgueria
  - pizzaria
  - pastelaria
  - lanchonete
  - acaiteria
==============================================================
`);
  process.exit(1);
}

const ROOT_DIR = path.resolve(__dirname, '..');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'templates', 'delivery-store');
const PRESET_PATH = path.join(TEMPLATE_DIR, 'presets', `${params.nicho}.json`);
const TARGET_DIR = path.join(ROOT_DIR, 'clientes', params.nome);

if (!fs.existsSync(PRESET_PATH)) {
  console.error(`❌ Erro: Preset para nicho '${params.nicho}' não encontrado em templates/delivery-store/presets/`);
  process.exit(1);
}

const preset = JSON.parse(fs.readFileSync(PRESET_PATH, 'utf-8'));

console.log(`\n🚀 [TEIXO] Clonando loja para: "${params.nome}" (Nicho: ${preset.segment})...`);

// 2. Criar diretório do cliente
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 3. Copiar recursivamente a matriz de arquivos
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'presets' || entry.name === 'node_modules') continue;
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursiveSync(TEMPLATE_DIR, TARGET_DIR);

// 4. Customizar index.html (Storefront)
const indexPath = path.join(TARGET_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');

  // Substituir títulos e descrições
  indexContent = indexContent.replace(/Pizza do Juca/g, params.nome);
  indexContent = indexContent.replace(/Paciência – RJ/g, `${params.bairro} – RJ`);
  indexContent = indexContent.replace(/Paciência/g, params.bairro);
  indexContent = indexContent.replace(/5521973142264/g, params.whatsapp.replace(/\D/g, ''));

  // Injetar catálogo de produtos do nicho no script
  const productsJson = JSON.stringify(preset.products, null, 2);
  const upsellJson = JSON.stringify(preset.upsell, null, 2);

  // Substitui lista de produtos e upsell padrão
  indexContent = indexContent.replace(
    /const allProducts = \[[\s\S]*?\];/,
    `const allProducts = ${productsJson};`
  );

  indexContent = indexContent.replace(
    /const UPSELL_CATALOG = \[[\s\S]*?\];/,
    `const UPSELL_CATALOG = ${upsellJson};`
  );

  // Ajustar tema de cores Tailwind no index.html
  if (preset.theme) {
    indexContent = indexContent.replace(/#b23a26/g, preset.theme.primary);
    indexContent = indexContent.replace(/#2f4a32/g, preset.theme.accent);
  }

  fs.writeFileSync(indexPath, indexContent, 'utf-8');
}

// 5. Customizar Painel de Pedidos (Kanban e Notinhas Térmicas)
const pedidosPath = path.join(TARGET_DIR, 'painel', 'pedidos', 'index.html');
if (fs.existsSync(pedidosPath)) {
  let pedidosContent = fs.readFileSync(pedidosPath, 'utf-8');
  pedidosContent = pedidosContent.replace(/Pizza do Juca/g, params.nome);
  pedidosContent = pedidosContent.replace(/COZINHA \/ FORNO/g, preset.kitchenSector || 'COZINHA');
  fs.writeFileSync(pedidosPath, pedidosContent, 'utf-8');
}

// 6. Customizar Painel de Produtos
const produtosPath = path.join(TARGET_DIR, 'painel', 'produtos', 'index.html');
if (fs.existsSync(produtosPath)) {
  let produtosContent = fs.readFileSync(produtosPath, 'utf-8');
  produtosContent = produtosContent.replace(/Pizza do Juca/g, params.nome);
  fs.writeFileSync(produtosPath, produtosContent, 'utf-8');
}

// 7. Customizar backend-api (server.js, config.js)
const serverPath = path.join(TARGET_DIR, 'backend-api', 'server.js');
if (fs.existsSync(serverPath)) {
  let serverContent = fs.readFileSync(serverPath, 'utf-8');
  serverContent = serverContent.replace(/Pizza do Juca/g, params.nome);
  fs.writeFileSync(serverPath, serverContent, 'utf-8');
}

// 8. Criar CLAUDE.md do cliente com o mapa da loja
const claudeMdContent = `# ${params.nome} — Operação de Delivery TeixoAI

> Loja configurada automaticamente pelo Clonador TeixoOS (/clonar-loja).

- **Nicho:** ${preset.segment}
- **Localização:** ${params.bairro}, ${params.cidade}
- **WhatsApp:** ${params.whatsapp}
- **Modelo Comercial:** Taxa de conveniência R$ 0,67 por pedido no checkout.
- **Porta Backend API:** ${params.porta}

## Estrutura da Loja
- \`index.html\` — Cardápio digital oficial (Storefront com Checkout Bricks Mercado Pago).
- \`painel/pedidos/\` — Central de Pedidos Kanban com Notinhas Térmicas Dual (${preset.kitchenSector}).
- \`painel/produtos/\` — Gerenciador de cardápio com Ações em Massa e Destaque da Casa.
- \`backend-api/\` — API REST Express + SQLite WAL para pedidos e Mercado Pago.
`;
fs.writeFileSync(path.join(TARGET_DIR, 'CLAUDE.md'), claudeMdContent, 'utf-8');

// 9. Criar script de deploy rápido para a VPS
const deployBatContent = `@echo off
chcp 65001 >nul
echo Sincronizando ${params.nome} com a VPS...
scp -P 22022 "%~dp0index.html" root@143.95.174.216:/usr/share/nginx/html/${params.nome.toLowerCase().replace(/\\s+/g, '-')}/
pause
`;
fs.writeFileSync(path.join(TARGET_DIR, 'atualizar-vps.bat'), deployBatContent, 'utf-8');

console.log(`\n==============================================================`);
console.log(`✅ LOJA CRIADA COM SUCESSO!`);
console.log(`📁 Pasta: clientes/${params.nome}/`);
console.log(`🍔 Nicho: ${preset.segment} (${preset.products.length} produtos carregados)`);
console.log(`💳 Checkout: Mercado Pago Bricks com modo demonstração pronto`);
console.log(`🖨️ Notinhas: Cozinha (${preset.kitchenSector}) + Balcão`);
console.log(`==============================================================\n`);
