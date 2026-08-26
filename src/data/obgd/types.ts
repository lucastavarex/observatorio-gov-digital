/** Tipos dos JSON em `src/data/obgd/assets/` (subset de dados-v4). */

export type EnteTipo = 'nacional' | 'uf' | 'municipio'

/** Recorte do índice / detalhes (alinhado a `indice_long.nivel`). */
export type DataNivel = EnteTipo

export type ObjetivoEngdRow = {
  id: number
  nome: string
  descricao: string
}

export type EnteRow = {
  id: number
  tipo: EnteTipo
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

export type TagRow = {
  id: string
  nome: string
  descricao: string
  lado: 'cidadao' | 'gestor'
}

export type IndicadorRow = {
  chave: string
  fonte_id: string
  indicador: string
  descricao: string
  pergunta: string | null
  escala: string | null
  populacao: string | null
  objetivo_id: number | null
  tags: string[]
  audiencia: 'cidadao' | 'gestor' | 'ambos' | null
  status: string
  anos_observados: number[] | null
}

/** Média de valor_normalizado por ente × tag (pré-calculada). */
export type IndicePorTagRow = {
  tipo: EnteTipo
  unidade: string
  tag_id: string
  nota: number
  n_indicadores: number
}

export type IndiceLongRow = {
  nivel: DataNivel
  unidade: string
  unidade_nome: string
  objetivo: number
  objetivo_nome: string
  ano_indice: number
  sub_indice: number | null
  indice_geral: number | null
  n_objetivos_com_dados: number | null
  posicao_no_objetivo: number | null
}

export type DetalheRow = {
  categoria: string
  objetivo: number
  objetivo_nome: string
  concept_id?: string
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
