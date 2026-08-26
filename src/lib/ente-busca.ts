/** A partir deste tamanho a lista ganha campo de busca (lista curta cabe; 319 não). */
export const ENTE_BUSCA_LIMIAR = 30

function normalizar(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/** `true` se o nome ou a UF do ente contém o termo (sem acento, case-insensitive). */
export function entePassaBusca(
  ente: { nome: string; ufSigla?: string | null },
  termo: string
): boolean {
  const q = normalizar(termo)
  if (!q) return true
  return (
    normalizar(ente.nome).includes(q) ||
    normalizar(ente.ufSigla ?? '').includes(q)
  )
}
