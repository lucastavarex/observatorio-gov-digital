@AGENTS.md

# Projeto: Observatório Brasileiro de Governo Digital

Portal público e interativo de monitoramento da transformação digital no setor público brasileiro. Indicadores e dados apresentados com linguagem acessível para qualquer pessoa — gestores, acadêmicos e cidadãos.

**Parceiros institucionais:**
- Insper/CGPP (Centro de Gestão e Políticas Públicas) — parceiro técnico e acadêmico, hospeda inicialmente a plataforma
- MBC (Movimento Brasil Competitivo) — parceiro institucional, manterá a plataforma na AWS no longo prazo
- MGI (Ministério da Gestão e Inovação em Serviços Públicos) — vinculação institucional

**Equipe Insper:** Prof. Ivar Hartmann (coordenador inicial) · Prof.ª Maria Carolina Foss (coordenadora subsequente, Direito) · Suelane Garcia Fontes (Centro de Dados e IA) · Prof. Rodolfo Avelino (Engenharia).

**Princípio central:** Acessibilidade e clareza para o público geral, não especialistas.

## Contexto e escopo

O Observatório monitora os avanços da transformação digital dos governos federal, estaduais e municipais do Brasil. Está alinhado à Estratégia Nacional de Governo Digital (ENGD), Decreto nº 12.069/2024, e à Portaria SGD/MGI nº 4.248/2024.

O Brasil ocupa posição de destaque no OECD Digital Government Index (nota 0,79 — acima da média), mas ainda há grande desigualdade entre entes subnacionais. O Observatório mede essa variação de forma estruturada e comparável.

**Fontes de dados primárias:**
- TIC Governo Eletrônico e TIC Domicílios (CETIC.br)
- Painéis SGD (Secretaria de Governo Digital/MGI)
- ABEP-TIC (estados)
- IBGE Munic (municípios) e IBGE Estadic (estados)
- PNAD Contínua (módulos específicos)

**Referências internacionais de indicadores:**
- E-Government Development Index (EGDI) — ONU
- OECD Digital Government Index
- GovTech Maturity Index — Banco Mundial

**Prazo:** Primeira versão pública em novembro de 2026; operação completa até dezembro de 2027 (fim da ENGD/EFGD).

**Hospedagem:** Insper inicialmente → AWS (MBC) no longo prazo.

## Os 10 objetivos da ENGD

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

## Dados disponíveis

Três escopos: **nacional** · **estadual** (27 UFs) · **capitais** (27 capitais).

Cada escopo tem 3 arquivos: `indice_*.csv` (sub-índice por objetivo), `detalhes_*.csv` (indicadores individuais) e `ranking_*.csv` (ranking por `indice_geral`).

**Referências numéricas:**
- Índice nacional: **58,26**
- Top 3 estados: PI 93,52 · MG 92,27 · RJ 92,02
- Top 3 capitais: Belo Horizonte 94,89 · Brasília 94,84 · Salvador 94,80

## Design system

Tokens em `src/app/globals.css` (Tailwind v4, OKLCH):

| Token | Cor | Uso |
|---|---|---|
| `primary` | `#0D1F3C` (navy escuro) | cor de marca, fundos e textos de destaque |
| `accent` | `#0EA5E9` (cyan) | links, destaques, chart-1 |
| `chart-2` | `#22C55E` (verde) | gráficos secundários |
| `chart-4` | cyan médio | gráficos terciários |

Suporte a dark mode via `.dark`. Usar **sempre** tokens semânticos (`bg-primary`, `text-accent`) — nunca valores literais como `bg-blue-500`.

## Decisões de produto

- Dados secundários já disponíveis (não coleta primária)
- Foco em indicadores estratégicos comparáveis entre entes federativos
- Plataforma analítica pública e interativa (sem área logada inicialmente)
- Escopo de features ainda em definição — levantar dúvidas antes de implementar
