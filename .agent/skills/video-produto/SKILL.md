---
name: video-produto
description: >
  Cria vídeos e animações comerciais de produtos, embalagens 3D (Monster, latas, copos, caixas de delivery),
  gastronomia (hambúrgueres suculentos, pizzas com queijo esticando) e o efeito viral 'Earth to Shop Zoom'
  (mergulho contínuo do satélite no espaço até a fachada do restaurante ou balcão).
  Gera prompts cinematográficos calibrados para Google Flow / Google Veo, gera frames de referência em 4K
  e compõe vídeos animados locais com FFmpeg, trilha sonora e efeitos.
  Use quando o usuário pedir "vídeo de produto", "vídeo comercial", "animação de embalagem", "lata de monster",
  "vídeo de hambúrguer", "earth to shop zoom", "zoom do satélite", "google flow", "vídeo no flow" ou /video-produto.
---

# /video-produto — Vídeos Comerciais de Produtos, Embalagens e Earth Zoom

Skill especializada na criação de vídeos comerciais 3D de alta octanagem para gastronomia, produtos, embalagens (ex: lata de Monster, hambúrgueres artesanais, pizzas) e o formato viral **Earth to Shop Zoom** (visão do satélite no espaço mergulhando em alta velocidade até a fachada da loja).

---

## 1. Capacidades e Integração com Google Flow / Veo

A skill opera em dois níveis complementares:

1. **Pronto para IA Generativa (Google Flow & Veo):** Gera a engenharia de prompt cinematográfica exata usada no Google Flow (`flow.google`) e no modelo Google Veo, com comandos de câmera (Pan, Zoom, Tilt, Orbit, FPV), iluminação de estúdio comercial, texturas macro (gotas de água, fumaça, vapor) e especificações de quadros-chave (`First Frame` e `Last Frame`).
2. **Geração Visual & Renderização Local com FFmpeg:**
   - Cria os frames fotográficos 4K hiper-realistas diretamente via `generate_image`.
   - Compõe localmente vídeos em formato vertical (9:16 / 1080x1920) para Instagram Reels, TikTok e YouTube Shorts com animação de câmera (Ken Burns, transições contínuas de hiperlapse), áudio sincronizado e efeitos dinâmicos através do FFmpeg.

---

## 2. Padrões da Teixo & Regras Operacionais

- **Zero underline (`_`):** Nunca usar underline em nomes de arquivos gerados. Usar sempre espaços e hífens em português claro (ex: `vídeo - monster energy - versão final.mp4`, `frame - satelite terra.png`).
- **Estrutura de Pastas por Cliente:**
  - `clientes/<nome-do-cliente>/videos/` — Vídeos finais renderizados.
  - `clientes/<nome-do-cliente>/frames/` — Imagens base e quadros-chave gerados.
  - `clientes/<nome-do-cliente>/trilhas/` — Trilhas sonoras e efeitos de áudio.
  - Caso não seja para um cliente específico da pasta `clientes/`, salvar em `saidas/videos/` e `saidas/frames/`.
- **Limpeza Automática:** Deletar rascunhos, fragmentos temporários e arquivos intermediários após a renderização final, mantendo somente o arquivo definitivo.
- **Formato Padrão:** Vertical 9:16 (1080x1920, 30fps ou 60fps), otimizado para retenção em redes sociais.

---

## 3. Os 3 Modos Operacionais

### MODO 1: Earth to Shop Zoom (Do Espaço Sideral à Loja)

**Conceito:** O vídeo abre na órbita baixa da Terra (visão de satélite realista com atmosfera azul brilhante e escuridão do espaço), acelera em queda livre contínua através das nuvens em hiperlapse, entra na geografia regional do Rio de Janeiro / bairro local, desce rapidamente pela avenida e desacelera com suavidade milimétrica na fachada luminosa da loja (ou direto no prato/produto saindo no balcão).

