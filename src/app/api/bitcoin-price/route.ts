import { NextResponse } from 'next/server'

// Cache variables
let cachedPrice: number | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes - increased to avoid rate limits

interface CoinGeckoResponse {
  bitcoin: {
    usd: number
  }
}

export async function GET() {
  try {
    const now = Date.now()
    
    // Return cached price if it's still fresh
    if (cachedPrice && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({
        price: cachedPrice,
        cached: true,
        lastUpdated: new Date(cacheTimestamp).toISOString()
      })
    }

    // Fetch fresh price from CoinGecko API
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      {
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000)
      }
    )

    if (!response.ok) {
      if (response.status === 429) {
        // Rate limited - extend cache duration and return cached data if available
        if (cachedPrice) {
          console.log('Rate limited by CoinGecko, extending cache duration')
          return NextResponse.json({
            price: cachedPrice,
            cached: true,
            lastUpdated: new Date(cacheTimestamp).toISOString(),
            rateLimited: true
          })
        }
        throw new Error('Rate limited by CoinGecko API')
      }
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data: CoinGeckoResponse = await response.json()
    const price = data.bitcoin.usd

    // Update cache
    cachedPrice = price
    cacheTimestamp = now

    return NextResponse.json({
      price: price,
      cached: false,
      lastUpdated: new Date(now).toISOString()
    })

  } catch (error) {
    console.error('Bitcoin price fetch error:', error)
    
    // Return cached price if available, even if stale
    if (cachedPrice) {
      return NextResponse.json({
        price: cachedPrice,
        cached: true,
        lastUpdated: new Date(cacheTimestamp).toISOString(),
        error: 'Using cached price due to API error'
      })
    }

    // Return error response if no cached price available
    return NextResponse.json(
      { 
        error: 'Failed to fetch Bitcoin price',
        price: null 
      },
      { status: 500 }
    )
  }
}
