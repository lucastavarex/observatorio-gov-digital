import { notFound } from 'next/navigation'

import { BackButton } from '@/components/shared/back-button'
import { VariantLink } from '@/components/shared/variant-link'
import {
  getMetodologiaCapitulo,
  getMetodologiaCapituloNav,
  metodologiaCapituloHref,
  metodologiaCapitulos,
} from '@/data/metodologia-capitulos'
import { loadMetodologiaCapituloMdx } from '@/lib/metodologia-mdx'

export function generateStaticParams() {
  return metodologiaCapitulos.map(cap => ({ capitulo: cap.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ capitulo: string }>
}) {
  const { capitulo: slug } = await params
  const cap = getMetodologiaCapitulo(slug)
  return { title: cap ? cap.title : 'Metodologia' }
}

export default async function MetodologiaCapituloPage({
  params,
}: {
  params: Promise<{ capitulo: string }>
}) {
  const { capitulo: slug } = await params
  const nav = getMetodologiaCapituloNav(slug)

  if (!nav) {
    notFound()
  }

  const { current, prev, next } = nav
  const Content = await loadMetodologiaCapituloMdx(current.file)

  return (
    <section className="pb-12">
      <div className="relative px-6 pt-20 pb-16 sm:px-10">
        <BackButton
          fallbackHref="/metodologia"
          label="Voltar para Metodologia"
          className="absolute top-12 left-6 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        />

        <span className="block text-sm font-medium text-muted-foreground">
          Metodologia
        </span>
        <p className="mt-2 text-xs text-muted-foreground">
          Capítulo {current.order} de {metodologiaCapitulos.length}
        </p>

        <article className="mt-8 max-w-3xl">
          <Content />
        </article>

        <nav
          aria-label="Navegação entre capítulos"
          className="mt-16 flex max-w-3xl flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between"
        >
          {prev ? (
            <VariantLink
              href={metodologiaCapituloHref(prev.slug)}
              className="group max-w-xs text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="block text-xs">Anterior</span>
              <span className="mt-1 block font-medium text-foreground group-hover:text-primary">
                {prev.title}
              </span>
            </VariantLink>
          ) : (
            <span />
          )}
          {next ? (
            <VariantLink
              href={metodologiaCapituloHref(next.slug)}
              className="group max-w-xs text-sm text-muted-foreground transition-colors hover:text-primary sm:text-right"
            >
              <span className="block text-xs">Próximo</span>
              <span className="mt-1 block font-medium text-foreground group-hover:text-primary">
                {next.title}
              </span>
            </VariantLink>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </section>
  )
}
