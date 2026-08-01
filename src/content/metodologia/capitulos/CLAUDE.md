# Contrato — escrever um capítulo-objetivo no padrão dimensional

Este arquivo orienta sessões que reorganizam um capítulo-objetivo (`cap04..cap13`) seguindo o padrão dimensional. Vale junto com o `CLAUDE.md` da raiz da v5 (não substitui).

## O que é uma dimensão (na v5)

Sub-agrupamento de variáveis dentro de um objetivo da ENGD — sub-conceito mais fechado que o objetivo, que permite leitura mais granular dos resultados.

Há dois tipos:

- **Dimensões temáticas** — cada uma agrupa variáveis por sub-conceito uniforme. Cada variável aparece em exatamente uma dimensão temática.
- **Dimensões federativas** (até 2 por objetivo, opcionais) — `Recorte Estadual` (criada quando há ≥2 vars com observação por UF) e `Recorte de Capitais` (≥2 vars com observação por capital). Estas são as únicas dimensões em que uma variável pode também aparecer em outra dimensão (exceção à regra de não-repetição).

**Não confundir** com as antigas "3 dimensões conceituais" (capacidade / uso / valor público) da v4 — removidas do eixo editorial. Essas discussões teóricas continuam só no `cap02_revisao_literatura.md` como marco conceitual, sem regrupar indicadores.

## Insumo de referência

Antes de propor dimensões, ler as recomendações da ENGD para o objetivo em questão em [`../../metodologia/recomendacoes_engd_2024_2027.md`](../../metodologia/recomendacoes_engd_2024_2027.md). Elas ancoram os contornos esperados (ex.: o Obj 1 tem 5 recomendações cobrindo governança, planejamento, orçamento, redes e financiamento). Não tratar como camisa de força — variáveis não enunciadas pela Portaria devem ser agrupadas por coerência conceitual interna.

A seção `X.1 Recomendações da ENGD para este objetivo` do capítulo cita literalmente as recomendações do objetivo. Lacunas (recomendação sem indicador no índice) **não** ficam no corpo do capítulo: vão para a sub-seção `B.<N>` do [`anexo_b_lacunas_recomendacoes.md`](anexo_b_lacunas_recomendacoes.md).

## Notas sobre fontes (ao dimensionar)

Algumas fontes têm peculiaridades que afetam a montagem das dimensões. Estão registradas no `v5/CLAUDE.md` (seção "Notas sobre dados") e em memória do projeto, mas vale ter em mente:

