import { fonteById, fontes as fontesObgd, indicadores } from '@/data/obgd/load'
import { objectives } from '@/data/objectives'

/**
 * Glossário e textos curtos para ajuda contextual (cidadão).
 *
 * Nomenclatura na UI: a nota 0–100 de um ente em um objetivo chama-se **Índice**
 * (não “Sub-índice”). Não há índice geral entre objetivos na plataforma.
 * A chave `subIndice` abaixo é só identificador legado no código; o campo de
 * dados continua `sub_indice`. Em copy/labels, use sempre “Índice” / “índice”.
 */

export const GLOSSARIO = {
  /** Texto do tip “O que é o índice?” — rótulo na UI é Índice, não Sub-índice. */
  subIndice:
    'Nota de 0 a 100 de um ente em um objetivo da ENGD. É a média simples dos indicadores daquele objetivo — todos com o mesmo peso. Não é uma média entre os dez objetivos.',
  mediaDoNivel:
    'Para cada objetivo, é a média das notas dos entes daquele nível (por exemplo, todos os estados ou os municípios com 100 mil habitantes ou mais) que têm dado. Serve de referência de comparação — não é um ranking nem a média entre objetivos diferentes.',
  scoreTag:
    'Nota de 0 a 100 do ente na categoria temática escolhida. É a média dos indicadores ativos associados a essa tag.',
  fonte:
    'Base de dados pública de onde o indicador foi extraído (pesquisas, painéis e cadastros oficiais). Em Metodologia você encontra a lista completa das instituições.',
} as const

/**
 * Frase cidadã: o que medimos em cada objetivo (tom “avaliação”, não recomendação de política).
 * Validar copy com a frente de pesquisa quando possível.
 */
export const OBJETIVO_O_QUE_AVALIA: Record<
  string,
  { blurb: string; detalhe: string }
> = {
  'gestao-e-governanca': {
    blurb:
      'Estruturas de gestão e governança de TI e de governo digital no órgão.',
    detalhe:
      'Avalia se há área responsável, planejamento, comitês e práticas de governança da transformação digital — a partir de indicadores de pesquisas e painéis oficiais.',
  },
  'qualidade-dos-servicos-publicos': {
    blurb:
      'Qualidade e acesso aos serviços públicos digitais oferecidos ao cidadão.',
    detalhe:
      'Olha canais digitais, usabilidade, acessibilidade e experiência de atendimento online, com base em indicadores de serviços e pesquisas setoriais.',
  },
  'identidade-unica-do-cidadao': {
    blurb: 'Identificação e autenticação digital do cidadão nos serviços.',
    detalhe:
      'Mede avanços em identidade digital e login único. Neste recorte a cobertura de dados ainda é limitada — por isso o objetivo pode aparecer desabilitado em alguns níveis.',
  },
  'privacidade-e-seguranca': {
    blurb: 'Privacidade, proteção de dados pessoais e segurança da informação.',
    detalhe:
      'Avalia práticas de LGPD, governança de segurança e maturidade cibernética nos órgãos, com indicadores de pesquisas e avaliações oficiais.',
  },
  'inteligencia-de-dados': {
    blurb: 'Uso, compartilhamento e interoperabilidade de dados no governo.',
    detalhe:
      'Verifica capacidade de reutilizar dados, integrar sistemas e apoiar decisões e serviços com informação já disponível na administração pública.',
  },
  'infraestrutura-digital': {
    blurb: 'Infraestrutura tecnológica, conectividade e plataformas digitais.',
    detalhe:
      'Mede condições de rede, plataformas e capacidade tecnológica que sustentam os serviços digitais do ente.',
  },
  'ecossistema-de-inovacao': {
    blurb: 'Inovação, tecnologias emergentes e ecossistema de governo digital.',
    detalhe:
      'Avalia iniciativas de inovação, laboratórios, parcerias e uso de tecnologias emergentes no setor público.',
  },
  'eficiencia-e-colaboracao': {
    blurb: 'Eficiência de processos e compartilhamento de soluções digitais.',
    detalhe:
      'Olha digitalização de processos, compras e soluções compartilhadas que reduzem burocracia e custos na administração.',
  },
  'transparencia-e-participacao': {
    blurb: 'Transparência, dados abertos e participação social digital.',
    detalhe:
      'Mede publicação de informações, dados abertos e canais digitais de participação e controle social.',
  },
  'competencias-e-capacitacao': {
    blurb: 'Capacitação e competências digitais das equipes do governo.',
    detalhe:
      'Avalia formação, desenvolvimento de competências e cultura de governo digital entre servidores e lideranças.',
  },
}

