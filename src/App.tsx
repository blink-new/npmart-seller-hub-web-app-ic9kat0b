import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { IndiaHomePage } from './components/IndiaHomePage'
import { NepalHomePage } from './components/NepalHomePage'
import { useCountry } from './hooks/useCountry'
import { blink } from './blink/client'
import type { User } from './types'
import './App.css'

function App() {
  const { country, isDetecting, switchCountry, countries } = useCountry()
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setAuthLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (isDetecting || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🇳🇵</div>
          <h2 className="text-2xl font-bold text-primary mb-2">NpMart</h2>
          <p className="text-muted-foreground">Loading your marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        country={country}
        countries={countries}
        onCountryChange={switchCountry}
        cartCount={0}
      />
      
      {country.code === 'IN' ? (
        <IndiaHomePage />
      ) : (
        <NepalHomePage />
      )}
    </div>
  )
}

export default App