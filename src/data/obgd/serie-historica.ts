import 'server-only'

import { fonteById } from './load'
import type { SerieHistoricaPonto } from './types'

const MAX_PONTOS = 6

function hashSeed(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** PRNG determinístico (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function anosDaFonte(fonteId: string, anoAtual: number): number[] {
  const fonte = fonteById.get(fonteId)
  const disponiveis = (fonte?.anos_disponiveis ?? [])
    .filter(a => a <= anoAtual)
    .sort((a, b) => a - b)

  if (disponiveis.length > 0) {
    const slice = disponiveis.slice(-MAX_PONTOS)
    if (!slice.includes(anoAtual)) {
      return [...slice.filter(a => a < anoAtual), anoAtual].slice(-MAX_PONTOS)
    }
    return slice
  }

  // Fallback: série anual nos últimos anos até anoAtual.
  const anos: number[] = []
  for (let i = MAX_PONTOS - 1; i >= 0; i--) {
    anos.push(anoAtual - i)
  }
  return anos
}

/**
 * Série histórica por indicador × ente.
 *
 * Hoje: gerador mock determinístico (último ponto = valor real do snapshot).
 * Swap futuro: filtrar `indicador_valor` multi-ano por chave + ente e mapear
 * para `{ ano, valor: valor_normalizado }`.
 */
export function getSerieHistorica(args: {
  indicadorChave: string
  fonteId: string
  enteCodigo: string
  anoAtual: number
  valorAtual: number
}): SerieHistoricaPonto[] {
  const { indicadorChave, fonteId, enteCodigo, anoAtual, valorAtual } = args
  const anos = anosDaFonte(fonteId, anoAtual)
  const valorFinal = round1(valorAtual)

  if (anos.length === 0) {
    return [{ ano: anoAtual, valor: valorFinal }]
  }
  if (anos.length === 1) {
    return [{ ano: anos[0], valor: valorFinal }]
  }

  const rand = mulberry32(hashSeed(`${indicadorChave}|${enteCodigo}`))
  const n = anos.length
  const valores: number[] = new Array(n)
  valores[n - 1] = valorFinal

  // Walk reverso a partir do valor atual.
  for (let i = n - 2; i >= 0; i--) {
    const delta = (rand() - 0.45) * 18
    valores[i] = round1(clamp(valores[i + 1] - delta, 0, 100))
  }

  return anos.map((ano, i) => ({ ano, valor: valores[i] }))
}
