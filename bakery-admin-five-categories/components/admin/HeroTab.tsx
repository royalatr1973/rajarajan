'use client'

import { useState, useEffect } from 'react'
import { Save, Upload, Image, Type, Link as LinkIcon, BarChart3 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { HeroSection } from '@/lib/types'
import { defaultHeroSection } from '@/lib/defaults'

export default function HeroTab() {
  const [hero, setHero] = useState<HeroSection>(defaultHeroSection)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchHero()
  }, [])

  async function fetchHero() {
    if (!isSupabaseConfigured()) return
    try {
      const { data } = await supabase.from('hero_section').select('*').limit(1)
      if (data && data.length > 0) setHero(data[0])
    } catch {}
  }

  async function handleSave() {
    if (!isSupabaseConfigured()) {
      setMessage('Supabase not configured')
      return
    }
    setSaving(true)
    try {
      const { id, created_at, updated_at, ...updateData } = hero
      const { data: existing } = await supabase.from('hero_section').select('id').limit(1)
      if (existing && existing.length > 0) {
        await supabase.from('hero_section').update({ ...updateData, updated_at: new Date().toISOString() }).eq('id', existing[0].id)
      } else {
        await supabase.from('hero_section').insert(updateData)
      }
      setMessage('Hero section saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error saving hero section')
    }
    setSaving(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !isSupabaseConfigured()) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `hero/hero-${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('images').upload(path, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
      setHero({ ...hero, image_url: urlData.publicUrl })
      setMessage('Image uploaded! Remember to save.')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error uploading image. Make sure the "images" bucket exists.')
    }
    setUploading(false)
  }

  const update = (field: keyof HeroSection, value: string) => {
    setHero({ ...hero, [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cocoa-dark">Hero Section</h2>
        <button onClick={handleSave} disabled={saving}
          className="bg-gold text-cocoa-dark px-6 py-2 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2">
          <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Hero'}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Preview */}
      <div className="bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark rounded-2xl p-8 text-cream">
        <p className="text-xs text-gold mb-2 uppercase tracking-wider">Preview</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">{hero.title}</h3>
            <p className="text-cream/70 text-sm mb-4">{hero.subtitle}</p>
            <div className="flex gap-4 text-xs">
              <span className="bg-gold/20 px-3 py-1 rounded-full">{hero.stat1_value} {hero.stat1_label}</span>
              <span className="bg-gold/20 px-3 py-1 rounded-full">{hero.stat2_value} {hero.stat2_label}</span>
              <span className="bg-gold/20 px-3 py-1 rounded-full">{hero.stat3_value} {hero.stat3_label}</span>
            </div>
          </div>
          {hero.image_url && (
            <img src={hero.image_url} alt="Hero" className="w-32 h-32 rounded-full object-cover border-2 border-gold/30 mx-auto" />
          )}
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <Type className="h-5 w-5 text-gold" /> Content
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Title</label>
            <input type="text" value={hero.title}
              onChange={e => update('title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Subtitle</label>
            <textarea rows={3} value={hero.subtitle}
              onChange={e => update('subtitle', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none" />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <Image className="h-5 w-5 text-gold" /> Hero Image
        </h3>
        <div className="flex items-center gap-4">
          {hero.image_url && (
            <img src={hero.image_url} alt="Hero" className="w-20 h-20 rounded-xl object-cover border border-cream-dark" />
          )}
          <label className="cursor-pointer bg-cream hover:bg-cream-dark px-4 py-2 rounded-lg border border-cream-dark transition-colors flex items-center gap-2 text-sm">
            <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload Image'}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          <input type="text" value={hero.image_url} placeholder="Or enter image URL"
            onChange={e => update('image_url', e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm" />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-gold" /> Call to Action Buttons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Primary Button Text</label>
            <input type="text" value={hero.cta_primary_text}
              onChange={e => update('cta_primary_text', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Primary Button Link</label>
            <input type="text" value={hero.cta_primary_link}
              onChange={e => update('cta_primary_link', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Secondary Button Text</label>
            <input type="text" value={hero.cta_secondary_text}
              onChange={e => update('cta_secondary_text', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Secondary Button Link</label>
            <input type="text" value={hero.cta_secondary_link}
              onChange={e => update('cta_secondary_link', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gold" /> Stats Display
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { vKey: 'stat1_value' as const, lKey: 'stat1_label' as const, label: 'Stat 1' },
            { vKey: 'stat2_value' as const, lKey: 'stat2_label' as const, label: 'Stat 2' },
            { vKey: 'stat3_value' as const, lKey: 'stat3_label' as const, label: 'Stat 3' },
          ].map(stat => (
            <div key={stat.vKey} className="space-y-2">
              <p className="text-xs font-medium text-cocoa-light uppercase">{stat.label}</p>
              <input type="text" value={hero[stat.vKey]} placeholder="Value (e.g., 100%)"
                onChange={e => update(stat.vKey, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm" />
              <input type="text" value={hero[stat.lKey]} placeholder="Label (e.g., Homemade)"
                onChange={e => update(stat.lKey, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
