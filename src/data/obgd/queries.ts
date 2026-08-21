import { objectives } from '@/data/objectives'
import {
  ANO_INDICE,
  capitalByUfSigla,
  getEnteByTipoCodigo,
  indiceLong,
} from './load'
import type {
  DataNivel,
  EnteTipo,
  IndiceLongRow,
  SerieHistoricaPonto,
} from './types'

export type { DataNivel, EnteTipo, SerieHistoricaPonto }

export type NivelKey = 'federal' | 'estadual' | 'municipal' | 'municipios'

export type TabelaLinha = { item: string; valor: string }

export type ArquivoDados = {
  nome: string
  tamanho: string
  tabelas: number
}

export type Variavel = {
  slug: string
  nome: string
  fonte: string
  /** Página oficial de onde os dados foram extraídos. */
  fonteUrl: string
  nota: number
  pergunta: string
  normalizacao: string
  dados: TabelaLinha[]
  /** Metadados do arquivo disponível para download. */
  arquivo: ArquivoDados
  anoFonte: number
  indicadorCodigo: string
  fonteId: string
  /** Chave do indicador (`fonte/codigo`), para export CSV. */
  conceptId: string
  subItens: string | null
  /** Evolução temporal (ano × valor 0–100). */
  serieHistorica: SerieHistoricaPonto[]
  /** `true` enquanto a série vier do gerador mock. */
  serieHistoricaMock: boolean
}

export type ObjetivoScore = {
  objetivoSlug: string
  numero: number
  titulo: string
  descricao: string
  /** Índice (UI) 0–100; `null` quando o objetivo não tem cobertura nesse nível. Campo de dados: `sub_indice`. */
  nota: number | null
  posicaoNoObjetivo: number | null
  variaveis: Variavel[]
}

export type Ente = {
  slug: string
  nome: string
  nivel: NivelKey
  codigo: string
  tipo: EnteTipo
  ufSigla: string | null
  indiceGeral: number
  nObjetivosComDados: number
  objetivos: ObjetivoScore[]
}

export type Nivel = {
  key: NivelKey
  label: string
  /** Federal é entidade única (sem ranking); estadual/municipal/municípios são rankings. */
  isRanking: boolean
  dataNivel: DataNivel
  entes: Ente[]
}

const NIVEL_MAP: Record<
  NivelKey,
  {
    label: string
    isRanking: boolean
    dataNivel: DataNivel
  }
