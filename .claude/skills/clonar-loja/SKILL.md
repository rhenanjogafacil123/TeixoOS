---
name: clonar-loja
description: >
  Clona e gera uma operação completa de food delivery (hamburgueria, pizzaria, pastelaria, lanchonete, açaiteria)
  em segundos a partir da matriz validada da Teixo. Cria cardápio digital com Checkout Bricks do Mercado Pago,
  painel Kanban, notinhas térmicas dual, despacho de motoboy e backend SQLite. Use quando o usuário pedir
  "clonar loja", "novo delivery", "criar hamburgueria", "nova pizzaria", "nova pastelaria", "cadastrar restaurante",
  "clonador de lojas" ou /clonar-loja.
---

# /clonar-loja — Clonador de Ecossistema de Delivery (Teixo)

Cria uma operação completa de delivery e atendimento presencial em **menos de 30 segundos**, permitindo escalar a Teixo rumo à meta de 30 lojas ativas com esforço operacional mínimo.

---

## 1. Nichos Suportados e Presets Prontos

A matriz conta com catálogos, cores e regras calibradas em `templates/delivery-store/presets/`:

| Nicho | Ícone | Setor da Cozinha | Cores Predominantes | Catálogo Padrão |
| :--- | :---: | :--- | :--- | :--- |
| **Hamburgueria** | 🍔 | `CHAPA / MONTAGEM` | Vermelho / Âmbar / Dark | Burgers artesanais, smash, combos, batatas turbinadas e milkshakes. |
| **Pizzaria** | 🍕 | `FORNO / COZINHA` | Pomodoro / Manjericão / Dark | Pizzas salgadas, doces, bordas vulcão, refrigerantes 2L. |
| **Pastelaria** | 🥟 | `FRITURA / MONTAGEM` | Dourado / Verde Cana / Dark | Pastéis especiais 30cm, tradicionais 20cm, doces, caldo de cana 1L. |
| **Lanchonete** | 🥪 | `CHAPA & COZINHA` | Laranja / Amarelo / Dark | X-Tudo, dogs prensados, salgados gigantes, pratos feitos, sucos naturais. |
| **Açaiteria** | 🍧 | `MONTAGEM / COPOS` | Roxo Açaí / Rosa / Dark | Copos 300ml a 700ml, copos trufados, barcas e potes de 1L. |

---

## 2. O que é Gerado para Cada Cliente

Ao clonar, a pasta `clientes/<Nome da Loja>/` é criada com:

1. **Cardápio Digital (`index.html`):**
   - Storefront ultrarrápido em Tailwind CSS e Vanilla JS.
   - **Checkout Bricks (Mercado Pago):** Pagamento 100% online antes do pedido ir pra cozinha (PIX dinâmico com QR Code e Cartão de Crédito).
   - **Clube de Aniversário:** Captura de data pós-checkout com cupom de 10% de presente.
   - **Upsell Inteligente ("Compre Junto"):** Bebidas, molhos e sobremesas recomendados no carrinho.
   - **Balcão NFC:** Suporte a pedidos presenciais via plaquinha no balcão.

2. **Central de Gestão (`painel/`):**
   - **Kanban em Tempo Real (`painel/pedidos/`):** Colunas de Recebidos, Em Preparo, Despacho e Concluídos.
   - **Notinhas Térmicas Dual:**
     - `🖨️ Notinha Cozinha` — Apenas itens, massas, pontos e observações (zero valores financeiros).
     - `🧾 Notinha Balcão` — Endereço com ponto de referência, telefone e status de pagamento.
     - Botão 1-clique `[ ⚡ As 2 Vias ]`.
   - **Gerenciador de Cardápio (`painel/produtos/`):** Edição em massa de preços por categoria e Destaque da Casa (⭐).

3. **Backend API & Banco de Dados (`backend-api/`):**
   - Servidor Node.js Express leve e banco de dados SQLite nativo (WAL mode).
   - Webhook do Mercado Pago para confirmação bancária em tempo real.
   - Script de deploy automatizado (`atualizar-vps.bat` e `.ps1`).

4. **Memória e Documentação (`CLAUDE.md`):**
   - Resumo executivo da operação do cliente registrado no padrão Teixo.

---

## 3. Workflow de Execução

Quando o usuário pedir para clonar ou criar uma loja:

### Passo 1 — Coletar os Dados Básicos
Perguntar ou extrair do pedido:
- **Nome da Loja** (ex: *Burguer do Rafa*, *Pastel da Feira*)
- **Nicho** (`hamburgueria`, `pizzaria`, `pastelaria`, `lanchonete`, `acaiteria`)
- **Bairro / Região** (ex: *Campo Grande, RJ*)
- **WhatsApp do Lojista** (ex: *21988887777*)

### Passo 2 — Executar o Gerador
Rodar o script nativo via terminal:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\gerar-delivery.ps1 -Nome "Nome da Loja" -Nicho "hamburgueria" -Bairro "Bairro" -WhatsApp "5521999999999"
```

### Passo 3 — Atualizar a Memória
Adicionar a nova loja em `_memoria/empresa.md` sob a lista de clientes atendidos.

### Passo 4 — Entregar os Links
Informar ao usuário:
- Caminho dos arquivos locais gerados: `clientes/<Nome da Loja>/`
- Como testar localmente no navegador abrindo o `index.html`.
- Comando para subir na VPS quando o cliente aprovar.

---

## 4. Regras Operacionais Inegociáveis

1. **Microtaxa Teixo:** O checkout sempre mantém a taxa de R$ 0,67 de conveniência embutida no total pago pelo consumidor. R$ 0 de mensalidade e R$ 0 de setup para o lojista.
2. **Nomenclatura Limpa:** Zero underlines (`_`) em arquivos gerados.
3. **Turno Noturno:** Fechamento contábil e operacional rigoroso às 05:00 da manhã.
4. **Independência de Nuvem:** Frontend estático + SQLite local garantem custo R$ 0 de hospedagem e velocidade imediata no celular do cliente.
