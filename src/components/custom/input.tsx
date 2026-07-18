import type * as React from 'react'

import { Input as InputPrimitive } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function Input({
  className,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  return (
    <InputPrimitive
      className={cn('h-10 dark:bg-transparent', className)}
      {...props}
    />
  )
}

export { Input }
