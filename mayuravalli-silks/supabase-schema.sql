-- ============================================
-- Mayuravalli Silks - Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor to create all required tables.
-- After creating tables, visit /api/seed (POST) to populate with default data.

-- 1. Site Settings (single row for all business info)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT DEFAULT 'Mayuravalli Silks',
  tagline TEXT DEFAULT 'Handcrafted Elegance, Woven with Tradition',
  logo_url TEXT DEFAULT '',
  phone1 TEXT DEFAULT '',
  phone2 TEXT DEFAULT '',
  email TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  youtube TEXT DEFAULT '',
  facebook TEXT DEFAULT '',
  business_hours_weekday TEXT DEFAULT '',
  business_hours_weekend TEXT DEFAULT '',
  order_notice TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Hero Section (single row for homepage hero)
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT DEFAULT 'Pure Kanchipuram Silk Sarees',
  subtitle TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  cta_primary_text TEXT DEFAULT 'Shop Now',
  cta_primary_link TEXT DEFAULT '/products',
  cta_secondary_text TEXT DEFAULT 'View Collections',
  cta_secondary_link TEXT DEFAULT '/products',
  stat1_value TEXT DEFAULT '20+',
  stat1_label TEXT DEFAULT 'Years of Legacy',
  stat2_value TEXT DEFAULT '5000+',
  stat2_label TEXT DEFAULT 'Happy Customers',
  stat3_value TEXT DEFAULT '100%',
  stat3_label TEXT DEFAULT 'Pure Silk',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Products (all 5 categories)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('kanchipuram-silk', 'soft-silk', 'silk-cotton', 'wedding-collection', 'korvai-collection')),
  type TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  price TEXT DEFAULT '',
  original_price TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Messages (contact form submissions)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access (for a simple silk shop site)
-- For production, restrict write access to authenticated users only

CREATE POLICY "Allow public access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to hero_section" ON hero_section FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access to messages" ON messages FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- ============================================
-- Storage Bucket & Policies
-- ============================================
-- If you already created the "images" bucket in the Dashboard, skip the INSERT.
-- Otherwise uncomment the next line:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- IMPORTANT: Storage policies are required for uploads to work!

CREATE POLICY "Allow public uploads to images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public reads from images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Allow public updates to images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images');

CREATE POLICY "Allow public deletes from images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images');
