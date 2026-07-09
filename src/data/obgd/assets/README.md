# Assets versionados do OBGD (edição 2026)

Subset mínimo usado pelo app (~1,9 MB), copiado de `local_assets/dados-v2` para ir ao Git e buildar em CI/Vercel sem depender da pasta gitignored.

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
    ├── indicador.json
    └── objetivo_engd.json
```

## Atualizar após nova entrega do Insper

```bash
cp src/local_assets/dados-v2/indice_long_por_objetivo.json src/data/obgd/assets/
cp src/local_assets/dados-v2/detalhes_{nacional,estadual,capitais}.json src/data/obgd/assets/
cp src/local_assets/dados-v2/dados/{ente,fonte,indicador,objetivo_engd}.json src/data/obgd/assets/dados/
```

`src/local_assets/` continua gitignored para a entrega completa (CSVs, docs, xlsx, legado).