#### Estrutura de Frames
- **Frame 01 (Órbita):** Planeta Terra visto do espaço, foco na curvatura do continente, atmosfera tênue e iluminação solar lateral.
- **Frame 02 (Reentrada/Nuvens):** Visão aérea em alta velocidade cruzando camadas de nuvens volumétricas, revelando a silhueta da cidade/bairro em perspectiva de drone FPV.
- **Frame 03 (Fachada do Estabelecimento):** Fachada fotográfica e acolhedora da loja (ex: Pizza do Juca, hamburgueria ou lanchonete) à noite ou entardecer, iluminação quente e letreiro nítido.

#### Prompt Padrão para Google Flow / Veo:
```text
[Camera: Extreme fast continuous zoom-in and downward FPV dive]
Cinematic satellite perspective from low Earth orbit looking down at planet Earth, rapidly descending through the atmosphere and rushing through dense volumetric clouds in a seamless hyperlapse. The camera swoops downwards over [Bairro / Cidade, ex: Paciência, Rio de Janeiro], tracking fast along the street level and executing a smooth cinematic deceleration, halting directly in front of [Nome da Loja, ex: Pizza do Juca storefront], warm neon and street lights, welcoming evening atmosphere, ultra photorealistic, 4k, 60fps, natural motion blur, cinematic color grade.
```

---

### MODO 2: Food Commercial 3D (Hambúrguer, Pizza, Sobremesas)

**Conceito:** Comercial de apetite agressivo com qualidade de anúncio televisivo internacional de fast-food / gastronomia premium.
- **Hambúrguer Artesanal:** Pão brioche brilhante descendo em slow-motion, carne smash suculenta com crosta crocante, queijo cheddar cremoso derretendo e escorrendo lentamente pelas bordas, fatias de bacon estalando, gotas de molho especial caindo com precisão, fios sutis de vapor e fumaça de chapa subindo.
- **Pizza com Queijo Puxando:** Fatia sendo erguida lentamente com queijo muçarela derretido esticando em fios dourados, borda recheada chamuscada no forno a lenha, rodelas de pepperoni brilhantes e folhas de manjericão fresco.

#### Prompt Padrão para Google Flow / Veo (Hambúrguer):
```text
[Camera: 360 slow motion orbital rotation with macro zoom]
Ultra-realistic 3D commercial food advertisement, gourmet artisanal smash burger assembly in ultra slow motion (120fps). Melted golden cheddar cheese slowly dripping down the juicy caramelized beef patty edges, crispy smoked bacon, toasted golden brioche bun with glistening sesame seeds. Delicate wisps of hot savory grill steam and aromatic smoke rising in dark studio background. Dramatic warm rim lighting, 85mm macro lens, shallow depth of field, appetizing 4K commercial quality.
```

---

### MODO 3: Drink & Packaging 3D (Lata de Monster, Refrigerantes, Embalagens)

**Conceito:** Render comercial futurista e energético de embalagem.
- **Lata de Monster Energy / Bebidas:** Lata de alumínio escovado com relevo texturizado em rotação lenta e hipnótica de 360°, coberta por gotículas de condensação gelada e minúsculas pedras de gelo escorrendo pela superfície. Iluminação de estúdio dramática com recorte neon (verde neon para Monster clássico, azul ou laranja para sabores especiais) e névoa gelada/vapor de nitrogênio subindo da base.
- **Caixas de Delivery & Sacolas:** Caixa de pizza ou embalagem de hambúrguer personalizada abrindo suavemente em 3D, revelando o produto fumegante em seu interior.

#### Prompt Padrão para Google Flow / Veo (Lata de Monster):
```text
[Camera: Slow steady 360-degree turntable rotation with macro push-in]
Ultra-realistic commercial product shot of a frosted cold Monster Energy aluminum can. Microscopic water droplets and icy condensation beads slowly trickling down the textured matte black and embossed electric green claw logo. Dramatic studio rim lighting with intense neon green accents, dark moody reflective floor, volumetric cold dry-ice fog rising around the base, 4k resolution, 85mm macro lens, hyper-detailed commercial advertisement.
```

