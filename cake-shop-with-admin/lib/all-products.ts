export type Product = {
  id: string;
  name: string;
  description: string;
  category: 'cakes' | 'biscuits' | 'chocolates' | 'brownies';
  type: string;
  image: string;
  isFeatured: boolean;
};

export const allProducts = {
  cakes: [
    { id: 'c1', name: 'Chocolate Truffle Cake', description: 'Rich chocolate layers with smooth truffle cream frosting', category: 'cakes' as const, type: 'Chocolate', image: '/images/chocolate.jpg', isFeatured: true },
    { id: 'c2', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting', category: 'cakes' as const, type: 'Theme', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80', isFeatured: true },
    { id: 'c3', name: 'Black Forest Cake', description: 'Chocolate cake with cherry filling and whipped cream', category: 'cakes' as const, type: 'Chocolate', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', isFeatured: true },
    { id: 'c4', name: 'Butterscotch Cake', description: 'Classic butterscotch flavor with crunchy caramel bits', category: 'cakes' as const, type: 'Classic', image: '/images/butterscotch.jpg', isFeatured: true },
    { id: 'c5', name: 'Mango Delight Cake', description: 'Fresh mango puree with vanilla sponge', category: 'cakes' as const, type: 'Fruit', image: '/images/mango.jpg', isFeatured: false },
    { id: 'c6', name: 'Grape Delight Cake', description: 'Fresh grape puree with vanilla sponge', category: 'cakes' as const, type: 'Fruit', image: '/images/grape.jpg', isFeatured: false },
  ],
  biscuits: [
    { id: 'b1', name: 'Chocolate Chip Cookies', description: 'Classic cookies loaded with chocolate chips', category: 'biscuits' as const, type: 'Chocolate', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80', isFeatured: true },
    { id: 'b2', name: 'Butter Cookies', description: 'Melt-in-mouth buttery cookies', category: 'biscuits' as const, type: 'Classic', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', isFeatured: true },
    { id: 'b3', name: 'Oatmeal Cookies', description: 'Healthy oats cookies with raisins', category: 'biscuits' as const, type: 'Healthy', image: 'https://images.unsplash.com/photo-1590080876876-5674a3e5e26f?w=800&q=80', isFeatured: false },
  ],
  chocolates: [
    { id: 'ch1', name: 'Dark Chocolate Truffles', description: 'Premium dark chocolate truffles with cocoa dusting', category: 'chocolates' as const, type: 'Dark', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80', isFeatured: true },
    { id: 'ch2', name: 'Milk Chocolate Box', description: 'Assorted milk chocolates in a gift box', category: 'chocolates' as const, type: 'Milk', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80', isFeatured: true },
    { id: 'ch3', name: 'Chocolate Bark', description: 'Handcrafted chocolate bark with nuts', category: 'chocolates' as const, type: 'Specialty', image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80', isFeatured: false },
  ],
  brownies: [
    { id: 'br1', name: 'Classic Fudge Brownies', description: 'Dense, fudgy brownies with intense chocolate flavor', category: 'brownies' as const, type: 'Classic', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', isFeatured: true },
    { id: 'br2', name: 'Walnut Brownies', description: 'Chewy brownies loaded with crunchy walnuts', category: 'brownies' as const, type: 'Nut', image: 'https://images.unsplash.com/photo-1564355808853-07d7e1278c76?w=800&q=80', isFeatured: true },
    { id: 'br3', name: 'Cream Cheese Brownies', description: 'Swirled brownies with tangy cream cheese', category: 'brownies' as const, type: 'Specialty', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80', isFeatured: false },
  ],
};

export const categoryInfo = {
  cakes: { title: 'Cakes', icon: '🎂', description: 'Homemade cakes for every celebration' },
  biscuits: { title: 'Biscuits & Cookies', icon: '🍪', description: 'Crispy, buttery biscuits and cookies' },
  chocolates: { title: 'Chocolates', icon: '🍫', description: 'Premium handcrafted chocolates' },
  brownies: { title: 'Brownies', icon: '🧁', description: 'Fudgy, delicious brownies' },
};
