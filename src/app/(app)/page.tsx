import {
  ArrowRight,
  BarChart3,
  Building2,
  Download,
  Layers,
  LineChart,
  Radar as RadarIcon,
  ShieldCheck,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { DistribuicaoChart } from '@/components/charts/distribuicao-chart'
import {
  ObjetivosRadar,
  type RadarSerie,
} from '@/components/charts/objetivos-radar'
import { EnteRankingList } from '@/components/ranking/ente-ranking-list'
import { HomeFaq } from '@/components/shared/home-faq'
import { Button } from '@/components/ui/button'
import { mediasPorObjetivo, niveis } from '@/data/indicators'
import { objectives } from '@/data/objectives'

export const metadata: Metadata = {
  title: 'Observatório Brasileiro de Governo Digital',
  description:
    'Acompanhe, compare e explore o desempenho do governo federal, dos estados e das capitais nos dez objetivos da ENGD.',
}

function getNivelEstadual() {
  const nivel = niveis.find(n => n.key === 'estadual')
  if (!nivel) {
    throw new Error('Nível estadual não encontrado nos mocks')
  }
  return nivel
}

const estadual = getNivelEstadual()
const enteDestaque = estadual.entes[0]
const mediasEstadual = mediasPorObjetivo(estadual)

const radarEixos = objectives.map((o, i) => ({
  eixo: String(i + 1).padStart(2, '0'),
  objetivo: o.title,
}))
const radarSeries: RadarSerie[] = [
  {
    nome: enteDestaque.nome,
    cor: 'var(--chart-1)',
    valores: enteDestaque.objetivos.map(o => o.nota),
    fillOpacity: 0.24,
  },
  {
    nome: 'Média do nível',
    cor: 'var(--chart-4)',
    valores: mediasEstadual,
    fillOpacity: 0.12,
  },
]

const recursos = [
  {
    icon: Building2,
    titulo: 'Indicadores por ente',
    texto:
      'Notas de maturidade digital para o governo federal, os 27 estados e as capitais, nos dez objetivos da ENGD.',
  },
  {
    icon: BarChart3,
    titulo: 'Ranking comparativo',
    texto:
      'Compare o desempenho dos entes, veja a distribuição do índice e identifique quem avança mais rápido.',
  },
  {
    icon: Download,
    titulo: 'Dados abertos e verificáveis',
    texto:
      'Cada variável traz a fonte oficial e os dados para download, com metodologia transparente.',
  },
]

const parceiros = [
  {
    src: '/logos/mgi.png',
    alt: 'Ministério da Gestão e da Inovação em Serviços Públicos',
    width: 365,
    height: 135,
    size: 'h-16 sm:h-20',
    href: 'https://www.gov.br/gestao/pt-br',
  },
  {
    src: '/logos/mbc.png',
    alt: 'Movimento Brasil Competitivo',
    width: 247,
    height: 86,
    size: 'h-11 sm:h-14',
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

const dentroDoObservatorio = [
  {
    icon: Layers,
    titulo: '3 níveis de governo',
    texto: 'Federal, estadual e municipal (capitais).',
  },
  {
    icon: RadarIcon,
    titulo: '10 objetivos da ENGD',
    texto: 'Da governança à capacitação digital.',
  },
  {
    icon: LineChart,
    titulo: 'Variáveis rastreáveis',
    texto: 'Cada nota decomposta até o dado bruto.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Fontes públicas',
    texto: 'IBGE, CGU, ABEP-TIC e outras bases oficiais.',
  },
]

export default function HomePage() {
  return (
    <section className="pb-12">
      {/* Hero */}
      <div className="dash-x px-6 pb-16 pt-24 text-center sm:px-10">
        <h1 className="mx-auto max-w-3xl bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl">
          A maturidade digital dos governos, com clareza
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Acompanhe, compare e explore o desempenho do governo federal, dos
          estados e das capitais nos dez objetivos da Estratégia Nacional de
          Governo Digital.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-auto rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground hover:bg-primary/90 has-[>svg]:px-8"
          >
            <Link href="/indicadores">
              Explorar indicadores
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-full border-primary px-8 py-3 text-sm text-primary hover:bg-primary/5 hover:text-primary"
          >
            <Link href="/ranking">Ver ranking</Link>
          </Button>
        </div>
      </div>

      {/* Visual do produto: distribuição real */}
      <div className="dash-x px-6 pb-20 sm:px-10">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b px-5 py-3">
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            <span className="ml-3 text-xs font-medium text-muted-foreground">
              Índice de maturidade digital — Estadual
            </span>
          </div>
          <div className="p-6">
            <DistribuicaoChart
              entes={estadual.entes.map(e => ({
                nome: e.nome,
                indiceGeral: e.indiceGeral,
              }))}
            />
          </div>
        </div>
      </div>

      {/* Parceiros */}
      <div className="dash-x px-6 pb-20 sm:px-10">
        <p className="text-center text-sm text-muted-foreground">
          Construído a partir de fontes públicas e institucionais
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {parceiros.map(parceiro => (
            <a
              key={parceiro.src}
              href={parceiro.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src={parceiro.src}
                alt={parceiro.alt}
                width={parceiro.width}
                height={parceiro.height}
                className={`${parceiro.size} w-auto object-contain`}
              />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          ))}
        </div>
      </div>

      {/* Recursos */}
      <div className="dash-x px-6 py-16 sm:px-10">
        <div className="text-center">
          <span className="text-sm font-medium text-primary">Recursos</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Por que usar o Observatório
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {recursos.map(r => (
            <div key={r.titulo} className="rounded-xl border p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <r.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {r.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {r.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature: do ranking à variável */}
      <div className="dash-x px-6 py-16 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-medium text-primary">Exploração</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Do ranking até a variável
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Comece pelo ranking do nível, entre no ente, veja a nota de cada
              objetivo e desça até as variáveis que compõem o índice — com fonte
              e download em cada uma.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 h-auto rounded-full border-primary px-6 py-3 text-sm text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Link href="/ranking">
                Abrir o ranking
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-card p-4 shadow-sm">
            <EnteRankingList
              entes={estadual.entes.slice(0, 6)}
              basePath="/ranking/estadual"
            />
          </div>
        </div>
      </div>

      {/* Seção escura: o que há dentro */}
      <div className="dash-x px-6 py-16 sm:px-10">
        <div className="rounded-3xl bg-foreground px-8 py-14 text-background sm:px-14">
          <div className="text-center">
            <span className="text-sm font-medium text-background/60">
              Cobertura
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              O que há dentro do Observatório
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dentroDoObservatorio.map(item => (
              <div key={item.titulo}>
                <span className="flex size-10 items-center justify-center rounded-lg bg-background/10 text-background">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{item.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-background/60">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics: radar real */}
      <div className="dash-x px-6 py-16 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border bg-card p-4 shadow-sm lg:order-last">
            <ObjetivosRadar eixos={radarEixos} series={radarSeries} />
          </div>
          <div>
            <span className="text-sm font-medium text-primary">Análises</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Gráficos que revelam o perfil
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Radares comparam o perfil de até três entes nos dez objetivos, e
              distribuições mostram onde cada ente está em relação aos demais.
            </p>
            <Button
              asChild
              className="mt-6 h-auto rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/indicadores">
                Comparar entes
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="dash-x px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-medium text-primary">Dúvidas</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Perguntas frequentes
            </h2>
          </div>
          <HomeFaq />
        </div>
      </div>

      {/* CTA final */}
      <div className="dash-x px-6 py-20 text-center sm:px-10">
        <h2 className="mx-auto max-w-2xl bg-linear-to-br from-primary to-primary-glow bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          Comece a explorar o governo digital
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          Navegue pelos indicadores, compare entes e baixe os dados que
          sustentam cada nota.
        </p>
        <Button
          asChild
          className="mt-8 h-auto rounded-full bg-primary px-8 py-4 text-sm text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/indicadores">
            Explorar indicadores
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
