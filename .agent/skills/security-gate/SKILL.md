---
name: security-gate
description: Executa auditoria e portão de segurança (Security Gate) automatizado baseado no OWASP ASVS 5.0, OWASP Top 10:2025 e OWASP API Security Top 10. Varre código, rotas de API, autenticação, controle de acesso e configurações para aprovar ou bloquear deploys com relatório executivo de conformidade.
---

# Security Gate — Auditoria & Portão de Segurança Contínua

Esta skill atua como o **Auditor Chefe de Segurança da Aplicação e Security Gatekeeper** da Teixo. 
Ela inspeciona o código-fonte, endpoints de API, middlewares, banco de dados, frontend e configurações de servidor para validar se a aplicação cumpre os mais rigorosos padrões internacionais de cibersegurança antes de qualquer deploy em produção.

---

## 🎯 Quando usar

Use esta skill sempre que:
- O usuário pedir `/security-gate`, "auditar segurança", "security gate", "owasp", "verificar vulnerabilidades", "passar no security gate", "teste de invasão" ou "pentest".
- Antes de subir uma nova loja de delivery, novo cliente ou nova versão para a VPS/produção.
- Ao adicionar novas rotas de API, novos fluxos de pagamento ou alterações no sistema de autenticação/RBAC.

---

## 🛡️ Os 3 Frameworks de Auditoria

A skill audita o projeto contra a tríade internacional da OWASP:

### 1. OWASP Top 10:2025 (Web Application Security Risks)
1. **A01: Broken Access Control (Controle de Acesso Quebrado):**
   - Validar se rotas administrativas (`/admin`, `/equipe`, `/pedidos`) são bloqueadas no backend (HTTP 403) e no frontend.
   - Auditar prevenção contra IDOR (*Insecure Direct Object References*) em pedidos, clientes e fechamentos.
   - Checar se um usuário comum consegue acessar ou modificar dados de terceiros.
2. **A02: Cryptographic Failures (Falhas Criptográficas):**
   - Verificar se senhas usam exclusivamente algoritmos de dispersão com salt (`bcrypt` com >= 10 rounds ou `argon2`). Zero senhas em texto puro, MD5 ou SHA1.
   - Checar ausência de segredos ou chaves privadas (*hardcoded*) no código-fonte.
   - Auditar conformidade PCI-DSS: zero armazenamento de números de cartão de crédito ou CVV nos servidores locais.
3. **A03: Injection (Injeção de SQL, NoSQL e Comandos):**
   - Auditar se 100% das consultas ao banco utilizam *Prepared Statements* / consultas parametrizadas com placeholders (`?`).
   - Banir qualquer concatenação de strings em SQL (`"SELECT * FROM ... WHERE id = " + id`).
   - Checar sanitização de comandos de sistema e scripts auxiliares.
4. **A04: Insecure Design (Design Inseguro):**
   - Avaliar se a lógica de negócio impede fraudes: conferência de valores de pedidos no backend (nunca confiar no valor total enviado pelo cliente no frontend).
   - Validar liberação do pedido para preparo apenas após confirmação bancária real (webhook autenticado).
