# Anexo A — Variáveis Excluídas

Este anexo consolida as variáveis avaliadas que não foram incorporadas aos índices, com o respectivo motivo de exclusão. Os critérios de exclusão estão descritos na Seção 3.2.1 (Metodologia).

---

## A.1 Variáveis excluídas do índice nacional

### Saturação (variância zero ou quase zero)

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| A4 | TIC Governo Eletrônico (CETIC.br) | O órgão público ou a prefeitura utilizou Internet nos últimos 12 meses? | Medida junto ao teto: as observações de 2023 variam de 99,53% a 100% | Mantida como série descritiva (pergunta-filtro de percentuais condicionais) |
| A4 | TIC Educação (CETIC.br) | A escola com acesso à Internet possui rede sem fio? | Excluída: mede rede sem fio apenas entre escolas com Internet, junto ao teto (98,9% no total condicional) | Mantida como série descritiva |

### Dados indisponíveis ou inexistentes

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| SGD_SAT02 | Painéis SGD | Métrica alternativa de satisfação com serviços Gov.br | Não existe como métrica publicada | Pedido LAI ou derivar da dimensão "resolutividade" |
| SGD_NPS | Painéis SGD | Net Promoter Score dos serviços Gov.br | Gov.br usa escala 1-5, não NPS (0-10) | Sem previsão de implementação |
| INF02 | ANATEL | % municípios com fibra óptica | Indicador não extraído — ANATEL não publica dados de % municípios com fibra | Monitorar publicação futura |
| B1B | TIC Saúde (CETIC.br) | As informações dos pacientes são registradas em meio eletrônico (vs papel)? (C4a questionário) | Indicador não publicado no portal 2024 — B1 divulgado sem o desmembramento A/B | Monitorar publicação futura |
| B3_admin | TIC Saúde (CETIC.br) | O estabelecimento utiliza sistemas eletrônicos para gestão administrativa? (C3 questionário) | Não existe como indicador separado no portal 2024 — B3 cobre todas as funcionalidades | Monitorar publicação futura |

### Descontinuação

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| QT_COMP_ALUNO | Censo Escolar (INEP) | Quantidade de computadores para uso de alunos | Descontinuada em 2018 | Substituída por QT_DESKTOP + QT_COMP_PORTATIL + QT_TABLET |
| EBT360 | Escala Brasil Transparente (CGU) | Nota geral de transparência (50% TP + 50% TA) | Fonte interrompida em 2020; 6 anos de defasagem em relação às demais fontes | Monitorar nova avaliação da CGU |

### Baixo poder discriminativo

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| SGD_SAT01 | Painel de Satisfação Gov.br (SGD/MGI) | Nota média de satisfação dos usuários com serviços digitais no Gov.br | Pesquisa de satisfação em escala 1-5 satura próximo de 4; representatividade do respondente não é conhecida — não agrega informação distintiva ao índice | Reavaliar caso SGD passe a publicar série com microdados ou desagregação por serviço/órgão |

### Escala incompatível (contagens absolutas ou valores monetários)

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| BLF01 | ANATEL | Número absoluto de acessos de banda larga fixa (~38M-44M) | Contagem absoluta, sem expressão 0-100% | Substituída por BLF02 |
| BLF03 | ANATEL | Acessos de banda larga fixa por tecnologia | Contagem absoluta | Substituída por INF02 |
| BLM01 | ANATEL | Número absoluto de estações rádio-base (ERBs) | Contagem absoluta | Substituída por BLM02 |

### Variáveis multi-item excluídas (5)

Variáveis com múltiplos sub-itens cujos sub-itens representam detalhes técnicos já capturados por variável parent, ou que medem comportamento do cidadão (demanda) e não capacidade do governo (oferta). Ver Seção 3.2.3 da Metodologia.

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| G2 | TIC Domicílios (CETIC.br) | Tipos de serviço público acessado online (7 sub-itens A-G) | Variável de demanda (cidadão), não de oferta. Oferta já coberta por C6B, C1. | Sem ação prevista |
| C9B | TIC Governo Eletrônico (CETIC.br) | Formas de cadastro ou login exigidas para acessar serviços online | Apenas o item A (login único Gov.br) integra o índice, como `C9B_A`; login estadual, login do próprio ente, rede social e "Outro" permanecem descritivos, porque exigir qualquer cadastro não comprova maturidade de identidade digital | Sem ação prevista |
| E3E | TIC Governo Eletrônico (CETIC.br) | Finalidades de uso de redes sociais (6 sub-itens A-F) | Detalhe técnico; o relevante é usar redes sociais, não para quê | Avaliar inclusão de E3 (usa redes sociais?) como parent binária |
| H1A | TIC Governo Eletrônico (CETIC.br) | Fontes de big data (5 sub-itens A-E) | Detalhe técnico; H1 já captura "fez big data?" | Sem ação prevista |
| H3A | TIC Governo Eletrônico (CETIC.br) | Aplicações de IA (7 sub-itens A-G) | Detalhe técnico; H3 já captura "usou IA?" | Sem ação prevista |

### Variáveis multi-item desmembradas

Variáveis com sub-itens fundamentalmente diferentes que foram desmembradas em variáveis individuais. As entradas parent foram removidas do índice e substituídas pelas entradas individuais, que hoje contam juntas como bateria (um único componente — ver Seções 3.2.3 e 3.3.4 da Metodologia).

