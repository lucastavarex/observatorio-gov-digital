# 5. Objetivo 2: Qualidade dos Serviços Digitais

> Aprimorar a qualidade dos serviços públicos com abordagem inclusiva, acessível, proativa e em canais integrados de atendimento, com atenção à experiência dos usuários.

A metodologia (normalização, agregação, tratamento de não-resposta) está descrita no Capítulo 3.

## 5.1 Recomendações da ENGD para este objetivo

A Portaria SGD/MGI nº 4.248/2024 elenca cinco recomendações aos entes federados para aprimorar a qualidade dos serviços públicos digitais:

- **2.1** Desenhar serviços com linguagem simplificada, acessibilidade, e jornada personalizada, aprimorando a experiência do usuário, com prioridade para populações vulneráveis.
- **2.2** Implementar ações de melhoria dos serviços públicos prestados, com base nos resultados da avaliação de satisfação e pesquisa direta com os usuários dos serviços, usando indicadores e modelagens padronizadas.
- **2.3** Disponibilizar serviços em canais digitais, preferencialmente por meio de autosserviço, e sem prejuízo do direito a atendimento presencial.
- **2.4** Integrar os canais digitais de prestação de serviços públicos e de comunicação, preferencialmente consolidando portais e aplicativos de dispositivos móveis.
- **2.5** Integrar os serviços públicos em diversidade de canais digitais e físicos, dispondo de canais de atendimento presencial para demandas não resolvidas plenamente pelos serviços públicos digitais, com investigação acerca das dificuldades e barreiras na prestação de serviços.

## 5.2 Cobertura por nível federativo

O Objetivo 2 conta com 102 variáveis ativas no índice, que entram na agregação do índice como 80 componentes — itens de uma mesma bateria contam juntos como um único componente (ver Capítulo 3). A distribuição por fonte: 39 variáveis do IOSPD/ABEP-TIC 2025, 34 da MUNIC 2024 (IBGE), 15 da TIC Governo Eletrônico 2023 (CETIC.br), 10 da ESTADIC 2024 (IBGE) e 4 da TIC Saúde 2024 (CETIC.br). Todas contribuem para a visão Nacional. **49 variáveis** têm observação por UF (10 da ESTADIC e 39 da IOSPD/ABEP-TIC) — bem acima do limiar mínimo, justificando a criação da dimensão **`Recorte Estadual`**. **34 variáveis** têm observação por capital (todas da MUNIC) — também acima do limiar, justificando a criação da dimensão **`Recorte de Capitais`**. As demais variáveis (TIC Governo Eletrônico, TIC Saúde) têm apenas valor agregado nacional. A TIC Governo Eletrônico publica, para as prefeituras, agregados regionais ("Capital" como categoria única), mas não valor por capital individual; suas variáveis permanecem, portanto, fora do `Recorte de Capitais`.

Dois indicadores da TIC Domicílios 2024 (CETIC.br) sobre uso de serviços públicos digitais e resolução sem atendimento presencial não integram o índice por medirem percentuais condicionados a um universo restrito — usuários de Internet com 16 anos ou mais —, e não ao conjunto da população. O indicador de inscrição ou venda de ingressos online da TIC Cultura 2024 (CETIC.br) está suspenso até a fonte publicar total nacional oficial: a edição 2024 divulga apenas resultados por tipo de equipamento cultural.

A presença das duas dimensões federativas com dezenas de variáveis cada sinaliza a maturidade comparativa deste objetivo frente aos demais — boa parte da medição já está instrumentada com observação subnacional, em especial pela cobertura ampla de IOSPD (UF) e MUNIC (capitais).

## 5.3 Dimensões

As 102 variáveis ativas do Objetivo 2 foram agrupadas em **onze dimensões temáticas**, complementadas por duas dimensões federativas (`Recorte Estadual` e `Recorte de Capitais`). Sete dessas dimensões correspondem a sub-conceitos enunciados diretamente pelas recomendações da Portaria — informação pública digital (Rec 2.3), serviços transversais (Recs 2.3 e 2.4), canais e atendimento multicanal (Recs 2.4 e 2.5), personalização da jornada e ambiente autenticado (Rec 2.1), linguagem e usabilidade (Rec 2.1), acessibilidade (Rec 2.1) e satisfação e experiência do cidadão (Rec 2.2). As outras quatro correspondem ao desdobramento dos serviços setoriais por área temática — saúde, educação, cidadania/segurança/fiscal e mobilidade urbana —, todas alinhadas à Recomendação 2.3, refletindo a granularidade do índice nas áreas em que IOSPD, MUNIC e ESTADIC mantêm baterias específicas de medição. Esse desdobramento eleva o número de dimensões temáticas acima da faixa típica de 3-6 do contrato editorial; a opção foi assumir o maior detalhamento como reflexo fiel da estrutura atual da medição.

![Dimensões do Objetivo 2](../graficos/dimensoes/cap05.png)

### 5.3.1 Informação pública digital

*Definição:* Publicação ativa de informação institucional e de utilidade pública em canais digitais — notícias, legislação, licitações, diário oficial, documentos, concursos —, além da própria presença de website institucional entre os entes com acesso à Internet. Ancorada na Recomendação 2.3 (oferta em canais digitais), na vertente "leitura passiva" de informação pública.

*Média Nacional:* 84.8 (n=8).

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_SERV_INFORMATIVOS** — Serviços informativos disponibilizados na página da internet do governo estadual: notícias, documentos/formulários, licitações, diário oficial, legislação estadual, finanças públicas, concursos.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 81.02
  - Valor (Estadual): 81.0 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_SERV_INFO_NOTICIAS** — A página da prefeitura disponibiliza notícias?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 87.68
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SERV_INFO_DIARIO** — A página da prefeitura disponibiliza o diário oficial?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 71.58
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SERV_INFO_DOCUMENTOS** — A página da prefeitura disponibiliza acesso a documentos e formulários?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 80.74
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_LEGISLACAO** — A página da prefeitura disponibiliza a legislação municipal?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 90.97
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_LICITACOES** — A página da prefeitura disponibiliza informações sobre licitações?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 91.76
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_CONCURSOS** — A página da prefeitura disponibiliza informações sobre concursos públicos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 82.05
  - Valor (Capitais): 88.89 (24/27 capitais)

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **tic_gov/C1** — O órgão público ou a prefeitura com acesso à Internet possui website?
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 92.63

