export interface Publication {
  title: string
  excerpt: string
  date: string
  category: string
  href: string
}

export const publications: Publication[] = [
  {
    title: 'Maturidade digital nos municípios: o que os dados revelam',
    excerpt:
      'Análise aprofundada dos resultados do Índice de Maturidade Digital, com destaque para os fatores que explicam o avanço das capitais...',
    date: '28 JUN 2026',
    category: 'Artigos',
    href: '#',
  },
  {
    title: 'Interoperabilidade como motor da transformação digital',
    excerpt:
      'Como a integração de bases e serviços entre entes federados reduz burocracia e melhora a experiência do cidadão nos serviços públicos...',
    date: '21 JUN 2026',
    category: 'Artigos',
    href: '#',
  },
  {
    title: 'Relatório Anual de Governo Digital 2026',
    excerpt:
      'Documento consolida os principais indicadores, rankings e tendências da transformação digital no setor público brasileiro no último ano...',
    date: '15 JUN 2026',
    category: 'Relatórios',
    href: '#',
  },
  {
    title: 'Transformação Digital do Setor Público Brasileiro',
    excerpt:
      'Obra de referência que reúne fundamentos, estudos de caso e caminhos para a modernização da gestão pública por meio da tecnologia...',
    date: '10 JUN 2026',
    category: 'Livros',
    href: '#',
  },
  {
    title: 'Seminário Anual do Observatório 2026',
    excerpt:
      'Encontro reúne academia, governo e sociedade civil para debater os rumos do governo digital e apresentar os resultados do ano...',
    date: '05 JUN 2026',
    category: 'Eventos',
    href: '#',
  },
  {
    title: 'Como funciona o Índice de Maturidade Digital',
    excerpt:
      'Vídeo explicativo apresenta a metodologia, as dimensões avaliadas e como interpretar as pontuações de cada ente federado...',
    date: '30 MAI 2026',
    category: 'Vídeos',
    href: '#',
  },
  {
    title: 'Panorama da Transparência Pública nos Estados',
    excerpt:
      'Relatório mapeia o nível de transparência ativa e passiva nas unidades da federação, com recomendações práticas de melhoria...',
    date: '24 MAI 2026',
    category: 'Relatórios',
    href: '#',
  },
  {
    title: 'Governo orientado a dados: da coleta à decisão',
    excerpt:
      'Artigo discute como a governança de dados apoia decisões baseadas em evidências e amplia a capacidade analítica do setor público...',
    date: '18 MAI 2026',
    category: 'Artigos',
    href: '#',
  },
  {
    title: 'Fundamentos de Governo Digital',
    excerpt:
      'Livro introdutório sobre conceitos, políticas e instrumentos que estruturam a agenda de governo digital no Brasil e no mundo...',
    date: '12 MAI 2026',
    category: 'Livros',
    href: '#',
  },
  {
    title: 'Entrevista: o futuro dos serviços públicos digitais',
    excerpt:
      'Conversa com especialistas sobre inteligência artificial, identidade digital e os próximos passos da transformação do Estado...',
    date: '06 MAI 2026',
    category: 'Vídeos',
    href: '#',
  },
  {
    title: 'Workshop: Dados Abertos na Prática',
    excerpt:
      'Oficina hands-on para gestores e pesquisadores sobre publicação, catalogação e reuso de dados abertos governamentais...',
    date: '29 ABR 2026',
    category: 'Eventos',
    href: '#',
  },
  {
    title: 'Boletim de Indicadores — 2º Trimestre 2026',
    excerpt:
      'Síntese trimestral com a evolução dos principais indicadores de governo digital nos níveis federal, estadual e municipal...',
    date: '22 ABR 2026',
    category: 'Relatórios',
    href: '#',
  },
]

export const publicationCategories = [
  'Todas',
  'Artigos',
  'Livros',
  'Eventos',
  'Vídeos',
  'Relatórios',
]