| Variável | Fonte | Sub-itens ativos | Novas variáveis | Objetivo |
|----------|-------|:---------------:|:---------------:|:--------:|
| C6B | TIC Governo Eletrônico (CETIC.br) | 5 (A-E) | C6B_A a C6B_E (bateria de recursos móveis); o item F, "Outro", não nomeia um recurso definido e permanece descritivo | 2 |
| E1 | TIC Governo Eletrônico (CETIC.br) | 7 | E1_EMAIL, E1_FORM, E1_LIVE_CHAT, E1_COMPLAINT, E1_FOI_REQUEST, E1_SUGGESTIONS e E1_CHATBOT (bateria de formas de contato, identificada por significado porque as letras físicas divergem entre órgãos e prefeituras) | 2 |
| C7 | TIC Governo Eletrônico (CETIC.br) | 1 (A) | C7_A (centros públicos de acesso gratuito); C7_B excluído por redundância com a MUNIC (ver adiante) | 6 |
| G3 | TIC Governo Eletrônico (CETIC.br) | 5 | G3_A, G3_B, G3_C, G3_C_PREF e G3_D (bateria LGPD; C e D existem apenas para órgãos, e G3_C_PREF é a identidade municipal distinta) | 4 |
| A12 | TIC Saúde (CETIC.br) | 5 (A-E) | A12_A a A12_E (bateria LGPD dos estabelecimentos de saúde) | 4 |
| B4_full | TIC Governo Eletrônico (CETIC.br) | 12 (A-L) | B4_A a B4_L (bateria de sistemas administrativos) | 8 |

As famílias B8 (processos de gestão de TI), F2C (áreas monitoradas por centro de operações) e H7 (temas de formação continuada), desmembradas em rodada anterior, saíram integralmente do índice por medirem percentuais condicionados a universo restrito (ver seção específica adiante).

### Percentuais condicionais com universo restrito

Indicadores cujo denominador é definido por uma pergunta-filtro que cobre menos de 90% da população-alvo (ver critério da Seção 3.2.4 da Metodologia). Todos permanecem como séries descritivas, fora do índice, porque profundidade entre elegíveis não pode ser lida como prevalência na população geral.

| Família / Variável | Fonte | O que mede | Pergunta-filtro e cobertura |
|--------------------|-------|------------|-----------------------------|
| B5A_A, B5A_B | TIC Governo Eletrônico (CETIC.br) | Plano estratégico/diretor de TI e plano ou política de segurança da informação | Existência de área de TI: 90,8% dos órgãos, mas 45,0% das prefeituras |
| B7 | TIC Governo Eletrônico (CETIC.br) | Comitê de governança digital ou de TI | Existência de área de TI (90,8% / 45,0%) |
| B8 e B8_A a B8_F | TIC Governo Eletrônico (CETIC.br) | Processos de gestão de TI (riscos, contratos, projetos, incidentes, serviços e infraestrutura) | Existência de área de TI (90,8% / 45,0%) |
| B9B | TIC Governo Eletrônico (CETIC.br) | Contratação de serviços de computação em nuvem | Existência de área de TI (90,8% / 45,0%) |
| G2 | TIC Governo Eletrônico (CETIC.br) | Capacitação sobre a LGPD para funcionários de TI | Existência de área de TI (90,8% / 45,0%) |
| F2C e F2C_A a F2C_F | TIC Governo Eletrônico (CETIC.br) | Áreas monitoradas pelo centro de operações municipal | Existência de centro de operações: 32,6% das prefeituras |
| H7 e H7_C a H7_I | TIC Educação (CETIC.br) | Temas abordados nas atividades de formação continuada dos professores | Participação em formação continuada nos últimos 12 meses: 53,5% dos professores |
| G1, G2A | TIC Domicílios (CETIC.br) | Uso de serviço público pela Internet e resolução sem deslocamento | Usuários de Internet de 16 anos ou mais: 83,8% da população dessa faixa etária |

### Suspensões por medida não reproduzível

Indicadores retirados do índice porque o valor nacional não pode ser reproduzido a partir de dados oficiais publicados. Retornam quando a fonte publicar os insumos necessários.

| Variável | Fonte | Descrição | Motivo | Condição de retorno |
|----------|-------|-----------|--------|---------------------|
| B10, C5_F, C15B, D1, D2, D4B, E1A, E5C1 | TIC Cultura (CETIC.br) | Wi-Fi gratuito ao público; lista de produtos ou serviços no website; inscrição ou venda de ingressos online; posse de acervo; digitalização do acervo; disponibilização de conteúdo digital na Internet; uso de inteligência artificial; responsável pela proteção de dados (LGPD) | A planilha oficial de 2024 não publica total nacional; o valor antes divulgado era média simples não ponderada entre os sete tipos de equipamento cultural. No caso de D1, possuir acervo é ainda condição institucional, não capacidade digital | Total oficial, pesos amostrais ou microdados |
| BLF02 | ANATEL | Densidade de acessos de banda larga fixa por 100 domicílios | O denominador domiciliar não provinha de fonte oficial versionada nem de fórmula reproduzível | Numerador e denominador oficiais versionados (ANATEL + IBGE) |

### Substituições de identidade

Casos em que a variável anterior foi aposentada e o conceito passou a ser medido por outra identidade do catálogo.

