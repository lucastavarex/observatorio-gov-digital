export type Tematica = {
  slug: string
  nome: string
}

/**
 * Categorias temáticas transversais (UI do protótipo).
 * Estrutura pronta para expandir a 50–60 tags quando Gabriel/Luiza validarem a lista.
 */
export const tematicas: Tematica[] = [
  { slug: 'pagamentos-digitais', nome: 'Pagamentos digitais' },
  { slug: 'cidades-inteligentes', nome: 'Cidades inteligentes' },
  { slug: 'conectividade', nome: 'Conectividade' },
  { slug: 'identidade-digital', nome: 'Identidade digital' },
  { slug: 'dados-abertos', nome: 'Dados abertos' },
  { slug: 'inteligencia-artificial', nome: 'Inteligência artificial' },
  { slug: 'ciberseguranca', nome: 'Cibersegurança' },
  { slug: 'interoperabilidade', nome: 'Interoperabilidade' },
  { slug: 'servicos-moveis', nome: 'Serviços móveis' },
  { slug: 'nuvem-governamental', nome: 'Nuvem governamental' },
  { slug: 'atendimento-ao-cidadao', nome: 'Atendimento ao cidadão' },
  { slug: 'transparencia', nome: 'Transparência' },
  { slug: 'participacao-social', nome: 'Participação social' },
  { slug: 'capacitacao-digital', nome: 'Capacitação digital' },
  { slug: 'automacao-de-processos', nome: 'Automação de processos' },
  { slug: 'assinatura-eletronica', nome: 'Assinatura eletrônica' },
  { slug: 'inclusao-digital', nome: 'Inclusão digital' },
  { slug: 'governanca-de-dados', nome: 'Governança de dados' },
  { slug: 'infraestrutura-de-ti', nome: 'Infraestrutura de TI' },
  { slug: 'compras-publicas', nome: 'Compras públicas' },
]
