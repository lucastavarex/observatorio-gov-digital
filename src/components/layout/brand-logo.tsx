import Image from 'next/image'

type BrandLogoProps = {
  className?: string
  loading?: 'eager' | 'lazy'
}

export function BrandLogo({ className, loading }: BrandLogoProps) {
  return (
    <Image
      src="/logo_observatorio.svg"
      alt="Observatório Brasileiro de Governo Digital"
      width={1740}
      height={277}
      unoptimized
      loading={loading}
      className={className}
    />
  )
}
