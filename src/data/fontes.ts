export type Fonte = {
  slug: string
  name: string
  /** Site oficial do órgão. */
  url: string
  descricao: string
}

/**
 * Catálogo institucional das páginas `/metodologia/fontes/[slug]`.
 * Downloads de microdados brutos não são oferecidos — apenas link ao portal
 * e CSV curado dos indicadores OBGD (`/api/obgd/export?metodologiaSlug=`).
 */
export const fontes: Fonte[] = [
  {
    slug: 'cetic-br',
    name: 'CETIC.br',
    url: 'https://cetic.br/',
    descricao:
      'Centro Regional de Estudos para o Desenvolvimento da Sociedade da Informação, responsável por pesquisas sobre acesso e uso das tecnologias de informação e comunicação no Brasil.',
  },
  {
    slug: 'mgi',
    name: 'Ministério da Gestão e Inovação (MGI)',
    url: 'https://www.gov.br/gestao/pt-br',
    descricao:
      'Órgão responsável pela política de transformação digital do governo federal e pela coordenação da Estratégia Nacional de Governo Digital (ENGD).',
  },
  {
    slug: 'gov-br',
    name: 'Gov.br / SGD',
    url: 'https://www.gov.br/governodigital/pt-br',
    descricao:
      'Plataforma e Secretaria de Governo Digital — serviços digitais, identidade e painéis de satisfação do cidadão.',
  },
  {
    slug: 'tcu',
    name: 'Tribunal de Contas da União (TCU)',
    url: 'https://portal.tcu.gov.br/',
    descricao:
      'Tribunal de Contas da União, responsável por avaliações de governança e pelo índice iESGo de órgãos federais.',
  },
  {
    slug: 'ibge',
    name: 'IBGE',
    url: 'https://www.ibge.gov.br/',
    descricao:
      'Instituto Brasileiro de Geografia e Estatística — pesquisas estruturais (MUNIC, ESTADIC) e PNAD Contínua TIC.',
  },
  {
    slug: 'inep',
    name: 'INEP',
    url: 'https://www.gov.br/inep/',
    descricao:
      'Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira — Censo Escolar e indicadores de educação.',
  },
  {
    slug: 'anatel',
    name: 'ANATEL',
    url: 'https://www.gov.br/anatel/',
    descricao:
      'Agência Nacional de Telecomunicações — dados de conectividade e telecomunicações.',
  },
  {
    slug: 'abep-tic',
    name: 'ABEP-TIC',
    url: 'https://abep.org.br/',
    descricao:
      'Associação Brasileira de Entidades Estaduais de Tecnologia da Informação e Comunicação — índice IOSPD.',
  },
  {
    slug: 'cgu',
    name: 'CGU',
    url: 'https://www.gov.br/cgu/',
    descricao:
      'Controladoria-Geral da União — transparência, acesso à informação e integridade no setor público.',
  },
]

export function getFonte(slug: string): Fonte | undefined {
  return fontes.find(f => f.slug === slug)
}
