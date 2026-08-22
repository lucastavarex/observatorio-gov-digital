import { Compass, Database, Scale, Target } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PublicationsGrid } from '@/components/content/publications-list'
import { getHomeData } from '@/components/home/home-data'
import { VisualDados } from '@/components/home/home-feature-visuals'
import { NumeroAnimado } from '@/components/home/numero-animado'
import { PesoVariavel } from '@/components/home/peso-variavel'
import { PixelCanvas } from '@/components/home/pixel-canvas'
import { ScrollRevealText } from '@/components/shared/scroll-reveal-text'
import { Button } from '@/components/ui/button'
import { objectives } from '@/data/objectives'
import { publications } from '@/data/publications'
import { observatorioLead } from '@/data/site-copy'
import {
  resolvePlatformVariant,
  variantLink,
} from '@/lib/features/resolve-variant'

export const metadata: Metadata = {
  title: 'Home v3',
  description:
    'Da Estratégia Nacional de Governo Digital aos indicadores comparáveis: entenda como o Observatório mede a transformação digital do setor público.',
}

const passos = [
  {
    icon: Target,
    titulo: 'A estratégia',
    texto:
      'Partimos dos dez objetivos da Estratégia Nacional de Governo Digital, que orientam a transformação digital de todos os entes federados.',
  },
  {
    icon: Database,
    titulo: 'Os dados',
    texto:
      'Reunimos dados de dezenas de fontes oficiais e os organizamos em variáveis comparáveis, com metodologia aberta e verificável.',
  },
  {
    icon: Scale,
    titulo: 'O índice',
    texto:
      'Cada variável é normalizada e agregada em um índice, permitindo comparar entes de diferentes níveis em uma mesma escala.',
  },
  {
    icon: Compass,
    titulo: 'A exploração',
    texto:
      'O resultado é um retrato transparente da evolução do governo digital, pronto para explorar, comparar e baixar.',
  },
]

