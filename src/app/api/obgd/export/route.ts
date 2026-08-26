import { NextResponse } from 'next/server'
import {
  buildExportByConcept,
  buildExportByFonteIds,
  exportRowsToCsvResponse,
  METODOLOGIA_SLUG_PARA_FONTE_IDS,
} from '@/data/obgd/export-rows'
import type { NivelKey } from '@/data/obgd/queries'

const NIVEIS: NivelKey[] = ['federal', 'estadual', 'municipios']

/**
 * GET /api/obgd/export?nivel=estadual&conceptId=tic_gov/B1
 * GET /api/obgd/export?metodologiaSlug=cetic-br
 * GET /api/obgd/export?fonteId=tic_gov
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const metodologiaSlug = searchParams.get('metodologiaSlug')
  const fonteId = searchParams.get('fonteId')
  const conceptId = searchParams.get('conceptId')
  const nivel = searchParams.get('nivel') as NivelKey | null
  const subItens = searchParams.get('subItens')

  if (metodologiaSlug) {
    const ids = METODOLOGIA_SLUG_PARA_FONTE_IDS[metodologiaSlug]
    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { error: 'Fonte sem indicadores OBGD mapeados.' },
        { status: 404 }
      )
    }
    const { rows, filename } = buildExportByFonteIds(ids)
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum indicador encontrado para esta fonte.' },
        { status: 404 }
      )
    }
    return exportRowsToCsvResponse(rows, filename)
  }

  if (fonteId) {
    const { rows, filename } = buildExportByFonteIds([fonteId])
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Nenhum indicador encontrado para esta fonte.' },
        { status: 404 }
      )
    }
    return exportRowsToCsvResponse(rows, filename)
  }

  if (!conceptId || !nivel || !NIVEIS.includes(nivel)) {
    return NextResponse.json(
      {
        error:
          'Parâmetros inválidos. Use conceptId+nivel, fonteId ou metodologiaSlug.',
      },
      { status: 400 }
    )
  }

  const { rows, filename } = buildExportByConcept({
    nivelKey: nivel,
    conceptId,
    subItens,
  })

  if (rows.length === 0) {
    return NextResponse.json(
      { error: 'Nenhum dado encontrado para este indicador neste nível.' },
      { status: 404 }
    )
  }

  return exportRowsToCsvResponse(rows, filename)
}
