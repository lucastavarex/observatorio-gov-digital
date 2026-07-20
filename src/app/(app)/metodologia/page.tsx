import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { objectives } from '@/data/objectives'

export const metadata = { title: 'Metodologia' }

const fontes = [
  { name: 'CETIC.br', url: 'https://cetic.br/' },
  {
    name: 'Ministério da Gestão e Inovação (MGI)',
    url: 'https://www.gov.br/gestao/pt-br',
  },
  { name: 'Gov.br', url: 'https://www.gov.br/pt-br' },
  {
    name: 'Tribunal de Contas da União (TCU)',
    url: 'https://portal.tcu.gov.br/',
  },
  { name: 'IBGE', url: 'https://www.ibge.gov.br/' },
  { name: 'INEP', url: 'https://www.gov.br/inep/pt-br' },
  { name: 'ANATEL', url: 'https://www.gov.br/anatel/pt-br' },
  { name: 'ABEP-TIC', url: 'https://abep-tic.org.br/' },
  {
    name: 'Controladoria-Geral da União (CGU)',
    url: 'https://www.gov.br/cgu/pt-br',
  },
]

type Etapa = {
  label: string
  paragraphs: string[]
  list?: { title?: string; items: string[] }
}

const etapas: Etapa[] = [
  {
    label: '01 · Seleção das fontes de dados',
    paragraphs: [
      'O primeiro passo consiste na identificação e avaliação das principais bases de dados relacionadas à transformação digital no setor público. Somente bases que atendem aos critérios de qualidade passam a compor o Observatório.',
    ],
    list: {
      title: 'Cada fonte é analisada considerando critérios como:',
      items: [
        'relevância para Governo Digital',
        'cobertura nacional',
        'disponibilidade de série histórica',
        'periodicidade de atualização',
        'qualidade metodológica',
        'continuidade da pesquisa',
      ],
    },
  },
  {
    label: '02 · Seleção dos indicadores',
    paragraphs: [
      'Após a definição das bases, cada variável é analisada individualmente. São selecionados apenas indicadores que representem de forma objetiva aspectos relacionados ao Governo Digital e aos objetivos definidos pela Estratégia Nacional de Governo Digital (ENGD).',
      'Esse processo garante que o índice seja composto apenas por indicadores relevantes e comparáveis ao longo do tempo.',
    ],
    list: {
      title: 'São excluídas variáveis que:',
      items: [
        'representem apenas detalhes operacionais',
        'reflitam percepções subjetivas sem relação direta com a atuação governamental',
        'sejam redundantes',
        'não possuam relação com os objetivos da ENGD',
        'correspondam apenas a informações administrativas ou de controle da pesquisa',
      ],
    },
  },
  {
    label: '03 · Organização dos indicadores',
    paragraphs: [
      'Os indicadores são organizados conforme os dez objetivos estratégicos da Estratégia Nacional de Governo Digital (ENGD). Essa estrutura permite analisar tanto a evolução de cada dimensão quanto o desempenho geral do Governo Digital no Brasil.',
    ],
  },
  {
    label: '04 · Padronização dos dados',
    paragraphs: [
      'Como as diferentes bases utilizam escalas distintas, todos os indicadores são convertidos para uma escala única de 0 a 100. Dependendo da natureza da informação, são aplicadas diferentes estratégias de normalização para garantir comparabilidade entre indicadores provenientes de fontes distintas.',
      'Nos casos em que determinada pesquisa não é realizada anualmente, é utilizada a técnica Last Observation Carried Forward (LOCF), que mantém o último valor disponível até a publicação de uma nova edição da pesquisa, preservando a continuidade das séries históricas.',
    ],
  },
  {
    label: '05 · Cálculo do índice',
    paragraphs: [
      'O cálculo ocorre em dois níveis. Nos subíndices, para cada um dos dez objetivos da ENGD é calculada a média simples dos indicadores associados — todos com o mesmo peso nesta versão do Observatório.',
      'O Índice Geral do Governo Digital corresponde à média dos dez subíndices, oferecendo uma visão consolidada da evolução da transformação digital no país. A metodologia foi concebida para permitir futuras evoluções, incluindo novas fontes, indicadores adicionais e modelos de ponderação.',
    ],
  },
]

const principios = [
  {
    name: 'Transparência',
    description: 'Critérios e procedimentos metodológicos são públicos.',
  },
  {
    name: 'Rigor técnico',
    description:
      'Utilização de bases de dados reconhecidas e metodologias consistentes.',
  },
  {
    name: 'Comparabilidade',
    description:
      'Indicadores padronizados permitem acompanhar a evolução ao longo do tempo.',
  },
  {
    name: 'Atualização contínua',
    description:
      'Incorporação de novas fontes e aperfeiçoamento permanente da metodologia.',
  },
  {
    name: 'Base em evidências',
    description:
      'Todas as análises são fundamentadas em dados objetivos e verificáveis.',
  },
]

