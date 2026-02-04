'use client'

import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Testimonial } from '@/lib/types'
import { defaultTestimonials } from '@/lib/defaults'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)

  useEffect(() => {
    async function fetchTestimonials() {
      if (!isSupabaseConfigured()) return
      try {
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        if (data && data.length > 0) setTestimonials(data)
      } catch {}
    }
    fetchTestimonials()
  }, [])

  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-silk-dark mb-4">What Our Customers Say</h2>
          <p className="text-silk-light text-lg max-w-2xl mx-auto">
            Hear from our happy customers across India and worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-gold/20" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-silk-light text-sm leading-relaxed mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="border-t border-cream-dark pt-3">
                <p className="text-silk-dark font-semibold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
