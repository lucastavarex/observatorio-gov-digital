declare module '*.md' {
  import type { MDXProps } from 'mdx/types'

  export default function MDXContent(props: MDXProps): React.JSX.Element
}

declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'

  export default function MDXContent(props: MDXProps): React.JSX.Element
}
