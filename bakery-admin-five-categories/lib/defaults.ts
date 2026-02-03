import { Product, SiteSettings, HeroSection, Testimonial } from './types'

export const defaultSiteSettings: SiteSettings = {
  id: 'default',
  business_name: 'Cake Cravings',
  tagline: 'Homemade with Love',
  logo_url: '',
  phone1: '+91 88384 24741',
  phone2: '+91 99413 56037',
  email: 'cake.cravings22@gmail.com',
  address: '14, Alagrisamy Street, Avadi',
  city: 'Chennai',
  whatsapp: '+91 88384 24741',
  instagram: 'https://instagram.com/cakecravings',
  youtube: 'https://youtube.com/@cakecravings',
  facebook: 'https://facebook.com/cakecravings',
  business_hours_weekday: 'Mon - Sat: 9:00 AM - 8:00 PM',
  business_hours_weekend: 'Sun: 10:00 AM - 6:00 PM',
  order_notice: 'Please order at least 2 days prior for custom cakes',
}

export const defaultHeroSection: HeroSection = {
  id: 'default',
  title: 'Homemade Cakes & Treats',
  subtitle: 'Delight in our freshly baked, homemade cakes, brownies, cupcakes, biscuits, and chocolates. Each treat is crafted with love using premium ingredients.',
  image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop',
  cta_primary_text: 'Order Now',
  cta_primary_link: '/contact',
  cta_secondary_text: 'View Menu',
  cta_secondary_link: '/products',
  stat1_value: '100%',
  stat1_label: 'Homemade',
  stat2_value: '2 Days',
  stat2_label: 'Prior Booking',
  stat3_value: 'Certified',
  stat3_label: 'Baker',
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Divya Krishnan',
    text: 'The chocolate truffle cake was absolutely divine! Best homemade cake I have ever had. Will definitely order again for every celebration.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Raj Patel',
    text: 'Ordered brownies and cupcakes for my daughter\'s birthday party. Everyone loved them! The red velvet cupcakes were a huge hit.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya Sharma',
    text: 'The biscuits and chocolates gift box I ordered was beautifully packaged and tasted amazing. Perfect for gifting!',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Arun Kumar',
    text: 'Cake Cravings never disappoints! From custom cakes to simple brownies, everything is made with such care and love. Highly recommended!',
    rating: 5,
  },
]

