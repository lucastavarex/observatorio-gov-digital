/**
 * Copy dos guided tours de Indicadores e Ranking (pt-BR).
 * Alinhado a GLOSSARIO / decisões de produto: índice por objetivo, sem média geral na UI.
 */

export type TourStepCopy = {
  /** Seletor CSS do alvo (`[data-tour="..."]`). Omitido = popover central. */
  element?: string
  title: string
  description: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

export const INDICADORES_TOUR_STEPS: TourStepCopy[] = [
  {
    element: '[data-tour="indicadores-intro"]',
    title: 'Comparar indicadores',
    description:
      'Aqui você compara até 5 entes nos objetivos da ENGD ou em categorias temáticas. Cada objetivo tem o próprio índice (0–100), não há média geral entre os dez objetivos.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="indicadores-nivel"]',
    title: 'Escolha o nível de governo',
    description:
      'Federal, estadual ou municípios com 100 mil habitantes ou mais. O nível define quais entes entram na comparação.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="indicadores-modo"]',
    title: 'Objetivos ou categorias temáticas',
    description:
      'Compare pelo perfil nos objetivos da ENGD (radar) ou por uma categoria temática (barras). Os dois modos usam indicadores de fontes públicas.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="indicadores-entes"]',
    title: 'Selecione os entes',
    description:
      'Marque até 5 entes para ver no gráfico. A cor de cada um se repete na legenda e nas séries.',
    side: 'right',
    align: 'start',
  },
  {
    element: '[data-tour="indicadores-resultado"]',
    title: 'Como ler o índice',
    description:
      'O índice é a nota de 0 a 100 do ente no objetivo (média simples dos indicadores daquele objetivo). A média do nível serve só de referência, não é um ranking entre objetivos diferentes.',
    side: 'left',
    align: 'start',
  },
  {
    element: '[data-tour="indicadores-ajuda"]',
    title: 'Ajuda sempre à mão',
    description:
      'Ícones de informação e “Entenda o gráfico” explicam conceitos no contexto. Para o método completo, abra Metodologia. Você pode reabrir este tour com “Como funciona”.',
    side: 'top',
    align: 'start',
  },
]

export const RANKING_TOUR_STEPS: TourStepCopy[] = [
  {
    element: '[data-tour="ranking-intro"]',
    title: 'Ranking por objetivo',
    description:
      'Ordene os entes pelo índice de um objetivo da ENGD (ou pelo score de uma categoria temática). Não há média geral entre objetivos nesta plataforma.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="ranking-nivel"]',
    title: 'Escolha o nível de governo',
    description:
      'Estados ou municípios com 100 mil habitantes ou mais entram no ranking. O nível federal tem página própria de detalhe.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="ranking-modo"]',
    title: 'Ordenar por objetivos ou temas',
    description:
      'Use os objetivos da ENGD ou categorias temáticas para definir o critério de ordenação.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="ranking-selecao"]',
    title: 'Escolha o que ordena a lista',
    description:
      'Selecione um objetivo (ou tema). O texto “Este objetivo avalia…” resume o que está sendo medido naquele recorte.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="ranking-variaveis"]',
    title: 'Quais variáveis entram no índice',
    description:
      'O aviso indica quantas variáveis compõem o índice neste nível. Em “Ver quais são” você vê a lista completa com as fontes.',
    side: 'bottom',
    align: 'start',
  },
  {
    element: '[data-tour="ranking-distribuicao"]',
    title: 'Distribuição (e mapa)',
    description:
      'O gráfico mostra quantos entes caem em cada faixa de índice (0–100). No nível estadual, você pode alternar para o mapa do Brasil.',
    side: 'top',
    align: 'start',
  },
  {
    element: '[data-tour="ranking-lista"]',
    title: 'Lista ordenada',
    description:
      'Posição e índice (ou score da tag) de cada ente. Clique no nome para ver o detalhe, radar, objetivos e variáveis.',
    side: 'top',
    align: 'start',
  },
]
