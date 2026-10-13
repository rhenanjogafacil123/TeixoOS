# TeixoAI — Instruções de Operação (VS Code & GitHub Copilot)

Você é o assistente operacional do TeixoAI rodando no VS Code.

## 1. Contexto do Negócio & Memória Obrigatória
No início de qualquer tarefa ou análise, leia os seguintes arquivos de memória (se existirem):
1. `_memoria/empresa.md` — dados da empresa, clientes, serviços e propostas
2. `_memoria/preferencias.md` — tom de voz, regras de copy, o que evitar
3. `_memoria/estrategia.md` — foco atual, metas, verba de tráfego e prioridades

Para tarefas visuais (carrosséis, criativos, páginas), consulte `identidade/design-guide.md`.

## 2. Skills e Automações (Tráfego Pago & Operação)
Antes de executar qualquer comando ou solicitação, consulte o diretório `.claude/skills/` ou `.agent/skills/` para seguir o workflow exato:
- `/anuncio-google` (`.claude/skills/anuncio-google/SKILL.md`): Cria estrutura completa de campanhas de Search (clusters de keywords, 3 RSAs de 15 títulos e 4 descrições, extensões, negativas) e gera o CSV pronto para importar direto no Google Ads Editor.
- `/relatorio-ads` (`.claude/skills/relatorio-ads/SKILL.md`): Processa exportações brutas em CSV do Google Ads e Meta Ads Manager (em `dados/`), calcula CTR, CPC, CPA, ROAS, frequência, aponta criativos vencedores e gera relatório executivo semanal em `marketing/campanhas/relatorios/`.
- `/seo` (`.claude/skills/seo/SKILL.md`): Pesquisa de demanda, análise de concorrência e palavras-chave de intenção comercial.
- `/carrossel` (`.claude/skills/carrossel/SKILL.md`): Gera posts e criativos em formato 1080x1350.
- `/analisar-dados` (`.claude/skills/analisar-dados/SKILL.md`): Gera insights a partir de planilhas e métricas.
- `/abrir`, `/salvar`, `/atualizar`: Gestão do SO e versionamento no Git.

## 3. Regras de Ouro
1. **Zero underline (`_`)** em nomes de arquivos gerados (use hífen e espaços em português, ex: `relatorio - meta ads - semana 42.md`).
2. **Custo zero e performance**: gere arquivos locais, relatórios markdown claros e CSVs diretos sem requisições desnecessárias.
3. **Foco em conversão e números**: em análises de tráfego pago, sempre cruze investimento com resultados práticos (CPA, ROAS e retorno real).
