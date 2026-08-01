/** Utilitários de CSV (client ou server). */

const CSV_COLUMNS = [
  'nivel',
  'unidade',
  'unidade_nome',
  'objetivo',
  'objetivo_nome',
  'concept_id',
  'fonte_id',
  'fonte_nome',
  'indicador',
  'sub_itens',
  'descricao',
  'escala',
  'populacao',
  'valor_normalizado',
  'ano_fonte',
  'ano_indice',
] as const

export type ObgdExportColumn = (typeof CSV_COLUMNS)[number]

export type ObgdExportRow = Record<ObgdExportColumn, string | number | null>

function escapeCsvCell(value: string | number | null | undefined): string {
  if (value == null) return ''
  const s = String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

/** Serializa linhas no schema OBGD (UTF-8, vírgula, BOM para Excel). */
export function rowsToCsv(rows: ObgdExportRow[]): string {
  const header = CSV_COLUMNS.join(',')
  const body = rows.map(row =>
    CSV_COLUMNS.map(col => escapeCsvCell(row[col])).join(',')
  )
  return `\uFEFF${[header, ...body].join('\n')}\n`
}

export function slugifyFilename(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Dispara download no browser a partir de um Blob/URL. */
export function triggerBrowserDownload(filename: string, href: string) {
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}
