# 7. Objetivo 4: Segurança e LGPD

> Ampliar a resiliência e a maturidade das estruturas tecnológicas governamentais com atenção à privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 7.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca cinco recomendações aos entes federados para reforço à privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética:

- **4.1** Instituir estrutura de governança e coordenação para implementação de medidas de reforço à privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética, em articulação com estruturas de mesmo propósito de âmbito regional e nacional, em especial o Programa de Privacidade e Segurança da Informação - PPSI do Governo federal.
- **4.2** Estabelecer plano de ação de reforço à privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética que contemple diagnóstico, controles, metodologias e soluções tecnológicas adequadas aos riscos identificados.
- **4.3** Designar encarregado pelo tratamento de dados pessoais e gestor de segurança da informação.
- **4.4** Promover ações de sensibilização, conscientização e capacitação para agentes públicos, lideranças governamentais e sociedade sobre privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética, sendo o Centro de Excelência em Privacidade e Segurança da Informação - CEPS Gov.br a unidade de referência para tais atividades.
- **4.5** Contribuir com a criação, participação e subsídio das atividades de redes nacionais, estaduais, regionais e associativas das equipes de prevenção, tratamento e resposta a incidentes cibernéticos, sendo o Centro Integrado de Segurança Cibernética do Governo Digital - CISC Gov.br a unidade de referência para tais atividades.

## 7.2 Cobertura por nível federativo

O Objetivo 4 reúne 46 variáveis ativas — 22 do iGovSISP/SGD, 8 da TIC Saúde, 6 da TIC Governo Eletrônico, 5 da MUNIC, 4 da ESTADIC e 1 do IOSPD/ABEP-TIC —, que entram na agregação do índice como 36 componentes — itens de uma mesma bateria contam juntos como um único componente (ver Capítulo 3). Todas contribuem para a visão Nacional, 5 têm observação por UF (4 ESTADIC 2024 e `IOSPD_III07`) e 5 têm observação por capital (5 MUNIC 2024). Como cada nível federativo dispõe de ≥2 variáveis, este capítulo cria as duas dimensões federativas dedicadas — `Recorte Estadual` e `Recorte de Capitais` — ao lado das dimensões temáticas. Ambas mantêm-se sem subdivisão (≤10 variáveis cada).

## 7.3 Dimensões

As 46 variáveis ativas foram agrupadas em **seis dimensões temáticas** que dialogam com as recomendações 4.1 a 4.5 da Portaria — cobrindo governança e responsabilidades nomeadas, planos formais e diagnóstico, práticas LGPD substantivas, controles e auditoria, resposta a incidentes e capacitação. Em seguida vêm `Recorte Estadual` (5 variáveis) e `Recorte de Capitais` (5 variáveis), que repetem as variáveis observadas em cada nível para leitura federativa.

![Dimensões do Objetivo 4](../graficos/dimensoes/cap07.png)

### 7.3.1 Governança e responsabilidades

*Definição:* Existência de instâncias formais e responsáveis nomeados para privacidade e segurança da informação — encarregado pelo tratamento de dados pessoais, gestor de segurança da informação, área/pessoa LGPD, regulamentação local e supervisão pelo Comitê de Governança Digital. Ancorada nas Recomendações 4.1 e 4.3.

*Média Nacional:* 37.6 (n=9).

**Indicadores:**

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **G1** — O órgão/prefeitura possui pessoa ou área responsável pela LGPD?
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 50.27

*ESTADIC 2024 (IBGE):*

- **ESTADIC_LGPD_RESP** — Área/pessoa responsável pela implementação da LGPD — existência?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 85.19
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **ESTADIC_LGPD_REGULAMENT** — Regulamentação ou lei estadual específica sobre LGPD que identifica papéis/responsabilidades — existência?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 66.67
  - Valor (Estadual): 66.7 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_LGPD** — A área de comunicação exerce a função de disseminação da aplicação e orientações para a população de como o município cumpre a LGPD?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 12.96
  - Valor (Capitais): 51.85 (14/27 capitais)

- **MUNIC_LGPD_RESP** — A prefeitura possui área ou pessoa responsável pela coleta, armazenamento, uso de dados pessoais e pela implementação das diretrizes da LGPD?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 27.85
  - Valor (Capitais): 77.78 (21/27 capitais)

- **MUNIC_LGPD_REGULAMENT** — A prefeitura possui regulamentação ou lei municipal específica sobre a LGPD que identifica papéis e responsabilidades?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 23.88
  - Valor (Capitais): 81.48 (22/27 capitais)

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G211SPD** — iGovSISP: Os assuntos relativos à Segurança da Informação são deliberados pelo Comitê de Governança Digital ou equivalente? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 35.47

