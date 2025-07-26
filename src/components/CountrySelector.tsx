import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ChevronDown, MapPin } from 'lucide-react'
import type { Country } from '../types'

interface CountrySelectorProps {
  currentCountry: Country
  countries: Country[]
  onCountryChange: (countryCode: 'IN' | 'NP') => void
}

export function CountrySelector({ currentCountry, countries, onCountryChange }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span className="text-lg">{currentCountry.flag}</span>
          <span className="hidden sm:inline">{currentCountry.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Your Country</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {countries.map((country) => (
            <Button
              key={country.code}
              variant={currentCountry.code === country.code ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => {
                onCountryChange(country.code)
                setOpen(false)
              }}
            >
              <span className="text-xl">{country.flag}</span>
              <div className="text-left">
                <div className="font-medium">{country.name}</div>
                <div className="text-sm text-muted-foreground">{country.phonePrefix}</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}