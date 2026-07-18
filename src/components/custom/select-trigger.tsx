'use client'

import type * as React from 'react'

import { SelectTrigger as SelectTriggerPrimitive } from '@/components/ui/select'
import { cn } from '@/lib/utils'

function SelectTrigger({
  className,
  ...props
}: React.ComponentProps<typeof SelectTriggerPrimitive>) {
  return (
    <SelectTriggerPrimitive
      className={cn(
        'h-10 w-full data-[size=default]:h-10 dark:bg-transparent dark:hover:bg-transparent [&_svg]:text-muted-foreground [&_svg]:opacity-100',
        className
      )}
      {...props}
    />
  )
}

export { SelectTrigger }
