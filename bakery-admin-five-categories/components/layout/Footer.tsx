'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Facebook, MessageCircle, Cake } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SiteSettings, ALL_CATEGORIES, CATEGORY_INFO } from '@/lib/types'
import { defaultSiteSettings } from '@/lib/defaults'

export default function Footer() {
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
    <footer className="bg-gradient-to-b from-cocoa-dark via-cocoa-dark to-black text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt={settings.business_name} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="bg-gold rounded-full p-2">
                  <Cake className="h-5 w-5 text-cocoa-dark" />
                </div>
              )}
              <span className="text-xl font-bold">{settings.business_name}</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">{settings.tagline}. Freshly baked treats made with premium ingredients for every occasion.</p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {settings.whatsapp && (
                <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="bg-cocoa-medium hover:bg-gold text-cream hover:text-cocoa-dark p-2 rounded-lg transition-all duration-200">
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                  className="bg-cocoa-medium hover:bg-gold text-cream hover:text-cocoa-dark p-2 rounded-lg transition-all duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer"
                  className="bg-cocoa-medium hover:bg-gold text-cream hover:text-cocoa-dark p-2 rounded-lg transition-all duration-200">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer"
                  className="bg-cocoa-medium hover:bg-gold text-cream hover:text-cocoa-dark p-2 rounded-lg transition-all duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-cream/70 hover:text-gold transition-colors text-sm">Home</Link></li>
              <li><Link href="/products" className="text-cream/70 hover:text-gold transition-colors text-sm">All Products</Link></li>
              <li><Link href="/about" className="text-cream/70 hover:text-gold transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-cream/70 hover:text-gold transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Our Products</h3>
            <ul className="space-y-2">
              {ALL_CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link href={`/products/${cat}`} className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {CATEGORY_INFO[cat].emoji} {CATEGORY_INFO[cat].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-cream/70">
                <Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span>{settings.phone1}{settings.phone2 && ` / ${settings.phone2}`}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-cream/70">
                <Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span>{settings.email}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-cream/70">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span>{settings.address}, {settings.city}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-cream/70">
                <Clock className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <div>
                  <p>{settings.business_hours_weekday}</p>
                  <p>{settings.business_hours_weekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cocoa-medium mt-8 pt-6 text-center text-cream/50 text-sm">
          <p>&copy; {new Date().getFullYear()} {settings.business_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
