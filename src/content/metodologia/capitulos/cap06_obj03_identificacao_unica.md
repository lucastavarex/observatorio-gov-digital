# 6. Objetivo 3: Identificação Única

> Implementar e manter solução estruturante de identificação única e nacional, com ampla disponibilidade e validade para todos os entes federados.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 6.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca sete recomendações aos entes federados para implementar e manter solução estruturante de identificação única e nacional:

- **3.1** Integrar os serviços públicos digitais ao mecanismo de autenticação digital da Plataforma GOV.BR.
- **3.2** Integrar os serviços públicos para dar a opção de uso das ferramentas de assinatura eletrônica, inclusive o mecanismo da Plataforma GOV.BR.
- **3.3** Integrar todos os órgãos estaduais de emissão de identidade civil ao Serviço de Identificação do Cidadão.
- **3.4** Participar, sob coordenação da União, das definições e desenvolvimento de ferramentas cooperativas para implementação do Serviço de Identificação Civil em canais físicos e digitais, incluindo a integração com a solução de autenticação digital da Plataforma GOV.BR.
- **3.5** Prover aos cidadãos repositórios digitais de seus documentos e informações, para dispor proativamente de atestados, certidões, documentos comprobatórios de regularidade, dentre outros, preferencialmente integrado à Plataforma GOV.BR.
- **3.6** Regulamentar uso de assinaturas eletrônicas nas suas interações internas e com a sociedade.
- **3.7** Utilizar o número de inscrição no Cadastro de Pessoas Físicas - CPF como número suficiente para identificação do cidadão, fazendo constar nos cadastros e documentos de órgãos públicos.

## 6.2 Cobertura por nível federativo

O Objetivo 3 conta com 4 variáveis ativas no índice, correspondendo a 4 componentes, distribuídos por três fontes: uma variável da TIC Governo Eletrônico 2023 (CETIC.br), duas do IOSPD/ABEP-TIC 2025 e uma da MUNIC 2024 (IBGE). Todas contribuem para a visão Nacional. Duas variáveis têm observação por UF (`IOSPD_I09` e `IOSPD_V07`, ambas IOSPD/ABEP-TIC 2025) e uma tem observação por capital (`MUNIC_AUTENTICACAO`, MUNIC 2024). O limiar mínimo de duas variáveis com observação no mesmo nível federativo justifica a criação da dimensão **`Recorte Estadual`**, que reúne os dois indicadores IOSPD para leitura por UF. Como há apenas uma variável com observação por capital, **não se cria** a dimensão `Recorte de Capitais`; o indicador correspondente aparece dentro da dimensão temática em que foi classificado, com a observação federativa explicitada inline.

## 6.3 Dimensões

As 4 variáveis ativas do Objetivo 3 foram agrupadas em três dimensões temáticas, cada uma ancorada diretamente em uma ou mais das sete recomendações da Portaria — autenticação digital, assinatura eletrônica e identidade civil. A configuração com uma dimensão singleton (`Identidade civil`) reflete o estado atual do índice. A dimensão federativa **`Recorte Estadual`** consolida os dois indicadores IOSPD com observação por UF.

![Dimensões do Objetivo 3](../graficos/dimensoes/cap06.png)

### 6.3.1 Autenticação digital

*Definição:* Mecanismos de identificação e acesso do cidadão a serviços públicos digitais por sistema de autenticação único, com referência à Plataforma GOV.BR. Ancorada na Recomendação 3.1.

*Média Nacional:* 25.7 (n=2).

O indicador `C9B_A` mede diretamente a adesão dos entes subnacionais ao login único Gov.br — o mecanismo de autenticação preconizado pela Recomendação 3.1 —, e não a mera exigência de qualquer cadastro ou login. O valor Nacional de 13,39 indica que a adoção do Gov.br pelos órgãos públicos estaduais e pelas prefeituras ainda é baixa, o que puxa a média da dimensão para baixo mesmo com quase quatro em cada dez prefeituras oferecendo alguma forma de autenticação em serviços pela internet (`MUNIC_AUTENTICACAO`).

**Indicadores:**

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **C9B_A** — O órgão público ou a prefeitura utiliza o login único Gov.br, do Governo Federal, como forma de cadastro ou login para o cidadão acessar serviços online? (C9B item A nas duas populações, edição 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 13.39

*MUNIC 2024 (IBGE):*

- **MUNIC_AUTENTICACAO** — A prefeitura possui autenticação para acesso a serviços pela internet?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 38.10
  - Valor (Capitais): 88.9 (24/27 capitais)

### 6.3.2 Assinatura eletrônica

*Definição:* Disponibilidade de solução institucional de assinatura eletrônica, em substituição à assinatura manuscrita nos atos administrativos e na interação com o cidadão. Ancorada na Recomendação 3.2.

*Média Nacional:* 63.0 (n=1).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I09** — Utiliza solução de assinatura eletrônica corporativa própria ou do Gov.br?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 62.96
  - Valor (Estadual): 63.0 (média das 27 UFs)

### 6.3.3 Identidade civil

*Definição:* Capacidade do ente federado de emitir a Carteira de Identidade Nacional (CIN) — documento físico-digital de identidade civil unificado em torno do CPF, integrável ao Serviço de Identificação do Cidadão. Ancorada nas Recomendações 3.3 e 3.4.

*Média Nacional:* 81.5 (n=1).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_V07** — A UF disponibiliza a emissão da nova CIN - Carteira de Identidade Nacional?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 81.48
  - Valor (Estadual): 81.5 (média das 27 UFs)

### 6.3.4 Recorte Estadual

*Definição:* Conjunto das variáveis do Objetivo 3 com observação por UF, agregadas para leitura federativa do desempenho na implementação de soluções estruturantes de identificação. Reúne `IOSPD_I09` e `IOSPD_V07`. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Estadual:* 72.2 (n=2).

![Recorte Estadual — Objetivo 3](../graficos/recortes/cap06_estadual.png)

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I09** — Utiliza solução de assinatura eletrônica corporativa própria ou do Gov.br?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Estadual): 63.0 (média das 27 UFs)

- **IOSPD_V07** — A UF disponibiliza a emissão da nova CIN - Carteira de Identidade Nacional?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Estadual): 81.5 (média das 27 UFs)
