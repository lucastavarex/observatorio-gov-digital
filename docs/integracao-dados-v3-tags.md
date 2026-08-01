# Integração dados-v3 e tags reais

> Documento técnico da migração da entrega **dados-v2** → **dados-v3** e da substituição dos mocks de categorias temáticas pelos **16 tags oficiais** (Gabriel / Luiza).
>
> Escopo: pipeline de assets, camada OBGD, ranking/indicadores por tag, critérios de score · Edição do índice: **2026** · Fonte versionada: `src/data/obgd/assets/`
>
> Status de produto geral: [`acompanhamento-plataforma.md`](./acompanhamento-plataforma.md) · Histórico da 1ª integração (v2): [`implementacao-ranking-por-objetivo.md`](./implementacao-ranking-por-objetivo.md)

---

## 1. Resumo executivo

Em ago/2026 a frente de dados entregou um rebuild do catálogo de indicadores **com tags transversais**. A plataforma:

1. Passou a consumir o snapshot **dados-v3** (em vez de dados-v2).
2. Removeu o catálogo mock de ~20 temáticas e os scores FNV ilustrativos.
3. Ligou Ranking e Indicadores (modo “temáticas”) aos **16 tags reais**, com score = **média dos `valor_normalizado`** dos indicadores ativos da tag, por ente.

| Antes (v2 + mock) | Depois (v3 + tags reais) |
|---|---|
| Assets copiados de `local_assets/dados-v2` | Gerados a partir de `local_assets/dados-v3` via script |
| Sem entidade `tag` | `tag.json` + `indicador.tags` + `indicador.audiencia` |
| Scores temáticos determinísticos (mock) | `indice_por_tag.json` pré-calculado |
| ~20 slugs inventados na UI | 16 ids oficiais (`conectividade`, `seguranca-lgpd`, …) |

**Fora desta entrega:** UI de filtro cidadão/gestor (`audiencia`); expansão futura para 50–60 tags; downloads reais de variáveis.

---

## 2. Contexto da entrega

### 2.1 O que a frente de dados comunicou

- Rebuild do indicador com **dados atualizados** e **tagueados**.
- Dois ângulos de leitura no campo `audiencia` / `tag.lado`:
  - **Cidadão** — métricas que afetam o consumidor final
  - **Gestor** — gestão interna / métricas que interessam aos governos
- Catálogo inicial de **16 tags** (contagens de variáveis alinhadas ao `indicador.json` da v3).
- Produto interno: média do índice **por tag** (Luiza) — implementada no front via agregado pré-calculado.

### 2.2 Diferenças relevantes v2 → v3 (entrega bruta)

| Aspecto | dados-v2 | dados-v3 |
|---|---|---|
| JSON flat na raiz (`indice_long_*.json`, `detalhes_*.json`, …) | Presentes | **Ausentes** (só CSV) |
| `ano_indice` em meta / índices / CSV long | `2026` | **vazio / `null`** |
| Entidade `tag` | Não | Sim (16 tags) |
| Campos em `indicador` | — | `tags[]`, `audiencia` |
| Coluna em `detalhes_*.csv` | — | `concept_id` (chave do indicador) |
| Contagens (ordem de grandeza) | 477 indicadores, 469 linhas long | 469 indicadores, 442 linhas long |
| Capitais × objetivo 7 | Presente | **Ausente** (efeito do catálogo; UI já tolera `nota` null) |
| `dimensao_tematica` | 52 dims | 53 dims; vários ids remapeados |

Premissas adotadas na integração (alinhamento interno):

- `ano_indice` vazio → tratar como **2026** (edição já usada no app: `ANO_INDICE`).
- Valores e cobertura novos = verdade atual do rebuild.
- JSON flat ausentes → **gerar localmente** a partir dos CSVs (não bloquear no Gabriel).
- Campo `audiencia` permanece nos assets; **sem UI** nesta etapa.

---

## 3. Onde estão os dados?

### 3.1 Resposta direta

