import type { Ente } from '@/data/indicators'
import { variaveisPorTematica } from './mock-map'

/** Hash determinístico (FNV-1a) → [0, 1). */
function seeded(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967295
}

/**
 * Score mock 0–100 da tag para um ente.
 * Âncora nos sub-índices cobertos (não no índice geral) + variação por tag.
 * Substituir por agregado pronto do Gabriel.
 */
export function notaTematica(ente: Ente, tagSlug: string): number {
  const cobertos = ente.objetivos
    .filter(o => o.nota != null && o.numero !== 3)
    .map(o => o.nota as number)
  const ancora =
    cobertos.length > 0
      ? cobertos.reduce((a, n) => a + n, 0) / cobertos.length
      : 50
  const vars = variaveisPorTematica[tagSlug] ?? []
  const n = Math.max(vars.length, 1)
  let soma = 0
  for (let i = 0; i < n; i++) {
    const key = vars[i]?.slug ?? `${tagSlug}|${i}`
    const delta = (seeded(`${ente.slug}|${key}`) - 0.5) * 24
    soma += Math.min(100, Math.max(0, ancora + delta))
  }
  return Math.round((soma / n) * 10) / 10
}

export function rankingTematico(
  entes: Ente[],
  tagSlug: string
): { slug: string; nome: string; valor: number; posicao: number }[] {
  return [...entes]
    .map(e => ({
      slug: e.slug,
      nome: e.nome,
      valor: notaTematica(e, tagSlug),
    }))
    .sort((a, b) => b.valor - a.valor)
    .map((e, i) => ({ ...e, posicao: i + 1 }))
}
