import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if environment variables are set
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Database types
export interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  is_bestseller: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbHeroSettings {
  id: number;
  title: string;
  subtitle: string;
  cta_text: string;
  background_image: string;
  updated_at?: string;
}

export interface DbTestimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface DbContactSettings {
  id: number;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  updated_at?: string;
}

export interface DbMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  created_at?: string;
}

export interface DbAdminSettings {
  id: number;
  password_hash: string;
  updated_at?: string;
}
