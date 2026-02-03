import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/data-service';
import ProductCard from '../products/ProductCard';

export default async function BestSellers() {
  const products = await getProducts();
  const bestSellers = products.filter((product: any) => product.isBestSeller);

  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            Popular Cake Varieties
          </h2>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto">
            Discover our most loved cakes, handcrafted with passion and the finest ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {bestSellers.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

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
