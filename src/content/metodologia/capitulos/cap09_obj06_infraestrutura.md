# 9. Objetivo 6: Infraestrutura

> Dispor de infraestrutura moderna, segura, escalável e robusta para a implantação e evolução de soluções de governo digital, promovendo soluções estruturantes compartilhadas, uso de padrões comuns e a integração entre os entes federados.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 9.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca cinco recomendações aos entes federados para a oferta de infraestrutura digital adequada:

- **6.1** Adotar e contribuir com o desenvolvimento de soluções de plataformas digitais no provimento de serviços públicos e demais processos da administração pública.
- **6.2** Adotar e contribuir para formação de arranjos colaborativos de disponibilização de infraestrutura e soluções digitais, fomentando inclusive a participação das empresas públicas de tecnologia de informação nesses arranjos.
- **6.3** Prover opções de conectividade pública, para acesso gratuito e facilitado a soluções de prestação de serviço digital pela sociedade, especialmente utilizando estrutura de canais de atendimento presencial e outros prédios e equipamentos públicos.
- **6.4** Estabelecer iniciativas para prover e qualificar o acesso a infraestruturas de rede, especialmente as de grande tráfego, para maior eficiência de trabalho em prédios e equipamentos públicos, considerando inclusive parcerias e programas nacionais voltados para essa finalidade.
- **6.5** Definir uma estratégia adequada para armazenamento de dados, levando em conta a economicidade, segurança, soberania e resiliência, com atenção especial às condições dos data centers em uso.

## 9.2 Cobertura por nível federativo

O Objetivo 6 conta com 25 variáveis ativas, que entram na agregação do índice como 19 componentes — itens de uma mesma bateria contam juntos como um único componente (ver Capítulo 3). As 25 variáveis distribuem-se por oito fontes: oito da MUNIC, seis do iGovSISP, cinco do Censo Escolar/INEP, duas da ESTADIC e uma de cada entre TIC Governo Eletrônico, TIC Educação, PNAD Contínua TIC e ANATEL. Todas contribuem para a visão Nacional. Quatorze variáveis têm observação por capital — uma da ANATEL (`BLM02`), as cinco do Censo Escolar/INEP e as oito da MUNIC — o que justifica a dimensão **`Recorte de Capitais`**. Duas variáveis têm observação por UF (`ESTADIC_WIFI_EXISTE` e `ESTADIC_INCLUSAO_PROGRAMA`, ESTADIC 2024), cumprindo o limiar mínimo de duas variáveis no mesmo nível federativo, o que justifica a dimensão **`Recorte Estadual`**.

## 9.3 Dimensões

As 25 variáveis ativas do Objetivo 6 foram agrupadas em sete dimensões temáticas, ancoradas — quando possível — nas recomendações da Portaria. A primeira cobre a conectividade do ambiente brasileiro (acesso da população à Internet, pré-condição do governo digital, sem ancoragem direta nas recomendações). As três seguintes cobrem aspectos diretamente enunciados pela Portaria: infraestrutura digital nas escolas, conectividade pública em equipamentos públicos, e plataformas digitais e armazenamento de dados. A quinta agrupa indicadores de maturidade operacional da rede de TI nos órgãos federais (autodiagnóstico SISP), aspecto não explicitado nas recomendações mas presente nas fontes. A sexta agrupa programas formais de inclusão digital ao cidadão, complementando o eixo de infraestrutura cidadã com a dimensão programática. A última cobre a infraestrutura urbana inteligente das prefeituras, soluções digitais aplicadas à operação urbana municipal. As dimensões federativas **`Recorte Estadual`** e **`Recorte de Capitais`** consolidam, respectivamente, as duas variáveis com observação por UF e as quatorze variáveis com observação por capital para leitura subnacional.

![Dimensões do Objetivo 6](../graficos/dimensoes/cap09.png)

### 9.3.1 Conectividade do ambiente brasileiro

*Definição:* Acesso da população brasileira à Internet (cobertura móvel e uso domiciliar), aferido por dados administrativos da ANATEL e pela PNAD Contínua TIC do IBGE. Esta dimensão mede o ambiente em que o governo digital opera, e não a ação direta dos entes públicos — não é ancorada em recomendação específica da Portaria, mas é pré-condição para a entrega de serviços digitais à sociedade. A densidade de acessos de banda larga fixa não integra o índice — o indicador está suspenso até haver denominador domiciliar oficial reproduzível.

