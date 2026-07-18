import { PublicationsList } from '@/components/content/publications-list'

export const metadata = { title: 'Publicações' }

export default function PublicacoesPage() {
  return (
    <section className="pb-12">
      <div>
        {/* Cabeçalho */}
        <div className="px-6 pb-5 pt-28 sm:px-10">
          <span className="text-sm font-medium text-muted-foreground">
            Publicações
          </span>
          <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
            O que nossos
            <br />
            dados constroem
          </h1>
        </div>

        {/* Filtro + grade de publicações */}
        <PublicationsList />
      </div>
    </section>
  )
}
