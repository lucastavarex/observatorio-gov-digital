export type BaseDados = {
  /** Nome do conjunto de dados. */
  nome: string
  /** Breve descrição do que a base contém. */
  descricao: string
  /** Nome do arquivo gerado no download. */
  arquivo: string
  formato: 'CSV' | 'XLSX' | 'ZIP'
  tamanho: string
}

export type Fonte = {
  slug: string
  name: string
  /** Site oficial do órgão. */
  url: string
  descricao: string
  bases: BaseDados[]
}

export const fontes: Fonte[] = [
  {
    slug: 'cetic-br',
    name: 'CETIC.br',
    url: 'https://cetic.br/',
    descricao:
      'Centro Regional de Estudos para o Desenvolvimento da Sociedade da Informação, responsável por pesquisas sobre acesso e uso das tecnologias de informação e comunicação no Brasil.',
    bases: [
      {
        nome: 'TIC Governo Eletrônico',
        descricao:
          'Uso das TIC nos órgãos públicos federais, estaduais e municipais.',
        arquivo: 'tic-governo-eletronico.csv',
        formato: 'CSV',
        tamanho: '3,2 MB',
      },
      {
        nome: 'TIC Domicílios',
        descricao:
          'Acesso e uso da internet e de dispositivos nos domicílios brasileiros.',
        arquivo: 'tic-domicilios.csv',
        formato: 'CSV',
        tamanho: '4,1 MB',
      },
      {
        nome: 'TIC Provedores',
        descricao: 'Perfil dos provedores de acesso à internet no país.',
        arquivo: 'tic-provedores.xlsx',
        formato: 'XLSX',
        tamanho: '1,8 MB',
      },
    ],
  },
  {
    slug: 'mgi',
    name: 'Ministério da Gestão e Inovação (MGI)',
    url: 'https://www.gov.br/gestao/pt-br',
    descricao:
      'Órgão responsável pela política de transformação digital do governo federal e pela coordenação da Estratégia Nacional de Governo Digital (ENGD).',
    bases: [
      {
        nome: 'Índice de Transformação Digital (ITD)',
        descricao:
          'Medição da maturidade digital dos órgãos da administração pública federal.',
        arquivo: 'indice-transformacao-digital.csv',
        formato: 'CSV',
        tamanho: '2,4 MB',
      },
      {
        nome: 'Catálogo de Serviços Públicos',
        descricao:
          'Relação de serviços públicos federais e seu grau de digitalização.',
        arquivo: 'catalogo-servicos-publicos.csv',
        formato: 'CSV',
        tamanho: '5,6 MB',
      },
    ],
  },
  {
    slug: 'gov-br',
    name: 'Gov.br',
    url: 'https://www.gov.br/pt-br',
    descricao:
      'Plataforma unificada de serviços e identidade digital do governo federal, que reúne contas, autenticação e prestação de serviços ao cidadão.',
    bases: [
      {
        nome: 'Contas Gov.br',
        descricao:
          'Quantidade de contas e níveis de verificação (bronze, prata, ouro).',
        arquivo: 'contas-govbr.csv',
        formato: 'CSV',
        tamanho: '2,9 MB',
      },
      {
        nome: 'Avaliações de serviços digitais',
        descricao:
          'Notas de satisfação dos cidadãos sobre os serviços digitais federais.',
        arquivo: 'avaliacoes-servicos-digitais.csv',
        formato: 'CSV',
        tamanho: '3,7 MB',
      },
    ],
  },
  {
    slug: 'tcu',
    name: 'Tribunal de Contas da União (TCU)',
    url: 'https://portal.tcu.gov.br/',
    descricao:
      'Órgão de controle externo que avalia a governança e a gestão pública, incluindo governança de tecnologia da informação.',
    bases: [
      {
        nome: 'Índice de Governança Pública (iGG)',
        descricao:
          'Levantamento de governança e gestão de organizações públicas.',
        arquivo: 'indice-governanca-publica.xlsx',
        formato: 'XLSX',
        tamanho: '6,3 MB',
      },
      {
        nome: 'Levantamento de Governança de TI',
        descricao:
          'Perfil de governança e gestão de tecnologia da informação no setor público.',
        arquivo: 'governanca-ti.csv',
        formato: 'CSV',
        tamanho: '2,1 MB',
      },
    ],
  },
  {
    slug: 'ibge',
    name: 'IBGE',
    url: 'https://www.ibge.gov.br/',
    descricao:
      'Instituto Brasileiro de Geografia e Estatística, principal provedor de informações estatísticas e territoriais sobre estados e municípios.',
    bases: [
      {
        nome: 'ESTADIC',
        descricao:
          'Pesquisa de Informações Básicas Estaduais, incluindo gestão e TI.',
        arquivo: 'estadic.zip',
        formato: 'ZIP',
        tamanho: '8,9 MB',
      },
      {
        nome: 'MUNIC',
        descricao:
          'Pesquisa de Informações Básicas Municipais, incluindo governo digital.',
        arquivo: 'munic.zip',
        formato: 'ZIP',
        tamanho: '12,4 MB',
      },
      {
        nome: 'PNAD Contínua TIC',
        descricao:
          'Acesso à internet e à televisão por domicílio e por pessoa.',
        arquivo: 'pnad-continua-tic.csv',
        formato: 'CSV',
        tamanho: '7,2 MB',
      },
    ],
  },
  {
    slug: 'inep',
    name: 'INEP',
    url: 'https://www.gov.br/inep/pt-br',
    descricao:
      'Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira, responsável por censos e avaliações da educação.',
    bases: [
      {
        nome: 'Censo Escolar — Infraestrutura de TI',
        descricao:
          'Disponibilidade de internet e equipamentos nas escolas de educação básica.',
        arquivo: 'censo-escolar-infraestrutura-ti.zip',
        formato: 'ZIP',
        tamanho: '15,1 MB',
      },
      {
        nome: 'Censo da Educação Superior',
        descricao:
          'Recursos e infraestrutura tecnológica das instituições de ensino superior.',
        arquivo: 'censo-educacao-superior.csv',
        formato: 'CSV',
        tamanho: '9,8 MB',
      },
    ],
  },
  {
    slug: 'anatel',
    name: 'ANATEL',
    url: 'https://www.gov.br/anatel/pt-br',
    descricao:
      'Agência Nacional de Telecomunicações, responsável pela regulação e por dados de conectividade e infraestrutura de telecomunicações.',
    bases: [
      {
        nome: 'Acessos de Banda Larga Fixa',
        descricao: 'Densidade e cobertura de banda larga fixa por município.',
        arquivo: 'banda-larga-fixa.csv',
        formato: 'CSV',
        tamanho: '6,7 MB',
      },
      {
        nome: 'Cobertura Móvel',
        descricao:
          'Cobertura de tecnologias móveis (3G, 4G, 5G) por localidade.',
        arquivo: 'cobertura-movel.csv',
        formato: 'CSV',
        tamanho: '5,3 MB',
      },
    ],
  },
  {
    slug: 'abep-tic',
    name: 'ABEP-TIC',
    url: 'https://abep-tic.org.br/',
    descricao:
      'Associação Brasileira das Entidades Estaduais de TIC, produtora do Índice de Oferta de Serviços Públicos Digitais (IOSPD).',
    bases: [
      {
        nome: 'IOSPD — Índice de Oferta de Serviços Públicos Digitais',
        descricao:
          'Avaliação dos portais estaduais em cinco dimensões de oferta digital.',
        arquivo: 'iospd.xlsx',
        formato: 'XLSX',
        tamanho: '4,5 MB',
      },
    ],
  },
  {
    slug: 'cgu',
    name: 'Controladoria-Geral da União (CGU)',
    url: 'https://www.gov.br/cgu/pt-br',
    descricao:
      'Órgão central de controle interno, transparência e combate à corrupção do governo federal.',
    bases: [
      {
        nome: 'Escala Brasil Transparente (EBT 360)',
        descricao:
          'Avaliação da transparência ativa e passiva de estados e municípios.',
        arquivo: 'ebt-360.csv',
        formato: 'CSV',
        tamanho: '3,4 MB',
      },
      {
        nome: 'e-SIC — Pedidos de Acesso à Informação',
        descricao:
          'Dados dos pedidos de acesso à informação e respectivas respostas.',
        arquivo: 'e-sic-pedidos.zip',
        formato: 'ZIP',
        tamanho: '10,2 MB',
      },
    ],
  },
]

export function getFonte(slug: string): Fonte | undefined {
  return fontes.find(f => f.slug === slug)
}
