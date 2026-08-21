# Assets versionados do OBGD (edição 2026)

Subset usado pelo app, gerado a partir de `src/data/obgd/assets-v4/` para ir ao Git e buildar em CI/Vercel sem o JSON bruto de `indicador_valor`.

**Documentação completa:** [`docs/integracao-dados-v3-tags.md`](../../../../docs/integracao-dados-v3-tags.md) (histórico v3 + seção **assets-v4**).

## Conteúdo

```
assets/
├── indice_long_por_objetivo.json
├── detalhes_nacional.json
├── detalhes_estadual.json
├── detalhes_capitais.json
├── detalhes_municipios.json      # 319 municípios ≥ 100 mil hab.
└── dados/
    ├── ente.json                 # 374 entes (BR + 27 UF + 27 capitais + 319 municípios)
    ├── fonte.json
    ├── indicador.json            # tags[] + audiencia
    ├── objetivo_engd.json
    ├── tag.json                  # 16 tags transversais
    └── indice_por_tag.json       # média valor_normalizado por (tipo × unidade × tag)
```

Não versionar `indicador_valor.json` (~7,5 MB).

## Atualizar após nova entrega

Com a pasta `src/data/obgd/assets-v4/` no lugar:

```bash
node --max-old-space-size=4096 scripts/sync-obgd-assets-from-v4.mjs
```

O script:

1. Converte CSVs flat → JSON (`ano_indice` vazio → `2026`; `n_objetivos_com_dados` vazio nos municípios → `7`)
2. Copia entidades canônicas (incl. `tag` e `indicador` com `tags`/`audiencia`)
3. Pré-calcula `indice_por_tag.json` agrupando por `(tipo, codigo, tag)` — capitais e municípios com o mesmo IBGE não se misturam
4. **Não** copia `indicador_valor.json`

Em seguida, conferir smoke em ranking/indicadores nos quatro recortes (federal, estadual, capitais, municípios) e commitar `src/data/obgd/assets/`.

O script legado `scripts/sync-obgd-assets-from-v3.mjs` permanece só como histórico.
