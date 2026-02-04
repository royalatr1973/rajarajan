'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { HeroSection } from '@/lib/types'
import { defaultHeroSection } from '@/lib/defaults'

export default function Hero() {
  const [hero, setHero] = useState<HeroSection>(defaultHeroSection)

  useEffect(() => {
    async function fetchHero() {
      if (!isSupabaseConfigured()) return
      try {
        const { data } = await supabase.from('hero_section').select('*').limit(1)
        if (data && data.length > 0) setHero(data[0])
      } catch {}
    }
    fetchHero()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-silk-dark via-silk-medium to-silk-dark overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-gold/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gold/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(201,168,76,0.3) 35px, rgba(201,168,76,0.3) 36px)`
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <div className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6 tracking-wider">
              Since 2004 &mdash; 20+ Years of Tradition
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
              {hero.title}
            </h1>
            <p className="text-cream/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href={hero.cta_primary_link}
                className="bg-gold text-silk-dark px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gold-light transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                {hero.cta_primary_text} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href={hero.cta_secondary_link}
                className="border-2 border-gold text-gold px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gold hover:text-silk-dark transition-all duration-300 flex items-center gap-2">
                {hero.cta_secondary_text} <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: hero.stat1_value, label: hero.stat1_label },
                { value: hero.stat2_value, label: hero.stat2_label },
                { value: hero.stat3_value, label: hero.stat3_label },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-gold text-2xl font-bold">{stat.value}</p>
                  <p className="text-cream/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl transform scale-110" />
              <div className="relative w-[500px] h-[500px] rounded-full border-4 border-gold/30 shadow-2xl overflow-hidden">
                <img
                  src={hero.image_url}
                  alt={hero.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-silk-dark/30 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-silk-dark px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                Worldwide Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
