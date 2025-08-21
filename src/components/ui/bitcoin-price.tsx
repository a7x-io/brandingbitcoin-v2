"use client"

import { useState, useEffect } from 'react'

interface BitcoinPriceData {
  price: number | null
  cached: boolean
  lastUpdated: string
  error?: string
}

export function BitcoinPrice() {
  const [priceData, setPriceData] = useState<BitcoinPriceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBitcoinPrice = async () => {
    try {
      const response = await fetch('/api/bitcoin-price')
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limited - please wait')
        }
        throw new Error('Failed to fetch price')
      }

      const data: BitcoinPriceData = await response.json()
      setPriceData(data)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load'
      setError(errorMessage)
      console.error('Bitcoin price fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchBitcoinPrice()

    // Set up interval to refresh price every 5 minutes (matching server cache)
    const interval = setInterval(fetchBitcoinPrice, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur">
        <span className="text-orange-500">₿</span>
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    )
  }

  if (error || !priceData || priceData.price === null) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur">
        <span className="text-orange-500">₿</span>
        <span className="text-sm text-muted-foreground">--</span>
      </div>
    )
  }

  return (
    <div 
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur hover:bg-background/90 transition-colors cursor-pointer group"
      title={`Last updated: ${new Date(priceData.lastUpdated).toLocaleTimeString()}`}
    >
      <span className="text-orange-500 group-hover:scale-110 transition-transform">₿</span>
      <span className="text-sm font-medium text-foreground">
        {formatPrice(priceData.price)}
      </span>
      {priceData.cached && (
        <span className="w-2 h-2 bg-green-500 rounded-full opacity-50" />
      )}
    </div>
  )
}
