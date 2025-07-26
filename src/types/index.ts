export interface User {
  id: string
  phone_number: string
  country_code: 'IN' | 'NP'
  name?: string
  email?: string
  is_verified: boolean
  user_type: 'buyer' | 'seller' | 'admin'
  created_at: string
  updated_at: string
}

export interface Seller {
  id: string
  user_id: string
  business_name: string
  business_type?: string
  aadhar_number?: string
  pan_number?: string
  kyc_status: 'pending' | 'verified' | 'rejected'
  bank_account?: string
  ifsc_code?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  seller_id?: string
  title: string
  description?: string
  category: string
  price: number
  discount_percentage: number
  stock: number
  images: string[]
  country_code: 'IN' | 'NP'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
  delivery_address: string
  phone_number: string
  country_code: 'IN' | 'NP'
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
  product?: Product
}

export interface Country {
  code: 'IN' | 'NP'
  name: string
  flag: string
  currency: string
  phonePrefix: string
}