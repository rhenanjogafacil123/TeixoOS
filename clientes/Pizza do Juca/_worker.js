/**
 * _worker.js - Cloudflare Pages Advanced Mode
 * Roteia /api/* para a VPS HostGator da Teixo e serve assets estáticos no restante.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Se a requisição for para a API REST
    if (url.pathname.startsWith('/api/')) {
      const vpsHost = 'http://143.95.174.216.sslip.io';
      const targetUrl = `${vpsHost}${url.pathname}${url.search}`;

      const headers = new Headers(request.headers);
      headers.set('X-Forwarded-Host', url.hostname);
      headers.set('X-Forwarded-Proto', 'https');

      const requestInit = {
        method: request.method,
        headers: headers,
        redirect: 'follow'
      };

      if (!['GET', 'HEAD'].includes(request.method)) {
        requestInit.body = request.body;
      }

      try {
        const response = await fetch(targetUrl, requestInit);
        const respHeaders = new Headers(response.headers);
        respHeaders.set('Access-Control-Allow-Origin', '*');
        respHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        respHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: respHeaders
        });
      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Falha de comunicacao com a VPS da Pizza do Juca',
          details: err.message
        }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Para qualquer outra rota ou arquivo estático (HTML, CSS, imagens, etc.)
    return env.ASSETS.fetch(request);
  }
};