export default async function HomeV3Page() {
  await resolvePlatformVariant()
  const link = await variantLink()
  const { variaveisDestaque, parceiros, numeros } = getHomeData()

  const escopo = [
    { valor: String(numeros.entesTotal), label: 'Entes avaliados' },
    { valor: String(numeros.municipios), label: 'Municípios (100 mil+ hab.)' },
    { valor: String(numeros.variaveis), label: 'Variáveis' },
    { valor: String(numeros.objetivos), label: 'Objetivos da ENGD' },
  ]

  return (
    <section className="pb-12">
      {/* Hero atmosférico com CTAs */}
      <div className="relative">
        <PixelCanvas
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"
          colors={['#d1d1d1', '#bcbcbc', '#a1a1a1']}
          gap={12}
          pixelSize={1.6}
          speed={40}
          appearFrom="middle"
          duration={0.9}
        />

        <div className="px-6 py-52 text-center sm:px-10">
          <PesoVariavel
            as="h1"
            texto="Dados abertos sobre o governo digital"
            de={400}
            para={800}
            forca={22}
            duracao={0.12}
            className="mx-auto mt-3 block max-w-3xl bg-linear-to-br from-primary to-primary-glow bg-clip-text pb-2 text-3xl text-transparent leading-[1.1] tracking-tight sm:text-5xl"
          />
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            Transformamos a Estratégia Nacional de Governo Digital em
            indicadores comparáveis sobre a transformação digital do setor
            público brasileiro: abertos, verificáveis e prontos para explorar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-auto rounded-full bg-primary px-8 py-3 text-primary-foreground text-sm hover:bg-primary/90 has-[>svg]:px-8"
            >
              <Link href={link('/indicadores')}>Explorar indicadores</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-border bg-white px-8 py-3 text-primary text-sm shadow-none hover:bg-primary/5 hover:text-primary"
            >
              <Link href={link('/metodologia')}>Como medimos</Link>
            </Button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Como funciona: 4 passos estáticos e bem estruturados */}
      <div className="px-6 py-20 sm:px-10">
        <div className="max-w-2xl">
          <span className="font-medium text-primary text-sm">
            Como funciona
          </span>
          <h2 className="mt-3 font-bold text-3xl text-foreground leading-tight tracking-tight sm:text-4xl">
            Da política pública ao indicador
          </h2>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            Quatro etapas separam a Estratégia Nacional de Governo Digital de um
            número que você pode comparar e baixar.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((passo, i) => (
            <div
              key={passo.titulo}
              className="flex flex-col rounded-xl border bg-background p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-2xl text-primary/25 tabular-nums leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <passo.icon
                    aria-hidden="true"
                    className="size-5 text-primary"
                  />
                </span>
              </div>
              <h3 className="mt-6 font-semibold text-foreground text-lg">
                {passo.titulo}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {passo.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Faixa de escopo: strip de números */}
      <div className="-mx-6 border-y px-6 py-14 sm:-mx-10 sm:px-10">
        <p className="text-center font-medium text-muted-foreground text-sm">
          O alcance do Observatório
        </p>
        <dl className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
          {escopo.map(item => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center"
            >
              <dt className="font-bold text-4xl text-foreground tabular-nums leading-none tracking-tight sm:text-5xl">
                <NumeroAnimado value={item.valor} />
              </dt>
              <dd className="mt-3 text-muted-foreground text-xs leading-snug sm:text-sm">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Declaração de missão (scroll reveal, instância única) */}
      <div className="px-6 pt-0 pb-40 sm:px-10">
        <ScrollRevealText
          text={observatorioLead}
          trackClassName="-mt-16"
          start="top 65%"
          className="max-w-4xl font-medium text-2xl leading-snug tracking-tight sm:text-4xl sm:leading-snug"
        />
      </div>

      {/* Prova de transparência: variáveis com fonte */}
      <div className="grid gap-8 border-t px-6 py-20 sm:px-10 lg:grid-cols-3 lg:gap-0">
        <div className="lg:pr-10">
          <span className="font-medium text-primary text-sm">
            Transparência
          </span>
          <h2 className="mt-3 font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
            Cada número tem uma fonte
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground text-sm leading-relaxed">
            Nada é caixa-preta: toda variável aponta para a fonte oficial e
            disponibiliza o recorte normalizado usado no índice para download.
          </p>
          <Link
            href={link('/metodologia')}
            className="mt-5 inline-block font-medium text-primary text-sm transition-opacity hover:opacity-70"
          >
            Ver a metodologia
          </Link>
        </div>
        <div className="flex items-start justify-center lg:col-span-2 lg:dash-l lg:pr-6 lg:pl-8">
          <VisualDados
            variaveis={variaveisDestaque.map(v => ({
              slug: v.slug,
              nome: v.nome,
              fonte: v.fonte,
              href: link(v.path),
            }))}
          />
        </div>
      </div>

      {/* Objetivos: a espinha dorsal */}
      <div className="border-t px-6 py-20 sm:px-10">
        <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          Os dez objetivos da ENGD
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground text-sm leading-relaxed">
          A espinha dorsal de toda a análise. Cada objetivo reúne recomendações
          e variáveis que compõem a nota de cada ente.
        </p>
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

      {/* Prova institucional: parceiros */}
      <div className="border-t px-6 py-16 sm:px-10">
        <p className="text-center font-medium text-muted-foreground text-sm">
          Uma iniciativa construída em parceria
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
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

      {/* CTA final */}
      <div className="relative border-t">
        <PixelCanvas
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_at_center,transparent_30%,black_85%)]"
          colors={['#d1d1d1', '#bcbcbc', '#a1a1a1']}
          gap={12}
          pixelSize={1.6}
          speed={40}
          appearFrom="middle"
          duration={0.9}
        />
        <div className="px-6 py-28 text-center sm:px-10">
          <h2 className="mx-auto max-w-2xl font-bold text-3xl text-foreground leading-tight tracking-tight sm:text-4xl">
            Agora é com você
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            Explore os indicadores, compare entes e baixe os dados por trás de
            cada número.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="h-auto rounded-full bg-primary px-8 py-3 text-primary-foreground text-sm hover:bg-primary/90 has-[>svg]:px-8"
            >
              <Link href={link('/indicadores')}>Explorar indicadores</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-border bg-white px-8 py-3 text-primary text-sm shadow-none hover:bg-primary/5 hover:text-primary"
            >
              <Link href={link('/sobre')}>Conhecer o projeto</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Publicações */}
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
    </section>
  )
}