### 5.3.2 Serviços transversais

*Definição:* Ferramentas-meio de prestação digital aplicáveis a qualquer setor — Portal Único de Serviços, agendamento unificado, gestão de cadastro/perfil do cidadão, ouvidoria, Simplifique, ferramenta integrada de pagamento (incluindo PIX e cartão de crédito), consulta a processos, download de documentos e o leque de tipos de serviço disponibilizados no website (emissão de boletos e guias, consulta a processos, download e envio de formulários, emissão de documentos, inscrição ou matrícula e agendamento). Ancorada na Recomendação 2.4 (consolidação de portais e aplicativos móveis); com vínculo secundário à Recomendação 2.3 (autosserviço).

*Média Nacional:* 71.0 (n=13).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I01** — Possui um Portal Único ou um Portal de Serviços disponível ao usuário?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 74.07
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_I03** — Possui sistema unificado de agendamento DIGITAL de serviços?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 62.96
  - Valor (Estadual): 63.0 (média das 27 UFs)

- **IOSPD_I06** — Possui gestão de cadastro e perfil do cidadão pelo usuário?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 66.67
  - Valor (Estadual): 66.7 (média das 27 UFs)

- **IOSPD_I08** — Possui serviço online para receber e tratar solicitações de simplificação de serviços (Ex.: Simplifique)?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 40.74
  - Valor (Estadual): 40.7 (média das 27 UFs)

- **IOSPD_I12** — O Portal de Governo possui ferramenta DIGITAL integrada de solicitação de atendimento, acompanhamento, avaliação, notificação e pagamento?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 68.52
  - Valor (Estadual): 68.5 (média das 27 UFs)

- **IOSPD_III01a** — A Carta de Serviços ao Usuário foi normatizada pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 88.89
  - Valor (Estadual): 88.9 (média das 27 UFs)

- **IOSPD_V03** — A UF possui opções de pagamentos de serviços disponíveis aos cidadãos através de PIX e/ou Cartão de Crédito?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 58.04
  - Valor (Estadual): 58.0 (média das 27 UFs)

*ESTADIC 2024 (IBGE):*

- **ESTADIC_SERV_TRANSACIONAIS** — Serviços transacionais disponibilizados na página da internet do governo estadual: ouvidoria/atendimento, download de documentos, consulta de processos, delegacia eletrônica, cadastro de fornecedores, certidão negativa, nota fiscal eletrônica, matrícula escolar, agendamento de saúde, guia de tributos, emissão de documentos, pesquisa de satisfação.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 75.21
  - Valor (Estadual): 75.2 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_PAGINA_INTERNET** — A prefeitura possui página na Internet?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 97.74
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_SERV_TRANS_OUVIDORIA** — A página da prefeitura disponibiliza ouvidoria online?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 85.87
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_SERV_TRANS_DOWNLOAD** — A página da prefeitura permite download de documentos oficiais?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 76.27
  - Valor (Capitais): 85.19 (23/27 capitais)

- **MUNIC_SERV_TRANS_PROCESSOS** — A página da prefeitura permite consulta a processos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 44.90
  - Valor (Capitais): 88.89 (24/27 capitais)

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **C3** — O órgão público com website disponibiliza serviços no website? (C3 itens A-G: emissão de boletos ou guias, consulta a processos, download de documentos ou formulários, preenchimento ou envio de formulários, emissão de documentos, inscrição ou matrícula e agendamento) — agregação por máximo entre os 7 sub-itens, equivale a "ao menos um tipo de serviço".
  - *Normalização:* Máximo das proporções 0-100% dos 7 sub-itens
  - Valor (Nacional): 83.24

### 5.3.3 Serviços setoriais — Saúde

*Definição:* Serviços públicos digitais específicos da área de saúde — telessaúde (oferta institucional pelas UFs e adoção pelos estabelecimentos), dispensação de medicamentos, prescrição de receitas, consulta a estoque de medicamentos, agendamento de saúde e oferta de serviços online por estabelecimentos. Ancorada na Recomendação 2.3 (oferta de serviços em canais digitais).

*Média Nacional:* 34.9 (n=7).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_II02** — Possui serviço de solicitação de medicamento de alto custo, 100% digital?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 48.15
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_II03** — Possui tele-atendimento para serviços de saúde por videoconferência para o cidadão?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 48.15
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_II09** — Possui consulta online dos MEDICAMENTOS DISPONÍVEIS na rede estadual de saúde?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 59.26
  - Valor (Estadual): 59.3 (média das 27 UFs)

- **IOSPD_II10** — Possui emissão e envio de RECEITA online para PRESCRIÇÃO MÉDICA ao cidadão na rede estadual de saúde?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 33.33
  - Valor (Estadual): 33.3 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_SERV_TRANS_SAUDE** — A página da prefeitura permite agendamento de consulta de saúde?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 6.09
  - Valor (Capitais): 48.15 (13/27 capitais)

*TIC Saúde 2024 (CETIC.br):*

- **tic_saude/C1** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses oferece serviços online aos pacientes? (D1 do questionário, sub-itens A-E: agendamento, marcação de exames, consulta a resultados, prescrição/receita, outros) — agregação por média entre os 5 sub-itens.
  - *Normalização:* Média das proporções 0-100% dos 5 sub-itens
  - Valor (Nacional): 28.15

- **tic_saude/C2** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses realiza atendimentos por telessaúde? (D2A do questionário, 6 itens em 2024) — agregação por média entre os 6 sub-itens (amplitude de adoção).
  - *Normalização:* Média das proporções 0-100% dos 6 sub-itens
  - Valor (Nacional): 20.95

### 5.3.4 Serviços setoriais — Educação

*Definição:* Serviços públicos digitais específicos da área de educação básica — matrícula e rematrícula online, transferência online de alunos, emissão de diploma do ensino médio. Ancorada na Recomendação 2.3.

