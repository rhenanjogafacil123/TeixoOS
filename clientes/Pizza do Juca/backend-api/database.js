/**
 * database.js - Camada de Banco de Dados para Pizza do Juca
 * Suporta SQLite nativo (via better-sqlite3) com fallback automático
 * para armazenamento JSON persistente caso a biblioteca nativa não esteja compilada.
 */

const fs = require('fs');
const path = require('path');
const config = require('./config');

const DB_DIR = __dirname;
const SQLITE_FILE = path.join(DB_DIR, 'juca-database.sqlite');
const JSON_FILE = path.join(DB_DIR, 'juca-database.json');

// Carregador seguro do Bcrypt para hash com salt
let bcrypt = null;
try {
  bcrypt = require('bcryptjs');
} catch (e) {
  const crypto = require('crypto');
  bcrypt = {
    hashSync: (pwd, saltRounds = 10) => {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(pwd, salt, 10000, 64, 'sha512').toString('hex');
      return `${salt}:${hash}`;
    },
    compareSync: (pwd, hashStr) => {
      if (!hashStr || !hashStr.includes(':')) return false;
      const [salt, originalHash] = hashStr.split(':');
      const checkHash = crypto.pbkdf2Sync(pwd, salt, 10000, 64, 'sha512').toString('hex');
      return checkHash === originalHash;
    }
  };
}

let dbDriver = null;
let sqliteDb = null;
let jsonStore = {
  pedidos: [],
  clientes: [],
  carrinhos: [],
  produtos: [],
  fechamentos: [],
  usuarios: []
};

// 1. Tentar inicializar SQLite
try {
  const Database = require('better-sqlite3');
  sqliteDb = new Database(SQLITE_FILE);
  sqliteDb.pragma('journal_mode = WAL');
  dbDriver = 'sqlite';
  console.log('[Banco de Dados] SQLite ativado com sucesso em:', SQLITE_FILE);
  initSqliteTables();
} catch (err) {
  dbDriver = 'json';
  console.log('[Banco de Dados] Operando no modo JSON persistente (zero downtime). Detalhes:', err.message);
  initJsonStore();
}

function initSqliteTables() {
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE,
      customer TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      payment TEXT,
      channel TEXT DEFAULT 'Site Oficial',
      items TEXT NOT NULL,
      subtotal REAL DEFAULT 0,
      delivery_fee REAL DEFAULT 0,
      total REAL NOT NULL,
      status TEXT DEFAULT 'recebido',
      courier TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT UNIQUE,
      birthday TEXT,
      coupon_code TEXT DEFAULT 'NIVER10',
      orders_count INTEGER DEFAULT 1,
      total_spent REAL DEFAULT 0,
      last_order DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS carrinhos_abandonados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer TEXT,
      phone TEXT,
      items TEXT NOT NULL,
      total REAL NOT NULL,
      recovered INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      badge TEXT,
      image TEXT,
      description TEXT,
      featured INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      availability_type TEXT DEFAULT 'always',
      channels TEXT,
      ingredients TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS fechamentos_motoboys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courier_name TEXT NOT NULL,
      shift_date TEXT NOT NULL,
      deliveries_count INTEGER NOT NULL,
      fee_per_delivery REAL NOT NULL,
      daily_allowance REAL DEFAULT 0,
      total_earnings REAL NOT NULL,
      cash_collected REAL DEFAULT 0,
      final_balance REAL NOT NULL,
      orders_list TEXT,
      payment_method TEXT DEFAULT 'PIX',
      status TEXT DEFAULT 'pago',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_completo TEXT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE,
      login TEXT UNIQUE NOT NULL,
      telefone TEXT,
      data_nascimento TEXT,
      senha_hash TEXT NOT NULL,
      role TEXT DEFAULT 'cliente',
      status TEXT DEFAULT 'ativo',
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      name TEXT,
      username TEXT,
      password_hash TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrações dinâmicas seguras de colunas
  const migrations = [
    'ALTER TABLE usuarios ADD COLUMN nome_completo TEXT',
    'ALTER TABLE usuarios ADD COLUMN email TEXT',
    'ALTER TABLE usuarios ADD COLUMN telefone TEXT',
    'ALTER TABLE usuarios ADD COLUMN data_nascimento TEXT'
  ];
  for (const sql of migrations) {
    try { sqliteDb.exec(sql); } catch (e) {}
  }
  try { sqliteDb.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);'); } catch (e) {}

  seedSuperAdmin();
}

