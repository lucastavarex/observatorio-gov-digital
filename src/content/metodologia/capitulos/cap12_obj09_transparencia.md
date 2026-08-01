# 12. Objetivo 9: Transparência e Participação

> Contribuir para a ampliação da abertura e da transparência das organizações públicas, para legitimar o controle e a participação social.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 12.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca três recomendações aos entes federados para ampliar a abertura, a transparência e a participação social no governo digital:

- **9.1** Implementar instrumentos de participação social e cocriação.
- **9.2** Instituir canais, espaços e ações para promover a transparência do governo digital.
- **9.3** Promover a transparência, o acesso à informação e o uso de dados abertos pelos cidadãos.

## 12.2 Cobertura por nível federativo

O Objetivo 9 conta com 20 variáveis ativas no índice, correspondendo a 20 componentes, distribuídos por quatro fontes: 9 variáveis da MUNIC 2024 (IBGE), 8 do ESTADIC 2024 (IBGE), 2 da TIC Governo Eletrônico 2023 (CETIC.br) e 1 do IOSPD/ABEP-TIC 2025. Todas contribuem para a visão Nacional. Nove variáveis têm observação por UF (oito do ESTADIC e uma do IOSPD/ABEP-TIC) e nove têm observação por capital (todas MUNIC 2024). Como os dois níveis subnacionais ultrapassam o limiar mínimo de duas variáveis, criam-se as duas dimensões federativas dedicadas: `Recorte Estadual` (9 vars) e `Recorte de Capitais` (9 vars).

Os indicadores de transparência de acervos da TIC Cultura (CETIC.br) não integram o índice: a planilha oficial da edição 2024 não publica total nacional para esses indicadores — apenas resultados por tipo de equipamento cultural —, e possuir acervo é condição institucional do equipamento, não capacidade digital do ente federativo. A fonte permanece fora do índice até publicar total nacional oficial, pesos amostrais ou microdados.

A Escala Brasil Transparente (CGU, edição 2020) — fonte clássica de transparência subnacional brasileira — está documentada em Anexo A (Variáveis Excluídas) por defasagem de cerca de seis anos em relação às demais fontes utilizadas no índice.

## 12.3 Dimensões

As 20 variáveis ativas do Objetivo 9 foram agrupadas em três dimensões temáticas, que seguem diretamente as recomendações da Portaria — transparência ativa e dados abertos, acesso à informação (LAI) e participação social. Em seguida, duas dimensões federativas (`Recorte Estadual` e `Recorte de Capitais`) agregam as variáveis com observação por UF e por capital, respectivamente — única exceção à regra de não-repetição entre dimensões.

![Dimensões do Objetivo 9](../graficos/dimensoes/cap12.png)

### 12.3.1 Transparência ativa e dados abertos

*Definição:* Existência e abrangência de canais públicos de divulgação proativa de informações governamentais — portais da transparência, portais de dados abertos, controle interno publicado, divulgação de informações orçamentárias e financeiras. Ancorada nas Recomendações 9.2 e 9.3.

*Média Nacional:* 74.1 (n=7).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I11** — O Quadro Geral ou as Cartas de Serviços Estaduais/Distrital estão integrados à Base Nacional de Serviços Públicos?
  - *Normalização:* Índice 0-10 — multiplicado por 10.
  - Valor (Nacional): 51.85
  - Valor (Estadual): 51.85

*MUNIC 2024 (IBGE):*

- **MUNIC_PORTAL_TRANSP** — A prefeitura possui portal da transparência?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 99.68
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_SERV_INFO_FINANCAS** — A página da prefeitura disponibiliza informações sobre finanças públicas?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 85.35
  - Valor (Capitais): 100.00 (27/27 capitais)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_PORTAL_TRANSP** — Portal da transparência e portal de dados abertos — existência (governo estadual).
  - *Normalização:* Proporção 0-100% — usado diretamente.
  - Valor (Nacional): 56.79
  - Valor (Estadual): 56.79

- **ESTADIC_TRANSP_CONTEUDO** — Conteúdo da página na internet ou portal da transparência do governo estadual:
  - A) Competências
  - B) Estrutura organizacional
  - C) Endereços/telefones
  - D) Horários de atendimento
  - E) Pessoal por vínculo
  - F) Programas/ações/projetos
  - G) Licitações/contratos
  - H) FAQ
  - I) Transferências financeiras
  - J) Nenhuma
  - K) Não possui portal
  - Valor (Nacional): 70.37
  - Valor (Estadual): 70.37

- **ESTADIC_ORCAM_TEMPO_REAL** — Disponibiliza informações orçamentárias/financeiras em tempo real?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de governos estaduais.
  - Valor (Nacional): 88.89
  - Valor (Estadual): 88.89

