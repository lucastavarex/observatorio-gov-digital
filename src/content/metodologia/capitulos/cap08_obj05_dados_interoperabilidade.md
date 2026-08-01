# 8. Objetivo 5: Dados e Interoperabilidade

> Qualificar a tomada de decisões e a oferta de serviços nas organizações públicas com o reúso constante e de forma ética dos dados disponíveis para análises, interoperabilidade e personalização.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 8.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca quatro recomendações aos entes federados para qualificar o uso de dados e a interoperabilidade nas organizações públicas:

- **5.1** Elaborar, publicar e implementar um programa de governança de dados.
- **5.2** Estabelecer e adotar mecanismos de interoperabilidade e compartilhamento de dados, entre os órgãos e com outros entes federados, especialmente os ofertados pela Plataforma GOV.BR, para qualificação das políticas públicas e eliminação de pedidos de dados dispensáveis na oferta de serviços públicos.
- **5.3** Contribuir para a elaboração e adotar um modelo de compartilhamento de dados que permita ao cidadão o uso seguro dos seus dados e melhore sua experiência no acesso a serviços.
- **5.4** Estimular o uso e a adoção de análise de dados, de maneira ética, na tomada de decisão das políticas públicas e na personalização dos serviços.

## 8.2 Cobertura por nível federativo

O Objetivo 5 conta com **36 variáveis ativas** no catálogo, que entram na agregação do índice como 24 componentes — itens de uma mesma bateria contam juntos como um único componente (ver Capítulo 3). Todas contribuem para a visão Nacional. **Duas** têm observação por UF (`ESTADIC_FORMATO_DADOS` e `IOSPD_I05`) e dão origem à dimensão `Recorte Estadual`. Apenas **uma** tem observação por capital (`MUNIC_DADOS_ABERTOS`), abaixo do limiar de duas variáveis para criação de dimensão federativa dedicada — não se cria `Recorte de Capitais`, e a variável aparece na dimensão temática `Dados abertos`.

## 8.3 Dimensões

As 36 variáveis ativas são organizadas em cinco dimensões temáticas — alinhadas, quando aplicável, às Recomendações 5.1 (governança de dados), 5.2 (interoperabilidade) e 5.4 (análise de dados) da Portaria — acrescidas da dimensão federativa `Recorte Estadual`, que reagrupa as variáveis com observação por UF.

![Dimensões do Objetivo 5](../graficos/dimensoes/cap08.png)

### 8.3.1 Governança de dados

*Definição:* Existência e maturidade de estruturas formais de governança de dados — instâncias colegiadas, gestor de dados designado, política institucional, ética no tratamento e conformidade da coleta com a legislação. Ancorada na Recomendação 5.1.

