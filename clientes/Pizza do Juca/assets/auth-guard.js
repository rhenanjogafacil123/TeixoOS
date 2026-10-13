/**
 * auth-guard.js - Guardião de Autenticação e RBAC Hierárquico Teixo / Juca
 * Blindagem 100% no Frontend e Backend:
 * - Se não estiver logado -> Redireciona para /painel/login/
 * - Se for perfil Cliente -> Redireciona para /painel/cliente/ (aviso de aguardo de liberação pelo gestor)
 * - Se for perfil Motoboy -> Bloqueia telas da cozinha/admin e manda para /painel/motoboy/
 * - Se for perfil Atendente -> Bloqueia telas de finanças/equipe e manda para /painel/pedidos/
 * - Se for Admin (Juca) -> Acesso total à pizzaria e gestão de equipe da loja
 * - Se for Superadmin (Rhenan) -> Acesso global master a tudo do sistema
 * - Injeta pill flutuante com dados da sessão e botão Sair/Logout
 */

(function() {
  const currentPath = window.location.pathname;

  // Se estiver na tela de login, não precisa redirecionar para o login
  if (currentPath.includes('/painel/login/')) {
    const token = localStorage.getItem('juca_auth_token');
    const userRaw = localStorage.getItem('juca_auth_user');
    if (token && userRaw) {
      try {
        const u = JSON.parse(userRaw);
        redirectByRole(u.role);
      } catch (e) {}
    }
    return;
  }

  // 1. Verificar se há sessão ativa
  const token = localStorage.getItem('juca_auth_token');
  const userRaw = localStorage.getItem('juca_auth_user');

  if (!token || !userRaw) {
    console.warn('[AuthGuard] Acesso não autenticado detectado. Redirecionando para login...');
    sessionStorage.setItem('juca_redirect_target', window.location.href);
    window.location.replace('/painel/login/');
    return;
  }

  let user = null;
  try {
    user = JSON.parse(userRaw);
  } catch (e) {
    localStorage.removeItem('juca_auth_token');
    localStorage.removeItem('juca_auth_user');
    window.location.replace('/painel/login/');
    return;
  }

  const role = (user.role || 'cliente').toLowerCase();

  // 2. Validação de Permissões por Rota (RBAC Hierárquico)

  // Regra A: Cliente tentando acessar painel operacional
  if (role === 'cliente') {
    if (!currentPath.includes('/painel/cliente/')) {
      console.warn('[AuthGuard] Conta de cliente detectada no painel. Redirecionando para /painel/cliente/...');
      window.location.replace('/painel/cliente/');
      return;
    }
  }

  // Se estiver na tela informativa de cliente mas já foi promovido, manda pro painel
  if (currentPath.includes('/painel/cliente/') && role !== 'cliente') {
    redirectByRole(role);
    return;
  }

  // Regra B: Motoboy NUNCA acessa telas de pedidos gerais, admin, estoque, ceasa, cardápio, equipe
  const isAdminOrKitchenRoute = 
    currentPath.includes('/pedidos/') ||
    currentPath.includes('/admin/') ||
    currentPath.includes('/estoque/') ||
    currentPath.includes('/ceasa/') ||
    currentPath.includes('/produtos/') ||
    currentPath.includes('/promocoes/') ||
    currentPath.includes('/canais/') ||
    currentPath.includes('/equipe/') ||
    currentPath.includes('/configuracoes/');

  if (role === 'motoboy') {
    if (isAdminOrKitchenRoute || currentPath.endsWith('/painel/') || currentPath.endsWith('/painel/index.html')) {
      console.warn('[AuthGuard] Motoboy bloqueado de tela de gestão. Redirecionando para /painel/motoboy/...');
      window.location.replace('/painel/motoboy/');
      return;
    }
  }

  // Regra C: Atendente não acessa administração financeira nem gestão de equipe
  const isAdminOnlyRoute = currentPath.includes('/admin/') || currentPath.includes('/configuracoes/') || currentPath.includes('/equipe/');
  if (role === 'atendente') {
    if (isAdminOnlyRoute) {
      console.warn('[AuthGuard] Atendente bloqueado de tela administrativa/equipe. Redirecionando para /painel/pedidos/...');
      window.location.replace('/painel/pedidos/');
      return;
    }
    // Se estiver na raiz do painel, direciona direto para o Kanban de pedidos
    if (currentPath.endsWith('/painel/') || currentPath.endsWith('/painel/index.html')) {
      window.location.replace('/painel/pedidos/');
      return;
    }
  }

  // Regra D: Admin e Superadmin têm acesso liberado às suas respectivas áreas

  // 3. Injetar Pill de Sessão do Usuário no DOM após carregar
  document.addEventListener('DOMContentLoaded', () => {
    injectUserSessionBadge(user);
  });
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    injectUserSessionBadge(user);
  }

  function redirectByRole(userRole) {
    const r = (userRole || '').toLowerCase();
    if (r === 'cliente') {
      window.location.replace('/painel/cliente/');
    } else if (r === 'motoboy') {
      window.location.replace('/painel/motoboy/');
    } else if (r === 'atendente') {
      window.location.replace('/painel/pedidos/');
    } else {
      // admin ou superadmin
      window.location.replace('/painel/pedidos/');
    }
  }

  function injectUserSessionBadge(currentUser) {
    if (document.getElementById('juca-auth-session-badge')) return;

    const roleBadges = {
      superadmin: { label: 'Master Global', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: '👑' },
      admin: { label: 'Gestor Geral', bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30', icon: '🍕' },
      atendente: { label: 'Atendente', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: '📋' },
      motoboy: { label: 'Motoboy', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: '🛵' },
      cliente: { label: 'Cliente', bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30', icon: '👤' }
    };

    const userRoleKey = (currentUser.role || 'cliente').toLowerCase();
    const info = roleBadges[userRoleKey] || roleBadges.cliente;
    const badge = document.createElement('div');
    badge.id = 'juca-auth-session-badge';
    badge.className = 'fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md text-xs';
    badge.innerHTML = `
      <div class="flex items-center gap-1.5 pl-2 pr-1">
        <span class="text-sm">${info.icon}</span>
        <div>
          <div class="font-extrabold text-white text-[11px] leading-tight">${currentUser.nome_completo || currentUser.nome || currentUser.name || currentUser.username}</div>
          <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">${info.label}</div>
        </div>
      </div>
      <button 
        type="button" 
        onclick="window.JucaAuthGuard.logout()" 
        class="rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2.5 py-1 text-[10px] font-black transition"
        title="Encerrar sessão segura"
      >
        Sair
      </button>
    `;

    document.body.appendChild(badge);
  }

  // Exportar globalmente
  window.JucaAuthGuard = {
    getUser: () => user,
    getRole: () => role,
    logout: () => {
      if (confirm('Deseja realmente sair da sua conta?')) {
        localStorage.removeItem('juca_auth_token');
        localStorage.removeItem('juca_auth_user');
        window.location.replace('/painel/login/');
      }
    }
  };
})();
