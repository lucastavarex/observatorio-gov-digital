import type { TourStepCopy } from '@/data/tour-copy'
import type { GuidedTourId } from '@/lib/guided-tour/storage'
import { markTourCompleted } from '@/lib/guided-tour/storage'

export type RunTourOptions = {
  id: GuidedTourId
  steps: TourStepCopy[]
  /** Se true, grava conclusão no localStorage ao fechar/pular/concluir. */
  markDoneOnDestroy?: boolean
}

let activeDestroy: (() => void) | null = null

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Importa Driver.js só no client e inicia o tour.
 * Cancela qualquer tour anterior antes de começar outro.
 */
export async function runGuidedTour({
  id,
  steps,
  markDoneOnDestroy = true,
}: RunTourOptions): Promise<void> {
  if (typeof window === 'undefined') return

  activeDestroy?.()
  activeDestroy = null

  const [{ driver }, _css] = await Promise.all([
    import('driver.js'),
    import('driver.js/dist/driver.css'),
  ])

  const driveSteps = steps
    .filter(step => {
      if (!step.element) return true
      return Boolean(document.querySelector(step.element))
    })
    .map(step => ({
      element: step.element,
      popover: {
        title: step.title,
        description: step.description,
        side: step.side,
        align: step.align,
      },
    }))

  if (driveSteps.length === 0) return

  const reducedMotion = prefersReducedMotion()

  const d = driver({
    showProgress: true,
    animate: !reducedMotion,
    smoothScroll: !reducedMotion,
    allowClose: true,
    allowKeyboardControl: true,
    overlayOpacity: 0.55,
    stagePadding: 8,
    stageRadius: 8,
    popoverClass: 'obgd-driver-popover',
    nextBtnText: 'Próximo',
    prevBtnText: 'Anterior',
    doneBtnText: 'Concluir',
    progressText: '{{current}} de {{total}}',
    skipMissingElement: true,
    steps: driveSteps,
    onDestroyed: () => {
      if (markDoneOnDestroy) markTourCompleted(id)
      if (activeDestroy) activeDestroy = null
    },
  })

  activeDestroy = () => {
    if (d.isActive()) d.destroy()
  }

  d.drive()
}