*Média Nacional:* 38.3 (n=4).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_II01** — Possui rematrícula online nas escolas estaduais?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 51.85
  - Valor (Estadual): 51.9 (média das 27 UFs)

- **IOSPD_II11** — Possui solicitação e emissão online de DIPLOMAS DO ENSINO MÉDIO nas escolas da rede estadual de educação?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 40.74
  - Valor (Estadual): 40.7 (média das 27 UFs)

- **IOSPD_II12** — Possui TRANSFERÊNCIA ONLINE de alunos entre escolas da rede estadual?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 51.85
  - Valor (Estadual): 51.9 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_SERV_TRANS_MATRICULA** — A página da prefeitura permite matrícula escolar online?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 8.80
  - Valor (Capitais): 74.07 (20/27 capitais)

### 5.3.5 Serviços setoriais — Cidadania, segurança e fiscal

*Definição:* Serviços públicos digitais de identidade civil, segurança pública, defesa do consumidor, trânsito veicular e administração fiscal/tributária — prova de vida online, recurso administrativo de trânsito, registro digital de reclamação no Código de Defesa do Consumidor, 2ª via de carteira de identidade, boletim de ocorrência online de violência doméstica, licenciamento e transferência digital de veículos, certidão negativa de débito (estadual e municipal), nota fiscal eletrônica, guia de pagamento de tributos, boletos por celular. Ancorada na Recomendação 2.3.

*Média Nacional:* 68.7 (n=12).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_II04** — Possui prova de vida online para servidores, aposentados e pensionistas?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 70.37
  - Valor (Estadual): 70.4 (média das 27 UFs)

- **IOSPD_II05** — Possui funcionalidade de apresentação de recurso e defesa online para infrações de trânsito em âmbito estadual?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 66.67
  - Valor (Estadual): 66.7 (média das 27 UFs)

- **IOSPD_II06** — Possui registro digital de reclamação do cidadão referente ao Código de Defesa do Consumidor?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 74.07
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_II07** — Possui solicitação online da 2ª via de Carteira de Identidade (RG)?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 100.00
  - Valor (Estadual): 100.0 (média das 27 UFs)

- **IOSPD_II08** — Possui Boletim de Ocorrência online de VIOLÊNCIA DOMÉSTICA ou CONTRA A MULHER?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 74.07
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_V05** — A UF possui consulta da situação do licenciamento de veículo com opção de pagamento eletrônico?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 88.89
  - Valor (Estadual): 88.9 (média das 27 UFs)

- **IOSPD_V06** — A UF possui um serviço online para emitir Certidão Negativa Estadual?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 85.19
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **IOSPD_V08** — A UF possui Transferência Digital de Veículos por meio do site, portal único ou aplicativo do Governo?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 48.15
  - Valor (Estadual): 48.1 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_SERV_TRANS_CERTIDAO** — A página da prefeitura permite emissão de certidão negativa de débito?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 58.06
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SERV_TRANS_NFE** — A página da prefeitura permite emissão de Nota Fiscal Eletrônica?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 74.97
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_SERV_TRANS_TRIBUTOS** — A página da prefeitura permite emissão de guia de pagamento de tributos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 55.98
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_CELULAR_BOLETOS** — A prefeitura disponibiliza emissão de boletos por celular/smartphone?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 27.81
  - Valor (Capitais): 70.37 (19/27 capitais)

### 5.3.6 Serviços setoriais — Mobilidade urbana

*Definição:* Serviços digitais de mobilidade urbana ofertados ao cidadão — bilhete ou cartão eletrônico no transporte público, tanto nas prefeituras quanto nos governos estaduais (bilhete único), e informação em tempo real sobre a frota de ônibus municipal (GPS com envio de informação ao usuário). Ancorada na Recomendação 2.3 (disponibilizar serviços em canais digitais).

*Média Nacional:* 21.8 (n=3).

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_BILHETE_UNICO** — O governo estadual instituiu o bilhete único para uso de transporte público? (Etic241)
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de governos estaduais.
  - Valor (Nacional): 44.44
  - Valor (Estadual): 44.4 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_SMART_BILHETE** — A prefeitura disponibiliza bilhete ou cartão eletrônico no transporte público?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 9.34
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_SMART_GPS_ONIBUS** — Os ônibus municipais possuem GPS com envio de informação ao usuário?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 11.54
  - Valor (Capitais): 92.59 (25/27 capitais)

### 5.3.7 Canais e atendimento multicanal

*Definição:* Diversidade de canais de atendimento e comunicação entre cidadão e governo — atendimento à distância, presença em redes sociais (existência, atividade e frequência) e em plataformas digitais por estabelecimentos, presença mobile (apps de governo, website mobile, notificações personalizadas com acompanhamento de serviços, SMS e mensageria) e as formas de contato pela Internet oferecidas no website (e-mail, formulário eletrônico, chat em tempo real, denúncia, solicitação de acesso à informação, sugestões e chatbot). Ancorada nas Recomendações 2.4 (integração de canais digitais, em especial apps móveis) e 2.5 (omnicanalidade físico-digital).

*Média Nacional:* 55.3 (n=33).

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_ATEND_DISTANCIA** — Formas de atendimento a distância ao cidadão pelo governo estadual: correio, jornais/publicações, websites, WhatsApp, telefone, telefone exclusivo, outros.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 49.07
  - Valor (Estadual): 49.1 (média das 27 UFs)

- **ESTADIC_REDES_SOCIAIS** — Plataformas de rede social do governo estadual: Facebook, Instagram, Youtube, Vimeo, Telegram, WhatsApp, Twitter, TikTok.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 62.55
  - Valor (Estadual): 62.6 (média das 27 UFs)

- **ESTADIC_ATIV_REDES** — Atividades do governo estadual nas redes sociais nos últimos 12 meses: postar notícias, responder comentários/dúvidas, consulta pública/enquete, divulgar serviços/campanhas.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 59.88
  - Valor (Estadual): 59.9 (média das 27 UFs)

