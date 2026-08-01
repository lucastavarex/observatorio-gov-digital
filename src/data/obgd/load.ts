import enteJson from './assets/dados/ente.json'
import fonteJson from './assets/dados/fonte.json'
import indicadorJson from './assets/dados/indicador.json'
import indicePorTagJson from './assets/dados/indice_por_tag.json'
import objetivoEngdJson from './assets/dados/objetivo_engd.json'
import tagJson from './assets/dados/tag.json'
import indiceLongJson from './assets/indice_long_por_objetivo.json'
import type {
  EnteRow,
  FonteRow,
  IndicadorRow,
  IndiceLongRow,
  IndicePorTagRow,
  ObjetivoEngdRow,
  TagRow,
} from './types'

export const objetivosEngd = objetivoEngdJson as ObjetivoEngdRow[]
export const entes = enteJson as EnteRow[]
export const fontes = fonteJson as FonteRow[]
export const indicadores = indicadorJson as IndicadorRow[]
export const tags = tagJson as TagRow[]
export const indicePorTag = indicePorTagJson as IndicePorTagRow[]
export const indiceLong = indiceLongJson as IndiceLongRow[]

export const ANO_INDICE = 2026

export const fonteById = new Map(fontes.map(f => [f.id, f]))
export const indicadorByChave = new Map(indicadores.map(i => [i.chave, i]))
export const enteByCodigo = new Map(entes.map(e => [e.codigo, e]))
export const tagById = new Map(tags.map(t => [t.id, t]))

/** Lookup `unidade|tag_id` → nota (média pré-calculada). */
export const notaPorUnidadeTag = new Map(
  indicePorTag.map(r => [`${r.unidade}|${r.tag_id}`, r.nota])
)

/** Capital lookup by UF sigla (detalhes_capitais uses UF as categoria). */
export const capitalByUfSigla = new Map(
  entes
    .filter(e => e.tipo === 'capital' && e.uf_sigla)
    .map(e => [e.uf_sigla!, e])
)
