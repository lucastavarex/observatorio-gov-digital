import type { MDXComponents } from 'mdx/types'
import {
  Children,
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

/** Rewrite methodology chart paths from chapter-relative markdown to public URLs. */
function resolveMdxImgSrc(src: string | undefined): string | undefined {
  if (!src) return undefined
  if (src.startsWith('../graficos/')) {
    return `/metodologia/graficos/${src.slice('../graficos/'.length)}`
  }
  return src
}

function MdxImg({
  src,
  alt,
  className,
  ...props
}: ComponentPropsWithoutRef<'img'>) {
  const srcString = resolveMdxImgSrc(typeof src === 'string' ? src : undefined)

  if (!srcString) {
    return (
      <figure
        className={cn(
          'my-6 flex flex-col items-center justify-center gap-1 rounded-lg border border-border bg-muted/40 px-4 py-10 text-center',
          className
        )}
        role="img"
        aria-label={
          alt ? `${alt}. Gráfico indisponível` : 'Gráfico indisponível'
        }
      >
        <span className="text-sm font-medium text-muted-foreground">
          Gráfico indisponível
        </span>
        {alt ? (
          <span className="max-w-md text-xs text-muted-foreground/80">
            {alt}
          </span>
        ) : null}
      </figure>
    )
  }

  return (
    // MDX assets may be relative paths without fixed dimensions for next/image.
    // biome-ignore lint/performance/noImgElement: MDX img fallback for chart and other assets
    <img
      src={srcString}
      alt={alt ?? ''}
      className={cn('my-6 h-auto w-full max-w-full', className)}
      {...props}
    />
  )
}

/** Markdown wraps lone images in <p>; our chart placeholder is a <figure>. */
function isImageOnlyParagraph(children: ReactNode): boolean {
  const nodes = Children.toArray(children).filter(child => {
    if (typeof child === 'string') return child.trim().length > 0
    return true
  })
  if (nodes.length !== 1) return false
  const only = nodes[0]
  return isValidElement(only) && (only.type === MdxImg || only.type === 'img')
}

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mt-10 scroll-mt-28 text-2xl font-bold tracking-tight text-foreground first:mt-0 sm:text-3xl',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mt-10 scroll-mt-28 border-t border-border pt-8 text-sm font-bold text-foreground',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'mt-8 scroll-mt-28 text-sm font-medium tracking-tight text-primary',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'mt-6 scroll-mt-28 text-sm font-medium text-foreground',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, children, ...props }) => {
    if (isImageOnlyParagraph(children)) {
      return <>{children}</>
    }
    return (
      <p
        className={cn(
          'mt-4 text-sm leading-relaxed text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </p>
    )
  },
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'font-medium text-primary underline-offset-4 hover:underline',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'mt-4 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('leading-relaxed', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mt-4 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground italic',
        className
      )}
      {...props}
    />
  ),
  // `---` + `##` duplicava a linha: o hr e o border-t do h2. Esconde o hr nesse caso.
  hr: ({ className, ...props }) => (
    <hr
      className={cn(
        'my-10 border-border has-[+h2]:m-0 has-[+h2]:hidden',
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  ),
  em: ({ className, ...props }) => (
    <em className={cn('italic', className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mt-4 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-xs leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="mt-4 w-full overflow-x-auto">
      <table
        className={cn(
          'w-full min-w-[36rem] border-collapse text-left text-sm',
          className
        )}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn('border-b border-border', className)} {...props} />
  ),
  tbody: ({ className, ...props }) => (
    <tbody className={cn('divide-y divide-border', className)} {...props} />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn('align-top', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'px-3 py-2 font-medium text-foreground whitespace-nowrap',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'px-3 py-2 text-muted-foreground leading-relaxed',
        className
      )}
      {...props}
    />
  ),
  img: MdxImg,
}

export function useMDXComponents(): MDXComponents {
  return components
}
