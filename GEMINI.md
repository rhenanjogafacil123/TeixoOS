# TeixoOS — Sistema operacional do negócio

Sua empresa roda em cima desse arquivo. Aqui ficam as regras de operação
do TeixoOS — como o assistente lê o contexto, aprende com correções, mantém
tudo atualizado e cria skills novas conforme a operação evolui.

Esse arquivo é editável. Quando o `/instalar` rodar, ele complementa o
final dessa página com as regras específicas do seu negócio.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar
`identidade/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.agent/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o
usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o
padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma
instrução que parece permanente (frases como "na verdade é assim", "não
faça mais isso", "prefiro assim", "sempre que...", "evita...", "da
próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `GEMINI.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.
Confirmar mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na
verdade o arquivo se chama X"). Só perguntar quando a informação tiver
valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada, estrutura
alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `GEMINI.md`
- **Visual (cores, fontes, logo)** → `identidade/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se
   existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.agent/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.agent/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
   o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, exemplos),
   criar dentro da pasta da skill
5. Seguir as diretrizes de criação de skills do sistema

---

## Perfil da Operação — Teixo (Assessoria de Crescimento)

**Fundadores:** Rhenan Teixeira (Sites, Tecnologia e Operação), Thiago Teixeira (Tráfego Pago), Erick Teixeira (Automação e CRM).  
**Equipe de Produção e Campo:** Patrick Teixeira (Drone), PL & Mateus/Big (Comercial presencial e captação no formato repórter de rua).  
**Foco Atual:** Gastronomia local e delivery (pizzarias, hamburguerias, confeitarias, açaiterias) na Zona Oeste do Rio de Janeiro.  
**Modelo Comercial:** Delivery próprio com taxa de R$ 0,67 por pedido (R$ 0 de setup e R$ 0 de mensalidade), mais tráfego local, automações e captação de conteúdo.

**Padrões Operacionais de Food Delivery:**
- **Dia Operacional Noturno:** Corte às 05:00 da manhã (pedidos da madrugada pertencem ao turno da noite anterior).
- **Comandas Impressas Segmentadas:** Via Cozinha (sem valores monetários, foco em preparo e alertas) + Via Motoboy (endereço com referência, conferência, destaque de cobrança/pago) + Balcão. Botão 1-clique [ ⚡ As 2 Vias ].
- **Central de Despacho:** Visão em tempo real das telas dos celulares dos motoboys (pedidos em espera no balcão e rota ativa com WhatsApp do cliente). Zero mapas decorativos pesados.
- **Performance e Custo Zero:** Frontend estático ultrarrápido + API REST/SQLite com fallback local (`localStorage`), sem requisições caras ou dependência de nuvem pesada.

**Estrutura de Pastas:**
- `_memoria/` — memória permanente (empresa, preferências, estratégia)
- `identidade/` — logo, cores e guia de design da Teixo
- `clientes/` — pastas individuais de clientes com suas respectivas entregas (para projetos audiovisuais/vídeo: subdividir em `capas/`, `frames/`, `trilhas/`, `videos/` e `referencias-rosto/`)
- `propostas/` — propostas comerciais e apresentações
- `marketing/` — conteúdo institucional e posicionamento da Teixo
- `saidas/` — arquivos finais, relatórios e entregas
- `dados/` — relatórios, dados de clientes e métricas
- `.agent/skills/` — catálogo de skills e automações operacionais

**Regra de Nomenclatura e Limpeza de Arquivos (Todos os Projetos):**
- Zero underline (`_`) em nomes de arquivos gerados ou salvos.
- Nomes legíveis e limpos com hífen e espaços (ex: `capa - tema - versão final.jpg`).
- Apagar rascunhos e versões intermediárias ao concluir, mantendo apenas a versão final.


