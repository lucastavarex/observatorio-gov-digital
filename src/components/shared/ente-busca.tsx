'use client'

import { Search, X } from 'lucide-react'

import { Input } from '@/components/custom/input'

export function EnteBusca({
  value,
  onChange,
  placeholder = 'Buscar por município ou sigla da UF…',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="[&::-webkit-search-cancel-button]:hidden pr-9 pl-9"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center text-primary"
        >
          <X aria-hidden="true" className="size-3.5" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
}
