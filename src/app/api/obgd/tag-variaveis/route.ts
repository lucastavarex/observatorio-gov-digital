import { NextResponse } from 'next/server'
import { type NivelKey, niveis } from '@/data/obgd/queries'
import { variaveisDaTagPorEntes } from '@/data/obgd/tag-variaveis'
import { tematicas } from '@/data/tematicas'

const NIVEIS = new Set(niveis.map(n => n.key))

/**
 * GET /api/obgd/tag-variaveis?nivel=estadual&tema=conectividade&entes=sao-paulo,rio-de-janeiro
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const nivel = searchParams.get('nivel') as NivelKey | null
  const tema = searchParams.get('tema')
  const entesRaw = searchParams.get('entes') ?? ''
  const enteSlugs = entesRaw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  if (!nivel || !NIVEIS.has(nivel) || !tema || enteSlugs.length === 0) {
    return NextResponse.json(
      { error: 'Parâmetros inválidos. Use nivel, tema e entes.' },
      { status: 400 }
    )
  }

  if (!tematicas.some(t => t.slug === tema)) {
    return NextResponse.json({ error: 'Tag desconhecida.' }, { status: 404 })
  }

  const variaveis = variaveisDaTagPorEntes({
    nivelKey: nivel,
    enteSlugs,
    tagId: tema,
  })

  return NextResponse.json({ variaveis })
}
