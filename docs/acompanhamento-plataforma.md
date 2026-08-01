# Acompanhamento da plataforma — migração UI e feedback do cliente

> **Documento canônico** do que foi decidido, implementado, adiado e do que ainda depende da frente de dados.
>
> Última atualização: **2026-07-28**
>
> Repositório: `observatorio-gov-digital`
>
> **Versão para o time (Word):** [`alinhamento-interno-pre-apresentacao.docx`](./alinhamento-interno-pre-apresentacao.docx) — resumo para feedback interno antes da apresentação com o cliente.

---

## 1. Contexto

Trabalho em paralelo:

| Papel           | Repositório                               | Função                                                   |
| --------------- | ------------------------------------------ | ---------------------------------------------------------- |
| Designer (Caio) | `observatorio-governo-digital-prototipo` | Exploração de UI/UX                                     |
| Engenharia      | `observatorio-gov-digital`               | Implementação oficial (Next.js, TypeScript, dados, a11y) |

A migração trouxe para o oficial as mudanças de UI do protótipo **depois** de `6fc045cc`, cruzadas com o feedback do cliente / Luiza (reunião ~**22/07/2026**) e decisões de produto fechadas na implementação.

**Não** foi objetivo desta fase: i18n PT/EN (protótipo tem; oficial permanece só PT).

---

## 2. Feedback do cliente / Luiza (e decisões fechadas)

Fonte: pontos levantados na conversa com o cliente (e alinhamento interno com Luiza / time). Abaixo: pedido → decisão → status na plataforma.

| #  | Pedido / ponto                                                      | Decisão                                                                                                               | Status                                    |
| -- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1  | Não usar**média / índice geral** entre objetivos           | Remover da UI; rankings e destaques só por**objetivo** (sub-índice) ou, se houver, por **tag temática** | Feito                                     |
| 2  | Ranking pouco claro sobre o que ordena                              | Ordenar por objetivo ENGD**ou** categoria temática; label explícita; sem toggle de índice geral               | Feito                                     |
| 3  | Página de**variável** + série histórica isolada           | Remover rota e gráfico de série; variáveis só como**lista + download** na página do objetivo                | Feito                                     |
| 4  | **Objetivo 3** (Identificação Única) sem dados suficientes | Desabilitar na UI (chip + tooltip + toast);**manter** lacunas reais de cobertura dos objs. 8 e 10                | Feito (copy do tooltip ainda provisório) |
| 5  | **Tags / dimensões temáticas** (~50–60)                    | UI no padrão do Caio com**mock** (~20 tags) até entrega oficial                                                | Feito (mock)                              |
| 6  | Versão**com** e **sem** ranking (teste A/B)            | Versão A =`/` com ranking; Versão B = `/v2` ou `NEXT_PUBLIC_RANKING_MODE=off`                                  | Feito                                     |
| 7  | Municípios extras (~100 mil hab., além de capitais)               | **Adiado** na UI; municipal = **só capitais** (mocks extras removidos)                                    | Fora por agora                            |
| 8  | Nota técnica dos objetivos com cobertura precária                 | Mock na metodologia + chips; validar com Luiza/Gabriel/Bruno                                                           | Feito (mock)                              |
| 9  | i18n                                                                | **Não** portar                                                                                                  | Fora de escopo                            |
| 10 | Loading / abertura da home (protótipo)                             | Implementado com`sessionStorage`, depois **removido** (UX + SEO)                                               | Removido                                  |

### Esclarecimento importante: sub-índice ≠ índice geral

- **Índice geral / média geral** — agregado transversal dos objetivos → **proibido na UI**.
- **Sub-índice** — nota **de um objetivo** (ou score de uma tag) → **métrica principal** do ranking e do detalhe do ente. Manter.

---

## 3. O que foi implementado (engenharia + produto)

### 3.1 Sistema visual e base

- Utilitários de traço / layout alinhados ao protótipo (`dash-y`, pills, etc.)
- Toast (Sonner) e **Tooltip** (shadcn/Radix) para chips desabilitados
- Componentes compartilhados: `FilterPill`, `ObjetivoChip`, `BandeiraEnte`, `MapaBrasil`, helpers de geo/bandeiras

### 3.2 Home (`/`)

- Hero com `PixelCanvas` + `PesoVariavel`
- Ordem de seções alinhada ao designer (recursos, lead, mapa quando ranking on, dados abertos, parceiros em grayscale)
- Miniaturas (`VisualPerfil`, `VisualMapa`, `VisualDados`)
- **Loading/abertura da home:** removida (não há mais overlay de intro)

### 3.3 Indicadores (`/indicadores`)

