import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { VariavelAcoes } from '@/components/shared/variavel-acoes'
import {
  formatScore,
  getObjetivoScore,
  getVariavel,
  niveis,
} from '@/data/indicators'
import { generateVariavelParams, getEnteComVariaveis } from '@/data/obgd/server'

export function generateStaticParams() {
  return generateVariavelParams()
}

export default async function VariavelPage({
  params,
}: {
  params: Promise<{
    nivel: string
    ente: string
    objetivo: string
    variavel: string
  }>
}) {
  const {
    nivel: nivelKey,
    ente: enteSlug,
    objetivo: objetivoSlug,
    variavel: variavelSlug,
  } = await params

  const nivel = niveis.find(n => n.key === nivelKey)
  const ente = getEnteComVariaveis(nivelKey, enteSlug)
  const objetivo = ente ? getObjetivoScore(ente, objetivoSlug) : undefined
  const variavel = objetivo ? getVariavel(objetivo, variavelSlug) : undefined

  if (!nivel || !ente || !objetivo || !variavel) {
    notFound()
  }

  return (
    <section className="pb-12">
      <div className="relative px-6 pb-16 pt-20 sm:px-10">
        <Link
          href={`/ranking/${nivel.key}/${ente.slug}/${objetivo.objetivoSlug}`}
          aria-label={`Voltar para ${objetivo.titulo}`}
          className="absolute left-6 top-12 inline-flex items-center text-muted-foreground transition-colors hover:text-primary sm:left-10"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <span className="block text-sm font-medium text-muted-foreground">
              {ente.nome} · {objetivo.titulo}
            </span>
            <h1 className="bg-linear-to-br from-primary to-primary-glow bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
              {variavel.nome}
            </h1>
          </div>
          <div className="flex flex-row-reverse items-end justify-start gap-2.5 text-right sm:block sm:gap-0">
            <span className="block pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:pb-0">
              Nota normalizada
            </span>
            <span className="block bg-linear-to-br from-primary to-primary-glow bg-clip-text text-7xl font-bold leading-tight tracking-tight tabular-nums text-transparent sm:text-8xl">
              {formatScore(variavel.nota)}
            </span>
          </div>
        </div>

        {/* Ações: ver fonte / baixar dados */}
        <div className="mt-5">
          <VariavelAcoes
            nome={variavel.nome}
            fonteUrl={variavel.fonteUrl}
            arquivo={variavel.arquivo}
          />
        </div>

        {/* Metadados da variável */}
        <div className="dash-y -mx-6 mt-8 px-6 py-6 sm:-mx-10 sm:px-10">
          <dl className="grid max-w-2xl gap-4 sm:grid-cols-[auto_1fr] sm:gap-x-8">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Pergunta
            </dt>
            <dd className="text-sm leading-relaxed text-foreground">
              {variavel.pergunta}
            </dd>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Fonte
            </dt>
            <dd className="text-sm leading-relaxed text-foreground">
              {variavel.fonte}
            </dd>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Ano da fonte
            </dt>
            <dd className="text-sm leading-relaxed text-foreground">
              {variavel.anoFonte}
            </dd>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Normalização
            </dt>
            <dd className="text-sm leading-relaxed text-muted-foreground">
              {variavel.normalizacao}
            </dd>
          </dl>
        </div>

        {/* Tabela de metadados do valor */}
        <h2 className="mt-12 text-sm font-bold text-foreground">
          Detalhes do valor
        </h2>
        <div className="-mx-6 mt-3 overflow-x-auto border-t sm:-mx-10">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="border-b px-6 py-3 text-left font-medium sm:px-10">
                  Campo
                </th>
                <th className="border-b px-6 py-3 text-right font-medium sm:px-10">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {variavel.dados.map(linha => (
                <tr key={linha.item}>
                  <td className="border-b px-6 py-4 text-foreground sm:px-10">
                    {linha.item}
                  </td>
                  <td className="border-b px-6 py-4 text-right tabular-nums text-foreground sm:px-10">
                    {linha.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
