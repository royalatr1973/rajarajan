export type Category = 'kanchipuram-silk' | 'soft-silk' | 'silk-cotton' | 'wedding-collection' | 'korvai-collection'

export interface Product {
  id: string
  name: string
  description: string
  category: Category
  type: string
  image_url: string
  price: string
  original_price: string
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
  'kanchipuram-silk': { label: 'Kanchipuram Silk', emoji: '🪷', description: 'Pure handwoven Kanchipuram silk sarees with rich zari work' },
  'soft-silk': { label: 'Soft Silk', emoji: '✨', description: 'Lightweight and elegant soft silk sarees for everyday grace' },
  'silk-cotton': { label: 'Silk Cotton', emoji: '🌿', description: 'Comfortable silk cotton blend sarees perfect for all seasons' },
  'wedding-collection': { label: 'Wedding Collection', emoji: '💍', description: 'Exquisite bridal sarees for your most special day' },
  'korvai-collection': { label: 'Korvai Collection', emoji: '🎨', description: 'Traditional Korvai border sarees with contrasting pallus' },
}

export const ALL_CATEGORIES: Category[] = ['kanchipuram-silk', 'soft-silk', 'silk-cotton', 'wedding-collection', 'korvai-collection']
