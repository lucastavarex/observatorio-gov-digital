<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Observatório Brasileiro de Governo Digital

Portal público e interativo de monitoramento da transformação digital no setor público brasileiro. Mede o desenvolvimento digital dos governos federal, estaduais e dos municípios com 100 mil habitantes ou mais com base nos 10 objetivos da Estratégia Nacional de Governo Digital (ENGD, Decreto nº 12.069/2024).

**Parceiros:** Insper/CGPP (execução técnica) · MBC/Movimento Brasil Competitivo (financiamento) · MGI/Ministério da Gestão e Inovação (vinculação institucional).

Antes de criar qualquer componente ou rota nova, confirme o escopo de features com o usuário — o produto ainda está em definição.

---

## Oráculo: metodologia completa

**Fonte de verdade do domínio:** [`public/metodologia-completa.pdf`](public/metodologia-completa.pdf)

Em caso de dúvida sobre indicadores, objetivos da ENGD, cálculo de índices/subíndices, fontes de dados, escopos (nacional/estadual/municípios), nomenclatura, interpretação de valores ou qualquer conceito metodológico do Observatório, **consulte esse PDF antes de assumir ou inventar**. Ele prevalece sobre resumos em markdown, mocks e memória do modelo quando houver conflito.

Como consultar:
1. Abra/leia `public/metodologia-completa.pdf` (ou a rota pública `/metodologia-completa.pdf`).
2. Extraia só o trecho relevante à dúvida.
3. Alinhe a implementação ou a resposta a esse trecho; se o PDF for ambíguo ou omisso, pergunte ao usuário.

---

## Estrutura de pastas relevante

```
src/
├── app/
│   ├── (app)/              # rotas do portal (home, indicadores, ranking, contato, …)
│   ├── actions/            # Server Actions (ex.: contato / Resend)
│   ├── globals.css         # design tokens (Tailwind v4 + shadcn) + utilitários dash-*
│   └── layout.tsx          # root layout (header, footer, Plus Jakarta Sans)
├── components/
│   ├── charts/             # recharts (radar, distribuição)
│   ├── content/            # publicações, formulário de contato
│   ├── indicadores/        # explorador comparativo (client)
│   ├── layout/             # site-header, site-footer
│   ├── ranking/            # lista e explorador de ranking
│   ├── shared/             # FAQ, copy-button, ações de variável
│   └── ui/                 # componentes shadcn/ui
├── data/                   # objectives + camada OBGD (`obgd/`) + temáticas/tags
├── lib/
│   ├── contact.ts          # assuntos, limites e schema Zod do formulário de contato
│   └── utils.ts            # cn() — clsx + tailwind-merge
├── local_assets/           # gitignored — entrega completa (dados-v3); app usa subset em data/obgd/assets
└── proxy.ts                # middleware Next.js (passthrough)
```

**Contato / e-mail:** a feature de `/contato` (Resend + Server Action) está documentada em [`docs/contato-resend.md`](docs/contato-resend.md). Não invente outro provedor ou fluxo sem alinhar com esse doc.

**Metodologia (Markdown → páginas + PDF):** relatório metodológico em MDX/Next e download do PDF estático documentados em [`docs/metodologia-mdx-pdf.md`](docs/metodologia-mdx-pdf.md). Não invente outro pipeline de conteúdo ou geração de PDF no portal sem alinhar com esse doc.

**Dados OBGD / tags:** fonte versionada em `src/data/obgd/assets/`; sync a partir de `local_assets/dados-v3` documentado em [`docs/integracao-dados-v3-tags.md`](docs/integracao-dados-v3-tags.md). Status de produto: [`docs/acompanhamento-plataforma.md`](docs/acompanhamento-plataforma.md).

---

## Os 10 objetivos da ENGD

Estes são os objetivos monitorados, com os IDs usados nas CSVs:

| `objetivo` | `objetivo_nome` |
|---|---|
| 1 | Governança do Governo Digital |
| 2 | Qualidade dos Serviços Digitais |
| 3 | Identificação Única |
| 4 | Segurança e LGPD |
| 5 | Dados e Interoperabilidade |
| 6 | Infraestrutura |
| 7 | Inovação e Tecnologias Emergentes |
| 8 | Eficiência e Processos |
| 9 | Transparência e Participação |
| 10 | Competências em Governo Digital |

Cada objetivo recebe um `sub_indice` de 0–100. A média dos sub-índices disponíveis forma o `indice_geral` do ente.

---

## Dados disponíveis (`src/local_assets/`)

A pasta `src/local_assets/` é **gitignored** — Não commitar.

**Canônico atual:** `local_assets/dados-v3/` → sync para `src/data/obgd/assets/` via `node scripts/sync-obgd-assets-from-v3.mjs`. Detalhes: [`docs/integracao-dados-v3-tags.md`](docs/integracao-dados-v3-tags.md).

### Legado — CSVs de índice (`indice_obgd/csvs/`)

> Supersedido por `dados-v2` / `dados-v3`. Mantido abaixo só como referência histórica.

Três escopos disponíveis, cada um com os mesmos 3 arquivos:

