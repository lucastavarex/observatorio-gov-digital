import 'server-only'

import detalhesCapitais from './assets/detalhes_capitais.json'
import detalhesEstadual from './assets/detalhes_estadual.json'
import detalhesNacional from './assets/detalhes_nacional.json'
import type { DetalheRow } from './types'

export const detalhesNacionalRows = detalhesNacional as DetalheRow[]
export const detalhesEstadualRows = detalhesEstadual as DetalheRow[]
export const detalhesCapitaisRows = detalhesCapitais as DetalheRow[]

export function detalhesForNivel(
  nivel: 'nacional' | 'uf' | 'capital'
): DetalheRow[] {
  if (nivel === 'nacional') return detalhesNacionalRows
  if (nivel === 'uf') return detalhesEstadualRows
  return detalhesCapitaisRows
}