| Variável anterior | Fonte | O que mudou |
|-------------------|-------|-------------|
| C9A | TIC Governo Eletrônico (CETIC.br) | A pergunta media a exigência de qualquer login ou cadastro, sem direção monotônica de qualidade; a adoção de identidade digital passou a ser medida por `C9B_A` (uso do login único Gov.br) |
| MUNIC_ACESS_TEXTO_ALT | MUNIC (IBGE) | O campo da fonte corresponde, na identidade oficial, ao título descritivo da página exibido na aba do navegador (critério WCAG 2.4.2); recadastrado como `PAGINA_POSSUI_TITULO`, ativo na bateria de acessibilidade |
| MUNIC_ACESS_CAPTCHA | MUNIC (IBGE) | O campo da fonte registra apenas o uso de CAPTCHA, sem indicar alternativa acessível nem direção positiva de qualidade; recadastrado como `USA_CAPTCHA`, mantido apenas como série descritiva |
| ESTADIC_INOVACAO_DIGITAL | ESTADIC (IBGE) | Chave composta decomposta nas quatro perguntas oficiais do questionário: `ESTADIC_ESPACO_INOVACAO`, `ESTADIC_CAPACIT_EMPREEND`, `ESTADIC_PREMIO_INOVACAO` e `ESTADIC_BILHETE_UNICO`, todas ativas |
| F3A | TIC Governo Eletrônico (CETIC.br) | Decomposto em quatro itens (bilhete eletrônico, GPS em ônibus, iluminação conectada e semáforos controlados à distância), mantidos fora do índice por duplicarem os indicadores `MUNIC_SMART_BILHETE`, `MUNIC_SMART_GPS_ONIBUS`, `MUNIC_SMART_ILUMINACAO` e `MUNIC_SMART_SEMAFOROS`, medidos pela MUNIC 2024 com cobertura censitária e recorte de capitais |
| G110GP, G113GP | iGovSISP (SGD/MGI) | Duas perguntas de percepção — a priorização da TI na elaboração da PLOA e a prioridade dada à inovação — retiradas por estarem fora da seleção canônica do autodiagnóstico |
| E1_A a E1_D (letras físicas) | TIC Governo Eletrônico (CETIC.br) | A identidade por letra física foi substituída por identidades semânticas (`E1_EMAIL` a `E1_CHATBOT`), porque as letras divergem entre os questionários de órgãos e de prefeituras; os sete membros ativos formam a bateria de formas de contato |

### Aderência ao escopo ENGD

Variáveis cuja permanência no índice foi reavaliada contra a Portaria SGD/MGI nº 4.248/2024 e excluídas por não corresponderem a recomendação ENGD do objetivo em que estavam classificadas, ou de nenhum dos 10 objetivos.

| Variável | Fonte | Descrição | Motivo | Ação futura |
|----------|-------|-----------|--------|-------------|
| C5 | TIC Governo Eletrônico (CETIC.br) | Recursos multimídia no website (áudio/vídeo/lives, 3 sub-itens A-C) | Mede produção de conteúdo multimídia, não a oferta ou qualidade de serviços digitais ao cidadão — fora do escopo do Obj 2 (Qualidade dos Serviços Digitais) | Sem ação prevista |
| E5 | TIC Saúde (CETIC.br) | O gestor possui formação em informática em saúde? | Mede formação individual dos gestores respondentes, não capacidade do estabelecimento de saúde | Reavaliar em caso de publicação por estabelecimento |
| MUNIC_COMUNICACAO | MUNIC (IBGE) | A prefeitura possui estrutura organizacional para a área de comunicação? | Estrutura de comunicação institucional não corresponde a recomendação ENGD em nenhum objetivo. ENGD trata de comunicação digital de governo apenas indiretamente (Obj 2 — qualidade de serviços). | Sem ação prevista |
| MUNIC_DEV_SOFTWARE | MUNIC (IBGE) | A prefeitura desenvolve software para atender necessidade específica? | Capacidade-meio de produção interna sem âncora em recomendação ENGD. Recs 6.1 e 8.5 favorecem soluções compartilhadas sobre desenvolvimento isolado; rec 8.7 trata de metodologia ágil, não da existência de desenvolvimento. | Sem ação prevista |
| MUNIC_DEV_SOFTWARE_CIDADAO | MUNIC (IBGE) | A prefeitura desenvolve software para atendimento à sociedade? | Idem MUNIC_DEV_SOFTWARE. | Sem ação prevista |
| ESTADIC_DESENV_SOFTWARE | ESTADIC (IBGE) | Desenvolvimento de software nos últimos 12 meses (interno e/ou para sociedade) | Idem MUNIC_DEV_SOFTWARE, na visão estadual. | Sem ação prevista |

### Redundância (compósitos cujos componentes já estão no índice)

