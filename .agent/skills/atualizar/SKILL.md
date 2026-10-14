---
name: atualizar
description: >
  Varre o projeto e atualiza os arquivos de contexto (`_memoria/empresa.md`, `preferencias.md`,
  `estrategia.md`, `CLAUDE.md`, `identidade/design-guide.md`) que ficaram desatualizados em relação
  ao estado real do workspace. Use quando o usuário disser "atualiza", "/atualizar", "varre o
  projeto", ou pedir uma reconciliação geral.
---

# /atualizar — Varredura e atualização de contexto

Compara o que está nos arquivos de contexto com o estado real do workspace e propõe atualizações.

## Workflow

### Passo 1 — Levantamento

Listar:
- Pastas na raiz (cada uma representa uma área de trabalho)
- Subpastas em `clientes/` (se existir) — cada uma é um cliente
- Skills em `.claude/skills/` — quais existem hoje
- Arquivos recentes (últimos 30 dias) em pastas como `propostas/`, `conteudo/`, `clientes/<x>/`

### Passo 2 — Comparação

Ler os arquivos de contexto e identificar:

- **Em `_memoria/empresa.md`:** lista de clientes / serviços / ferramentas — bate com a realidade do workspace?
- **Em `_memoria/estrategia.md`:** o foco atual ainda faz sentido (datas, prioridades)?
- **Em `CLAUDE.md`:** as regras de organização e a estrutura de pastas listada batem com o que existe?
- **Em `identidade/design-guide.md`:** continua coerente com o que foi gerado nas últimas peças (carrosséis, slides)?

### Passo 3 — Aplicação Automática das Mudanças

Identificar as defasagens e aplicar **imediatamente e de forma cirúrgica** todas as atualizações identificadas nos respectivos arquivos (`_memoria/empresa.md`, `preferencias.md`, `estrategia.md`, `identidade/design-guide.md`, `GEMINI.md`, `templates/skills/catalogo.md`), sem travar o fluxo para perguntar aprovação.

### Passo 4 — Resumo Executivo das Atualizações

Apresentar pro usuário a confirmação direta com o resumo do que foi aplicado:

```markdown
Atualizei [N] itens na memória e contexto:

1. `_memoria/empresa.md` — [O que foi atualizado]
2. `_memoria/estrategia.md` — [O que foi atualizado]
3. `templates/skills/catalogo.md` — [O que foi atualizado]

Tudo sincronizado e coerente com o estado real do workspace!
```

## Regras

- Não inventar fatos — só registrar o que tem evidência no workspace
- Se a evidência for ambígua (ex: pasta vazia chamada "Cliente Novo"), perguntar antes de adicionar
- Não apagar conteúdo dos arquivos de contexto — só atualizar e adicionar
- Se nenhuma mudança for necessária, responder "Tá tudo coerente, nada pra atualizar"
