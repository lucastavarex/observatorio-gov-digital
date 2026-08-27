import Image from 'next/image'
import Link from 'next/link'

import { getHomeData } from '@/components/home/home-data'
import {
  VisualDados,
  VisualPerfil,
} from '@/components/home/home-feature-visuals'
import { HomePorqueExiste } from '@/components/home/home-porque-existe'
import { PesoVariavel } from '@/components/home/peso-variavel'
import { PixelCanvas } from '@/components/home/pixel-canvas'
import { Button } from '@/components/ui/button'
import { objectives } from '@/data/objectives'
import {
  resolvePlatformVariant,
  variantLink,
} from '@/lib/features/resolve-variant'
import { cn } from '@/lib/utils'

const dimensoes = [
  {
    titulo: 'Governança',
    texto:
      'Estratégias, estruturas e mecanismos utilizados para coordenar a transformação digital.',
  },
  {
    titulo: 'Capacidade Digital',
    texto:
      'Competências, infraestrutura e condições necessárias para sustentar iniciativas digitais.',
  },
  {
    titulo: 'Interoperabilidade',
    texto:
      'Capacidade de integração e compartilhamento de informações entre sistemas e instituições.',
  },
  {
    titulo: 'Serviços Digitais',
    texto:
      'Evolução da oferta e qualidade dos serviços públicos disponibilizados em meios digitais.',
  },
  {
    titulo: 'Dados',
    texto:
      'Uso estratégico, disponibilidade e governança de dados na administração pública.',
  },
  {
    titulo: 'Outras dimensões',
    texto:
      'Novas dimensões e indicadores podem ser incorporados conforme a evolução do Governo Digital.',
  },
]

const publicos = [
  {
    titulo: 'Cidadãos e imprensa',
    texto:
      'Entenda o cenário, consulte resultados e encontre explicações sem precisar começar pela metodologia.',
  },
  {
    titulo: 'Gestores públicos',
    texto:
      'Compare contextos, identifique pontos de atenção e use evidências para orientar prioridades e políticas.',
  },
  {
    titulo: 'Pesquisadores',
    texto:
      'Acesse definições, fontes, recortes, critérios e referências para estudos e análises reproduzíveis.',
  },
  {
    titulo: 'Organizações',
    texto:
      'Compreenda padrões e desafios do governo digital para apoiar projetos, cooperação e decisões institucionais.',
  },
]

export async function HomeV1Page() {
  await resolvePlatformVariant()
  const link = await variantLink()
  const { estadual, mediasEstadual, variaveisDestaque, parceiros } =
    getHomeData()

  const recursos = [
    {
      eyebrow: 'Explore os dados',
      titulo: 'Como está o governo digital no Brasil?',
      texto:
        'Selecione uma dimensão e uma localidade para explorar indicadores e comparar diferentes contextos.',
      cta: { label: 'Explorar indicadores', href: link('/indicadores') },
      visual: <VisualPerfil entes={estadual.entes} medias={mediasEstadual} />,
    },
    {
      titulo: 'Dados abertos e verificáveis',
      texto:
        'Cada variável traz a fonte oficial e o download do recorte usado no índice (valores normalizados do snapshot), com metodologia transparente.',
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
      {/* Hero */}
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
            texto="Entenda o governo digital no Brasil, em um só lugar"
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

      <HomePorqueExiste />

      <div aria-hidden="true" className="h-px bg-border" />

      {/* O que acompanhamos */}
      <div className="px-6 py-20 sm:px-10">
        <span className="font-medium text-muted-foreground text-sm">
          O que acompanhamos
        </span>
        <h2 className="mt-3 max-w-2xl font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
          Uma visão multidimensional do Governo Digital
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Os indicadores permitem compreender diferentes capacidades e dimensões
          relacionados à transformação digital da administração pública.
        </p>
        <div className="dash-t -mx-6 mt-12 grid sm:-mx-10 sm:grid-cols-2 lg:grid-cols-3">
          {dimensoes.map((item, i) => (
            <div
              key={item.titulo}
              className={cn(
                'dash-b flex flex-col gap-2 p-6 sm:p-8',
                (i + 1) % 3 !== 0 && 'lg:dash-br'
              )}
            >
              <h3 className="flex gap-3 font-medium text-primary text-sm tracking-tight">
                <span className="text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.titulo}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Explore os dados + Dados abertos */}
      <div className="overflow-hidden">
        {recursos.map((r, i) => (
          <div
            key={r.titulo}
            className={cn(
              'grid gap-8 px-6 py-20 sm:px-10 lg:min-h-[28rem] lg:grid-cols-3 lg:gap-0',
              i > 0 && 'border-t'
            )}
          >
            <div className="lg:pr-10">
              {'eyebrow' in r && r.eyebrow ? (
                <span className="font-medium text-muted-foreground text-sm">
                  {r.eyebrow}
                </span>
              ) : null}
              <h2
                className={cn(
                  'font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl',
                  'eyebrow' in r && r.eyebrow ? 'mt-3' : undefined
                )}
              >
                {r.titulo}
              </h2>
              <p className="mt-4 max-w-sm text-muted-foreground text-sm leading-relaxed sm:text-base">
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

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Parceiros */}
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

      <div aria-hidden="true" className="h-px bg-border" />

      {/* Para quem é */}
      <div className="px-6 py-20 sm:px-10">
        <span className="font-medium text-muted-foreground text-sm">
          Para quem é
        </span>
        <h2 className="mt-3 max-w-2xl font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
          Uma mesma base de informação, com usos diferentes.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          O Observatório foi pensado para permitir uma leitura rápida por quem
          está conhecendo o tema e, ao mesmo tempo, oferecer rastreabilidade
          para quem precisa aprofundar a análise.
        </p>
        <div className="dash-t -mx-6 mt-12 grid sm:-mx-10 sm:grid-cols-2 lg:grid-cols-4">
          {publicos.map((item, i) => (
            <div
              key={item.titulo}
              className={cn(
                'dash-b flex flex-col gap-2 p-6 sm:p-8',
                i < publicos.length - 1 && 'lg:dash-br'
              )}
            >
              <h3 className="flex gap-3 font-medium text-primary text-sm tracking-tight">
                <span className="text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.titulo}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Os dez objetivos */}
      <div className="px-6 py-20 sm:px-10">
        <span className="font-medium text-muted-foreground text-sm">
          Como a análise se organiza
        </span>
        <h2 className="mt-3 max-w-3xl font-bold text-2xl text-foreground leading-tight tracking-tight sm:text-3xl">
          Os dez objetivos da Estratégia Nacional de Governo Digital
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          A estrutura do Observatório conecta os indicadores aos objetivos da
          ENGD, ajudando o usuário a entender não apenas o número, mas também o
          tema de política pública ao qual ele se relaciona.
        </p>
        <p className="mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
          Clique em um objetivo para ver uma explicação resumida.
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