- Explorer no padrão do designer: nível, ordenar por (objetivos ENGD | temáticas), seleção de até 5 entes
- Radar por objetivos; comparativo temático com scores **mock**
- Estado compartilhável na URL: `nivel`, `entes`, `por`, `tema`
  Ex.: `/indicadores?nivel=estadual&entes=sp,rj&por=objetivos`
- Drill-down até variáveis/download (também na variante B): `/indicadores/[nivel]/[ente]` → `/indicadores/[nivel]/[ente]/[objetivo]`
  Ex.: `/indicadores/estadual/sp/privacidade-e-seguranca`; em `/v2/...` o prefixo é preservado
- No explorer (modo objetivos), clique no ente da legenda ou CTA “Ver variáveis e detalhes” leva à página do ente

### 3.4 Ranking (`/ranking`)

- Nível (estadual/municipal; federal vai direto ao ente)
- Ordenar por objetivos ENGD ou categorias temáticas
- Chips de objetivo (Obj. 3 desabilitado) / pills de tag
- Distribuição + mapa (estadual) + tabela com bandeiras
- **Sem** índice geral; coluna principal = **Sub-índice**
- Estado compartilhável na URL: `nivel`, `por`, `objetivo` | `tema`Ex.: `/ranking?nivel=municipal&por=objetivos&objetivo=privacidade-e-seguranca`
- Clique no ente (modo objetivos) leva `?objetivo={slug}` → detalhe dinâmico (não mais “sempre Obj. 1”)
- Badge com nome do ente no topo da coluna do gráfico “Posição no objetivo” → **removida**
- Página do objetivo: lista de variáveis + download; **sem** bloco de Recomendações (recomendações ENGD ficam em `/objetivos/[slug]`); ícones de fonte/download ao lado do título da variável
- UI compartilhada com o drill-down de Indicadores (`src/components/drilldown/`), com posições/distribuição só no ranking

### 3.5 Objetivo 3 e cobertura

- Lógica em `src/data/objectives-availability.ts`
- Lacunas reais de dados (ex. objs. 8/10 em alguns níveis) continuam vindas dos dados
- Obj. 3: bloqueio de produto na UI independentemente de haver linha no JSON

### 3.6 Versão A/B (ranking)

| Variante | Como ativar                                                                 | Comportamento                |
| -------- | --------------------------------------------------------------------------- | ---------------------------- |
| A        | `/` (default)                                                             | Ranking disponível          |
| B        | prefixo`/v2/…` **ou** `NEXT_PUBLIC_RANKING_MODE=off` / `farol` | Sem ranking (redirect / nav); download via `/indicadores/.../[objetivo]` |

Arquivos-chave: `src/proxy.ts`, `src/lib/features/ranking-mode.ts`, `use-platform-variant.ts`, `VariantLink`.

### 3.7 Metodologia

- Nota técnica mock dos 4 objetivos precários (texto placeholder até validação)

---

## 4. O que ficou de fora / foi revertido ou adiado

| Item                                                         | Motivo / status                                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| i18n PT/EN                                                   | Fora de escopo nesta fase                                                       |
| Página`/ranking/.../[variavel]` + série histórica na UI | Removidas a pedido do cliente; gerador de série pode existir no código sem UI |
| Municípios extras (~100k+ hab.)                             | Adiado; UI municipal = capitais                                                 |
| Loading/abertura da home                                     | Removido após tentativa (flash, UX, SEO)                                       |
| Catálogo oficial 50–60 tags + scores reais                 | Aguardando frente de dados (UI mockada)                                         |
| Downloads reais de variáveis                                | Ainda CSV mock no cliente (`VariavelAcoes`)                                   |
| Texto final do tooltip do Obj. 3                             | Copy provisório                                                                |
| Conteúdo final da nota dos objetivos precários             | Mock                                                                            |
| Recomendações na página de objetivo do ranking            | Removidas para alinhar ao designer (ficam em`/objetivos`)                     |

---

## 5. Mocks e pedidos à frente de dados (Gabriel / Luiza / Bruno)

Preferência: **números já agregados**; o front calcula o mínimo possível.

### 5.1 O que a plataforma mocka hoje

| Área                          | Onde no código                                         | O que é fake / provisório                                                           |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Tags temáticas (~20)          | `src/data/tematicas/`                                 | Catálogo ilustrativo + scores estáveis + lista de “variáveis atreladas”          |
| Motivo Obj. 3                  | `objectives-availability.ts` → `OBJETIVO_3_MOTIVO` | Texto até validação oficial                                                        |
| 4 objetivos precários         | `OBJETIVOS_PRECARIOS_MOCK`                            | Nota técnica na metodologia / chips                                                  |
| Download de variável          | `VariavelAcoes`                                       | Gera CSV de exemplo no browser                                                        |
| Campo`indiceGeral` no modelo | `queries.ts` / charts                                 | Pode existir no JSON/modelo;**não** é exposto como ranking/média geral na UI |

