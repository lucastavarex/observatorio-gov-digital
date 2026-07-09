import { objectives } from '@/data/objectives'
import { rankingLevels } from '@/data/ranking'

export type NivelKey = 'federal' | 'estadual' | 'municipal'

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
}

export type ObjetivoScore = {
  objetivoSlug: string
  numero: number
  titulo: string
  descricao: string
  /** Sub-índice 0–100; `null` quando o objetivo não tem cobertura nesse nível. */
  nota: number | null
  variaveis: Variavel[]
}

export type Ente = {
  slug: string
  nome: string
  nivel: NivelKey
  indiceGeral: number
  objetivos: ObjetivoScore[]
}

export type Nivel = {
  key: NivelKey
  label: string
  /** Federal é entidade única (sem ranking); estadual/municipal são rankings. */
  isRanking: boolean
  entes: Ente[]
}

// ---------------------------------------------------------------------------
// Metodologia (mock): cada variável é um checklist de itens. A nota da variável
// é a proporção de itens atendidos (0–100); a nota do objetivo é a média das
// suas variáveis; o índice geral é a média dos objetivos com cobertura. Os
// valores são gerados de forma determinística a partir do nome do ente, então
// permanecem estáveis entre a lista e as páginas de detalhe.
// ---------------------------------------------------------------------------

type VariavelTemplate = {
  nome: string
  fonte: string
  pergunta: string
  itens: string[]
}

const NORMALIZACAO =
  'Proporção de itens atendidos pelo ente, normalizada para uma escala de 0 a 100.'

// Página oficial de cada fonte de dados (de onde a informação foi extraída).
const fonteUrls: Record<string, string> = {
  'IBGE ESTADIC/MUNIC':
    'https://www.ibge.gov.br/estatisticas/sociais/administracao-publica-e-participacao-politica.html',
  'ABEP-TIC IOSPD': 'https://abep.org.br/',
  'CETIC.br TIC Governo': 'https://cetic.br/pt/pesquisa/governo-eletronico/',
  'CGU EBT 360':
    'https://www.gov.br/cgu/pt-br/assuntos/transparencia-publica/escala-brasil-transparente',
  'IBGE MUNIC':
    'https://www.ibge.gov.br/estatisticas/sociais/saude/10586-pesquisa-de-informacoes-basicas-municipais.html',
}

