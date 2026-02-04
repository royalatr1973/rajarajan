'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/products/ProductCard'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Product, ALL_CATEGORIES, CATEGORY_INFO, Category } from '@/lib/types'
import { defaultProducts } from '@/lib/defaults'

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      if (!isSupabaseConfigured()) {
        setProducts(defaultProducts)
        setLoading(false)
        return
      }
      try {
        const { data } = await supabase.from('products').select('*').order('display_order')
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(defaultProducts)
        }
      } catch {
        setProducts(defaultProducts)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-silk-dark via-silk-medium to-silk-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-cream mb-4">Our Collections</h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              Explore our complete range of handwoven silk sarees across five exquisite collections
            </p>
          </div>
        </section>

        <section className="py-12 bg-cream-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'bg-gold text-silk-dark shadow-md'
                    : 'bg-white text-silk-light hover:bg-gold-light'
                }`}
              >
                All ({products.length})
              </button>
              {ALL_CATEGORIES.map(cat => {
                const count = products.filter(p => p.category === cat).length
                return (
                  <button key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-xl font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-gold text-silk-dark shadow-md'
                        : 'bg-white text-silk-light hover:bg-gold-light'
                    }`}
                  >
                    {CATEGORY_INFO[cat].emoji} {CATEGORY_INFO[cat].label} ({count})
                  </button>
                )
              })}
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-silk-light mt-4">Loading collections...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-silk-light text-lg">No sarees found in this collection.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
