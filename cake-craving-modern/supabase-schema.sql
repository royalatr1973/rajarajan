-- Supabase Schema for Cake Craving Modern
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  image TEXT,
  category TEXT DEFAULT 'Classic',
  is_bestseller BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Settings Table
CREATE TABLE IF NOT EXISTS hero_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT DEFAULT 'Order Now',
  background_image TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Customer',
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Settings Table
CREATE TABLE IF NOT EXISTS contact_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  address TEXT,
  phone TEXT,
  phone2 TEXT,
  email TEXT,
  hours TEXT,
  whatsapp TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table (for contact form submissions)
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Settings Table
CREATE TABLE IF NOT EXISTS admin_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  password_hash TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view the website)
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on hero_settings" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact_settings" ON contact_settings FOR SELECT USING (true);

-- Create policies for authenticated access (admin operations)
-- For now, we'll allow all operations with anon key for simplicity
-- In production, you should use proper authentication
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on hero_settings" ON hero_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations on testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "Allow all operations on contact_settings" ON contact_settings FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_settings" ON admin_settings FOR ALL USING (true);

-- Insert default hero settings
INSERT INTO hero_settings (id, title, subtitle, cta_text, background_image)
VALUES (
  1,
  'Home made, customized cakes for every celebration',
  'Cake is the secret ingredient for a joyful celebration, make it little sweeter with our delectable cakes!',
  'Order Now',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80'
) ON CONFLICT (id) DO NOTHING;

-- Insert default contact settings
INSERT INTO contact_settings (id, address, phone, phone2, email, hours, whatsapp)
VALUES (
  1,
  '14, Alagrisamy Street, Avadi, Chennai, Tamil Nadu',
  '+91 88384 24741',
  '+91 99413 56037',
  'cake.cravings22@gmail.com',
  'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
  '918838424741'
) ON CONFLICT (id) DO NOTHING;

-- Insert default admin password (cakeadmin2024)
INSERT INTO admin_settings (id, password_hash)
VALUES (1, 'cakeadmin2024')
ON CONFLICT (id) DO NOTHING;

-- Insert default products
INSERT INTO products (id, name, description, price, image, category, is_bestseller, sort_order) VALUES
  ('1', 'Chocolate Truffle Cake', 'Rich chocolate layers with smooth truffle cream frosting', 0, '/images/chocolate.jpg', 'Chocolate', TRUE, 1),
  ('2', 'Red Velvet Cake', 'Classic red velvet with cream cheese frosting', 0, 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', 'Theme', TRUE, 2),
  ('3', 'Black Forest Cake', 'Chocolate cake with cherry filling and whipped cream', 0, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', 'Chocolate', TRUE, 3),
  ('4', 'Butterscotch Cake', 'Classic butterscotch flavor with crunchy caramel bits', 0, '/images/butterscotch.jpg', 'Classic', TRUE, 4),
  ('5', 'Vanilla Birthday Cake', 'Light vanilla sponge with buttercream frosting', 0, 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80', 'Classic', FALSE, 5),
  ('6', 'Custom Theme Cake', 'Personalized theme cakes for any occasion', 0, 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80', 'Theme', FALSE, 6),
  ('7', 'Pineapple Cake', 'Tropical pineapple layers with fresh pineapple chunks', 0, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80', 'Fruit', FALSE, 7),
  ('8', 'Brownie Cake', 'Dense, fudgy chocolate brownie layers', 0, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', 'Chocolate', FALSE, 8),
  ('9', 'Mango Delight Cake', 'Fresh mango puree with vanilla sponge', 0, '/images/mango.jpg', 'Fruit', FALSE, 9),
  ('10', 'Grape Delight Cake', 'Fresh Grape puree with vanilla sponge', 0, '/images/grape.jpg', 'Fruit', FALSE, 10)
ON CONFLICT (id) DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (id, name, content, rating, sort_order) VALUES
  ('1', 'Priya S.', 'The chocolate truffle cake was absolutely divine! Perfect for my birthday celebration.', 5, 1),
  ('2', 'Rahul M.', 'Best homemade cakes in Chennai! The butterscotch cake is my favorite.', 5, 2),
  ('3', 'Ananya K.', 'Ordered a custom cake for my daughter''s birthday. It exceeded all expectations!', 5, 3),
  ('4', 'Vijay R.', 'Fresh, delicious, and beautifully decorated. Highly recommend!', 5, 4)
ON CONFLICT (id) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_hero_settings_updated_at ON hero_settings;
CREATE TRIGGER update_hero_settings_updated_at BEFORE UPDATE ON hero_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_settings_updated_at ON contact_settings;
CREATE TRIGGER update_contact_settings_updated_at BEFORE UPDATE ON contact_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_settings_updated_at ON admin_settings;
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
