import type * as React from 'react'

import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    // Association with controls is done by consumers via htmlFor / nesting.
    // biome-ignore lint/a11y/noLabelWithoutControl: reusable label primitive
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-2 font-medium text-sm leading-none select-none',
        className
      )}
      {...props}
    />
  )
}

export { Label }
