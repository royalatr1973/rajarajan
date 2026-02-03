'use client'

import Link from 'next/link'
import { ALL_CATEGORIES, CATEGORY_INFO } from '@/lib/types'

export default function Categories() {
  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-cocoa-dark mb-4">Our Specialties</h2>
          <p className="text-cocoa-medium text-lg max-w-2xl mx-auto">
            Explore our five categories of freshly baked, homemade treats
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {ALL_CATEGORIES.map((cat) => {
            const info = CATEGORY_INFO[cat]
            return (
              <Link key={cat} href={`/products/${cat}`}
                className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-gold">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {info.emoji}
                </div>
                <h3 className="text-cocoa-dark font-semibold text-lg mb-2">{info.label}</h3>
                <p className="text-cocoa-light text-sm leading-relaxed">{info.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