| Pasta | Escopo | Registros aprox. |
|---|---|---|
| `indice_nacional/` | Brasil agregado | 10 objetivos |
| `indice_estadual/` | 27 estados (UF) | 27 × 10 objetivos |
| `indice_capitais/` | 27 capitais | 27 × 10 objetivos |

**`indice_*.csv`** — sub-índice por objetivo por ente:
```
categoria, objetivo, objetivo_nome, sub_indice, indice_geral, n_objetivos_com_dados
```
- `categoria`: "Total" (nacional), sigla UF (estadual/capitais)
- `indice_geral` é o mesmo em todas as linhas do mesmo ente (repetido por conveniência)

**`detalhes_*.csv`** — indicadores individuais que compõem cada sub-índice:
```
categoria, objetivo, objetivo_nome, fonte, indicador, sub_itens,
descricao, escala, populacao, valor_normalizado, ano_fonte
```
- `fonte`: `tic_gov` · `iesgo` · `iospd` · `igovsisp` · `munic` · `abep`
- `valor_normalizado`: valor do indicador na escala 0–100
- `ano_fonte`: 2023–2025

**`ranking_*.csv`** — ranking dos entes por `indice_geral`:
```
rank, categoria, indice_geral, n_objetivos_com_dados
```

### Referências de dados (2025)

- Índice nacional: **58,26**
- Top 3 estados: PI 93,52 · MG 92,27 · RJ 92,02
- Top 3 capitais: Belo Horizonte 94,89 · Brasília 94,84 · Salvador 94,80

### Outros arquivos em `local_assets/`

- `obgd_v6_fontes_e_indicadores.xlsx` — definição completa dos indicadores e fontes (v6)
- `Obs Brasileiro Governo Digital Kick Off Dez 2025.pptx` — deck de kick-off
- `Observatório Brasileiro de Governo Digital_Rev17062025.docx` — documento principal do projeto
- `Projeto de Pesquisa_Observatório Brasileiro de Governo Digital_Contexto.pdf` — contexto de pesquisa
- `RelatorioCapitais.docx-1.pdf` — relatório de capitais
- `RelatorioParcial_IndiceEstadual.docx-1.pdf` — relatório parcial do índice estadual

---

## Design system

Definido em `src/app/globals.css` via tokens CSS (Tailwind v4 + shadcn `radix-lyra`), alinhado ao protótipo de UI.

| Token | Cor | Uso |
|---|---|---|
| `primary` | `#4775ca` | cor principal da marca, CTAs, destaques |
| `primary-glow` | `#89aef0` | gradiente de títulos (`from-primary to-primary-glow`) |
| `chart-1`…`chart-4` | azul / laranja / verde / cinza | séries de gráficos |
| utilitários `dash-*` | linhas pontilhadas laterais/topo | layout das seções |

Fontes: **Plus Jakarta Sans** (sans) · **JetBrains Mono** (mono). Idioma: `pt-BR`.

**Regra:** use sempre tokens semânticos (`bg-primary`, `text-muted-foreground`, `to-primary-glow`) — nunca valores literais de cor em componentes.

---

## Convenções do projeto

### Nomenclatura de métricas (UI)

Na plataforma, a nota **0–100 de um ente em um objetivo da ENGD** chama-se **Índice** (não “Sub-índice”).

- **Índice** — métrica principal no ranking, mapa, detalhe do ente e tips (`GLOSSARIO.subIndice` em `src/data/help-copy.ts`).
- **Índice geral / média entre objetivos** — **não** exibir na UI (decisão de produto).
- No código/dados o campo pode continuar `sub_indice` / `subIndice` (legado de schema); em **copy e labels**, use só “Índice” / “índice”.
- “Subíndice” em metodologia/anexo sobre iESGo (TCU) refere-se a índices compostos de terceiros — não renomear esses trechos históricos.

### Nomenclatura de arquivos

Use **kebab-case** para todos os arquivos de componentes, hooks e utilitários:
- ✅ `hero-slider.tsx`, `stats-counter.tsx`, `app-breadcrumb.tsx`, `navbar.tsx`
- ❌ `HeroSlider.tsx`, `StatsCounter.tsx`, `AppBreadcrumb.tsx`, `Navbar.tsx`

O nome do componente exportado continua em PascalCase; apenas o nome do arquivo usa kebab-case.

### TypeScript e React

- Componentes: `function` declarations com tipagem explícita de props (`interface Props { ... }`)
- Imports: caminho absoluto com alias `@/` (ex: `@/components/ui/button`)
- Server Components por padrão; adicionar `"use client"` apenas quando necessário (interatividade, hooks de estado/efeito)
- Sem `any` — use tipos específicos ou `unknown` com narrowing

### shadcn/ui

- Instalar componentes via CLI: `npx shadcn add <componente>`
- Usar apenas cores semânticas (`bg-primary`, `text-muted-foreground`) — nunca `bg-blue-500`
- `gap-*` em vez de `space-y-*` para espaçamento em flex/grid
- `size-*` para dimensões iguais em largura e altura
- `cn()` de `@/lib/utils` para classes condicionais
