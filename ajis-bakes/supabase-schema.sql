-- Supabase Schema for Ajis Bakes (with Product Verticals)
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

-- Products Table (with vertical column for product categories)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  image TEXT,
  vertical TEXT DEFAULT 'Cakes',
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
  'Homemade treats crafted for every occasion',
  'Great Taste in Every Bite! Explore our delicious range of cakes, biscuits, chocolates & brownies from Ajis Bakes.',
  'Order Now',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80'
) ON CONFLICT (id) DO NOTHING;

-- Insert default contact settings
INSERT INTO contact_settings (id, address, phone, phone2, email, hours, whatsapp)
VALUES (
  1,
  'Chennai, Tamil Nadu',
  '+91 95661 44888',
  '',
  '',
  'Mon-Sat: 9AM-8PM, Sun: 10AM-6PM',
  '919566144888'
) ON CONFLICT (id) DO NOTHING;

-- Insert default admin password (ajisbakes2024)
INSERT INTO admin_settings (id, password_hash)
VALUES (1, 'ajisbakes2024')
ON CONFLICT (id) DO NOTHING;

-- Insert default products across all 4 verticals
INSERT INTO products (id, name, description, price, image, vertical, category, is_bestseller, sort_order) VALUES
  -- CAKES
  ('1', 'Chocolate Truffle Cake', 'Rich chocolate layers with smooth truffle cream frosting', 0, '/images/chocolate.jpg', 'Cakes', 'Chocolate', TRUE, 1),
  ('2', 'Red Velvet Cake', 'Classic red velvet with cream cheese frosting', 0, 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', 'Cakes', 'Theme', TRUE, 2),
  ('3', 'Black Forest Cake', 'Chocolate cake with cherry filling and whipped cream', 0, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', 'Cakes', 'Chocolate', TRUE, 3),
  ('4', 'Butterscotch Cake', 'Classic butterscotch flavor with crunchy caramel bits', 0, '/images/butterscotch.jpg', 'Cakes', 'Classic', TRUE, 4),
  ('5', 'Vanilla Birthday Cake', 'Light vanilla sponge with buttercream frosting', 0, 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80', 'Cakes', 'Classic', FALSE, 5),
  ('6', 'Custom Theme Cake', 'Personalized theme cakes for any occasion', 0, 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80', 'Cakes', 'Theme', FALSE, 6),
  ('7', 'Pineapple Cake', 'Tropical pineapple layers with fresh pineapple chunks', 0, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80', 'Cakes', 'Fruit', FALSE, 7),
  ('8', 'Mango Delight Cake', 'Fresh mango puree with vanilla sponge', 0, '/images/mango.jpg', 'Cakes', 'Fruit', FALSE, 8),
  -- BISCUITS
  ('101', 'Butter Cookies', 'Melt-in-your-mouth butter cookies, perfect with tea', 0, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', 'Biscuits', 'Butter', TRUE, 101),
  ('102', 'Chocolate Chip Cookies', 'Crispy on the outside, chewy on the inside with rich chocolate chips', 0, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', 'Biscuits', 'Cookies', TRUE, 102),
  ('103', 'Oatmeal Raisin Cookies', 'Wholesome oats with sweet raisins baked to perfection', 0, 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80', 'Biscuits', 'Cookies', FALSE, 103),
  ('104', 'Jeera Biscuits', 'Traditional cumin-flavored savory biscuits', 0, 'https://images.unsplash.com/photo-1621236378699-8c29b5b37917?w=800&q=80', 'Biscuits', 'Savory', FALSE, 104),
  ('105', 'Nankhatai', 'Traditional Indian shortbread cookies with cardamom', 0, 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800&q=80', 'Biscuits', 'Traditional', FALSE, 105),
  ('106', 'Almond Biscotti', 'Twice-baked Italian almond biscuits, perfect for dipping', 0, 'https://images.unsplash.com/photo-1619149651976-b5b28e8a247b?w=800&q=80', 'Biscuits', 'Traditional', FALSE, 106),
  -- CHOCOLATES
  ('201', 'Dark Chocolate Truffles', 'Handmade dark chocolate truffles with rich cocoa ganache', 0, 'https://images.unsplash.com/photo-1549007994-cb92caefdB85?w=800&q=80', 'Chocolates', 'Truffle', TRUE, 201),
  ('202', 'Milk Chocolate Bar', 'Creamy milk chocolate made with finest cocoa butter', 0, 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', 'Chocolates', 'Milk', TRUE, 202),
  ('203', 'White Chocolate Drops', 'Smooth white chocolate drops with vanilla flavor', 0, 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800&q=80', 'Chocolates', 'White', FALSE, 203),
  ('204', 'Assorted Chocolate Box', 'A gift box with an assortment of handmade chocolates', 0, 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80', 'Chocolates', 'Dark', FALSE, 204),
  ('205', 'Hazelnut Praline', 'Roasted hazelnut praline enrobed in dark chocolate', 0, 'https://images.unsplash.com/photo-1542843137-8791a6904d14?w=800&q=80', 'Chocolates', 'Truffle', FALSE, 205),
  ('206', 'Orange Peel Chocolate', 'Candied orange peel dipped in premium dark chocolate', 0, 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80', 'Chocolates', 'Dark', FALSE, 206),
  -- BROWNIES
  ('301', 'Classic Fudge Brownie', 'Dense, fudgy chocolate brownie with a crackly top', 0, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', 'Brownies', 'Fudge', TRUE, 301),
  ('302', 'Walnut Brownie', 'Rich chocolate brownie loaded with crunchy walnuts', 0, 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80', 'Brownies', 'Nutty', TRUE, 302),
  ('303', 'Blondie Bar', 'Butterscotch-flavored blonde brownie with white chocolate chips', 0, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80', 'Brownies', 'Blondie', FALSE, 303),
  ('304', 'Cream Cheese Brownie', 'Marbled brownie with tangy cream cheese swirls', 0, 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80', 'Brownies', 'Classic', FALSE, 304),
  ('305', 'Nutella Brownie', 'Extra-chocolatey brownie with Nutella hazelnut swirl', 0, 'https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=800&q=80', 'Brownies', 'Fudge', FALSE, 305),
  ('306', 'Almond Crunch Brownie', 'Dark chocolate brownie topped with toasted almonds', 0, 'https://images.unsplash.com/photo-1612886623909-0ce32e5a9de0?w=800&q=80', 'Brownies', 'Nutty', FALSE, 306)
ON CONFLICT (id) DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (id, name, content, rating, sort_order) VALUES
  ('1', 'Priya S.', 'The chocolate truffle cake was absolutely divine! Perfect for my birthday celebration.', 5, 1),
  ('2', 'Rahul M.', 'Best homemade treats in Chennai! The butter cookies and brownies are my favorites.', 5, 2),
  ('3', 'Ananya K.', 'Ordered a custom cake and chocolates for my daughter''s birthday. It exceeded all expectations!', 5, 3),
  ('4', 'Vijay R.', 'Fresh, delicious, and beautifully made. The brownies are to die for. Highly recommend!', 5, 4)
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

-- Migration helper: If upgrading from old schema without vertical column,
-- run this to add the vertical column to existing products table:
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS vertical TEXT DEFAULT 'Cakes';
-- UPDATE products SET vertical = 'Cakes' WHERE vertical IS NULL;