| Pergunta | Resposta |
|---|---|
| **Onde o app lê?** | [`src/data/obgd/assets/`](../src/data/obgd/assets/) — versionado no Git |
| **Origem da entrega completa** | `src/local_assets/dados-v3/` — **gitignored** |
| **Como atualizar?** | `node scripts/sync-obgd-assets-from-v3.mjs` |
| **Legado** | `local_assets/dados-v2/` (referência histórica); `indice_obgd/` (supersedido) |

### 3.2 Inventário versionado (app)

```
src/data/obgd/assets/
├── indice_long_por_objetivo.json   ← ranking / radar / scores por objetivo
├── detalhes_nacional.json
├── detalhes_estadual.json
├── detalhes_capitais.json          ← drill-down de variáveis (+ concept_id)
└── dados/
    ├── ente.json
    ├── fonte.json
    ├── indicador.json              ← inclui tags[] e audiencia
    ├── objetivo_engd.json
    ├── tag.json                    ← 16 tags (id, nome, descricao, lado)
    └── indice_por_tag.json         ← média por (unidade × tag_id)
```

Detalhe operacional curto: [`src/data/obgd/assets/README.md`](../src/data/obgd/assets/README.md).

### 3.3 Por que pré-calcular `indice_por_tag`?

`indicador_valor.json` na entrega completa tem ~1,2 MB / ~4k linhas. Embuti-lo no bundle do client só para médias por tag é desnecessário. O script agrega offline e versiona um arquivo pequeno (`indice_por_tag.json`), alinhado à preferência de produto: **números já agregados**; o front calcula o mínimo possível.

---

## 4. Pipeline de sync

### 4.1 Script

Arquivo: [`scripts/sync-obgd-assets-from-v3.mjs`](../scripts/sync-obgd-assets-from-v3.mjs)

```bash
# Pré-requisito: entrega completa em src/local_assets/dados-v3/
node scripts/sync-obgd-assets-from-v3.mjs
```

### 4.2 O que o script faz

1. **CSV → JSON**
   - `indice_long_por_objetivo.csv` → JSON com casts numéricos; `ano_indice` vazio → `2026`
   - `detalhes_{nacional,estadual,capitais}.csv` → JSON (inclui `concept_id`)
2. **Cópia canônica** de `dados/{ente,fonte,indicador,objetivo_engd,tag}.json`
3. **Agregação** `indice_por_tag.json`:
   - Indicadores com `status === "ativo"` e `tags` não vazio
   - Join com `indicador_valor` por `indicador_chave`
   - Grupo `(ente.codigo, tag_id)` → média de `valor_normalizado` (1 casa decimal)
   - Shape: `{ unidade, tag_id, nota, n_indicadores }[]`

### 4.3 Shape de `indice_por_tag.json`

```json
{
  "unidade": "SP",
  "tag_id": "conectividade",
  "nota": 89.9,
  "n_indicadores": 7
}
```

- `unidade` = `ente.codigo` (`BR` | sigla UF | código IBGE 7 dígitos da capital)
- Ordem de grandeza típica desta edição: ~745 linhas (16 tags × até 55 entes; lacunas omitidas)

---

## 5. Camada de código

### 5.1 OBGD (`src/data/obgd/`)

| Arquivo | Papel |
|---|---|
| [`types.ts`](../src/data/obgd/types.ts) | `TagRow`, `IndicePorTagRow`; `tags` / `audiencia` em `IndicadorRow`; `concept_id?` em `DetalheRow` |
| [`load.ts`](../src/data/obgd/load.ts) | Importa `tag.json` + `indice_por_tag.json`; maps `tagById`, `notaPorUnidadeTag` |
| [`queries.ts`](../src/data/obgd/queries.ts) | Continua filtrando scores de objetivo com `ano_indice === ANO_INDICE` (`2026`) |
| [`detalhes.ts`](../src/data/obgd/detalhes.ts) / [`server.ts`](../src/data/obgd/server.ts) | Drill-down; campos extras nos JSON são ignorados com segurança |

