import 'server-only'

import detalhesCapitais from './assets/detalhes_capitais.json'
import detalhesEstadual from './assets/detalhes_estadual.json'
import detalhesMunicipios from './assets/detalhes_municipios.json'
import detalhesNacional from './assets/detalhes_nacional.json'
import type { DataNivel, DetalheRow } from './types'

export const detalhesNacionalRows = detalhesNacional as DetalheRow[]
export const detalhesEstadualRows = detalhesEstadual as DetalheRow[]
export const detalhesCapitaisRows = detalhesCapitais as DetalheRow[]
export const detalhesMunicipiosRows = detalhesMunicipios as DetalheRow[]

export function detalhesForNivel(nivel: DataNivel): DetalheRow[] {
  if (nivel === 'nacional') return detalhesNacionalRows
  if (nivel === 'uf') return detalhesEstadualRows
  if (nivel === 'municipio') return detalhesMunicipiosRows
  return detalhesCapitaisRows
}
