# Guia de Gestão Financeira, DRE Simplificado e Fluxo de Caixa da Teixo

> **Elaborado para a Teixo (Assessoria de Crescimento)**  
> **Objetivo:** Estruturar o controle de caixa, margens de lucro, fundo de reserva intocável e divisão justa e previsível entre os núcleos da operação.

---

## 1. A Estrutura de Entradas e Fontes de Receita da Teixo

A Teixo opera com um ecossistema diversificado de monetização, equilibrando **receitas recorrentes**, **microtaxas escaláveis** e **taxas pontuais de serviço**:

```
                              ┌─────────────────────────────────────────┐
                              │            RECEITAS DA TEIXO            │
                              └────────────────────┬────────────────────┘
                                                   │
        ┌──────────────────────┬───────────────────┴───────────────────┬──────────────────────┐
        ▼                      ▼                                       ▼                      ▼
┌──────────────────┐   ┌──────────────────┐                    ┌──────────────────┐   ┌──────────────────┐
│  MICROTAXA 0,67  │   │   TRÁFEGO PAGO   │                    │   AUDIOVISUAL    │   │  SETUPS & NFC    │
│(Delivery Próprio)│   │  (R$ 1.200/mês)  │                    │(R$ 500 / R$ 200) │   │ (R$ 500 / R$ 40) │
└──────────────────┘   └──────────────────┘                    └──────────────────┘   └──────────────────┘
```

1. **Microtaxa de Food Delivery (R$ 0,67/pedido):**
   - Pago pelo consumidor final no checkout da loja parceira.
   - Acumulado na conta Mercado Pago da loja ou diretamente intermediado pela Teixo.
   - **Repasse Quinzenal:** Feito pontualmente em terças-feiras alternadas ("terça-feira sim, terça-feira não"), dia de menor fluxo nas cozinhas parceiras.
2. **Gestão de Tráfego Pago Local:**
   - **R$ 1.200,00 mensais fixos** por cliente (Tiago).
   - Vencimento por aniversário de pagamento (mesmo dia do mês do primeiro acerto).
3. **Produção Audiovisual & Captação Presencial:**
   - Apresentação Institucional de Lançamento (1º Mês): **R$ 500,00** (taxa única).
   - Cobertura de Eventos Presenciais: **R$ 200,00 por evento**.
4. **Setup Tecnológico & Plaquinhas Físicas NFC:**
   - Taxa de setup para lojas com site institucional/hospedagem exclusiva: **R$ 500,00** (inclui 1 plaquinha de balcão).
   - Plaquinhas físicas codificadas adicionais (para mesas, quartos ou quiosques): **R$ 40,00 por plaquinha**.

---

## 2. O DRE Simplificado da Teixo (Demonstrativo do Resultado do Exercício)

O erro clássico de agências jovens é olhar o saldo total da conta bancária e gastar achando que tudo é lucro. 

Na Teixo, o fechamento mensal e o controle financeiro seguem a seguinte cascata do DRE:

```
  (+) FATURAMENTO BRUTO TOTAL (Soma de todas as entradas do mês)
  -------------------------------------------------------------
  (-) PROVISÃO TRIBUTÁRIA / IMPOSTOS (Caixinha Intocável: 6% a 10%)
  (-) TAXAS DE GATEWAY E CARTÃO (Taxas do Mercado Pago / Meios de Pagamento)
  =============================================================
  (=) RECEITA OPERACIONAL LÍQUIDA
  -------------------------------------------------------------
  (-) CUSTOS DIRETOS VARIÁVEIS POR PROJETO:
      - Custo de compra/gravação de Plaquinhas NFC físicas (~R$ 15,00/un)
      - Transporte / Combustível de gravações de campo (PL e Mateus)
      - Verbas de produção de terceiros (locação de drone / lentes)
  =============================================================
  (=) MARGEM DE CONTRIBUIÇÃO (O que a operação gera de valor real)
  -------------------------------------------------------------
  (-) CUSTOS OPERACIONAIS FIXOS DA TEIXO:
      - Servidor VPS HostGator (AlmaLinux 9 com proxy reverso e SQLite)
      - Domínios e proteção Cloudflare
      - Assinaturas de softwares e automações de CRM
      - Taxas bancárias / contabilidade
  =============================================================
  (=) LUCRO OPERACIONAL LÍQUIDO
  -------------------------------------------------------------
  (-) RETENÇÃO PARA FUNDO DE RESERVA / CAIXA DE GUERRA (10% a 20%)
  =============================================================
  (=) SALDO LÍQUIDO REAL PARA DISTRIBUIÇÃO AOS SÓCIOS
```

---

## 3. A "Caixinha Intocável" (Provisão Tributária e Reserva de Emergência)

Para blindar o caixa contra sustos, todo e qualquer valor que entrar na Teixo passa por duas separações imediatas antes de qualquer divisão entre os sócios:

### 1. A Caixinha dos Impostos (Provisão Fiscal — 6% a 10%):
- **O que é:** Uma reserva criada na conta bancária exclusivamente para pagar o DAS-MEI ou o DAS do Simples Nacional quando a empresa migrar para ME.
- **Regra:** Se entrar R$ 10.000,00 no mês, R$ 600,00 a R$ 1.000,00 são transferidos imediatamente para a caixinha tributária.  
- **Vantagem:** No dia 20 de cada mês, o dinheiro do imposto já está separado e rendendo no CDI. Nunca falta caixa para quitar guias tributárias.

### 2. O Fundo de Reserva / Caixa de Guerra (10% a 15% do Lucro Líquido):
- **O que é:** O patrimônio acumulado da própria empresa para cobrir eventuais meses de queda, inadimplência temporária de clientes, manutenção de equipamentos de filmagem (drone, microfones, câmeras) ou contratação de servidores mais potentes na VPS.
- **Meta Recomendada:** Acumular o equivalente a **3 meses de custos fixos operacionais** da Teixo em conta de alta liquidez.

---

## 4. Política de Prevenção à Inadimplência e Garantia de 15 Dias

No modelo de negócios da Teixo, existem duas salvaguardas essenciais:

1. **A Microtaxa de R$ 0,67 é Irrepetível:**  
   Nos contratos com garantia condicional de 15 dias de teste para lojistas (devolução do setup de R$ 500 ou crédito para tráfego), a microtaxa de R$ 0,67 por pedido aprovado durante o teste é **estritamente devida e não reembolsável**, pois remunera a infraestrutura técnica mantida no ar.
2. **Verba de Anúncios Faturada no Cartão do Cliente:**  
   A Teixo **nunca adianta verba de mídia paga do próprio bolso**. O cartão corporativo cadastrado no Meta Ads e Google Ads deve pertencer obrigatoriamente ao cliente. Isso zera o risco financeiro da agência em relação ao tráfego.

---

## 5. Rotina de Fechamento Financeiro (Toda Segunda-feira e Dia 1º)

Para manter as finanças da Teixo blindadas e transparentes entre Tiago, Rhenan e Erick:

- **Toda Segunda-feira:** Conciliação rápida de extrato bancário (conferência das mensalidades de R$ 1.200 com vencimento na semana e acionamento da régua de cobrança D-3 e D-0).
- **Terças-feiras Alternadas:** Apuração e repasse das microtaxas de delivery acumuladas nos cardápios.
- **Todo Dia 1º do Mês:** Fechamento do DRE do mês anterior, cálculo do lucro líquido, alimentação da Caixinha dos Impostos e transferência da Distribuição de Lucros Isenta para os sócios.
