'use client'

import { useState, useEffect } from 'react'
import { Save, Upload, Globe, Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Youtube, Facebook } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SiteSettings } from '@/lib/types'
import { defaultSiteSettings } from '@/lib/defaults'

export default function SiteSettingsTab() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    if (!isSupabaseConfigured()) return
    try {
      const { data } = await supabase.from('site_settings').select('*').limit(1)
      if (data && data.length > 0) setSettings(data[0])
    } catch {}
  }

  async function handleSave() {
    if (!isSupabaseConfigured()) {
      setMessage('Supabase not configured')
      return
    }
    setSaving(true)
    try {
      const { id, created_at, updated_at, ...updateData } = settings
      const { data: existing } = await supabase.from('site_settings').select('id').limit(1)
      if (existing && existing.length > 0) {
        await supabase.from('site_settings').update({ ...updateData, updated_at: new Date().toISOString() }).eq('id', existing[0].id)
      } else {
        await supabase.from('site_settings').insert(updateData)
      }
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error saving settings')
    }
    setSaving(false)
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !isSupabaseConfigured()) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `logos/logo-${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('images').upload(path, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
      setSettings({ ...settings, logo_url: urlData.publicUrl })
      setMessage('Logo uploaded! Remember to save.')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error uploading logo. Make sure the "images" bucket exists in Supabase Storage.')
    }
    setUploading(false)
  }

  const update = (field: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [field]: value })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cocoa-dark">Site Settings</h2>
        <button onClick={handleSave} disabled={saving}
          className="bg-gold text-cocoa-dark px-6 py-2 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2">
          <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Business Identity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-gold" /> Business Identity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Business Name</label>
            <input type="text" value={settings.business_name}
              onChange={e => update('business_name', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Tagline</label>
            <input type="text" value={settings.tagline}
              onChange={e => update('tagline', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-cocoa-dark mb-1">Logo</label>
          <div className="flex items-center gap-4">
            {settings.logo_url && (
              <img src={settings.logo_url} alt="Logo" className="w-16 h-16 rounded-full object-cover border-2 border-gold" />
            )}
            <label className="cursor-pointer bg-cream hover:bg-cream-dark px-4 py-2 rounded-lg border border-cream-dark transition-colors flex items-center gap-2 text-sm">
              <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload Logo'}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
            <input type="text" value={settings.logo_url} placeholder="Or enter logo URL"
              onChange={e => update('logo_url', e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none text-sm" />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-gold" /> Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Phone 1</label>
            <input type="text" value={settings.phone1}
              onChange={e => update('phone1', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Phone 2</label>
            <input type="text" value={settings.phone2}
              onChange={e => update('phone2', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1 flex items-center gap-1">
              <Mail className="h-3 w-3" /> Email
            </label>
            <input type="email" value={settings.email}
              onChange={e => update('email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Address
            </label>
            <input type="text" value={settings.address}
              onChange={e => update('address', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">City</label>
            <input type="text" value={settings.city}
              onChange={e => update('city', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Order Notice</label>
            <input type="text" value={settings.order_notice}
              onChange={e => update('order_notice', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gold" /> Business Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Weekday Hours</label>
            <input type="text" value={settings.business_hours_weekday}
              onChange={e => update('business_hours_weekday', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1">Weekend Hours</label>
            <input type="text" value={settings.business_hours_weekend}
              onChange={e => update('business_hours_weekend', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4 flex items-center gap-2">
          <Instagram className="h-5 w-5 text-gold" /> Social Media Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1 flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> WhatsApp Number
            </label>
            <input type="text" value={settings.whatsapp} placeholder="+91 XXXXX XXXXX"
              onChange={e => update('whatsapp', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1 flex items-center gap-1">
              <Instagram className="h-3 w-3" /> Instagram URL
            </label>
            <input type="text" value={settings.instagram} placeholder="https://instagram.com/..."
              onChange={e => update('instagram', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1 flex items-center gap-1">
              <Youtube className="h-3 w-3" /> YouTube URL
            </label>
            <input type="text" value={settings.youtube} placeholder="https://youtube.com/..."
              onChange={e => update('youtube', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-1 flex items-center gap-1">
              <Facebook className="h-3 w-3" /> Facebook URL
            </label>
            <input type="text" value={settings.facebook} placeholder="https://facebook.com/..."
              onChange={e => update('facebook', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
