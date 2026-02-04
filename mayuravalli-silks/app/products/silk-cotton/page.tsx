'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/products/ProductCard'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Product } from '@/lib/types'
import { defaultProducts } from '@/lib/defaults'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SilkCottonPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      if (!isSupabaseConfigured()) {
        setProducts(defaultProducts.filter(p => p.category === 'silk-cotton'))
        setLoading(false)
        return
      }
      try {
        const { data } = await supabase.from('products').select('*').eq('category', 'silk-cotton').order('display_order')
        if (data && data.length > 0) setProducts(data)
        else setProducts(defaultProducts.filter(p => p.category === 'silk-cotton'))
      } catch {
        setProducts(defaultProducts.filter(p => p.category === 'silk-cotton'))
      }
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-silk-dark via-silk-medium to-silk-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-6xl mb-4">🌿</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-cream mb-4">Silk Cotton Sarees</h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              Comfortable silk cotton blend sarees perfect for all seasons and occasions
            </p>
          </div>
        </section>

        <section className="py-12 bg-cream-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-silk-light hover:text-gold mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to All Collections
            </Link>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
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