- **ESTADIC_CTRL_INT_ONLINE** — Informações do controle interno publicadas na internet:
  - A) Estrutura administrativa
  - B) Informações institucionais
  - C) Estatísticas de processos disciplinares
  - D) Denúncias anônimas/sigilosas
  - E) Acompanhamento de denúncia
  - F) Indicadores de desempenho do governo
  - G) Produtos gerados
  - H) Legislação
  - Valor (Nacional): 65.74
  - Valor (Estadual): 65.74

### 12.3.2 Acesso à informação (LAI)

*Definição:* Implementação local da Lei de Acesso à Informação (Lei nº 12.527/2011) — existência de legislação específica, conteúdo e meios de solicitação da regulamentação estadual, disseminação da LAI, recebimento e publicização de pedidos. Ancorada na Recomendação 9.3.

*Média Nacional:* 49.4 (n=6).

**Indicadores:**

*MUNIC 2024 (IBGE):*

- **MUNIC_LAI** — A área de comunicação exerce a função de disseminação da aplicação da LAI e orientações de como o município pode atender a população?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 18.08
  - Valor (Capitais): 55.56 (15/27 capitais)

- **MUNIC_LAI_LEI** — Existe legislação municipal específica que estabeleça procedimentos e providências para garantir o direito de acesso à informação pública em conformidade com a LAI?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 57.95
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_LAI_SOLICITACOES** — A prefeitura recebeu em 2023 solicitações de acesso à informação com base na LAI?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 55.83
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_LAI_PUBLICA_PR** — A prefeitura publica para acesso público perguntas e respostas feitas através da LAI? (Perguntas e respostas=100; Somente respostas=50; Não publica=0)
  - *Normalização:* Categórica 0/50/100 — "Perguntas e respostas"=100, "Somente respostas"=50, "Não publica"=0; valor Nacional é a média dessa codificação sobre o universo de prefeituras (5570). Pergunta condicional: prefeituras sem solicitações em 2023 (e demais respostas em branco) entram como 0 via fallback (Capítulo 3, Seção 3.3.2).
  - Valor (Nacional): 24.51
  - Valor (Capitais): 50.00 (média sobre as 27 capitais; Belém/PA, única capital sem solicitações em 2023, contribui com 0 via fallback)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_LAI_CONTEUDO** — Conteúdo da legislação estadual de acesso à informação (LAI):
  - A) Prazo de 20 dias para resposta
  - B) Classificação de informação sigilosa
  - C) Autoridade de monitoramento
  - D) Órgão central de monitoramento
  - E) Relatório estatístico de pedidos
  - F) Instância recursal interna
  - G) Instância recursal autônoma
  - H) Procedimento em caso de omissão
  - Valor (Nacional): 85.19
  - Valor (Estadual): 85.19

- **ESTADIC_LAI_MEIOS** — Meios de solicitação de acesso à informação pública:
  - A) SIC presencial
  - B) Internet
  - C) Telefone
  - D) Carta
  - E) Outro
  - F) Não disponibiliza
  - Valor (Nacional): 54.94
  - Valor (Estadual): 54.94

### 12.3.3 Participação social e cocriação

*Definição:* Instrumentos de envolvimento do cidadão no governo digital — ouvidorias e canais de denúncia, mecanismos participativos online (consulta, fórum, enquete, votação), uso de redes sociais para consulta pública, e instâncias colegiadas de transparência. Ancorada na Recomendação 9.1.

*Média Nacional:* 40.2 (n=7).

**Indicadores:**

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **E2A** — O órgão público ou a prefeitura com website disponibilizou ouvidoria online nos últimos 12 meses?
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 81.15

- **E4A** — O órgão público ou a prefeitura com acesso à Internet utiliza mecanismos de participação social pela Internet? (E4A itens A-D: consulta pública online, fóruns ou comunidades de discussão, enquete online e votação online)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 34.52

*MUNIC 2024 (IBGE):*

- **MUNIC_PARTICIPACAO** — A prefeitura disponibilizou formas de participação do cidadão pela internet?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 39.43
  - Valor (Capitais): 81.48 (22/27 capitais)

- **MUNIC_ATIV_REDES_CONSULTA** — A prefeitura utiliza redes sociais para consulta pública ou enquete?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 26.36
  - Valor (Capitais): 48.15 (13/27 capitais)

- **MUNIC_CONSELHO_TRANSP** — A prefeitura possui Conselho Municipal de Transparência ou similar?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 2.08
  - Valor (Capitais): 37.04 (10/27 capitais)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_PARTICIP_INTERNET** — Formas de participação do cidadão pela internet (apenas perguntas-pai; perguntas de canal excluídas por salto condicional, ver Seção 3.3.5 do Capítulo 3):
  - A) Consulta pública online (contribuições para leis, orçamentos, planos)
  - B) Fóruns/comunidades
  - C) Enquete online
  - D) Votação online (políticas públicas/orçamento participativo)
  - E) Não disponibilizou
  - Valor (Nacional): 45.93
  - Valor (Estadual): 45.93

