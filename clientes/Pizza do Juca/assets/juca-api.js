/**
 * juca-api.js - Cliente de Comunicação com a API e Banco de Dados VPS
 * Funciona de forma transparente: tenta a API VPS (/api/...) e se
 * estiver offline ou sem rede, usa o localStorage local como fallback.
 */

window.JucaAPI = (function() {
  const API_BASE = '/api';

  async function request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {})
      }
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`[JucaAPI] Fallback local ativado para ${endpoint}:`, err.message);
      return null;
    }
  }

  return {
    // 1. Checar saúde do backend
    checkHealth: async function() {
      return await request('/health');
    },

    // 2. Enviar Pedido para o Banco da VPS
    sendOrder: async function(orderData) {
      // Sempre salvar localmente primeiro para segurança
      try {
        const localOrders = JSON.parse(localStorage.getItem('juca-panel-orders') || '[]');
        const existingIdx = localOrders.findIndex(o => o.id === orderData.id);
        if (existingIdx >= 0) {
          localOrders[existingIdx] = orderData;
        } else {
          localOrders.unshift(orderData);
        }
        localStorage.setItem('juca-panel-orders', JSON.stringify(localOrders));
      } catch (e) {
        console.warn('Erro ao salvar no localStorage local:', e);
      }

      // Enviar para a API VPS
      const res = await request('/pedidos', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      return res;
    },

    // 3. Atualizar Status do Pedido
    updateOrderStatus: async function(orderId, status, courier = null) {
      return await request(`/pedidos/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, courier })
      });
    },

    // 4. Cadastrar Aniversariante no Clube de Desconto
    registerBirthday: async function(birthdayData) {
      return await request('/clientes/aniversario', {
        method: 'POST',
        body: JSON.stringify(birthdayData)
      });
    },

    // 5. Salvar Carrinho Abandonado (Recuperador de Vendas)
    trackAbandonedCart: async function(cartData) {
      return await request('/carrinho-abandonado', {
        method: 'POST',
        body: JSON.stringify(cartData)
      });
    },

    // 6. Buscar Pedidos do Servidor
    fetchOrders: async function() {
      const res = await request('/pedidos');
      if (res && res.success && Array.isArray(res.orders)) {
        return res.orders;
      }
      return null;
    },

    // 7. Obter chave pública do Mercado Pago
    getMPPublicKey: async function() {
      return await request('/mp/public-key');
    },

    // 8. Criar preferência de pagamento no Mercado Pago
    createMPPreference: async function(prefData) {
      return await request('/mp/criar-preferencia', {
        method: 'POST',
        body: JSON.stringify(prefData)
      });
    },

    // 9. Processar pagamento via Bricks
    processMPPayment: async function(paymentData) {
      return await request('/mp/processar-pagamento', {
        method: 'POST',
        body: JSON.stringify(paymentData)
      });
    }
  };
})();
