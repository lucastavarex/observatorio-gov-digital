import type { NivelKey } from '@/data/indicators'
import { estadosMapa } from '@/lib/geo/brasil-mapa'

// Nome do estado → UF (derivado do próprio mapa).
const ufPorEstado = new Map(estadosMapa.map(e => [e.nome, e.uf]))

// Capital → UF (nível municipal usa as capitais como entes).
const ufPorCapital: Record<string, string> = {
  'São Paulo': 'SP',
  Curitiba: 'PR',
  Florianópolis: 'SC',
  Brasília: 'DF',
  'Belo Horizonte': 'MG',
  Vitória: 'ES',
  'Porto Alegre': 'RS',
  'Rio de Janeiro': 'RJ',
  Goiânia: 'GO',
  Recife: 'PE',
  Fortaleza: 'CE',
  Salvador: 'BA',
  'Campo Grande': 'MS',
  Cuiabá: 'MT',
  Natal: 'RN',
  'João Pessoa': 'PB',
  Aracaju: 'SE',
  Palmas: 'TO',
  Maceió: 'AL',
  'Porto Velho': 'RO',
  Teresina: 'PI',
  Manaus: 'AM',
  Belém: 'PA',
  'São Luís': 'MA',
  'Rio Branco': 'AC',
  Macapá: 'AP',
  'Boa Vista': 'RR',
}

/** UF (sigla) correspondente a um ente, para posicioná-lo no mapa do Brasil. */
export function ufDeEnte(nivel: NivelKey, nome: string): string | null {
  if (nivel === 'estadual') return ufPorEstado.get(nome) ?? null
  if (nivel === 'municipal') return ufPorCapital[nome] ?? null
  return null
}

/** Caminho da bandeira SVG em `/public/bandeiras/{nivel}/{slug}.svg`. */
export function bandeiraSrc(nivel: NivelKey, slug: string): string {
  return `/bandeiras/${nivel}/${slug}.svg`
}
