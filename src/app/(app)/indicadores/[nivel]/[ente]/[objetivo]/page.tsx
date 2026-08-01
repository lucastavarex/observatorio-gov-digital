import { notFound } from 'next/navigation'
import { ObjetivoVariaveis } from '@/components/drilldown/objetivo-variaveis'
import { getObjetivoScore, niveis } from '@/data/indicators'
import { generateObjetivoParams, getEnteComVariaveis } from '@/data/obgd/server'

export function generateStaticParams() {
  return generateObjetivoParams()
}

export default async function IndicadoresObjetivoPage({
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
    <ObjetivoVariaveis
      nivel={nivel}
      ente={ente}
      objetivo={{ ...objetivo, nota: objetivo.nota }}
      basePath="/indicadores"
      showRankingUi={false}
    />
  )
}
