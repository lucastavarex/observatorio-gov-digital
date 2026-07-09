export type Recommendation = {
  label: string
  text: string
}

export type Objective = {
  slug: string
  title: string
  summary: string
  description: string
  recommendations: Recommendation[]
}

export const objectives: Objective[] = [
  {
    slug: 'gestao-e-governanca',
    title: 'Governança do Governo Digital',
    summary:
      'Qualificar a gestão e governança das políticas de governo digital, promovendo a colaboração entre União, Distrito Federal, estados e municípios.',
    description:
      'Qualificar a gestão e governança das políticas de governo digital, promovendo a colaboração entre União, Distrito Federal, estados e municípios. Uma estratégia com amplitude nacional e capilaridade em todos os municípios demanda diretrizes concretas para sua institucionalização e governança, articulando uma atuação em rede, replicável nas escalas regionais e locais, para estabelecer políticas de estado para a transformação digital dos governos, com sustentabilidade e previsão de recursos.',
    recommendations: [
      {
        label: 'Recomendação 1.1',
        text: 'Contribuir com a criação, participação e subsídio às atividades de redes nacionais, estaduais, regionais e associativas de políticas públicas de inovação e governo digital, com destaque para a Rede GOV.BR e seu Comitê Consultivo.',
      },
      {
        label: 'Recomendação 1.2',
        text: 'Diversificar e indicar as fontes de financiamento da transformação digital, considerando a perenidade e a disponibilidade dos recursos.',
      },
      {
        label: 'Recomendação 1.3',
        text: 'Elaborar, publicar e implementar uma estratégia de governo digital adequada à realidade territorial e alinhada à Estratégia Nacional de Governo Digital.',
      },
      {
        label: 'Recomendação 1.4',
        text: 'Implementar uma estrutura de governança para as políticas de governo digital, com a designação de área responsável e instâncias colegiadas para acompanhamento e monitoramento da estratégia local.',
      },
      {
        label: 'Recomendação 1.5',
        text: 'Prever as ações de governo digital nos instrumentos de planejamento e orçamento do ciclo de políticas públicas (PPA, LDO, LOA), além de planos de governo.',
      },
    ],
  },
  {
    slug: 'qualidade-dos-servicos-publicos',
    title: 'Qualidade dos Serviços Digitais',
    summary:
      'Aprimorar a qualidade dos serviços públicos com abordagem inclusiva, acessível, proativa e em canais integrados de atendimento, com atenção à experiência dos usuários.',
    description:
      'Aprimorar a qualidade dos serviços públicos com abordagem inclusiva, acessível, proativa e em canais integrados de atendimento, com atenção à experiência dos usuários. A avaliação e a experiência do usuário devem orientar a eficiência governamental e intensificar a entrega de valor.',
    recommendations: [
      {
        label: 'Recomendação 2.1',
        text: 'Desenhar serviços com linguagem simplificada, acessibilidade e jornada personalizada, aprimorando a experiência do usuário, com prioridade para populações vulneráveis.',
      },
      {
        label: 'Recomendação 2.2',
        text: 'Implementar ações de melhoria dos serviços públicos prestados, com base nos resultados da avaliação de satisfação e pesquisa direta com os usuários dos serviços, usando indicadores e modelagens padronizadas.',
      },
      {
        label: 'Recomendação 2.3',
        text: 'Disponibilizar serviços em canais digitais, preferencialmente por meio de autosserviço, e sem prejuízo do direito a atendimento presencial.',
      },
      {
        label: 'Recomendação 2.4',
        text: 'Integrar os canais digitais de prestação de serviços públicos e de comunicação, preferencialmente consolidando portais e aplicativos de dispositivos móveis.',
      },
      {
        label: 'Recomendação 2.5',
        text: 'Integrar os serviços públicos em diversidade de canais digitais e físicos, dispondo de canais de atendimento presencial para demandas não resolvidas plenamente pelos serviços públicos digitais.',
      },
    ],
  },
  {
    slug: 'identidade-unica-do-cidadao',
    title: 'Identificação Única',
    summary:
      'Implementar e manter solução estruturante de identificação única e nacional, com ampla disponibilidade e validade para todos os entes federados.',
    description:
      'Implementar e manter solução estruturante de identificação única e nacional, com ampla disponibilidade e validade para todos os entes federados. A identidade digital única funciona como conexão entre o mundo físico e o digital nos serviços públicos, reduzindo fraudes e burocracia.',
    recommendations: [
      {
        label: 'Recomendação 3.1',
        text: 'Integrar os serviços públicos digitais ao mecanismo de autenticação digital da Plataforma GOV.BR.',
      },
      {
        label: 'Recomendação 3.2',
        text: 'Integrar os serviços públicos para disponibilizar ferramentas de assinatura eletrônica, incluindo o mecanismo da Plataforma GOV.BR.',
      },
      {
        label: 'Recomendação 3.3',
        text: 'Integrar todos os órgãos estaduais de emissão de identidade civil ao Serviço de Identificação do Cidadão.',
      },
      {
        label: 'Recomendação 3.4',
        text: 'Participar das definições e desenvolvimento de ferramentas cooperativas para implementação do Serviço de Identificação Civil em canais físicos e digitais.',
      },
      {
        label: 'Recomendação 3.5',
        text: 'Prover aos cidadãos repositórios digitais de documentos e informações, preferencialmente integrado à Plataforma GOV.BR.',
      },
      {
        label: 'Recomendação 3.6',
        text: 'Regulamentar o uso de assinaturas eletrônicas nas interações internas e com a sociedade.',
      },
      {
        label: 'Recomendação 3.7',
        text: 'Utilizar o número de inscrição no CPF como identificador suficiente do cidadão nos cadastros públicos.',
      },
    ],
  },
  {
    slug: 'privacidade-e-seguranca',
    title: 'Segurança e LGPD',
    summary:
      'Ampliar a resiliência e a maturidade das estruturas tecnológicas governamentais com atenção à privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética.',
    description:
      'Ampliar a resiliência e a maturidade das estruturas tecnológicas governamentais com atenção à privacidade, proteção de dados pessoais, segurança da informação e segurança cibernética. Um mundo cada vez mais digitalizado demanda proteção crescente para resguardar dados de cidadãos e governos contra ameaças cibernéticas, garantindo conformidade com requisitos de segurança e privacidade.',
    recommendations: [
      {
        label: 'Recomendação 4.1',
        text: 'Instituir estrutura de governança e coordenação para implementação de medidas de fortalecimento em privacidade, proteção de dados, segurança da informação e cibernética, articulando-se com estruturas regionais e nacionais, especialmente o PPSI do governo federal.',
      },
      {
        label: 'Recomendação 4.2',
        text: 'Estabelecer plano de ação contemplando diagnóstico, controles, metodologias e soluções tecnológicas adequadas aos riscos identificados em privacidade, proteção de dados, segurança da informação e cibernética.',
      },
      {
        label: 'Recomendação 4.3',
        text: 'Designar encarregado pelo tratamento de dados pessoais e gestor de segurança da informação.',
      },
      {
        label: 'Recomendação 4.4',
        text: 'Promover sensibilização, conscientização e capacitação para agentes públicos, lideranças e sociedade, sendo o CEPS Gov.br a unidade de referência.',
      },
      {
        label: 'Recomendação 4.5',
        text: 'Contribuir com a criação e a participação em redes nacionais de prevenção, tratamento e resposta a incidentes cibernéticos, sendo o CISC Gov.br a unidade de referência.',
      },
    ],
  },
  {
    slug: 'inteligencia-de-dados',
    title: 'Dados e Interoperabilidade',
    summary:
      'Qualificar a tomada de decisões e a oferta de serviços nas organizações públicas com o reuso constante e de forma ética dos dados disponíveis para análises, interoperabilidade e personalização.',
    description:
      'Qualificar a tomada de decisões e a oferta de serviços nas organizações públicas com o reuso constante e de forma ética dos dados disponíveis para análises, interoperabilidade e personalização. A estratégia propõe eliminar a necessidade de os cidadãos reunirem documentos que o governo já possui, reduzindo a burocracia e permitindo um governo proativo, que atenda antes mesmo da solicitação.',
    recommendations: [
      {
        label: 'Recomendação 5.1',
        text: 'Elaborar, publicar e implementar um programa de governança de dados.',
      },
      {
        label: 'Recomendação 5.2',
        text: 'Estabelecer e adotar mecanismos de interoperabilidade e compartilhamento de dados entre órgãos e demais entes federados, especialmente através da Plataforma GOV.BR, para melhorar políticas públicas e eliminar solicitações desnecessárias.',
      },
      {
        label: 'Recomendação 5.3',
        text: 'Contribuir para a elaboração e adotar modelo de compartilhamento que permita o uso seguro dos dados do cidadão, melhorando a experiência no acesso a serviços.',
      },
      {
        label: 'Recomendação 5.4',
        text: 'Estimular a catalogação de dados para promover a descoberta e o reuso.',
      },
      {
        label: 'Recomendação 5.5',
        text: 'Estimular o uso ético de análise e ciência de dados na tomada de decisão de políticas públicas e na personalização de serviços.',
      },
    ],
  },
  {
    slug: 'infraestrutura-digital',
    title: 'Infraestrutura',
    summary:
      'Dispor de infraestrutura moderna, segura, escalável e robusta para a implantação e evolução de soluções de governo digital, promovendo soluções estruturantes compartilhadas.',
    description:
      'Dispor de infraestrutura moderna, segura, escalável e robusta para a implantação e evolução de soluções de governo digital, promovendo soluções estruturantes compartilhadas, uso de padrões comuns e a integração entre os entes federados. A infraestrutura que sustenta os serviços públicos digitais inclui conectividade, plataformas, capacidade de processamento, armazenamento e padrões tecnológicos.',
    recommendations: [
      {
        label: 'Recomendação 6.1',
        text: 'Adotar e contribuir com o desenvolvimento de soluções de plataformas digitais no provimento de serviços públicos e demais processos da administração pública.',
      },
      {
        label: 'Recomendação 6.2',
        text: 'Adotar e contribuir para a formação de arranjos colaborativos de disponibilização de infraestrutura e soluções digitais, fomentando inclusive a participação das empresas públicas de tecnologia da informação nesses arranjos.',
      },
      {
        label: 'Recomendação 6.3',
        text: 'Prover opções de conectividade pública, para acesso gratuito e facilitado a soluções de prestação de serviço digital pela sociedade, especialmente utilizando a estrutura de canais de atendimento presencial e outros prédios e equipamentos públicos.',
      },
      {
        label: 'Recomendação 6.4',
        text: 'Estabelecer iniciativas para prover e qualificar o acesso a infraestruturas de rede, especialmente as de grande tráfego, para maior eficiência de trabalho em prédios e equipamentos públicos, considerando inclusive parcerias e programas nacionais voltados para essa finalidade.',
      },
      {
        label: 'Recomendação 6.5',
        text: 'Definir uma estratégia adequada para armazenamento de dados, levando em conta a economicidade, segurança, soberania e resiliência, com atenção especial às condições dos data centers em uso.',
      },
    ],
  },
  {
    slug: 'ecossistema-de-inovacao',
    title: 'Inovação e Tecnologias Emergentes',
    summary:
      'Estimular e fomentar o desenvolvimento do ecossistema de inovação e de governo digital, envolvendo todos os entes federados e a sociedade, gerando novas oportunidades.',
    description:
      'Estimular e fomentar o desenvolvimento do ecossistema de inovação e de governo digital, envolvendo todos os entes federados e a sociedade, gerando novas oportunidades. Busca-se criar um ambiente propício que reúna setor público, empresas, centros de pesquisa, aceleradoras e sociedade civil, com foco nas necessidades dos cidadãos e nas potencialidades governamentais.',
    recommendations: [
      {
        label: 'Recomendação 7.1',
        text: 'Contribuir com a criação, participação e subsídio das atividades de redes nacionais, estaduais, regionais e associativas de políticas públicas de inovação em governo, especialmente da Rede InovaGOV e da Rede GOV.BR.',
      },
      {
        label: 'Recomendação 7.2',
        text: 'Desenvolver mecanismos que permitam parcerias com o setor privado e organizações não governamentais para transformação digital, com destaque para startups voltadas a soluções de valor público (Govtechs).',
      },
      {
        label: 'Recomendação 7.3',
        text: 'Implementar laboratórios de inovação como espaços abertos à participação e colaboração da sociedade no desenvolvimento de ideias, ferramentas e métodos inovadores para gestão pública e prestação de serviços.',
      },
      {
        label: 'Recomendação 7.4',
        text: 'Mapear e desenvolver casos de uso de tecnologias baseadas em inteligência artificial e tecnologias emergentes, com atenção à capacitação dos agentes envolvidos e a cuidados éticos no uso.',
      },
      {
        label: 'Recomendação 7.5',
        text: 'Utilizar compras públicas como mecanismo fomentador de inovação, especialmente através de compras públicas de inovação e inovação aberta.',
      },
      {
        label: 'Recomendação 7.6',
        text: 'Utilizar infraestrutura tecnológica que facilite o uso de dados de acesso público e promova a interação segura entre diversos agentes, estimulando inovação, atividade econômica e prestação de serviços à população.',
      },
    ],
  },
  {
    slug: 'eficiencia-e-colaboracao',
    title: 'Eficiência e Processos',
    summary:
      'Otimizar e promover a eficiência dos processos das organizações públicas por meio da racionalização de procedimentos e compartilhamento de soluções para problemas comuns.',
    description:
      'Otimizar e promover a eficiência dos processos das organizações públicas por meio da racionalização de procedimentos e compartilhamento de soluções para problemas comuns. Busca-se abandonar perspectivas analógicas e adotar uma lógica digital que maximize o valor da informação e a interoperabilidade.',
    recommendations: [
      {
        label: 'Recomendação 8.1',
        text: 'Adotar e desenvolver soluções de compras públicas de forma integrada e compartilhada, em portais padronizados, alinhadas à legislação federal.',
      },
      {
        label: 'Recomendação 8.2',
        text: 'Adotar metodologias de cálculo de impacto econômico, social e ambiental para mensuração dos efeitos da transformação digital, divulgando os resultados periodicamente.',
      },
      {
        label: 'Recomendação 8.3',
        text: 'Adotar padrões e boas práticas estabelecidas para a contratação de serviços de tecnologia, garantindo o máximo de interoperabilidade.',
      },
      {
        label: 'Recomendação 8.4',
        text: 'Implementar sistemas de processos administrativos eletrônicos compatíveis com o Processo Eletrônico Nacional (PEN), proporcionando segurança jurídica e eficiência.',
      },
      {
        label: 'Recomendação 8.5',
        text: 'Disponibilizar soluções tecnológicas de uso comum em plataforma aberta, com uma abordagem de compartilhamento com outros entes federados.',
      },
      {
        label: 'Recomendação 8.6',
        text: 'Inovar na gestão com arranjos organizacionais mais integrados, baseados nos modelos de serviços compartilhados.',
      },
      {
        label: 'Recomendação 8.7',
        text: 'Revisar, simplificar e digitalizar processos e rotinas de trabalho com foco na eficiência e na qualidade da entrega, adotando metodologias ágeis.',
      },
    ],
  },
  {
    slug: 'transparencia-e-participacao',
    title: 'Transparência e Participação',
    summary:
      'Contribuir para a ampliação da abertura e da transparência das organizações públicas, para legitimar o controle e a participação social.',
    description:
      'Contribuir para a ampliação da abertura e da transparência das organizações públicas, para legitimar o controle e a participação social. As tecnologias digitais permitem maior transparência das atividades e gastos públicos, abrindo novos canais para a participação cidadã nas decisões governamentais e expandindo dados abertos e meios de controle social.',
    recommendations: [
      {
        label: 'Recomendação 9.1',
        text: 'Implementar instrumentos de participação social e cocriação.',
      },
      {
        label: 'Recomendação 9.2',
        text: 'Instituir canais, espaços e ações para promover a transparência do governo digital.',
      },
      {
        label: 'Recomendação 9.3',
        text: 'Promover a transparência, o acesso à informação e o uso de dados abertos pelos cidadãos.',
      },
    ],
  },
  {
    slug: 'competencias-e-capacitacao',
    title: 'Competências em Governo Digital',
    summary:
      'Desenvolver competências nas pessoas e equipes para consolidar a cultura de governo digital e inovação nas organizações públicas.',
    description:
      'Desenvolver competências nas pessoas e equipes para consolidar a cultura de governo digital e inovação nas organizações públicas. A transformação digital requer desenvolver novos conhecimentos e habilidades, estabelecer uma nova cultura organizacional e fomentar o pensamento digital para melhorar o uso da tecnologia no governo.',
    recommendations: [
      {
        label: 'Recomendação 10.1',
        text: 'Contribuir com a criação, participação e subsídio às atividades de redes nacionais, estaduais, regionais e associativas de capacitação de servidores e lideranças públicas no país em temáticas de governo digital e inovação, em especial das escolas de governo e do programa Capacita GOV.BR.',
      },
      {
        label: 'Recomendação 10.2',
        text: 'Implementar, difundir e participar de capacitações específicas voltadas para abordagens inclusivas na prestação de serviços e políticas públicas, minimamente sobre acessibilidade, linguagem simples, interfaces intuitivas e integração de canais físicos e digitais.',
      },
      {
        label: 'Recomendação 10.3',
        text: 'Instituir ações específicas de capacitação continuada, aprimoramento da gestão e retenção de talentos.',
      },
      {
        label: 'Recomendação 10.4',
        text: 'Realizar e promover a participação em eventos específicos para disseminação de conhecimento a respeito de transformação digital e inovação, em especial aqueles voltados para lideranças e servidores públicos.',
      },
    ],
  },
]

export function getObjective(slug: string): Objective | undefined {
  return objectives.find(objective => objective.slug === slug)
}

export function getObjectiveNumber(slug: string): number {
  return objectives.findIndex(objective => objective.slug === slug) + 1
}
