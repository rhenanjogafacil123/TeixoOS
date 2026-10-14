# Teixo — Estratégia e Prioridades

> O que importa agora. Prioridades, metas e prazos da operação Teixo.
> Atualizado pelo `/instalar`.

---

## 1. Fase Atual

Expansão acelerada no nicho de **gastronomia, food delivery e alimentação local** (pizzarias, hamburguerias, confeitarias, açaiterias e marmitas fit saudáveis) na Zona Oeste e Zona Norte do Rio de Janeiro, com produtos validados e operações ativas.

---

## 2. Metas e Prazos

### Marco 1 — Até 20/12/2026:
- **30 lojas de alimentação/delivery** ativas com site próprio da TeixoAI no ar (Pizza do Juca e Marmitas Fit já integradas).
- **30.000 pedidos mensais** processados (média de 1.000 pedidos/loja).
- **Faturamento estimado:** **R$ 20.100,00/mês** só na microtaxa de R$ 0,67 por pedido.

### Marco 2 — Até Janeiro (Escala Plena):
- **40 lojas ativas** no modelo de delivery próprio da TeixoAI.
- **1.500 pedidos mensais por loja** (total de 60.000 pedidos/mês).
- **2.000 logins/clientes ativos cadastrados por loja** (total de 80.000 usuários ativos na base).
- **Faturamento estimado:** **R$ 40.200,00/mês** recorrentes.

---

## 3. Gargalo Crítico Atual (Prioridade #1 Imediata)

- **Infraestrutura, Backend e Produção Concluídos (Pizza do Juca):**
  - [x] Servidor Nginx configurado e deploy 100% no ar no IP `143.95.174.216` (AlmaLinux 9 com SELinux e proxy `/api/`).
  - [x] Backend REST em Node.js/Express e banco SQLite WAL ativos via systemd (`pizzadojuca.service`).
  - [x] Checkout Bricks do Mercado Pago integrado no site (modal dinâmico com PIX e Cartão, modo demonstração ativo).
  - [x] Notinhas térmicas dual (Cozinha sem valores + Balcão com endereço/cobrança) e Clube de Aniversário 10% OFF no ar.
  - [x] Chave SSH permanente do Rhenan configurada no servidor para deploys diretos.
  - [x] Primeiro vídeo viral comercial Earth to Shop Zoom concluído (`clientes/Pizza do Juca/videos/`).
  - [x] Economiômetro calibrado para o Plano Básico iFood (15,2% de comissão/taxa com frota própria de 3 a 4 motoboys) e briefing atualizado.

- **Matilha09 (Major Ronald Cadar — @caveiracadar09 / Mente Imperturbável):**
  - [x] Estruturação da pasta dedicada e hub da Matilha AI para clipadores e curadores de conteúdo (`clientes/Matilha09/`).
  - [ ] Cadastrar referências visuais de alta resolução em `referencias-rosto/`.
  - [ ] Mapear acervo de trilhas sonoras e sound effects em `trilhas/`.
  - [ ] Desenvolver modelos de capas cinematográficas com Safe Zone central em `capas/`.
  - [ ] Consolidar guia prático de garimpo de cortes virais em `conteudo/`.

- **Marmitas Fit (Piedade, RJ — Eduardo Fiocchi):**
  - [x] Mapeamento completo de produção (lotes, porcionamento 150g/120g/70-80g, curva ABC e rotina de quinta-feira de estoque/CMV).
  - [x] Desenvolvimento e deploy do cardápio digital próprio para desmame do Prefiro Delivery (ativo em https://rhenanjogafacil123.github.io/marmitasfit/).
  - [ ] Implementação de sugestão inteligente de compras com fator de cocção na Ordem de Produção.

  - [x] Template Modular ("Clonador de Lojas"): Empacotado via skill `/clonar-loja`, script nativo `scripts/gerar-delivery.ps1` e presets de nicho (`templates/delivery-store/presets/`).
  - [x] Esteira Jurídica de Contratos Blindados (`/contratos`): Modelos completos, biblioteca de cláusulas (Delivery R$ 0,67, Tráfego, Audiovisual, GMB, CMV e Combo 360º), termos de responsabilidade com regresso processual, LGPD e título executivo extrajudicial prontos para assinatura eletrônica. Contratos individuais finalizados para os clientes ativos (`Pizza do Juca`, `Marmitas Fit`, `Beto` e `Sitio Hostel Natureza` — este último validado no padrão executivo enxuto de 3 páginas para Tráfego de R$ 1.200 + Audiovisual com PL).
  - [x] Ferramentas Operacionais de Alto Impacto: Rastreio ao vivo do pedido para clientes (`/rastreio/`), Fechamento Noturno de Motoboys com impressão térmica 80mm e WhatsApp, Economiômetro Teixo vs. iFood e Turbo Upsell de fechamento implementados e ativos na VPS.
  - [x] Credenciais de Produção Mercado Pago: Inseridas via .env protegido (Zero Trust) e ativas na VPS (143.95.174.216) com checkout PIX e Cartão ao vivo para a conta bancária do Juca.
  - [x] Security Gate & Auditoria OWASP ASVS 5.0 L2: Rotas de pedidos, clientes e fechamentos 100% blindadas com JWT RBAC e headers defensivos (Score 100/100 A+).
  - [ ] Domínio e SSL (HTTPS): Configurar apontamento Cloudflare e certificado SSL na VPS HostGator (`143.95.174.216`).

---

## 4. O que vem a seguir (Fase 2 de Escala)

- **Expansão Ativa com o Clonador de Lojas (`/clonar-loja`):**
  - Clonador operacionalizado com template modular, script nativo e presets prontos. Foco em subir novas lojas em minutos na Zona Oeste e Zona Norte.
- **Tração de Conteúdo e Visibilidade (PL & Mateus):**
  - Manter o ritmo de vídeos virais na rua no formato repórter e capitalizar os contratos com lojistas locais.
- **Tráfego & Automação:**
  - Potencializar as vendas dos cardápios com campanhas locais de anúncios (Thiago) e automações no WhatsApp/CRM (Erick).
