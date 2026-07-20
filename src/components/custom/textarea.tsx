import type * as React from 'react'

import { Textarea as TextareaPrimitive } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

function Textarea({
  className,
  ...props
}: React.ComponentProps<typeof TextareaPrimitive>) {
  return (
    <TextareaPrimitive
      className={cn(
        'min-h-24 field-sizing-fixed dark:bg-transparent',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
