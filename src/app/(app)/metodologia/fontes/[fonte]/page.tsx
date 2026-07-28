import { notFound } from 'next/navigation'

import { FonteContent } from '@/components/metodologia/fonte-content'
import { fontes, getFonte } from '@/data/fontes'

export function generateStaticParams() {
  return fontes.map(fonte => ({ fonte: fonte.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fonte: string }>
}) {
  const { fonte: slug } = await params
  const fonte = getFonte(slug)
  return { title: fonte ? fonte.name : 'Fonte de dados' }
}

export default async function FontePage({
  params,
}: {
  params: Promise<{ fonte: string }>
}) {
  const { fonte: slug } = await params
  const fonte = getFonte(slug)

  if (!fonte) {
    notFound()
  }

  return <FonteContent fonte={fonte} />
}
