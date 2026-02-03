'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SiteSettings } from '@/lib/types'
import { defaultSiteSettings } from '@/lib/defaults'

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    if (!isSupabaseConfigured()) {
      alert('Thank you for your message! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', message: '' })
      setStatus('sent')
      return
    }

    try {
      const { error } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      })
      if (error) throw error
      setForm({ name: '', email: '', phone: '', message: '' })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-cream mb-4">Contact Us</h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              We&apos;d love to hear from you! Get in touch for orders, inquiries, or just to say hello.
            </p>
          </div>
        </section>

        <section className="py-16 bg-cream-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-cocoa-dark mb-6">Send us a Message</h2>

                {status === 'sent' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-6 flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-cocoa-dark font-medium mb-1 text-sm">Name *</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream-light" />
                  </div>
                  <div>
                    <label className="block text-cocoa-dark font-medium mb-1 text-sm">Email *</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream-light" />
                  </div>
                  <div>
                    <label className="block text-cocoa-dark font-medium mb-1 text-sm">Phone</label>
                    <input type="tel" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream-light" />
                  </div>
                  <div>
                    <label className="block text-cocoa-dark font-medium mb-1 text-sm">Message *</label>
                    <textarea required rows={5} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream-light resize-none" />
                  </div>
                  <button type="submit" disabled={status === 'sending'}
                    className="w-full bg-gold text-cocoa-dark py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {status === 'sending' ? 'Sending...' : 'Send Message'} <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <Phone className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-cocoa-dark font-semibold text-lg">Phone / WhatsApp</h3>
                      <p className="text-cocoa-medium mt-1">{settings.phone1}</p>
                      {settings.phone2 && <p className="text-cocoa-medium">{settings.phone2}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-cocoa-dark font-semibold text-lg">Email</h3>
                      <p className="text-cocoa-medium mt-1">{settings.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-cocoa-dark font-semibold text-lg">Location</h3>
                      <p className="text-cocoa-medium mt-1">{settings.address}</p>
                      <p className="text-cocoa-medium">{settings.city}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-cocoa-dark font-semibold text-lg">Business Hours</h3>
                      <p className="text-cocoa-medium mt-1">{settings.business_hours_weekday}</p>
                      <p className="text-cocoa-medium">{settings.business_hours_weekend}</p>
                    </div>
                  </div>
                </div>

                {/* Custom Orders CTA */}
                <div className="bg-gradient-to-r from-cocoa-dark to-cocoa-medium rounded-2xl p-6 text-center">
                  <MessageCircle className="h-10 w-10 text-gold mx-auto mb-3" />
                  <h3 className="text-cream font-semibold text-lg mb-2">Custom Orders</h3>
                  <p className="text-cream/70 text-sm mb-4">{settings.order_notice}</p>
                  {settings.whatsapp && (
                    <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="inline-block bg-gold text-cocoa-dark px-6 py-2 rounded-xl font-semibold hover:bg-gold-light transition-colors text-sm">
                      WhatsApp Us
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
