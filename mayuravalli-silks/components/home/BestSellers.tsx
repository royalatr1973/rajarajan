'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Product, CATEGORY_INFO, Category } from '@/lib/types'
import { defaultProducts } from '@/lib/defaults'

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchFeatured() {
      if (!isSupabaseConfigured()) {
        setProducts(defaultProducts.filter(p => p.is_featured).slice(0, 8))
        return
      }
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .order('display_order')
          .limit(8)
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(defaultProducts.filter(p => p.is_featured).slice(0, 8))
        }
      } catch {
        setProducts(defaultProducts.filter(p => p.is_featured).slice(0, 8))
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-silk-dark mb-4">Featured Sarees</h2>
          <p className="text-silk-light text-lg max-w-2xl mx-auto">
            Our most loved sarees, handpicked for their exquisite craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-cream-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gold text-silk-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> Featured
                </div>
                <div className="absolute top-3 right-3 bg-silk-dark/80 text-cream px-2 py-1 rounded-full text-xs">
                  {CATEGORY_INFO[product.category as Category]?.label}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-silk-dark font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-silk-light text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold text-lg">{product.price}</span>
                    {product.original_price && product.original_price !== product.price && (
                      <span className="text-silk-light/60 text-sm line-through">{product.original_price}</span>
                    )}
                  </div>
                  <span className="text-xs text-silk-light bg-cream-dark px-2 py-1 rounded-full">{product.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="inline-flex items-center gap-2 bg-silk-dark text-cream px-8 py-3 rounded-xl font-semibold hover:bg-silk-medium transition-colors duration-200">
            View All Collections <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
