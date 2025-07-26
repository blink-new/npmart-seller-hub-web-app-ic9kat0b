import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Phone, User, Mail, Building } from 'lucide-react'
import { blink } from '../blink/client'
import type { Country } from '../types'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  country: Country
}

export function AuthModal({ open, onOpenChange, country }: AuthModalProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone')
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    businessName: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return
    
    setLoading(true)
    try {
      // Simulate OTP sending - in real app, integrate with SMS service
      console.log(`Sending OTP to ${country.phonePrefix}${phoneNumber}`)
      setStep('otp')
    } catch (error) {
      console.error('Failed to send OTP:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return
    
    setLoading(true)
    try {
      // Simulate OTP verification
      console.log(`Verifying OTP: ${otp}`)
      setStep('profile')
    } catch (error) {
      console.error('Failed to verify OTP:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteRegistration = async () => {
    if (!profile.name) return
    
    setLoading(true)
    try {
      // Create user in database
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      await blink.db.users.create({
        id: userId,
        phone_number: `${country.phonePrefix}${phoneNumber}`,
        country_code: country.code,
        name: profile.name,
        email: profile.email || null,
        is_verified: true,
        user_type: userType
      })

      // If seller, create seller record for India
      if (userType === 'seller' && country.code === 'IN') {
        const sellerId = `seller_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        await blink.db.sellers.create({
          id: sellerId,
          user_id: userId,
          business_name: profile.businessName,
          kyc_status: 'pending'
        })
      }

      // Close modal and refresh auth state
      onOpenChange(false)
      window.location.reload() // Simple refresh for now
    } catch (error) {
      console.error('Failed to complete registration:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetModal = () => {
    setStep('phone')
    setPhoneNumber('')
    setOtp('')
    setProfile({ name: '', email: '', businessName: '' })
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open)
      if (!open) resetModal()
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{country.flag}</span>
            Login to NpMart {country.name}
          </DialogTitle>
        </DialogHeader>

        {step === 'phone' && (
          <div className="space-y-4">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'buyer' | 'seller')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buyer">Buyer</TabsTrigger>
                <TabsTrigger value="seller" disabled={country.code === 'NP'}>
                  {country.code === 'NP' ? 'Seller (Admin Only)' : 'Seller'}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  <span className="text-sm font-medium">{country.phonePrefix}</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="rounded-l-none"
                  maxLength={10}
                />
              </div>
            </div>

            <Button 
              onClick={handleSendOTP} 
              disabled={loading || phoneNumber.length < 10}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit OTP sent to
              </p>
              <p className="font-medium">{country.phonePrefix}{phoneNumber}</p>
            </div>

            <div className="flex justify-center">
              <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('phone')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleVerifyOTP} 
                disabled={loading || otp.length !== 6}
                className="flex-1"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          </div>
        )}

        {step === 'profile' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {userType === 'seller' && country.code === 'IN' && (
              <div className="space-y-2">
                <Label htmlFor="business">Business Name *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="business"
                    placeholder="Enter your business name"
                    value={profile.businessName}
                    onChange={(e) => setProfile(prev => ({ ...prev, businessName: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('otp')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleCompleteRegistration} 
                disabled={loading || !profile.name || (userType === 'seller' && country.code === 'IN' && !profile.businessName)}
                className="flex-1"
              >
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}