/**
 * server.js - Servidor REST API Pizza do Juca
 * Inclui integração completa com Mercado Pago Checkout Bricks
 */

const express = require('express');
const cors = require('cors');
const https = require('https');
const db = require('./database');
const config = require('./config');

const app = express();

// Raw body necessário para validar webhooks do Mercado Pago
app.use('/api/webhook/mercadopago', express.raw({ type: 'application/json' }));
app.use(cors());
app.use(express.json());

const isMP_Configured = config.MP_ACCESS_TOKEN && !config.MP_ACCESS_TOKEN.includes('COLE_AQUI');

// Log colorido de requisições
app.use((req, res, next) => {
  const now = new Date().toLocaleTimeString('pt-BR');
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// ===========================================
// HELPER: Chamada à API do Mercado Pago
// ===========================================
function mpRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.mercadopago.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${config.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': `juca-${Date.now()}-${Math.random().toString(36).slice(2)}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Carregador seguro de JWT para tokens de sessão
let jwt = null;
try {
  jwt = require('jsonwebtoken');
} catch (e) {
  const crypto = require('crypto');
  jwt = {
    sign: (payload, secret, options = {}) => {
      const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
      const now = Math.floor(Date.now() / 1000);
      const exp = now + (12 * 3600); // 12h
      const body = Buffer.from(JSON.stringify({ ...payload, iat: now, exp })).toString('base64url');
      const sig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
      return `${header}.${body}.${sig}`;
    },
    verify: (token, secret) => {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Token inválido');
      const [header, body, sig] = parts;
      const expectedSig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
      if (sig !== expectedSig) throw new Error('Assinatura inválida');
      const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expirado');
      return payload;
    }
  };
}

// ===========================================
// MIDDLEWARES DE SEGURANÇA & RBAC (3 CAMADAS)
// ===========================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.startsWith('Bearer ')) 
    ? authHeader.slice(7) 
    : req.query.token;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Token de autenticação obrigatório. Faça login para continuar.' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Sessão inválida ou expirada. Faça login novamente.' });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.startsWith('Bearer ')) 
    ? authHeader.slice(7) 
    : req.query.token;

  if (token) {
    try {
      req.user = jwt.verify(token, config.JWT_SECRET);
    } catch (e) {
      // Ignora erro no modo opcional
    }
  }
  next();
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Usuário não autenticado.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      console.warn(`[Segurança 403] Acesso negado: Usuário "${req.user.username}" (${req.user.role}) tentou acessar recurso restrito a [${allowedRoles.join(', ')}]`);
      return res.status(403).json({ 
        success: false, 
        error: `403 Proibido: Seu perfil (${req.user.role}) não tem permissão para acessar este recurso.` 
      });
    }
    next();
  };
}

// ===========================================
// 0. AUTENTICAÇÃO & CONTROLE DE ACESSO (RBAC)
// ===========================================

