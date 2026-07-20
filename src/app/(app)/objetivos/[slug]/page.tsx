import { notFound } from 'next/navigation'

import { BackButton } from '@/components/shared/back-button'
import { getObjective, getObjectiveNumber, objectives } from '@/data/objectives'

export function generateStaticParams() {
  return objectives.map(objective => ({ slug: objective.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const objective = getObjective(slug)
  return { title: objective ? objective.title : 'Objetivo' }
}

export default async function ObjetivoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const objective = getObjective(slug)

  if (!objective) {
    notFound()
  }

  const number = getObjectiveNumber(slug)

  return (
    <section className="pb-12">
      <div className="relative px-6 pb-16 pt-28 sm:px-10">
        <BackButton
          fallbackHref="/objetivos"
          label="Voltar para Objetivos"
          className="absolute top-12 left-6 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        />
        <span className="block text-sm font-medium text-muted-foreground">
          Objetivo {String(number).padStart(2, '0')}
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          {objective.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {objective.description}
        </p>

        <div className="-mx-6 mt-16 border-t sm:-mx-10">
          {objective.recommendations.map(recommendation => (
            <div
              key={recommendation.label}
              className="grid gap-2 border-b px-6 py-8 sm:px-10 lg:grid-cols-3 lg:gap-16"
            >
              <h3 className="text-sm font-medium tracking-tight text-primary">
                {recommendation.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-2">
                {recommendation.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
