import { type NivelKey, niveis } from '@/data/indicators'
import { tematicas } from '@/data/tematicas'

export type IndicadoresModo = 'objetivos' | 'tematicas'

export type IndicadoresFiltros = {
  nivel: NivelKey | null
  entes: string[]
  por: IndicadoresModo
  tema: string | null
}

export const MAX_ENTES_COMPARATIVO = 5

const NIVEIS_VALIDOS = new Set(niveis.map(n => n.key))

function entesValidos(nivelKey: NivelKey, slugs: string[]): string[] {
  const nivel = niveis.find(n => n.key === nivelKey)
  if (!nivel) return []
  const permitidos = new Set(nivel.entes.map(e => e.slug))
  const unicos: string[] = []
  for (const slug of slugs) {
    if (!permitidos.has(slug) || unicos.includes(slug)) continue
    unicos.push(slug)
    if (unicos.length >= MAX_ENTES_COMPARATIVO) break
  }
  // Nível sem ranking (federal): um único ente fixo.
  if (!nivel.isRanking && nivel.entes[0]) {
    return [nivel.entes[0].slug]
  }
  return unicos
}

export function parseIndicadoresSearchParams(
  sp: URLSearchParams | { get(name: string): string | null }
): IndicadoresFiltros {
  const nivelRaw = sp.get('nivel')
  const nivel =
    nivelRaw && NIVEIS_VALIDOS.has(nivelRaw as NivelKey)
      ? (nivelRaw as NivelKey)
      : null

  const por: IndicadoresModo =
    sp.get('por') === 'tematicas' ? 'tematicas' : 'objetivos'

  const temaRaw = sp.get('tema')
  const tema =
    temaRaw && tematicas.some(t => t.slug === temaRaw) ? temaRaw : null

  const entesRaw = sp.get('entes') ?? ''
  const entesBrutos = entesRaw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const entes = nivel ? entesValidos(nivel, entesBrutos) : []

  return { nivel, entes, por, tema }
}

/** Monta `/indicadores?…` para compartilhamento da seleção atual. */
export function indicadoresHref(filtros: IndicadoresFiltros): string {
  const params = new URLSearchParams()
  if (filtros.nivel) {
    params.set('nivel', filtros.nivel)
  }
  if (filtros.entes.length > 0) {
    params.set('entes', filtros.entes.join(','))
  }
  params.set('por', filtros.por)
  if (filtros.por === 'tematicas' && filtros.tema) {
    params.set('tema', filtros.tema)
  }
  const qs = params.toString()
  return qs ? `/indicadores?${qs}` : '/indicadores'
}

/** Normaliza patch (nível federal, limite de entes, tema inválido). */
export function normalizarIndicadoresFiltros(
  filtros: IndicadoresFiltros
): IndicadoresFiltros {
  if (!filtros.nivel) {
    return {
      nivel: null,
      entes: [],
      por: filtros.por,
      tema: filtros.por === 'tematicas' ? filtros.tema : null,
    }
  }
  return {
    nivel: filtros.nivel,
    entes: entesValidos(filtros.nivel, filtros.entes),
    por: filtros.por,
    tema:
      filtros.por === 'tematicas' &&
      filtros.tema &&
      tematicas.some(t => t.slug === filtros.tema)
        ? filtros.tema
        : null,
  }
}
