# Schema dos dados do OBGD (modelo relacional, desde a origem)

Modelo entidade-relacionamento para o site relacionar entidades e filtrar sem API. Cada arquivo `*.json` e um array de objetos; FKs por id.

Construido do codigo atual (config_engd, catalogo_variaveis, dimensoes_por_objetivo). Alinhado ao schema Postgres do PRD s4.

`indice_geral`/media geral sao **provisorios** (o pesquisador pode remover). Escalas `sub_indice`/`indice_geral`/`valor_normalizado` em 0-100.

## Relacionamentos (FKs)

- `dimensao_tematica.objetivo_id` -> `objetivo_engd` (pk `id`)
- `indicador.fonte_id` -> `fonte` (pk `id`)
- `indicador.objetivo_id` -> `objetivo_engd` (pk `id`)
- `indicador.dimensao_conceitual_id` -> `dimensao_conceitual` (pk `id`)
- `indicador.dimensao_tematica_id` -> `dimensao_tematica` (pk `id`)
- `indicador_valor.indicador_chave` -> `indicador` (pk `chave`)
- `indicador_valor.fonte_id` -> `fonte` (pk `id`)
- `indicador_valor.ente_id` -> `ente` (pk `id`)
- `indice_objetivo.ente_id` -> `ente` (pk `id`)
- `indice_objetivo.objetivo_id` -> `objetivo_engd` (pk `id`)
- `indice_geral.ente_id` -> `ente` (pk `id`)

## Entidades

### `fonte.json`

Base de dados de origem (14 fontes publicas).

Chave primaria: `id`

| campo | tipo | FK |
|---|---|---|
| `id` | str -- id curto (ex.: tic_gov) |  |
| `nome` | str |  |
| `instituicao` | str |  |
| `ano_base` | int -- ano da edicao usada (snapshot) |  |
| `formato` | str|null |  |
| `granularidade` | list[str] |  |
| `anos_disponiveis` | list[int] |  |

### `objetivo_engd.json`

Os 10 objetivos da ENGD (Decreto 12.069/2024).

Chave primaria: `id`

| campo | tipo | FK |
|---|---|---|
| `id` | int 1..10 |  |
| `nome` | str |  |
| `descricao` | str |  |

### `dimensao_conceitual.json`

As 3 dimensoes conceituais do marco teorico (cap02).

Chave primaria: `id`

| campo | tipo | FK |
|---|---|---|
| `id` | str -- slug (capacidade/uso_politicas/valor_publico) |  |
| `nome` | str |  |
| `descricao` | str |  |

### `dimensao_tematica.json`

As 52 dimensoes tematicas que organizam os capitulos.

Chave primaria: `id`

| campo | tipo | FK |
|---|---|---|
| `id` | int |  |
| `objetivo_id` | int | -> objetivo_engd |
| `nome` | str |  |

### `tag.json`

Temas transversais (tags) que recortam o catalogo atraves dos objetivos, para a visualizacao por tema. Multivaloradas por indicador.

Chave primaria: `id`

| campo | tipo | FK |
|---|---|---|
| `id` | str -- slug kebab-case |  |
| `nome` | str |  |
| `descricao` | str |  |
| `lado` | str (cidadao|gestor) -- publico tipico do tema |  |

### `ente.json`

Unidade de analise: Brasil, 27 UFs, 27 capitais e os 319 municipios com >=100 mil habitantes. As capitais aparecem nos dois recortes municipais (tipo=capital, chave sigla; e tipo=municipio, chave cod_ibge) -- filtre por `tipo`.

Chave primaria: `id`

| campo | tipo | FK |
|---|---|---|
| `id` | int |  |
| `tipo` | str (nacional|uf|capital|municipio) |  |
| `codigo` | str (BR | sigla UF | cod IBGE 7 dig do municipio) |  |
| `nome` | str |  |
| `uf_sigla` | str|null -- UF do municipio/capital |  |
| `regiao` | str|null (N/NE/SE/S/CO) |  |

### `indicador.json`

Catalogo de variaveis: classificacao de cada indicador.

Chave primaria: `chave`

