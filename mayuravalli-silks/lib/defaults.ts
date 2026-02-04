import { Product, SiteSettings, HeroSection, Testimonial } from './types'

export const defaultSiteSettings: SiteSettings = {
  id: 'default',
  business_name: 'Mayuravalli Silks',
  tagline: 'Handcrafted Elegance, Woven with Tradition',
  logo_url: '',
  phone1: '+91 78240 03535',
  phone2: '+91 98765 43210',
  email: 'info@mayuravallisilks.com',
  address: 'Kanchipuram Silk Street',
  city: 'Kanchipuram',
  whatsapp: '+91 78240 03535',
  instagram: 'https://instagram.com/mayuravallisilks',
  youtube: 'https://youtube.com/@mayuravallisilks',
  facebook: 'https://facebook.com/mayuravallisilks',
  business_hours_weekday: 'Mon - Sat: 9:00 AM - 9:00 PM',
  business_hours_weekend: 'Sun: 10:00 AM - 7:00 PM',
  order_notice: 'Worldwide shipping available. Custom orders welcome. WhatsApp us for enquiries.',
}

export const defaultHeroSection: HeroSection = {
  id: 'default',
  title: 'Pure Kanchipuram Silk Sarees',
  subtitle: 'Discover the finest handwoven silk sarees, crafted by master weavers with over 20 years of tradition. From bridal collections to everyday elegance, each saree tells a story of heritage and artistry.',
  image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
  cta_primary_text: 'Shop Now',
  cta_primary_link: '/products',
  cta_secondary_text: 'View Collections',
  cta_secondary_link: '/products',
  stat1_value: '20+',
  stat1_label: 'Years of Legacy',
  stat2_value: '5000+',
  stat2_label: 'Happy Customers',
  stat3_value: '100%',
  stat3_label: 'Pure Silk',
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Lakshmi Narayanan',
    text: 'The Kanchipuram silk saree I ordered for my daughter\'s wedding was absolutely stunning! The zari work was exquisite and the colour was exactly as shown. Highly recommended!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Priya Venkatesh',
    text: 'I have been buying sarees from Mayuravalli Silks for years. Their soft silk collection is perfect for daily wear and the prices are very reasonable for the quality.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Meena Sundaram',
    text: 'Ordered a Korvai collection saree from abroad and the worldwide shipping was smooth. The saree was packaged beautifully and arrived in perfect condition.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Radha Krishnan',
    text: 'The bridal saree collection is breathtaking. The craftsmanship and attention to detail in every weave is remarkable. A true treasure for any bride!',
    rating: 5,
  },
]

