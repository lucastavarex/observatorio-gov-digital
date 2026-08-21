export type NextSearchParams = Record<string, string | string[] | undefined>

/** Adapta o objeto `searchParams` do App Router para a interface `{ get }`. */
export function fromNextSearchParams(sp: NextSearchParams): {
  get(name: string): string | null
} {
  return {
    get(name) {
      const v = sp[name]
      return Array.isArray(v) ? (v[0] ?? null) : (v ?? null)
    },
  }
}
