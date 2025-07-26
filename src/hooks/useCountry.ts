import { useState, useEffect } from 'react'
import type { Country } from '../types'

const countries: Record<string, Country> = {
  IN: {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: '₹',
    phonePrefix: '+91'
  },
  NP: {
    code: 'NP',
    name: 'Nepal',
    flag: '🇳🇵',
    currency: 'Rs.',
    phonePrefix: '+977'
  }
}

export function useCountry() {
  const [country, setCountry] = useState<Country>(countries.NP) // Default to Nepal
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    // Try to detect country from browser/location
    const detectCountry = async () => {
      try {
        // First check localStorage for saved preference
        const savedCountry = localStorage.getItem('npmart_country')
        if (savedCountry && countries[savedCountry]) {
          setCountry(countries[savedCountry])
          setIsDetecting(false)
          return
        }

        // Try to get location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use a geolocation API to get country from coordinates
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                )
                const data = await response.json()
                
                if (data.countryCode === 'IN') {
                  setCountry(countries.IN)
                } else {
                  setCountry(countries.NP) // Default to Nepal for other countries
                }
              } catch (error) {
                console.log('Geolocation API failed, using default Nepal')
                setCountry(countries.NP)
              }
              setIsDetecting(false)
            },
            () => {
              // Geolocation failed, use default
              setCountry(countries.NP)
              setIsDetecting(false)
            },
            { timeout: 5000 }
          )
        } else {
          setCountry(countries.NP)
          setIsDetecting(false)
        }
      } catch (error) {
        setCountry(countries.NP)
        setIsDetecting(false)
      }
    }

    detectCountry()
  }, [])

  const switchCountry = (countryCode: 'IN' | 'NP') => {
    setCountry(countries[countryCode])
    localStorage.setItem('npmart_country', countryCode)
  }

  return {
    country,
    isDetecting,
    switchCountry,
    countries: Object.values(countries)
  }
}