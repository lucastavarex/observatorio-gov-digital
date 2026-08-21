# Entrega dos dados para o site (OBGD)

Dois formatos dos MESMOS dados (fonte unica de verdade):

## `dados/` -- modelo relacional (JSON) -- **canonico**
Entidades normalizadas com FKs, para relacionar e filtrar sem API:
`fonte`, `objetivo_engd`, `dimensao_conceitual`, `dimensao_tematica`, `ente`,
`indicador`, `indicador_valor`, `indice_objetivo`, `indice_geral`.
Ver `dados/SCHEMA.md` e `dados/schema.json` (relacoes/FKs e exemplos de join).
Filtros suportados: por objetivo, dimensao conceitual/tematica, regiao, tipo de
ente, fonte.

## CSVs (raiz) -- views flat de conveniencia (derivadas do canonico)
- `indice_long_por_objetivo.csv` -- uma linha por (nivel, unidade, objetivo) com
  `sub_indice`, `indice_geral` e `posicao_no_objetivo`. `unidade` = `ente.codigo`.
- `indice_*`, `detalhes_*`, `ranking_*` -- copias diretas do build.

## Avisos
1. **`indice_geral` e PROVISORIO** -- a media geral a partir dos objetivos pode
   ser removida pelo pesquisador. Prefira `indice_objetivo`/rankings por objetivo.
2. Escala 0-100 para sub_indice, indice_geral e valor_normalizado.
3. Snapshot: cada fonte contribui com 1 ano (o mais recente).
