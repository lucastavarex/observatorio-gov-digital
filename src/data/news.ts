export interface NewsArticle {
  title: string
  excerpt: string
  date: string
  source: string
  category: string
  href: string
}

export const newsArticles: NewsArticle[] = [
  {
    title:
      'Observatório lança novo Índice de Maturidade Digital dos Municípios',
    excerpt:
      'A nova edição avalia mais de 5.500 municípios em serviços digitais, transparência e infraestrutura, com dados abertos para consulta...',
    date: '26 JUN 2026',
    source: 'Agência Brasil',
    category: 'Indicadores',
    href: 'https://agenciabrasil.ebc.com.br',
  },
  {
    title: 'gov.br ultrapassa 150 milhões de usuários cadastrados',
    excerpt:
      'A plataforma unificada de serviços públicos consolida-se como principal porta de entrada do cidadão para os serviços do governo federal...',
    date: '24 JUN 2026',
    source: 'Convergência Digital',
    category: 'Serviços',
    href: 'https://www.convergenciadigital.com.br',
  },
  {
    title: 'Ranking 2026: os estados que mais avançaram em governo digital',
    excerpt:
      'Confira quais unidades da federação lideraram os ganhos de maturidade digital no último ano e o que impulsionou esse avanço...',
    date: '20 JUN 2026',
    source: 'TeleSíntese',
    category: 'Ranking',
    href: 'https://telesintese.com.br',
  },
  {
    title: 'Nova metodologia de avaliação de transparência pública',
    excerpt:
      'O Observatório atualiza os critérios de mensuração de transparência ativa e passiva, alinhando-se às melhores práticas internacionais...',
    date: '15 JUN 2026',
    source: 'Poder360',
    category: 'Transparência',
    href: 'https://www.poder360.com.br',
  },
  {
    title: 'Relatório anual de transformação digital no setor público',
    excerpt:
      'Documento reúne os principais indicadores, tendências e recomendações para a próxima década da administração pública digital no país...',
    date: '10 JUN 2026',
    source: 'Valor Econômico',
    category: 'Publicações',
    href: 'https://valor.globo.com',
  },
  {
    title:
      'Inteligência artificial na administração pública: panorama e desafios',
    excerpt:
      'Análise sobre a adoção de IA em órgãos públicos, os ganhos de eficiência já observados e os cuidados éticos e de governança necessários...',
    date: '04 JUN 2026',
    source: 'Estadão',
    category: 'Análise',
    href: 'https://www.estadao.com.br',
  },
  {
    title: 'Painel de dados abertos do governo supera 2 milhões de acessos',
    excerpt:
      'Ferramenta de visualização de dados públicos ganha tração entre pesquisadores, jornalistas e gestores em busca de informação confiável...',
    date: '28 MAI 2026',
    source: 'MobileTime',
    category: 'Serviços',
    href: 'https://www.mobiletime.com.br',
  },
  {
    title: 'Estudo aponta avanço da acessibilidade digital em portais públicos',
    excerpt:
      'Levantamento mostra que sites de governo evoluíram em conformidade com as diretrizes de acessibilidade, mas persistem barreiras importantes...',
    date: '22 MAI 2026',
    source: 'JOTA',
    category: 'Indicadores',
    href: 'https://www.jota.info',
  },
  {
    title: 'Assinatura eletrônica gov.br cresce 40% em um ano',
    excerpt:
      'O uso da assinatura digital gratuita se expande em documentos e serviços, reduzindo custos e a necessidade de deslocamento do cidadão...',
    date: '18 MAI 2026',
    source: 'TI Inside',
    category: 'Serviços',
    href: 'https://tiinside.com.br',
  },
  {
    title: 'Tribunais de Contas ampliam uso de dados abertos na fiscalização',
    excerpt:
      'Integração de bases públicas permite cruzamento automático de informações e torna o controle de gastos mais ágil e transparente...',
    date: '12 MAI 2026',
    source: 'CNN Brasil',
    category: 'Transparência',
    href: 'https://www.cnnbrasil.com.br',
  },
  {
    title: 'Especialistas debatem governança de dados no setor público',
    excerpt:
      'Seminário reúne academia e governo para discutir privacidade, interoperabilidade e o uso responsável de dados na administração pública...',
    date: '07 MAI 2026',
    source: 'Núcleo',
    category: 'Análise',
    href: 'https://nucleo.jor.br',
  },
  {
    title: 'Observatório publica guia de boas práticas para APIs públicas',
    excerpt:
      'Documento orienta órgãos na disponibilização de APIs padronizadas, seguras e bem documentadas para ampliar a integração de serviços...',
    date: '03 MAI 2026',
    source: 'Agência Gov',
    category: 'Publicações',
    href: 'https://agenciagov.ebc.com.br',
  },
]

export const newsCategories = [
  'Todas',
  'Indicadores',
  'Serviços',
  'Ranking',
  'Transparência',
  'Publicações',
  'Análise',
]
