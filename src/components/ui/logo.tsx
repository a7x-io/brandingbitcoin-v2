"use client"

import Image from 'next/image'
import { useTheme } from './theme-provider'
import { useEffect, useState } from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({ width = 180, height = 33, className = "h-8 w-auto", priority = false }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    setMounted(true)
    
    // Check the actual CSS class on the document element to determine the real theme
    const checkActualTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setActualTheme(isDark ? 'dark' : 'light')
    }
    
    checkActualTheme()
    
    // Listen for theme changes
    const observer = new MutationObserver(checkActualTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])
  
  // Use the actual theme from CSS classes when mounted, fallback to context theme during SSR
  const effectiveTheme = mounted ? actualTheme : (theme === 'dark' ? 'dark' : 'light')
  const logoSrc = effectiveTheme === 'dark' ? '/LogoB-White.svg' : '/LogoB.svg'
  
  return (
    <Image
      key={effectiveTheme} // Force re-render when theme changes
      src={logoSrc}
      alt="BrandingBitcoin Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
