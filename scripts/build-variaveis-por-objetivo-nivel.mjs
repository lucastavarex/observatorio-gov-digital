/**
 * Pré-agrega variáveis únicas por (nível UI × objetivo) a partir de detalhes_*.json.
 * Evita importar os detalhes completos no client bundle.
 *
 * Usage: node scripts/build-variaveis-por-objetivo-nivel.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ASSETS = join(ROOT, 'src/data/obgd/assets')
const OUT = join(ASSETS, 'variaveis-por-objetivo-nivel.json')

/** @typedef {{ concept_id?: string, fonte: string, indicador: string, objetivo: number, descricao?: string }} DetalheRow */

/**
 * @param {DetalheRow[]} rows
 * @param {Map<string, string>} fonteNomeById
 * @returns {Record<string, { id: string, nome: string, fonte: string }[]>}
 */
function uniqByObjetivo(rows, fonteNomeById) {
  /** @type {Record<string, Map<string, { id: string, nome: string, fonte: string }>>} */
  const byObj = {}
  for (const r of rows) {
    const obj = String(r.objetivo)
    const id = r.concept_id || `${r.fonte}/${r.indicador}`
    if (!byObj[obj]) byObj[obj] = new Map()
    if (!byObj[obj].has(id)) {
      byObj[obj].set(id, {
        id,
        nome: r.descricao || r.indicador,
        fonte: fonteNomeById.get(r.fonte) ?? r.fonte,
      })
    }
  }
  /** @type {Record<string, { id: string, nome: string, fonte: string }[]>} */
  const out = {}
  for (const [k, m] of Object.entries(byObj)) {
    out[k] = [...m.values()].sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR')
    )
  }
  return out
}

function main() {
  /** @type {{ id: string, nome: string }[]} */
  const fontes = JSON.parse(
    readFileSync(join(ASSETS, 'dados/fonte.json'), 'utf8')
  )
  const fonteNomeById = new Map(fontes.map(f => [f.id, f.nome]))

  const federal = uniqByObjetivo(
    JSON.parse(readFileSync(join(ASSETS, 'detalhes_nacional.json'), 'utf8')),
    fonteNomeById
  )
  const estadual = uniqByObjetivo(
    JSON.parse(readFileSync(join(ASSETS, 'detalhes_estadual.json'), 'utf8')),
    fonteNomeById
  )
  const municipios = uniqByObjetivo(
    JSON.parse(readFileSync(join(ASSETS, 'detalhes_municipios.json'), 'utf8')),
    fonteNomeById
  )

  const payload = { federal, estadual, municipios }
  writeFileSync(OUT, `${JSON.stringify(payload)}\n`, 'utf8')

  const counts = Object.fromEntries(
    Object.entries(payload).map(([nivel, byObj]) => [
      nivel,
      Object.fromEntries(
        Object.entries(byObj).map(([obj, vars]) => [obj, vars.length])
      ),
    ])
  )
  console.log('wrote', OUT)
  console.log(JSON.stringify(counts, null, 2))
}

main()
