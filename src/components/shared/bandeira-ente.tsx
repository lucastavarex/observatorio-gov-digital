'use client'

import { X } from 'lucide-react'
import * as React from 'react'
import { createPortal } from 'react-dom'

// Largura estimada do popup que segue o mouse (px), usada para não vazar da tela.
const POPUP_W = 208

export function BandeiraEnte({ src, nome }: { src: string; nome: string }) {
  const [erro, setErro] = React.useState(false)
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null)
  const [modal, setModal] = React.useState(false)
  const [montado, setMontado] = React.useState(false)
  const hoverRef = React.useRef(false)

  React.useEffect(() => {
    setMontado(true)
    hoverRef.current = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches
  }, [])

  React.useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  if (erro) return null

  function acompanhar(e: React.MouseEvent) {
    if (!hoverRef.current) return
    setPos({ x: e.clientX, y: e.clientY })
  }

  let left = 0
  let top = 0
  if (pos) {
    left =
      pos.x + 16 + POPUP_W > window.innerWidth
        ? pos.x - POPUP_W - 16
        : pos.x + 16
    top = Math.min(pos.y + 16, window.innerHeight - 180)
  }

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        aria-label={`Ver bandeira de ${nome}`}
        className="inline-flex shrink-0 cursor-pointer overflow-hidden rounded-[3px] ring-1 ring-border transition-transform hover:scale-110"
        onMouseEnter={acompanhar}
        onMouseMove={acompanhar}
        onMouseLeave={() => setPos(null)}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          if (!hoverRef.current) setModal(true)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation()
            e.preventDefault()
            setModal(true)
          }
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: bandeiras SVG estáticas em public/ */}
        <img
          src={src}
          alt={`Bandeira de ${nome}`}
          onError={() => setErro(true)}
          className="h-3.5 w-5 object-cover"
          draggable={false}
        />
      </span>

      {montado &&
        pos &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 rounded-lg border border-border bg-background p-2 shadow-xl"
            style={{ left, top, width: POPUP_W }}
          >
            {/* biome-ignore lint/performance/noImgElement: bandeiras SVG estáticas em public/ */}
            <img
              src={src}
              alt=""
              className="h-auto w-full rounded"
              draggable={false}
            />
            <p className="mt-1.5 text-center text-xs font-medium text-foreground">
              {nome}
            </p>
          </div>,
          document.body
        )}

      {montado &&
        modal &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <button
              type="button"
              aria-label="Fechar"
              className="absolute inset-0 bg-black/50"
              onClick={() => setModal(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Bandeira de ${nome}`}
              className="relative z-10 w-full max-w-xs rounded-xl border border-border bg-background p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setModal(false)}
                aria-label="Fechar"
                className="absolute -right-3 -top-3 inline-flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md transition-colors hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              {/* biome-ignore lint/performance/noImgElement: bandeiras SVG estáticas em public/ */}
              <img
                src={src}
                alt={`Bandeira de ${nome}`}
                className="h-auto w-full rounded"
                draggable={false}
              />
              <p className="mt-3 text-center text-sm font-medium text-foreground">
                {nome}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
