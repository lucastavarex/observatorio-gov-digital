import { getObjective, objectives } from '@/data/objectives'
import { tematicas } from '@/data/tematicas'

export type RankingModo = 'objetivos' | 'tematicas'

export type RankingNivelFiltro = 'estadual' | 'municipal'

export type RankingFiltros = {
  nivel: RankingNivelFiltro
  por: RankingModo
  objetivo: string
  tema: string
}

const DEFAULTS: RankingFiltros = {
  nivel: 'estadual',
  por: 'objetivos',
  objetivo: objectives[0].slug,
  tema: tematicas[0].slug,
}

export function parseRankingSearchParams(
  sp: URLSearchParams | { get(name: string): string | null }
): RankingFiltros {
  const nivelRaw = sp.get('nivel')
  const nivel: RankingNivelFiltro =
    nivelRaw === 'municipal' ? 'municipal' : 'estadual'

  const por: RankingModo =
    sp.get('por') === 'tematicas' ? 'tematicas' : 'objetivos'

  const objetivoRaw = sp.get('objetivo')
  const objetivo =
    objetivoRaw && getObjective(objetivoRaw) ? objetivoRaw : DEFAULTS.objetivo

  const temaRaw = sp.get('tema')
  const tema =
    temaRaw && tematicas.some(t => t.slug === temaRaw) ? temaRaw : DEFAULTS.tema

  return { nivel, por, objetivo, tema }
}

/** Monta `/ranking?nivel=…&por=…&objetivo|tema=…` para compartilhamento. */
export function rankingHref(filtros: RankingFiltros): string {
  const params = new URLSearchParams()
  params.set('nivel', filtros.nivel)
  params.set('por', filtros.por)
  if (filtros.por === 'objetivos') {
    params.set('objetivo', filtros.objetivo)
  } else {
    params.set('tema', filtros.tema)
  }
  return `/ranking?${params.toString()}`
}