- **ESTADIC_CONSELHO_TRANSP** — Conselho Estadual de Transparência ou similar — existência (Sim/Não)?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de governos estaduais.
  - Valor (Nacional): 51.85
  - Valor (Estadual): 51.85

### 12.3.4 Recorte Estadual

*Definição:* Conjunto das variáveis do Objetivo 9 com observação por UF, agregadas para leitura federativa estadual. Reúne 1 variável IOSPD 2025 e 8 variáveis ESTADIC 2024. Inclui variáveis também classificadas em outras dimensões temáticas (única exceção à regra de não-repetição entre dimensões).

*Média Estadual:* 63.5 (n=9).

![Recorte Estadual — Objetivo 9](../graficos/recortes/cap12_estadual.png)

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I11** — O Quadro Geral ou as Cartas de Serviços Estaduais/Distrital estão integrados à Base Nacional de Serviços Públicos?
  - Valor (Estadual): 51.85

*ESTADIC 2024 (IBGE):*

- **ESTADIC_PORTAL_TRANSP** — Portal da transparência e portal de dados abertos — existência (governo estadual).
  - Valor (Estadual): 56.79

- **ESTADIC_TRANSP_CONTEUDO** — Conteúdo da página na internet ou portal da transparência do governo estadual?
  - Valor (Estadual): 70.37

- **ESTADIC_ORCAM_TEMPO_REAL** — Disponibiliza informações orçamentárias/financeiras em tempo real?
  - Valor (Estadual): 88.89

- **ESTADIC_CTRL_INT_ONLINE** — Informações do controle interno publicadas na internet?
  - Valor (Estadual): 65.74

- **ESTADIC_LAI_CONTEUDO** — Conteúdo da legislação estadual de acesso à informação (LAI)?
  - Valor (Estadual): 85.19

- **ESTADIC_LAI_MEIOS** — Meios de solicitação de acesso à informação pública?
  - Valor (Estadual): 54.94

- **ESTADIC_PARTICIP_INTERNET** — Formas de participação do cidadão pela internet?
  - Valor (Estadual): 45.93

- **ESTADIC_CONSELHO_TRANSP** — Conselho Estadual de Transparência ou similar — existência (Sim/Não).
  - Valor (Estadual): 51.85

### 12.3.5 Recorte de Capitais

*Definição:* Conjunto das variáveis do Objetivo 9 com observação por capital, agregadas para leitura federativa municipal. Reúne 9 variáveis MUNIC 2024 (2 do bloco transparência ativa, 4 do bloco LAI e 3 do bloco participação). Inclui variáveis também classificadas em outras dimensões temáticas (única exceção à regra de não-repetição entre dimensões). Sem subdivisão nesta fase.

*Média Capitais:* 74.3 (n=9).

![Recorte de Capitais — Objetivo 9](../graficos/recortes/cap12_capitais.png)

**Indicadores:**

*MUNIC 2024 (IBGE) — bloco transparência ativa:*

- **MUNIC_PORTAL_TRANSP** — A prefeitura possui portal da transparência?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_SERV_INFO_FINANCAS** — A página da prefeitura disponibiliza informações sobre finanças públicas?
  - Valor (Capitais): 100.00 (27/27 capitais)

*MUNIC 2024 (IBGE) — bloco LAI:*

- **MUNIC_LAI** — A área de comunicação exerce a função de disseminação da aplicação da LAI e orientações de como o município pode atender a população?
  - Valor (Capitais): 55.56 (15/27 capitais)

- **MUNIC_LAI_LEI** — Existe legislação municipal específica que estabeleça procedimentos e providências para garantir o direito de acesso à informação pública em conformidade com a LAI?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_LAI_SOLICITACOES** — A prefeitura recebeu em 2023 solicitações de acesso à informação com base na LAI?
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_LAI_PUBLICA_PR** — A prefeitura publica para acesso público perguntas e respostas feitas através da LAI? (Perguntas e respostas=100; Somente respostas=50; Não publica=0)
  - Valor (Capitais): 50.00 (média sobre as 27 capitais; Belém/PA, única capital sem solicitações em 2023, contribui com 0 via fallback)

*MUNIC 2024 (IBGE) — bloco participação:*

- **MUNIC_PARTICIPACAO** — A prefeitura disponibilizou formas de participação do cidadão pela internet?
  - Valor (Capitais): 81.48 (22/27 capitais)

- **MUNIC_ATIV_REDES_CONSULTA** — A prefeitura utiliza redes sociais para consulta pública ou enquete?
  - Valor (Capitais): 48.15 (13/27 capitais)

- **MUNIC_CONSELHO_TRANSP** — A prefeitura possui Conselho Municipal de Transparência ou similar?
  - Valor (Capitais): 37.04 (10/27 capitais)
