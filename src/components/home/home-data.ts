import {
  type Ente,
  getNivel,
  mediasPorObjetivo,
  niveis,
} from '@/data/indicators'
import { indicadores } from '@/data/obgd/load'
import { getEnteComVariaveis } from '@/data/obgd/server'
import { objectives } from '@/data/objectives'

export type VariavelDestaque = {
  slug: string
  nome: string
  fonte: string
  /** Caminho para a página do objetivo (sem prefixo de variante). */
  path: string
}

export type Parceiro = {
  src: string
  alt: string
  width: number
  height: number
  size: string
  href: string
}

export const parceiros: Parceiro[] = [
  {
    src: '/logos/mgi.png',
    alt: 'Ministério da Gestão e da Inovação em Serviços Públicos',
    width: 2377,
    height: 479,
    size: 'h-12 sm:h-16',
    href: 'https://www.gov.br/gestao/pt-br',
  },
  {
    src: '/logos/mbc.png',
    alt: 'Movimento Brasil Competitivo',
    width: 442,
    height: 150,
    size: 'h-12 sm:h-14',
    href: 'https://www.mbc.org.br/',
  },
  {
    src: '/logos/insper.png',
    alt: 'Insper — Centro de Gestão e Políticas Públicas',
    width: 280,
    height: 52,
    size: 'h-8 sm:h-10',
    href: 'https://www.insper.edu.br/pesquisa-e-conhecimento/centro-de-gestao-e-politicas-publicas/',
  },
]

function getNivelEstadual() {
  const nivel = niveis.find(n => n.key === 'estadual')
  if (!nivel) {
    throw new Error('Nível estadual não encontrado nos dados')
  }
  return nivel
}

/** Contagens de alcance da base (calculadas dos dados, não hardcoded). */
export type HomeNumeros = {
  /** Total de entes avaliados (federal + estados + municípios ≥100 mil). */
  entesTotal: number
  /** Municípios com 100 mil+ habitantes cobertos. */
  municipios: number
  /** Variáveis/indicadores ativos (exclui excluídos e saturados). */
  variaveis: number
  /** Objetivos da ENGD. */
  objetivos: number
}

export type HomeData = {
  estadual: ReturnType<typeof getNivelEstadual>
  enteDestaque: Ente
  mediasEstadual: (number | null)[]
  /** Variáveis destaque (com `path` — a página injeta o link com a variante). */
  variaveisDestaque: VariavelDestaque[]
  parceiros: Parceiro[]
  numeros: HomeNumeros
}

/**
 * Dados compartilhados pelas variações da home (estadual, médias, variáveis
 * destaque e parceiros). A home atual mantém seu próprio cálculo; este helper
 * evita duplicar a lógica nas páginas /home-v1, /home-v2 e /home-v3.
 */
export function getHomeData(): HomeData {
  const estadual = getNivelEstadual()
  const enteDestaque = estadual.entes[0]
  const mediasEstadual = mediasPorObjetivo(estadual)

  const enteComVariaveis = getEnteComVariaveis('estadual', enteDestaque.slug)
  const variaveisDestaque = (enteComVariaveis?.objetivos ?? [])
    .flatMap(o => {
      if (o.nota === null) return []
      return o.variaveis.map(v => ({
        slug: v.slug,
        nome: v.nome,
        fonte: v.fonte,
        path: `/indicadores/estadual/${enteDestaque.slug}/${o.objetivoSlug}`,
      }))
    })
    .slice(0, 6)

  const numeros: HomeNumeros = {
    entesTotal: niveis.reduce((total, nivel) => total + nivel.entes.length, 0),
    municipios: getNivel('municipios')?.entes.length ?? 0,
    variaveis: indicadores.filter(i => i.status === 'ativo').length,
    objetivos: objectives.length,
  }

  return {
    estadual,
    enteDestaque,
    mediasEstadual,
    variaveisDestaque,
    parceiros,
    numeros,
  }
}
