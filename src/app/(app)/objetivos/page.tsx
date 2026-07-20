import Link from 'next/link'

import { objectives } from '@/data/objectives'

export const metadata = { title: 'Objetivos' }

export default function ObjetivosPage() {
  return (
    <section className="pb-12">
      <div className="px-6 pb-16 pt-28 sm:px-10">
        <span className="text-sm font-medium text-muted-foreground">
          Objetivos
        </span>
        <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
          Os objetivos da Estratégia
          <br />
          Nacional de Governo Digital
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          A Estratégia Nacional de Governo Digital é um conjunto de
          recomendações estratégicas que tem por objetivo articular e direcionar
          as iniciativas de governo digital entre todos os entes federados, de
          modo a ampliar e simplificar o acesso do cidadão aos serviços
          públicos.
        </p>

        <div className="-mx-6 mt-16 border-t sm:-mx-10">
          {objectives.map((objective, index) => (
            <Link
              key={objective.slug}
              href={`/objetivos/${objective.slug}`}
              className="grid gap-2 border-b px-6 py-8 transition-colors hover:bg-muted/60 sm:px-10 lg:grid-cols-3 lg:gap-16"
            >
              <h2 className="flex gap-3 text-sm font-medium tracking-tight text-primary">
                <span className="text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {objective.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-2">
                {objective.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
