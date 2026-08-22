import {
  Building2,
  Database,
  GraduationCap,
  MapPin,
  Scale,
  Users,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PublicationsGrid } from '@/components/content/publications-list'
import { getHomeData } from '@/components/home/home-data'
import { VisualPerfil } from '@/components/home/home-feature-visuals'
import { PesoVariavel } from '@/components/home/peso-variavel'
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
  title: 'Home v2',
  description:
    'Como está o desenvolvimento digital do seu governo? O Observatório responde com indicadores comparáveis, baseados em dados oficiais.',
}

export default async function HomeV2Page() {
  await resolvePlatformVariant()
  const link = await variantLink()
  const { estadual, mediasEstadual, parceiros } = getHomeData()

  const perguntas = [
    {
      icon: MapPin,
      pergunta: 'Quão digital é o meu estado ou município?',
      resposta:
        'Veja a nota de desenvolvimento digital de cada ente nos dez objetivos da ENGD.',
      cta: { label: 'Ver indicadores', href: link('/indicadores') },
    },
    {
      icon: Scale,
      pergunta: 'Como ele se compara com os demais?',
      resposta:
        'Compare entes lado a lado e entenda onde cada um está à frente ou atrás da média.',
      cta: { label: 'Explorar objetivos', href: link('/objetivos') },
    },
    {
      icon: Database,
      pergunta: 'De onde vêm esses números?',
      resposta:
        'Toda variável traz fonte oficial, normalização e download, com metodologia aberta e verificável.',
      cta: { label: 'Ver metodologia', href: link('/metodologia') },
    },
  ]

  const publicos = [
    {
      icon: Building2,
      titulo: 'Para gestores públicos',
      texto:
        'Identifique gargalos, acompanhe a evolução e encontre boas práticas para orientar decisões de transformação digital.',
    },
    {
      icon: GraduationCap,
      titulo: 'Para pesquisadores',
      texto:
        'Acesse séries históricas, indicadores comparáveis e dados abertos para embasar análises e estudos.',
    },
    {
      icon: Users,
      titulo: 'Para cidadãos',
      texto:
        'Acompanhe de forma transparente como o governo digital avança no país e cobre resultados.',
    },
  ]

  return (
    <section className="pb-12">
      {/* Hero: abre com a pergunta do usuário */}
      <div className="px-6 py-40 text-center sm:px-10">
        <PesoVariavel
          as="h1"
          texto="Como está o governo digital no seu estado?"
          de={400}
          para={800}
          forca={22}
          duracao={0.12}
          className="mx-auto mt-3 block max-w-3xl bg-linear-to-br from-primary to-primary-glow bg-clip-text pb-2 text-3xl text-transparent leading-[1.1] tracking-tight sm:text-5xl"
        />
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Uma plataforma pública que transforma dados oficiais dispersos em
          indicadores comparáveis sobre a transformação digital do governo
          federal, dos estados, das capitais e dos municípios.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-auto rounded-full bg-primary px-8 py-3 text-primary-foreground text-sm hover:bg-primary/90 has-[>svg]:px-8"
          >
            <Link href={link('/indicadores')}>Começar a explorar</Link>
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Prova institucional: parceiros */}
      <div className="px-6 py-14 sm:px-10">
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

      <div aria-hidden="true" className="h-px bg-border" />

      {/* O que a plataforma responde */}
      <div className="px-6 py-20 sm:px-10">
        <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          O que a plataforma responde
        </h2>
        <div className="dash-t -mx-6 mt-10 grid sm:-mx-10 lg:grid-cols-3">
          {perguntas.map((p, i) => (
            <div
              key={p.pergunta}
              className={`dash-b flex flex-col p-6 sm:p-8 ${
                i < perguntas.length - 1 ? 'lg:dash-br' : ''
              }`}
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-muted">
                <p.icon
                  aria-hidden="true"
                  className="size-5 text-muted-foreground"
                />
              </span>
              <h3 className="mt-5 font-semibold text-foreground text-lg leading-snug">
                {p.pergunta}
              </h3>
              <p className="mt-2 flex-1 text-muted-foreground text-sm leading-relaxed">
                {p.resposta}
              </p>
              <Link
                href={p.cta.href}
                className="mt-5 inline-block font-medium text-primary text-sm transition-opacity hover:opacity-70"
              >
                {p.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Experimente agora: feature interativa */}
      <div className="grid gap-8 px-6 py-20 sm:px-10 lg:grid-cols-3 lg:gap-0">
        <div className="lg:pr-10">
          <span className="font-medium text-primary text-sm">
            Experimente agora
          </span>
          <h2 className="mt-3 font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
            Compare entes em segundos
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground text-sm leading-relaxed">
            Selecione até cinco entes e veja, no radar, como o perfil de cada um
            se posiciona frente à média do nível nos dez objetivos da ENGD.
          </p>
          <Link
            href={link('/indicadores')}
            className="mt-5 inline-block font-medium text-primary text-sm transition-opacity hover:opacity-70"
          >
            Abrir indicadores completos
          </Link>
        </div>
        <div className="flex items-start justify-center lg:col-span-2 lg:dash-l lg:pr-6 lg:pl-8">
          <VisualPerfil entes={estadual.entes} medias={mediasEstadual} />
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Para quem é */}
      <div className="px-6 py-20 sm:px-10">
        <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
          Feito para diferentes públicos
        </h2>
        <div className="dash-t -mx-6 mt-10 grid sm:-mx-10 lg:grid-cols-3">
          {publicos.map((p, i) => (
            <div
              key={p.titulo}
              className={`dash-b flex flex-col p-6 sm:p-8 ${
                i < publicos.length - 1 ? 'lg:dash-br' : ''
              }`}
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                <p.icon aria-hidden="true" className="size-5 text-primary" />
              </span>
              <h3 className="mt-5 font-semibold text-foreground text-lg">
                {p.titulo}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Definição do projeto (scroll reveal) */}
      <div className="px-6 pt-0 pb-40 sm:px-10">
        <ScrollRevealText
          text={observatorioLead}
          trackClassName="-mt-16"
          start="top 65%"
          className="max-w-4xl font-medium text-2xl leading-snug tracking-tight sm:text-4xl sm:leading-snug"
        />
      </div>

      {/* Objetivos */}
      <div className="px-6 pb-20 sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            Os dez objetivos da ENGD
          </h2>
          <Link
            href={link('/objetivos')}
            className="font-medium text-primary text-sm transition-opacity hover:opacity-70"
          >
            Ver todos os objetivos
          </Link>
        </div>
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

      {/* Publicações */}
      <div className="px-6 pb-20 sm:px-10">
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
