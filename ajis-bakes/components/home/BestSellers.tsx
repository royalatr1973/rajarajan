'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { useProducts } from '@/lib/ProductsContext';
import { products as fallbackProducts } from '@/lib/data/products';

export default function BestSellers() {
  const { products: contextProducts } = useProducts();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use context products on client, fallback to initial products on server
  const products = isClient ? contextProducts : fallbackProducts;
  const bestSellers = products.filter((product: any) => product.isBestSeller);

  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Popular Cake Varieties
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            Discover our most loved cakes, handcrafted with passion and the finest ingredients
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {bestSellers.map((product: any) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>View Full Menu</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
