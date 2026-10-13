# Pizza do Juca

> Projeto piloto de Food Delivery da Teixo. Pasta dedicada — instruções aqui sobrescrevem as da raiz quando relevantes.

## Sobre

Operação completa do ecossistema de gastronomia local e food delivery para a **Pizza do Juca** (Paciência, Zona Oeste do Rio de Janeiro).
Combina plataforma de delivery próprio (R$ 0 de setup e R$ 0 de mensalidade), central Kanban de despacho, app dos motoboys com monitoramento em tempo real, backend leve em SQLite, automações e captação de conteúdo audiovisual no local.

## Tipo

Cliente ativo / Operação Piloto Food Delivery & Audiovisual

---

## Estrutura da Pasta do Cliente

- `index.html` — Cardápio digital e checkout próprio ultrarrápido para os clientes finais.
- `painel/` — Central de gestão e despacho:
  - `painel/pedidos/` — Kanban de pedidos em tempo real (Novos, Em Produção, No Balcão, Em Rota, Entregues).
  - `painel/motoboy/` — App dos entregadores (mobile-first nativo) e central de despacho com visão das 4 telas de celular dos motoboys simultaneamente.
  - `painel/ceasa/` — Lista inteligente de compras no Ceasa-RJ (Irajá), controle de insumos esgotados/críticos, cálculo de gasto previsto e impacto no cardápio em tempo real.
  - `painel/admin/`, `painel/produtos/`, `painel/promocoes/`, `painel/canais/`, `painel/configuracoes/` — Gestão completa da loja.
- `backend-api/` — API REST em Node.js/Express com banco de dados SQLite local na VPS.
- `atualizar-tudo-vps.bat` e `atualizar-tudo-vps.ps1` — Scripts de deploy automatizado 1-clique para a VPS.
- `frames/`, `trilhas/`, `videos/`, `capas/` — Acervo e produções audiovisuais de campo (drone, repórter, vídeos comerciais de produto).

---

## Infraestrutura & Servidor VPS

- **IP do Servidor:** `143.95.174.216`
- **Porta SSH:** `22022`
- **Usuário:** `root`
- **Sistema Operacional:** AlmaLinux com Nginx e SELinux ativo
- **Diretório Web Nginx:** `/usr/share/nginx/html/`
- **Chave SSH Autorizada:** `~/.ssh/id_ed25519`
- **Deploy 1-clique:** Rodar `atualizar-tudo-vps.bat` diretamente desta pasta.

---

## Padrões de Operação Gastronômica (Padrão Teixo)

1. **Dia Operacional Noturno (Corte às 05:00):**
   - Vendas da madrugada (00:00 às 04:59) pertencem contabilmente ao turno da noite anterior.
2. **Comandas Segmentadas:**
   - Cozinha: sem valores monetários, foco total em itens e observações.
   - Motoboy: endereço com referência, contato rápido e destaque explícito de pagamento (`✓ JÁ PAGO NO SITE/PIX` ou `⚡ COBRAR NA ENTREGA: R$ XX,XX`).
3. **Despacho em Tempo Real:**
   - Visão espelhada das telas dos smartphones dos entregadores (Rafael, Diego, Matheus, Bruno).
   - Celular dos entregadores roda em visão limpa, sem barra de gestor e edge-to-edge.
4. **Regra de Nomenclatura:**
   - Zero underline (`_`) em arquivos gerados. Nomes limpos e legíveis com hífen e espaço.
