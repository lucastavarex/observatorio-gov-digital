import { tags } from '@/data/obgd/load'

export type Tematica = {
  slug: string
  nome: string
  descricao?: string
  lado?: 'cidadao' | 'gestor'
}

/** Tags transversais oficiais (dados-v3 / `tag.json`). */
export const tematicas: Tematica[] = tags.map(t => ({
  slug: t.id,
  nome: t.nome,
  descricao: t.descricao,
  lado: t.lado,
}))
