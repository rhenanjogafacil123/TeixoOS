# Teixo — Empresa e Operação

> Memória central do negócio. O assistente lê esse arquivo antes de cada resposta.
> Atualizado pelo `/instalar`.

**Nome:** Teixo (Assessoria de Crescimento / Growth & Operações)  
**Origem do nome:** Família Teixeira e o Teixo (árvore milenar resistente, que representa raízes fortes e crescimento contínuo).  
**Localização:** Rio de Janeiro / RJ (foco de atuação presencial na Zona Oeste do Rio).  

---

## Sócios e Liderança

- **Rhenan Teixeira (17 anos):** Sites, tecnologia, infraestrutura web, ecossistema de delivery, conteúdo orgânico e expansão operacional.
- **Thiago Teixeira (21 anos):** Tráfego pago (Meta Ads e Google Ads), pioneiro na fundação da operação.
- **Erick Teixeira (19-20 anos):** Automações de processos, CRM e fluxos inteligentes de atendimento.

---

## Equipe e Parceiros de Campo

- **Patrick Teixeira:** Filmmaker e captação de vídeo aéreo com drone.
- **PL (Paulo Roberto):** Influenciador e prospecção presencial. Faz ponte direta com lojistas locais e grava conteúdo em vídeo.
- **Mateus ("Big"):** Atua em dupla com o PL na prospecção presencial e captação de conteúdo no formato dinâmico "estilo repórter" com microfone de canopla personalizada.

---

## O que a Teixo Entrega

A Teixo atua como uma **Assessoria de Crescimento**, combinando tecnologia, tráfego, automação e presença de campo para fazer empresas faturarem mais com eficiência, sem aumentar a carga de trabalho do dono:

1. **Plataforma de Delivery Próprio & Balcão NFC:** Cardápio digital ultrarrápido, pedidos presenciais via Plaquinha NFC/QR Code no balcão (com aviso sonoro e push no celular do cliente, eliminando o custo de bips para a loja), central Kanban de atendimento, painel financeiro e módulo de motoboys.
2. **Tráfego Pago:** Campanhas de aquisição local no Meta Ads e Google Ads.
3. **Automações & CRM:** Recuperação de clientes, atendimento automático e organização de pedidos.
4. **Captação de Conteúdo Presencial:** Vídeos dinâmicos no comércio no formato repórter e filmagens aéreas de drone.
5. **Produção Audiovisual & Vídeos Comerciais 3D:** Esteira de cortes verticais cinematográficos (Reels/Shorts), comerciais 3D de produtos/gastronomia e animações virais Earth to Shop Zoom (skill `/video-produto`).

---

## Modelo de Negócio & Oferta Irresistível (Food Delivery)

- **Fricção zero para o lojista:** R$ 0 de taxa de implementação e R$ 0 de mensalidade fixa.
- **Monetização da Teixo:** Microtaxa de conveniência de R$ 0,67 por pedido (paga pelo consumidor final no checkout, sem onerar o lojista).
- **Escala:** Sistema pré-estruturado e replicável — subir um novo restaurante exige mínimo esforço manual com máximo retorno previsível.

---

## Clientes Atendidos

- **Foco principal:** Gastronomia e alimentação local (pizzarias, hamburguerias, confeitarias, açaiterias e lanchonetes).
- **Pizza do Juca (Paciência, RJ):** Operação piloto completa do ecossistema de food delivery e atendimento presencial. Inclui cardápio digital, gestão de produtos e categorias, central de pedidos Kanban, despacho de motoboys (4 visões em tempo real), módulo de compras e insumos Ceasa-RJ (com impacto nas pizzas em tempo real), pedidos no balcão via NFC, cupom fiscal/térmico e integração multicanal (Site, Salão, iFood, 99Food) (`clientes/Pizza do Juca/`).
- **Beto (@betochavesrj):** Produção audiovisual completa — garimpo de cortes em podcasts (1080p/4K), edição cinematográfica vertical para Reels (gancho inicial de retenção, transição rápida, acervo próprio de 10 trilhas com ducking, zero legendas e assinatura `@Betochavesrj`), e capas no estilo pôster de ação/cinema com safe zone central (`clientes/Beto/`).
- **Marmitas Fit (Piedade, RJ):** Operação de marmitas fitness congeladas e refeições saudáveis em lote gerida por Eduardo Fiocchi. Migração da plataforma Prefiro Delivery para o ecossistema próprio TeixoAI (taxa de R$ 0,67 por pedido no checkout), cardápio digital porcionado (150g proteína, 120g carbo, 70-80g legumes) com pratos rotativos quinzenais, e painel inteligente de contagem física de estoque e cálculo de CMV (`clientes/Marmitas Fit/`).
- **Geografia:** Zona Oeste, Zona Norte e Grande Rio.

