import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PublicationsGrid } from '@/components/content/publications-list'
import { getHomeData } from '@/components/home/home-data'
import {
  VisualDados,
  VisualPerfil,
} from '@/components/home/home-feature-visuals'
import { PesoVariavel } from '@/components/home/peso-variavel'
import { PixelCanvas } from '@/components/home/pixel-canvas'
import { Button } from '@/components/ui/button'
import { objectives } from '@/data/objectives'
import { publications } from '@/data/publications'
import { observatorioLead } from '@/data/site-copy'
import {
  resolvePlatformVariant,
  variantLink,
} from '@/lib/features/resolve-variant'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Home v1',
  description:
    'O Observatório Brasileiro de Governo Digital reúne, em um só lugar, os indicadores dispersos sobre a transformação digital do setor público brasileiro.',
}

export default async function HomeV1Page() {
  await resolvePlatformVariant()
  const link = await variantLink()
  const { estadual, mediasEstadual, variaveisDestaque, parceiros } =
    getHomeData()

  const recursos = [
    {
      titulo: 'Compare o desempenho de cada ente',
      texto:
        'Notas de desenvolvimento digital para o governo federal, os 27 estados, as 27 capitais e os municípios com 100 mil habitantes ou mais, nos dez objetivos da ENGD. Radares comparam o perfil de cada um com a média do nível.',
      cta: { label: 'Explorar indicadores', href: link('/indicadores') },
      visual: <VisualPerfil entes={estadual.entes} medias={mediasEstadual} />,
    },
    {
      titulo: 'Chegue até a fonte de cada número',
      texto:
        'Cada variável traz a fonte oficial e o download do recorte usado no índice (valores normalizados do snapshot), com metodologia transparente e verificável.',
      cta: { label: 'Ver metodologia', href: link('/metodologia') },
      visual: (
        <VisualDados
          variaveis={variaveisDestaque.map(v => ({
            slug: v.slug,
            nome: v.nome,
            fonte: v.fonte,
            href: link(v.path),
          }))}
        />
      ),
    },
  ]

  return (
    <section className="pb-12">
      {/* Hero: propósito explícito logo na primeira dobra */}
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

        <div className="px-6 py-48 text-center sm:px-10">
          <PesoVariavel
            as="h1"
            texto="Entenda como o governo digital evolui no Brasil"
            de={400}
            para={800}
            forca={22}
            duracao={0.12}
            className="mx-auto mt-3 block max-w-3xl bg-linear-to-br from-primary to-primary-glow bg-clip-text pb-2 text-3xl text-transparent leading-[1.1] tracking-tight sm:text-5xl"
          />
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
            Uma plataforma pública que reúne, organiza e dá transparência aos
            indicadores da transformação digital do setor público, para que você
            acompanhe, compare e explore o desempenho de cada ente federado.
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
              <Link href={link('/sobre')}>O que é o Observatório</Link>
            </Button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Problema → Solução */}
      <div className="grid gap-8 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="font-medium text-muted-foreground text-sm">
            O problema
          </span>
          <h2 className="mt-3 font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
            Os dados existem, mas estão espalhados
          </h2>
          <p className="mt-4 max-w-md text-foreground text-base leading-relaxed">
            Apesar dos avanços das políticas de governo digital, as informações
            que mostram como o setor público brasileiro está se transformando
            ficam dispersas em dezenas de bases diferentes. Isso torna difícil
            acompanhar a evolução, comparar entes e identificar gargalos.
          </p>
        </div>
        <div className="lg:border-l lg:pl-16">
          <span className="font-medium text-primary text-sm">A solução</span>
          <h2 className="mt-3 font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
            Tudo em um só lugar, de forma comparável
          </h2>
          <p className="mt-4 max-w-md text-base text-foreground leading-relaxed">
            {observatorioLead}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* O que você encontra */}
      <div className="px-6 sm:px-10">
        <div className=" pt-14 ">
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            O que você encontra aqui
          </h2>
        </div>
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
                <h3 className="font-semibold text-foreground text-lg">
                  {r.titulo}
                </h3>
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

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Prova institucional: parceiros */}
      <div className="px-6 py-16 sm:px-10">
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

      {/* Os dez objetivos */}
      <div className="px-6 py-20 sm:px-10">
        <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          Os dez objetivos da ENGD
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground text-sm leading-relaxed">
          Toda a análise se organiza em torno dos dez objetivos da Estratégia
          Nacional de Governo Digital, a espinha dorsal dos indicadores.
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
    </section>
  )
}