| Variável | Fonte | Descrição | Motivo |
|----------|-------|-----------|--------|
| IOSPD_GERAL | ABEP-TIC | Índice geral IOSPD (média das 5 dimensões) | Compósito de DIM1-5; 54 indicadores individuais desagregados |
| IOSPD_DIM1 | ABEP-TIC | Dimensão Capacidades (compósito I.1-I.13) | Compósito de 13 indicadores, desagregados individualmente |
| IOSPD_DIM2 | ABEP-TIC | Dimensão Serviços (compósito II.1-II.12) | Compósito de 12 indicadores, desagregados individualmente |
| IOSPD_DIM3 | ABEP-TIC | Dimensão Normatização (compósito III.1-III.7 + III.1a-d) | Compósito de 11 indicadores, desagregados individualmente |
| IOSPD_DIM4 | ABEP-TIC | Dimensão Linguagem Simples (compósito IV.1-IV.9) | Compósito de 9 indicadores, desagregados individualmente |
| IOSPD_DIM5 | ABEP-TIC | Dimensão Inovação (compósito V.1-V.9) | Compósito de 9 indicadores, desagregados individualmente |
| IOSPD_I02 | ABEP-TIC | Percentual de uso da plataforma única (I.2) | Saturado em zero: todas 27 UFs nota 0 em 2025 |
| IOSPD_III01 | ABEP-TIC | Regulamentação pilares Lei 13.460/2017 (III.1) | Compósito-pai de III.1a-d; variância zero |
| iGovTI | iESGo (TCU) | Índice composto GovernancaTI + iGestTI | Compósito de subíndices; toda a fonte saiu do índice pela regra de manter apenas variáveis individuais |
| GovernancaTI | iESGo (TCU) | Subíndice de governança estratégica de TI | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| DIM_LIDERANCA | iESGo (TCU) | Sub-dimensão Liderança de GovernancaTI | Sub-dimensão do subíndice GovernancaTI, ele próprio excluído pela mesma regra |
| DIM_ESTRATEGIA | iESGo (TCU) | Sub-dimensão Estratégia de GovernancaTI | Sub-dimensão do subíndice GovernancaTI, ele próprio excluído pela mesma regra |
| iESGo_LGPD | iESGo (TCU) | Proxy de LGPD (cópia do indicador de continuidade/controle) | Dupla contagem: cópia literal de iESGo_CONT |
| iESGo_CONT | iESGo (TCU) | Dimensão Continuidade mapeada à coluna Cont do TCU | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| iESGo_SEG | iESGo (TCU) | Dimensão Segurança derivada de proxy | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| EstruturaSegInfo | iESGo (TCU) | Subíndice de estrutura de segurança da informação | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| ProcessoSegInfo | iESGo (TCU) | Subíndice de processo de segurança da informação | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| RiscosTISegInfo | iESGo (TCU) | Subíndice de riscos de TI e segurança da informação | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| GerirSolucoes | iESGo (TCU) | Subíndice de capacidade em gerir desenvolvimento de soluções e inovação (prática 4260) | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| PlanejamentoTI | iESGo (TCU) | Subíndice de planejamento de TI | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| ServicosTI | iESGo (TCU) | Subíndice de gestão de serviços de TI | Subíndice composto de terceiros; o índice mantém apenas variáveis individuais |
| iGovSustentAmb | iESGo (TCU) | Sustentabilidade ambiental (PLS, resíduos, energia) | Fora do escopo ENGD — sem componente digital (critério iii) |
| iGovSustentSocial | iESGo (TCU) | Sustentabilidade social (diversidade, anti-assédio, acessibilidade) | Fora do escopo ENGD — sem componente digital relevante (critério iii) |

---

### Redundância — rodada de decisão de junho/2026 (auditoria por objetivo)

A revisão de redundância conduzida em junho de 2026 excluiu 49 variáveis, aplicando cinco critérios, na ordem: entre duas medidas do mesmo objeto, fica a censitária e mais atual; entre degraus logicamente encaixados da mesma prática, fica o mais geral; entre degraus práticos de exigência, fica o mais exigente; entre pergunta guarda-chuva e seus detalhamentos, fica o guarda-chuva; entre prática em funcionamento e prática apenas normatizada, fica o funcionamento. Uma rodada anterior da mesma auditoria já havia excluído os subíndices compostos do iESGo (listados na seção anterior) e `igovsisp/G106GPM`, incluída na tabela abaixo pelo mesmo fundamento de redundância. Exclusões daquela rodada posteriormente revertidas ou recadastradas — os itens C6B_A a C6B_E, hoje ativos como bateria de recursos móveis, e as formas de contato da família E1, reativadas com identidades semânticas — não constam da tabela.