---

## Padrões de Engenharia & Operação de Food Delivery (Padrão Teixo)

Para todos os estabelecimentos gastronômicos e clientes de delivery atendidos pela Teixo, seguimos rigorosamente os seguintes padrões validados em campo:

1. **Dia Operacional & Turno Noturno (Corte às 05:00):**
   - Lojas que operam no período da noite (ex: 18:00 às 00:30 ou madrugadas) não têm o faturamento, relatórios ou status "aberto/fechado" reiniciados à meia-noite.
   - O dia operacional só fecha às 05:00 da manhã. Todos os pedidos feitos entre 00:00 e 04:59 pertencem operacional e contabilmente ao turno da noite anterior.

2. **Comandas Térmicas / Impressão Segmentada:**
   - **Via Cozinha:** Exibe somente itens em tamanho grande, massas, bordas e destaque visual para observações/modificações (ex: *Sem cebola*). Zero dados financeiros ou de troco (a cozinha foca exclusivamente no preparo).
   - **Via Motoboy:** Foco total no despacho — endereço com ponto de referência, telefone/WhatsApp do cliente, conferência de itens na bag e destaque obrigatório de cobrança (*"COBRAR NA ENTREGA: R$ XX"* ou *"JÁ PAGO NO SITE/PIX — NÃO COBRAR"*), grampeada na embalagem.
   - **Via Balcão:** Cupom completo para operador de caixa e controle da loja.
   - **Impressão 1-Clique [ ⚡ As 2 Vias ]:** Dispara cozinha + motoboy sequencialmente para agilizar a saída dos pedidos nos horários de pico.

3. **Central de Despacho & App dos Motoboys:**
   - O painel do gestor reflete **smartphones reais lado a lado**, simulando exatamente a tela de cada motoboy da frota.
   - O entregador vê: status Online/Offline, fila de pedidos em espera no balcão prontos para aceitar corrida, ganhos do turno, e rota ativa com contato direto no WhatsApp do cliente e confirmação de entrega em 1 clique.
   - Zero mapas decorativos pesados no app — foco em velocidade extrema, legibilidade e baixo consumo de dados móveis no celular do motoboy.

4. **Desempenho Extremo e Custo Zero de Infraestrutura:**
   - Frontend estático ultrarrápido (HTML/Tailwind/Vanilla JS) combinado com backend REST leve em Express e banco SQLite local na VPS.
   - Mecanismo de persistência híbrida: sincroniza com a VPS e mantém fallback local no navegador (`localStorage`), garantindo que o cardápio e os pedidos nunca travem mesmo com oscilações de sinal.
   - Zero dependência de serviços externos pagos por requisição ou bancos de dados em nuvem pesados.

5. **Comparativo Comercial de Taxas (iFood vs Teixo):**
   - Comparativo baseado em dados reais do mercado: iFood cobra de 12% a 27% sobre o faturamento total da loja mais mensalidade fixa.
   - A Teixo posiciona a sua plataforma própria com R$ 0 de setup, R$ 0 de mensalidade e taxa de conveniência de R$ 0,67 por pedido no checkout (paga pelo consumidor final), gerando milhares de reais de economia mensal líquida para o lojista.

6. **Integração Multicanal Realista:**
   - O painel consolida pedidos de todos os canais: Cardápio Próprio, Balcão/Mesa NFC, iFood e 99Food.
   - Controle operacional unificado via Merchant API: pausar a loja quando a cozinha lotar, alterar tempo de entrega estimado e aceitar/despachar pedidos sem precisar alternar entre vários tablets.

7. **Gestão de Estoque, Curva ABC & Fatores de Cocção:**
   - **Rotina Semanal de Estoque (Quinta-feira):** Contagem física setorizada e rápida para apuração de CMV real, giro de insumos e % de estoque sobre faturamento.
   - **Curva ABC Prática:** Classe A (alto giro / impacto crítico no CMV, ex: frango, arroz, ovos, queijos) auditados com alta frequência; Classes B e C calibrados pelo ciclo de cardápio.
   - **Fator de Cocção & Rendimento na Ordem de Produção:** Cálculo automático das perdas e ganhos de peso no preparo (arroz quase dobra, feijão triplica, proteínas perdem 20-30%, frutos do mar perdem ~60%), conectando a projeção de vendas à quantidade real de insumo cru a ser comprado e descongelado.