> = {
  federal: { label: 'Federal', isRanking: false, dataNivel: 'nacional' },
  estadual: { label: 'Estadual', isRanking: true, dataNivel: 'uf' },
  municipal: { label: 'Capitais', isRanking: true, dataNivel: 'capital' },
  municipios: { label: 'Municípios', isRanking: true, dataNivel: 'municipio' },
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function rowsForEnte(dataNivel: DataNivel, codigo: string): IndiceLongRow[] {
  return indiceLong.filter(
    r =>
      r.nivel === dataNivel &&
      r.unidade === codigo &&
      r.ano_indice === ANO_INDICE
  )
}

function buildEnte(
  nivelKey: NivelKey,
  dataNivel: DataNivel,
  codigo: string,
  nome: string
): Ente {
  const rows = rowsForEnte(dataNivel, codigo)
  const byObj = new Map(rows.map(r => [r.objetivo, r]))
  const indiceGeral = rows[0]?.indice_geral ?? 0
  const nObjetivosComDados = rows[0]?.n_objetivos_com_dados ?? rows.length
  const meta = getEnteByTipoCodigo(dataNivel, codigo)

  const objetivos: ObjetivoScore[] = objectives.map((objetivo, index) => {
    const numero = index + 1
    const row = byObj.get(numero)
    // Objetivo 3 desabilitado por decisão de produto (mesmo com linhas no JSON).
    const desabilitadoPorPolitica = numero === 3
    const sub = row?.sub_indice

    return {
      objetivoSlug: objetivo.slug,
      numero,
      titulo: objetivo.title,
      descricao: objetivo.description,
      nota: desabilitadoPorPolitica || sub == null ? null : round1(sub),
      posicaoNoObjetivo: desabilitadoPorPolitica
        ? null
        : (row?.posicao_no_objetivo ?? null),
      variaveis: [],
    }
  })

  return {
    slug: slugify(nome),
    nome,
    nivel: nivelKey,
    codigo,
    tipo: dataNivel,
    ufSigla: meta?.uf_sigla ?? null,
    // Mantido no modelo para compatibilidade com o JSON; não expor na UI.
    indiceGeral: round1(typeof indiceGeral === 'number' ? indiceGeral : 0),
    nObjetivosComDados,
    objetivos,
  }
}

function listUnidades(
  dataNivel: DataNivel
): { codigo: string; nome: string }[] {
  const seen = new Map<string, string>()
  for (const row of indiceLong) {
    if (row.nivel !== dataNivel) continue
    if (!seen.has(row.unidade)) {
      seen.set(row.unidade, row.unidade_nome)
    }
  }
  return [...seen.entries()].map(([codigo, nome]) => ({ codigo, nome }))
}

function buildNivel(key: NivelKey): Nivel {
  const meta = NIVEL_MAP[key]
  const unidades = listUnidades(meta.dataNivel)
  const entes = unidades.map(u =>
    buildEnte(key, meta.dataNivel, u.codigo, u.nome)
  )

  // Ordem estável por nome; a UI reordena por objetivo ou tag temática.
  entes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  return {
    key,
    label: meta.label,
    isRanking: meta.isRanking,
    dataNivel: meta.dataNivel,
    entes,
  }
}

/** Árvore leve (sem variáveis) — segura para Client Components. */
export const niveis: Nivel[] = (
  ['federal', 'estadual', 'municipal', 'municipios'] as NivelKey[]
).map(buildNivel)

export function getNivel(key: string): Nivel | undefined {
  return niveis.find(n => n.key === key)
}

export function getEnte(nivelKey: string, enteSlug: string): Ente | undefined {
  return getNivel(nivelKey)?.entes.find(e => e.slug === enteSlug)
}

export function getObjetivoScore(
  ente: Ente,
  objetivoSlug: string
): ObjetivoScore | undefined {
  return ente.objetivos.find(o => o.objetivoSlug === objetivoSlug)
}

export function getVariavel(
  objetivo: ObjetivoScore,
  variavelSlug: string
): Variavel | undefined {
  return objetivo.variaveis.find(v => v.slug === variavelSlug)
}

export const formatScore = (n: number): string => n.toFixed(1).replace('.', ',')

/**
 * Média do nível para cada objetivo (ignorando entes sem cobertura).
 */
export function mediasPorObjetivo(nivel: Nivel): (number | null)[] {
  return objectives.map((_, index) => {
    const notas = nivel.entes
      .map(ente => ente.objetivos[index]?.nota)
      .filter((n): n is number => typeof n === 'number')
    if (!notas.length) return null
    return round1(notas.reduce((a, n) => a + n, 0) / notas.length)
  })
}

/** Objetivos com pelo menos um ente com dados neste nível. */
export function objetivosComCobertura(nivel: Nivel): boolean[] {
  return objectives.map((_, index) =>
    nivel.entes.some(e => e.objetivos[index]?.nota !== null)
  )
}

/** @deprecated Índice geral removido da UI; mantido só por compatibilidade de imports. */
export type OrdenacaoRanking = 'objetivo'

export type RankingItem = {
  slug: string
  nome: string
  codigo: string
  ufSigla: string | null
  /** Índice do objetivo pelo qual se ordena (rótulo UI: Índice). */
  valorPrincipal: number
  subIndice: number | null
  posicao: number
}

/**
 * Ranking de entes do nível pelo índice de um objetivo.
 */
export function rankingDoNivel(
  nivel: Nivel,
  objetivoNumero: number,
  _ordenacao: OrdenacaoRanking = 'objetivo'
): RankingItem[] {
  const comDados = nivel.entes
    .map(e => {
      const obj = e.objetivos[objetivoNumero - 1]
      return obj?.nota !== null && obj?.nota !== undefined
        ? { ente: e, obj }
        : null
    })
    .filter((x): x is { ente: Ente; obj: ObjetivoScore } => x !== null)
    .sort((a, b) => {
      // Preferir posição oficial quando ambos têm; senão ordenar por nota.
      const pa = a.obj.posicaoNoObjetivo
      const pb = b.obj.posicaoNoObjetivo
      if (pa != null && pb != null && pa !== pb) return pa - pb
      return (b.obj.nota ?? 0) - (a.obj.nota ?? 0)
    })

  return comDados.map(({ ente, obj }, i) => ({
    slug: ente.slug,
    nome: ente.nome,
    codigo: ente.codigo,
    ufSigla: ente.ufSigla,
    valorPrincipal: obj.nota!,
    subIndice: obj.nota,
    posicao: i + 1,
  }))
}

/** Resolve capital a partir da UF (para joins de detalhes_capitais). */
export function capitalNomePorUf(ufSigla: string): string | undefined {
  return capitalByUfSigla.get(ufSigla)?.nome
}

export { ANO_INDICE, NIVEL_MAP }