| Variável | Fonte | Pergunta | Fundamento |
|---|---|---|---|
| `igovsisp/G106GPM` | iGovSISP/SGD | iGovSISP: O órgão estimou a quantidade ideal de pessoal por competência considerando necessidades futuras e fatores críticos de sucesso? (autodiagnóstico SISP, sim_nao) | Redundância clara com igovsisp/G106GPL: mesma bateria, respondente e objeto (dimensionamento de pessoal no PDTIC); GPL retida por maior granularidade (grupo 1.1) |
| `igovsisp/G106GPA` | iGovSISP/SGD | iGovSISP: A organização possui PDTIC vigente, nos termos da Portaria nº 778/2019, formalmente instituído pelo CGD ou estrutura equivalente? (autodiagnóstico SISP, sim_nao) | Degrau lógico de igovsisp/G106GPE (publicar pressupõe possuir; retido o mais exigente) (caso 5.1) |
| `munic/MUNIC_LAI_AUTORID_MONIT` | MUNIC/IBGE | A legislação municipal da LAI prevê autoridade de monitoramento para sua implementação? | Item de conteúdo da lei captada por munic/MUNIC_LAI_LEI (retido o mais geral) (caso 5.2) |
| `munic/MUNIC_LAI_ORGAO_CENTRAL` | MUNIC/IBGE | A legislação municipal da LAI prevê órgão central de monitoramento das ações relativas ao acesso à informação pública? | Item de conteúdo da lei captada por munic/MUNIC_LAI_LEI (retido o mais geral) (caso 5.2) |
| `munic/MUNIC_LAI_PRAZO_20D` | MUNIC/IBGE | A legislação municipal da LAI estabelece prazo de atendimento de pedido de acesso à informação pública igual ou inferior a 20 dias corridos? | Item de conteúdo da lei captada por munic/MUNIC_LAI_LEI (retido o mais geral) (caso 5.2) |
| `munic/MUNIC_LAI_RELATORIO` | MUNIC/IBGE | A legislação municipal da LAI prevê a divulgação de relatório de monitoramento com informações estatísticas dos pedidos de acesso à informação pública? | Item de conteúdo da lei captada por munic/MUNIC_LAI_LEI (retido o mais geral) (caso 5.2) |
| `tic_cultura/D8` | TIC Cultura | A instituição cultural possui catálogo online do acervo acessível ao público? (B7A questionário) | Degrau lógico de tic_cultura/D1 (catálogo online pressupõe acervo catalogado; retido o mais geral) e par empírico com D4B/D5A (caso 5.3) |
| `censo_escolar/IN_BANDA_LARGA` | Censo Escolar/INEP | A escola possui acesso à Internet por banda larga? (variável binária, Censo Escolar INEP) | Degrau lógico de censo_escolar/IN_INTERNET (banda larga pressupõe Internet; retido o mais geral) (caso 5.4) |
| `igovsisp/G220SPD` | iGovSISP/SGD | iGovSISP: O órgão possui Plano de Gestão de Vulnerabilidades? (autodiagnóstico SISP, likert) | Escada prática com igovsisp/G210SPD (plano formal × prática efetiva; retida a prática) (caso 5.5) |
| `igovsisp/G501CTI` | iGovSISP/SGD | iGovSISP: Acerca da Instrução Normativa SGD/MGI nº 06, de 29 de março de 2023 (incluindo sua alteração pela Instrução Normativa SGD/MGI nº 86, de 25 de julho de 2025), que regulamenta os requisitos e procedimentos para aprovação de contratações ou de formação de atas de registro de preços, a serem efetuados por órgãos e entidades integrantes do SISP, relativos a bens e serviços de tecnologia da informação e comunicação – TIC, o seu órgão (autodiagnóstico SISP, conhece_utiliza) | Escada prática com igovsisp/G502CTI (normativos sucessivos da mesma política de contratações; retido G502CTI) (caso 5.6) |
| `estadic/ESTADIC_ORCAM_LOCAL` | ESTADIC/IBGE | Local de disponibilização de informações orçamentárias (página na internet, portal transparência, outro website) | Escada prática com estadic/ESTADIC_ORCAM_TEMPO_REAL (publicar × publicar em tempo real; retido o mais exigente) (caso 5.7) |
| `tic_saude/B0` | TIC Saúde | Neste estabelecimento, existe um sistema eletrônico para registro das informações dos pacientes? (C1_1 questionário) | Escada prática com tic_saude/B1 (ter sistema × manter só em meio eletrônico; retido o mais exigente) (caso 5.8) |
| `munic/MUNIC_PROTOCOLO_APP` | MUNIC/IBGE | A prefeitura permite abertura de solicitação/protocolo por aplicativo? | Canal específico do guarda-chuva munic/MUNIC_ATEND_DISTANCIA (retido o geral) (caso 6.2) |
| `munic/MUNIC_PROTOCOLO_REDES` | MUNIC/IBGE | A prefeitura permite abertura de solicitação/protocolo por redes sociais? | Canal específico do guarda-chuva munic/MUNIC_ATEND_DISTANCIA (retido o geral) (caso 6.2) |
| `munic/MUNIC_PROTOCOLO_TELEFONE` | MUNIC/IBGE | A prefeitura permite abertura de solicitação/protocolo por telefone? | Canal específico do guarda-chuva munic/MUNIC_ATEND_DISTANCIA (retido o geral) (caso 6.2) |
| `munic/MUNIC_PROTOCOLO_WEBSITE` | MUNIC/IBGE | A prefeitura permite abertura de solicitação/protocolo pelo website? | Canal específico do guarda-chuva munic/MUNIC_ATEND_DISTANCIA (retido o geral) (caso 6.2) |
| `munic/MUNIC_ACAO_CURSOS` | MUNIC/IBGE | A prefeitura oferece cursos de informática para a população? | Ação específica do guarda-chuva munic/MUNIC_INCLUSAO_DIGITAL (retido o geral) (caso 6.3) |
| `munic/MUNIC_ACAO_PC_ESCOLAS` | MUNIC/IBGE | A prefeitura disponibiliza computadores em escolas públicas com acesso à internet? | Ação específica do guarda-chuva munic/MUNIC_INCLUSAO_DIGITAL (retido o geral) (caso 6.3) |
| `munic/MUNIC_ACAO_QUIOSQUE` | MUNIC/IBGE | A prefeitura disponibiliza quiosque ou balcão informatizado? | Ação específica do guarda-chuva munic/MUNIC_INCLUSAO_DIGITAL (retido o geral) (caso 6.3) |
| `munic/MUNIC_ACAO_TELECENTRO` | MUNIC/IBGE | A prefeitura disponibiliza acesso público gratuito à Internet (telecentro)? | Ação específica do guarda-chuva munic/MUNIC_INCLUSAO_DIGITAL (retido o geral) (caso 6.3) |
| `munic/MUNIC_ACAO_WIFI_ESCOLAS` | MUNIC/IBGE | A prefeitura disponibiliza Wi-Fi em escolas públicas? | Ação específica do guarda-chuva munic/MUNIC_INCLUSAO_DIGITAL (retido o geral) (caso 6.3) |
| `tic_gov/H3C` | TIC Governo Eletrônico | O órgão utilizou inteligência artificial generativa (IA generativa)? | Aprofundamento do geral tic_gov/H3 (IA generativa é detalhe do uso de IA; retido o geral) (caso 6.4) |
| `munic/MUNIC_PARTICIP_CONSULTA` | MUNIC/IBGE | A prefeitura disponibilizou consulta pública online? | Item específico do guarda-chuva munic/MUNIC_PARTICIPACAO (retido o geral) (caso 6.5) |
| `munic/MUNIC_PARTICIP_ENQUETE` | MUNIC/IBGE | A prefeitura disponibilizou enquete online? | Item específico do guarda-chuva munic/MUNIC_PARTICIPACAO (retido o geral) (caso 6.5) |
| `munic/MUNIC_PARTICIP_FORUM` | MUNIC/IBGE | A prefeitura disponibilizou fóruns de discussão online? | Item específico do guarda-chuva munic/MUNIC_PARTICIPACAO (retido o geral) (caso 6.5) |
| `munic/MUNIC_PARTICIP_VOTACAO` | MUNIC/IBGE | A prefeitura disponibilizou votação online? | Item específico do guarda-chuva munic/MUNIC_PARTICIPACAO (retido o geral) (caso 6.5) |
| `iospd/IOSPD_III05` | IOSPD/ABEP-TIC | Princípios para Governo Digital e Eficiência Pública foram normatizados pelo Governo Estadual/Distrital? | Lado normatizado do par com iospd/IOSPD_I10 (priorizado o funcionamento) (caso 7.1) |
| `iospd/IOSPD_III03` | IOSPD/ABEP-TIC | O funcionamento do Portal Único/Portal de Serviços foi regulamentado pelo Governo Estadual/Distrital? | Lado normatizado do par com iospd/IOSPD_I01 (priorizado o funcionamento) (caso 7.2) |
| `iospd/IOSPD_III04` | IOSPD/ABEP-TIC | O uso de assinaturas eletrônicas em interações com entes públicos foi normatizado pelo Governo Estadual/Distrital? | Lado normatizado do par com iospd/IOSPD_I09 (priorizado o funcionamento) (caso 7.3) |
| `igovsisp/G106GPF` | iGovSISP/SGD | iGovSISP: O órgão possui formas ou mecanismos para monitorar as ações do PDTIC vigente? (autodiagnóstico SISP, sim_nao) | Ângulo do acompanhamento do PDTIC absorvido por igovsisp/G106GPS (grau de execução) (caso 8.2) |
| `igovsisp/G106GPJ` | iGovSISP/SGD | iGovSISP: O CGD acompanhou a execução de ações e contratações do Plano de Metas, inclusive resultados intermediários e efetivo atendimento das necessidades priorizadas no PDTIC? (autodiagnóstico SISP, sim_nao) | Ângulo do acompanhamento do PDTIC absorvido por igovsisp/G106GPS (grau de execução) (caso 8.2) |
| `igovsisp/G106GPK` | iGovSISP/SGD | iGovSISP: O CGD aprovou e acompanhou o plano de monitoramento, avaliação, relatório de acompanhamento e relatório de resultados do PDTIC? (autodiagnóstico SISP, sim_nao) | Ângulo do acompanhamento do PDTIC absorvido por igovsisp/G106GPS (grau de execução) (caso 8.2) |
| `iospd/IOSPD_I13` | IOSPD/ABEP-TIC | Possui Portal específico para a disponibilização de Dados Abertos? | Mesmo objeto de estadic/ESTADIC_PORTAL_TRANSP na visão Estadual (retido o ESTADIC, mais geral) (caso 8.3) |
| `tic_cultura/D5A` | TIC Cultura | Por quais canais a instituição cultural disponibiliza seu acervo digital? (B5 questionário) | Par empírico r_niv=+0,98 com tic_cultura/D8 ('remover ambas') e sobreposição com D4B (anotação redundancia-candidatos, caso 9.8) |
| `pnad_tic/V4091` | PNAD TIC | Nos últimos 3 meses, o(a) sr(a) utilizou a Internet? (PNAD Contínua TIC, IBGE) | Par empírico r_niv=+0,99 com pnad_tic/V4080 (retida a medida domiciliar) (anotação redundancia-candidatos) |
| `tic_cultura/B5` | TIC Cultura | A instituição cultural utiliza a Internet? (A9 questionário) | Par empírico r_niv=+1,00 com tic_cultura/B10 (retido B10 por proximidade temática) (anotação redundancia-candidatos) |
| `censo_escolar/TP_REDE_LOCAL` | Censo Escolar/INEP | A escola possui rede local sem fio (Wi-Fi)? (derivado de TP_REDE_LOCAL, Censo Escolar INEP) | Pares empíricos r_niv≥0,93 com IN_INTERNET_APRENDIZAGEM e tic_educacao/B1 ('remover wi-fi') (anotação redundancia-candidatos) |
| `tic_educacao/B1` | TIC Educação | A escola possui computador de mesa, portátil ou tablet? (P10 questionário) | Redundância clara com censo_escolar/IN_COMPUTADOR (censo INEP retido) (seção 1) |
| `tic_educacao/A1` | TIC Educação | A escola possui acesso à Internet? (P8 questionário) | Redundância clara com censo_escolar/IN_INTERNET (censo INEP retido) (seção 1) |
| `tic_gov/F2A` | TIC Governo Eletrônico | A prefeitura possui centro de operações ou controle urbano? | Redundância clara com munic/MUNIC_SMART_CENTRO_CONTROLE (censo IBGE 2024 retido) (seção 1) |
| `tic_gov/C7_B` | TIC Governo Eletrônico | A prefeitura oferece wi-fi em espaços públicos? (C7 item B) | Redundância clara com munic/MUNIC_WIFI_PUBLICO (censo IBGE 2024 retido) (seção 1) |

