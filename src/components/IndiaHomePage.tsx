import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star, ShoppingCart, Percent, TrendingUp, Users, Store } from 'lucide-react'
import { blink } from '../blink/client'
import type { Product } from '../types'

const categories = [
  { name: 'Fashion', icon: '👗', color: 'bg-pink-100 text-pink-700' },
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  { name: 'Hotels', icon: '🏨', color: 'bg-purple-100 text-purple-700' },
  { name: 'Food', icon: '🍕', color: 'bg-orange-100 text-orange-700' },
  { name: 'Books', icon: '📚', color: 'bg-green-100 text-green-700' },
  { name: 'Sports', icon: '⚽', color: 'bg-red-100 text-red-700' },
  { name: 'Beauty', icon: '💄', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Home', icon: '🏠', color: 'bg-indigo-100 text-indigo-700' }
]

const offers = [
  {
    title: 'Diwali Mega Sale',
    subtitle: 'Up to 80% Off',
    description: 'Festival offers on all categories',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Electronics Bonanza',
    subtitle: 'Starting ₹999',
    description: 'Latest smartphones & gadgets',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Fashion Week',
    subtitle: 'Flat 60% Off',
    description: 'Trending styles for everyone',
    gradient: 'from-pink-500 to-rose-500'
  }
]

export function IndiaHomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const loadProducts = async () => {
    try {
      const data = await blink.db.products.list({
        where: { country_code: 'IN', is_active: true },
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
      original: `₹${price.toLocaleString()}`,
      discounted: discount > 0 ? `₹${discountedPrice.toLocaleString()}` : null,
      discount: discount > 0 ? `${discount}% off` : null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Stats - Multi-vendor marketplace highlights */}
      <div className="bg-gradient-to-r from-primary to-orange-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">India's Fastest Growing Marketplace</h2>
            <p className="text-orange-100">Connecting millions of buyers with thousands of sellers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Store className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">50K+</span>
              </div>
              <p className="text-sm text-orange-100">Active Sellers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">2M+</span>
              </div>
              <p className="text-sm text-orange-100">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">1M+</span>
              </div>
              <p className="text-sm text-orange-100">Products Listed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Percent className="h-6 w-6 mr-2" />
                <span className="text-2xl font-bold">80%</span>
              </div>
              <p className="text-sm text-orange-100">Max Discount</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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

        {/* Festival Offers */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Festival Offers</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {offers.map((offer, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-r ${offer.gradient} text-white p-6`}>
                  <h4 className="text-lg font-bold mb-1">{offer.title}</h4>
                  <p className="text-2xl font-bold mb-2">{offer.subtitle}</p>
                  <p className="text-sm opacity-90">{offer.description}</p>
                </div>
              </Card>
            ))}
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
                          <span className="text-xs text-gray-600 ml-1">4.2</span>
                        </div>
                        <span className="text-xs text-gray-400">(1.2k)</span>
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

        {/* Seller CTA */}
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Start Selling on NpMart</h3>
            <p className="mb-4 opacity-90">Join thousands of sellers and grow your business with us</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Register as Seller
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-green-600">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}