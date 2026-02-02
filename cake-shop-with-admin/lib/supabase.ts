import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'biscuits' | 'chocolates' | 'brownies';
  type: string;
  image: string;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
  rating: number;
  display_order: number;
  created_at?: string;
  updated_at?: string;
};

export type SiteSettings = {
  id: string;
  business_name: string;
  tagline: string | null;
  phone1: string;
  phone2: string | null;
  email: string;
  address: string;
  instagram: string | null;
  instagram_url: string | null;
  order_lead_time: string | null;
  delivery_options: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_button_text: string | null;
  updated_at?: string;
};

// Helper functions
export async function getProducts(category?: string) {
  let query = supabase.from('products').select('*');

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query.order('id', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data as Product[];
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data as Product[];
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data as Testimonial[];
}

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'main')
    .single();

  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }

  return data as SiteSettings;
}
