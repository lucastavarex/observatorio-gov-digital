import 'server-only'

import { detalhesForNivel } from './detalhes'
import { FONTE_URLS } from './fonte-urls'
import { fonteById, indicadorByChave } from './load'
import { getNivel, type NivelKey, slugify } from './queries'
import type { DataNivel, DetalheRow } from './types'

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function detalheCategoriaKey(dataNivel: DataNivel, codigo: string): string {
  if (dataNivel === 'nacional') return 'Total'
  return codigo
}

function conceptIdOf(row: DetalheRow): string {
  return row.concept_id || `${row.fonte}/${row.indicador}`
}

export type TagVariavelComNotas = {
  slug: string
  nome: string
  fonte: string
  fonteUrl: string
  conceptId: string
  subItens: string | null
  notas: Record<string, number | null>
}

export function variaveisDaTagPorEntes(opts: {
  nivelKey: NivelKey
  enteSlugs: string[]
  tagId: string
}): TagVariavelComNotas[] {
  const nivel = getNivel(opts.nivelKey)
  if (!nivel) return []

  const entes = opts.enteSlugs
    .map(slug => nivel.entes.find(e => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
  if (entes.length === 0) return []

  const detalhes = detalhesForNivel(nivel.dataNivel)
  const byConcept = new Map<
    string,
    {
      row: DetalheRow
      notas: Record<string, number | null>
    }
  >()

  for (const ente of entes) {
    const cat = detalheCategoriaKey(nivel.dataNivel, ente.codigo)
    for (const row of detalhes) {
      if (row.categoria !== cat) continue
      const chave = `${row.fonte}/${row.indicador}`
      const meta = indicadorByChave.get(chave)
      if (!meta?.tags?.includes(opts.tagId)) continue
      const conceptId = conceptIdOf(row)
      const mapKey = `${conceptId}|${row.sub_itens ?? ''}`
      const cur = byConcept.get(mapKey) ?? {
        row,
        notas: Object.fromEntries(entes.map(e => [e.slug, null])),
      }
      cur.notas[ente.slug] = round1(row.valor_normalizado)
      byConcept.set(mapKey, cur)
    }
  }

  const out: TagVariavelComNotas[] = []
  for (const { row, notas } of byConcept.values()) {
    const chave = `${row.fonte}/${row.indicador}`
    const meta = indicadorByChave.get(chave)
    const fonteMeta = fonteById.get(row.fonte)
    const fonteLabel = fonteMeta
      ? `${fonteMeta.nome} (${fonteMeta.instituicao})`
      : row.fonte
    out.push({
      slug: slugify(`${row.fonte}-${row.indicador}-${row.sub_itens ?? ''}`),
      nome: row.descricao || meta?.descricao || row.indicador,
      fonte: fonteLabel,
      fonteUrl: FONTE_URLS[row.fonte] ?? 'https://www.gov.br/',
      conceptId: conceptIdOf(row),
      subItens: row.sub_itens,
      notas,
    })
  }

  out.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  return out
}
