import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/supabase';
import { categoryInfo } from '@/lib/all-products';

export default async function BrowniesPage() {
  const products = await getProducts('brownies');
  const info = categoryInfo.brownies;

  return (
    <div className="min-h-screen bg-cream-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{info.icon}</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
            {info.title}
          </h1>
          <p className="text-lg text-cocoa-medium max-w-2xl mx-auto mb-6">
            {info.description}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-light text-cocoa-dark font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <span>Contact us to place your order</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold/20 hover:border-gold/50"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-cream">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.is_featured && (
                  <div className="absolute top-3 left-3 bg-gold text-cocoa-dark px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                    <span>⭐</span>
                    <span>Featured</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-cocoa-dark text-gold px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {product.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-cocoa-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-cocoa-medium line-clamp-3">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
