'use client'

import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TourTriggerButtonProps = {
  onClick: () => void
}

export function TourTriggerButton({ onClick }: TourTriggerButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      className="mt-4 gap-1.5"
    >
      <CircleHelp aria-hidden="true" />
      Como funciona
    </Button>
  )
}
