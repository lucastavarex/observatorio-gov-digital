# Observatório de Governo Digital — alinhamento interno (pré-apresentação)

**Para:** time interno (Suelane, Luiza, Gabriel, Caio, engenharia)  
**Objetivo:** alinhar o que respondemos aos pontos do cliente / pontos que levantamos, o que já está na plataforma, dúvidas em aberto e o que ainda está mockado — **antes** da apresentação com o cliente final.  
**Data:** 28/07/2026

---

## 1. Para que serve este documento

Após o feedback do cliente (~22/07) e a rodada de evolução da interface, a plataforma oficial já incorpora as decisões principais de produto e a UI alinhada ao que validamos no protótipo. Este texto resume o **estado atual** para facilitar a rodada de feedbacks internos.

Não separamos aqui “o que veio do design” vs “o que veio da engenharia”: o foco é **o que a plataforma faz hoje** em relação a cada ponto.

---

## 2. Pontos do cliente / do time → o que foi feito

| Ponto | O que decidimos / implementamos |
| --- | --- |
| **Não usar média / índice geral** entre objetivos | Removido da interface. Ranking e destaques usam o **sub-índice do objetivo** selecionado (ou score de tag temática, quando aplicável). |
| **Ranking claro sobre o critério de ordenação** | Filtros de nível + “Ordenar por” (Objetivos da ENGD **ou** Categorias temáticas) + seleção explícita do objetivo/tag. |
| **Página de variável + série histórica isolada** | Removidas. Variáveis aparecem na página do objetivo como **lista com download** (sem drill-down temporal). |
| **Objetivo 3 (Identificação Única)** | Desabilitado na UI (chip com tooltip + aviso). Lacunas reais de cobertura de outros objetivos (ex.: 8 e 10) continuam refletindo os dados. |
| **Categorias / tags temáticas** | Fluxo na UI pronto (Indicadores e Ranking). Lista e scores ainda são **ilustrativos** (~20 tags), até a lista oficial (~50–60) e os scores. |
| **Versão com e sem ranking (teste A/B)** | Versão A: site com ranking. Versão B: prefixo `/v2` (ou flag de deploy) **sem** ranking. |
| **Objetivos com cobertura precária** | Há nota técnica na Metodologia (texto ainda provisório / mock para validação). |
| **Municípios além das capitais** | **Adiado** nesta etapa. Nível municipal = **capitais**. |
| **Idioma EN** | Fora de escopo nesta fase (plataforma em português). |

**Esclarecimento útil:** “sub-índice” (nota de um objetivo) **não** é o índice geral. O cliente pediu para tirar a média transversal; o sub-índice por objetivo permanece como métrica principal.

---

## 3. Extras que também entraram (além dos pontos acima)

Melhorias de usabilidade e fidelidade da interface que ajudam na apresentação:

- Home redesenhada (hero, ordem de seções, mapa/dados abertos quando aplicável, parceiros).
- **Mapa do Brasil** e **bandeiras** no Ranking (nível estadual).
- **URL compartilhável** nos filtros de Ranking e Indicadores (facilita enviar um recorte específico no feedback).
- No Ranking, ao abrir um ente, o detalhe respeita o **objetivo selecionado** (não “cai” sempre no objetivo 1).
- Página do objetivo alinhada: lista de variáveis com ações de fonte/download; sem bloco de recomendações nessa tela (recomendações ENGD seguem em Objetivos).
- Ajuste fino de gráficos (ex.: remoção da badge com nome do ente no topo da coluna em “Posição no objetivo”).
- Tela de **loading/abertura** da home foi **retirada** (impacto em UX e SEO).

---

## 4. Pontos em aberto / dúvidas para alinhar internamente

Pedimos uma posição do time nestes itens antes (ou durante) a apresentação:

1. **Texto do Objetivo 3** — o motivo exibido no tooltip ainda é provisório. Quem valida o texto final (Luiza / Gabriel / conteúdo)?
2. **Nota dos objetivos precários** — confirmamos quais são os quatro, o que foi avaliado e o que ficou de fora? O mock atual é só placeholder.
3. **Tags temáticas na demo** — apresentamos com o aviso claro de que são ilustrativas, ou preferimos esconder o modo “temáticas” até os dados oficiais?
4. **Download de variáveis** — na demo o arquivo ainda é exemplo gerado no navegador. Combinamos avisar o cliente ou priorizamos URL real antes da apresentação?
5. **Municípios extras** — confirmamos com o cliente que nesta versão municipal = capitais, e que a expansão fica para depois?
6. **Versão B (`/v2`)** — vamos mostrar as duas versões na apresentação? Quem decide qual fica “oficial” no go-live?

Se algum desses já estiver decidido no time, basta riscar na próxima revisão deste doc.

---

## 5. O que está mockado (e o que precisaríamos dos dados oficiais)

A maior parte do índice por **objetivo ENGD** (federal / UF / capitais) já usa a base entregue. O que ainda é mock / provisório:

| O quê | Para quê na UI | O que precisaríamos oficialmente |
| --- | --- | --- |
| **Tags temáticas** (catálogo + scores + “variáveis da tag”) | Ordenar / comparar por tema | Lista canônica (~50–60), mapeamento tag→indicadores e **nota já agregada** por ente × tag × edição |
| **Motivo do Obj. 3** | Tooltip / comunicação | Texto aprovado |
| **Nota dos objetivos precários** | Metodologia | Conteúdo validado (o que entrou / o que não entrou e por quê) |
| **Arquivo de download da variável** | Botão “baixar dados” | URL ou arquivo real por indicador (ou pacote por objetivo × ente) |

**Quando retomar municípios extras:** lista oficial no critério acordado + mesmos campos de índice/posição (e tags, se houver) no schema das capitais.

**Preferência da engenharia:** receber números **já agregados**; o front calcula o mínimo possível.

**Fora de escopo de pedido de dados nesta fase:** série histórica isolada por variável (a UI dessa página foi removida).

---

## 6. Como navegar rápido na versão atual (para quem for revisar)

- Home: `/`
- Indicadores (exemplo): `/indicadores?nivel=estadual&entes=sp&por=objetivos`
- Ranking (exemplo): `/ranking?nivel=estadual&por=objetivos&objetivo=gestao-e-governanca`
- Versão sem ranking: `/v2`
- Metodologia (nota precária mock): `/metodologia`

---

## 7. Próximo passo sugerido

1. Cada um revisa este resumo e anota feedbacks (produto, dados, visual, copy).  
2. Fechamos os itens da §4 que forem bloqueadores da apresentação.  
3. Só então levamos ao cliente o pacote alinhado (incluindo o que ainda é mock, com transparência).

Dúvidas ou correções: responder neste fio / marcar no doc compartilhado.