## A.2 Variáveis excluídas do índice estadual

### Variáveis ESTADIC excluídas (25)

Das 53 variáveis ESTADIC catalogadas, 25 foram excluídas e 28 permanecem ativas. Uma chave composta de inovação foi aposentada e decomposta nas quatro perguntas oficiais do questionário, todas ativas (ver "Substituições de identidade" na Seção A.1). Das excluídas, duas (`ESTADIC_WIFI_COBERTURA` e `ESTADIC_INCLUSAO_ACOES`) saíram por salto condicional (ver Seção 3.3.5); duas (`ESTADIC_DESENV_SOFTWARE` e `ESTADIC_ORCAM_LOCAL`) por aderência ao escopo ENGD e redundância, documentadas na Seção A.1. As demais 21, listadas abaixo com o código da coluna original do XLSX do IBGE e o código correspondente no catálogo, por critérios de seleção:

| # | Código XLSX | Código no catálogo | Pergunta real IBGE | Critério | Justificativa |
|---|-------------|--------------------|--------------------| ---------|---------------|
| 1 | Etic07 | ESTADIC_PESSOAL_TI_VINCULO | Composição de pessoal da área de TI por vínculo | (vii) | Detalhe operacional de RH |
| 2 | Etic18 | ESTADIC_INCLUSAO_PARCERIAS | Parcerias para programas de inclusão/educação digital | (i) | Detalhe de implementação; programa captado por Etic17 |
| 3 | Etic30 | ESTADIC_PESSOAL_COMUNICACAO | Composição de pessoal da área de comunicação por vínculo | (iii)+(vii) | Fora do escopo e detalhe operacional |
| 4 | Etic31 | ESTADIC_CARREIRA_COMUNICACAO | Carreira ou cargo específico de comunicação social | (iii) | Fora do escopo ENGD |
| 5 | Etic32 | ESTADIC_FUNCOES_COMUNICACAO | Funções da área de comunicação | (iii) | Mede funções de comunicação, não governo digital |
| 6 | Etic331 | ESTADIC_SERVICOS_COMUNICACAO | Serviços de comunicação contratados por licitação | (iii)+(vii) | Fora do escopo e detalhe de contratação |
| 7 | Etic33 | ESTADIC_LICITACAO_COMUNICACAO | Licitações para contratar serviços de comunicação | (vii) | Detalhe operacional |
| 8 | Etic34 | ESTADIC_MODALIDADES_LICITACAO_COM | Modalidades de licitação para serviços de comunicação | (i)+(vii) | Detalhe técnico de modalidade licitatória |
| 9 | Etic36 | ESTADIC_ORCAMENTO_COMUNICACAO | Finalidades do orçamento destinado a comunicação | (vii) | Política interna de alocação orçamentária |
| 10 | Egov012 | ESTADIC_LAI_LOCAL_PUBLICACAO | Local de publicação da legislação LAI | (i) | Detalhe irrelevante (apenas 2 sub-itens) |
| 11 | Egov11 | ESTADIC_CTRL_INT_SECRETARIA | Secretaria associada ao controle interno | (vii) | Vinculação administrativa |
| 12 | Egov17 | ESTADIC_CTRL_INT_CARREIRA | Carreira específica de auditor/controlador interno | (iii) | Fora do escopo de governo digital |
| 13 | Egov18 | ESTADIC_CTRL_INT_AREAS | Áreas de atuação do controle interno | (iii) | Controle interno genérico |
| 14 | Egov19 | ESTADIC_CTRL_INT_FUNCOES | Funções do sistema de controle interno | (iii) | Funções genéricas |
| 15 | Egov20 | ESTADIC_CTRL_INT_TEMPORAL | Características temporais das ações de controle interno | (iii)+(vii) | Fora do escopo e detalhe operacional |
| 16 | Egov21 | ESTADIC_CTRL_INT_IRREGULARIDADES | Comunicação de irregularidades pelo controle interno | (iii) | Fora do escopo ENGD |
| 17 | Egov22 | ESTADIC_CTRL_INT_PROCESSOS | Processos administrativos originados no controle interno | (iii) | Fora do escopo ENGD |
| 18 | Egov25 | ESTADIC_CTRL_INT_OCORRENCIAS | Ocorrências originadas no controle interno | (iii) | Fora do escopo ENGD |
| 19 | Egov27 | ESTADIC_CONSELHO_CARATER | Caráter do conselho de transparência | (vii) | Detalhe operacional do formato |
| 20 | Egov30 | ESTADIC_CONSELHO_CAPACITACAO | Capacitação dos membros do conselho de transparência | (i)+(vii) | Detalhe de implementação |
| 21 | Egov311 | ESTADIC_CONSELHO_INFRA | Infraestrutura disponibilizada para o conselho | (vii) | Detalhe operacional de infraestrutura física |

