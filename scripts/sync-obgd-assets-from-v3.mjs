/**
 * Sync versioned OBGD assets from local_assets/dados-v3.
 *
 * - Converts flat CSVs → JSON (ano_indice empty → 2026)
 * - Copies canonical dados/ entities (incl. tag + indicador with tags)
 * - Precomputes indice_por_tag.json (mean valor_normalizado per ente × tag)
 *
 * Usage: node scripts/sync-obgd-assets-from-v3.mjs
 */

import {
  copyFileSync,
  createReadStream,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src/local_assets/dados-v3')
const DEST = join(ROOT, 'src/data/obgd/assets')
const ANO_INDICE = 2026

async function readCsv(path) {
  const rows = []
  let headers = null
  const rl = createInterface({
    input: createReadStream(path, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  })
  for await (const line of rl) {
    if (!line.trim()) continue
    const cols = parseCsvLine(line)
    if (!headers) {
      headers = cols
      continue
    }
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = cols[i] ?? ''
    })
    rows.push(obj)
  }
  return rows
}

/** Minimal CSV parser (handles quoted fields). */
function parseCsvLine(line) {
  const out = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cur += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      out.push(cur)
      cur = ''
    } else {
      cur += ch
    }
  }
  out.push(cur)
  return out
}

function num(v, fallback = null) {
  if (v === '' || v == null) return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function round1(n) {
  return Math.round(n * 10) / 10
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(
    `wrote ${path} (${Array.isArray(data) ? data.length : 'obj'} rows)`
  )
}

async function convertIndiceLong() {
  const rows = await readCsv(join(SRC, 'indice_long_por_objetivo.csv'))
  return rows.map(r => ({
    nivel: r.nivel,
    unidade: r.unidade,
    unidade_nome: r.unidade_nome,
    objetivo: num(r.objetivo),
    objetivo_nome: r.objetivo_nome,
    ano_indice: num(r.ano_indice, ANO_INDICE),
    sub_indice: num(r.sub_indice),
    indice_geral: num(r.indice_geral),
    n_objetivos_com_dados: num(r.n_objetivos_com_dados),
    posicao_no_objetivo: num(r.posicao_no_objetivo),
  }))
}

async function convertDetalhes(name) {
  const rows = await readCsv(join(SRC, `${name}.csv`))
  return rows.map(r => ({
    categoria: r.categoria,
    objetivo: num(r.objetivo),
    objetivo_nome: r.objetivo_nome,
    concept_id: r.concept_id || undefined,
    fonte: r.fonte,
    indicador: r.indicador,
    sub_itens: r.sub_itens === '' ? null : r.sub_itens,
    descricao: r.descricao,
    escala: r.escala,
    populacao: r.populacao,
    valor_normalizado: num(r.valor_normalizado),
    ano_fonte: num(r.ano_fonte),
  }))
}

function buildIndicePorTag() {
  const indicadores = JSON.parse(
    readFileSync(join(SRC, 'dados/indicador.json'), 'utf8')
  )
  const valores = JSON.parse(
    readFileSync(join(SRC, 'dados/indicador_valor.json'), 'utf8')
  )
  const entes = JSON.parse(readFileSync(join(SRC, 'dados/ente.json'), 'utf8'))
  const enteById = new Map(entes.map(e => [e.id, e]))

  /** chave → tag ids (ativos only) */
  const tagsByChave = new Map()
  for (const ind of indicadores) {
    if (ind.status !== 'ativo') continue
    const tags = ind.tags
    if (!Array.isArray(tags) || tags.length === 0) continue
    tagsByChave.set(ind.chave, tags)
  }

  /** key = `${unidade}|${tagId}` → { sum, n } */
  const acc = new Map()
  for (const v of valores) {
    const chave = v.indicador_chave
    if (!chave) continue
    const tags = tagsByChave.get(chave)
    if (!tags) continue
    const ente = enteById.get(v.ente_id)
    if (!ente) continue
    const val = v.valor_normalizado
    if (typeof val !== 'number' || !Number.isFinite(val)) continue
    for (const tagId of tags) {
      const key = `${ente.codigo}|${tagId}`
      const cur = acc.get(key) ?? { sum: 0, n: 0 }
      cur.sum += val
      cur.n += 1
      acc.set(key, cur)
    }
  }

  const out = []
  for (const [key, { sum, n }] of acc) {
    const [unidade, tag_id] = key.split('|')
    out.push({
      unidade,
      tag_id,
      nota: round1(sum / n),
      n_indicadores: n,
    })
  }
  out.sort((a, b) =>
    a.tag_id === b.tag_id
      ? a.unidade.localeCompare(b.unidade)
      : a.tag_id.localeCompare(b.tag_id)
  )
  return out
}

async function main() {
  mkdirSync(join(DEST, 'dados'), { recursive: true })

  writeJson(
    join(DEST, 'indice_long_por_objetivo.json'),
    await convertIndiceLong()
  )
  for (const name of [
    'detalhes_nacional',
    'detalhes_estadual',
    'detalhes_capitais',
  ]) {
    writeJson(join(DEST, `${name}.json`), await convertDetalhes(name))
  }

  for (const name of ['ente', 'fonte', 'indicador', 'objetivo_engd', 'tag']) {
    const from = join(SRC, 'dados', `${name}.json`)
    const to = join(DEST, 'dados', `${name}.json`)
    copyFileSync(from, to)
    console.log(`copied ${to}`)
  }

  writeJson(join(DEST, 'dados/indice_por_tag.json'), buildIndicePorTag())
  console.log('done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
