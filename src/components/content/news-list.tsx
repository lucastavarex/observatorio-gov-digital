'use client'

import * as React from 'react'

import { type NewsArticle, newsArticles, newsCategories } from '@/data/news'
import { cn } from '@/lib/utils'

function faviconUrl(href: string): string | null {
  try {
    const domain = new URL(href).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  } catch {
    return null
  }
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="dash-t grid grid-cols-1 md:grid-cols-2">
      {articles.map((article, i) => {
        const logo = faviconUrl(article.href)

        return (
          <a
            key={article.title}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group flex flex-col p-6 transition-colors dash-b hover:bg-primary/5 sm:p-8',
              i % 2 === 0 && 'md:dash-br'
            )}
          >
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-[10px] font-medium text-muted-foreground">
                  {logo ? (
                    // Favicon externo; next/image exigiria remotePatterns por domínio.
                    // biome-ignore lint/performance/noImgElement: favicon de terceiros
                    <img
                      src={logo}
                      alt=""
                      width={24}
                      height={24}
                      className="size-full object-cover"
                    />
                  ) : (
                    article.source.slice(0, 1)
                  )}
                </span>
                <span className="font-medium text-foreground">
                  {article.source}
                </span>
              </span>
              <span className="text-muted-foreground">{article.date}</span>
            </div>

            <div className="mt-6">
              <h2 className="font-semibold text-xl tracking-tight">
                {article.title}
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">
                {article.excerpt}
              </p>
            </div>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        )
      })}
    </div>
  )
}

export function NewsList() {
  const [active, setActive] = React.useState('Todas')

  const filtered =
    active === 'Todas'
      ? newsArticles
      : newsArticles.filter(a => a.category === active)

  return (
    <>
      <div className="flex flex-wrap gap-2 px-6 pb-16 sm:px-10">
        {newsCategories.map(category => {
          const isActive = category === active
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-primary/5 hover:text-primary'
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      <NewsGrid articles={filtered} />
    </>
  )
}