**Resumo:** 11 variáveis por fora do escopo ENGD (iii); 11 por detalhe operacional (vii); 4 por detalhe técnico irrelevante (i). As menções somam 26 porque 5 das 21 variáveis acumulam dois critérios.

### Fontes excluídas por medirem indicadores indiretos

O recorte estadual exclui integralmente as fontes cujos dados por UF medem outros atores, e não o governo estadual: a TIC Governo Eletrônico (CETIC.br), cujos recortes por UF agregam prefeituras municipais; o Censo Escolar (INEP), que mede infraestrutura TIC das escolas; e a PNAD Contínua TIC (IBGE), que mede acesso domiciliar e individual à Internet. A remoção é parcialmente compensada pela desagregação do IOSPD, que trouxe cobertura para os Objetivos 3, 4, 5 e 7 no índice estadual.

### Redundância e saturação — IOSPD

| Variável | Fonte | Descrição | Motivo |
|----------|-------|-----------|--------|
| IOSPD_GERAL | ABEP-TIC | Índice geral IOSPD (média das 5 dimensões) | Compósito de DIM1-5; 54 indicadores desagregados |
| IOSPD_DIM1 | ABEP-TIC | Dimensão Capacidades (compósito I.1-I.13) | Compósito, desagregado individualmente |
| IOSPD_DIM2 | ABEP-TIC | Dimensão Serviços (compósito II.1-II.12) | Compósito, desagregado individualmente |
| IOSPD_DIM3 | ABEP-TIC | Dimensão Normatização (compósito III.1-III.7 + III.1a-d) | Compósito, desagregado individualmente |
| IOSPD_DIM4 | ABEP-TIC | Dimensão Linguagem Simples (compósito IV.1-IV.9) | Compósito, desagregado individualmente |
| IOSPD_DIM5 | ABEP-TIC | Dimensão Inovação (compósito V.1-V.9) | Compósito, desagregado individualmente |
| IOSPD_I02 | ABEP-TIC | Percentual de uso da plataforma única (I.2) | Saturado em zero |
| IOSPD_III01 | ABEP-TIC | Regulamentação pilares Lei 13.460/2017 (III.1) | Compósito-pai de III.1a-d; variância zero |

