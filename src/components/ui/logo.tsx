"use client"

import Image from 'next/image'
import { useTheme } from './theme-provider'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({ width = 180, height = 33, className = "h-8 w-auto", priority = false }: LogoProps) {
  const { theme } = useTheme()
  
  // Determine which logo to use based on theme
  const logoSrc = theme === 'dark' ? '/LogoB-White.svg' : '/LogoB.svg'
  
  return (
    <Image
      src={logoSrc}
      alt="BrandingBitcoin Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
