import 'server-only'

import { objectives } from '@/data/objectives'
import { detalhesForNivel } from './detalhes'
import { FONTE_URLS } from './fonte-urls'
import { fonteById, indicadorByChave } from './load'
import {
  type Ente,
  getNivel,
  type Nivel,
  type NivelKey,
  niveis,
  type ObjetivoScore,
  slugify,
  type Variavel,
} from './queries'
import { getSerieHistorica } from './serie-historica'
import type { DataNivel, DetalheRow } from './types'

const ESCALA_LABEL: Record<string, string> = {
  prop_0_100: 'Proporção original (0–100), já na escala do índice.',
  indice_0_10: 'Índice original (0–10), normalizado para 0–100.',
  binario: 'Indicador binário, normalizado para 0–100.',
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function formatScoreLocal(n: number): string {
  return n.toFixed(1).replace('.', ',')
}

function detalheCategoriaKey(dataNivel: DataNivel, codigo: string): string {
  if (dataNivel === 'nacional') return 'Total'
  return codigo
}

function buildVariavel(row: DetalheRow, enteCodigo: string): Variavel {
  const chave = `${row.fonte}/${row.indicador}`
  const conceptId = row.concept_id || chave
  const meta = indicadorByChave.get(chave)
  const fonteMeta = fonteById.get(row.fonte)
  const fonteLabel = fonteMeta
    ? `${fonteMeta.nome} (${fonteMeta.instituicao})`
    : row.fonte
  const slug = slugify(`${row.fonte}-${row.indicador}`)
  const nota = round1(row.valor_normalizado)

  return {
    slug,
    nome: row.descricao || meta?.descricao || row.indicador,
    fonte: fonteLabel,
    fonteUrl: FONTE_URLS[row.fonte] ?? 'https://www.gov.br/',
    nota,
    pergunta: meta?.pergunta || row.descricao || row.indicador,
    normalizacao:
      ESCALA_LABEL[row.escala] ??
      `Valor normalizado para escala 0–100 (escala original: ${row.escala}).`,
    dados: [
      { item: 'Valor normalizado (0–100)', valor: formatScoreLocal(nota) },
      { item: 'Ano da fonte', valor: String(row.ano_fonte) },
      { item: 'Código do indicador', valor: row.indicador },
      { item: 'População / recorte', valor: row.populacao },
      ...(row.sub_itens ? [{ item: 'Sub-item', valor: row.sub_itens }] : []),
    ],
    arquivo: {
      nome: `obgd-${slug}.csv`,
      tamanho: 'CSV',
      tabelas: 1,
    },
    anoFonte: row.ano_fonte,
    indicadorCodigo: row.indicador,
    fonteId: row.fonte,
    conceptId,
    subItens: row.sub_itens,
    serieHistorica: getSerieHistorica({
      indicadorChave: chave,
      fonteId: row.fonte,
      enteCodigo,
      anoAtual: row.ano_fonte,
      valorAtual: row.valor_normalizado,
    }),
    serieHistoricaMock: true,
  }
}

function attachVariaveis(ente: Ente, dataNivel: Nivel['dataNivel']): Ente {
  const cat = detalheCategoriaKey(dataNivel, ente.codigo)
  const detalhes = detalhesForNivel(dataNivel).filter(d => d.categoria === cat)

  const objetivos: ObjetivoScore[] = ente.objetivos.map(obj => ({
    ...obj,
    titulo: objectives[obj.numero - 1]?.title ?? obj.titulo,
    descricao: objectives[obj.numero - 1]?.description ?? obj.descricao,
    variaveis: detalhes
      .filter(d => d.objetivo === obj.numero)
      .map(row => buildVariavel(row, ente.codigo))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
  }))

  return { ...ente, objetivos }
}

const cache = new Map<string, Ente>()

/** Ente com variáveis carregadas (somente Server Components). */
export function getEnteComVariaveis(
  nivelKey: string,
  enteSlug: string
): Ente | undefined {
  const cacheKey = `${nivelKey}/${enteSlug}`
  const cached = cache.get(cacheKey)
  if (cached) return cached

  const nivel = getNivel(nivelKey)
  const ente = nivel?.entes.find(e => e.slug === enteSlug)
  if (!nivel || !ente) return undefined

  const full = attachVariaveis(ente, nivel.dataNivel)
  cache.set(cacheKey, full)
  return full
}

/** Params estáticos para rotas de objetivo com dados. */
export function generateObjetivoParams() {
  return niveis.flatMap(nivel =>
    nivel.entes.flatMap(ente =>
      ente.objetivos
        .filter(o => o.nota !== null)
        .map(o => ({
          nivel: nivel.key as NivelKey,
          ente: ente.slug,
          objetivo: o.objetivoSlug,
        }))
    )
  )
}