---

## A.3 Variáveis excluídas do índice de capitais

| Variável | Código | Critério | Justificativa |
|----------|:------:|:--------:|---------------|
| Densidade banda larga fixa | BLF02 | (ix) | Sem dados municipais — densidade apenas nacional; no recorte nacional, o indicador também está suspenso até numerador e denominador provirem de fontes oficiais versionadas (ver Seção A.1) |
| Pessoal TI por vínculo | Mtic071-078 | (vii) | Detalhe operacional de RH |
| Frequência redes sociais | Mtic15 | (i) | Detalhe técnico; categórica não-binária |
| Canais acompanhamento solicitação | Mtic181-186 | (iv) | Redundante com canais de protocolo (Mtic17X) |
| Wi-Fi gratuito/cobrado | Mtic23 | (i) | Detalhe de modelo de negócio |
| Cobertura Wi-Fi | Mtic241-244 | (i) | Detalhe técnico de cobertura |
| Pessoal comunicação por vínculo | Mtic321-328 | (vii) | Detalhe operacional de RH |
| Carreira comunicação social | Mtic33 | (vii) | Detalhe operacional |
| Funções comunicação | Mtic343-347 | (vii) | Funções internas genéricas (LAI/LGPD já extraídos) |
| Licitações comunicação | Mtic35, Mtic3511-35111 | (vii) | Processo interno de compras |
| Modalidades licitação | Mtic361-368 | (vii) | Processo interno de compras |
| Canal TV/rádio | Mtic37 | (vi) | Tecnologia de comunicação tradicional |
| Orçamento comunicação | Mtic381-387 | (vii) | Detalhe operacional financeiro |
| Consulta prévia (Q12b) | Mtic12b4 | (i) | Detalhe técnico de processo |
| Cadastro fornecedores (Q12b) | Mtic12b5 | (iii) | Fora do escopo de serviço ao cidadão |
| Emissão alvará (Q12b) | Mtic12b7 | (iv) | Redundante com emissão licenças |
| Emissão licenças/certidões (Q12b) | Mtic12b12 | (iv) | Redundante com certidão negativa |
| Parceria doadores equip. (Q21) | Mtic213 | (vii) | Detalhe operacional de parcerias |
| Outras ações inclusão (Q21) | Mtic217 | (v) | Categoria genérica 'outras' |
| Protocolo outro website | Mtic173 | (i) | Detalhe técnico menor |
| Plataformas individuais (FB, IG...) | Mtic131-138 | (vi) | Plataforma específica; já capturado por MUNIC_REDES_SOCIAIS |