export const defaultProducts: Product[] = [
  // Cakes (6 products)
  {
    id: 'c1', name: 'Chocolate Truffle Cake', description: 'Rich and decadent chocolate truffle cake with layers of smooth chocolate ganache. A chocolate lover\'s dream come true.',
    category: 'cakes', type: 'Chocolate', image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    price: '₹750', is_featured: true, display_order: 1,
  },
  {
    id: 'c2', name: 'Red Velvet Cake', description: 'Classic red velvet cake with cream cheese frosting. Soft, moist, and perfectly balanced between chocolate and vanilla.',
    category: 'cakes', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=400&h=300&fit=crop',
    price: '₹800', is_featured: true, display_order: 2,
  },
  {
    id: 'c3', name: 'Black Forest Cake', description: 'Traditional black forest cake with layers of chocolate sponge, whipped cream, and cherries.',
    category: 'cakes', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop',
    price: '₹700', is_featured: true, display_order: 3,
  },
  {
    id: 'c4', name: 'Butterscotch Cake', description: 'Smooth butterscotch flavored cake topped with caramel drizzle and crunchy butterscotch chips.',
    category: 'cakes', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop',
    price: '₹650', is_featured: false, display_order: 4,
  },
  {
    id: 'c5', name: 'Mango Cake', description: 'Fresh and fruity mango cake made with real Alphonso mango pulp and light sponge layers.',
    category: 'cakes', type: 'Fruit', image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    price: '₹700', is_featured: false, display_order: 5,
  },
  {
    id: 'c6', name: 'Pineapple Cake', description: 'Light and refreshing pineapple cake with whipped cream frosting and pineapple chunks.',
    category: 'cakes', type: 'Fruit', image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    price: '₹600', is_featured: true, display_order: 6,
  },

  // Brownies (4 products)
  {
    id: 'br1', name: 'Classic Fudge Brownies', description: 'Dense, fudgy brownies with a crackly top and intensely chocolatey center. Our bestseller!',
    category: 'brownies', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    price: '₹400', is_featured: true, display_order: 1,
  },
  {
    id: 'br2', name: 'Walnut Brownies', description: 'Our classic fudge brownies loaded with crunchy California walnuts for the perfect texture contrast.',
    category: 'brownies', type: 'Nut', image_url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop',
    price: '₹450', is_featured: true, display_order: 2,
  },
  {
    id: 'br3', name: 'Cream Cheese Brownies', description: 'Marbled cream cheese and chocolate brownie that\'s rich, tangy, and absolutely irresistible.',
    category: 'brownies', type: 'Specialty', image_url: 'https://images.unsplash.com/photo-1612886831560-7071ef948a9b?w=400&h=300&fit=crop',
    price: '₹500', is_featured: false, display_order: 3,
  },
  {
    id: 'br4', name: 'Red Velvet Brownies', description: 'A twist on the classic - red velvet brownies with a cream cheese swirl on top.',
    category: 'brownies', type: 'Specialty', image_url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop',
    price: '₹480', is_featured: false, display_order: 4,
  },

  // Cup Cakes (4 products)
  {
    id: 'cc1', name: 'Vanilla Cupcakes', description: 'Light and fluffy vanilla cupcakes topped with swirls of buttercream frosting and sprinkles.',
    category: 'cup-cakes', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop',
    price: '₹120', is_featured: true, display_order: 1,
  },
  {
    id: 'cc2', name: 'Chocolate Cupcakes', description: 'Moist chocolate cupcakes with rich chocolate ganache frosting. Pure chocolate indulgence in every bite.',
    category: 'cup-cakes', type: 'Chocolate', image_url: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop',
    price: '₹130', is_featured: true, display_order: 2,
  },
  {
    id: 'cc3', name: 'Red Velvet Cupcakes', description: 'Beautiful red velvet cupcakes with cream cheese frosting. Perfect for parties and celebrations.',
    category: 'cup-cakes', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
    price: '₹140', is_featured: true, display_order: 3,
  },
  {
    id: 'cc4', name: 'Blueberry Cupcakes', description: 'Fresh blueberry cupcakes with lemon cream cheese frosting. A burst of fruity freshness!',
    category: 'cup-cakes', type: 'Fruit', image_url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop',
    price: '₹150', is_featured: false, display_order: 4,
  },

  // Biscuits (4 products)
  {
    id: 'b1', name: 'Chocolate Chip Cookies', description: 'Crispy on the outside, chewy on the inside. Loaded with premium chocolate chips.',
    category: 'biscuits', type: 'Chocolate', image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
    price: '₹250', is_featured: true, display_order: 1,
  },
  {
    id: 'b2', name: 'Butter Cookies', description: 'Melt-in-your-mouth butter cookies made with premium butter. Classic tea-time treat.',
    category: 'biscuits', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    price: '₹200', is_featured: true, display_order: 2,
  },
  {
    id: 'b3', name: 'Oatmeal Cookies', description: 'Healthy and wholesome oatmeal cookies with a hint of cinnamon and raisins.',
    category: 'biscuits', type: 'Healthy', image_url: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop',
    price: '₹220', is_featured: false, display_order: 3,
  },
  {
    id: 'b4', name: 'Almond Biscotti', description: 'Crunchy Italian-style almond biscotti, perfect for dipping in coffee or tea.',
    category: 'biscuits', type: 'Classic', image_url: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400&h=300&fit=crop',
    price: '₹280', is_featured: false, display_order: 4,
  },

  // Chocolates (4 products)
  {
    id: 'ch1', name: 'Dark Chocolate Truffles', description: 'Handcrafted dark chocolate truffles with a velvety smooth ganache center. Box of 12.',
    category: 'chocolates', type: 'Dark', image_url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop',
    price: '₹500', is_featured: true, display_order: 1,
  },
  {
    id: 'ch2', name: 'Milk Chocolate Box', description: 'Assorted milk chocolates in a beautiful gift box. 18 pieces of creamy, smooth chocolate.',
    category: 'chocolates', type: 'Milk', image_url: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=400&h=300&fit=crop',
    price: '₹600', is_featured: true, display_order: 2,
  },
  {
    id: 'ch3', name: 'Chocolate Bark', description: 'Artisan chocolate bark with dried fruits, nuts, and sea salt flakes. A delightful treat.',
    category: 'chocolates', type: 'Specialty', image_url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=300&fit=crop',
    price: '₹350', is_featured: false, display_order: 3,
  },
  {
    id: 'ch4', name: 'Hazelnut Pralines', description: 'Luxurious hazelnut pralines coated in smooth Belgian chocolate. Box of 15.',
    category: 'chocolates', type: 'Specialty', image_url: 'https://images.unsplash.com/photo-1551529834-525807d6b4f3?w=400&h=300&fit=crop',
    price: '₹550', is_featured: false, display_order: 4,
  },
]