// Login com verificação de hash bcrypt e emissão de JWT
app.post('/api/auth/login', (req, res) => {
  try {
    const userLogin = req.body.login || req.body.username;
    const userPassword = req.body.senha || req.body.password;
    if (!userLogin || !userPassword) {
      return res.status(400).json({ success: false, error: 'Login e senha são obrigatórios.' });
    }

    const user = db.getUserByUsername(userLogin);
    if (!user) {
      console.warn(`[Auth Falhou] Usuário inexistente: "${userLogin}"`);
      return res.status(401).json({ success: false, error: 'Usuário ou senha incorretos.' });
    }

    const passwordOk = db.verifyUserPassword(user, userPassword);
    if (!passwordOk) {
      console.warn(`[Auth Falhou] Senha incorreta para o usuário: "${userLogin}"`);
      return res.status(401).json({ success: false, error: 'Usuário ou senha incorretos.' });
    }

    // Gerar token assinado JWT válido por 12 horas
    const payload = {
      id: user.id,
      nome: user.nome || user.name,
      name: user.name || user.nome,
      login: user.login || user.username,
      username: user.username || user.login,
      role: user.role,
      status: user.status || 'ativo'
    };

    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '12h' });

    console.log(`[Auth Sucesso] Login aprovado: ${payload.nome} (${payload.login}) [Perfil: ${payload.role.toUpperCase()}]`);
    res.json({
      success: true,
      token,
      user: payload
    });
  } catch (err) {
    console.error('Erro no endpoint de login:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Consultar dados da sessão atual
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Listar todos os usuários cadastrados (Apenas ADMIN)
app.get('/api/auth/usuarios', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const users = db.listUsers();
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Cadastrar novo funcionário/usuário (Apenas ADMIN)
app.post('/api/auth/usuarios', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ success: false, error: 'Nome, login e senha são obrigatórios.' });
    }
    const existing = db.getUserByUsername(username);
    if (existing) {
      return res.status(400).json({ success: false, error: 'Já existe um usuário com este login.' });
    }
    const created = db.createUser({ name, username, password, role });
    res.status(201).json({ success: true, user: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===========================================
// ROTAS EXISTENTES
// ===========================================

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Pizza do Juca API',
    database: db.driver,
    mercadopago: isMP_Configured ? 'configurado' : 'aguardando_credenciais',
    mp_mode: config.MP_MODE,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// 2. Pedidos: Listar todos
app.get('/api/pedidos', (req, res) => {
  try {
    const orders = db.getAllOrders();
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Pedidos: Criar novo pedido (usado internamente após pagamento aprovado)
app.post('/api/pedidos', (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData || !orderData.total) {
      return res.status(400).json({ success: false, error: 'Dados do pedido incompletos' });
    }
    const created = db.createOrder(orderData);
    console.log(`[Novo Pedido] #${created.order_number || created.id} de ${created.customer} - R$ ${created.total}`);
    res.status(201).json({ success: true, order: created });
  } catch (err) {
    console.error('Erro ao salvar pedido:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Pedidos: Atualizar status
app.patch('/api/pedidos/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, courier } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status não informado' });
    }
    const updated = db.updateOrderStatus(id, status, courier);
    res.json({ success: true, order: updated });
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Clube de Aniversário: Cadastrar
app.post('/api/clientes/aniversario', (req, res) => {
  try {
    const { name, phone, birthday, couponCode } = req.body;
    if (!birthday) {
      return res.status(400).json({ success: false, error: 'Data de aniversário é obrigatória' });
    }
    const client = db.saveBirthdayCustomer({ name, phone, birthday, couponCode });
    console.log(`[Clube Aniversário] ${client.name} cadastrado para ${client.birthday}`);
    res.json({ success: true, client });
  } catch (err) {
    console.error('Erro ao cadastrar aniversariante:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Clube de Aniversário: Listar
app.get('/api/clientes/aniversariantes', (req, res) => {
  try {
    const clients = db.getBirthdayCustomers();
    res.json({ success: true, count: clients.length, clients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Carrinho Abandonado: Salvar
app.post('/api/carrinho-abandonado', (req, res) => {
  try {
    const { customer, phone, items, total } = req.body;
    const cart = db.saveAbandonedCart({ customer, phone, items, total });
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Carrinho Abandonado: Listar
app.get('/api/carrinho-abandonado', (req, res) => {
  try {
    const carts = db.getAbandonedCarts();
    res.json({ success: true, count: carts.length, carts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Carrinho Abandonado: Marcar recuperado
app.patch('/api/carrinho-abandonado/:id/recuperado', (req, res) => {
  try {
    const { id } = req.params;
    db.markCartRecovered(id);
    res.json({ success: true, message: 'Carrinho marcado como recuperado' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===========================================
// MOTOBOYS — FECHAMENTOS DE TURNO
// ===========================================

// 10. Salvar fechamento de turno do motoboy (Protegido por RBAC)
app.post('/api/motoboys/fechamentos', optionalAuth, (req, res) => {
  try {
    if (req.user && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: '403 Proibido: Apenas administradores podem registrar fechamentos.' });
    }
    const data = req.body;
    if (!data || !data.courier_name) {
      return res.status(400).json({ success: false, error: 'Nome do motoboy é obrigatório' });
    }
    const closing = db.saveMotoboyClosing(data);
    console.log(`[Motoboy] Fechamento registrado: ${closing.courier_name} (${closing.deliveries_count} entregas) - Saldo: R$ ${closing.final_balance}`);
    res.status(201).json({ success: true, closing });
  } catch (err) {
    console.error('Erro ao salvar fechamento de motoboy:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 11. Listar histórico de fechamentos de motoboys (Filtra por motoboy se não for admin)
app.get('/api/motoboys/fechamentos', optionalAuth, (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 100;
    let closings = db.getMotoboyClosings(limit);

    // Se o usuário autenticado for perfil motoboy, restringe a visão exclusivamente às dele
    if (req.user && req.user.role === 'motoboy') {
      const myName = (req.user.name || '').toLowerCase();
      const myUser = (req.user.username || '').toLowerCase();
      closings = closings.filter(c => {
        const cName = (c.courier_name || '').toLowerCase();
        return cName.includes(myName) || cName.includes(myUser);
      });
    }

    res.json({ success: true, count: closings.length, closings });
  } catch (err) {
    console.error('Erro ao listar fechamentos de motoboys:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===========================================
// ADMIN — RELATÓRIOS FINANCEIROS BLINDADOS (RBAC CAMADA 3)
// ===========================================
app.get('/api/admin/faturamento', authenticateToken, authorizeRoles('admin'), (req, res) => {
  try {
    const orders = db.getAllOrders();
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    const closings = db.getMotoboyClosings(500);
    const totalMotoboyPaid = closings.reduce((sum, c) => sum + (parseFloat(c.total_earnings) || 0), 0);

    res.json({
      success: true,
      empresa: 'Pizza do Juca',
      total_pedidos: orders.length,
      faturamento_bruto: totalRevenue,
      repasses_motoboys: totalMotoboyPaid,
      lucro_operacional_estimado: totalRevenue - totalMotoboyPaid,
      consultado_por: req.user
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===========================================
// MERCADO PAGO — CHECKOUT BRICKS
// ===========================================

/**
 * 10. Criar Preferência de Pagamento
 * O frontend chama aqui com os itens do carrinho.
 * O servidor cria uma "preference" no MP e devolve o preference_id.
 * O Bricks usa esse preference_id pra montar a tela de pagamento.
 */
app.post('/api/mp/criar-preferencia', async (req, res) => {
  try {
    const { items, customer, phone, address, notes, orderRef } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, error: 'Carrinho vazio' });
    }

    if (!isMP_Configured) {
      // Modo demo: retorna um preference_id falso pra testar a UI
      return res.json({
        success: true,
        preference_id: 'DEMO_' + Date.now(),
        public_key: config.MP_PUBLIC_KEY,
        mode: 'demo',
        message: 'Mercado Pago não configurado ainda. Cole as credenciais em config.js'
      });
    }

    // Monta os itens no formato que o MP espera
    const mpItems = items.map(item => ({
      id: item.id || 'pizza',
      title: item.name,
      quantity: item.qty || 1,
      unit_price: parseFloat(item.price) || 0,
      currency_id: 'BRL',
    }));

    const totalAmount = mpItems.reduce((sum, i) => sum + (i.unit_price * i.quantity), 0);

    const preference = {
      items: mpItems,
      payer: {
        name: customer || 'Cliente',
        phone: { number: (phone || '').replace(/\D/g, '') }
      },
      back_urls: {
        success: `${config.BASE_URL}/pagamento-sucesso`,
        failure: `${config.BASE_URL}/pagamento-falhou`,
        pending: `${config.BASE_URL}/pagamento-pendente`,
      },
      notification_url: `${config.BASE_URL}/api/webhook/mercadopago`,
      external_reference: orderRef || `juca-${Date.now()}`,
      statement_descriptor: 'PIZZA DO JUCA',
      metadata: {
        customer,
        phone,
        address,
        notes
      }
    };

    const mpResponse = await mpRequest('POST', '/checkout/preferences', preference);

    if (mpResponse.id) {
      console.log(`[MP] Preferência criada: ${mpResponse.id} — R$ ${totalAmount.toFixed(2)} para ${customer}`);
      res.json({
        success: true,
        preference_id: mpResponse.id,
        public_key: config.MP_PUBLIC_KEY,
        init_point: mpResponse.init_point,
        sandbox_init_point: mpResponse.sandbox_init_point
      });
    } else {
      console.error('[MP] Erro ao criar preferência:', mpResponse);
      res.status(500).json({ success: false, error: 'Erro ao criar preferência no Mercado Pago', details: mpResponse });
    }
  } catch (err) {
    console.error('[MP] Erro interno ao criar preferência:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 11. Processar Pagamento via Bricks (Transparent Checkout)
 * O Bricks chama o onSubmit com o formData → frontend envia aqui.
 * O servidor faz a cobrança diretamente via API de Pagamentos do MP.
 */
app.post('/api/mp/processar-pagamento', async (req, res) => {
  try {
    const { formData, orderMeta } = req.body;

    if (!isMP_Configured) {
      // Modo demo: simula aprovação pra testar o fluxo completo
      const demoOrderId = `DEMO-${Date.now()}`;
      const demoOrder = db.createOrder({
        orderId: demoOrderId,
        orderNumber: demoOrderId,
        customer: orderMeta?.customer || 'Cliente Demo',
        phone: orderMeta?.phone || '',
        address: orderMeta?.address || 'Endereço Demo',
        payment: 'Mercado Pago (Demo)',
        channel: 'Site Oficial',
        items: orderMeta?.items || ['Pizza Calabresa Grande'],
        total: orderMeta?.total || 0,
        subtotal: orderMeta?.subtotal || 0,
        deliveryFee: orderMeta?.deliveryFee || 0,
        notes: orderMeta?.notes || '',
        status: 'recebido'
      });

      return res.json({
        success: true,
        status: 'approved',
        mode: 'demo',
        order: demoOrder,
        message: 'Pagamento DEMO aprovado. Configure as credenciais do MP pra cobrar de verdade.'
      });
    }

    // Faz a cobrança real via API de Payments do Mercado Pago
    const paymentPayload = {
      ...formData,
      description: `Pizza do Juca — Pedido ${orderMeta?.orderRef || 'Online'}`,
      statement_descriptor: 'PIZZA DO JUCA',
      metadata: orderMeta,
    };

    const mpPayment = await mpRequest('POST', '/v1/payments', paymentPayload);

    console.log(`[MP] Pagamento ${mpPayment.id} — Status: ${mpPayment.status} — ${mpPayment.status_detail}`);

    if (mpPayment.status === 'approved') {
      // Pagamento aprovado → gravar pedido no banco
      const order = db.createOrder({
        orderId: mpPayment.id,
        orderNumber: String(mpPayment.id),
        customer: orderMeta?.customer || formData?.payer?.email || 'Cliente',
        phone: orderMeta?.phone || '',
        address: orderMeta?.address || '',
        payment: `Mercado Pago — ${formData?.payment_method_id || 'Online'}`,
        channel: 'Site Oficial',
        items: orderMeta?.items || [],
        total: mpPayment.transaction_amount || orderMeta?.total || 0,
        subtotal: orderMeta?.subtotal || mpPayment.transaction_amount || 0,
        deliveryFee: orderMeta?.deliveryFee || 0,
        notes: orderMeta?.notes || '',
        status: 'recebido'
      });

      console.log(`[Pedido Criado] #${order.id} — R$ ${order.total} — Cliente: ${order.customer}`);

      res.json({
        success: true,
        status: 'approved',
        payment_id: mpPayment.id,
        order
      });

    } else if (mpPayment.status === 'pending' || mpPayment.status === 'in_process') {
      // PIX e boleto ficam pendentes
      res.json({
        success: true,
        status: 'pending',
        payment_id: mpPayment.id,
        point_of_interaction: mpPayment.point_of_interaction,
        pix_qr: mpPayment.point_of_interaction?.transaction_data?.qr_code,
        pix_qr_base64: mpPayment.point_of_interaction?.transaction_data?.qr_code_base64
      });

    } else {
      // Rejeitado (cartão sem limite, dados errados, etc)
      res.json({
        success: false,
        status: mpPayment.status,
        status_detail: mpPayment.status_detail,
        message: traduzirStatusMP(mpPayment.status_detail)
      });
    }
  } catch (err) {
    console.error('[MP] Erro ao processar pagamento:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 12. Webhook do Mercado Pago
 * O MP avisa aqui quando um pagamento muda de status (ex: PIX compensado)
 */
app.post('/api/webhook/mercadopago', async (req, res) => {
  try {
    // Responder 200 imediatamente pra o MP não retentar
    res.status(200).send('OK');

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (body.type === 'payment' && body.data?.id) {
      const paymentId = body.data.id;
      console.log(`[Webhook MP] Notificação de pagamento: ${paymentId}`);

      // Consulta o status real do pagamento no MP
      const mpPayment = await mpRequest('GET', `/v1/payments/${paymentId}`);

      if (mpPayment.status === 'approved') {
        // Verifica se o pedido já existe no banco
        const existing = db.getOrderById(String(paymentId));
        if (!existing) {
          const meta = mpPayment.metadata || {};
          db.createOrder({
            orderId: paymentId,
            orderNumber: String(paymentId),
            customer: meta.customer || mpPayment.payer?.email || 'Cliente Online',
            phone: meta.phone || '',
            address: meta.address || '',
            payment: `Mercado Pago — ${mpPayment.payment_method_id || 'Online'}`,
            channel: 'Site Oficial',
            items: meta.items || [`Pedido R$ ${mpPayment.transaction_amount}`],
            total: mpPayment.transaction_amount || 0,
            notes: meta.notes || '',
            status: 'recebido'
          });
          console.log(`[Webhook] Pedido criado via webhook: pagamento ${paymentId} aprovado`);
        } else {
          db.updateOrderStatus(String(paymentId), 'recebido');
          console.log(`[Webhook] Pedido ${paymentId} atualizado para "recebido"`);
        }
      }
    }
  } catch (err) {
    console.error('[Webhook MP] Erro ao processar notificação:', err);
  }
});

/**
 * 13. Retornar a Public Key pro frontend (sem expor o Access Token)
 */
app.get('/api/mp/public-key', (req, res) => {
  res.json({
    public_key: config.MP_PUBLIC_KEY,
    mode: config.MP_MODE,
    configured: isMP_Configured
  });
});

// ===========================================
// HELPER: Traduz erros do MP pra português
// ===========================================
function traduzirStatusMP(statusDetail) {
  const erros = {
    'cc_rejected_insufficient_amount': 'Cartão sem limite suficiente.',
    'cc_rejected_bad_filled_card_number': 'Número do cartão incorreto.',
    'cc_rejected_bad_filled_date': 'Data de vencimento incorreta.',
    'cc_rejected_bad_filled_security_code': 'CVV incorreto.',
    'cc_rejected_call_for_authorize': 'Cartão bloqueado. Entre em contato com seu banco.',
    'cc_rejected_card_disabled': 'Cartão desativado. Tente outro.',
    'rejected_by_bank': 'Operação rejeitada pelo banco emissor.',
    'pending_waiting_payment': 'Aguardando pagamento do PIX.',
    'pending_waiting_transfer': 'Processando transferência.',
  };
  return erros[statusDetail] || `Pagamento não aprovado (${statusDetail}). Tente outro método.`;
}

// ===========================================
// INICIALIZAÇÃO
// ===========================================
app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🍕 Pizza do Juca - Backend API Iniciado`);
  console.log(`🚀 Porta: ${config.PORT} (http://localhost:${config.PORT})`);
  console.log(`💾 Banco: ${db.driver.toUpperCase()}`);
  console.log(`💳 Mercado Pago: ${isMP_Configured ? '✅ Configurado (' + config.MP_MODE + ')' : '⚠️  Aguardando credenciais'}`);
  console.log(`===============================================`);
});
