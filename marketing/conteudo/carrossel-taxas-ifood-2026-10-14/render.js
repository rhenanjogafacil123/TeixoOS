// Script de renderizacao automatizada de slides HTML para PNG 1080x1350 via Playwright
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function renderSlides() {
  const outputDir = path.join(__dirname, 'instagram');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2 // Qualidade Retina ultra nitida
  });

  const htmlPath = 'file://' + path.join(__dirname, 'carrossel.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle' });

  // Aguarda fontes carregarem
  await page.evaluateHandle('document.fonts.ready');

  const slides = await page.$$('.slide');
  console.log(`Encontrados ${slides.length} slides. Iniciando renderizacao...`);

  for (let i = 0; i < slides.length; i++) {
    const slideNumber = String(i + 1).padStart(2, '0');
    const outputPath = path.join(outputDir, `slide-${slideNumber}.png`);
    await slides[i].screenshot({ path: outputPath });
    console.log(`✓ Slide ${slideNumber} salvo em: ${outputPath}`);
  }

  await browser.close();
  console.log('✓ Todos os slides foram renderizados com sucesso em 1080x1350!');
}

renderSlides().catch(err => {
  console.error('Erro ao renderizar slides:', err);
  process.exit(1);
});
