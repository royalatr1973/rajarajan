import Link from 'next/link';
import { Cake, Cookie, Candy, CakeSlice, ArrowRight } from 'lucide-react';

const verticals = [
  {
    id: 1,
    name: 'Cakes',
    description: 'Handcrafted cakes for birthdays, weddings & every celebration',
    icon: Cake,
    color: 'bg-pink-100 text-pink-600',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
  },
  {
    id: 2,
    name: 'Biscuits',
    description: 'Freshly baked butter cookies, biscotti & traditional treats',
    icon: Cookie,
    color: 'bg-amber-100 text-amber-600',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80',
  },
  {
    id: 3,
    name: 'Chocolates',
    description: 'Premium handmade chocolates, truffles & gift boxes',
    icon: Candy,
    color: 'bg-purple-100 text-purple-600',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&q=80',
  },
  {
    id: 4,
    name: 'Brownies',
    description: 'Rich, fudgy brownies & blondies in many flavors',
    icon: CakeSlice,
    color: 'bg-yellow-100 text-yellow-700',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            From cakes to chocolates, explore our range of homemade treats made with love
          </p>
        </div>

        {/* Verticals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verticals.map((vertical) => {
            const Icon = vertical.icon;
            return (
              <Link
                key={vertical.id}
                href="/products"
                className="group bg-cream-light hover:bg-cream rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gold overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vertical.image}
                    alt={vertical.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/70 to-transparent" />
                  <div className={`absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 ${vertical.color} rounded-full shadow-lg`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cocoa-dark mb-2 flex items-center gap-2">
                    {vertical.name}
                    <ArrowRight size={18} className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-cocoa-medium text-sm">
                    {vertical.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