### 5.2 Entregas necessárias (para tirar mocks)

1. **Tags temáticas (50–60)**

   - Catálogo: `tag_id`, `slug`, `nome` (distintas dos 10 objetivos ENGD)
   - Mapeamento tag → indicadores
   - Score pré-calculado: `ente_codigo` × `tag_id` × edição → nota 0–100
2. **Objetivo 3**

   - Texto oficial da razão (tooltip / nota)
3. **Quatro objetivos precários**

   - Quais são; o que foi avaliado; o que ficou de fora e por quê
4. **Downloads**

   - URL ou arquivo real por indicador (ou pacote objetivo × ente)
5. **Municípios extras** *(quando retomar o produto)*

   - Lista no threshold + `indice_objetivo` (e tags) no mesmo schema das capitais + posições
6. **Índice geral**

   - **Não publicar** na plataforma. Se o JSON mantiver `indice_geral`, tratar como legado interno.

### 5.3 Explicitamente fora de pedido de dados nesta fase

- Série histórica isolada por variável para a UI atual
- Drill-down de página de variável

---

## 6. Dados reais já usados

- Snapshot do índice / objetivos / variáveis: `src/data/obgd/assets/` (versionado)
- Origem da entrega completa (gitignored): `src/local_assets/`
- Atualização de assets: ver `src/data/obgd/assets/README.md`
- Edição de referência do índice: **2026** (snapshot; sem série multi-anual de sub-índice na UI)

---

## 7. Como validar rapidamente

1. `/` — home sem overlay de loading; hero e seções ok; com variante B, sem bloco de ranking/mapa se aplicável
2. `/indicadores?nivel=estadual&entes=sp&por=objetivos` — URL restaura seleção; CTA leva a `/indicadores/estadual/sp`
3. `/ranking?nivel=estadual&por=objetivos&objetivo=gestao-e-governanca` — filtros na URL; Obj. 3 desabilitado com tooltip
4. Clicar ente na tabela → `/ranking/estadual/{ente}?objetivo=…` com subtítulo/gráficos do objetivo certo
5. `/ranking/.../{objetivo}` — sem Recomendações; download à esquerda do título da variável
6. `/v2` — versão sem ranking; `/v2/indicadores/estadual/sp/{objetivo}` — lista + download (sem posição no ranking)
7. `/metodologia` — nota dos objetivos precários (mock)

---

## 8. Arquivos e pastas de referência

| Tema                         | Caminhos                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| Ranking explorer + URL       | `src/components/ranking/`, `src/lib/ranking-url.ts`         |
| Indicadores + URL            | `src/components/indicadores/`, `src/lib/indicadores-url.ts` |
| Drill-down ente/objetivo     | `src/components/drilldown/` (ranking + indicadores)        |
| Disponibilidade de objetivos | `src/data/objectives-availability.ts`                         |
| Temáticas (mock)            | `src/data/tematicas/`                                         |
| Feature ranking A/B          | `src/lib/features/`, `src/proxy.ts`                         |
| Queries OBGD                 | `src/data/obgd/queries.ts`, `src/data/obgd/server.ts`       |
| Mapa / bandeiras             | `src/components/shared/mapa-brasil.tsx`, `src/lib/geo/`     |

---

## 9. Documentos legados neste `docs/`

| Arquivo                                   | Situação                                                                                                                                                                                                             |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pedidos-dados-gabriel.md`              | **Removido** — conteúdo absorvido na §5                                                                                                                                                                       |
| `serie-historica-mock.md`               | **Removido** — status absorvido nas §§2–4                                                                                                                                                                    |
| `implementacao-ranking-por-objetivo.md` | Histórico técnico da 1ª integração com dados reais; trechos sobre “índice geral provisório” e página de variável estão**desatualizados**. Usar **este** arquivo para decisão de produto atual |
| `mvp-dashboard.md`                      | Estudo/MVP antigo; mapa e big number evoluíram. Consultar só como background; produto atual = este arquivo                                                                                                           |

---

## 10. Histórico resumido desta frente (cronologia)

1. **Análise** do protótipo pós-`6fc045cc` × oficial × feedback 22/07
2. **Decisões** (índice geral off, variável off, Obj. 3 off na UI, temáticas mock, `/v2`, skip i18n, municipal só capitais)
3. **Migração** home / indicadores / ranking / metodologia / feature flag
4. **Ajustes finos** (layout, empty states, Sub-índice nowrap, URL ranking/indicadores, objetivo dinâmico no ente, badge do chart, página de objetivo alinhada ao designer)
5. **Loading da home** tentado e **removido**
6. **Este documento** como fonte única de acompanhamento
