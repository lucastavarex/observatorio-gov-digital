<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Observatório Brasileiro de Governo Digital

Portal público e interativo de monitoramento da transformação digital no setor público brasileiro. Mede a maturidade digital dos governos federal, estaduais e das 27 capitais com base nos 10 objetivos da Estratégia Nacional de Governo Digital (ENGD, Decreto nº 12.069/2024).

**Parceiros:** Insper/CGPP (execução técnica) · MBC/Movimento Brasil Competitivo (financiamento) · MGI/Ministério da Gestão e Inovação (vinculação institucional).

**Prazo:** primeira versão pública em novembro de 2026; operação completa até dezembro de 2027.

---

## Estado atual da implementação

O projeto está em fase inicial. Apenas o esqueleto existe:

- `src/app/(app)/page.tsx` — única página renderizada; exibe apenas "Em construção..."
- `src/components/ui/` — 3 componentes shadcn instalados: `Button`, `Breadcrumb`, `Sheet`
- `src/components/home/` — **vazio** (componentes da home page ainda não foram criados)
- `src/data/` — **vazio** (camada de dados ainda não foi implementada)

Antes de criar qualquer componente ou rota nova, confirme o escopo de features com o usuário — o produto ainda está em definição.

---

## Estrutura de pastas relevante

```
src/
├── app/
│   ├── (app)/
│   │   └── page.tsx        # placeholder "Em construção..."
│   ├── globals.css         # design tokens (Tailwind v4 + shadcn)
│   └── layout.tsx          # root layout (lang="pt-BR", Inter + JetBrains Mono)
├── components/
│   ├── home/               # vazio — componentes da página inicial
│   └── ui/                 # componentes shadcn/ui
├── data/                   # vazio — funções de acesso aos dados
├── lib/
│   └── utils.ts            # cn() — clsx + tailwind-merge
└── proxy.ts                # middleware Next.js (passthrough)
```

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

## Dados disponíveis

Três escopos de dados, cada um com os mesmos 3 arquivos:

| Escopo | Abrangência | Registros aprox. |
|---|---|---|
| Nacional | Brasil agregado | 10 objetivos |
| Estadual | 27 estados (UF) | 27 × 10 objetivos |
| Capitais | 27 capitais | 27 × 10 objetivos |

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

---

## Design system

Definido em `src/app/globals.css` via tokens CSS (Tailwind v4 + shadcn `radix-lyra`).

| Token | Cor | Uso |
|---|---|---|
| `primary` | `#0D1F3C` (navy) | cor principal da marca, textos de destaque |
| `accent` | `#0EA5E9` (cyan) | destaques, links, chart-1 |
| `chart-2` | `#22C55E` (verde) | gráficos secundários |
| `chart-4` | cyan médio | gráficos terciários |

Fontes: **Inter** (sans-serif padrão) · **JetBrains Mono** (mono). Idioma: `pt-BR`.

**Regra:** use sempre tokens semânticos (`bg-primary`, `text-accent`, `text-muted-foreground`) — nunca valores literais de cor.

---

## Convenções do projeto

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