5. **A05: Security Misconfiguration (Configuração Incorreta de Segurança):**
   - Auditar cabeçalhos de resposta HTTP (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`).
   - Checar se portas de serviços internos (ex: Node.js na porta 3001) estão amarradas a `127.0.0.1` (localhost), sem exposição direta para a internet.
   - Verificar ausência de mensagens de erro detalhadas ou stack traces vazando para o usuário final.
6. **A06: Vulnerable and Outdated Components (Componentes Desatualizados/Vulneráveis):**
   - Verificar `package.json` contra CVEs e pacotes obsoletos.
   - Checar integridade de scripts externos em CDNs.
7. **A07: Identification and Authentication Failures (Falhas de Autenticação):**
   - Checar exigência de tamanho mínimo de senha (mínimo 4-8 caracteres).
   - Validar expiração segura de tokens JWT (máximo 12h a 24h).
   - Validar destruição segura da sessão no logout (`localStorage.removeItem`).
8. **A08: Software and Data Integrity Failures (Falhas de Integridade):**
   - Auditar se webhooks de pagamento verificam assinaturas de integridade e idempotência.
9. **A09: Security Logging and Monitoring Failures (Falhas de Log e Monitoramento):**
   - Validar se eventos críticos (logins com falha, bloqueios 403, concessão de cargos administrativos) são logados com data/hora e identificador.
   - Garantir que senhas e tokens **nunca** sejam impressos nos logs.
10. **A10: Server-Side Request Forgery (SSRF):**
    - Auditar requisições de saída HTTP para garantir que URLs de destino sejam estritamente controladas e parametrizadas.

---

### 2. OWASP API Security Top 10 (2023 / 2025)
1. **API1 — BOLA (Broken Object Level Authorization):**
   - Validar se endpoints como `/api/pedidos/:id` ou `/api/motoboys/fechamentos` conferem a titularidade do objeto antes de retornar ou alterar dados.
2. **API2 — Broken Authentication:**
   - Conferir middleware `authenticateToken` na raiz das rotas protegidas da API.
   - Validar se requisições sem `Bearer Token` são rejeitadas imediatamente com HTTP 401.
3. **API3 — BOPLA / Mass Assignment (Manipulação de Propriedades do Objeto):**
   - Auditar endpoints de cadastro e atualização (ex: `POST /api/auth/register`, `PUT /api/usuarios/:id`): o backend deve extrair explicitamente campos autorizados (`nome`, `email`, `telefone`) e **descartar** campos sensíveis injetados (como `role: 'admin'`).
4. **API4 — Unrestricted Resource Consumption (Rate Limiting & DoS):**
   - Auditar se rotas de autenticação e checkout possuem proteção contra rajadas de força bruta.
   - Limitar payloads de entrada no body parser (ex: `limit: '1mb'`).
5. **API5 — BFLA (Broken Function Level Authorization):**
   - Validar se rotas operacionais de equipe (`/api/equipe/promover`, `/api/admin/faturamento`) exigem cargo `admin` ou `superadmin` diretamente no middleware da rota.
6. **API6 — Unrestricted Access to Sensitive Business Flows:**
   - Checar se fluxos como aplicação de cupons, alteração de status de pedidos e cálculo de taxas são blindados contra manipulação.
7. **API7 — Server-Side Request Forgery (SSRF na API):**
   - Validação de webhooks e integrações externas.
8. **API8 — Security Misconfiguration na API:**
   - Configuração correta de CORS (`cors()` com origens permitidas em produção).
   - Métodos HTTP restritos aos necessários (`GET`, `POST`, `PATCH`, `PUT`, `DELETE`).
9. **API9 — Improper Inventory Management:**
   - Garantir que não existam endpoints esquecidos de teste, debug ou mock ativos em produção.
10. **API10 — Unsafe Consumption of APIs:**
    - Sanitização e tratamento defensivo das respostas de APIs parceiras (Mercado Pago, iFood, 99Food).

---

### 3. OWASP ASVS 5.0 (Application Security Verification Standard — Nível 2)
O ASVS 5.0 estabelece os critérios técnicos de verificação para aplicações que transacionam dinheiro e processam dados de clientes (Nível 2 — E-commerce & Negócios):
- **V1: Arquitetura & Modelo de Ameaças:** Divisão de camadas (Frontend estático -> Reverse Proxy Nginx -> Backend Node local -> SQLite).
- **V2: Autenticação:** Criptografia com Salt (`bcrypt`), bloqueio de auto-escalonamento de privilégios.
- **V3: Gerenciamento de Sessão:** Tokens assinados digitalmente (`JWT`), invalidação e renovação.
- **V4: Controle de Acesso:** Princípio do Menor Privilégio (*Least Privilege*) e negação por padrão (*Deny by Default*).
- **V5: Sanitização de Entradas:** Validação de formato (e-mails válidos, máscaras de telefone, datas no formato ISO ou DD/MM/AAAA).
- **V6: Criptografia em Repouso:** Dados sensíveis protegidos no SQLite.
- **V7: Tratamento de Erros:** Erros retornam JSON padronizado `{ success: false, error: "Mensagem amigável" }`, sem vazar detalhes da arquitetura.
- **V8: Privacidade dos Dados (LGPD):** Política de privacidade acessível, coleta mínima de dados, termo de consentimento.
- **V9: Comunicações Seguras:** Obrigatoriedade de HTTPS/TLS com certificado válido em produção.
- **V14: Configuração de Servidor:** Arquivos fora da raiz web protegidos contra download direto.

---

## 🚦 Fluxo de Execução do Security Gate

Ao executar `/security-gate`:

1. **Varredura Estática de Código (SAST):**
   - Inspecionar `server.js`, `database.js`, `config.js` e middlewares.
   - Inspecionar `auth-guard.js`, `juca-api.js` e as telas do `painel/` e cardápio.
2. **Varredura de Configurações de Rede & VPS:**
   - Checar portas ouvindo no sistema (`ss -tulpn` / `netstat`).
   - Checar configurações do Nginx (rotas públicas vs privadas).
   - Checar permissões de arquivos no servidor.
3. **Avaliação dos Critérios de Bloqueio (Quality Gate):**
   - **BLOCKER (Bloqueante):** Qualquer falha de Injeção SQL, senha em texto puro, dados de cartão salvos no banco, rota administrativa sem middleware de autenticação, ou porta interna de banco exposta para a internet. Se houver 1 blocker $\rightarrow$ **GATE REPROVADO**.
   - **WARNING (Alerta de Atenção):** Ausência de certificado SSL em ambiente de testes, ausência de rate limiter leve em rotas de busca, headers opcionais não configurados.
   - **PASSED (Aprovado):** Todos os critérios críticos atendidos.

---

## 📊 Estrutura do Relatório Executivo

O relatório emitido pela skill deve seguir exatamente esta estrutura:

```markdown
# 🛡️ Relatório de Auditoria — OWASP Security Gate

**Data:** [Data e Hora da Auditoria]
**Alvo:** [Projeto / Repositório / VPS]
**Status Geral do Gate:** [ ✅ PASSED | ⚠️ PASSED WITH WARNINGS | ❌ BLOCKED ]
**Score de Maturidade:** [0 a 100] / 100 (Classificação: [A+ | A | B | C | D | F])

---

### 📋 Matriz de Conformidade por Framework

| Framework | Requisitos Auditados | Aprovados | Alertas | Bloqueios | Status |
|---|:---:|:---:|:---:|:---:|:---:|
| **OWASP Top 10:2025** | 10 categorias | X | Y | Z | [OK / FALHA] |
| **OWASP API Security** | 10 categorias | X | Y | Z | [OK / FALHA] |
| **OWASP ASVS 5.0 (L2)** | 14 capítulos | X | Y | Z | [OK / FALHA] |
| **LGPD (Lei 13.709/2018)** | 10 princípios | X | Y | Z | [OK / FALHA] |

---

### 🔍 Achados & Vulnerabilidades Identificadas

| ID | Severidade | Categoria OWASP | Descrição do Achado | Arquivo / Linha | Impacto |
|---|:---:|---|---|---|---|
| SEC-01 | [CRÍTICA / ALTA / MÉDIA / BAIXA] | A01 / API1 / etc. | [Descrição clara do risco] | `caminho/arquivo.js:Linha` | [Risco real] |

---

### 🛠️ Plano de Remediação Cirúrgica (Código Imediato)

[Para cada achado com severidade Média, Alta ou Crítica, apresentar o bloco de diff com a solução exata]

---

### 🚀 Veredito para Deploy
[Decisão final: se a aplicação pode ir para produção imediatamente ou se há passos pendentes obrigatórios]
```

---

## 💡 Princípios de Conduta da Skill

- **Rigor Técnico com Clareza:** Apontar vulnerabilidades com embasamento técnico inquestionável (citando os artigos e IDs da OWASP/ASVS), mas explicando de forma clara o impacto no negócio.
- **Zero Falso Positivo:** Diferenciar riscos reais de convenções de framework (ex: em ambientes de desenvolvimento local, apontar HTTP como alerta de trânsito, e não como falha de código).
- **Proatividade Reparadora:** Nunca apenas apontar o erro; sempre entregar a correção cirúrgica pronta para aplicação.
