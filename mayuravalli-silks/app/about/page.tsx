'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Award, Heart, Gem, Shield } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SiteSettings } from '@/lib/types'
import { defaultSiteSettings } from '@/lib/defaults'

const values = [
  { icon: Heart, title: 'Passion for Silk', description: 'Every saree we curate is chosen with deep love for the art of silk weaving. We believe in preserving and promoting the rich heritage of Kanchipuram silk.' },
  { icon: Award, title: '20+ Years Legacy', description: 'Our family has been in the silk business for over two decades, building trust and relationships with master weavers and customers alike.' },
  { icon: Gem, title: 'Pure & Authentic', description: 'We guarantee the purity and authenticity of every silk saree. Each piece is sourced directly from trusted weavers in Kanchipuram.' },
  { icon: Shield, title: 'Customer Trust', description: 'With thousands of happy customers across India and worldwide, we take pride in our commitment to quality, transparency, and customer satisfaction.' },
]

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    async function fetchSettings() {
      if (!isSupabaseConfigured()) return
      try {
        const { data } = await supabase.from('site_settings').select('*').limit(1)
        if (data && data.length > 0) setSettings(data[0])
      } catch {}
    }
    fetchSettings()
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-silk-dark via-silk-medium to-silk-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-cream mb-4">About {settings.business_name}</h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">{settings.tagline}</p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-cream-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-silk-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-silk-light leading-relaxed">
                <p>
                  {settings.business_name} is a handcrafted online ethnic wear destination that brings you the world&apos;s
                  finest curated collections of traditional pure Kanchipuram silk sarees. What started as a family passion
                  for silk weaving has grown into a trusted name in the silk saree industry over 20 years.
                </p>
                <p>
                  Based in the silk city of {settings.city}, we source our sarees directly from master weavers, ensuring
                  every piece maintains the highest standards of craftsmanship, purity, and beauty. Our mission is to provide
                  easy access to exquisite and traditional silk sarees, direct from the loom to your wardrobe.
                </p>
                <p>
                  Today, we proudly serve customers across India and internationally, bringing the timeless elegance of
                  Kanchipuram silk to doorsteps worldwide. Our collections span five categories: Kanchipuram Silk, Soft Silk,
                  Silk Cotton, Wedding Collection, and our signature Korvai Collection.
                </p>
                <p>
                  At {settings.business_name}, we believe that every woman deserves to drape herself in the finest silk.
                  Our team has kept pace with modern times while remaining true to traditional values, creating an ideal mix
                  of form, function, and festivals that reflects the richness of the Indian wardrobe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-silk-dark text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-cream-light rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="text-silk-dark font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-silk-light text-sm leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-silk-dark mb-4">Ready to Explore Our Collections?</h2>
            <p className="text-silk-dark/80 text-lg mb-8">{settings.order_notice}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/products" className="inline-block bg-silk-dark text-cream px-8 py-3 rounded-xl font-semibold hover:bg-silk-medium transition-colors">
                Browse Collections
              </a>
              <a href="/contact" className="inline-block bg-white text-silk-dark px-8 py-3 rounded-xl font-semibold hover:bg-cream transition-colors">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
