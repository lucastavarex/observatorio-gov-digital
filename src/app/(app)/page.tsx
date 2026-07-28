import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { NewsGrid } from '@/components/content/news-list'
import { PublicationsGrid } from '@/components/content/publications-list'
import {
  VisualDados,
  VisualMapa,
  VisualPerfil,
} from '@/components/home/home-feature-visuals'
import { PesoVariavel } from '@/components/home/peso-variavel'
import { PixelCanvas } from '@/components/home/pixel-canvas'
import { ScrollRevealText } from '@/components/shared/scroll-reveal-text'
import { Button } from '@/components/ui/button'
import { mediasPorObjetivo, niveis } from '@/data/indicators'
import { newsArticles } from '@/data/news'
import { getEnteComVariaveis } from '@/data/obgd/server'
import { objectives } from '@/data/objectives'
import { publications } from '@/data/publications'
import { observatorioLead } from '@/data/site-copy'
import { rankingEnabledForVariant } from '@/lib/features/ranking-mode'
import {
  resolvePlatformVariant,
  variantLink,
} from '@/lib/features/resolve-variant'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Observatório Brasileiro de Governo Digital',
  description:
    'Acompanhe, compare e explore o desempenho do governo federal, dos estados e das capitais nos dez objetivos da ENGD.',
}

function getNivelEstadual() {
  const nivel = niveis.find(n => n.key === 'estadual')
  if (!nivel) {
    throw new Error('Nível estadual não encontrado nos dados')
  }
  return nivel
}

const estadual = getNivelEstadual()
const enteDestaque = estadual.entes[0]
const mediasEstadual = mediasPorObjetivo(estadual)

const enteComVariaveis = getEnteComVariaveis('estadual', enteDestaque.slug)
const variaveisDestaque = (enteComVariaveis?.objetivos ?? [])
  .flatMap(o => o.variaveis)
  .slice(0, 5)
  .map(v => ({ slug: v.slug, nome: v.nome, fonte: v.fonte }))

