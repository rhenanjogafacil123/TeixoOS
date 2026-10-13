/**
 * database.js - Camada de Banco de Dados para Pizza do Juca
 * Suporta SQLite nativo (via better-sqlite3) com fallback automático
 * para armazenamento JSON persistente caso a biblioteca nativa não esteja compilada.
 */

const fs = require('fs');
const path = require('path');

const DB_DIR = __dirname;
const SQLITE_FILE = path.join(DB_DIR, 'juca-database.sqlite');
const JSON_FILE = path.join(DB_DIR, 'juca-database.json');

let dbDriver = null;
let sqliteDb = null;
let jsonStore = {
  pedidos: [],
  clientes: [],
  carrinhos: [],
  produtos: []
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
  `);
}

function initJsonStore() {
  if (fs.existsSync(JSON_FILE)) {
    try {
      jsonStore = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
    } catch (e) {
      console.error('[Banco de Dados] Erro ao ler JSON store, criando novo:', e.message);
    }
  } else {
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
  }
};

module.exports = dbService;
