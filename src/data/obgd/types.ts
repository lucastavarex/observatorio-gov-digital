/** Tipos dos JSON em `src/data/obgd/assets/` (subset de dados-v2). */

export type ObjetivoEngdRow = {
  id: number
  nome: string
  descricao: string
}

export type EnteRow = {
  id: number
  tipo: 'nacional' | 'uf' | 'capital'
  codigo: string
  nome: string
  uf_sigla: string | null
  regiao: string | null
}

export type FonteRow = {
  id: string
  nome: string
  instituicao: string
  ano_base: number
  anos_disponiveis: number[]
}

export type IndicadorRow = {
  chave: string
  fonte_id: string
  indicador: string
  descricao: string
  pergunta: string | null
  escala: string | null
  populacao: string | null
  objetivo_id: number
  status: string
  anos_observados: number[] | null
}

export type IndiceLongRow = {
  nivel: 'nacional' | 'uf' | 'capital'
  unidade: string
  unidade_nome: string
  objetivo: number
  objetivo_nome: string
  ano_indice: number
  sub_indice: number
  indice_geral: number
  n_objetivos_com_dados: number
  posicao_no_objetivo: number
}

export type DetalheRow = {
  categoria: string
  objetivo: number
  objetivo_nome: string
  fonte: string
  indicador: string
  sub_itens: string | null
  descricao: string
  escala: string
  populacao: string
  valor_normalizado: number
  ano_fonte: number
}

/** Observação multi-ano (schema de `indicador_valor.json`). */
export type IndicadorValorRow = {
  indicador_chave: string | null
  fonte_id: string
  indicador: string
  ente_id: number
  ano: number | null
  valor_normalizado: number
}

/** Ponto de série histórica para gráficos (UI). */
export type SerieHistoricaPonto = {
  ano: number
  valor: number
}