export default function MetodologiaPage() {
  return (
    <section className="pb-12">
      <div className="px-6 pb-16 pt-28 sm:px-10">
        <span className="text-sm font-medium text-muted-foreground">
          Metodologia
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          Como medimos a
          <br />
          maturidade digital
        </h1>
        <div className="mt-6 flex flex-col items-start gap-8">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            O Observatório Brasileiro de Governo Digital monitora a evolução da
            transformação digital no setor público brasileiro por meio de uma
            metodologia baseada em evidências, utilizando indicadores
            provenientes de bases de dados públicas e institucionais. Ela foi
            desenvolvida para garantir transparência, reprodutibilidade e
            atualização contínua dos resultados.
          </p>
          <Button
            asChild
            className="h-auto shrink-0 rounded-full bg-primary px-6 py-3.5 text-primary-foreground hover:bg-primary/90"
          >
            <a
              href="/metodologia-completa.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver metodologia completa
            </a>
          </Button>
        </div>

        <div aria-hidden="true" className="dash-t -mx-6 mt-16 h-px sm:-mx-10" />
        <h2 className="mt-8 font-bold text-foreground text-sm">
          Estrutura metodológica
        </h2>
        <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed">
          A construção dos indicadores segue cinco etapas principais.
        </p>
        <div className="-mx-6 mt-6 dash-t sm:-mx-10">
          {etapas.map((etapa, index) => (
            <div
              key={etapa.label}
              className={`grid gap-4 px-6 py-8 sm:px-10 lg:grid-cols-3 lg:gap-16 ${
                index === etapas.length - 1 ? 'border-b' : 'dash-b'
              }`}
            >
              <h3 className="text-sm font-medium tracking-tight text-primary">
                {etapa.label}
              </h3>
              <div className="space-y-4 lg:col-span-2">
                {etapa.paragraphs.map(paragraph => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
                {etapa.list && (
                  <div>
                    {etapa.list.title && (
                      <p className="text-sm font-medium text-foreground">
                        {etapa.list.title}
                      </p>
                    )}
                    <ul className="mt-2 space-y-1.5">
                      {etapa.list.items.map(item => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-sm font-bold text-foreground">
          Os dez objetivos da ENGD
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Os indicadores são organizados conforme os dez objetivos estratégicos
          da Estratégia Nacional de Governo Digital.
        </p>
        <ol className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border bg-border sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5">
          {objectives.map((objetivo, index) => (
            <li key={objetivo.slug} className="bg-background">
              <Link
                href={`/objetivos/${objetivo.slug}`}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/60"
              >
                <span className="font-semibold text-primary text-sm tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-foreground text-sm">
                  {objetivo.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div aria-hidden="true" className="dash-t -mx-6 mt-16 h-px sm:-mx-10" />
        <h2 className="mt-8 font-bold text-foreground text-sm">
          Principais fontes de dados
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {fontes.map(fonte => (
            <a
              key={fonte.name}
              href={fonte.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              {fonte.name}
            </a>
          ))}
        </div>

        <div aria-hidden="true" className="dash-t -mx-6 mt-16 h-px sm:-mx-10" />
        <h2 className="mt-8 font-bold text-foreground text-sm">
          Evolução contínua da metodologia
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A metodologia do Observatório é dinâmica. Novas fontes de informação
          podem ser incorporadas à medida que se tornam disponíveis, ampliando a
          cobertura dos indicadores e a precisão das análises. Também estão
          previstas parcerias institucionais para acesso a microdados e bases
          mais detalhadas, permitindo análises em níveis nacional, estadual e
          municipal.
        </p>

        <div aria-hidden="true" className="dash-t -mx-6 mt-16 h-px sm:-mx-10" />
        <h2 className="mt-8 font-bold text-foreground text-sm">
          Princípios da metodologia
        </h2>
        <div className="-mx-6 mt-6 dash-t sm:-mx-10">
          {principios.map((principio, index) => (
            <div
              key={principio.name}
              className={`grid gap-2 px-6 py-8 sm:px-10 lg:grid-cols-3 lg:gap-16 ${
                index === principios.length - 1 ? '' : 'dash-b'
              }`}
            >
              <h3 className="text-sm font-medium tracking-tight text-primary">
                {principio.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-2">
                {principio.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
