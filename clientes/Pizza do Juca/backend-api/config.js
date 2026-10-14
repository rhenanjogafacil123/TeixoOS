const fs = require('fs');
const path = require('path');

// Carregador nativo de variáveis .env (Zero Trust / Sem vazar para o Git)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  } catch (e) {}
}

module.exports = {
  // ===================================================
  // MERCADO PAGO - Substituir pelas chaves reais do Juca
  // ===================================================
  MP_PUBLIC_KEY: process.env.MP_PUBLIC_KEY || 'COLE_AQUI_A_PUBLIC_KEY',
  MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN || 'COLE_AQUI_O_ACCESS_TOKEN',
  
  // Modo: 'sandbox' (testes) ou 'production' (ao vivo)
  MP_MODE: process.env.MP_MODE || 'sandbox',

  // URL pública da VPS (pra receber webhooks do Mercado Pago)
  // Ex: 'https://143.95.174.216' ou 'https://pizzadojuca.com.br'
  BASE_URL: process.env.BASE_URL || 'http://143.95.174.216',

  // Porta do servidor Node
  PORT: process.env.PORT || 3001,

  // Segredo JWT para assinatura de tokens de sessão
  JWT_SECRET: process.env.JWT_SECRET || 'teixo-pizzadojuca-jwt-blindado-2026-auth',

  // E-mail master de acesso global (Superadmin Teixo)
  SUPERADMIN_EMAIL: process.env.SUPERADMIN_EMAIL || 'rhenanteixeira.rj@gmail.com',
};
