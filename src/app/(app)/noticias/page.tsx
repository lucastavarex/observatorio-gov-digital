import { NewsList } from '@/components/content/news-list'

export const metadata = { title: 'Notícias' }

export default function NoticiasPage() {
  return (
    <section className="pb-12">
      <div className="dash-x">
        {/* Cabeçalho */}
        <div className="px-6 pb-5 pt-28 sm:px-10">
          <span className="text-sm font-medium text-muted-foreground">
            Notícias
          </span>
          <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
            O que estão
            <br />
            falando sobre nós
          </h1>
        </div>

        {/* Filtro + grade de artigos */}
        <NewsList />
      </div>
    </section>
  )
}
