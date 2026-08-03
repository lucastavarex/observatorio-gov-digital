import type { Ente, Nivel, NivelKey } from '@/data/indicators'
import { tematicas } from './catalog'
import { notaTematica } from './scores'

const NIVEL_LABEL: Record<NivelKey, string> = {
  federal: 'federal',
  estadual: 'estadual',
  municipal: 'municipal',
}

/** `true` se ao menos um ente do conjunto tem score para a tag. */
export function tematicaTemCobertura(entes: Ente[], tagSlug: string): boolean {
  return entes.some(e => notaTematica(e, tagSlug) !== null)
}

/** Cobertura por tag, alinhada a `tematicas`. */
export function tematicasComCobertura(nivel: Nivel): boolean[] {
  return tematicas.map(t => tematicaTemCobertura(nivel.entes, t.slug))
}

export function tematicaSelecionavel(
  tagSlug: string,
  cobertura: boolean[]
): boolean {
  const idx = tematicas.findIndex(t => t.slug === tagSlug)
  if (idx < 0) return false
  return Boolean(cobertura[idx])
}

/** Primeira temática com cobertura no nível; fallback ao primeiro slug do catálogo. */
export function primeiraTematicaSelecionavel(cobertura: boolean[]): string {
  const idx = tematicas.findIndex((_, i) => cobertura[i])
  return tematicas[idx >= 0 ? idx : 0]?.slug ?? tematicas[0].slug
}

export function motivoTematicaDesabilitada(
  nivel: NivelKey,
  temCobertura: boolean
): string | null {
  if (temCobertura) return null
  return `Não há dados suficientes para esta categoria temática no nível ${NIVEL_LABEL[nivel]}.`
}
