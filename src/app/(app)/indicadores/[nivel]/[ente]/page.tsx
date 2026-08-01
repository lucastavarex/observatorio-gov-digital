import { notFound } from 'next/navigation'
import { EnteDetail } from '@/components/drilldown/ente-detail'
import { getEnte, getNivel, niveis } from '@/data/indicators'

export function generateStaticParams() {
  return niveis.flatMap(nivel =>
    nivel.entes.map(ente => ({ nivel: nivel.key, ente: ente.slug }))
  )
}

export default async function IndicadoresEntePage({
  params,
  searchParams,
}: {
  params: Promise<{ nivel: string; ente: string }>
  searchParams: Promise<{ objetivo?: string }>
}) {
  const { nivel: nivelKey, ente: enteSlug } = await params
  const { objetivo: objetivoQuery } = await searchParams
  const nivel = getNivel(nivelKey)
  const ente = getEnte(nivelKey, enteSlug)

  if (!nivel || !ente) {
    notFound()
  }

  return (
    <EnteDetail
      nivel={nivel}
      ente={ente}
      objetivoQuery={objetivoQuery}
      basePath="/indicadores"
      showRankingUi={false}
      backHref="/indicadores"
      backLabel="Voltar para Indicadores"
    />
  )
}
