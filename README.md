# TeixoAI — Sistema Operacional de Negócios & IA

> Sistema operacional, inteligência operacional e esteira de IA da **TeixoAI (Assessoria de Crescimento Teixo)**.

O **TeixoAI** unifica tecnologia, inteligência artificial prática, infraestrutura web, tráfego pago local, automações de CRM, captação de campo e produção audiovisual cinematográfica em um ecossistema integrado para alavancar empresas e comércios locais (com foco inicial em gastronomia e food delivery na Zona Oeste do Rio de Janeiro).

---

## Liderança & Equipe

- **Sócios Fundadores:**
  - **Rhenan Teixeira:** Sites, tecnologia, infraestrutura web, ecossistema de delivery, conteúdo orgânico e expansão operacional.
  - **Thiago Teixeira:** Tráfego pago de alta conversão (Meta Ads e Google Ads).
  - **Erick Teixeira:** Automações de processos, CRM e fluxos inteligentes no WhatsApp.
- **Produção e Presença de Campo:**
  - **Patrick Teixeira:** Filmmaker e captação de vídeo aéreo com drone.
  - **PL (Paulo Roberto) & Mateus ("Big"):** Prospecção comercial presencial e gravação de conteúdo dinâmico no formato "repórter de rua" com microfone de canopla personalizada.

---

## Clientes & Operações Ativas

1. **Pizza do Juca (Paciência, RJ) — Food Delivery & Balcão NFC:**
   - Plataforma própria de delivery (R$ 0 de setup e R$ 0 de mensalidade fixa; microtaxa de R$ 0,67 por pedido paga no checkout).
   - Cardápio digital mobile-first ultrarrápido com persistência híbrida e fallback em `localStorage`.
   - Painel Kanban de pedidos (Novos, Produção, Balcão, Em Rota, Entregues).
   - Central de despacho com visão simultânea das telas dos smartphones dos motoboys.
   - Comandas térmicas segmentadas (Via Cozinha sem valores + Via Motoboy com destaque explícito de pagamento) e botão 1-clique [ ⚡ As 2 Vias ].
   - Backend REST em Node.js/Express com banco SQLite local e deploy automatizado 1-clique para VPS HostGator (`atualizar-tudo-vps.bat`).
   - Primeiro vídeo comercial viral 3D *Earth to Shop Zoom* finalizado.

2. **Beto Chaves (@betochavesrj) — Esteira Audiovisual Cinematográfica:**
   - Garimpo de cortes em podcasts em alta resolução (1080p / 4K).
   - Edição vertical (9:16) com gancho de retenção nos primeiros segundos e enquadramento *punch-in*.
   - Padrão **Zero Legendas** na tela com identificador fixo `@Betochavesrj` no terço inferior.
   - Banco dedicado de trilhas sonoras com mixagem e *ducking* automático sobre a voz.
   - Capas cinematográficas no estilo pôster de ação/cinema com respeito obrigatório à **Safe Zone** central.

---

## Catálogo de Skills (16 Automações Disponíveis)

### Núcleo de Operação
- `/abrir` — Carrega o contexto do negócio (`_memoria/`) e resume as prioridades da sessão.
- `/salvar` — Versiona o trabalho no repositório GitHub com commit e push seguros.
- `/atualizar` — Varre o workspace, compara evidências reais e mantém arquivos de contexto sincronizados.
- `/novo-projeto` — Cria pastas padronizadas e instruções dedicadas para novos clientes.
- `/mapear-rotinas` — Identifica tarefas repetitivas do dia a dia e cria skills personalizadas.

### Conteúdo, Audiovisual & SEO
- `/video-produto` — Cria vídeos comerciais 3D de produtos (embalagens, hambúrgueres, pizzas) e o formato viral *Earth to Shop Zoom* (do espaço sideral até a loja), gerando prompts para Google Flow/Veo e renderizando localmente com FFmpeg.
- `/carrossel` — Cria posts e carrosséis visuais para Instagram/LinkedIn em padrão 1080×1350 com Playwright.
- `/publicar-tema` — Transforma um tema em artigo de blog, carrossel e legendas completas.
- `/seo` — Fluxo estratégico de 8 passos (demanda, concorrentes, Google Meu Negócio, on-page, GEO/IAs).
- `/responder-avaliacoes` — Gera respostas humanas e personalizadas para avaliações do Google Meu Negócio.
- `/aprovar-post` — Publica artigos e carrosséis em redes sociais via Meta Graph API e deploy de site.

### Tráfego & Performance
- `/anuncio-google` — Estrutura campanhas de Search em CSV pronto para o Google Ads Editor.
- `/relatorio-ads` — Gera análises executivas semanais de Meta Ads e Google Ads com alertas e planos de ação.

### Operação & Produtividade
- `/analisar-dados` — Analisa arquivos CSV, Excel e JSON gerando insights estratégicos.
- `/email-profissional` — Redige comunicados e propostas com calibragem de tom para B2B.
- `/instalar` — Setup guiado de novos módulos e entrevistas de calibragem de negócio.

---

## Estrutura do Workspace

```
TeixoAI/
├── _memoria/            # Memória central permanente (empresa, preferências, estratégia)
├── identidade/          # Logo oficial, paleta Dark/Verde Teixo e guia de design
├── clientes/            # Pastas dedicadas por cliente (Pizza do Juca, Beto Chaves, etc.)
│   ├── Pizza do Juca/   # Cardápio, painel, motoboys, API SQLite, scripts de deploy VPS
│   └── Beto/            # Capas, frames, trilhas sonoras, cortes e referências de rosto
├── propostas/           # Propostas comerciais B2B
├── marketing/           # Materiais institucionais e posicionamento da Teixo
├── saidas/              # Arquivos finais, relatórios e entregas prontas
├── dados/               # Planilhas, métricas e bases de dados
├── scripts/             # Scripts utilitários de automação
├── templates/           # Modelos de skills, perfis e design guides
├── .agent/skills/       # Skills do Antigravity (Google / Gemini)
└── .claude/skills/      # Skills do Claude Code
```

---

## Regras Fundamentais da Operação

1. **Zero underline (`_`):** Nomes de arquivos gerados e salvos devem ser sempre legíveis, usando hífens e espaços em português (ex: `capa - tema - versão final.jpg`).
2. **Dia Operacional Noturno (Corte às 05:00):** Em clientes de delivery, vendas entre 00:00 e 04:59 pertencem operacionalmente ao turno da noite anterior.
3. **Comandas Segmentadas:** Cozinha focada em preparo (sem valores); Motoboy com destaque obrigatório de cobrança/pago.
4. **Performance e Custo Zero:** Frontend estático com backend leve (Node.js/SQLite) e persistência em `localStorage` — sem dependência de serviços pagos por requisição.