- **iGovSISP** mede apenas órgãos federais SISP — variáveis `G1xxGP` aparecem só na visão Nacional. Não entram em `Recorte Estadual` nem em `Recorte de Capitais`.
- **MUNIC e ESTADIC (IBGE)** — bloco TIC é rotativo (não é permanente em todas as edições); a edição usada é a 2024. Variáveis `MUNIC_*` têm observação por capital (entram em `Recorte de Capitais`); variáveis `ESTADIC_*` têm observação por UF (entram em `Recorte Estadual`). Algumas foram classificadas em objetivos por proximidade conceitual frouxa, sem revisão sistemática contra a Portaria — alta probabilidade de gerar variáveis em borda (cf. issue #80 para Obj 1).
- **IOSPD/ABEP-TIC** — observação por UF, então variáveis `IOSPD_*` típicas entram em `Recorte Estadual` quando há ≥2 no objetivo.
- **CETIC.br (TIC Saúde / TIC Educação / TIC Cultura)** — agregações `max`/`mean` calculadas sobre proporções já agregadas pelo CETIC.br, não microdados. Não confundir essa nuance com escopo do indicador ao agrupar.

## Trabalho concomitante — worktree e branch dedicadas (obrigatório)

Cada PR de dimensão é trabalhado em worktree dedicada. O mecanismo geral (comandos `git worktree add`/`remove`, base `origin/main`, fluxo de abertura/encerramento) está em [`../../CLAUDE.md`](../../CLAUDE.md), seção "Workflow git — worktree por PR". Aqui ficam só as especificidades de PR de dimensão:

- **Naming:** branch `dim-objNN-<slug>` (ex.: `dim-obj02-qualidade`, `dim-obj04-seguranca-lgpd`); worktree `../v5-dim-objNN/`.
- **Escopo dos arquivos:** tocar **apenas o capítulo-objetivo correspondente** (`cap0N_objNN_<slug>.md`) + a sub-seção `B.<N>` do `anexo_b_lacunas_recomendacoes.md` + opcionalmente `entregas/relatorio_unificado.md` regenerado pelo script. Mudanças transversais (catálogo, metodologia, gerador, outro capítulo) → **PR separado**, fora desta worktree.
- **Dimensões vivem como texto** dentro do capítulo nesta fase. **Não** criar metadado em `variaveis/catalogo_variaveis.py` — o catálogo único viraria gargalo entre PRs paralelos. Migração para metadado fica para depois, quando todos os 10 capítulos estiverem definidos.
- **Sem sub-índice por objetivo** nesta fase. Cada dimensão temática reporta `Média Nacional`; cada `Recorte` reporta a média no nível federativo correspondente. Não agregar entre dimensões.

## Como escrever o capítulo

### 1. Inventariar as variáveis do objetivo, por nível federativo

Filtrar `variaveis/catalogo_variaveis.py` por `N in entrada["objetivos_engd"]` e `entrada["status"] == "ativo"`. Para cada variável, classificar quanto à observação:

- **Nacional** (sempre): toda variável ativa contribui para a visão Nacional (agregação consolidada que incorpora MUNIC/ESTADIC quando aplicável).
- **Estadual**: tem valor por UF? (típico de IOSPD, ESTADIC).
- **Capitais**: tem valor por capital? (típico de MUNIC).

Reportar em `X.2 Cobertura por nível federativo`: total ativos, nº por visão, e quais dimensões `Recorte` serão criadas.

### 2. Agrupar em dimensões temáticas

Critérios:

- **Número de dimensões temáticas livre** — escolher a granularidade que reflete fielmente a estrutura da medição daquele objetivo. Evitar dimensões sem coerência conceitual (agrupamento "geral") e dimensões duplicadas (mesmo sub-conceito repartido em duas).
- **Coerência conceitual**: cada dimensão agrupa variáveis que medem um sub-conceito uniforme (ex.: "Estrutura de governança" agrupa "tem departamento de TI", "tem comitê", "tem estrutura organizacional").
- **Cada variável em exatamente 1 dimensão temática.** Se uma variável encaixa em duas, escolher a dominante e justificar. (A repetição em dimensão `Recorte Estadual` ou `Recorte de Capitais` é a única exceção a essa regra.) Toda variável ativa do objetivo cabe em alguma dimensão temática — eventualmente em uma dimensão singleton com 1 variável, se o sub-conceito é coerente. Se realmente não couber em nenhum sub-conceito do objetivo, a variável é "em borda" (procedimento §4) — abre issue de reclassificação.
- **Nomes curtos e substantivos** (ex.: "Estrutura organizacional", "Estratégia e planejamento", "Recursos e contratações"). Evitar siglas e jargões.
- **Anti-padrões a evitar:** dimensão "Outros / Variáveis diversas" (vira lixeira conceitual — variável que não cabe é "em borda", abre issue de reclassificação); dimensão tautológica que repete o nome do objetivo; dimensão "Geral" sem sub-conceito identificável.
- **Ancoragem na Portaria**: na `*Definição:*` da dimensão, citar a recomendação `N.X` correspondente quando houver. Vocabulário canônico em §3a abaixo.

### 3. Adicionar dimensões federativas (quando aplicável)

- **`Recorte Estadual`**: criar como última (ou penúltima) dimensão sse o objetivo tiver ≥2 variáveis com observação por UF. Inclui todas elas, mesmo que já estejam em outras dimensões temáticas. Reporta `*Média Estadual:* XX.X (n=N)`.
- **`Recorte de Capitais`**: criar como última dimensão sse o objetivo tiver ≥2 variáveis com observação por capital. Inclui todas elas, com possível repetição. Reporta `*Média Capitais:* XX.X (n=N)`.
- **Ordem**: dimensões temáticas vêm primeiro; depois `Recorte Estadual`, depois `Recorte de Capitais`. Numeração contínua (`X.3.1`, `X.3.2`, …).
- **Subdivisão**: enquanto cada `Recorte` tiver ≤10 variáveis, mantém-se sem subdivisão. Subdimensionar é trabalho futuro (ver issue de acompanhamento criada junto ao padrão).
- Se um nível federativo tem 0–1 variável, **não** criar a dimensão `Recorte` correspondente. Registrar a exceção em `X.2 Cobertura`. A variável (se houver) aparece dentro de uma dimensão temática.

### 3a. Padrão de redação das definições

Para padronizar a leitura horizontal entre os 10 capítulos-objetivo, cada `*Definição:*` segue quatro regras de vocabulário fixo:

1. **Ancoragem à Portaria — fórmula única.** Adotar **"Ancorada na Recomendação N.M"** (não "Aderente à"):
   - Uma única recomendação: `Ancorada na Recomendação N.M.`
   - Múltiplas no mesmo plano: `Ancorada nas Recomendações N.A e N.B.`
   - Recomendação principal + secundária: `Ancorada na Recomendação N.A; com vínculo secundário à Recomendação N.B.`

2. **Sub-conceitos fora da Portaria — fórmula única.** Quando a dimensão cobre aspecto não enunciado pelas recomendações (ex.: gestão de processos de TI no Obj 1, qualidade dos ativos de dados no Obj 5), abrir a frase com **"Sub-conceito não enunciado pelas recomendações da ENGD, mas …"**. Não usar variantes ("não enunciado pelas recomendações do Objetivo N", "não enunciado [diretamente] pela Portaria").

3. **Definição dos blocos `Recorte` — modelo único.** Forma canônica:

   ```
   *Definição:* Conjunto das variáveis do Objetivo N com observação por <UF | capital>, agregadas para leitura federativa <estadual | municipal> [do desempenho em <tema do objetivo>]. <Frase opcional listando contagens ou variáveis específicas, conforme regra abaixo.> Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).
   ```

   Não usar a forma facultativa "Pode incluir variáveis…" — quando o Recorte de fato repete variáveis temáticas, a forma indicativa é precisa.

4. **Listar ou contar.** Na frase opcional do modelo de Recorte, escolher conforme o número de variáveis no recorte:
   - **≤3 variáveis** → listar nominalmente as variáveis (pelo código exato do catálogo).
   - **>3 variáveis** → reportar contagem por fonte (ex.: "Reúne as 9 variáveis ESTADIC e as 34 variáveis IOSPD do objetivo.").

### 4. Variáveis em borda — quando criar issue separada

> **Dois conceitos próximos.** *Em borda* = variável que provavelmente está no objetivo errado (mede algo lateral ao próprio objetivo, com escopo conceitual mais aderente a outro objetivo da ENGD). *Lacuna* = recomendação da Portaria sem variável correspondente no índice. Borda gera issue separada; lacuna fica na sub-seção `B.<N>` do `anexo_b_lacunas_recomendacoes.md`.

**Variável em borda** mede algo lateral ao próprio objetivo, com escopo conceitual mais aderente a outro objetivo da ENGD (ex.: "capacitação" classificada em Obj 1 mas que pertence ao Obj 10). PR de dimensão **não resolve sozinho** — exige decisão dos coordenadores e mexe no catálogo (transversal a múltiplos capítulos).

**Procedimento para variáveis em borda:**

1. **Remover a variável do capítulo** no PR de dimensão. Não listá-la em nenhuma dimensão. Registrar em `X.2 Cobertura` que a variável está sob revisão de classificação (sem usar a palavra "issue" nem citar número no corpo do capítulo, conforme regra do `v5/CLAUDE.md` raiz), explicando a discrepância entre o total ativo no catálogo e o total dimensionado.
2. Abrir **issue separada** no GitHub com tabela contendo: código, fonte, pergunta completa, valor agregado, classificação atual, alternativa proposta, justificativa, impacto. Padrão a seguir: ver issue #80 (Obj 1).
3. Referenciar a issue no corpo do PR de dimensão como **acompanhamento** (não usar `Blocked by`). **A issue não é bloqueante.** O PR de dimensão pode ser merged independentemente — o capítulo só reflete o que está dimensionado no momento.
4. Após decisão dos coordenadores, **PR posterior** atualiza o catálogo (move a variável para o objetivo correto) e reinsere a variável no capítulo de destino, ou a remove definitivamente se a decisão for excluir.
5. Não modificar o catálogo no PR de dimensão (catálogo é transversal a múltiplos capítulos).

**Por que não bloquear:** travar o PR de dimensão na decisão dos coordenadores trava também a entrega do capítulo no formato dimensional. A política é avançar com o que é dimensionável, isolar o que está em discussão, e reincorporar depois — preservando a propriedade de que cada PR fecha sozinho.

### 5. Template do capítulo

```markdown
# X. Objetivo N: <Nome>

> Ementa literal da ENGD.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## X.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca <K> recomendações aos entes federados:

- **N.1** [texto literal]
- **N.2** [texto literal]
- ...

## X.2 Cobertura por nível federativo

[1-2 frases reportando: <T> variáveis ativas no total; <V_n> na visão Nacional; <V_e> com observação por UF; <V_c> com observação por capital. Antecipar quais dimensões `Recorte` serão criadas (ou registrar que o objetivo não comporta dimensão federativa dedicada quando ambos os níveis estão abaixo do limiar de 2).]

## X.3 Dimensões

[1-2 frases sobre como as <K_t> dimensões temáticas refletem (ou não) as recomendações da Portaria, e — se houver — quais dimensões `Recorte` foram criadas.]

![Dimensões do Objetivo N](../graficos/dimensoes/cap0X.png)

### X.3.1 [Nome curto da dimensão temática 1]

*Definição:* [1-2 frases]. Ancorada na(s) Recomendação(ões) N.X.

*Média Nacional:* XX.X (n=<n>).

**Indicadores:**

*FONTE ANO (INSTITUIÇÃO):*

- **CODIGO** — Pergunta completa.
  - *Normalização:* [se sem alternativas]
  - Valor (Nacional): XX.X
  - Valor (Estadual): XX.X (quando aplicável)
  - Valor (Capitais): XX.X (quando aplicável)

*[Próxima fonte]:*
- ...

### X.3.2 [Próxima dimensão temática]
...

### X.3.K Recorte Estadual (quando ≥2 vars por UF)

*Definição:* Conjunto das variáveis do Objetivo N com observação por UF, agregadas para leitura federativa estadual. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Estadual:* XX.X (n=<n>).

![Recorte Estadual — Objetivo N](../graficos/recortes/cap0X_estadual.png)

**Indicadores:**

[Mesmo formato. Cada indicador exibe `Valor (Estadual)`. Pode também citar Valor (Nacional) se já estiver em outra dimensão.]

### X.3.K+1 Recorte de Capitais (quando ≥2 vars por capital)

[análogo, com `*Média Capitais:*` e `Valor (Capitais)`]

![Recorte de Capitais — Objetivo N](../graficos/recortes/cap0X_capitais.png)

**Indicadores:**

[...]
```

Use os códigos exatamente como aparecem no catálogo (ex.: `B1`, `IOSPD_I10`, `MUNIC_TI_ESTRUTURA`, `G101GP`).

**Gráfico do Recorte (obrigatório quando o Recorte existir):** logo após a linha `*Média Estadual:* XX.X (n=N).` (e análoga para Capitais) e antes de `**Indicadores:**`, inserir o PNG correspondente — `![Recorte Estadual — Objetivo N](../graficos/recortes/cap0X_estadual.png)` ou `![Recorte de Capitais — Objetivo N](../graficos/recortes/cap0X_capitais.png)`. O PNG é gerado por `indices/gerar_graficos_recortes.py` a partir dos CSVs em `pipeline/dados/` e ranqueia as 27 UFs (Estadual) ou 27 capitais (Capitais) pela média da unidade sobre as variáveis do Recorte. Para regerar:

```bash
uv run python indices/gerar_graficos_recortes.py
```

O gerador valida automaticamente que a média do PNG bate com `*Média Estadual:*`/`*Média Capitais:*` reportada no `.md` (tolerância 0.05) e que `n` reportado bate com o número de variáveis encontradas. Divergências saem como avisos no stdout.

### 6. Atualizar o Anexo B

Para cada recomendação `N.X` da Portaria sem indicador correspondente no índice:

- Editar [`anexo_b_lacunas_recomendacoes.md`](anexo_b_lacunas_recomendacoes.md), sub-seção `B.<N>` do objetivo.
- Substituir o placeholder `*Pendente — capítulo ainda não reorganizado.*` por uma lista das lacunas, no formato `- **Recomendação N.X (assunto):** [explicação curta].`
- Se não houver lacuna, substituir o placeholder por `*Sem lacunas: todas as recomendações têm pelo menos um indicador correspondente.*`

### 7. O que NÃO fazer

- Não modificar `cap03_metodologia.md` (metodologia comum a todos os objetivos).
- Não modificar `variaveis/catalogo_variaveis.py` (texto-only por enquanto).
- Não modificar scripts em `indices/`. **Exceções:** rodar `indices/gerar_graficos_dimensoes.py` (regera o PNG do gráfico de dimensões temáticas) e `indices/gerar_graficos_recortes.py` (regera os PNGs dos Recortes Estadual e de Capitais) é permitido.
- Modificar `variaveis/dimensoes_por_objetivo.py` é permitido (e esperado) quando a composição das dimensões temáticas mudou.
- Não tocar em outros `cap0X` no mesmo PR.
- Não calcular nem citar sub-índice geral por objetivo no corpo do capítulo.
- Não criar sub-seções "Visão Nacional / Estadual / Capitais" como blocos separados de listagem plana — toda variável aparece dentro de uma dimensão.
- Não escrever sub-seção "Lacunas" no corpo do capítulo — vai para o Anexo B.

## Checklist do PR de dimensão

- [ ] Apenas o capítulo-objetivo correspondente, a sub-seção `B.<N>` do Anexo B, o PNG `entregas/graficos/dimensoes/cap0X.png`, a entrada do objetivo em `variaveis/dimensoes_por_objetivo.py` e (opcionalmente) `entregas/relatorio_unificado.md` regenerado foram modificados (`git diff --name-only`).
- [ ] `X.1 Recomendações da ENGD` cita literalmente as recomendações daquele objetivo (de `metodologia/recomendacoes_engd_2024_2027.md`).
- [ ] `X.2 Cobertura por nível federativo` reporta totais por visão e antecipa criação (ou não) das dimensões `Recorte`.
- [ ] Dimensões temáticas em número adequado à estrutura da medição (sem teto fixo), cada uma com definição (ancorada em recomendação quando houver), `*Média Nacional:* XX.X (n=N)` e indicadores agrupados por fonte com pergunta completa e valores por visão aplicável.
- [ ] Gráfico de dimensões regerado: rodar `uv run python indices/gerar_graficos_dimensoes.py` (atualiza `entregas/graficos/dimensoes/cap0X.png`); a linha `![Dimensões do Objetivo N](../graficos/dimensoes/cap0X.png)` está presente em `## X.3 Dimensões`, logo após o parágrafo introdutório e antes do primeiro `### X.3.1`. Mapeamento variável → dimensão atualizado em `variaveis/dimensoes_por_objetivo.py`.
- [ ] `Recorte Estadual` criado sse há ≥2 vars por UF; `Recorte de Capitais` criado sse há ≥2 vars por capital. Se criados, reportam média no nível correspondente e ≤10 vars.
- [ ] Gráficos dos Recortes regerados: rodar `uv run python indices/gerar_graficos_recortes.py` (atualiza `entregas/graficos/recortes/cap0X_estadual.png` e/ou `cap0X_capitais.png` quando aplicável); cada `Recorte` no `.md` tem o `![…](../graficos/recortes/cap0X_<nivel>.png)` correspondente logo após a linha `*Média …:* XX.X (n=N).` e antes de `**Indicadores:**`. Saída do gerador sem `[divergencia]`.
- [ ] Cada variável aparece em **exatamente 1 dimensão temática**. Pode aparecer adicionalmente em `Recorte Estadual` e/ou `Recorte de Capitais` (única exceção).
- [ ] Nomes das dimensões temáticas são substantivos curtos.
- [ ] Variáveis em borda (se houver) tratadas conforme procedimento §4 — issue aberta e referenciada no PR.
- [ ] Sub-seção `B.<N>` do Anexo B atualizada (lacunas listadas, ou marcada como "sem lacunas").
- [ ] Validação automática: total de variáveis citadas (excluindo as repetidas em `Recorte`) = total de variáveis ativas do objetivo no catálogo, sem duplicatas dentro das dimensões temáticas. A partir de `v5/`, ajustando `N` (objetivo) e `CAP`:

```bash
N=2
CAP=entregas/capitulos/cap05_obj02_qualidade.md

TOTAL=$(uv run python -c "from variaveis.catalogo_variaveis import CATALOGO as c; print(sum(1 for v in c.values() if $N in (v.get('objetivos_engd') or []) and v.get('status') == 'ativo'))")
# Conta apenas vars únicas dentro das dimensões temáticas (exclui blocos Recorte Estadual / Recorte de Capitais)
USADAS=$(awk '/^## .*\.3 Dimensões/{f=1; next} /^## /{f=0} tolower($0) ~ /^### .*recorte estadual/{rec=1; next} tolower($0) ~ /^### .*recorte de capitais/{rec=1; next} /^### /{rec=0} f && !rec' "$CAP" | grep -E '^\*Variáveis' | grep -oE '`[^`]+`' | sort -u | wc -l)
DUP=$(awk '/^## .*\.3 Dimensões/{f=1; next} /^## /{f=0} tolower($0) ~ /^### .*recorte estadual/{rec=1; next} tolower($0) ~ /^### .*recorte de capitais/{rec=1; next} /^### /{rec=0} f && !rec' "$CAP" | grep -E '^\*Variáveis' | grep -oE '`[^`]+`' | sort | uniq -d)
echo "Catálogo: $TOTAL | Capítulo (únicas em temáticas): $USADAS | Duplicadas em temáticas: ${DUP:-nenhuma}"
[ "$TOTAL" = "$USADAS" ] && [ -z "$DUP" ] && echo OK || echo FALHA
```

- [ ] `uv run python entregas/gerar_relatorio_unificado.py` continua gerando sem warnings.

## Convenções herdadas (lembretes)

Estas regras valem para qualquer texto deste repositório e estão em `v5/CLAUDE.md`:

- Pergunta sempre por extenso ao citar uma variável.
- Indicadores agrupados por fonte com header `*FONTE ANO (INSTITUIÇÃO):*`.
- Sem referências a issues do GitHub no corpo do relatório.
- Sem mencionar versões do índice (v3, v4) no corpo do relatório.
- Vitrine, não análise: descrever composição e dados, não interpretar.
- Nunca estimar quantidades ("~25"); contar.
