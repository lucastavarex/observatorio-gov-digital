# Assets versionados do OBGD (edição 2026)

Subset usado pelo app, gerado a partir de `local_assets/dados-v3` para ir ao Git e buildar em CI/Vercel sem depender da pasta gitignored.

**Documentação completa:** [`docs/integracao-dados-v3-tags.md`](../../../../docs/integracao-dados-v3-tags.md)

## Conteúdo

```
assets/
├── indice_long_por_objetivo.json
├── detalhes_nacional.json
├── detalhes_estadual.json
├── detalhes_capitais.json
└── dados/
    ├── ente.json
    ├── fonte.json
    ├── indicador.json          # tags[] + audiencia
    ├── objetivo_engd.json
    ├── tag.json                # 16 tags transversais
    └── indice_por_tag.json     # média valor_normalizado por (unidade × tag)
```

## Atualizar após nova entrega

Com a pasta completa em `src/local_assets/dados-v3/`:

```bash
node scripts/sync-obgd-assets-from-v3.mjs
```

O script:

1. Converte CSVs flat → JSON (`ano_indice` vazio → `2026`)
2. Copia entidades canônicas (incl. `tag` e `indicador` com `tags`/`audiencia`)
3. Pré-calcula `indice_por_tag.json` a partir de `indicador` + `indicador_valor`

Em seguida, conferir smoke em ranking/indicadores (objetivo e temáticas) e commitar `src/data/obgd/assets/`.

`src/local_assets/` continua gitignored para a entrega completa (CSVs, docs, xlsx, legado).
