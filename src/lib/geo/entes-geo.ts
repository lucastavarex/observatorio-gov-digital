import { type NivelKey, slugify } from '@/data/indicators'
import { estadosMapa } from '@/lib/geo/brasil-mapa'

// Nome do estado → UF (derivado do próprio mapa).
const ufPorEstado = new Map(estadosMapa.map(e => [e.nome, e.uf]))
const slugPorUf = new Map(
  estadosMapa.map(e => [e.uf, slugify(e.nome)] as const)
)

// Capital → UF (nível Capitais usa as capitais como entes).
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
export function ufDeEnte(
  nivel: NivelKey,
  nome: string,
  ufSigla?: string | null
): string | null {
  if (nivel === 'estadual') return ufPorEstado.get(nome) ?? null
  if (nivel === 'municipal') return ufPorCapital[nome] ?? null
  if (nivel === 'municipios') return ufSigla ?? null
  return null
}

/** Caminho da bandeira SVG em `/public/bandeiras/{nivel}/{slug}.svg`. */
export function bandeiraSrc(
  nivel: NivelKey,
  slug: string,
  ufSigla?: string | null
): string {
  if (nivel === 'municipios' && ufSigla) {
    const ufSlug = slugPorUf.get(ufSigla)
    if (ufSlug) return `/bandeiras/estadual/${ufSlug}.svg`
  }
  const pasta = nivel === 'municipios' ? 'municipal' : nivel
  return `/bandeiras/${pasta}/${slug}.svg`
}