const templatesByObjetivo: Record<string, VariavelTemplate[]> = {
  'gestao-e-governanca': [
    {
      nome: 'Estrutura organizacional de TI',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta: 'O ente possui estrutura organizacional dedicada à área de TI?',
      itens: [
        'Área ou departamento de TI formalizado',
        'Cargo de gestor de TI designado',
        'Comitê de governança digital',
        'Plano Diretor de TI (PDTI) vigente',
      ],
    },
    {
      nome: 'Estratégia de governo digital',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta:
        'O ente publicou e implementa uma estratégia de governo digital?',
      itens: [
        'Estratégia digital formalizada',
        'Alinhamento explícito à ENGD',
        'Instância de monitoramento',
        'Previsão no PPA/LDO/LOA',
      ],
    },
    {
      nome: 'Capacidades para oferta digital (IOSPD Dim. 1)',
      fonte: 'ABEP-TIC IOSPD',
      pergunta:
        'O portal do ente dispõe de capacidades de infraestrutura para oferta digital?',
      itens: [
        'Portal único de serviços',
        'Plataforma de identidade integrada',
        'Painel público de indicadores',
        'Área de dados/BI',
      ],
    },
  ],
  'qualidade-dos-servicos-publicos': [
    {
      nome: 'Serviços transacionais no portal',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta:
        'Quais serviços transacionais estão disponíveis no portal do ente?',
      itens: [
        'Ouvidoria/atendimento',
        'Consulta de processos',
        'Certidão negativa',
        'Emissão de documentos',
        'Guia de tributos',
        'Agendamento de saúde',
      ],
    },
    {
      nome: 'Acessibilidade do portal',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta: 'O portal do ente adota recursos de acessibilidade?',
      itens: [
        'Navegação sem mouse',
        'Descrição de imagens',
        'Tradução em LIBRAS',
        'CAPTCHA acessível',
        'Conformidade WCAG/e-MAG',
      ],
    },
    {
      nome: 'Linguagem simples (IOSPD Dim. 4)',
      fonte: 'ABEP-TIC IOSPD',
      pergunta:
        'Os conteúdos do portal seguem princípios de linguagem simples?',
      itens: [
        'Frases curtas e diretas',
        'Títulos objetivos',
        'Vocabulário acessível',
        'Canal para pedir melhoria',
      ],
    },
    {
      nome: 'Inovação na oferta (IOSPD Dim. 5)',
      fonte: 'ABEP-TIC IOSPD',
      pergunta: 'O ente adota recursos inovadores na oferta de serviços?',
      itens: [
        'Aplicativo móvel oficial',
        'IA/algoritmo em serviços',
        'Pagamento via PIX/cartão',
        'Ambiente personalizado ao cidadão',
      ],
    },
  ],
  'identidade-unica-do-cidadao': [
    {
      nome: 'Autenticação e identidade digital',
      fonte: 'CETIC.br TIC Governo',
      pergunta:
        'O ente integra soluções de identidade única e autenticação digital?',
      itens: [
        'Login único Gov.br',
        'Assinatura eletrônica',
        'Repositório digital de documentos',
        'CPF como identificador do cidadão',
      ],
    },
  ],
  'privacidade-e-seguranca': [
    {
      nome: 'Adequação à LGPD e segurança',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta:
        'O ente adota medidas de privacidade e segurança da informação?',
      itens: [
        'Encarregado (DPO) designado',
        'Política de segurança da informação',
        'Plano de resposta a incidentes',
        'Capacitação em segurança',
      ],
    },
  ],
  'inteligencia-de-dados': [
    {
      nome: 'Interoperabilidade e dados abertos',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta:
        'O ente promove governança, compartilhamento e abertura de dados?',
      itens: [
        'Programa de governança de dados',
        'Compartilhamento entre órgãos',
        'Catálogo de dados',
        'Portal de dados abertos',
      ],
    },
  ],
  'infraestrutura-digital': [
    {
      nome: 'Infraestrutura e conectividade',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta: 'O ente dispõe de infraestrutura digital adequada?',
      itens: [
        'Data center próprio ou contratado',
        'Conectividade de alta capacidade',
        'Adoção de computação em nuvem',
        'Wi-Fi público em equipamentos',
      ],
    },
  ],
  'ecossistema-de-inovacao': [
    {
      nome: 'Inovação e tecnologias emergentes',
      fonte: 'ABEP-TIC IOSPD',
      pergunta: 'O ente fomenta inovação e uso de tecnologias emergentes?',
      itens: [
        'Laboratório de inovação',
        'Uso de IA generativa',
        'Parcerias com govtechs',
        'Compras públicas de inovação',
      ],
    },
  ],
  'eficiencia-e-colaboracao': [
    {
      nome: 'Processos e soluções compartilhadas',
      fonte: 'IBGE MUNIC',
      pergunta: 'O ente adota processos digitais e soluções compartilhadas?',
      itens: [
        'Processo eletrônico (PEN/SEI)',
        'Compras públicas integradas',
        'Soluções compartilhadas entre entes',
        'Digitalização de processos internos',
      ],
    },
  ],
  'transparencia-e-participacao': [
    {
      nome: 'Escala Brasil Transparente (EBT 360)',
      fonte: 'CGU EBT 360',
      pergunta: 'Nota combinada de transparência ativa e passiva do ente.',
      itens: [
        'Transparência ativa (portal)',
        'Transparência passiva (LAI)',
        'Dados abertos publicados',
        'Canais de participação social',
      ],
    },
  ],
  'competencias-e-capacitacao': [
    {
      nome: 'Capacitação em governo digital',
      fonte: 'IBGE ESTADIC/MUNIC',
      pergunta:
        'O ente desenvolve competências e capacitação em governo digital?',
      itens: [
        'Trilhas de capacitação (Capacita Gov.br)',
        'Escola de governo ativa',
        'Ações de retenção de talentos',
        'Eventos de disseminação',
      ],
    },
  ],
}

// Cobertura por nível (números dos objetivos com dados), espelhando os relatórios:
// estadual não cobre 3 (Identidade) e 8 (Eficiência); municipal não cobre 8.
const coberturaPorNivel: Record<NivelKey, Set<number>> = {
  federal: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  estadual: new Set([1, 2, 4, 5, 6, 7, 9, 10]),
  municipal: new Set([1, 2, 3, 4, 5, 6, 7, 9, 10]),
}

