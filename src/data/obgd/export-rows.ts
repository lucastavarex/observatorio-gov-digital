import 'server-only'

import {
  type ObgdExportRow,
  rowsToCsv,
  slugifyFilename,
} from '@/lib/export-obgd-csv'
import { detalhesForNivel } from './detalhes'
import { ANO_INDICE, enteByCodigo, fonteById } from './load'
import type { NivelKey } from './queries'
import { NIVEL_MAP } from './queries'
import type { DetalheRow } from './types'

export type DataNivel = 'nacional' | 'uf' | 'capital'

const NIVEL_LABEL: Record<DataNivel, string> = {
  nacional: 'nacional',
  uf: 'estadual',
  capital: 'capitais',
}

/** Slug da página Metodologia → ids de fonte no catálogo OBGD. */
export const METODOLOGIA_SLUG_PARA_FONTE_IDS: Record<string, string[]> = {
  'cetic-br': [
    'tic_gov',
    'tic_saude',
    'tic_educacao',
    'tic_cultura',
    'tic_domicilios',
  ],
  tcu: ['iesgo'],
  'abep-tic': ['iospd'],
  anatel: ['anatel'],
  inep: ['censo_escolar'],
  ibge: ['pnad_tic', 'munic', 'estadic'],
  mgi: ['sgd_sat', 'igovsisp'],
  /** Painel Gov.br (sgd_sat) — sem linhas em detalhes_* no snapshot atual. */
  'gov-br': ['sgd_sat'],
  cgu: [],
}

function conceptIdOf(row: DetalheRow): string {
  return row.concept_id || `${row.fonte}/${row.indicador}`
}

function unidadeNome(dataNivel: DataNivel, categoria: string): string {
  if (dataNivel === 'nacional') return 'Brasil'
  if (dataNivel === 'uf') {
    return enteByCodigo.get(categoria)?.nome ?? categoria
  }
  // detalhes_capitais usa UF como categoria
  const capital = [...enteByCodigo.values()].find(
    e => e.tipo === 'capital' && e.uf_sigla === categoria
  )
  return capital?.nome ?? categoria
}

function rowToExport(row: DetalheRow, dataNivel: DataNivel): ObgdExportRow {
  const fonteMeta = fonteById.get(row.fonte)
  return {
    nivel: NIVEL_LABEL[dataNivel],
    unidade: row.categoria,
    unidade_nome: unidadeNome(dataNivel, row.categoria),
    objetivo: row.objetivo,
    objetivo_nome: row.objetivo_nome,
    concept_id: conceptIdOf(row),
    fonte_id: row.fonte,
    fonte_nome: fonteMeta?.nome ?? row.fonte,
    indicador: row.indicador,
    sub_itens: row.sub_itens,
    descricao: row.descricao,
    escala: row.escala,
    populacao: row.populacao,
    valor_normalizado: row.valor_normalizado,
    ano_fonte: row.ano_fonte,
    ano_indice: ANO_INDICE,
  }
}

function matchesConcept(
  row: DetalheRow,
  conceptId: string,
  subItens?: string | null
): boolean {
  if (conceptIdOf(row) !== conceptId) return false
  if (subItens == null || subItens === '') return true
  return (row.sub_itens ?? '') === subItens
}

/** Exporta um indicador em todas as unidades do nível. */
export function buildExportByConcept(opts: {
  nivelKey: NivelKey
  conceptId: string
  subItens?: string | null
}): { rows: ObgdExportRow[]; filename: string } {
  const dataNivel = NIVEL_MAP[opts.nivelKey].dataNivel
  const rows = detalhesForNivel(dataNivel)
    .filter(r => matchesConcept(r, opts.conceptId, opts.subItens))
    .map(r => rowToExport(r, dataNivel))
    .sort((a, b) => String(a.unidade).localeCompare(String(b.unidade), 'pt-BR'))

  const slug = slugifyFilename(opts.conceptId)
  const filename = `obgd-${NIVEL_LABEL[dataNivel]}-${slug}.csv`
  return { rows, filename }
}

/** Exporta indicadores de uma ou mais fontes OBGD em todos os níveis. */
export function buildExportByFonteIds(fonteIds: string[]): {
  rows: ObgdExportRow[]
  filename: string
} {
  const idSet = new Set(fonteIds)
  const niveis: DataNivel[] = ['nacional', 'uf', 'capital']
  const rows: ObgdExportRow[] = []
  for (const dataNivel of niveis) {
    for (const r of detalhesForNivel(dataNivel)) {
      if (!idSet.has(r.fonte)) continue
      rows.push(rowToExport(r, dataNivel))
    }
  }
  rows.sort((a, b) => {
    const n = String(a.nivel).localeCompare(String(b.nivel), 'pt-BR')
    if (n !== 0) return n
    const c = String(a.concept_id).localeCompare(String(b.concept_id), 'pt-BR')
    if (c !== 0) return c
    return String(a.unidade).localeCompare(String(b.unidade), 'pt-BR')
  })
  const slug =
    fonteIds.length === 1
      ? slugifyFilename(fonteIds[0])
      : slugifyFilename(fonteIds.join('-'))
  return { rows, filename: `obgd-fonte-${slug}.csv` }
}

/** Há linhas em `detalhes_*` para o slug da página de Metodologia? */
export function hasObgdExportForMetodologiaSlug(slug: string): boolean {
  const ids = METODOLOGIA_SLUG_PARA_FONTE_IDS[slug]
  if (!ids || ids.length === 0) return false
  return buildExportByFonteIds(ids).rows.length > 0
}

export function exportRowsToCsvResponse(
  rows: ObgdExportRow[],
  filename: string
): Response {
  const csv = rowsToCsv(rows)
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
