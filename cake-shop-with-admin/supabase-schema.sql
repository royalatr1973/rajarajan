-- Supabase Database Schema for The Cake Craving
-- 4 Product Verticals: Cakes, Biscuits, Chocolates, Brownies

-- Create products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('cakes', 'biscuits', 'chocolates', 'brownies')),
  type TEXT NOT NULL,
  image TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create testimonials table
CREATE TABLE testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create site_settings table
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  business_name TEXT NOT NULL,
  tagline TEXT,
  phone1 TEXT NOT NULL,
  phone2 TEXT,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  instagram TEXT,
  instagram_url TEXT,
  order_lead_time TEXT,
  delivery_options TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_button_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Public can read testimonials"
  ON testimonials FOR SELECT
  USING (true);

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Insert initial data for cakes
INSERT INTO products (id, name, description, category, type, image, is_featured) VALUES
('c1', 'Chocolate Truffle Cake', 'Rich chocolate layers with smooth truffle cream frosting', 'cakes', 'Chocolate', '/images/chocolate.jpg', TRUE),
('c2', 'Red Velvet Cake', 'Classic red velvet with cream cheese frosting', 'cakes', 'Theme', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', TRUE),
('c3', 'Black Forest Cake', 'Chocolate cake with cherry filling and whipped cream', 'cakes', 'Chocolate', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', TRUE),
('c4', 'Butterscotch Cake', 'Classic butterscotch flavor with crunchy caramel bits', 'cakes', 'Classic', '/images/butterscotch.jpg', TRUE),
('c5', 'Mango Delight Cake', 'Fresh mango puree with vanilla sponge', 'cakes', 'Fruit', '/images/mango.jpg', FALSE),
('c6', 'Grape Delight Cake', 'Fresh grape puree with vanilla sponge', 'cakes', 'Fruit', '/images/grape.jpg', FALSE);

-- Insert initial data for biscuits
INSERT INTO products (id, name, description, category, type, image, is_featured) VALUES
('b1', 'Chocolate Chip Cookies', 'Classic cookies loaded with chocolate chips', 'biscuits', 'Chocolate', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', TRUE),
('b2', 'Butter Cookies', 'Melt-in-mouth buttery cookies', 'biscuits', 'Classic', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', TRUE),
('b3', 'Oatmeal Cookies', 'Healthy oats cookies with raisins', 'biscuits', 'Healthy', 'https://images.unsplash.com/photo-1590080876876-5674a3e5e26f?w=800&q=80', FALSE);

-- Insert initial data for chocolates
INSERT INTO products (id, name, description, category, type, image, is_featured) VALUES
('ch1', 'Dark Chocolate Truffles', 'Premium dark chocolate truffles with cocoa dusting', 'chocolates', 'Dark', 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', TRUE),
('ch2', 'Milk Chocolate Box', 'Assorted milk chocolates in a gift box', 'chocolates', 'Milk', 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80', TRUE),
('ch3', 'Chocolate Bark', 'Handcrafted chocolate bark with nuts', 'chocolates', 'Specialty', 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80', FALSE);

-- Insert initial data for brownies
INSERT INTO products (id, name, description, category, type, image, is_featured) VALUES
('br1', 'Classic Fudge Brownies', 'Dense, fudgy brownies with intense chocolate flavor', 'brownies', 'Classic', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', TRUE),
('br2', 'Walnut Brownies', 'Chewy brownies loaded with crunchy walnuts', 'brownies', 'Nut', 'https://images.unsplash.com/photo-1564355808853-07d7e1278c76?w=800&q=80', TRUE),
('br3', 'Cream Cheese Brownies', 'Swirled brownies with tangy cream cheese', 'brownies', 'Specialty', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80', FALSE);

-- Insert initial testimonials
INSERT INTO testimonials (id, name, text, rating, display_order) VALUES
('t1', 'Divya Krishnan', 'Ordered a custom birthday cake for my son and it was absolutely stunning! The taste was even better than it looked. Thank you!', 5, 1),
('t2', 'Raj Patel', 'The chocolate truffle cake was a masterpiece! Not only beautiful but incredibly delicious. Will definitely order again!', 5, 2),
('t3', 'Priya Sharma', 'Loved the custom theme cake for my daughter''s birthday. The quality and attention to detail were exceptional!', 5, 3),
('t4', 'Arun Kumar', 'Perfect anniversary cake! Fresh, delicious, and beautifully decorated. Highly recommend The Cake Craving!', 5, 4);

-- Insert site settings
INSERT INTO site_settings (id, business_name, tagline, phone1, phone2, email, address, instagram, instagram_url, order_lead_time, delivery_options, hero_title, hero_subtitle, hero_button_text) VALUES
('main', 'The Cake Craving', 'Home Made Cakes', '+91 88384 24741', '+91 99413 56037', 'cake.cravings22@gmail.com', '14, Alagrisamy Street, Avadi, Chennai', '@the_.cake._craving', 'https://www.instagram.com/the_.cake._craving/', '2 days prior', 'Door delivery nearby locations / Self pickup', 'Home made, customized cakes for every celebration', 'Cake is the secret ingredient for a joyful celebration, make it little sweeter with our delectable cakes!', 'Order Now');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
