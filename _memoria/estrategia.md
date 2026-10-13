# Teixo — Estratégia e Prioridades

> O que importa agora. Prioridades, metas e prazos da operação Teixo.
> Atualizado pelo `/instalar`.

---

## 1. Fase Atual

Expansão acelerada no nicho de **gastronomia e delivery local** (pizzarias, hamburguerias, confeitarias, açaiterias) na Zona Oeste do Rio de Janeiro, com produto validado e contratos já fechados.

---

## 2. Metas e Prazos

### Marco 1 — Até 20/12/2026:
- **30 lojas de lanchonete/delivery** ativas com site próprio da Teixo no ar.
- **30.000 pedidos mensais** processados (média de 1.000 pedidos/loja).
- **Faturamento estimado:** **R$ 20.100,00/mês** só na microtaxa de R$ 0,67 por pedido.

### Marco 2 — Até Janeiro (Escala Plena):
- **40 lojas ativas** no modelo de delivery próprio da Teixo.
- **1.500 pedidos mensais por loja** (total de 60.000 pedidos/mês).
- **2.000 logins/clientes ativos cadastrados por loja** (total de 80.000 usuários ativos na base).
- **Faturamento estimado:** **R$ 40.200,00/mês** recorrentes.

---

## 3. Gargalo Crítico Atual (Prioridade #1 Imediata)

- **Infraestrutura, Backend e Produção Concluídos (Pizza do Juca):**
  - [x] Servidor Nginx configurado e scripts de deploy 1-clique automatizados via SCP (`atualizar-tudo-vps.bat` e `.ps1`).
  - [x] Backend REST em Node.js/Express e banco de dados SQLite implementados com persistência híbrida e fallback em `localStorage` (`clientes/Pizza do Juca/backend-api/`).
  - [x] Central de despacho de motoboys espelhada e painel administrativo prontos.
  - [x] Primeiro vídeo viral comercial Earth to Shop Zoom concluído (`clientes/Pizza do Juca/videos/`).

- **Prioridades Imediatas (Próximos Passos):**
  - **Domínio e SSL (HTTPS):** Configurar apontamento de DNS e certificado SSL na VPS HostGator (`143.95.174.216:22022`).
  - **Validação de Fluxo de Ponta a Ponta:** Simular fechamento e impressão de pedidos da Pizza do Juca em ambiente real.
  - **Template Modular ("Clonador de Lojas"):** Empacotar a estrutura validada do Juca como matriz para acelerar a meta de 30 lojas até 20/12/2026.

---

## 4. O que vem a seguir (Fase 2 de Escala)

- **Repositório Modelo Replicável ("Clonador de Lojas"):**
  - Estruturar o projeto de delivery como um template modular limpo, onde cadastrar uma nova loja seja apenas clonar e preencher um arquivo de variáveis (nome, logo, dados, cores, taxa de pagamento).
- **Tração de Conteúdo e Visibilidade (PL & Mateus):**
  - Manter o ritmo de vídeos virais na rua no formato repórter e capitalizar os contratos com lojistas locais.
- **Tráfego & Automação:**
  - Potencializar as vendas dos cardápios com campanhas locais de anúncios (Thiago) e automações no WhatsApp/CRM (Erick).
