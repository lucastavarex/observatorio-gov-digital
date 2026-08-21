import type { Ente } from '@/data/indicators'
import { notaPorUnidadeTag } from '@/data/obgd/load'

/**
 * Score real 0–100 da tag para um ente (média pré-calculada de
 * valor_normalizado dos indicadores ativos com a tag).
 * `null` quando o ente não tem observação para a tag.
 */
export function notaTematica(ente: Ente, tagSlug: string): number | null {
  const nota = notaPorUnidadeTag.get(`${ente.tipo}|${ente.codigo}|${tagSlug}`)
  return nota === undefined ? null : nota
}

export function rankingTematico(
  entes: Ente[],
  tagSlug: string
): {
  slug: string
  nome: string
  ufSigla: string | null
  valor: number
  posicao: number
}[] {
  return [...entes]
    .map(e => {
      const valor = notaTematica(e, tagSlug)
      return valor == null
        ? null
        : { slug: e.slug, nome: e.nome, ufSigla: e.ufSigla, valor }
    })
    .filter(
      (
        x
      ): x is {
        slug: string
        nome: string
        ufSigla: string | null
        valor: number
      } => x !== null
    )
    .sort((a, b) => b.valor - a.valor)
    .map((e, i) => ({ ...e, posicao: i + 1 }))
}
