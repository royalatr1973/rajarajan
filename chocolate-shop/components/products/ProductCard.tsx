'use client';

import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Dark':
        return 'bg-cocoa-dark text-cream-light';
      case 'Milk':
        return 'bg-gold-light text-cocoa-dark';
      case 'Vegan':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleQuickAdd = () => {
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold/20 hover:border-gold/50">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-gold text-cocoa-dark px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Star size={12} className="fill-cocoa-dark" />
            <span>Best Seller</span>
          </div>
        )}
        <div className={`absolute top-3 right-3 ${getTypeColor(product.type)} px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
          {product.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-cocoa-dark mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-cocoa-medium mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gold">
            ${product.price.toFixed(2)}
          </div>
          <button
            onClick={handleQuickAdd}
            className="group/btn flex items-center space-x-2 bg-cocoa-dark hover:bg-cocoa-medium text-gold font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
            <span className="text-sm">Quick Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
