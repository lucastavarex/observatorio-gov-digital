/**
 * Variáveis do painel de índice por nível × objetivo (pré-agregado).
 * Client-safe — não importa detalhes_*.json.
 */

import raw from './assets/variaveis-por-objetivo-nivel.json'
import type { NivelKey } from './queries'

export type VariavelDoRecorte = {
  id: string
  nome: string
  fonte: string
}

type Payload = Record<NivelKey, Record<string, VariavelDoRecorte[]>>

const data = raw as Payload

/** Variáveis únicas usadas no índice deste nível × objetivo (painel detalhes_*). */
export function variaveisDoObjetivoNoNivel(
  nivel: NivelKey,
  objetivoNumero: number
): VariavelDoRecorte[] {
  if (!Number.isFinite(objetivoNumero) || objetivoNumero < 1) return []
  return data[nivel]?.[String(objetivoNumero)] ?? []
}
