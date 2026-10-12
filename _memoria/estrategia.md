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

- **Infraestrutura, Backend e Segurança (VPS HostGator `143.95.174.216:22022`):**
  - Servidor Nginx configurado e servindo a Pizza do Juca em produção com deploy via SCP.
  - **Backend & Banco de Dados:** Implementar persistência dos pedidos, produtos e clientes no banco de dados na VPS (com fallback local no navegador para zero risco de travar vendas).
  - **Domínio e SSL (HTTPS):** Configurar apontamento de DNS e certificado SSL (cadeado verde) para navegação 100% segura.
  - **Segurança da VPS:** Configurar firewall UFW (apenas portas 22022, 80 e 443 liberadas), fail2ban contra ataques de força bruta e rotina de backup.
  - Capacitar o Rhenan para dominar a operação completa sem depender de termos técnicos complexos, operando com total segurança e confiança.

---

## 4. O que vem a seguir (Fase 2 de Escala)

- **Repositório Modelo Replicável ("Clonador de Lojas"):**
  - Estruturar o projeto de delivery como um template modular limpo, onde cadastrar uma nova loja seja apenas clonar e preencher um arquivo de variáveis (nome, logo, dados, cores, taxa de pagamento).
- **Tração de Conteúdo e Visibilidade (PL & Mateus):**
  - Manter o ritmo de vídeos virais na rua no formato repórter e capitalizar os contratos com lojistas locais.
- **Tráfego & Automação:**
  - Potencializar as vendas dos cardápios com campanhas locais de anúncios (Thiago) e automações no WhatsApp/CRM (Erick).
