'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Award, Heart, Leaf, Palette } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SiteSettings } from '@/lib/types'
import { defaultSiteSettings } from '@/lib/defaults'

const values = [
  { icon: Heart, title: 'Made with Love', description: 'Every product we create is infused with passion and dedication. We treat each order as if it were for our own family.' },
  { icon: Award, title: 'Certified Baker', description: 'Our head baker is professionally trained and certified, bringing expertise and creativity to every creation.' },
  { icon: Leaf, title: 'Fresh & Custom', description: 'Nothing is pre-made. Every order is freshly baked and can be customized to your exact preferences.' },
  { icon: Palette, title: 'Home Based', description: 'Operating from our home kitchen means personal attention to every detail and the warmth of homemade goodness.' },
]

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    async function fetchSettings() {
      if (!isSupabaseConfigured()) return
      try {
        const { data } = await supabase.from('site_settings').select('*').single()
        if (data) setSettings(data)
      } catch {}
    }
    fetchSettings()
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-cream mb-4">About {settings.business_name}</h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">{settings.tagline}</p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-cream-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg">
              <h2 className="text-3xl font-bold text-cocoa-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-cocoa-medium leading-relaxed">
                <p>
                  {settings.business_name} started as a simple passion for baking in a home kitchen. What began with making
                  cakes for family and friends quickly grew into a beloved local bakery known for its homemade quality
                  and attention to detail.
                </p>
                <p>
                  Today, we offer five categories of treats: Cakes, Brownies, Cup Cakes, Biscuits, and Chocolates.
                  Each product is handcrafted using premium ingredients, ensuring that every bite is a moment of pure joy.
                </p>
                <p>
                  Based in {settings.city}, we take pride in being a home-based bakery where every order gets personal
                  attention. From birthday cakes to festive chocolate boxes, we make every celebration sweeter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-cocoa-dark text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-cream-light rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="text-cocoa-dark font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-cocoa-light text-sm leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-gold to-gold-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-cocoa-dark mb-4">Ready to Order?</h2>
            <p className="text-cocoa-dark/80 text-lg mb-8">{settings.order_notice}</p>
            <a href="/contact" className="inline-block bg-cocoa-dark text-cream px-8 py-3 rounded-xl font-semibold hover:bg-cocoa-medium transition-colors">
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