### 5.2 Temáticas (`src/data/tematicas/`)

API pública **mantida** (explorers não precisaram ser reescritos):

| Export | Origem real |
|---|---|
| `tematicas` | `tag.json` (`id` → `slug`, + `nome`, `descricao`, `lado`) |
| `notaTematica(ente, slug)` | `notaPorUnidadeTag.get(\`${ente.codigo}\|${slug}\`)` → `number \| null` |
| `rankingTematico(entes, slug)` | Ordena por nota desc; **omite** entes sem dado |
| `variaveisPorTematica` | Indicadores `ativo` cuja `tags` contém o slug → `{ slug: chave, nome: descricao, fonte }` |

Arquivos:

- [`catalog.ts`](../src/data/tematicas/catalog.ts)
- [`scores.ts`](../src/data/tematicas/scores.ts)
- [`variaveis.ts`](../src/data/tematicas/variaveis.ts) (substitui o antigo `mock-map.ts`)
- [`index.ts`](../src/data/tematicas/index.ts)

### 5.3 Fórmula do score por tag

Alinhada ao exemplo do `SCHEMA.md` da entrega e à sugestão da Luiza:

```
para indicadores ativos com tag T
  join indicador_valor por indicador_chave
  agrupar por ente
  nota = média(valor_normalizado)   # escala 0–100, 1 casa decimal
```

Não usa sub-índices de objetivo nem índice geral. Tags e objetivos ENGD são eixos **independentes**.

### 5.4 UI

| Superfície | Comportamento |
|---|---|
| Ranking `?por=tematicas&tema=<slug>` | 16 pills; ordena por score real |
| Indicadores `?por=tematicas&tema=<slug>` | Barras com score real; lista de variáveis reais |
| Copy | Removidos textos “mock” / “ilustrativo” |

Arquivos tocados: [`indicadores-explorer.tsx`](../src/components/indicadores/indicadores-explorer.tsx) (copy + tratamento de `null`). `ranking-explorer.tsx` consome a mesma API sem mudança estrutural.

### 5.5 URLs e slugs

Slugs mock antigos (`pagamentos-digitais`, `dados-abertos`, …) **não** são mais válidos. O parser de URL cai no default (`tematicas[0].slug`, hoje `conectividade`) quando o `tema` não existe no catálogo.

---

## 6. Catálogo oficial de tags (edição atual)

| id (slug) | Nome | Lado |
|---|---|---|
| `conectividade` | Conectividade | cidadão |
| `canais-digitais-atendimento` | Canais digitais de atendimento | cidadão |
| `servicos-publicos-digitais` | Serviços públicos digitais | cidadão |
| `cidades-inteligentes` | Cidades inteligentes | cidadão |
| `pagamento-digital` | Pagamento digital | cidadão |
| `identidade-digital` | Identidade digital e autenticação | cidadão |
| `saude-digital` | Saúde digital | cidadão |
| `educacao-digital` | Educação digital | cidadão |
| `transparencia-dados-abertos` | Transparência e dados abertos | cidadão |
| `inclusao-acessibilidade` | Inclusão e acessibilidade | cidadão |
| `gestao-planejamento-ti` | Gestão e planejamento de TI | gestor |
| `servicos-digitais` | Sistemas e serviços digitais | gestor |
| `dados-interoperabilidade` | Dados e interoperabilidade | gestor |
| `seguranca-lgpd` | Segurança e LGPD | gestor |
| `contratacoes` | Contratações e compras | gestor |
| `infraestrutura` | Infraestrutura e plataformas | gestor |

Fonte canônica: `tag.json`. Contagens de variáveis por tag vêm do catálogo `indicador` (podem mudar a cada rebuild).

---

## 7. Decisões de produto / engenharia

