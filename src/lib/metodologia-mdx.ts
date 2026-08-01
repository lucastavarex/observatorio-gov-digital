import type { MDXProps } from 'mdx/types'
import type { ComponentType } from 'react'

type MdxModule = {
  default: ComponentType<MDXProps>
}

/**
 * Carrega o MDX do capítulo pelo nome do arquivo (sem extensão).
 * Imports explícitos por arquivo — o bundler precisa de caminhos estáticos.
 */
export async function loadMetodologiaCapituloMdx(
  file: string
): Promise<ComponentType<MDXProps>> {
  const modules: Record<string, () => Promise<MdxModule>> = {
    cap01_introducao: () =>
      import('@/content/metodologia/capitulos/cap01_introducao.md'),
    cap02_revisao_literatura: () =>
      import('@/content/metodologia/capitulos/cap02_revisao_literatura.md'),
    cap03_metodologia: () =>
      import('@/content/metodologia/capitulos/cap03_metodologia.md'),
    cap04_obj01_governanca: () =>
      import('@/content/metodologia/capitulos/cap04_obj01_governanca.md'),
    cap05_obj02_qualidade: () =>
      import('@/content/metodologia/capitulos/cap05_obj02_qualidade.md'),
    cap06_obj03_identificacao_unica: () =>
      import(
        '@/content/metodologia/capitulos/cap06_obj03_identificacao_unica.md'
      ),
    cap07_obj04_seguranca_lgpd: () =>
      import('@/content/metodologia/capitulos/cap07_obj04_seguranca_lgpd.md'),
    cap08_obj05_dados_interoperabilidade: () =>
      import(
        '@/content/metodologia/capitulos/cap08_obj05_dados_interoperabilidade.md'
      ),
    cap09_obj06_infraestrutura: () =>
      import('@/content/metodologia/capitulos/cap09_obj06_infraestrutura.md'),
    cap10_obj07_inovacao: () =>
      import('@/content/metodologia/capitulos/cap10_obj07_inovacao.md'),
    cap11_obj08_eficiencia: () =>
      import('@/content/metodologia/capitulos/cap11_obj08_eficiencia.md'),
    cap12_obj09_transparencia: () =>
      import('@/content/metodologia/capitulos/cap12_obj09_transparencia.md'),
    cap13_obj10_competencias: () =>
      import('@/content/metodologia/capitulos/cap13_obj10_competencias.md'),
    anexo_a_variaveis_excluidas: () =>
      import('@/content/metodologia/capitulos/anexo_a_variaveis_excluidas.md'),
    anexo_b_lacunas_recomendacoes: () =>
      import(
        '@/content/metodologia/capitulos/anexo_b_lacunas_recomendacoes.md'
      ),
    anexo_c_atas_entrevistas: () =>
      import('@/content/metodologia/capitulos/anexo_c_atas_entrevistas.md'),
    referencias_bibliograficas: () =>
      import('@/content/metodologia/capitulos/referencias_bibliograficas.md'),
  }

  const loader = modules[file]
  if (!loader) {
    throw new Error(`Capítulo MDX não encontrado: ${file}`)
  }

  const mod = await loader()
  return mod.default
}
