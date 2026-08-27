'use client'

import * as React from 'react'
import type { TourStepCopy } from '@/data/tour-copy'
import { runGuidedTour } from '@/lib/guided-tour/run-tour'
import type { GuidedTourId } from '@/lib/guided-tour/storage'
import { isTourCompleted } from '@/lib/guided-tour/storage'

type UseGuidedTourOptions = {
  id: GuidedTourId
  steps: TourStepCopy[]
  /** Seletor mínimo que precisa existir antes do auto-start. */
  readySelector: string
  /** Atraso curto para estabilizar layout pós-hidratação. */
  autoStartDelayMs?: number
}

export function useGuidedTour({
  id,
  steps,
  readySelector,
  autoStartDelayMs = 450,
}: UseGuidedTourOptions) {
  const startedRef = React.useRef(false)

  const startTour = React.useCallback(
    (opts?: { markDoneOnDestroy?: boolean }) => {
      void runGuidedTour({
        id,
        steps,
        markDoneOnDestroy: opts?.markDoneOnDestroy ?? true,
      })
    },
    [id, steps]
  )

  React.useEffect(() => {
    if (startedRef.current) return
    if (isTourCompleted(id)) return

    let cancelled = false
    let attempts = 0
    const maxAttempts = 20

    const tryStart = () => {
      if (cancelled || startedRef.current) return
      if (!document.querySelector(readySelector)) {
        attempts += 1
        if (attempts < maxAttempts) {
          window.setTimeout(tryStart, 100)
        }
        return
      }
      startedRef.current = true
      startTour({ markDoneOnDestroy: true })
    }

    const timer = window.setTimeout(tryStart, autoStartDelayMs)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [autoStartDelayMs, id, readySelector, startTour])

  return { startTour }
}
