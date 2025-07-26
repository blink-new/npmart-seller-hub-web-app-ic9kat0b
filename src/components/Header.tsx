import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Search, ShoppingCart, User, Bell, Menu } from 'lucide-react'
import { CountrySelector } from './CountrySelector'
import { AuthModal } from './AuthModal'
import type { Country } from '../types'

interface HeaderProps {
  country: Country
  countries: Country[]
  onCountryChange: (countryCode: 'IN' | 'NP') => void
  cartCount?: number
}

export function Header({ country, countries, onCountryChange, cartCount = 0 }: HeaderProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Country */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇳🇵</span>
                <div>
                  <h1 className="text-xl font-bold text-primary">NpMart</h1>
                  <p className="text-xs text-muted-foreground">{country.name}</p>
                </div>
              </div>
              <CountrySelector 
                currentCountry={country}
                countries={countries}
                onCountryChange={onCountryChange}
              />
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search products in ${country.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* Login/Profile */}
              <Button 
                variant="ghost" 
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Button>

              {/* Mobile Menu */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search products in ${country.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        country={country}
      />
    </>
  )
}