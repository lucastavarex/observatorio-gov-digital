# 10. Objetivo 7: Inovação e Tecnologias Emergentes

> Estimular e fomentar o desenvolvimento do ecossistema de inovação e de governo digital, envolvendo todos os entes federados e a sociedade, gerando novas oportunidades para o aprimoramento do setor público e desenvolvimento de negócios, inclusive para o desenvolvimento e o uso de tecnologias emergentes.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 10.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca seis recomendações aos entes federados para fomentar o ecossistema de inovação e o uso de tecnologias emergentes:

- **7.1** Contribuir com a criação, participação e subsídio às atividades de redes nacionais, estaduais, regionais e associativas de políticas públicas de inovação em governo no país, em especial da Rede InovaGOV e da Rede GOV.BR.
- **7.2** Desenvolver mecanismos que permitam parcerias com o setor privado e com demais organizações não governamentais para transformação digital, especialmente com startups voltadas para soluções de valor público (Govtechs).
- **7.3** Implementar e utilizar abordagens de laboratórios de inovação como espaço aberto à participação e à colaboração da sociedade para o desenvolvimento de ideias, de ferramentas e de métodos inovadores para a gestão pública e prestação de serviços públicos.
- **7.4** Mapear e desenvolver casos de uso de tecnologia baseadas em inteligência artificial e outras tecnologias emergentes, atentando para capacitação dos agentes envolvidos e para designação de cuidados éticos no uso.
- **7.5** Utilizar compras públicas como mecanismo fomentador de inovação, especialmente por meio dos mecanismos de compras públicas de inovação e inovação aberta.
- **7.6** Utilizar infraestrutura tecnológica que facilite o uso de dados de acesso público e promova a interação entre diversos agentes, de forma segura, eficiente e responsável, para estímulo à inovação, à exploração de atividade econômica e à prestação de serviços à população.

## 10.2 Cobertura por nível federativo

O Objetivo 7 conta com **9 variáveis ativas** no índice, que entram na agregação do índice como 9 componentes (ver Capítulo 3), distribuídos por cinco fontes: duas variáveis da TIC Governo Eletrônico 2023 (CETIC.br), uma da TIC Saúde 2024 (CETIC.br), duas do IOSPD/ABEP-TIC 2025, três da ESTADIC 2024 (IBGE) e uma do iGovSISP/SGD 2025. Todas contribuem para a visão Nacional. **Cinco** têm observação por UF (`IOSPD_III06`, `IOSPD_V02`, `ESTADIC_ESPACO_INOVACAO`, `ESTADIC_CAPACIT_EMPREEND` e `ESTADIC_PREMIO_INOVACAO`) e dão origem à dimensão `Recorte Estadual`, que atende ao limiar de duas variáveis para criação. Nenhuma variável do objetivo tem observação por capital, de modo que não se cria a dimensão `Recorte de Capitais`.

## 10.3 Dimensões

As 9 variáveis dimensionadas são organizadas em duas dimensões temáticas — ancoradas nas Recomendações 7.4 (inteligência artificial e outras tecnologias emergentes) e 7.3/7.5 (laboratórios de inovação e mecanismos de fomento) da Portaria —, acrescidas de uma dimensão federativa (`Recorte Estadual`) que reagrupa as variáveis com observação por UF.

![Dimensões do Objetivo 7](../graficos/dimensoes/cap10.png)

### 10.3.1 Inteligência artificial e tecnologias emergentes

*Definição:* Adoção de inteligência artificial, ciência de dados, dispositivos de Internet das Coisas (IoT) e demais tecnologias emergentes (Blockchain, IA, Robótica) em órgãos públicos e estabelecimentos de saúde, e existência de estratégia institucional de IA. Ancorada na Recomendação 7.4.

*Média Nacional:* 35.7 (n=5).

**Indicadores:**

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **H3** — O órgão utilizou tecnologias de inteligência artificial?
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 30.08

- **H4** — O órgão utilizou dispositivos de Internet das Coisas (IoT)?
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 26.95

*TIC Saúde 2024 (CETIC.br):*

