# Marmitas Fit

> Projeto criado em 12/10/2026. Pasta dedicada — instruções aqui sobrescrevem as da raiz quando relevantes.

## Sobre

Migração da plataforma atual (Prefiro Delivery) para a infraestrutura de delivery próprio da Teixo (R$ 0,67 por pedido no checkout) e escala de vendas locais na Zona Norte e Zona Oeste do Rio de Janeiro.

## Tipo

Cliente novo / Food Delivery Saudável & Gastronomia

## Entregas previstas

- Plataforma / Cardápio Digital (site próprio da Teixo)

## Onde salvar o que

- Briefings e contexto: nesta pasta na raiz (`briefing.md`)
- Entregas de site e cardápio: `site/`
  - `site/index.html` — Cardápio digital oficial para os clientes (combos, frete por bairro, pedido mínimo de R$ 80, taxa de R$ 0,67 e checkout WhatsApp sincronizado).
  - `site/painel.html` — Painel Operacional completo do Eduardo Fiocchi (Kanban de pedidos em tempo real, Monitor de freezer 48h, Calculadora de Cocção & Lotes, Fechamento de CMV e Checklist Curva A).

## Contexto que herda da raiz

Esse projeto herda automaticamente o tom de voz, marca e contexto do negócio definidos em `_memoria/` e `identidade/` da raiz. Não duplicar essas informações aqui.

## Específico desse projeto

- **Nome Comercial:** Marmitas Fit (Marmitas Fit Saudável)
- **Localização:** Rua José Mariano, 10 — Piedade, Rio de Janeiro / RJ (CEP: 20756-190)
- **WhatsApp Oficial:** (21) 97035-7153
- **Instagram:** `@_marmitasfit`
- **Operação Atual:** Marmitas fitness congeladas, combos funcionais e low carb, com pedido mínimo de R$ 80,00 e frete grátis a partir de R$ 400,00.
- **Padrão Teixo:**
  - Cardápio estático ultrarrápido (HTML/Tailwind/JS) integrado à API REST e persistência local.
  - Taxa de conveniência de R$ 0,67 por pedido adicionada no checkout.
  - Zero underline (`_`) em nomes de arquivos gerados.