*Média Nacional:* 93.8 (n=2).

**Indicadores:**

*ANATEL 2025 (ANATEL):*

- **BLM02** — Percentual estimado de domicílios cobertos por telefonia móvel, considerando todas as operadoras e tecnologias (ANATEL).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 93.97

*PNAD Contínua TIC 2024 (IBGE):*

- **V4080** — No seu domicílio, é utilizada a Internet?
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 93.68

### 9.3.2 Infraestrutura digital nas escolas

*Definição:* Recursos digitais nas unidades escolares — acesso à Internet, computadores, laboratório de informática, finalidades de uso (alunos, processo de ensino-aprendizagem) e uso de plataformas digitais de aprendizagem. Combina o universo do Censo Escolar/INEP (~180 mil escolas) com o levantamento amostral TIC Educação. Ancorada na Recomendação 6.4 (qualificar acesso a infraestruturas de rede em prédios e equipamentos públicos).

*Média Nacional:* 62.0 (n=6).

**Indicadores:**

*Censo Escolar/INEP 2024 (INEP):*

*Bateria — infraestrutura de TIC da escola: os 5 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **IN_INTERNET** — A escola possui acesso à Internet?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100.
  - Valor (Nacional): 92.11

- **IN_COMPUTADOR** — A escola possui computador?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100.
  - Valor (Nacional): 86.15

- **IN_LABORATORIO_INFORMATICA** — A escola possui laboratório de informática?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100.
  - Valor (Nacional): 29.55

- **IN_INTERNET_ALUNOS** — A Internet da escola está disponível para uso dos alunos?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100.
  - Valor (Nacional): 41.49

- **IN_INTERNET_APRENDIZAGEM** — A Internet da escola é utilizada no processo de ensino-aprendizagem?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100.
  - Valor (Nacional): 66.78

*TIC Educação 2024 (CETIC.br):*

- **G4** — A escola utiliza plataformas de aprendizagem? (A=Teams, B=Zoom, C=Moodle, D=Classroom, E=Meet, G=AVAMEC, H=outros)
  - *Normalização:* Proporção 0-100% por plataforma; agregação `max` ("usa ao menos uma plataforma EAD"; sub-item F = Google em geral, excluído por redundância com D+E).
  - Valor (Nacional): 55.71

### 9.3.3 Conectividade pública e em equipamentos públicos

*Definição:* Oferta de acesso à Internet pelos órgãos da administração e por equipamentos públicos — centros públicos de acesso gratuito, Wi-Fi gratuito ao público e conectividade de prefeituras e governos estaduais. Ancorada nas Recomendações 6.3 (conectividade pública gratuita) e 6.4 (rede em prédios públicos). O Wi-Fi gratuito ao público em instituições culturais não integra o índice porque a fonte não publica o total nacional do indicador.

*Média Nacional:* 64.0 (n=4).

**Indicadores:**

*MUNIC 2024 (IBGE):*

- **MUNIC_INTERNET** — A prefeitura possui acesso à Internet? (Mtic04; medida censitária com evidência afirmativa: 5.541 de 5.570 municípios = 99,48% em 2024, com 1 ausência substantiva e 28 não respostas publicadas separadamente)
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% de municípios com evidência afirmativa de conexão sobre o universo de prefeituras.
  - Valor (Nacional): 99.48
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_WIFI_PUBLICO** — A prefeitura disponibiliza acesso público à Internet (Wi-Fi)?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 48.08
  - Valor (Capitais): 85.19 (23/27 capitais)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_WIFI_EXISTE** — Disponibiliza acesso por conexão Wi-Fi?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre as 27 UFs.
  - Valor (Nacional): 62.96
  - Valor (Estadual): 63.0 (média das 27 UFs; distribuição binária — 17 UFs em 100.0 e 10 em 0.0).

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **C7_A** — A prefeitura com acesso à Internet oferece centros públicos de acesso gratuito, como telecentros? (C7 item A)
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 45.39

### 9.3.4 Plataformas digitais e armazenamento de dados

*Definição:* Estratégia de armazenamento de dados e adoção de plataformas de computação em nuvem — Centros de Processamento de Dados (CPD) próprios e serviços de nuvem, incluindo a nuvem governamental e a aderência à Portaria SGD/MGI nº 5.950/2023, que disciplina o uso de nuvem na Administração Pública Federal. Ancorada nas Recomendações 6.1 (plataformas digitais para provimento de serviços) e 6.5 (estratégia de armazenamento, com atenção a data centers). O uso de computação em nuvem medido pela TIC Governo Eletrônico não integra o índice por medir percentual condicionado a um universo restrito (apenas as prefeituras com área de tecnologia da informação).

