import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star, ShoppingCart, Truck, Shield, Phone, MapPin } from 'lucide-react'
import { blink } from '../blink/client'
import type { Product } from '../types'

const categories = [
  { name: 'Fashion', icon: '👗', color: 'bg-pink-100 text-pink-700' },
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  { name: 'Hotels', icon: '🏨', color: 'bg-purple-100 text-purple-700' },
  { name: 'Food', icon: '🍕', color: 'bg-orange-100 text-orange-700' },
  { name: 'Books', icon: '📚', color: 'bg-green-100 text-green-700' },
  { name: 'Handicrafts', icon: '🎨', color: 'bg-red-100 text-red-700' },
  { name: 'Trekking', icon: '🏔️', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Ayurveda', icon: '🌿', color: 'bg-indigo-100 text-indigo-700' }
]

const features = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Free Delivery',
    description: 'Free delivery across Nepal'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Quality Assured',
    description: 'Authentic products guaranteed'
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: '24/7 Support',
    description: 'Customer support in Nepali'
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Local Store',
    description: 'Proudly serving Nepal'
  }
]

export function NepalHomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const loadProducts = async () => {
    try {
      const data = await blink.db.products.list({
        where: { country_code: 'NP', is_active: true },
        limit: 12,
        orderBy: { created_at: 'desc' }
      })
      setProducts(data.map(product => ({
        ...product,
        images: product.images ? JSON.parse(product.images) : []
      })))
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const formatPrice = (price: number, discount: number = 0) => {
    const discountedPrice = price - (price * discount / 100)
    return {
      original: `Rs. ${price.toLocaleString()}`,
      discounted: discount > 0 ? `Rs. ${discountedPrice.toLocaleString()}` : null,
      discount: discount > 0 ? `${discount}% off` : null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Single store branding */}
      <div className="bg-gradient-to-r from-primary to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl mr-4">🇳🇵</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome to NpMart Nepal</h1>
              <p className="text-xl text-orange-100">Your Trusted Local Store</p>
            </div>
          </div>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover authentic Nepali products, international brands, and local specialties. 
            From Kathmandu to your doorstep with love.
          </p>
          <Button size="lg" variant="secondary" className="text-primary">
            Shop Now
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className="text-primary mb-2 flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Shop by Category</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <p className="text-sm font-medium">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Special Offers</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6">
                <h4 className="text-lg font-bold mb-1">Dashain Festival Sale</h4>
                <p className="text-2xl font-bold mb-2">Up to 50% Off</p>
                <p className="text-sm opacity-90">Traditional wear and festive items</p>
              </div>
            </Card>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                <h4 className="text-lg font-bold mb-1">Local Products</h4>
                <p className="text-2xl font-bold mb-2">Made in Nepal</p>
                <p className="text-sm opacity-90">Support local artisans and businesses</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Featured Products</h3>
            <Button variant="outline">View All</Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-6xl mb-4">🛍️</div>
              <h4 className="text-lg font-semibold mb-2">Coming Soon!</h4>
              <p className="text-gray-600 mb-4">
                We're adding amazing products to our Nepal store. Check back soon!
              </p>
              <Button>Notify Me</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.map((product) => {
                const pricing = formatPrice(product.price, product.discount_percentage)
                return (
                  <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                        {product.images.length > 0 ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      {product.discount_percentage > 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          {product.discount_percentage}% OFF
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.title}</h4>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 ml-1">4.5</span>
                        </div>
                        <span className="text-xs text-gray-400">(25)</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">
                            {pricing.discounted || pricing.original}
                          </span>
                          {pricing.discounted && (
                            <span className="text-xs text-gray-500 line-through">
                              {pricing.original}
                            </span>
                          )}
                        </div>
                        <Button size="sm" className="w-full text-xs">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* About NpMart Nepal */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">About NpMart Nepal</h3>
            <p className="mb-4 opacity-90 max-w-2xl mx-auto">
              We are a local Nepali company committed to bringing you the best products at affordable prices. 
              From traditional handicrafts to modern electronics, we curate every item with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                Our Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}