import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { variantLink } from '@/lib/features/resolve-variant'

export default async function NotFound() {
  const link = await variantLink()

  return (
    <section className="pb-12">
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-28 text-center sm:px-10">
        <p className="font-medium bg-linear-to-br from-primary to-primary-glow bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl">
          404
        </p>
        <h1 className="mt-3 bg-linear-to-br from-primary to-primary-glow bg-clip-text font-bold text-4xl text-transparent leading-tight tracking-tight sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
          O endereço que você acessou não existe ou foi movido. Confira a URL ou
          volte para continuar explorando o Observatório.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="h-auto rounded-full bg-primary px-8 py-3 text-primary-foreground text-sm hover:bg-primary/90 has-[>svg]:px-8"
          >
            <Link href={link('/')}>Ir para a página inicial</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-full border-border bg-white px-8 py-3 text-primary text-sm shadow-none hover:bg-primary/5 hover:text-primary"
          >
            <Link href={link('/indicadores')}>Explorar indicadores</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
