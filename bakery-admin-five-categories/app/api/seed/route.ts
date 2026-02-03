import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { defaultProducts, defaultSiteSettings, defaultHeroSection, defaultTestimonials } from '@/lib/defaults'

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 400 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const results: Record<string, string> = {}

  try {
    // Seed site settings
    const { data: existingSettings } = await supabase.from('site_settings').select('id').single()
    if (!existingSettings) {
      const { id, ...settingsData } = defaultSiteSettings
      void id
      const { error } = await supabase.from('site_settings').insert(settingsData)
      results.site_settings = error ? `Error: ${error.message}` : 'Seeded'
    } else {
      results.site_settings = 'Already exists'
    }

    // Seed hero section
    const { data: existingHero } = await supabase.from('hero_section').select('id').single()
    if (!existingHero) {
      const { id, ...heroData } = defaultHeroSection
      void id
      const { error } = await supabase.from('hero_section').insert(heroData)
      results.hero_section = error ? `Error: ${error.message}` : 'Seeded'
    } else {
      results.hero_section = 'Already exists'
    }

    // Seed products
    const { data: existingProducts } = await supabase.from('products').select('id').limit(1)
    if (!existingProducts || existingProducts.length === 0) {
      const productsToInsert = defaultProducts.map(({ id, ...rest }) => {
        void id
        return rest
      })
      const { error } = await supabase.from('products').insert(productsToInsert)
      results.products = error ? `Error: ${error.message}` : `Seeded ${defaultProducts.length} products`
    } else {
      results.products = 'Already exists'
    }

    // Seed testimonials
    const { data: existingTestimonials } = await supabase.from('testimonials').select('id').limit(1)
    if (!existingTestimonials || existingTestimonials.length === 0) {
      const testimonialsToInsert = defaultTestimonials.map(({ id, ...rest }) => {
        void id
        return rest
      })
      const { error } = await supabase.from('testimonials').insert(testimonialsToInsert)
      results.testimonials = error ? `Error: ${error.message}` : `Seeded ${defaultTestimonials.length} testimonials`
    } else {
      results.testimonials = 'Already exists'
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 })
  }
}
