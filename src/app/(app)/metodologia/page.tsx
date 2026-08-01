import { VariantLink } from '@/components/shared/variant-link'
import { Button } from '@/components/ui/button'
import {
  metodologiaCapituloHref,
  metodologiaCapitulos,
} from '@/data/metodologia-capitulos'

export const metadata = { title: 'Metodologia' }

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
            O Insper, por meio de seu Centro de Gestão e Políticas Públicas
            (CGPP), firmou parceria com o Movimento Brasil Competitivo (MBC) e o
            Ministério da Gestão e Inovação em Serviços Públicos (MGI) com o
            objetivo de estruturar e implantar o Observatório Brasileiro de
            Governo Digital. Esta página reproduz na íntegra o relatório
            metodológico do projeto.
          </p>
          <Button
            asChild
            className="h-auto shrink-0 rounded-full bg-primary px-6 py-3.5 text-primary-foreground hover:bg-primary/90"
          >
            <a href="/metodologia-completa.pdf" download>
              Baixar metodologia em PDF
            </a>
          </Button>
        </div>

        <div aria-hidden="true" className="dash-t -mx-6 mt-16 h-px sm:-mx-10" />
        <h2 className="mt-8 text-sm font-bold text-foreground">Sumário</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Capítulos, anexos e referências do relatório metodológico.
        </p>
        <ol className="-mx-6 mt-6 dash-t sm:-mx-10">
          {metodologiaCapitulos.map((cap, index) => (
            <li
              key={cap.slug}
              className={
                index === metodologiaCapitulos.length - 1 ? '' : 'dash-b'
              }
            >
              <VariantLink
                href={metodologiaCapituloHref(cap.slug)}
                className="flex items-baseline gap-4 px-6 py-4 transition-colors hover:bg-muted/60 sm:px-10"
              >
                <span className="w-8 shrink-0 font-semibold text-primary text-sm tabular-nums">
                  {String(cap.order).padStart(2, '0')}
                </span>
                <span className="font-medium text-foreground text-sm">
                  {cap.title}
                </span>
              </VariantLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