---

## 4. Pipeline de Execução Passo a Passo

Quando o usuário solicitar a criação de um vídeo de produto ou Earth Zoom:

### Passo 1 — Identificar o Objetivo e Coletar Detalhes
Verificar:
- **Tema/Produto:** Ex: "Lata de Monster Energy", "Smash Burger duplo da loja X", "Earth Zoom para a Pizza do Juca".
- **Cliente:** Se houver pasta em `clientes/<nome>/`, vincular automaticamente.
- **Trilha de Áudio:** Escolher uma faixa adequada em `clientes/<cliente>/trilhas/` (ou indicar uma trilha épica/dinâmica).

### Passo 2 — Gerar as Imagens Base (Frames 4K)
Usar `generate_image` para criar os quadros-chave em proporção vertical `9:16` (ou `16:9` se solicitado).
- Para produtos/embalagens: Gerar imagem do produto em estúdio comercial com fundo escuro e iluminação de recorte.
- Para Earth Zoom: Gerar o frame inicial da Terra no espaço e o frame final da fachada da loja.
- Salvar a imagem gerada na pasta do cliente (`clientes/<nome>/frames/`) com nome limpo (ex: `frame - lata de monster gelada.jpg`).

### Passo 3 — Entregar o Prompt Pronto para o Google Flow (`flow.google`)
Formatar um bloco limpo e destacado contendo:
- Prompt principal em inglês cinematográfico.
- Comandos de câmera e movimentos recomendados.
- Parâmetros recomendados no Flow (FPS, Seed, Camera Motion).

### Passo 4 — Renderizar o Vídeo Local Animado com FFmpeg
Para que o usuário já tenha o vídeo pronto na máquina sem depender de ferramentas externas:
1. Utilizar o FFmpeg para aplicar animação de câmera contínua (efeito Ken Burns com zoom progressivo ou rotação sutil).
2. Adicionar vinheta dramática, reforço de contraste e sincronização com áudio de fundo da pasta `trilhas/`.
3. Salvar o arquivo final com nome limpo em `clientes/<nome>/videos/vídeo - [tema] - versão final.mp4`.

#### Template de Comando FFmpeg para Vídeo de Produto (Zoom Lento 9:16 + Áudio):
```powershell
ffmpeg -y -loop 1 -i "c:\caminho\frame - produto.jpg" -i "c:\caminho\trilha - comercial.mp3" -filter_complex "[0:v]scale=8000:-1,zoompan=z='min(zoom+0.0012,1.25)':d=180:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,vignette=PI/4[v]" -map "[v]" -map 1:a -c:v libx264 -c:a aac -b:a 192k -t 6 -pix_fmt yuv420p "c:\caminho\vídeo - produto - versão final.mp4"
```

#### Template de Comando FFmpeg para Earth to Shop Zoom (Fusão Dinâmica Espaço -> Fachada):
```powershell
ffmpeg -y -loop 1 -i "c:\caminho\frame - terra espaco.jpg" -loop 1 -i "c:\caminho\frame - fachada loja.jpg" -i "c:\caminho\trilha - impacto.mp3" -filter_complex "[0:v]scale=8000:-1,zoompan=z='min(zoom+0.0035,1.5)':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30[v0]; [1:v]scale=8000:-1,zoompan=z='min(zoom+0.001,1.15)':d=90:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30[v1]; [v0][v1]xfade=transition=smoothfast:duration=0.6:offset=2.4[v]" -map "[v]" -map 2:a -c:v libx264 -c:a aac -b:a 192k -t 5.5 -pix_fmt yuv420p "c:\caminho\vídeo - earth zoom - versão final.mp4"
```

### Passo 5 — Finalização e Limpeza
- Apagar arquivos temporários.
- Apresentar o vídeo final pronto com link direto clicável para o usuário conferir.
