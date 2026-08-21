import 'server-only'

import { detalhesNacionalRows } from './detalhes'
import { fonteById, indicadores } from './load'

export type IndicadorDoObjetivo = {
  chave: string
  nome: string
  fonte: string
  fonteId: string
  escala: string | null
  notaNacional: number | null
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function conceptIdOf(fonte: string, indicador: string): string {
  return `${fonte}/${indicador}`
}

/** Indicadores ativos do objetivo, com nota nacional quando houver. */
export function indicadoresDoObjetivo(
  objetivoNumero: number
): IndicadorDoObjetivo[] {
  const notaPorChave = new Map<string, number>()
  for (const row of detalhesNacionalRows) {
    if (row.objetivo !== objetivoNumero) continue
    const chave = row.concept_id || conceptIdOf(row.fonte, row.indicador)
    if (!notaPorChave.has(chave)) {
      notaPorChave.set(chave, round1(row.valor_normalizado))
    }
  }

  return indicadores
    .filter(i => i.status === 'ativo' && i.objetivo_id === objetivoNumero)
    .map(i => {
      const fonte = fonteById.get(i.fonte_id)
      return {
        chave: i.chave,
        nome: i.descricao || i.indicador,
        fonte: fonte ? `${fonte.nome} (${fonte.instituicao})` : i.fonte_id,
        fonteId: i.fonte_id,
        escala: i.escala,
        notaNacional: notaPorChave.get(i.chave) ?? null,
      }
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}
