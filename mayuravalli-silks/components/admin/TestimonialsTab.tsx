'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, Star } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Testimonial } from '@/lib/types'
import { defaultTestimonials } from '@/lib/defaults'

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', text: '', rating: 5 })
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchTestimonials() }, [])

  async function fetchTestimonials() {
    if (!isSupabaseConfigured()) return
    try {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      if (data && data.length > 0) setTestimonials(data)
    } catch {}
  }

  async function handleSave() {
    if (!form.name.trim() || !form.text.trim()) { setMessage('Name and text are required'); return }
    if (!isSupabaseConfigured()) { setMessage('Supabase not configured'); return }
    setSaving(true)
    try {
      if (editingId) {
        await supabase.from('testimonials').update(form).eq('id', editingId)
        setMessage('Testimonial updated!')
      } else {
        await supabase.from('testimonials').insert(form)
        setMessage('Testimonial added!')
      }
      await fetchTestimonials()
      resetForm()
      setTimeout(() => setMessage(''), 3000)
    } catch { setMessage('Error saving testimonial') }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return
    if (!isSupabaseConfigured()) return
    try {
      await supabase.from('testimonials').delete().eq('id', id)
      await fetchTestimonials()
      setMessage('Testimonial deleted')
      setTimeout(() => setMessage(''), 3000)
    } catch { setMessage('Error deleting testimonial') }
  }

  function startEdit(t: Testimonial) {
    setEditingId(t.id)
    setForm({ name: t.name, text: t.text, rating: t.rating })
    setShowForm(true)
  }

  function resetForm() {
    setEditingId(null)
    setForm({ name: '', text: '', rating: 5 })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-silk-dark">Testimonials</h2>
        <span className="text-sm text-silk-light">{testimonials.length} testimonials</span>
      </div>

      {message && (
        <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)}
          className="bg-silk-dark text-cream px-5 py-2 rounded-xl font-medium hover:bg-silk-medium transition-colors flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gold/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-silk-dark">{editingId ? 'Edit' : 'Add'} Testimonial</h3>
            <button onClick={resetForm} className="text-silk-light hover:text-silk-dark"><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-silk-dark mb-1">Customer Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-silk-dark mb-1">Testimonial Text *</label>
              <textarea rows={4} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-silk-dark mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(r => (
                  <button key={r} onClick={() => setForm({ ...form, rating: r })} type="button">
                    <Star className={`h-6 w-6 ${r <= form.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving}
              className="bg-gold text-silk-dark px-6 py-2 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2">
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={resetForm} className="bg-cream text-silk-dark px-6 py-2 rounded-xl font-medium hover:bg-cream-dark transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark">
            <div className="flex items-start justify-between">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(r => (
                  <Star key={r} className={`h-4 w-4 ${r <= t.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(t)} className="bg-blue-50 text-blue-600 p-1.5 rounded-lg hover:bg-blue-100">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="bg-red-50 text-red-600 p-1.5 rounded-lg hover:bg-red-100">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="text-silk-light text-sm italic mb-3">&ldquo;{t.text}&rdquo;</p>
            <p className="text-silk-dark font-semibold text-sm">- {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
