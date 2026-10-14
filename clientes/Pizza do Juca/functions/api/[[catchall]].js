// Cloudflare Pages Function: Proxy transparente de /api/* para a VPS HostGator da Teixo
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const vpsHost = 'http://143.95.174.216';
  const targetUrl = `${vpsHost}${url.pathname}${url.search}`;

  // Clona os headers da requisição original
  const headers = new Headers(context.request.headers);
  headers.set('X-Forwarded-Host', url.hostname);
  headers.set('X-Forwarded-Proto', 'https');

  const requestInit = {
    method: context.request.method,
    headers: headers,
    redirect: 'follow'
  };

  // Se o método aceitar body (POST, PUT, PATCH), envia o corpo
  if (!['GET', 'HEAD'].includes(context.request.method)) {
    requestInit.body = context.request.body;
  }

  try {
    const response = await fetch(targetUrl, requestInit);
    const newHeaders = new Headers(response.headers);
    // Habilitar CORS se necessário
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
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