| campo | tipo | FK |
|---|---|---|
| `chave` | str -- fonte/indicador[_sub] |  |
| `fonte_id` | str | -> fonte |
| `indicador` | str |  |
| `sub_itens` | list[str]|null |  |
| `descricao` | str |  |
| `pergunta` | str |  |
| `escala` | str |  |
| `populacao` | str|null |  |
| `objetivo_id` | int|null -- objetivo primario | -> objetivo_engd |
| `objetivos_engd` | list[int] |  |
| `tags` | list[str] -- ids de tag (temas transversais; FK logica -> tag.id) |  |
| `audiencia` | str|null (cidadao|gestor|ambos) -- ambito da prestacao |  |
| `dimensao_conceitual_id` | str|null | -> dimensao_conceitual |
| `dimensao_tematica_id` | int|null | -> dimensao_tematica |
| `agregacao` | str|null (max|mean) |  |
| `bateria` | str|null -- id do grupo de itens da mesma pergunta-mae |  |
| `status` | str (ativo|excluido|saturado) |  |
| `motivo_exclusao` | str|null |  |
| `anos_observados` | list[int] |  |
| `primeiro_ano` | int|null |  |

### `indicador_valor.json`

Observacoes: valor normalizado de cada indicador por ente.

Sem PK (tabela de fatos).

| campo | tipo | FK |
|---|---|---|
| `indicador_chave` | str|null -- FK para indicador | -> indicador |
| `fonte_id` | str | -> fonte |
| `indicador` | str |  |
| `sub_itens` | str |  |
| `ente_id` | int | -> ente |
| `ano` | int|null |  |
| `valor_normalizado` | float 0-100 |  |
| `escala` | str |  |
| `populacao` | str|null |  |
| `dimensao` | str (nacional|estadual|capitais) |  |

### `indice_objetivo.json`

Sub-indice (0-100) por ente x objetivo x edicao do indice.

Sem PK (tabela de fatos).

| campo | tipo | FK |
|---|---|---|
| `ente_id` | int | -> ente |
| `objetivo_id` | int | -> objetivo_engd |
| `ano_indice` | int|null -- ano da EDICAO do indice (nao das fontes); de loader_postgres.ANO_INDICE |  |
| `sub_indice` | float 0-100 |  |
| `n_indicadores` | int|null |  |

### `indice_geral.json`

Indice geral (0-100) por ente x edicao. PROVISORIO: a media geral pode ser removida pelo pesquisador.

Sem PK (tabela de fatos).

| campo | tipo | FK |
|---|---|---|
| `ente_id` | int | -> ente |
| `ano_indice` | int|null -- ano da EDICAO do indice (nao das fontes) |  |
| `indice_geral` | float 0-100 (PROVISORIO) |  |
| `n_objetivos_com_dados` | int |  |
| `provisorio` | bool |  |

## Relacoes por lista (pertencimento, nao FK escalar)

`indicador.tags` e `indicador.objetivos_engd` sao listas: relacionam-se a `tag.id` e `objetivo_engd.id` por **pertencimento** (a tag/objetivo esta na lista), nao por FK escalar. Por isso nao aparecem na secao de FKs acima, mas sao joinaveis normalmente (ver exemplos).

## Exemplos de consulta (joins que o site pode montar)

- **Sub-indice das UFs no objetivo 6:** `indice_objetivo` where `objetivo_id=6` join `ente` (tipo=uf).
- **Indicadores ativos de uma dimensao tematica:** `indicador` where `dimensao_tematica_id=X and status=ativo`.
- **Entes do Nordeste:** `ente` where `regiao=NE`.
- **Drill-down por objetivo:** `indicador_valor` join `indicador` (por `indicador_chave`) where `indicador.objetivo_id=N`.
- **Indicadores de uma tag:** `indicador` where `"conectividade" in tags` (join `tag` por `id` para nome/descricao).
- **Score de uma tag por territorio (tag x ente):** `indicador` where `"conectividade" in tags and status=ativo` -> join `indicador_valor` por `indicador_chave` -> agrupar por `ente_id` (join `ente` para tipo=uf|capital, regiao). Da o desempenho da tag em cada UF e capital.
- **Recorte por audiencia:** `indicador` where `audiencia='cidadao'` (ou 'gestor'/'ambos').
