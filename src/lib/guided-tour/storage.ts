export type GuidedTourId = 'indicadores' | 'ranking'

const STORAGE_KEYS: Record<GuidedTourId, string> = {
  indicadores: 'obgd-tour-indicadores-v1',
  ranking: 'obgd-tour-ranking-v1',
}

export function isTourCompleted(id: GuidedTourId): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(STORAGE_KEYS[id]) === '1'
  } catch {
    return true
  }
}

export function markTourCompleted(id: GuidedTourId): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEYS[id], '1')
  } catch {
    // ignore quota / private mode
  }
}
