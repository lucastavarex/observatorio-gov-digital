import { tags } from '@/data/obgd/load'

export type Tematica = {
  slug: string
  nome: string
  descricao?: string
  lado?: 'cidadao' | 'gestor'
}

/** Tags transversais oficiais (dados-v3 / `tag.json`), A–Z independente da ordem do asset. */
export const tematicas: Tematica[] = tags
  .map(t => ({
    slug: t.id,
    nome: t.nome,
    descricao: t.descricao,
    lado: t.lado,
  }))
  .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