export function oQueAvaliaObjetivo(slug: string): {
  blurb: string
  detalhe: string
} {
  return (
    OBJETIVO_O_QUE_AVALIA[slug] ?? {
      blurb:
        objectives.find(o => o.slug === slug)?.summary ??
        'Objetivo da Estratégia Nacional de Governo Digital.',
      detalhe:
        objectives.find(o => o.slug === slug)?.description ??
        'Consulte a página do objetivo e a Metodologia para mais detalhes.',
    }
  )
}

/** Mapeia id da fonte OBGD → slug da página `/metodologia/fontes/[slug]`. */
const FONTE_ID_PARA_METODOLOGIA: Record<string, string> = {
  tic_gov: 'cetic-br',
  tic_saude: 'cetic-br',
  tic_educacao: 'cetic-br',
  tic_cultura: 'cetic-br',
  tic_domicilios: 'cetic-br',
  iesgo: 'tcu',
  iospd: 'abep-tic',
  anatel: 'anatel',
  censo_escolar: 'inep',
  pnad_tic: 'ibge',
  munic: 'ibge',
  estadic: 'ibge',
  sgd_sat: 'mgi',
  igovsisp: 'mgi',
}

export type FonteResumo = {
  id: string
  nome: string
  instituicao: string
  /** Href para página de fonte ou fallback Metodologia. */
  href: string
}

function hrefFonte(fonteId: string): string {
  const slug = FONTE_ID_PARA_METODOLOGIA[fonteId]
  return slug ? `/metodologia/fontes/${slug}` : '/metodologia'
}

/** Fontes distintas dos indicadores ativos de um objetivo (1–10). */
export function fontesDoObjetivo(objetivoNumero: number): FonteResumo[] {
  const ids = new Set<string>()
  for (const ind of indicadores) {
    if (ind.status !== 'ativo') continue
    if (ind.objetivo_id !== objetivoNumero) continue
    ids.add(ind.fonte_id)
  }
  return [...ids]
    .map(id => {
      const f = fonteById.get(id)
      if (!f) return null
      return {
        id,
        nome: f.nome,
        instituicao: f.instituicao,
        href: hrefFonte(id),
      }
    })
    .filter((x): x is FonteResumo => x !== null)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}

/** União das fontes de todos os objetivos ENGD (recorte “perfil por objetivo”). */
export function fontesTodosObjetivosAtivos(): FonteResumo[] {
  const ids = new Set<string>()
  for (const ind of indicadores) {
    if (ind.status !== 'ativo') continue
    if (ind.objetivo_id == null) continue
    ids.add(ind.fonte_id)
  }
  return [...ids]
    .map(id => {
      const f = fonteById.get(id)
      if (!f) return null
      return {
        id,
        nome: f.nome,
        instituicao: f.instituicao,
        href: hrefFonte(id),
      }
    })
    .filter((x): x is FonteResumo => x !== null)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}

/** Resolve nomes de fonte (rótulo da UI) → resumo com link. */
export function fontesPorNomes(nomes: string[]): FonteResumo[] {
  const byNome = new Map(fontesObgd.map(f => [f.nome, f]))
  const seen = new Set<string>()
  const out: FonteResumo[] = []
  for (const nome of nomes) {
    const f = byNome.get(nome)
    if (!f || seen.has(f.id)) continue
    seen.add(f.id)
    out.push({
      id: f.id,
      nome: f.nome,
      instituicao: f.instituicao,
      href: hrefFonte(f.id),
    })
  }
  return out.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}