*Média Nacional:* 72.8 (n=5).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I05** — A UF possui estrutura colegiada de governança de dados, ampla, instituída formalmente e ativa?
  - *Normalização:* Índice 0-10 — multiplicado por 10.
  - Valor (Nacional): 48.15
  - Valor (Estadual): 48.1 (média das 27 UFs)

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G309DI** — iGovSISP: TEMA: Promoção da Cultura de Dados pela Alta Gestão. Assertiva: A alta gestão demonstra compromisso ativo na promoção de uma cultura orientada a dados, atuando como exemplo e engajando as equipes na valorização dos dados como ativos estratégicos. (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 91.45

*Bateria — artefatos de governança e gestão de dados: os 2 itens a seguir, junto com os 4 itens da mesma bateria listados na dimensão Qualidade e gestão dos ativos de dados (seção 8.3.2), entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G321DI** — iGovSISP: TEMA: Princípios e Políticas de Dados. Assertiva: Princípios e políticas de dados são definidos e implementados visando o estabelecimento de valores e diretrizes para garantir que os dados sejam geridos de forma ética, segura e estratégica, alinhados aos objetivos institucionais e às regulamentações aplicáveis. (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 73.93
- **G322DI** — iGovSISP: TEMA: Estrutura Organizacional para Governança de Dados. Assertiva: Existe uma estrutura de governança de dados formalmente estabelecida, com papéis, responsabilidades e mecanismos de comunicação claros, garantindo a colaboração entre as áreas e a supervisão contínua do progresso e da efetividade do Programa de Governança de Dados. (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 61.54
- **G334DI** — iGovSISP: Ética no tratamento dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 88.89

### 8.3.2 Qualidade e gestão dos ativos de dados

*Definição:* Práticas de catalogação, modelagem, armazenamento e mensuração da qualidade dos dados produzidos pelos órgãos — documentação de ativos, glossário de termos de negócio, dados mestres, gestão de metadados, ciclo de vida, modelagem, dados não estruturados e geoespaciais. Sub-conceito não enunciado pelas recomendações da ENGD, mas presente no autodiagnóstico SISP como bloco operacional da governança.

*Média Nacional:* 65.1 (n=15).

**Indicadores:**

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G301DI** — iGovSISP: Relevância e suficiência dados (autodiagnóstico SISP, conhece_utiliza).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 90.17

*Bateria — artefatos de governança e gestão de dados: os 4 itens a seguir, junto com os 2 itens da mesma bateria listados na dimensão Governança de dados (seção 8.3.1), entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G311DI** — iGovSISP: Documentação ativos de dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 86.32
- **G312DI** — iGovSISP: Glossário termos de negócio (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 55.98
- **G313DI** — iGovSISP: Dados mestres e de referência (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 56.84
- **G324DI** — iGovSISP: Gestão de metadados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 64.53

*Bateria — processos de gestão e integração de dados: os 2 itens a seguir, junto com os 4 itens da mesma bateria listados na dimensão Interoperabilidade e compartilhamento entre órgãos (seção 8.3.3), entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G325DI** — iGovSISP: Ciclo de vida dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 67.95
- **G326DI** — iGovSISP: Dados não estruturados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 63.25

*Bateria — qualidade dos dados: os 3 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G333DI** — iGovSISP: Qualidade dos dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 87.61
- **G384DI** — iGovSISP: Gestão qualidade dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 59.40
- **G385DI** — iGovSISP: Cultura qualidade dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 61.97
- **G359DI** — iGovSISP: Modelagem de dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 74.79
- **G361DI** — iGovSISP: TEMA: Alinhamento com Objetivos Estratégicos. Assertiva: As atividades de coleta, análise e tomada de decisão com base em dados estão alinhadas à visão, missão e metas institucionais, garantindo suporte efetivo ao planejamento estratégico e à governança corporativa. (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 82.48
- **G381DI** — iGovSISP: TEMA: Letramento em Dados. Assertiva: A promoção da capacitação é contínua entre os envolvidos para o uso efetivo de dados no apoio à tomada de decisões, assegurando que as habilidades necessárias sejam desenvolvidas em todas as áreas, de maneira alinhada aos objetivos estratégicos e às demandas institucionais. (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 64.10
- **G382DI** — iGovSISP: Dados geoespaciais (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 17.09
- **G386DI** — iGovSISP: Medição e controle qualidade (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 44.44

### 8.3.3 Interoperabilidade e compartilhamento entre órgãos

*Definição:* Mecanismos técnicos e institucionais que permitem integração de dados e sistemas entre órgãos públicos e estabelecimentos — adoção de padrões de interoperabilidade, integração de dados, integração de sistemas, monitoramento, compartilhamento de dados externos e troca eletrônica de informações na rede de saúde. Ancorada na Recomendação 5.2.

*Média Nacional:* 61.6 (n=7).

**Indicadores:**

*iGovSISP/SGD 2025 (SGD/MGI):*

*Bateria — processos de gestão e integração de dados: os 4 itens a seguir, junto com os 2 itens da mesma bateria listados na dimensão Qualidade e gestão dos ativos de dados (seção 8.3.2), entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G310DI** — iGovSISP: Integração de dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 92.31
- **G328DI** — iGovSISP: Padrões interoperabilidade (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 76.92
- **G329DI** — iGovSISP: Integração de sistemas (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 93.59
- **G330DI** — iGovSISP: Monitoramento interoperabilidade (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 27.78
- **G336DI** — iGovSISP: Compartilhamento dados externos (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 81.20

*TIC Saúde 2024 (CETIC.br):*

- **B6** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses troca informações eletrônicas com outros estabelecimentos de saúde? (C7 questionário)
  - *Normalização:* Proporção 0-100% — agregação `mean` sobre as alternativas A-G (amplitude média de adoção).
  - Valor (Nacional): 33.30
- **B9** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses compartilha informações com a rede de atenção à saúde? (C8 questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 26.10

### 8.3.4 Dados abertos

*Definição:* Existência e maturidade da publicação ativa de dados em formato aberto pelo poder público — política institucional, ecossistema de dados abertos no autodiagnóstico SISP, portal de dados abertos das prefeituras e formato de publicação dos dados administrativos pelos governos estaduais. Ancorada na Recomendação 5.2 (compartilhamento de dados) na vertente de transparência ativa via dados abertos.

*Média Nacional:* 58.0 (n=4).

**Indicadores:**

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G314DI** — iGovSISP: Política dados abertos (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 89.32
- **G315DI** — iGovSISP: Ecossistema dados abertos (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 78.63

*MUNIC 2024 (IBGE):*

- **MUNIC_DADOS_ABERTOS** — A prefeitura possui portal de dados abertos?
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 27.72

*ESTADIC 2024 (IBGE):*

- **ESTADIC_FORMATO_DADOS** — Formato de publicação dos dados da administração estadual (por tipo: orçamentos, receitas, despesas, balanços, LRF, compras/licitações, remunerações):
  - A) Em CSV/ODS/XLS/DOC (formato aberto)
  - B) Em PDF/imagem (formato fechado)
  - C) Em outro tipo
  - D) Não publica
  - Valor (Nacional): 36.38
  - Valor (Estadual): 36.4 (média das 27 UFs)

### 8.3.5 Análise de dados e decisão

*Definição:* Adoção de big data, capacidade analítica institucional, infraestrutura para análise de dados e uso efetivo dos dados na tomada de decisão pelos órgãos públicos e estabelecimentos de saúde. Ancorada na Recomendação 5.4.

*Média Nacional:* 57.2 (n=5).

**Indicadores:**

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **H1** — O órgão realizou análise de grandes volumes de dados (big data)?
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 25.01

*TIC Saúde 2024 (CETIC.br):*

- **D2** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses utiliza análise de grandes volumes de dados (big data) em saúde? (H2 questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 5.02

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G307DI** — iGovSISP: Decisão baseada em dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 89.74
- **G308DI** — iGovSISP: Capacidade analítica (autodiagnóstico SISP, conhece_utiliza).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 79.06
- **G383DI** — iGovSISP: Infraestrutura análise dados (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 87.18

### 8.3.6 Recorte Estadual

*Definição:* Conjunto das variáveis dimensionadas do Objetivo 5 com observação por UF, agregadas para leitura federativa. Reúne `IOSPD_I05` (também presente em `Governança de dados`) e `ESTADIC_FORMATO_DADOS` (também presente em `Dados abertos`) — única exceção à regra de não-repetição entre dimensões.

*Média Estadual:* 42.3 (n=2).

![Recorte Estadual — Objetivo 5](../graficos/recortes/cap08_estadual.png)

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_FORMATO_DADOS** — Formato de publicação dos dados da administração estadual (por tipo: orçamentos, receitas, despesas, balanços, LRF, compras/licitações, remunerações):
  - A) Em CSV/ODS/XLS/DOC (formato aberto)
  - B) Em PDF/imagem (formato fechado)
  - C) Em outro tipo
  - D) Não publica
  - Valor (Estadual): 36.4 (média das 27 UFs)

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I05** — A UF possui estrutura colegiada de governança de dados, ampla, instituída formalmente e ativa?
  - Valor (Estadual): 48.1 (média das 27 UFs)
