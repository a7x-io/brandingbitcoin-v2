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
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    // Check the actual CSS class on the document element
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setCurrentTheme(isDark ? 'dark' : 'light')
    }
    
    checkTheme()
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [theme])
  
  // Determine which logo to use based on actual theme
  const logoSrc = currentTheme === 'dark' ? '/LogoB-White.svg' : '/LogoB.svg'
  
  // Debug logging
  console.log('Logo component - Theme prop:', theme, 'Actual theme:', currentTheme, 'Logo src:', logoSrc)
  
  return (
    <Image
      key={currentTheme} // Force re-render when theme changes
      src={logoSrc}
      alt="BrandingBitcoin Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