function seedSuperAdmin() {
  const superAdminEmail = (config.SUPERADMIN_EMAIL || 'rhenanteixeira.rj@gmail.com').toLowerCase();
  const superAdminPass = 'teixo@global2026';

  if (dbDriver === 'sqlite') {
    const existing = sqliteDb.prepare(`
      SELECT id, role FROM usuarios 
      WHERE LOWER(email) = ? OR LOWER(login) = ? OR LOWER(username) = ?
    `).get(superAdminEmail, superAdminEmail, 'rhenan');

    if (!existing) {
      console.log('[Banco de Dados] Inicializando Conta Master Global Teixo (Superadmin)...');
      const hash = bcrypt.hashSync(superAdminPass, 10);
      sqliteDb.prepare(`
        INSERT INTO usuarios (
          nome_completo, nome, email, login, telefone, data_nascimento,
          senha_hash, role, status, name, username, password_hash, active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'superadmin', 'ativo', ?, ?, ?, 1)
      `).run(
        'Rhenan Teixeira (Teixo Growth)',
        'Rhenan Teixeira',
        superAdminEmail,
        superAdminEmail,
        '(21) 99999-9999',
        '2007-05-10',
        hash,
        'Rhenan Teixeira',
        superAdminEmail,
        hash
      );
      console.log('[Banco de Dados] Conta Global Superadmin ativada:', superAdminEmail);
    } else if (existing.role !== 'superadmin') {
      sqliteDb.prepare("UPDATE usuarios SET role = 'superadmin' WHERE id = ?").run(existing.id);
      console.log('[Banco de Dados] Conta do Rhenan promovida para SUPERADMIN global.');
    }
  } else {
    if (!jsonStore.usuarios) jsonStore.usuarios = [];
    let found = jsonStore.usuarios.find(u => 
      (u.email && u.email.toLowerCase() === superAdminEmail) || 
      (u.login && u.login.toLowerCase() === superAdminEmail) ||
      u.username === 'rhenan'
    );
    if (!found) {
      const hash = bcrypt.hashSync(superAdminPass, 10);
      jsonStore.usuarios.push({
        id: jsonStore.usuarios.length + 1,
        nome_completo: 'Rhenan Teixeira (Teixo Growth)',
        nome: 'Rhenan Teixeira',
        name: 'Rhenan Teixeira',
        email: superAdminEmail,
        login: superAdminEmail,
        username: superAdminEmail,
        telefone: '(21) 99999-9999',
        data_nascimento: '2007-05-10',
        senha_hash: hash,
        password_hash: hash,
        role: 'superadmin',
        status: 'ativo',
        active: 1,
        criado_em: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
      persistJsonStore();
    } else {
      found.role = 'superadmin';
      persistJsonStore();
    }
  }
}

function initJsonStore() {
  if (fs.existsSync(JSON_FILE)) {
    try {
      jsonStore = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
      if (!jsonStore.usuarios) {
        jsonStore.usuarios = [];
        seedSuperAdmin();
      }
    } catch (e) {
      console.error('[Banco de Dados] Erro ao ler JSON store, criando novo:', e.message);
    }
  } else {
    seedSuperAdmin();
    persistJsonStore();
  }
}

function persistJsonStore() {
  fs.writeFileSync(JSON_FILE, JSON.stringify(jsonStore, null, 2), 'utf8');
}

// ==========================================
// MÉTODOS PÚBLICOS DE ACESSO AO BANCO
// ==========================================

const dbService = {
  driver: dbDriver,

  // --- PEDIDOS ---
  getAllOrders: () => {
    if (dbDriver === 'sqlite') {
      const stmt = sqliteDb.prepare('SELECT * FROM pedidos ORDER BY id DESC');
      const rows = stmt.all();
      return rows.map(r => ({
        ...r,
        items: JSON.parse(r.items || '[]')
      }));
    } else {
      return [...jsonStore.pedidos].reverse();
    }
  },

  getOrderById: (id) => {
    if (dbDriver === 'sqlite') {
      const row = sqliteDb.prepare('SELECT * FROM pedidos WHERE id = ? OR order_number = ?').get(id, String(id));
      if (!row) return null;
      return { ...row, items: JSON.parse(row.items || '[]') };
    } else {
      return jsonStore.pedidos.find(p => p.id === Number(id) || p.order_number === String(id)) || null;
    }
  },

  createOrder: (order) => {
    const orderNumber = order.orderNumber || order.orderId || String(Date.now()).slice(-4);
    const itemsJson = typeof order.items === 'string' ? order.items : JSON.stringify(order.items || []);
    const total = parseFloat(order.total) || 0;
    const subtotal = parseFloat(order.subtotal) || total;
    const deliveryFee = parseFloat(order.deliveryFee) || 0;
    const channel = order.channel || 'Site Oficial';
    const status = order.status || 'recebido';

    if (dbDriver === 'sqlite') {
      const stmt = sqliteDb.prepare(`
        INSERT INTO pedidos (order_number, customer, phone, address, payment, channel, items, subtotal, delivery_fee, total, status, courier, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        String(orderNumber),
        order.customer || 'Cliente Balcão',
        order.phone || '',
        order.address || '',
        order.payment || 'Dinheiro',
        channel,
        itemsJson,
        subtotal,
        deliveryFee,
        total,
        status,
        order.courier || null,
        order.notes || null
      );
      
      // Atualizar estatísticas do cliente
      if (order.customer || order.phone) {
        dbService.touchCustomerStats({
          name: order.customer,
          phone: order.phone,
          spent: total
        });
      }

      return dbService.getOrderById(info.lastInsertRowid);
    } else {
      const newOrder = {
        id: jsonStore.pedidos.length + 1040,
        order_number: String(orderNumber),
        customer: order.customer || 'Cliente Balcão',
        phone: order.phone || '',
        address: order.address || '',
        payment: order.payment || 'Dinheiro',
        channel,
        items: Array.isArray(order.items) ? order.items : JSON.parse(itemsJson),
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status,
        courier: order.courier || null,
        notes: order.notes || null,
        created_at: new Date().toISOString()
      };
      jsonStore.pedidos.push(newOrder);
      persistJsonStore();

      dbService.touchCustomerStats({
        name: order.customer,
        phone: order.phone,
        spent: total
      });

      return newOrder;
    }
  },

  updateOrderStatus: (id, status, courier = null) => {
    if (dbDriver === 'sqlite') {
      const stmt = sqliteDb.prepare(`
        UPDATE pedidos 
        SET status = ?, courier = COALESCE(?, courier)
        WHERE id = ? OR order_number = ?
      `);
      stmt.run(status, courier, id, String(id));
      return dbService.getOrderById(id);
    } else {
      const order = jsonStore.pedidos.find(p => p.id === Number(id) || p.order_number === String(id));
      if (order) {
        order.status = status;
        if (courier) order.courier = courier;
        persistJsonStore();
      }
      return order;
    }
  },

  // --- CLIENTES & ANIVERSARIANTES ---
  touchCustomerStats: ({ name, phone, spent }) => {
    if (!phone && !name) return;
    if (dbDriver === 'sqlite') {
      const existing = sqliteDb.prepare('SELECT * FROM clientes WHERE phone = ? OR name = ?').get(phone, name);
      if (existing) {
        sqliteDb.prepare(`
          UPDATE clientes 
          SET orders_count = orders_count + 1, 
              total_spent = total_spent + ?,
              last_order = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(spent, existing.id);
      } else {
        sqliteDb.prepare(`
          INSERT INTO clientes (name, phone, orders_count, total_spent)
          VALUES (?, ?, 1, ?)
        `).run(name || 'Cliente', phone || '', spent);
      }
    } else {
      const existing = jsonStore.clientes.find(c => (phone && c.phone === phone) || (name && c.name === name));
      if (existing) {
        existing.orders_count = (existing.orders_count || 1) + 1;
        existing.total_spent = (existing.total_spent || 0) + spent;
        existing.last_order = new Date().toISOString();
      } else {
        jsonStore.clientes.push({
          id: jsonStore.clientes.length + 1,
          name: name || 'Cliente',
          phone: phone || '',
          birthday: null,
          coupon_code: 'NIVER10',
          orders_count: 1,
          total_spent: spent,
          last_order: new Date().toISOString(),
          created_at: new Date().toISOString()
        });
      }
      persistJsonStore();
    }
  },

  saveBirthdayCustomer: ({ name, phone, birthday, couponCode = 'NIVER10' }) => {
    if (dbDriver === 'sqlite') {
      let existing = null;
      if (phone) {
        existing = sqliteDb.prepare('SELECT * FROM clientes WHERE phone = ?').get(phone);
      }
      if (!existing && name) {
        existing = sqliteDb.prepare('SELECT * FROM clientes WHERE name = ?').get(name);
      }

      if (existing) {
        sqliteDb.prepare(`
          UPDATE clientes 
          SET birthday = ?, coupon_code = ?
          WHERE id = ?
        `).run(birthday, couponCode, existing.id);
        return { ...existing, birthday, coupon_code: couponCode };
      } else {
        const stmt = sqliteDb.prepare(`
          INSERT INTO clientes (name, phone, birthday, coupon_code)
          VALUES (?, ?, ?, ?)
        `);
        const info = stmt.run(name || 'Cliente', phone || '', birthday, couponCode);
        return { id: info.lastInsertRowid, name, phone, birthday, coupon_code: couponCode };
      }
    } else {
      let client = jsonStore.clientes.find(c => (phone && c.phone === phone) || (name && c.name === name));
      if (client) {
        client.birthday = birthday;
        client.coupon_code = couponCode;
      } else {
        client = {
          id: jsonStore.clientes.length + 1,
          name: name || 'Cliente',
          phone: phone || '',
          birthday,
          coupon_code: couponCode,
          orders_count: 1,
          total_spent: 0,
          created_at: new Date().toISOString()
        };
        jsonStore.clientes.push(client);
      }
      persistJsonStore();
      return client;
    }
  },

  getBirthdayCustomers: () => {
    if (dbDriver === 'sqlite') {
      return sqliteDb.prepare('SELECT * FROM clientes WHERE birthday IS NOT NULL ORDER BY name ASC').all();
    } else {
      return jsonStore.clientes.filter(c => !!c.birthday);
    }
  },

  // --- CARRINHOS ABANDONADOS (RECUPERADOR DE VENDAS) ---
  saveAbandonedCart: ({ customer, phone, items, total }) => {
    const itemsJson = typeof items === 'string' ? items : JSON.stringify(items || []);
    const numTotal = parseFloat(total) || 0;

    if (dbDriver === 'sqlite') {
      const stmt = sqliteDb.prepare(`
        INSERT INTO carrinhos_abandonados (customer, phone, items, total)
        VALUES (?, ?, ?, ?)
      `);
      const info = stmt.run(customer || 'Visitante', phone || '', itemsJson, numTotal);
      return { id: info.lastInsertRowid, customer, phone, items, total: numTotal, recovered: 0 };
    } else {
      const cart = {
        id: jsonStore.carrinhos.length + 1,
        customer: customer || 'Visitante',
        phone: phone || '',
        items: Array.isArray(items) ? items : JSON.parse(itemsJson),
        total: numTotal,
        recovered: 0,
        created_at: new Date().toISOString()
      };
      jsonStore.carrinhos.push(cart);
      persistJsonStore();
      return cart;
    }
  },

  getAbandonedCarts: () => {
    if (dbDriver === 'sqlite') {
      const rows = sqliteDb.prepare('SELECT * FROM carrinhos_abandonados WHERE recovered = 0 ORDER BY id DESC').all();
      return rows.map(r => ({ ...r, items: JSON.parse(r.items || '[]') }));
    } else {
      return jsonStore.carrinhos.filter(c => !c.recovered).reverse();
    }
  },

  markCartRecovered: (id) => {
    if (dbDriver === 'sqlite') {
      sqliteDb.prepare('UPDATE carrinhos_abandonados SET recovered = 1 WHERE id = ?').run(id);
      return true;
    } else {
      const cart = jsonStore.carrinhos.find(c => c.id === Number(id));
      if (cart) {
        cart.recovered = 1;
        persistJsonStore();
        return true;
      }
      return false;
    }
  },

  // --- HISTÓRICO DE MOTOBOYS (FECHAMENTOS DE TURNO) ---
  saveMotoboyClosing: ({
    courier_name,
    shift_date,
    deliveries_count,
    fee_per_delivery,
    daily_allowance,
    total_earnings,
    cash_collected,
    final_balance,
    orders_list,
    payment_method,
    status,
    notes
  }) => {
    const ordersJson = typeof orders_list === 'string' ? orders_list : JSON.stringify(orders_list || []);
    const numDeliveries = parseInt(deliveries_count, 10) || 0;
    const numFee = parseFloat(fee_per_delivery) || 0;
    const numDaily = parseFloat(daily_allowance) || 0;
    const numEarnings = parseFloat(total_earnings) || (numDeliveries * numFee + numDaily);
    const numCash = parseFloat(cash_collected) || 0;
    const numBalance = parseFloat(final_balance) || (numEarnings - numCash);
    const dateStr = shift_date || new Date().toISOString().slice(0, 10);
    const payMethod = payment_method || 'PIX';
    const st = status || 'pago';

    if (dbDriver === 'sqlite') {
      const stmt = sqliteDb.prepare(`
        INSERT INTO fechamentos_motoboys (
          courier_name, shift_date, deliveries_count, fee_per_delivery,
          daily_allowance, total_earnings, cash_collected, final_balance,
          orders_list, payment_method, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        courier_name || 'Motoboy Desconhecido',
        dateStr,
        numDeliveries,
        numFee,
        numDaily,
        numEarnings,
        numCash,
        numBalance,
        ordersJson,
        payMethod,
        st,
        notes || null
      );
      return dbService.getMotoboyClosingById(info.lastInsertRowid);
    } else {
      if (!jsonStore.fechamentos) jsonStore.fechamentos = [];
      const closing = {
        id: jsonStore.fechamentos.length + 1,
        courier_name: courier_name || 'Motoboy Desconhecido',
        shift_date: dateStr,
        deliveries_count: numDeliveries,
        fee_per_delivery: numFee,
        daily_allowance: numDaily,
        total_earnings: numEarnings,
        cash_collected: numCash,
        final_balance: numBalance,
        orders_list: Array.isArray(orders_list) ? orders_list : JSON.parse(ordersJson),
        payment_method: payMethod,
        status: st,
        notes: notes || null,
        created_at: new Date().toISOString()
      };
      jsonStore.fechamentos.push(closing);
      persistJsonStore();
      return closing;
    }
  },

  getMotoboyClosings: (limit = 100) => {
    if (dbDriver === 'sqlite') {
      const rows = sqliteDb.prepare(`
        SELECT * FROM fechamentos_motoboys 
        ORDER BY id DESC 
        LIMIT ?
      `).all(limit);
      return rows.map(r => ({
        ...r,
        orders_list: JSON.parse(r.orders_list || '[]')
      }));
    } else {
      const list = jsonStore.fechamentos || [];
      return [...list].reverse().slice(0, limit);
    }
  },

  getMotoboyClosingById: (id) => {
    if (dbDriver === 'sqlite') {
      const row = sqliteDb.prepare('SELECT * FROM fechamentos_motoboys WHERE id = ?').get(id);
      if (!row) return null;
      return {
        ...row,
        orders_list: JSON.parse(row.orders_list || '[]')
      };
    } else {
      const list = jsonStore.fechamentos || [];
      return list.find(c => c.id === Number(id)) || null;
    }
  },

  // --- USUÁRIOS & AUTENTICAÇÃO (RBAC BLINDADO HIERÁRQUICO) ---
  getUserByUsernameOrEmail: (identifier) => {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    if (dbDriver === 'sqlite') {
      const u = sqliteDb.prepare(`
        SELECT * FROM usuarios 
        WHERE (LOWER(email) = ? OR LOWER(login) = ? OR LOWER(username) = ?) 
          AND (active = 1 OR status = 'ativo')
      `).get(clean, clean, clean);
      if (!u) return null;
      return {
        ...u,
        nome_completo: u.nome_completo || u.nome || u.name,
        nome: u.nome || u.nome_completo || u.name,
        name: u.name || u.nome_completo || u.nome,
        email: u.email || u.login,
        login: u.login || u.email || u.username,
        username: u.username || u.email || u.login,
        telefone: u.telefone || '',
        data_nascimento: u.data_nascimento || '',
        senha_hash: u.senha_hash || u.password_hash,
        password_hash: u.password_hash || u.senha_hash,
        role: u.role || 'cliente',
        status: u.status || 'ativo'
      };
    } else {
      const list = jsonStore.usuarios || [];
      const u = list.find(x => 
        ((x.email && x.email.toLowerCase() === clean) ||
         (x.login && x.login.toLowerCase() === clean) ||
         (x.username && x.username.toLowerCase() === clean)) &&
        (x.active || x.status === 'ativo')
      );
      return u || null;
    }
  },

  getUserByUsername: (identifier) => {
    return dbService.getUserByUsernameOrEmail(identifier);
  },

  getUserById: (id) => {
    if (!id) return null;
    if (dbDriver === 'sqlite') {
      const u = sqliteDb.prepare('SELECT id, nome_completo, nome, email, login, telefone, data_nascimento, role, status, criado_em, name, username, active, created_at FROM usuarios WHERE id = ?').get(id);
      if (!u) return null;
      return {
        ...u,
        nome_completo: u.nome_completo || u.nome || u.name,
        nome: u.nome || u.nome_completo || u.name,
        email: u.email || u.login,
        role: u.role || 'cliente',
        status: u.status || 'ativo'
      };
    } else {
      const list = jsonStore.usuarios || [];
      const u = list.find(x => x.id === Number(id));
      if (!u) return null;
      const { password_hash, senha_hash, ...safe } = u;
      return safe;
    }
  },

  listUsers: () => {
    if (dbDriver === 'sqlite') {
      return sqliteDb.prepare(`
        SELECT id, nome_completo, nome, email, login, telefone, data_nascimento, role, status, criado_em 
        FROM usuarios 
        ORDER BY id DESC
      `).all().map(u => ({
        ...u,
        nome_completo: u.nome_completo || u.nome,
        email: u.email || u.login
      }));
    } else {
      const list = jsonStore.usuarios || [];
      return list.map(({ password_hash, senha_hash, ...safe }) => safe);
    }
  },

  createUser: ({ nome_completo, nome, email, login, telefone, data_nascimento, senha, password, role = 'cliente' }) => {
    const finalNome = (nome_completo || nome || 'Usuário').trim();
    const finalEmail = String(email || login || '').trim().toLowerCase();
    const finalLogin = finalEmail;
    const finalTelefone = String(telefone || '').trim();
    const finalDataNasc = String(data_nascimento || '').trim();
    const finalSenha = senha || password;
    const hash = bcrypt.hashSync(finalSenha, 10);
    const validRoles = ['superadmin', 'admin', 'atendente', 'motoboy', 'cliente'];
    const safeRole = validRoles.includes(role) ? role : 'cliente';

    if (dbDriver === 'sqlite') {
      const stmt = sqliteDb.prepare(`
        INSERT INTO usuarios (
          nome_completo, nome, email, login, telefone, data_nascimento,
          senha_hash, role, status, name, username, password_hash, active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ativo', ?, ?, ?, 1)
      `);
      const info = stmt.run(
        finalNome, finalNome, finalEmail, finalLogin, finalTelefone, finalDataNasc,
        hash, safeRole, finalNome, finalLogin, hash
      );
      return dbService.getUserById(info.lastInsertRowid);
    } else {
      if (!jsonStore.usuarios) jsonStore.usuarios = [];
      const newUser = {
        id: jsonStore.usuarios.length + 1,
        nome_completo: finalNome,
        nome: finalNome,
        name: finalNome,
        email: finalEmail,
        login: finalLogin,
        username: finalLogin,
        telefone: finalTelefone,
        data_nascimento: finalDataNasc,
        senha_hash: hash,
        password_hash: hash,
        role: safeRole,
        status: 'ativo',
        active: 1,
        criado_em: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      jsonStore.usuarios.push(newUser);
      persistJsonStore();
      const { password_hash, senha_hash, ...safe } = newUser;
      return safe;
    }
  },

  updateUserRole: (emailOrId, newRole) => {
    const validRoles = ['superadmin', 'admin', 'atendente', 'motoboy', 'cliente'];
    if (!validRoles.includes(newRole)) throw new Error('Cargo inválido: ' + newRole);

    if (dbDriver === 'sqlite') {
      if (typeof emailOrId === 'number' || (!isNaN(Number(emailOrId)) && String(emailOrId).indexOf('@') === -1)) {
        sqliteDb.prepare('UPDATE usuarios SET role = ? WHERE id = ?').run(newRole, Number(emailOrId));
        return dbService.getUserById(Number(emailOrId));
      } else {
        const clean = String(emailOrId).trim().toLowerCase();
        sqliteDb.prepare('UPDATE usuarios SET role = ? WHERE LOWER(email) = ? OR LOWER(login) = ?').run(newRole, clean, clean);
        return dbService.getUserByUsernameOrEmail(clean);
      }
    } else {
      const list = jsonStore.usuarios || [];
      const user = list.find(u => 
        u.id === Number(emailOrId) || 
        (u.email && u.email.toLowerCase() === String(emailOrId).toLowerCase()) ||
        (u.login && u.login.toLowerCase() === String(emailOrId).toLowerCase())
      );
      if (user) {
        user.role = newRole;
        persistJsonStore();
        const { password_hash, senha_hash, ...safe } = user;
        return safe;
      }
      return null;
    }
  },

  verifyUserPassword: (user, plainPassword) => {
    if (!user || !plainPassword) return false;
    const hash = user.senha_hash || user.password_hash;
    if (!hash) return false;
    try {
      return bcrypt.compareSync(plainPassword, hash);
    } catch (e) {
      return false;
    }
  }
};

module.exports = dbService;