- **D5** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses utiliza tecnologias emergentes (Blockchain, IA, Robótica, IoT)? (D5A portal 2024) — agregação por máximo entre os 4 sub-itens, equivale a "ao menos uma tecnologia emergente".
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 3.71

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_V02** — A UF utiliza ciência de dados, inteligência artificial ou algoritmo em algum serviço público disponível ao cidadão?
  - *Normalização:* Índice 0-10 — multiplicado por 10.
  - Valor (Nacional): 66.67
  - Valor (Estadual): 66.7 (média das 27 UFs)

*iGovSISP/SGD 2025 (SGD/MGI):*

- **G337DI** — iGovSISP: Estratégia de IA (autodiagnóstico SISP, ordinal_maturidade).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 51.28

### 10.3.2 Laboratórios e fomento à inovação

*Definição:* Existência de laboratórios de inovação em governo e ações estaduais de fomento à inovação e ao empreendedorismo digital — espaços de inovação e coworking, capacitação para empreendedorismo digital e prêmios ou editais destinados a empresas inovadoras e projetos criativos. Ancorada nas Recomendações 7.3 (laboratórios de inovação como espaço de colaboração) e 7.5 (mecanismos fomentadores de inovação).

*Média Nacional:* 78.7 (n=4).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_III06** — Possui Laboratório de Inovação em Governo? (Lei Federal 14.129/2021, Art. 44º e 45º)
  - *Normalização:* Índice 0-10 — multiplicado por 10.
  - Valor (Nacional): 70.37
  - Valor (Estadual): 70.4 (média das 27 UFs)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_ESPACO_INOVACAO** — O governo estadual mantém espaços de inovação, coworking ou espaços compartilhados de trabalho para micro e pequenas empresas em funcionamento?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre as 27 UFs.
  - Valor (Nacional): 77.78
  - Valor (Estadual): 77.8 (média das 27 UFs)

- **ESTADIC_CAPACIT_EMPREEND** — O governo estadual forneceu capacitação para empreendedorismo digital nos últimos 12 meses?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre as 27 UFs.
  - Valor (Nacional): 88.89
  - Valor (Estadual): 88.9 (média das 27 UFs)

- **ESTADIC_PREMIO_INOVACAO** — O governo estadual instituiu, sozinho ou em parceria, prêmio ou edital para destinar recursos a empresas inovadoras ou projetos criativos nos últimos 12 meses?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre as 27 UFs.
  - Valor (Nacional): 77.78
  - Valor (Estadual): 77.8 (média das 27 UFs)

### 10.3.3 Recorte Estadual

*Definição:* Conjunto das variáveis do Objetivo 7 com observação por UF, agregadas para leitura federativa estadual do desempenho no ecossistema de inovação. Reúne as duas variáveis IOSPD e as três variáveis ESTADIC do objetivo. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Estadual:* 76.3 (n=5).

![Recorte Estadual — Objetivo 7](../graficos/recortes/cap10_estadual.png)

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_III06** — Possui Laboratório de Inovação em Governo? (Lei Federal 14.129/2021, Art. 44º e 45º)
  - Valor (Estadual): 70.4 (média das 27 UFs)
- **IOSPD_V02** — A UF utiliza ciência de dados, inteligência artificial ou algoritmo em algum serviço público disponível ao cidadão?
  - Valor (Estadual): 66.7 (média das 27 UFs)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_ESPACO_INOVACAO** — O governo estadual mantém espaços de inovação, coworking ou espaços compartilhados de trabalho para micro e pequenas empresas em funcionamento?
  - Valor (Estadual): 77.8 (média das 27 UFs)
- **ESTADIC_CAPACIT_EMPREEND** — O governo estadual forneceu capacitação para empreendedorismo digital nos últimos 12 meses?
  - Valor (Estadual): 88.9 (média das 27 UFs)
- **ESTADIC_PREMIO_INOVACAO** — O governo estadual instituiu, sozinho ou em parceria, prêmio ou edital para destinar recursos a empresas inovadoras ou projetos criativos nos últimos 12 meses?
  - Valor (Estadual): 77.8 (média das 27 UFs)
