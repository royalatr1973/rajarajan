-- Supabase SQL setup for The Cake Craving Admin
-- Run this in the Supabase SQL Editor to create all required tables

-- Drop existing tables if re-running this script
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS hero CASCADE;

-- Products table (all 4 verticals: cakes, biscuits, chocolates, brownies)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cakes', 'biscuits', 'chocolates', 'brownies')),
  product_type TEXT NOT NULL,
  image TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero section table
CREATE TABLE hero (
  id TEXT PRIMARY KEY DEFAULT 'main',
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta_text TEXT DEFAULT 'Order Now',
  background_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read on hero" ON hero FOR SELECT USING (true);

-- Allow insert/update/delete (for admin panel)
CREATE POLICY "Allow insert on products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow delete on products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow insert on testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow delete on testimonials" ON testimonials FOR DELETE USING (true);

CREATE POLICY "Allow insert on hero" ON hero FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on hero" ON hero FOR UPDATE USING (true);
CREATE POLICY "Allow delete on hero" ON hero FOR DELETE USING (true);

-- Seed data: Products - Cakes
INSERT INTO products (id, name, description, category, product_type, image, is_featured, is_best_seller, display_order) VALUES
  ('c1', 'Chocolate Truffle Cake', 'Rich chocolate layers with smooth truffle cream frosting', 'cakes', 'Chocolate', '/images/chocolate.jpg', true, true, 1),
  ('c2', 'Red Velvet Cake', 'Classic red velvet with cream cheese frosting', 'cakes', 'Theme', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', true, true, 2),
  ('c3', 'Black Forest Cake', 'Chocolate cake with cherry filling and whipped cream', 'cakes', 'Chocolate', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', true, true, 3),
  ('c4', 'Butterscotch Cake', 'Classic butterscotch flavor with crunchy caramel bits', 'cakes', 'Classic', '/images/butterscotch.jpg', true, true, 4),
  ('c5', 'Mango Delight Cake', 'Fresh mango puree with vanilla sponge', 'cakes', 'Fruit', '/images/mango.jpg', false, false, 5),
  ('c6', 'Grape Delight Cake', 'Fresh grape puree with vanilla sponge', 'cakes', 'Fruit', '/images/grape.jpg', false, false, 6);

-- Seed data: Products - Biscuits
INSERT INTO products (id, name, description, category, product_type, image, is_featured, is_best_seller, display_order) VALUES
  ('b1', 'Chocolate Chip Cookies', 'Classic cookies loaded with chocolate chips', 'biscuits', 'Chocolate', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', true, false, 1),
  ('b2', 'Butter Cookies', 'Melt-in-mouth buttery cookies', 'biscuits', 'Classic', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', true, false, 2),
  ('b3', 'Oatmeal Cookies', 'Healthy oats cookies with raisins', 'biscuits', 'Healthy', 'https://images.unsplash.com/photo-1590080876876-5674a3e5e26f?w=800&q=80', false, false, 3);

-- Seed data: Products - Chocolates
INSERT INTO products (id, name, description, category, product_type, image, is_featured, is_best_seller, display_order) VALUES
  ('ch1', 'Dark Chocolate Truffles', 'Premium dark chocolate truffles with cocoa dusting', 'chocolates', 'Dark', 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', true, false, 1),
  ('ch2', 'Milk Chocolate Box', 'Assorted milk chocolates in a gift box', 'chocolates', 'Milk', 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80', true, false, 2),
  ('ch3', 'Chocolate Bark', 'Handcrafted chocolate bark with nuts', 'chocolates', 'Specialty', 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80', false, false, 3);

-- Seed data: Products - Brownies
INSERT INTO products (id, name, description, category, product_type, image, is_featured, is_best_seller, display_order) VALUES
  ('br1', 'Classic Fudge Brownies', 'Dense, fudgy brownies with intense chocolate flavor', 'brownies', 'Classic', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', true, false, 1),
  ('br2', 'Walnut Brownies', 'Chewy brownies loaded with crunchy walnuts', 'brownies', 'Nut', 'https://images.unsplash.com/photo-1564355808853-07d7e1278c76?w=800&q=80', true, false, 2),
  ('br3', 'Cream Cheese Brownies', 'Swirled brownies with tangy cream cheese', 'brownies', 'Specialty', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80', false, false, 3);

-- Seed data: Testimonials
INSERT INTO testimonials (id, name, text, rating, display_order) VALUES
  ('t1', 'Divya Krishnan', 'Ordered a custom birthday cake for my son and it was absolutely stunning! The taste was even better than it looked. Thank you!', 5, 1),
  ('t2', 'Raj Patel', 'The chocolate truffle cake was a masterpiece! Not only beautiful but incredibly delicious. Will definitely order again!', 5, 2),
  ('t3', 'Priya Sharma', 'Loved the custom theme cake for my daughter''s birthday. The quality and attention to detail were exceptional!', 5, 3),
  ('t4', 'Arun Kumar', 'Perfect anniversary cake! Fresh, delicious, and beautifully decorated. Highly recommend The Cake Craving!', 5, 4);

-- Seed data: Hero
INSERT INTO hero (id, title, subtitle, cta_text, background_image) VALUES
  ('main', 'Home made, customized cakes for every celebration', 'Cake is the secret ingredient for a joyful celebration, make it little sweeter with our delectable cakes!', 'Order Now', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80');
