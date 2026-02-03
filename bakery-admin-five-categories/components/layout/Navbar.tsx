'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Cake } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SiteSettings, ALL_CATEGORIES, CATEGORY_INFO } from '@/lib/types'
import { defaultSiteSettings } from '@/lib/defaults'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cocoa-dark/95 backdrop-blur-md shadow-lg' : 'bg-cocoa-dark'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt={settings.business_name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="bg-gold rounded-full p-2">
                <Cake className="h-5 w-5 text-cocoa-dark" />
              </div>
            )}
            <span className="text-cream text-xl font-bold">{settings.business_name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-cream hover:text-gold transition-colors duration-200">Home</Link>

            {/* Products Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="text-cream hover:text-gold transition-colors duration-200 flex items-center gap-1">
                Products <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl py-2 min-w-[200px] border border-cream-dark">
                  <Link href="/products" className="block px-4 py-2 text-cocoa-dark hover:bg-gold-light transition-colors">
                    All Products
                  </Link>
                  <div className="border-t border-cream-dark my-1" />
                  {ALL_CATEGORIES.map(cat => (
                    <Link key={cat} href={`/products/${cat}`}
                      className="block px-4 py-2 text-cocoa-dark hover:bg-gold-light transition-colors">
                      {CATEGORY_INFO[cat].emoji} {CATEGORY_INFO[cat].label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="text-cream hover:text-gold transition-colors duration-200">About</Link>
            <Link href="/contact" className="text-cream hover:text-gold transition-colors duration-200">Contact</Link>
            <Link href="/admin" className="bg-gold text-cocoa-dark px-4 py-2 rounded-lg font-semibold hover:bg-gold-light transition-colors duration-200">
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-cream" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-cocoa-dark border-t border-cocoa-medium">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="block text-cream hover:text-gold py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/products" className="block text-cream hover:text-gold py-2" onClick={() => setIsOpen(false)}>All Products</Link>
            {ALL_CATEGORIES.map(cat => (
              <Link key={cat} href={`/products/${cat}`}
                className="block text-cream/80 hover:text-gold py-1 pl-4 text-sm"
                onClick={() => setIsOpen(false)}>
                {CATEGORY_INFO[cat].emoji} {CATEGORY_INFO[cat].label}
              </Link>
            ))}
            <Link href="/about" className="block text-cream hover:text-gold py-2" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="block text-cream hover:text-gold py-2" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/admin" className="block bg-gold text-cocoa-dark px-4 py-2 rounded-lg font-semibold text-center mt-2" onClick={() => setIsOpen(false)}>Admin</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