- **G212SPD** — iGovSISP: O órgão possui gestor de Segurança da Informação formalmente designado conforme o Decreto nº 12.198/2024? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 29.91

- **G224SPD** — iGovSISP: O órgão possui Encarregado pelo Tratamento de Dados Pessoais formalmente designado, conforme o Art. 23, inciso III, da Lei nº 13.709/2018 (LGPD)? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 5.98

### 7.3.2 Planos, políticas e diagnóstico

*Definição:* Existência e adoção de instrumentos formais de planejamento e diagnóstico de segurança da informação — Política de Segurança da Informação (POSIN), política de segurança da informação nos estabelecimentos de saúde, conformidade com a Portaria GSI 852/2023, Framework de Privacidade e Segurança da Informação, Programa de Privacidade e Segurança da Informação (PPSI) e seus guias e modelos. Ancorada na Recomendação 4.2 e, na adoção do PPSI, na Recomendação 4.1.

*Média Nacional:* 33.2 (n=6).

**Indicadores:**

*TIC Saúde 2024 (CETIC.br):*

- **A8** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses possui política de segurança da informação? (C8a questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 41.64

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G201SPD** — iGovSISP: O órgão possui Política de Segurança da Informação — POSIN? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 49.57

- **G226SPD** — iGovSISP: Acerca da Portaria GSI/PR nº 852, de 28 de março de 2023, que altera a Portaria GSI/PR nº 120/2022, o órgão: (autodiagnóstico SISP, conhece_utiliza).
  - *Normalização:* Escala 0-100 — usado diretamente.
  - Valor (Nacional): 5.98

*Bateria — instrumentos do PPSI: os 3 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G629IPD** — iGovSISP: O órgão conhece e utiliza o Framework de Privacidade e Segurança da Informação? (autodiagnóstico SISP, conhece_utiliza).
  - *Normalização:* Escala 0-100 — usado diretamente.
  - Valor (Nacional): 47.44

- **G630IPD** — iGovSISP: O órgão conhece e utiliza o Programa de Privacidade e Segurança da Informação (PPSI)? (autodiagnóstico SISP, conhece_utiliza).
  - *Normalização:* Escala 0-100 — usado diretamente.
  - Valor (Nacional): 36.75

- **G631IPD** — iGovSISP: O órgão conhece e utiliza os Guias e Modelos do PPSI? (autodiagnóstico SISP, conhece_utiliza).
  - *Normalização:* Escala 0-100 — usado diretamente.
  - Valor (Nacional): 17.52

### 7.3.3 Proteção de dados pessoais — práticas LGPD

*Definição:* Adoção das práticas substantivas exigidas pela LGPD — nomeação de encarregado pelo tratamento de dados pessoais (DPO), canal de atendimento para titulares, política de privacidade publicada, documento de papéis e responsabilidades sobre a lei, plano de resposta a incidentes envolvendo dados pessoais, campanha interna de conscientização, gestão de riscos de privacidade e portal único com funcionalidade de consentimento. Ancorada na Recomendação 4.2 (vertente LGPD).

*Média Nacional:* 36.4 (n=15).

**Indicadores:**

*TIC Governo Eletrônico 2023 (CETIC.br):*

*Bateria — práticas LGPD adotadas pelo órgão público ou pela prefeitura: os 5 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G3_A** — O órgão público ou a prefeitura nomeou encarregado pelo tratamento de dados pessoais ou Data Protection Officer (DPO)? (G3 item A)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 35.23

- **G3_B** — O órgão público ou a prefeitura disponibilizou canal de atendimento pela Internet para mensagens sobre o uso de dados pessoais? (G3 item B)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 46.12

- **G3_C** — O órgão público publicou na Internet sua política de privacidade com as hipóteses ou bases legais para o tratamento de dados pessoais? (G3 item C dos órgãos em 2023)
  - *Normalização:* Proporção 0-100% sobre o universo de órgãos públicos — usado diretamente.
  - Valor (Nacional): 44.45

- **G3_C_PREF** — A prefeitura possui documento formalmente instituído que identifica os papéis e as responsabilidades de áreas ou setores da prefeitura sobre a LGPD? (G3 item C das prefeituras em 2023; identidade distinta da política de privacidade medida nos órgãos)
  - *Normalização:* Proporção 0-100% sobre o universo de prefeituras — usado diretamente.
  - Valor (Nacional): 28.62

- **G3_D** — O órgão público implementou plano de resposta a incidentes de segurança da informação relacionados a dados pessoais? (G3 item D dos órgãos em 2023)
  - *Normalização:* Proporção 0-100% sobre o universo de órgãos públicos — usado diretamente.
  - Valor (Nacional): 31.68

*TIC Saúde 2024 (CETIC.br):*

*Bateria — práticas LGPD adotadas pelo estabelecimento de saúde: os 5 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **A12_A** — O estabelecimento de saúde que utilizou Internet nomeou encarregado de dados pessoais ou Data Protection Officer (DPO)? (A12 item A; C10_A no questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 29.63

- **A12_B** — O estabelecimento de saúde que utilizou Internet disponibilizou canal online para titulares enviarem mensagens sobre o uso de seus dados pessoais? (A12 item B; C10_B no questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 30.57

- **A12_C** — O estabelecimento de saúde que utilizou Internet publicou sua política de privacidade no website do estabelecimento ou da secretaria de saúde? (A12 item C; C10_C no questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 32.49

- **A12_D** — O estabelecimento de saúde que utilizou Internet realizou campanha interna sobre a LGPD com mais de 50% dos funcionários? (A12 item D; C10_E no questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 43.58

- **A12_E** — O estabelecimento de saúde que utilizou Internet possui plano de resposta a incidentes de segurança envolvendo dados pessoais? (A12 item E; C10_F no questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 30.57

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_III07** — A UF possui Portal Único ou de Serviços com funcionalidade de consentimento para LGPD?
  - *Normalização:* Índice 0-10 — multiplicado por 10.
  - Valor (Nacional): 40.74
  - Valor (Estadual): 40.7 (média das 27 UFs)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_LGPD_CANAL_TITULAR** — Canais de atendimento pela Internet para cidadãos enviarem mensagens sobre o uso de seus dados pessoais pelo estado — disponibilização?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 85.19
  - Valor (Estadual): 85.2 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_LGPD_CANAL_TITULAR** — A prefeitura disponibiliza canais de atendimento pela Internet para cidadãos enviarem mensagens sobre o uso de seus dados pessoais?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 28.40
  - Valor (Capitais): 62.96 (17/27 capitais)

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G221SPD** — iGovSISP: O órgão adota ações que protejam a privacidade e os dados pessoais dos cidadãos? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 9.40

- **G223SPD** — iGovSISP: O órgão possui processo de gestão de riscos de privacidade e proteção de dados pessoais? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 28.63

### 7.3.4 Controles, riscos e auditoria

*Definição:* Controles técnicos e práticas de gestão de riscos cibernéticos — ferramentas de segurança da informação, gestão de riscos, inventário de ativos, gestão de vulnerabilidades, testes de segurança cibernética, controle de acesso, classificação da informação e auditorias de segurança. Ancorada na Recomendação 4.2 (vertente cibersegurança).

*Média Nacional:* 51.4 (n=8).

**Indicadores:**

*TIC Saúde 2024 (CETIC.br):*

- **A10** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses utiliza ferramentas de segurança da informação? (C9a questionário)
  - *Normalização:* Proporção 0-100% — agregação `mean` sobre as alternativas A-J (amplitude média de adoção).
  - Valor (Nacional): 53.01

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G203SPD** — iGovSISP: O órgão possui processo de gestão de riscos de Segurança da Informação? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 47.86

- **G209SPD** — iGovSISP: O órgão possui inventário de ativos de informação? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 16.24

- **G210SPD** — iGovSISP: O órgão mapeia e trata as vulnerabilidades nos ativos de TIC? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 77.78

- **G213SPD** — iGovSISP: O órgão realiza testes de segurança cibernética periódicos? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 56.41

- **G214SPD** — iGovSISP: O órgão possui política de controle de acesso documentada e implementada? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 68.80

- **G219SPD** — iGovSISP: O órgão possui processo de classificação da informação? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 74.36

- **G225SPD** — iGovSISP: O órgão realiza auditorias de segurança periódicas nos sistemas de TI? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 17.09

### 7.3.5 Resposta a incidentes e continuidade

*Definição:* Capacidade institucional de prevenção, tratamento e resposta a incidentes cibernéticos e de continuidade operacional — Equipe de Tratamento e Resposta a Incidentes (ETIR), plano de gestão de incidentes cibernéticos e gestão de continuidade de negócios em SI. Ancorada na Recomendação 4.5 e, na continuidade, na Recomendação 4.2.

*Média Nacional:* 51.9 (n=3).

**Indicadores:**

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G202SPD** — iGovSISP: O órgão possui equipe de tratamento e resposta a incidentes cibernéticos — ETIR? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 78.63

- **G206SPD** — iGovSISP: O órgão possui processo de gestão de continuidade de negócios no âmbito da Segurança da Informação? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 24.36

- **G215SPD** — iGovSISP: O órgão possui Plano de Gestão de Incidentes Cibernéticos? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 52.56

### 7.3.6 Capacitação e conscientização

*Definição:* Ações de sensibilização, conscientização e capacitação de servidores em privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética. Ancorada na Recomendação 4.4 (referência ao CEPS Gov.br).

*Média Nacional:* 51.1 (n=5).

**Indicadores:**

*TIC Saúde 2024 (CETIC.br):*

- **A8A** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses oferece treinamento sobre segurança da informação? (C8b questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 47.24

*ESTADIC 2024 (IBGE):*

- **ESTADIC_LGPD_CAPACIT** — Cursos de segurança da informação e proteção de dados para servidores estaduais — disponibilização?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 66.67
  - Valor (Estadual): 66.7 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_LGPD_CAPACIT** — A prefeitura disponibilizou nos últimos 24 meses cursos sobre segurança da informação e proteção de dados para servidores municipais?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Nacional): 18.08
  - Valor (Capitais): 70.37 (19/27 capitais)

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G208SPD** — iGovSISP: O órgão possui programa de conscientização em Segurança da Informação? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 70.51

- **G222SPD** — iGovSISP: O órgão investiu em capacitação de pessoal em Segurança da Informação? (autodiagnóstico SISP, likert).
  - *Normalização:* Likert 0-100 — usado diretamente.
  - Valor (Nacional): 52.99

### 7.3.7 Recorte Estadual

*Definição:* Conjunto das variáveis do Objetivo 4 com observação por UF, agregadas para leitura federativa. Reúne as 4 variáveis do bloco LGPD da ESTADIC 2024 e a variável `IOSPD_III07` do IOSPD 2025. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Estadual:* 68.9 (n=5).

![Recorte Estadual — Objetivo 4](../graficos/recortes/cap07_estadual.png)

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_LGPD_RESP** — Área/pessoa responsável pela implementação da LGPD — existência?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **ESTADIC_LGPD_REGULAMENT** — Regulamentação ou lei estadual específica sobre LGPD que identifica papéis/responsabilidades — existência?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Estadual): 66.7 (média das 27 UFs)

- **ESTADIC_LGPD_CANAL_TITULAR** — Canais de atendimento pela Internet para cidadãos enviarem mensagens sobre o uso de seus dados pessoais pelo estado — disponibilização?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **ESTADIC_LGPD_CAPACIT** — Cursos de segurança da informação e proteção de dados para servidores estaduais — disponibilização?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Estadual): 66.7 (média das 27 UFs)

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_III07** — A UF possui Portal Único ou de Serviços com funcionalidade de consentimento para LGPD?
  - *Normalização:* Índice 0-10 — multiplicado por 10.
  - Valor (Estadual): 40.7 (média das 27 UFs)

### 7.3.8 Recorte de Capitais

*Definição:* Conjunto das variáveis do Objetivo 4 com observação por capital, agregadas para leitura federativa. Reúne as 5 variáveis MUNIC 2024 do bloco LGPD (responsável, regulamentação, canal para titulares, capacitação e disseminação pela área de comunicação). Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Capitais:* 68.9 (n=5).

![Recorte de Capitais — Objetivo 4](../graficos/recortes/cap07_capitais.png)

**Indicadores:**

*MUNIC 2024 (IBGE):*

- **MUNIC_LGPD** — A área de comunicação exerce a função de disseminação da aplicação e orientações para a população de como o município cumpre a LGPD?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 51.85 (14/27 capitais)

- **MUNIC_LGPD_RESP** — A prefeitura possui área ou pessoa responsável pela coleta, armazenamento, uso de dados pessoais e pela implementação das diretrizes da LGPD?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 77.78 (21/27 capitais)

- **MUNIC_LGPD_REGULAMENT** — A prefeitura possui regulamentação ou lei municipal específica sobre a LGPD que identifica papéis e responsabilidades?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 81.48 (22/27 capitais)

- **MUNIC_LGPD_CANAL_TITULAR** — A prefeitura disponibiliza canais de atendimento pela Internet para cidadãos enviarem mensagens sobre o uso de seus dados pessoais?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 62.96 (17/27 capitais)

- **MUNIC_LGPD_CAPACIT** — A prefeitura disponibilizou nos últimos 24 meses cursos sobre segurança da informação e proteção de dados para servidores municipais?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 70.37 (19/27 capitais)