// Hash determinístico (FNV-1a) → [0, 1). Sem Math.random para manter estabilidade.
function seeded(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967295
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function buildVariavel(
  enteSlug: string,
  base: number,
  template: VariavelTemplate
): Variavel {
  const varSlug = slugify(template.nome)
  // Probabilidade de "Sim" ancorada no desempenho do ente, com leve variação por variável.
  const bias = (seeded(`${enteSlug}|${varSlug}|bias`) - 0.5) * 0.3
  const p = Math.min(0.95, Math.max(0.08, base / 100 + bias))

  const dados: TabelaLinha[] = template.itens.map(item => ({
    item,
    valor: seeded(`${enteSlug}|${varSlug}|${item}`) < p ? 'Sim' : 'Não',
  }))

  const atendidos = dados.filter(linha => linha.valor === 'Sim').length
  const nota = Math.round((atendidos / dados.length) * 100)

  // Metadados do arquivo (mock, estáveis por variável — o dataset é o mesmo entre entes).
  const tabelas = 1 + Math.floor(seeded(`${varSlug}|tabelas`) * 3)
  const mb = 0.3 + seeded(`${varSlug}|tamanho`) * 4.2
  const arquivo: ArquivoDados = {
    nome: `${varSlug}.${tabelas > 1 ? 'zip' : 'csv'}`,
    tamanho: `${mb.toFixed(1).replace('.', ',')} MB`,
    tabelas,
  }

  return {
    slug: varSlug,
    nome: template.nome,
    fonte: template.fonte,
    fonteUrl: fonteUrls[template.fonte] ?? '#',
    nota,
    pergunta: template.pergunta,
    normalizacao: NORMALIZACAO,
    dados,
    arquivo,
  }
}

function buildEnte(nivel: NivelKey, nome: string, base: number): Ente {
  const enteSlug = slugify(nome)
  const cobertura = coberturaPorNivel[nivel]

  const objetivos: ObjetivoScore[] = objectives.map((objetivo, index) => {
    const numero = index + 1
    const templates = cobertura.has(numero)
      ? (templatesByObjetivo[objetivo.slug] ?? [])
      : []
    const variaveis = templates.map(template =>
      buildVariavel(enteSlug, base, template)
    )
    const nota = variaveis.length
      ? Math.round(
          variaveis.reduce((soma, v) => soma + v.nota, 0) / variaveis.length
        )
      : null

    return {
      objetivoSlug: objetivo.slug,
      numero,
      titulo: objetivo.title,
      descricao: objetivo.description,
      nota,
      variaveis,
    }
  })

  const notas = objetivos
    .map(o => o.nota)
    .filter((n): n is number => n !== null)
  const indiceGeral = notas.length
    ? Math.round((notas.reduce((a, n) => a + n, 0) / notas.length) * 10) / 10
    : 0

  return { slug: enteSlug, nome, nivel, indiceGeral, objetivos }
}

const entriesEstadual =
  rankingLevels.find(l => l.key === 'estadual')?.entries ?? []
const entriesMunicipal =
  rankingLevels.find(l => l.key === 'municipal')?.entries ?? []

function buildRanking(
  nivel: NivelKey,
  entries: { name: string; score: number }[]
) {
  return entries
    .map(entry => buildEnte(nivel, entry.name, entry.score))
    .sort((a, b) => b.indiceGeral - a.indiceGeral)
}

export const niveis: Nivel[] = [
  {
    key: 'federal',
    label: 'Federal',
    isRanking: false,
    entes: [buildEnte('federal', 'Governo Federal', 78.9)],
  },
  {
    key: 'estadual',
    label: 'Estadual',
    isRanking: true,
    entes: buildRanking('estadual', entriesEstadual),
  },
  {
    key: 'municipal',
    label: 'Municipal',
    isRanking: true,
    entes: buildRanking('municipal', entriesMunicipal),
  },
]

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
 * Média do nível para cada objetivo (ignorando entes sem cobertura). Usada como
 * série de referência no radar. Retorna `null` no objetivo sem nenhum dado.
 */
export function mediasPorObjetivo(nivel: Nivel): (number | null)[] {
  return objectives.map((_, index) => {
    const notas = nivel.entes
      .map(ente => ente.objetivos[index]?.nota)
      .filter((n): n is number => typeof n === 'number')
    if (!notas.length) return null
    return Math.round(notas.reduce((a, n) => a + n, 0) / notas.length)
  })
}
