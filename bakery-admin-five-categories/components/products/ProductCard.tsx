import { Star } from 'lucide-react'
import { Product, CATEGORY_INFO, Category } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-gold text-cocoa-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" /> Featured
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-cocoa-dark/80 text-cream px-2 py-1 rounded-full text-xs">
          {product.type}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-cocoa-dark font-semibold text-lg">{product.name}</h3>
        </div>
        <p className="text-cocoa-light text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gold font-bold text-lg">{product.price}</span>
          <span className="text-xs text-cocoa-medium bg-cream px-3 py-1 rounded-full">
            {CATEGORY_INFO[product.category as Category]?.label}
          </span>
        </div>
      </div>
    </div>
  )
}