| Decisão | Motivo |
|---|---|
| Gerar JSON flat no script (não pedir reexport ao Gabriel) | Entrega v3 só trouxe CSV; colunas compatíveis |
| Assumir `ano_indice = 2026` | Edição do app; campo veio nulo no rebuild |
| Pré-calcular score por tag | Bundle menor; preferência por agregados |
| Omitir entes sem nota no ranking por tag | Mesmo padrão do ranking por objetivo |
| Não expor `audiencia` na UI ainda | Feature “na manga”; validar com plotagem depois |
| Não usar `dimensao_tematica` como “temática” da UI | Dimensões de capítulo ≠ tags transversais |
| Aceitar capital sem objetivo 7 | Efeito do catálogo; lacuna já suportada na UI |

---

## 8. Como validar

1. **Sync:** após colocar nova pasta em `local_assets/dados-v3/`, rodar o script; conferir `ano_indice: 2026` em `indice_long_por_objetivo.json` e existência de `dados/tag.json` + `dados/indice_por_tag.json`.
2. **Ranking por objetivo:** `/ranking?nivel=estadual&por=objetivos` — números batem com o long da v3.
3. **Ranking por tag:** `/ranking?nivel=estadual&por=tematicas&tema=conectividade` — 16 pills; ordenação estável e distinta do mock antigo.
4. **Indicadores por tag:** `/indicadores?nivel=estadual&entes=sp&por=tematicas&tema=conectividade` — barras com score; lista com fonte/descrição reais.
5. **Lacunas:** capital sem objetivo 7 — drill-down não quebra (`nota` null).
6. **Typecheck:** `npx tsc --noEmit`.

---

## 9. Operação: nova entrega de dados

1. Substituir/atualizar `src/local_assets/dados-v3/` com a pasta da frente de dados.
2. Rodar `node scripts/sync-obgd-assets-from-v3.mjs`.
3. Smoke visual (ranking objetivo + tag; indicadores).
4. Commit dos arquivos sob `src/data/obgd/assets/` (e código, se o schema mudar).

Se a entrega voltar a incluir JSON flat oficiais com `ano_indice` preenchido, o script continua válido (CSV → JSON + agregação de tags). Ajustar o script só se o schema de colunas mudar.

---

## 10. Fora de escopo / próximos passos possíveis

- Filtro ou dual-view **cidadão × gestor** (`audiencia` / `tag.lado`)
- Score oficial pré-calculado pela frente de dados (substituiria o nosso `indice_por_tag` se o contrato for outro)
- Expansão do catálogo além das 16 tags
- Texto oficial do Objetivo 3 e nota dos objetivos precários

---

## 12. Downloads curados (CSV)

A plataforma **não** hospeda microdados brutos das fontes. O download entrega o recorte usado no índice:

| Endpoint | Uso |
|---|---|
| `GET /api/obgd/export?nivel=estadual&conceptId=tic_gov/B1` | Indicador em todas as unidades do nível |
| `GET /api/obgd/export?metodologiaSlug=cetic-br` | Todos os indicadores dessa fonte no OBGD (3 níveis) |

UI: `VariavelAcoes` (página do objetivo); em `/metodologia`, a lista “Principais fontes” e o bloco de download em `/metodologia/fontes/[slug]` só incluem fontes com linhas em `detalhes_*` (`hasObgdExportForMetodologiaSlug`). Schema: `src/lib/export-obgd-csv.ts`, `src/data/obgd/export-rows.ts`.

---

## 11. Referências cruzadas

| Documento | Uso |
|---|---|
| [`acompanhamento-plataforma.md`](./acompanhamento-plataforma.md) | Status de produto, mocks restantes, validação rápida |
| [`implementacao-ranking-por-objetivo.md`](./implementacao-ranking-por-objetivo.md) | Histórico da 1ª integração (dados-v2) |
| [`mvp-dashboard.md`](./mvp-dashboard.md) | Estudo antigo dos dados (ainda cita v2 como background) |
| `src/local_assets/dados-v3/dados/SCHEMA.md` | Schema relacional da entrega (gitignored) |
| `src/data/obgd/assets/README.md` | Comando curto de sync |
