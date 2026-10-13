/**
 * config.js - Configuração de Credenciais do Mercado Pago
 * 
 * Quando o Juca criar a conta no Mercado Pago:
 * 1. Acessar: https://mercadopago.com.br/developers/panel
 * 2. Criar aplicação "Pizza do Juca" → Checkout Bricks
 * 3. Colar as chaves abaixo
 */

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
};
