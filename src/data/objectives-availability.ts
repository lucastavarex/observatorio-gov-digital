import type { NivelKey } from '@/data/indicators'
import { objectives } from '@/data/objectives'

/** Objetivo 3 — Identificação Única: desabilitado por decisão de produto (dados insuficientes / atrito). */
export const OBJETIVO_3_SLUG = 'identidade-unica-do-cidadao'
export const OBJETIVO_3_NUMERO = 3

export const OBJETIVO_3_MOTIVO =
  'Este objetivo está temporariamente desabilitado na plataforma: não há dados suficientes e consistentes para uma avaliação comparável entre os entes.'

/**
 * Objetivos com cobertura frágil de variáveis (mock até validação de
 * Luiza/Gabriel/Bruno). Usado para nota técnica na UI.
 */
export const OBJETIVOS_PRECARIOS_MOCK = [
  {
    slug: 'identidade-unica-do-cidadao',
    numero: 3,
    motivoResumo: 'Cobertura insuficiente e inconsistente entre níveis.',
    oQueFoiAvaliado: [
      'Existência de iniciativas de identidade digital em fontes públicas pontuais.',
    ],
    oQueNaoFoiIncluido: [
      'Indicadores de adoção efetiva da CIN / identidade única nacional por UF e município.',
      'Séries comparáveis de autenticação e interoperabilidade de identidade.',
    ],
    porQueNaoIncluido:
      'As fontes disponíveis não permitem construir um sub-índice comparável e auditável para todos os entes nesta edição.',
  },
  {
    slug: 'competencias-e-capacitacao',
    numero: 10,
    motivoResumo:
      'Dados concentrados no nível federal; lacuna estadual/municipal.',
    oQueFoiAvaliado: [
      'Indicadores de capacitação e competências disponíveis no escopo nacional.',
    ],
    oQueNaoFoiIncluido: [
      'Séries homogêneas de capacitação em TI para estados e capitais.',
    ],
    porQueNaoIncluido:
      'A entrega atual não cobre de forma equilibrada os níveis subnacionais.',
  },
  {
    slug: 'eficiencia-e-colaboracao',
    numero: 8,
    motivoResumo: 'Sem cobertura municipal na edição atual.',
    oQueFoiAvaliado: [
      'Indicadores de eficiência e colaboração nos níveis federal e estadual.',
    ],
    oQueNaoFoiIncluido: [
      'Variáveis municipais de eficiência operacional e colaboração interinstitucional.',
    ],
    porQueNaoIncluido:
      'Fontes municipais equivalentes ainda não foram consolidadas para esta edição.',
  },
  {
    slug: 'ecossistema-de-inovacao',
    numero: 7,
    motivoResumo: 'Poucas variáveis ativas em relação ao escopo do objetivo.',
    oQueFoiAvaliado: [
      'Recorte inicial de inovação e tecnologias emergentes com fontes públicas.',
    ],
    oQueNaoFoiIncluido: [
      'Indicadores de sandboxes, compras de inovação e maturidade de ecossistema local.',
    ],
    porQueNaoIncluido:
      'O número de variáveis disponíveis ainda é precário para representar o objetivo com a mesma robustez dos demais.',
  },
] as const

export function isObjetivo3(slugOrNumero: string | number): boolean {
  if (typeof slugOrNumero === 'number')
    return slugOrNumero === OBJETIVO_3_NUMERO
  return slugOrNumero === OBJETIVO_3_SLUG
}

export function motivoObjetivoDesabilitado(
  slug: string,
  nivel: NivelKey,
  cobertoPelosDados: boolean
): string | null {
  if (isObjetivo3(slug)) return OBJETIVO_3_MOTIVO
  if (!cobertoPelosDados) {
    return `Não há dados suficientes para este objetivo no nível ${nivel}.`
  }
  return null
}

/** Índice 0-based: objetivo usável na UI (não é Obj.3 e tem cobertura de dados). */
export function objetivoSelecionavel(
  index: number,
  cobertura: boolean[]
): boolean {
  const obj = objectives[index]
  if (!obj) return false
  if (isObjetivo3(obj.slug)) return false
  return Boolean(cobertura[index])
}

export function primeiroObjetivoSelecionavel(cobertura: boolean[]): number {
  const idx = objectives.findIndex((_, i) => objetivoSelecionavel(i, cobertura))
  return idx >= 0 ? idx + 1 : 1
}

export function isObjetivoPrecario(slug: string): boolean {
  return OBJETIVOS_PRECARIOS_MOCK.some(o => o.slug === slug)
}

export function getNotaPrecaria(slug: string) {
  return OBJETIVOS_PRECARIOS_MOCK.find(o => o.slug === slug) ?? null
}

type ObjetivoRadarInput = {
  numero: number
  titulo: string
  nota: number | null
}

/** Separa objetivos com nota dos inativos/sem dados para o radar. */
export function objetivosParaRadar<T extends ObjetivoRadarInput>(
  objetivos: T[]
) {
  const indicesAtivos: number[] = []
  const ativos: (T & { nota: number })[] = []
  const inativos: T[] = []

  objetivos.forEach((objetivo, index) => {
    if (objetivo.nota !== null) {
      indicesAtivos.push(index)
      ativos.push(objetivo as T & { nota: number })
    } else {
      inativos.push(objetivo)
    }
  })

  return { ativos, inativos, indicesAtivos }
}

/** Filtra uma série de valores pelos índices ativos do radar. */
export function filtrarValoresPorIndices<T>(
  valores: T[],
  indicesAtivos: number[]
): T[] {
  return indicesAtivos.map(i => valores[i])
}

function formatListaNumerosObjetivo(numeros: number[]): string {
  const labels = numeros.map(n => String(n).padStart(2, '0'))
  if (labels.length === 1) return labels[0]
  if (labels.length === 2) return `${labels[0]} e ${labels[1]}`
  return `${labels.slice(0, -1).join(', ')} e ${labels[labels.length - 1]}`
}

/**
 * Nota de rodapé do radar quando há objetivos inativos.
 * Ex.: "Objetivos 03, 08 e 10 estão inativos por ausência de dados."
 */
export function formatNotaObjetivosInativos(
  inativos: { numero: number }[]
): string | null {
  if (inativos.length === 0) return null
  const lista = formatListaNumerosObjetivo(inativos.map(o => o.numero))
  if (inativos.length === 1) {
    return `Objetivo ${lista} está inativo por ausência de dados.`
  }
  return `Objetivos ${lista} estão inativos por ausência de dados.`
}