- **ESTADIC_FREQ_REDES** — Frequência de atualização do conteúdo nas redes sociais (em média): Diariamente=100; Pelo menos uma vez por semana=50; demais frequências menores.
  - *Normalização:* Proporção 0-100% — Diariamente=100, Semanal=50
  - Valor (Nacional): 92.59
  - Valor (Estadual): 92.6 (média das 27 UFs)

- **ESTADIC_SERV_CELULAR** — Serviços disponibilizados por celular/smartphone pelo governo estadual nos últimos 12 meses: envio de SMS ao cidadão, recebimento de SMS do cidadão, apps do governo, apps de terceiros, website mobile, boletos de tributos.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 47.62
  - Valor (Estadual): 47.6 (média das 27 UFs)

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I07** — A manifestação de ouvidoria pode ser feita pelo Portal Único/Portal de Serviços de forma integrada com a mesma sessão logada?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 70.37
  - Valor (Estadual): 70.4 (média das 27 UFs)

- **IOSPD_III01b** — A criação de Ouvidorias Públicas foi normatizada pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 92.59
  - Valor (Estadual): 92.6 (média das 27 UFs)

- **IOSPD_V01** — A UF disponibiliza aplicativo móvel para acesso ao portal único ou portal de serviço, capaz de enviar notificações personalizadas e permitir o acompanhamento dos serviços pelo cidadão?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 53.08
  - Valor (Estadual): 53.1 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_ATEND_DISTANCIA** — A prefeitura oferece serviços de atendimento ao público a distância?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 98.55
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_REDES_SOCIAIS** — A prefeitura possui perfil ou conta própria em plataformas online?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 95.42
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_ATIV_REDES_DIVULGAR** — A prefeitura utiliza redes sociais para divulgar serviços e campanhas?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 86.75
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_ATIV_REDES_NOTICIAS** — A prefeitura utiliza redes sociais para postar notícias?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 93.57
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_ATIV_REDES_RESPOSTAS** — A prefeitura utiliza redes sociais para responder comentários/mensagens?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 61.22
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_CELULAR_APP_OUTROS** — A prefeitura disponibiliza aplicativos criados por outros organismos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 7.59
  - Valor (Capitais): 48.15 (13/27 capitais)

- **MUNIC_CELULAR_APP_PREF** — A prefeitura disponibiliza aplicativos criados pela própria prefeitura?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 10.31
  - Valor (Capitais): 66.67 (18/27 capitais)

- **MUNIC_CELULAR_WEBSITE_MOBILE** — A prefeitura possui website adaptado para dispositivos móveis?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 38.98
  - Valor (Capitais): 70.37 (19/27 capitais)

- **MUNIC_CELULAR_SMS_ENVIO** — A prefeitura envia SMS para comunicação com o cidadão?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 7.86
  - Valor (Capitais): 37.04 (10/27 capitais)

- **MUNIC_CELULAR_SMS_RECEB** — A prefeitura recebe SMS dos cidadãos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 5.91
  - Valor (Capitais): 22.22 (6/27 capitais)

*TIC Governo Eletrônico 2023 (CETIC.br):*

- **C5B** — Por quais meios o cidadão pode contatar a central de atendimento da prefeitura para solicitar serviços públicos? (C5B itens A-E: telefone, website, WhatsApp ou Telegram, outras redes sociais e aplicativo da prefeitura) — agregação por máximo entre os 5 sub-itens, equivale a "ao menos um meio de contato".
  - *Normalização:* Máximo das proporções 0-100% dos 5 sub-itens
  - Valor (Nacional): 84.59