export const defaultProducts: Product[] = [
  // Kanchipuram Silk Sarees (6 products)
  {
    id: 'ks1', name: 'Royal Magenta Kanchipuram Silk', description: 'Luxurious magenta Kanchipuram pure silk saree with heavy gold zari border and traditional temple motifs. Perfect for weddings and grand celebrations.',
    category: 'kanchipuram-silk', type: 'Traditional', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    price: '₹18,500', original_price: '₹22,000', is_featured: true, display_order: 1,
  },
  {
    id: 'ks2', name: 'Emerald Green Pattu Saree', description: 'Rich emerald green Kanchipuram pattu saree with contrast maroon pallu and intricate peacock motifs woven in pure gold zari.',
    category: 'kanchipuram-silk', type: 'Traditional', image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
    price: '₹21,000', original_price: '₹25,000', is_featured: true, display_order: 2,
  },
  {
    id: 'ks3', name: 'Royal Blue Temple Border', description: 'Stunning royal blue Kanchipuram silk saree with classic temple border design and checks pattern body with gold zari weaving.',
    category: 'kanchipuram-silk', type: 'Temple Border', image_url: 'https://images.unsplash.com/photo-1617627143233-d39e4ac3c482?w=400&h=300&fit=crop',
    price: '₹15,500', original_price: '₹18,000', is_featured: true, display_order: 3,
  },
  {
    id: 'ks4', name: 'Crimson Red Bridal Silk', description: 'Traditional crimson red Kanchipuram bridal silk saree with heavy gold and silver zari work. A timeless choice for the modern bride.',
    category: 'kanchipuram-silk', type: 'Bridal', image_url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&h=300&fit=crop',
    price: '₹35,000', original_price: '₹42,000', is_featured: false, display_order: 4,
  },
  {
    id: 'ks5', name: 'Purple Mango Motif Silk', description: 'Elegant purple Kanchipuram silk saree with traditional mango (paisley) motifs and gold zari border. Perfect for festivals and pujas.',
    category: 'kanchipuram-silk', type: 'Festival', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
    price: '₹16,000', original_price: '₹19,000', is_featured: false, display_order: 5,
  },
  {
    id: 'ks6', name: 'Golden Yellow Classic Silk', description: 'Auspicious golden yellow Kanchipuram silk saree with rich zari butta work throughout the body and contrast green pallu.',
    category: 'kanchipuram-silk', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    price: '₹19,500', original_price: '₹23,000', is_featured: true, display_order: 6,
  },

  // Soft Silk Sarees (5 products)
  {
    id: 'ss1', name: 'Blue Soft Silk with Pink Pallu', description: 'Beautiful blue body soft silk saree with contrasting pink pallu and blouse. Kanchipuram craft with lightweight drape.',
    category: 'soft-silk', type: 'Daily Wear', image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
    price: '₹7,000', original_price: '₹8,500', is_featured: true, display_order: 1,
  },
  {
    id: 'ss2', name: 'Lavender Soft Silk Saree', description: 'Elegant lavender soft silk saree with silver zari border and delicate floral buttas. Ideal for office and casual occasions.',
    category: 'soft-silk', type: 'Office Wear', image_url: 'https://images.unsplash.com/photo-1617627143233-d39e4ac3c482?w=400&h=300&fit=crop',
    price: '₹5,500', original_price: '₹7,000', is_featured: true, display_order: 2,
  },
  {
    id: 'ss3', name: 'Peach Pink Soft Silk', description: 'Graceful peach pink soft silk saree with self-colour zari checks and contrast green border. Lightweight and comfortable.',
    category: 'soft-silk', type: 'Party Wear', image_url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&h=300&fit=crop',
    price: '₹6,500', original_price: '₹8,000', is_featured: false, display_order: 3,
  },
  {
    id: 'ss4', name: 'Mint Green Soft Silk', description: 'Fresh mint green soft silk saree with gold zari temple border and matching pallu. Perfect for festivals and family gatherings.',
    category: 'soft-silk', type: 'Festival', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
    price: '₹7,500', original_price: '₹9,000', is_featured: true, display_order: 4,
  },
  {
    id: 'ss5', name: 'Rust Orange Soft Silk', description: 'Vibrant rust orange soft silk saree with contrast navy blue pallu and gold zari buttas. A modern classic.',
    category: 'soft-silk', type: 'Trendy', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    price: '₹6,000', original_price: '₹7,500', is_featured: false, display_order: 5,
  },

  // Silk Cotton Sarees (5 products)
  {
    id: 'sc1', name: 'Pink Silk Cotton with Green Pallu', description: 'Traditional pink body silk cotton saree with rich green pallu and blouse. Kanchipuram craft with comfortable draping.',
    category: 'silk-cotton', type: 'Traditional', image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
    price: '₹3,500', original_price: '₹4,500', is_featured: true, display_order: 1,
  },
  {
    id: 'sc2', name: 'Yellow Silk Cotton Checks', description: 'Bright yellow silk cotton saree with multicolour checks pattern and contrast border. Ideal for everyday elegance.',
    category: 'silk-cotton', type: 'Daily Wear', image_url: 'https://images.unsplash.com/photo-1617627143233-d39e4ac3c482?w=400&h=300&fit=crop',
    price: '₹2,800', original_price: '₹3,500', is_featured: true, display_order: 2,
  },
  {
    id: 'sc3', name: 'Maroon Silk Cotton Temple Border', description: 'Classic maroon silk cotton saree with gold zari temple border. Perfect blend of tradition and comfort.',
    category: 'silk-cotton', type: 'Temple Border', image_url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&h=300&fit=crop',
    price: '₹4,200', original_price: '₹5,000', is_featured: false, display_order: 3,
  },
  {
    id: 'sc4', name: 'Teal Blue Silk Cotton', description: 'Beautiful teal blue silk cotton saree with contrast magenta border and matching pallu with zari motifs.',
    category: 'silk-cotton', type: 'Casual', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
    price: '₹3,200', original_price: '₹4,000', is_featured: false, display_order: 4,
  },
  {
    id: 'sc5', name: 'White Silk Cotton with Gold Border', description: 'Elegant white silk cotton saree with pure gold zari border. A must-have classic for temple visits and festivals.',
    category: 'silk-cotton', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    price: '₹3,800', original_price: '₹4,800', is_featured: true, display_order: 5,
  },

  // Wedding Collection (5 products)
  {
    id: 'wc1', name: 'Grand Bridal Red Kanjivaram', description: 'Magnificent bridal red Kanjivaram silk saree with heavy gold zari work, peacock and temple motifs. The ultimate bridal saree.',
    category: 'wedding-collection', type: 'Bridal', image_url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&h=300&fit=crop',
    price: '₹55,000', original_price: '₹65,000', is_featured: true, display_order: 1,
  },
  {
    id: 'wc2', name: 'Royal Maroon Wedding Silk', description: 'Opulent maroon Kanchipuram silk saree with heavy diamond and mango butta work in pure gold and silver zari.',
    category: 'wedding-collection', type: 'Bridal', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    price: '₹48,000', original_price: '₹58,000', is_featured: true, display_order: 2,
  },
  {
    id: 'wc3', name: 'Golden Tissue Bridal Saree', description: 'Stunning golden tissue Kanchipuram silk saree with heavy zari throughout. A showstopper for the reception.',
    category: 'wedding-collection', type: 'Reception', image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
    price: '₹42,000', original_price: '₹50,000', is_featured: true, display_order: 3,
  },
  {
    id: 'wc4', name: 'Pink Muhurtham Special Silk', description: 'Auspicious pink Kanchipuram silk saree specially designed for muhurtham ceremonies. Features traditional motifs and heavy gold zari.',
    category: 'wedding-collection', type: 'Muhurtham', image_url: 'https://images.unsplash.com/photo-1617627143233-d39e4ac3c482?w=400&h=300&fit=crop',
    price: '₹38,000', original_price: '₹45,000', is_featured: false, display_order: 4,
  },
  {
    id: 'wc5', name: 'Orange Nalangu Silk Saree', description: 'Vibrant orange Kanchipuram silk saree perfect for nalangu and haldi ceremonies. Rich zari border with festive motifs.',
    category: 'wedding-collection', type: 'Nalangu', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
    price: '₹28,000', original_price: '₹34,000', is_featured: false, display_order: 5,
  },

  // Korvai Collection (5 products)
  {
    id: 'kc1', name: 'Red & Green Korvai Silk', description: 'Classic red body Korvai silk saree with contrasting green pallu border. The signature 3-shuttle Korvai weaving technique creates a stunning border transition.',
    category: 'korvai-collection', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=400&h=300&fit=crop',
    price: '₹22,000', original_price: '₹26,000', is_featured: true, display_order: 1,
  },
  {
    id: 'kc2', name: 'Blue & Gold Korvai Border', description: 'Royal blue Korvai silk saree with heavy gold zari border and contrast red pallu. A masterpiece of traditional weaving artistry.',
    category: 'korvai-collection', type: 'Premium', image_url: 'https://images.unsplash.com/photo-1617627143233-d39e4ac3c482?w=400&h=300&fit=crop',
    price: '₹25,000', original_price: '₹30,000', is_featured: true, display_order: 2,
  },
  {
    id: 'kc3', name: 'Purple Korvai with Temple Border', description: 'Elegant purple Korvai silk saree with temple border motifs and contrast gold pallu. Traditional yet contemporary.',
    category: 'korvai-collection', type: 'Temple', image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
    price: '₹20,000', original_price: '₹24,000', is_featured: true, display_order: 3,
  },
  {
    id: 'kc4', name: 'Mustard Yellow Korvai Silk', description: 'Beautiful mustard yellow Korvai silk saree with contrast maroon border and peacock motifs in gold zari.',
    category: 'korvai-collection', type: 'Festival', image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
    price: '₹19,000', original_price: '₹23,000', is_featured: false, display_order: 4,
  },
  {
    id: 'kc5', name: 'Teal Korvai Special Weave', description: 'Unique teal Korvai silk saree with special double-border weaving technique and contrast copper zari. Limited edition design.',
    category: 'korvai-collection', type: 'Limited Edition', image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
    price: '₹27,000', original_price: '₹32,000', is_featured: false, display_order: 5,
  },
]
