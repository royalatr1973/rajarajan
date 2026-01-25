import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { urlFor } from '@/lib/sanity';

interface ProductCardProps {
  product: any; // Using any to handle both old Product type and Sanity data
}

export default function ProductCard({ product }: ProductCardProps) {
  // Handle both URL string (old) and Sanity image object (new)
  const imageUrl = typeof product.image === 'string'
    ? product.image
    : urlFor(product.image).width(800).url();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Chocolate':
        return 'bg-cocoa-dark text-cream-light';
      case 'Classic':
        return 'bg-gold-light text-cocoa-dark';
      case 'Theme':
        return 'bg-pink-100 text-pink-800';
      case 'Fruit':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold/20 hover:border-gold/50">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-cream">
        <Image
          src={imageUrl}
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
        <h3 className="text-lg font-bold text-cocoa-dark mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-cocoa-medium line-clamp-3">
          {product.description}
        </p>
      </div>
    </div>
  );
}