*Bateria — formas de contato pela Internet: os 7 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **E1_EMAIL** — O órgão público ou a prefeitura com website disponibilizou endereço de e-mail como forma de contato com o cidadão pela Internet nos últimos 12 meses? (E1, item A nas duas populações em 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 95.68

- **E1_FORM** — O órgão público ou a prefeitura com website disponibilizou formulário eletrônico como forma de contato com o cidadão pela Internet nos últimos 12 meses? (E1, item B nas duas populações em 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 63.61

- **E1_LIVE_CHAT** — O órgão público ou a prefeitura com website disponibilizou atendimento por chat com atendentes em tempo real nos últimos 12 meses? (E1, item C nas duas populações em 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 20.12

- **E1_COMPLAINT** — O órgão público ou a prefeitura com website disponibilizou denúncia online como forma de contato com o cidadão pela Internet nos últimos 12 meses? (E1 de 2023, item D dos órgãos e item E das prefeituras)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 69.48

- **E1_FOI_REQUEST** — O órgão público ou a prefeitura com website disponibilizou serviço de solicitação de acesso à informação pela Internet nos últimos 12 meses? (E1 de 2023, item E dos órgãos e item F das prefeituras)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 70.87

- **E1_SUGGESTIONS** — O órgão público ou a prefeitura com website disponibilizou canal de sugestões para melhoria de serviços públicos pela Internet nos últimos 12 meses? (E1 de 2023, item F dos órgãos e item G das prefeituras)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 68.52

- **E1_CHATBOT** — O órgão público ou a prefeitura com website disponibilizou atendimento automatizado com assistente virtual ou chatbots nos últimos 12 meses? (E1 de 2023, item G dos órgãos e item D das prefeituras)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com website (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 13.84

*Bateria — recursos móveis: os 5 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **C6B_A** — O ente com acesso à Internet enviou SMS para o cidadão nos últimos 12 meses? (C6B item A de 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 21.81

- **C6B_B** — O ente com acesso à Internet recebeu SMS enviado pelo cidadão nos últimos 12 meses? (C6B item B de 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 20.70

- **C6B_C** — O ente com acesso à Internet ofereceu aplicativo próprio aos cidadãos nos últimos 12 meses? (C6B item C de 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 36.00

- **C6B_D** — O ente com acesso à Internet ofereceu website adaptado para dispositivos móveis nos últimos 12 meses? (C6B item D de 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 71.52

- **C6B_E** — O ente com acesso à Internet enviou mensagens aos cidadãos por WhatsApp ou Telegram nos últimos 12 meses? (C6B item E de 2023)
  - *Normalização:* Proporção 0-100%; valor Nacional é a média das proporções sobre os universos de órgãos públicos e de prefeituras com acesso à Internet (peso igual) — ver Seção 3.3.4.
  - Valor (Nacional): 48.43

*TIC Saúde 2024 (CETIC.br):*

- **tic_saude/C5** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses possui website na Internet? (B6-A do questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 50.05

- **tic_saude/C6** — O estabelecimento de saúde que utilizou Internet nos últimos 12 meses possui perfil em rede social? (B6_1 do questionário)
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 56.72

### 5.3.8 Personalização da jornada e ambiente autenticado

*Definição:* Oferta de ambiente autenticado e personalizado de serviços — plataforma em que o cidadão, após identificação, acessa serviços, notificações e informações adaptadas ao seu perfil e histórico de interações com o governo. Ancorada na Recomendação 2.1 (jornada personalizada e experiência do usuário).

*Média Nacional:* 55.6 (n=1).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_V04** — A UF possui plataforma de governo, portal de serviços ou portal único que disponibiliza ambiente personalizado no qual o cidadão, após identificação, acessa serviços, notificações e informações adaptadas ao seu perfil e histórico de interações com o governo?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 55.56
  - Valor (Estadual): 55.6 (média das 27 UFs)

### 5.3.9 Linguagem e usabilidade

*Definição:* Clareza textual, simplicidade de jornada, adequação do conteúdo à compreensão do cidadão e mecanismos de feedback do usuário sobre a apresentação dos serviços. Ancorada na Recomendação 2.1 (linguagem simplificada, experiência do usuário).

*Média Nacional:* 75.8 (n=9).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

*Bateria — linguagem simples dos serviços digitais: os 9 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **IOSPD_IV01** — O texto utiliza tempos verbais na 2ª ou 3ª pessoa do singular?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 86.67
  - Valor (Estadual): 86.7 (média das 27 UFs)

- **IOSPD_IV02** — As frases dos textos são curtas e indicam uma única ação?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 68.15
  - Valor (Estadual): 68.1 (média das 27 UFs)

- **IOSPD_IV03** — O Título é objetivo e curto?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 73.33
  - Valor (Estadual): 73.3 (média das 27 UFs)

- **IOSPD_IV04** — O texto tem parágrafos curtos?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 85.56
  - Valor (Estadual): 85.6 (média das 27 UFs)

- **IOSPD_IV05** — O texto utiliza o tempo presente do verbo?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 88.15
  - Valor (Estadual): 88.1 (média das 27 UFs)

- **IOSPD_IV06** — O texto utiliza caracteres especiais?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 85.19
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **IOSPD_IV07** — O vocabulário está de fácil entendimento?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 69.63
  - Valor (Estadual): 69.6 (média das 27 UFs)

- **IOSPD_IV08** — Na metodologia utilizada para descrição ou apresentação dos serviços digitais há descrição de como fazer a aplicação da técnica de Linguagem Simples?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 48.15
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_IV09** — Possui mecanismos para o cidadão pedir melhoria na apresentação dos serviços?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 77.78
  - Valor (Estadual): 77.8 (média das 27 UFs)

### 5.3.10 Acessibilidade

*Definição:* Adequação dos serviços digitais a pessoas com deficiência (visual, auditiva, motora), tanto no nível estadual (acessibilidade global da página, modelo de padrão adotado e plataforma adaptada a surdos e deficientes visuais) quanto nas páginas das prefeituras (recursos específicos: navegação por tecnologia assistiva, descrição de imagens, LIBRAS, título descritivo da página na aba do navegador). Ancorada na Recomendação 2.1 (acessibilidade).

*Média Nacional:* 42.3 (n=8).

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_ACESSIBILIDADE** — Acessibilidade da página e serviços eletrônicos do governo estadual: navegação sem mouse, pular itens repetidos, descrição de imagens, tradução em LIBRAS, descrição de páginas (aba do navegador), CAPTCHA acessível.
  - *Normalização:* Proporção 0-100% — usado diretamente
  - Valor (Nacional): 40.74
  - Valor (Estadual): 40.7 (média das 27 UFs)

- **ESTADIC_MODELO_ACESS** — Modelo de acessibilidade usado no website ou portal: WCAG/WAI=100; e-MAG=75; Modelo próprio=50; Nenhum=0.
  - *Normalização:* Escala ordinal mapeada para 0-100 conforme acima.
  - Valor (Nacional): 70.37
  - Valor (Estadual): 70.4 (média das 27 UFs)

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_V09** — A UF possui plataforma de serviços digitais adaptada para proporcionar acessibilidade a surdos e deficientes visuais?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 60.50
  - Valor (Estadual): 60.5 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

*Bateria — acessibilidade do website da prefeitura: os 5 itens a seguir entram no índice como um único componente (média dos itens observados; ver Capítulo 3).*

- **MUNIC_ACESS_NAVEGACAO** — A página da prefeitura permite navegação acessível por todos os itens interativos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 46.30
  - Valor (Capitais): 51.85 (14/27 capitais)

- **MUNIC_ACESS_SALTAR** — A página permite ao usuário de tecnologia assistiva saltar itens repetitivos?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 17.43
  - Valor (Capitais): 33.33 (9/27 capitais)

- **MUNIC_ACESS_IMAGENS** — A página da prefeitura descreve o conteúdo das imagens?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 33.72
  - Valor (Capitais): 51.85 (14/27 capitais)

- **MUNIC_ACESS_LIBRAS** — A página da prefeitura inclui tradução de conteúdo em LIBRAS?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 31.81
  - Valor (Capitais): 62.96 (17/27 capitais)

- **PAGINA_POSSUI_TITULO** — As páginas da prefeitura na Internet descrevem o seu conteúdo com o texto que aparece na aba do navegador? (Mtic285; corresponde ao critério WCAG 2.4.2, Page Titled)
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 37.50
  - Valor (Capitais): 44.44 (12/27 capitais)

### 5.3.11 Satisfação e experiência do cidadão

*Definição:* Pesquisas de satisfação dos usuários dos serviços públicos digitais, metodologia institucional de avaliação e instrumentos de participação do usuário previstos na Lei 13.460/2017. Ancorada na Recomendação 2.2 (avaliação de satisfação e melhoria contínua).

*Média Nacional:* 61.3 (n=4).

**Indicadores:**

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I04** — Possui metodologia e ferramenta de avaliação da satisfação dos usuários em relação aos serviços públicos prestados?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 74.07
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_III01c** — O Conselho de Usuários do Serviço Público foi normatizado pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 77.78
  - Valor (Estadual): 77.8 (média das 27 UFs)

- **IOSPD_III01d** — O processo de Avaliação dos Serviços Públicos foi normatizado pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - *Normalização:* Índice 0-10 — multiplicado por 10
  - Valor (Nacional): 70.37
  - Valor (Estadual): 70.4 (média das 27 UFs)

*MUNIC 2024 (IBGE):*

- **MUNIC_SERV_TRANS_SATISFACAO** — A página da prefeitura disponibiliza pesquisa de satisfação?
  - *Normalização:* Binário Sim/Não — Sim=100, Não=0; valor Nacional é a proporção 0-100% sobre o universo de prefeituras.
  - Valor (Nacional): 23.03
  - Valor (Capitais): 48.15 (13/27 capitais)

### 5.3.12 Recorte Estadual

*Definição:* Conjunto das variáveis do Objetivo 2 com observação por UF, agregadas para leitura federativa do desempenho na qualidade dos serviços digitais. Reúne as 10 variáveis ESTADIC e as 39 variáveis IOSPD do objetivo. Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Estadual:* 66.6 (n=49; média do score por UF agregando as 49 variáveis; σ = 20.7 entre as 27 UFs).

![Recorte Estadual — Objetivo 2](../graficos/recortes/cap05_estadual.png)

**Topo (top-3):** PI (93.8), RJ (90.8), SP (89.7).
**Base (bottom-3):** RN (24.2), RR (27.6), AL (33.6).

**Indicadores:**

*ESTADIC 2024 (IBGE):*

- **ESTADIC_ACESSIBILIDADE** — Acessibilidade da página e serviços eletrônicos do governo estadual: navegação sem mouse, pular itens repetidos, descrição de imagens, tradução em LIBRAS, descrição de páginas (aba do navegador), CAPTCHA acessível.
  - Valor (Estadual): 40.7 (média das 27 UFs)

- **ESTADIC_ATEND_DISTANCIA** — Formas de atendimento a distância ao cidadão pelo governo estadual: correio, jornais/publicações, websites, WhatsApp, telefone, telefone exclusivo, outros.
  - Valor (Estadual): 49.1 (média das 27 UFs)

- **ESTADIC_ATIV_REDES** — Atividades do governo estadual nas redes sociais nos últimos 12 meses: postar notícias, responder comentários/dúvidas, consulta pública/enquete, divulgar serviços/campanhas.
  - Valor (Estadual): 59.9 (média das 27 UFs)

- **ESTADIC_BILHETE_UNICO** — O governo estadual instituiu o bilhete único para uso de transporte público? (Etic241)
  - Valor (Estadual): 44.4 (média das 27 UFs)

- **ESTADIC_FREQ_REDES** — Frequência de atualização do conteúdo nas redes sociais (em média): Diariamente=100; Pelo menos uma vez por semana=50; demais frequências menores.
  - Valor (Estadual): 92.6 (média das 27 UFs)

- **ESTADIC_MODELO_ACESS** — Modelo de acessibilidade usado no website ou portal: WCAG/WAI=100; e-MAG=75; Modelo próprio=50; Nenhum=0.
  - Valor (Estadual): 70.4 (média das 27 UFs)

- **ESTADIC_REDES_SOCIAIS** — Plataformas de rede social do governo estadual: Facebook, Instagram, Youtube, Vimeo, Telegram, WhatsApp, Twitter, TikTok.
  - Valor (Estadual): 62.6 (média das 27 UFs)

- **ESTADIC_SERV_CELULAR** — Serviços disponibilizados por celular/smartphone pelo governo estadual nos últimos 12 meses: envio de SMS ao cidadão, recebimento de SMS do cidadão, apps do governo, apps de terceiros, website mobile, boletos de tributos.
  - Valor (Estadual): 47.6 (média das 27 UFs)

- **ESTADIC_SERV_INFORMATIVOS** — Serviços informativos disponibilizados na página da internet do governo estadual: notícias, documentos/formulários, licitações, diário oficial, legislação estadual, finanças públicas, concursos.
  - Valor (Estadual): 81.0 (média das 27 UFs)

- **ESTADIC_SERV_TRANSACIONAIS** — Serviços transacionais disponibilizados na página da internet do governo estadual: ouvidoria/atendimento, download de documentos, consulta de processos, delegacia eletrônica, cadastro de fornecedores, certidão negativa, nota fiscal eletrônica, matrícula escolar, agendamento de saúde, guia de tributos, emissão de documentos, pesquisa de satisfação.
  - Valor (Estadual): 75.2 (média das 27 UFs)

*IOSPD/ABEP-TIC 2025 (ABEP-TIC):*

- **IOSPD_I01** — Possui um Portal Único ou um Portal de Serviços disponível ao usuário?
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_I03** — Possui sistema unificado de agendamento DIGITAL de serviços?
  - Valor (Estadual): 63.0 (média das 27 UFs)

- **IOSPD_I04** — Possui metodologia e ferramenta de avaliação da satisfação dos usuários em relação aos serviços públicos prestados?
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_I06** — Possui gestão de cadastro e perfil do cidadão pelo usuário?
  - Valor (Estadual): 66.7 (média das 27 UFs)

- **IOSPD_I07** — A manifestação de ouvidoria pode ser feita pelo Portal Único/Portal de Serviços de forma integrada com a mesma sessão logada?
  - Valor (Estadual): 70.4 (média das 27 UFs)

- **IOSPD_I08** — Possui serviço online para receber e tratar solicitações de simplificação de serviços (Ex.: Simplifique)?
  - Valor (Estadual): 40.7 (média das 27 UFs)

- **IOSPD_I12** — O Portal de Governo possui ferramenta DIGITAL integrada de solicitação de atendimento, acompanhamento, avaliação, notificação e pagamento?
  - Valor (Estadual): 68.5 (média das 27 UFs)

- **IOSPD_II01** — Possui rematrícula online nas escolas estaduais?
  - Valor (Estadual): 51.9 (média das 27 UFs)

- **IOSPD_II02** — Possui serviço de solicitação de medicamento de alto custo, 100% digital?
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_II03** — Possui tele-atendimento para serviços de saúde por videoconferência para o cidadão?
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_II04** — Possui prova de vida online para servidores, aposentados e pensionistas?
  - Valor (Estadual): 70.4 (média das 27 UFs)

- **IOSPD_II05** — Possui funcionalidade de apresentação de recurso e defesa online para infrações de trânsito em âmbito estadual?
  - Valor (Estadual): 66.7 (média das 27 UFs)

- **IOSPD_II06** — Possui registro digital de reclamação do cidadão referente ao Código de Defesa do Consumidor?
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_II07** — Possui solicitação online da 2ª via de Carteira de Identidade (RG)?
  - Valor (Estadual): 100.0 (média das 27 UFs)

- **IOSPD_II08** — Possui Boletim de Ocorrência online de VIOLÊNCIA DOMÉSTICA ou CONTRA A MULHER?
  - Valor (Estadual): 74.1 (média das 27 UFs)

- **IOSPD_II09** — Possui consulta online dos MEDICAMENTOS DISPONÍVEIS na rede estadual de saúde?
  - Valor (Estadual): 59.3 (média das 27 UFs)

- **IOSPD_II10** — Possui emissão e envio de RECEITA online para PRESCRIÇÃO MÉDICA ao cidadão na rede estadual de saúde?
  - Valor (Estadual): 33.3 (média das 27 UFs)

- **IOSPD_II11** — Possui solicitação e emissão online de DIPLOMAS DO ENSINO MÉDIO nas escolas da rede estadual de educação?
  - Valor (Estadual): 40.7 (média das 27 UFs)

- **IOSPD_II12** — Possui TRANSFERÊNCIA ONLINE de alunos entre escolas da rede estadual?
  - Valor (Estadual): 51.9 (média das 27 UFs)

- **IOSPD_III01a** — A Carta de Serviços ao Usuário foi normatizada pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - Valor (Estadual): 88.9 (média das 27 UFs)

- **IOSPD_III01b** — A criação de Ouvidorias Públicas foi normatizada pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - Valor (Estadual): 92.6 (média das 27 UFs)

- **IOSPD_III01c** — O Conselho de Usuários do Serviço Público foi normatizado pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - Valor (Estadual): 77.8 (média das 27 UFs)

- **IOSPD_III01d** — O processo de Avaliação dos Serviços Públicos foi normatizado pelo Governo Estadual/Distrital, conforme previsto na Lei 13.460/2017?
  - Valor (Estadual): 70.4 (média das 27 UFs)

- **IOSPD_IV01** — O texto utiliza tempos verbais na 2ª ou 3ª pessoa do singular?
  - Valor (Estadual): 86.7 (média das 27 UFs)

- **IOSPD_IV02** — As frases dos textos são curtas e indicam uma única ação?
  - Valor (Estadual): 68.1 (média das 27 UFs)

- **IOSPD_IV03** — O Título é objetivo e curto?
  - Valor (Estadual): 73.3 (média das 27 UFs)

- **IOSPD_IV04** — O texto tem parágrafos curtos?
  - Valor (Estadual): 85.6 (média das 27 UFs)

- **IOSPD_IV05** — O texto utiliza o tempo presente do verbo?
  - Valor (Estadual): 88.1 (média das 27 UFs)

- **IOSPD_IV06** — O texto utiliza caracteres especiais?
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **IOSPD_IV07** — O vocabulário está de fácil entendimento?
  - Valor (Estadual): 69.6 (média das 27 UFs)

- **IOSPD_IV08** — Na metodologia utilizada para descrição ou apresentação dos serviços digitais há descrição de como fazer a aplicação da técnica de Linguagem Simples?
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_IV09** — Possui mecanismos para o cidadão pedir melhoria na apresentação dos serviços?
  - Valor (Estadual): 77.8 (média das 27 UFs)

- **IOSPD_V01** — A UF disponibiliza aplicativo móvel para acesso ao portal único ou portal de serviço, capaz de enviar notificações personalizadas e permitir o acompanhamento dos serviços pelo cidadão?
  - Valor (Estadual): 53.1 (média das 27 UFs)

- **IOSPD_V03** — A UF possui opções de pagamentos de serviços disponíveis aos cidadãos através de PIX e/ou Cartão de Crédito?
  - Valor (Estadual): 58.0 (média das 27 UFs)

- **IOSPD_V04** — A UF possui plataforma de governo, portal de serviços ou portal único que disponibiliza ambiente personalizado no qual o cidadão, após identificação, acessa serviços, notificações e informações adaptadas ao seu perfil e histórico de interações com o governo?
  - Valor (Estadual): 55.6 (média das 27 UFs)

- **IOSPD_V05** — A UF possui consulta da situação do licenciamento de veículo com opção de pagamento eletrônico?
  - Valor (Estadual): 88.9 (média das 27 UFs)

- **IOSPD_V06** — A UF possui um serviço online para emitir Certidão Negativa Estadual?
  - Valor (Estadual): 85.2 (média das 27 UFs)

- **IOSPD_V08** — A UF possui Transferência Digital de Veículos por meio do site, portal único ou aplicativo do Governo?
  - Valor (Estadual): 48.1 (média das 27 UFs)

- **IOSPD_V09** — A UF possui plataforma de serviços digitais adaptada para proporcionar acessibilidade a surdos e deficientes visuais?
  - Valor (Estadual): 60.5 (média das 27 UFs)

### 5.3.13 Recorte de Capitais

*Definição:* Conjunto das variáveis do Objetivo 2 com observação por capital, agregadas para leitura federativa do desempenho municipal. Reúne as 34 variáveis MUNIC do objetivo (incluindo os 5 itens da bateria de acessibilidade web). Inclui variáveis também classificadas em dimensões temáticas (única exceção à regra de não-repetição).

*Média Capitais:* 76.9 (n=34; média do score por capital agregando as 34 variáveis; σ = 14.5 entre as 27 capitais).

![Recorte de Capitais — Objetivo 2](../graficos/recortes/cap05_capitais.png)

**Topo (top-3):** Belo Horizonte (MG) e Curitiba (PR), ambas com 100.0; Macapá (AP), Salvador (BA) e Brasília (DF), todas com 94.12.
**Base (bottom-3):** Rio Branco (AC) com 41.18; Palmas (TO) com 52.94; Goiânia (GO) com 55.88.

**Indicadores:**

*MUNIC 2024 (IBGE):*

- **MUNIC_ACESS_IMAGENS** — A página da prefeitura descreve o conteúdo das imagens?
  - Valor (Capitais): 51.85 (14/27 capitais)

- **MUNIC_ACESS_LIBRAS** — A página da prefeitura inclui tradução de conteúdo em LIBRAS?
  - Valor (Capitais): 62.96 (17/27 capitais)

- **MUNIC_ACESS_NAVEGACAO** — A página da prefeitura permite navegação acessível por todos os itens interativos?
  - Valor (Capitais): 51.85 (14/27 capitais)

- **MUNIC_ACESS_SALTAR** — A página permite ao usuário de tecnologia assistiva saltar itens repetitivos?
  - Valor (Capitais): 33.33 (9/27 capitais)

- **MUNIC_ATEND_DISTANCIA** — A prefeitura oferece serviços de atendimento ao público a distância?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_ATIV_REDES_DIVULGAR** — A prefeitura utiliza redes sociais para divulgar serviços e campanhas?
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_ATIV_REDES_NOTICIAS** — A prefeitura utiliza redes sociais para postar notícias?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_ATIV_REDES_RESPOSTAS** — A prefeitura utiliza redes sociais para responder comentários/mensagens?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_CELULAR_APP_OUTROS** — A prefeitura disponibiliza aplicativos criados por outros organismos?
  - Valor (Capitais): 48.15 (13/27 capitais)

- **MUNIC_CELULAR_APP_PREF** — A prefeitura disponibiliza aplicativos criados pela própria prefeitura?
  - Valor (Capitais): 66.67 (18/27 capitais)

- **MUNIC_CELULAR_BOLETOS** — A prefeitura disponibiliza emissão de boletos por celular/smartphone?
  - Valor (Capitais): 70.37 (19/27 capitais)

- **MUNIC_CELULAR_SMS_ENVIO** — A prefeitura envia SMS para comunicação com o cidadão?
  - Valor (Capitais): 37.04 (10/27 capitais)

- **MUNIC_CELULAR_SMS_RECEB** — A prefeitura recebe SMS dos cidadãos?
  - Valor (Capitais): 22.22 (6/27 capitais)

- **MUNIC_CELULAR_WEBSITE_MOBILE** — A prefeitura possui website adaptado para dispositivos móveis?
  - Valor (Capitais): 70.37 (19/27 capitais)

- **MUNIC_PAGINA_INTERNET** — A prefeitura possui página na Internet?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_REDES_SOCIAIS** — A prefeitura possui perfil ou conta própria em plataformas online?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_SERV_INFO_CONCURSOS** — A página da prefeitura disponibiliza informações sobre concursos públicos?
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_DIARIO** — A página da prefeitura disponibiliza o diário oficial?
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SERV_INFO_DOCUMENTOS** — A página da prefeitura disponibiliza acesso a documentos e formulários?
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_LEGISLACAO** — A página da prefeitura disponibiliza a legislação municipal?
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_LICITACOES** — A página da prefeitura disponibiliza informações sobre licitações?
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_INFO_NOTICIAS** — A página da prefeitura disponibiliza notícias?
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SERV_TRANS_CERTIDAO** — A página da prefeitura permite emissão de certidão negativa de débito?
  - Valor (Capitais): 92.59 (25/27 capitais)

- **MUNIC_SERV_TRANS_DOWNLOAD** — A página da prefeitura permite download de documentos oficiais?
  - Valor (Capitais): 85.19 (23/27 capitais)

- **MUNIC_SERV_TRANS_MATRICULA** — A página da prefeitura permite matrícula escolar online?
  - Valor (Capitais): 74.07 (20/27 capitais)

- **MUNIC_SERV_TRANS_NFE** — A página da prefeitura permite emissão de Nota Fiscal Eletrônica?
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_SERV_TRANS_OUVIDORIA** — A página da prefeitura disponibiliza ouvidoria online?
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_SERV_TRANS_PROCESSOS** — A página da prefeitura permite consulta a processos?
  - Valor (Capitais): 88.89 (24/27 capitais)

- **MUNIC_SERV_TRANS_SATISFACAO** — A página da prefeitura disponibiliza pesquisa de satisfação?
  - Valor (Capitais): 48.15 (13/27 capitais)

- **MUNIC_SERV_TRANS_SAUDE** — A página da prefeitura permite agendamento de consulta de saúde?
  - Valor (Capitais): 48.15 (13/27 capitais)

- **MUNIC_SERV_TRANS_TRIBUTOS** — A página da prefeitura permite emissão de guia de pagamento de tributos?
  - Valor (Capitais): 96.30 (26/27 capitais)

- **MUNIC_SMART_BILHETE** — A prefeitura disponibiliza bilhete ou cartão eletrônico no transporte público?
  - Valor (Capitais): 100.00 (27/27 capitais)

- **MUNIC_SMART_GPS_ONIBUS** — Os ônibus municipais possuem GPS com envio de informação ao usuário?
  - Valor (Capitais): 92.59 (25/27 capitais)

- **PAGINA_POSSUI_TITULO** — As páginas da prefeitura na Internet descrevem o seu conteúdo com o texto que aparece na aba do navegador? (Mtic285; corresponde ao critério WCAG 2.4.2, Page Titled)
  - Valor (Capitais): 44.44 (12/27 capitais)
