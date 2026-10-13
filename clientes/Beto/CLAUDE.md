# Beto

> Projeto criado em 11/10/2026. Pasta dedicada — instruções aqui sobrescrevem as da raiz quando relevantes.

## Sobre

Operação audiovisual completa para Beto Chaves (@betochavesrj — Policial Civil do RJ, professor, criador do Papo de Responsa e palestrante): garimpo de cortes em podcasts/YouTube, edição cinematográfica vertical de Reels (1080x1920) e criação de capas cinematográficas no estilo pôster de ação/cinema.

## Tipo

Cliente ativo / Esteira de produção audiovisual

## Entregas previstas

- Garimpo e seleção de melhores cortes brutos em alta resolução (1080p / 4K)
- Edição completa de vídeos verticais para Reels / TikTok / Shorts (1080x1920)
- Capas cinematográficas 9:16 com safe zone central para feed do Instagram (1:1 e 4:5)

## Onde salvar o que

- Briefings e regras operacionais: `clientes/Beto/briefing.md` e `clientes/Beto/CLAUDE.md`
- Contrato jurídico: `clientes/Beto/contrato - producao audiovisual e cessao de imagem - beto chaves - versão final.md`
- Banco de trilhas sonoras: `clientes/Beto/trilhas/`
- Banco de capas cinematográficas: `clientes/Beto/capas/` (`capa - [tema] - versão final.jpg`)
- Frames e capturas de validação: `clientes/Beto/frames/`
- Vídeos finais e referências de vídeo: `clientes/Beto/videos/` (`reels - [tema] - versão final.mp4`)
- Banco de referências reais de rosto do Beto: `clientes/Beto/referencias-rosto/`

---

## As 3 Funções Operacionais do Assistente

O usuário pode acionar qualquer uma das 3 funções a qualquer momento:

### Função 1: Garimpo de Cortes a partir de Link do YouTube
1. O usuário envia um link do YouTube (podcast, entrevista, palestra).
2. O assistente analisa a transcrição completa e garimpa os melhores momentos/ganchos virais.
3. O assistente envia por escrito pro usuário a lista dos cortes selecionados, acompanhada da transcrição de cada um e a explicação do gancho.
4. O assistente recorta os trechos brutos no vídeo com a máxima qualidade possível (mínimo 1080p Full HD, ou 4K se disponível) e salva os arquivos prontos na pasta `clientes/Beto/cortes-brutos/`.

### Função 2: Criação de Capa Cinematográfica a partir de Vídeo Recortado
1. O usuário envia o vídeo recortado (ou indica qual da pasta utilizar).
2. O assistente gera a capa cinematográfica no estilo pôster de cinema:
   - **Rosto 100% fiel e real do Beto:** NUNCA usar rostos gerados aleatórios de IA. Usar sempre como referência facial as fotos reais de alta definição salvas em `clientes/Beto/referencias-rosto/` (óculos característicos, barba grisalha alinhada, traços reais dele).
   - **Posicionamento do Texto (Regra de Safe Zone Obrigatória):** O texto NUNCA pode ficar colado na parte inferior da imagem (para não ser coberto pela legenda, nome de usuário e botões da interface do Reels). O texto deve ficar posicionado na **zona segura central / terço médio** (visível perfeitamente no feed 1:1, no feed 4:5 e no Reels 9:16).
   - **Paleta e Atmosfera:** Iluminação quente de contorno (laranja/âmbar/fogo), contraste profundo, atmosfera dramática, fagulhas e texturas táteis.
   - **Arquivo Final:** Salvar em `clientes/Beto/capas/capa - [tema] - versão final.jpg` (zero underline).

### Função 3: Edição Cinematográfica Completa de Vídeo
1. O usuário envia o corte bruto.
2. O assistente executa a esteira cinematográfica completa:
   - **Gancho Inicial (Hook):** Nos primeiros 2 a 3 segundos, destacar um gancho polêmico, impactante ou intrigante com enquadramento mais fechado (*punch-in*).
   - **Transição Limpa:** Inserir uma transição clean e marcante (corte rápido, zoom punch ou flash sutil) logo após o gancho para impulsionar o restante do vídeo.
   - **ZERO LEGENDAS (Regra Absoluta):** NÃO utilizar legendas nos vídeos do Beto. O vídeo deve manter a estética 100% limpa, cinematográfica e sem poluição de texto na tela.
   - **Identificador Fixo Obrigatório:** Inserir apenas a assinatura `@Betochavesrj` no terço inferior, em laranja com contorno/sombra suave, sem interferir no enquadramento.
   - **Áudio e Trilha Sonora:** Utilizar as trilhas sonoras salvas em `clientes/Beto/trilhas/`, selecionando a música que melhor traduz o sentimento da cena (suspense, tensão, drama, emoção), alternando entre vídeos para não repetir, e aplicando *ducking* automático sob a voz do Beto.
   - **Enquadramento 9:16:** Alternância de planos (Base vs Punch-in zoom) acompanhando as inflexões e o peso da fala.
   - **Arquivo Final:** Salvar em `clientes/Beto/videos/reels - [tema] - versão final.mp4` (zero underline).

---

## Regra de Nomenclatura e Limpeza
- **Zero underline (`_`)** em todos os arquivos finais gerados.
- Nomes limpos com hífen e espaços em português.
- Apagar rascunhos e arquivos intermediários ao finalizar.
