export type Category = 'cakes' | 'brownies' | 'cup-cakes' | 'biscuits' | 'chocolates'

export interface Product {
  id: string
  name: string
  description: string
  category: Category
  type: string
  image_url: string
  price: string
  is_featured: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface SiteSettings {
  id: string
  business_name: string
  tagline: string
  logo_url: string
  phone1: string
  phone2: string
  email: string
  address: string
  city: string
  whatsapp: string
  instagram: string
  youtube: string
  facebook: string
  business_hours_weekday: string
  business_hours_weekend: string
  order_notice: string
  created_at?: string
  updated_at?: string
}

export interface HeroSection {
  id: string
  title: string
  subtitle: string
  image_url: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
  stat1_value: string
  stat1_label: string
  stat2_value: string
  stat2_label: string
  stat3_value: string
  stat3_label: string
  created_at?: string
  updated_at?: string
}

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  created_at?: string
}

export interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  is_read: boolean
  created_at?: string
}

export const CATEGORY_INFO: Record<Category, { label: string; emoji: string; description: string }> = {
  'cakes': { label: 'Cakes', emoji: '🎂', description: 'Delicious homemade cakes for every occasion' },
  'brownies': { label: 'Brownies', emoji: '🍫', description: 'Rich and fudgy brownies baked to perfection' },
  'cup-cakes': { label: 'Cup Cakes', emoji: '🧁', description: 'Adorable cupcakes with beautiful toppings' },
  'biscuits': { label: 'Biscuits', emoji: '🍪', description: 'Crunchy cookies and biscuits for tea time' },
  'chocolates': { label: 'Chocolates', emoji: '🍬', description: 'Handcrafted chocolates and truffles' },
}

export const ALL_CATEGORIES: Category[] = ['cakes', 'brownies', 'cup-cakes', 'biscuits', 'chocolates']
