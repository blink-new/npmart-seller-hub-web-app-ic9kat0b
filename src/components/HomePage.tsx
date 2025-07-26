import { Search, Filter, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { useState } from 'react'

const categories = [
  { name: 'Fashion', icon: '👗', color: 'bg-pink-100 text-pink-700' },
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  { name: 'Hotels', icon: '🏨', color: 'bg-purple-100 text-purple-700' },
  { name: 'Food', icon: '🍕', color: 'bg-orange-100 text-orange-700' },
  { name: 'Books', icon: '📚', color: 'bg-green-100 text-green-700' },
  { name: 'Sports', icon: '⚽', color: 'bg-red-100 text-red-700' },
  { name: 'Beauty', icon: '💄', color: 'bg-pink-100 text-pink-700' },
  { name: 'Home', icon: '🏠', color: 'bg-yellow-100 text-yellow-700' },
]

const festivalOffers = [
  {
    id: 1,
    title: 'Dashain Festival Sale',
    subtitle: 'Up to 70% OFF',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=400&fit=crop',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 2,
    title: 'Electronics Mega Sale',
    subtitle: 'Best Deals on Gadgets',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 3,
    title: 'Fashion Week Special',
    subtitle: 'Trending Styles',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    color: 'from-pink-500 to-purple-500'
  }
]

const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    price: 15999,
    originalPrice: 19999,
    discount: 20,
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirt',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 4.3,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Gaming Mechanical Keyboard',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.7,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Leather Wallet for Men',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.4,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Wireless Phone Charger',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.2,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop'
  }
]

export default function HomePage() {
  const [currentOffer, setCurrentOffer] = useState(0)

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % festivalOffers.length)
  }

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + festivalOffers.length) % festivalOffers.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Flag */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">NpMart</span>
              </div>
              <div className="text-2xl">🇳🇵</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="pl-10 pr-12 h-12 text-base"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-10 px-4"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Login
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Scroll */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-md`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Offers Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentOffer * 100}%)` }}
            >
              {festivalOffers.map((offer) => (
                <div key={offer.id} className="w-full flex-shrink-0 relative">
                  <div className={`h-64 bg-gradient-to-r ${offer.color} flex items-center justify-between px-12 text-white`}>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold">{offer.title}</h2>
                      <p className="text-xl opacity-90">{offer.subtitle}</p>
                      <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                        Shop Now
                      </Button>
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-64 h-48 object-cover rounded-lg shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={prevOffer}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={nextOffer}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {festivalOffers.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentOffer ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentOffer(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-destructive text-white">
                    -{product.discount}%
                  </Badge>
                </div>
                
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-2xl font-bold">NpMart</span>
              </div>
              <p className="text-gray-400">
                Your trusted marketplace for quality products in Nepal.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hotels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Food</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NpMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}