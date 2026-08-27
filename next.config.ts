import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

/** Slugs antigos das páginas por órgão → ver `LEGACY_INSTITUICAO_FONTE_SLUGS` em fontes.ts.
 * Sem `anatel`: o id OBGD da pesquisa é o mesmo slug. */
const LEGACY_FONTE_ORGAO_SLUGS = [
  'cetic-br',
  'mgi',
  'gov-br',
  'tcu',
  'ibge',
  'inep',
  'abep-tic',
  'cgu',
] as const

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return LEGACY_FONTE_ORGAO_SLUGS.map(slug => ({
      source: `/metodologia/fontes/${slug}`,
      destination: '/metodologia',
      permanent: true,
    }))
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-slug'],
  },
})

export default withMDX(nextConfig)