const parceiros = [
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

export default async function HomePage() {
  const variant = await resolvePlatformVariant()
  const rankingOn = rankingEnabledForVariant(variant)
  const link = await variantLink()

  const recursos = [
    {
      titulo: 'Indicadores por ente',
      texto:
        'Notas de maturidade digital para o governo federal, os 27 estados e as capitais, nos dez objetivos da ENGD. Radares comparam o perfil de cada um com a média do nível.',
      cta: { label: 'Explorar indicadores', href: link('/indicadores') },
      visual: <VisualPerfil entes={estadual.entes} medias={mediasEstadual} />,
      show: true,
    },
    {
      titulo: 'Ranking comparativo',
      texto:
        'Compare o desempenho dos entes e desça do ranking do nível até o ente, a nota de cada objetivo e as variáveis disponíveis para download.',
      cta: { label: 'Ver ranking', href: link('/ranking') },
      visual: <VisualMapa entes={estadual.entes} />,
      show: rankingOn,
    },
    {
      titulo: 'Dados abertos e verificáveis',
      texto:
        'Cada variável traz a fonte oficial e os dados para download, com metodologia transparente.',
      cta: { label: 'Ver metodologia', href: link('/metodologia') },
      visual: <VisualDados variaveis={variaveisDestaque} />,
      show: true,
    },
  ].filter(r => r.show)

  return (
    <section className="pb-12">
      <div className="relative">
        <PixelCanvas
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"
          colors={['#d1d1d1', '#bcbcbc', '#a1a1a1']}
          gap={12}
          pixelSize={1.6}
          speed={40}
          appearFrom="middle"
          duration={0.9}
        />

        <div className="px-6 py-56 text-center sm:px-10">
          <PesoVariavel
            as="h1"
            texto="Dados abertos sobre a evolução digital dos governos"
            de={400}
            para={800}
            forca={22}
            duracao={0.12}
            className="mx-auto block max-w-3xl bg-linear-to-br from-primary to-primary-glow bg-clip-text pb-2 text-3xl text-transparent leading-[1.1] tracking-tight sm:text-5xl"
          />
          <p className="mx-auto mt-0 max-w-3xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            Acompanhe, compare e explore o desempenho do governo federal, dos
            estados e das capitais nos dez objetivos da Estratégia Nacional de
            Governo Digital.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-auto rounded-full bg-primary px-8 py-3 text-primary-foreground text-sm hover:bg-primary/90 has-[>svg]:px-8"
            >
              <Link href={link('/indicadores')}>Explorar indicadores</Link>
            </Button>
            {rankingOn && (
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-full border-border bg-white px-8 py-3 text-primary text-sm shadow-none hover:bg-primary/5 hover:text-primary"
              >
                <Link href={link('/ranking')}>Ver ranking</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      <div className="px-6 py-16 sm:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {parceiros.map(parceiro => (
            <a
              key={parceiro.src}
              href={parceiro.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-40 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
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

      <div aria-hidden="true" className="h-px bg-border" />

      <div className="px-6 sm:px-10">
        <div className="-mx-6 overflow-hidden sm:-mx-10">
          {recursos.map((r, i) => (
            <div
              key={r.titulo}
              className={cn(
                'grid gap-8 px-6 py-14 sm:px-10 lg:min-h-[28rem] lg:grid-cols-3 lg:gap-0',
                i > 0 && 'border-t'
              )}
            >
              <div className="lg:pr-10">
                <h2 className="font-semibold text-foreground text-lg">
                  {r.titulo}
                </h2>
                <p className="mt-1 max-w-sm text-muted-foreground text-sm leading-relaxed">
                  {r.texto}
                </p>
                <Link
                  href={r.cta.href}
                  className="mt-5 inline-block font-medium text-primary text-sm transition-opacity hover:opacity-70"
                >
                  {r.cta.label}
                </Link>
              </div>

              <div className="flex items-start justify-center lg:col-span-2 lg:dash-l lg:pr-6 lg:pl-8">
                {r.visual}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-0 pb-44 sm:px-10">
        <ScrollRevealText
          text={observatorioLead}
          trackClassName="-mt-16"
          start="top 65%"
          className="max-w-4xl font-medium text-2xl leading-snug tracking-tight sm:text-4xl sm:leading-snug"
        />
      </div>

      <div className="px-6 py-20 sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Publicações
          </h2>
          <Link
            href={link('/publicacoes')}
            className="font-medium text-primary text-sm transition-opacity hover:opacity-70"
          >
            Ver todas as publicações
          </Link>
        </div>
        <div className="-mx-6 mt-10 sm:-mx-10">
          <PublicationsGrid items={publications.slice(0, 4)} />
        </div>
      </div>

      <div className="px-6 py-20 sm:px-10">
        <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          Os dez objetivos da ENGD
        </h2>
        <div className="dash-t -mx-6 mt-10 sm:-mx-10">
          {objectives.map((objective, index) => (
            <Link
              key={objective.slug}
              href={link(`/objetivos/${objective.slug}`)}
              className="dash-b grid gap-2 px-6 py-6 transition-colors hover:bg-muted/60 sm:px-10 lg:grid-cols-3 lg:gap-16"
            >
              <h3 className="flex gap-3 font-medium text-primary text-sm tracking-tight">
                <span className="text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {objective.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed lg:col-span-2">
                {objective.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 py-20 sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Últimas notícias
          </h2>
          <Link
            href={link('/noticias')}
            className="font-medium text-primary text-sm transition-opacity hover:opacity-70"
          >
            Ver todas as notícias
          </Link>
        </div>
        <div className="-mx-6 mt-10 sm:-mx-10">
          <NewsGrid articles={newsArticles.slice(0, 4)} />
        </div>
      </div>
    </section>
  )
}
