import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { VariavelAcoes } from '@/components/shared/variavel-acoes'
import { formatScore, getObjetivoScore, niveis } from '@/data/indicators'
import { generateObjetivoParams, getEnteComVariaveis } from '@/data/obgd/server'

export function generateStaticParams() {
  return generateObjetivoParams()
}

export default async function ObjetivoIndicadorPage({
  params,
}: {
  params: Promise<{ nivel: string; ente: string; objetivo: string }>
}) {
  const {
    nivel: nivelKey,
    ente: enteSlug,
    objetivo: objetivoSlug,
  } = await params
  const nivel = niveis.find(n => n.key === nivelKey)
  const ente = getEnteComVariaveis(nivelKey, enteSlug)
  const objetivo = ente ? getObjetivoScore(ente, objetivoSlug) : undefined

  if (!nivel || !ente || !objetivo || objetivo.nota === null) {
    notFound()
  }

  return (
    <section className="pb-12">
      <div className="dash-x relative px-6 pb-16 pt-20 sm:px-10">
        <Link
          href={`/ranking/${nivel.key}/${ente.slug}`}
          aria-label={`Voltar para ${ente.nome}`}
          className="absolute left-6 top-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <span className="block text-sm font-medium text-muted-foreground">
              {ente.nome} · Objetivo {String(objetivo.numero).padStart(2, '0')}
              {objetivo.posicaoNoObjetivo != null && (
                <> · {objetivo.posicaoNoObjetivo}º no ranking</>
              )}
            </span>
            <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
              {objetivo.titulo}
            </h1>
          </div>
          <div className="flex flex-row-reverse items-end justify-start gap-2.5 text-right sm:block sm:gap-0">
            <span className="block pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:pb-0">
              Sub-índice do objetivo
            </span>
            <span className="block bg-linear-to-br from-primary to-primary-glow bg-clip-text text-7xl font-bold leading-tight tracking-tight tabular-nums text-transparent sm:text-8xl">
              {formatScore(objetivo.nota)}
            </span>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {objetivo.descricao}
        </p>

        {/* Cabeçalho da lista de variáveis */}
        <div className="mt-12 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>Variável / indicador</span>
          <span>Nota (0–100)</span>
        </div>

        <div className="-mx-6 mt-3 border-t sm:-mx-10">
          {objetivo.variaveis.length === 0 ? (
            <p className="px-6 py-8 text-sm text-muted-foreground sm:px-10">
              Não há indicadores detalhados disponíveis para este objetivo neste
              ente.
            </p>
          ) : (
            objetivo.variaveis.map(variavel => (
              <div
                key={variavel.slug}
                className="flex items-center gap-4 border-b px-6 py-6 transition-colors hover:bg-primary/5 sm:px-10"
              >
                <div className="min-w-0">
                  <Link
                    href={`/ranking/${nivel.key}/${ente.slug}/${objetivo.objetivoSlug}/${variavel.slug}`}
                    className="block min-w-0"
                  >
                    <span className="block truncate text-sm font-medium text-primary">
                      {variavel.nome}
                    </span>
                  </Link>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Fonte: {variavel.fonte} · {variavel.anoFonte}
                  </span>
                </div>
                <VariavelAcoes
                  nome={variavel.nome}
                  fonteUrl={variavel.fonteUrl}
                  arquivo={variavel.arquivo}
                />
                <span className="ml-auto shrink-0 text-sm font-semibold tabular-nums text-foreground">
                  {formatScore(variavel.nota)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