*Média Nacional:* 61.4 (n=3).

**Indicadores:**

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G625IPD** — iGovSISP: Maturidade na adoção de computação em nuvem (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 43.59

- **G637IPD** — iGovSISP: Portaria SGD/MGI nº 5.950/2023 (contratação de software/serviços de nuvem) (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 90.17

*MUNIC 2024 (IBGE):*

- **MUNIC_CPD** — A prefeitura possui Centro de Processamento de Dados (CPD)?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 50.38
  - Valor (Capitais): 92.59 (25/27 capitais)

### 9.3.5 Gestão e qualificação da rede de TI federal

*Definição:* Maturidade operacional da rede de TI nos órgãos federais SISP — documentação de ativos, monitoramento, manutenção preventiva e adoção do protocolo IPv6. Reflete a "qualificação do acesso" enunciada na Recomendação 6.4, do ponto de vista interno dos órgãos. Aspecto medido apenas para os órgãos do SISP via autodiagnóstico (sem cobertura subnacional).

*Média Nacional:* 88.7 (n=4).

**Indicadores:**

*iGovSISP/SGD 2025 (SGD/MGI):*

*Bateria — gestão da rede de TIC: os 3 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **G607IPD** — iGovSISP: Nível de documentação dos ativos de rede (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 98.29

- **G608IPD** — iGovSISP: Monitoramento da disponibilidade e desempenho dos ativos de rede (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 98.72

- **G609IPD** — iGovSISP: Gerenciamento de manutenção preventiva dos ativos de rede (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 94.87

- **G634IPD** — iGovSISP: Estágio de maturidade na adoção do IPv6 (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 62.82

### 9.3.6 Programas de inclusão digital ao cidadão

*Definição:* Iniciativas formais de prefeituras e governos estaduais para inclusão digital da população — existência de programa ou ação estruturada de inclusão digital. Complementa o eixo "infraestrutura cidadã digital" (9.3.3) com a face programática: existência de iniciativa formal, não apenas provisão física de pontos de acesso. Sem ancoragem direta em recomendação numerada da Portaria; converge com o espírito da Recomendação 6.3 ao ampliar o alcance social do governo digital.

*Média Nacional:* 75.9 (n=2).

**Indicadores:**

*MUNIC 2024 (IBGE):*

- **MUNIC_INCLUSAO_DIGITAL** — A prefeitura possui programa ou ação de inclusão digital?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 55.57
  - Valor (Capitais): 92.59 (25/27 capitais)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_INCLUSAO_PROGRAMA** — Desenvolve programa ou ação de inclusão digital?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre as 27 UFs.
  - Valor (Nacional): 96.30
  - Valor (Estadual): 96.3 (média das 27 UFs; 26 UFs em 100.0 e 1 em 0.0).

### 9.3.7 Infraestrutura urbana inteligente

*Definição:* Equipamentos e sistemas instalados pelas prefeituras municipais que automatizam a operação urbana — centro de controle operacional, iluminação inteligente com medição de consumo, semáforos remotos e sensores de monitoramento de áreas de risco. Coletadas pelo IBGE em todas as prefeituras (cobertura censitária). Ancorada na Recomendação 6.1 (soluções digitais no provimento de serviços públicos e demais processos da administração). O monitoramento setorial por sistemas eletrônicos aferido pela TIC Governo Eletrônico não integra o índice por medir percentuais condicionados a um universo restrito (apenas as prefeituras que possuem centro de operações), e o agregado de tecnologias para gestão urbana da mesma fonte foi descontinuado por duplicar os indicadores municipais desta dimensão.

*Média Nacional:* 10.6 (n=4).

**Indicadores:**

*MUNIC 2024 (IBGE):*

- **MUNIC_SMART_CENTRO_CONTROLE** — A prefeitura possui centro de controle operacional?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 22.98
  - Valor (Capitais): 96.30 (26/27 capitais)
- **MUNIC_SMART_ILUMINACAO** — A prefeitura possui sistema de iluminação inteligente com medição de consumo?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 7.04
  - Valor (Capitais): 44.44 (12/27 capitais)
- **MUNIC_SMART_SEMAFOROS** — A prefeitura possui semáforos inteligentes controlados a distância?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 5.03
  - Valor (Capitais): 77.78 (21/27 capitais)
- **MUNIC_SMART_SENSORES** — A prefeitura utiliza sensores para monitoramento de áreas de risco?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 7.36
  - Valor (Capitais): 51.85 (14/27 capitais)

### 9.3.8 Recorte Estadual

*Definição:* Conjunto das variáveis do Objetivo 6 com observação por UF, agregadas para leitura federativa do desempenho subnacional em infraestrutura digital. Reúne `ESTADIC_WIFI_EXISTE` e `ESTADIC_INCLUSAO_PROGRAMA`. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Estadual:* 79.6 (n=2; média das 27 UFs por variável, depois agregada entre variáveis).

![Recorte Estadual — Objetivo 6](../graficos/recortes/cap09_estadual.png)

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_WIFI_EXISTE** — Disponibiliza acesso por conexão Wi-Fi?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Estadual é a proporção 0-100% sobre as 27 UFs.
  - Valor (Estadual): 63.0 (17 UFs em 100.0 e 10 em 0.0).

- **ESTADIC_INCLUSAO_PROGRAMA** — Desenvolve programa ou ação de inclusão digital?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Estadual é a proporção 0-100% sobre as 27 UFs.
  - Valor (Estadual): 96.3 (26 UFs em 100.0 e 1 em 0.0).

### 9.3.9 Recorte de Capitais

*Definição:* Conjunto das variáveis do Objetivo 6 com observação por capital, agregadas para leitura federativa municipal do desempenho em infraestrutura digital. Reúne 1 variável ANATEL 2025, 5 variáveis Censo Escolar/INEP 2024 e 8 variáveis MUNIC 2024. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Capitais:* 77.2 (n=14; média das 27 capitais por variável, depois agregada entre variáveis).

![Recorte de Capitais — Objetivo 6](../graficos/recortes/cap09_capitais.png)

**Indicadores:**

*ANATEL 2025 (ANATEL):*

- **BLM02** — Percentual estimado de domicílios cobertos por telefonia móvel, considerando todas as operadoras e tecnologias (ANATEL; agregação no município de cada capital).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Capitais): 98.99

*Censo Escolar/INEP 2024 (INEP):*

- **IN_INTERNET** — A escola possui acesso à Internet?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100, agregado por capital.
  - Valor (Capitais): 97.33

- **IN_COMPUTADOR** — A escola possui computador?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100, agregado por capital.
  - Valor (Capitais): 95.47

- **IN_LABORATORIO_INFORMATICA** — A escola possui laboratório de informática?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100, agregado por capital.
  - Valor (Capitais): 36.63

- **IN_INTERNET_ALUNOS** — A Internet da escola está disponível para uso dos alunos?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100, agregado por capital.
  - Valor (Capitais): 45.04

- **IN_INTERNET_APRENDIZAGEM** — A Internet da escola é utilizada no processo de ensino-aprendizagem?
  - *Normalização:* Binário por escola — (soma_positivos/total)×100, agregado por capital.
  - Valor (Capitais): 66.22

*MUNIC 2024 (IBGE):*

- **MUNIC_INTERNET** — A prefeitura possui acesso à Internet? (Mtic04; medida censitária com evidência afirmativa: 5.541 de 5.570 municípios = 99,48% em 2024, com 1 ausência substantiva e 28 não respostas publicadas separadamente)
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_WIFI_PUBLICO** — A prefeitura disponibiliza acesso público à Internet (Wi-Fi)?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 85.19 (23/27 capitais)

- **MUNIC_CPD** — A prefeitura possui Centro de Processamento de Dados (CPD)?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_INCLUSAO_DIGITAL** — A prefeitura possui programa ou ação de inclusão digital?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SMART_CENTRO_CONTROLE** — A prefeitura possui centro de controle operacional?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 96.30 (26/27 capitais)
- **MUNIC_SMART_ILUMINACAO** — A prefeitura possui sistema de iluminação inteligente com medição de consumo?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 44.44 (12/27 capitais)
- **MUNIC_SMART_SEMAFOROS** — A prefeitura possui semáforos inteligentes controlados a distância?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 77.78 (21/27 capitais)
- **MUNIC_SMART_SENSORES** — A prefeitura utiliza sensores para monitoramento de áreas de risco?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0.
  - Valor (Capitais): 51.85 (14/27 capitais)
