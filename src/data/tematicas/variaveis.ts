import { fonteById, indicadores } from '@/data/obgd/load'

/** Variável atrelada a uma tag (catálogo real). */
export type VariavelTematica = {
  slug: string
  nome: string
  fonte: string
}

function buildVariaveisPorTematica(): Record<string, VariavelTematica[]> {
  const map: Record<string, VariavelTematica[]> = {}
  for (const ind of indicadores) {
    if (ind.status !== 'ativo') continue
    const tagIds = ind.tags
    if (!Array.isArray(tagIds) || tagIds.length === 0) continue
    const fonteNome = fonteById.get(ind.fonte_id)?.nome ?? ind.fonte_id
    const item: VariavelTematica = {
      slug: ind.chave,
      nome: ind.descricao || ind.indicador,
      fonte: fonteNome,
    }
    for (const tagId of tagIds) {
      const list = map[tagId] ?? []
      list.push(item)
      map[tagId] = list
    }
  }
  for (const key of Object.keys(map)) {
    map[key].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }
  return map
}

export const variaveisPorTematica = buildVariaveisPorTematica()
