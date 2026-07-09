/**
 * API pública de indicadores / rankings.
 * Dados reais de `src/data/obgd/assets/` (edição 2026, subset versionado).
 */
export {
  ANO_INDICE,
  type ArquivoDados,
  capitalNomePorUf,
  type Ente,
  formatScore,
  getEnte,
  getNivel,
  getObjetivoScore,
  getVariavel,
  mediasPorObjetivo,
  type Nivel,
  type NivelKey,
  niveis,
  type ObjetivoScore,
  type OrdenacaoRanking,
  objetivosComCobertura,
  type RankingItem,
  rankingDoNivel,
  slugify,
  type TabelaLinha,
  type Variavel,
} from './obgd/queries'
