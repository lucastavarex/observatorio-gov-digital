import { cn } from '@/lib/utils'

type FilterPillProps = {
  active?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

/** Pill de filtro compartilhado (nível, modo, objetivo, tag). */
export function FilterPill({
  active = false,
  disabled = false,
  className,
  children,
  ...props
}: FilterPillProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        disabled
          ? 'cursor-not-allowed border-border text-muted-foreground/40'
          : active
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border text-muted-foreground hover:bg-primary/5 hover:text-primary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
