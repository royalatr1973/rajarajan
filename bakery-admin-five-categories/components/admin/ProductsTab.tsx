'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, Upload, Star } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Product, Category, ALL_CATEGORIES, CATEGORY_INFO } from '@/lib/types'
import { defaultProducts } from '@/lib/defaults'

const emptyProduct: Omit<Product, 'id'> = {
  name: '', description: '', category: 'cakes', type: '', image_url: '', price: '', is_featured: false, display_order: 0,
}

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>('cakes')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    if (!isSupabaseConfigured()) {
      setProducts(defaultProducts)
      return
    }
    try {
      const { data } = await supabase.from('products').select('*').order('display_order')
      if (data && data.length > 0) setProducts(data)
      else setProducts(defaultProducts)
    } catch {
      setProducts(defaultProducts)
    }
  }

  const categoryProducts = products.filter(p => p.category === activeCategory)

  async function handleSave() {
    if (!form.name.trim()) { setMessage('Product name is required'); return }
    if (!isSupabaseConfigured()) { setMessage('Supabase not configured'); return }
    setSaving(true)
    try {
      if (editingId) {
        const { error } = await supabase.from('products')
          .update({ ...form, updated_at: new Date().toISOString() })
          .eq('id', editingId)
        if (error) throw error
        setMessage('Product updated!')
      } else {
        const { error } = await supabase.from('products').insert({ ...form, category: activeCategory })
        if (error) throw error
        setMessage('Product added!')
      }
      await fetchProducts()
      resetForm()
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error saving product')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    if (!isSupabaseConfigured()) return
    try {
      await supabase.from('products').delete().eq('id', id)
      await fetchProducts()
      setMessage('Product deleted')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error deleting product')
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name, description: product.description, category: product.category,
      type: product.type, image_url: product.image_url, price: product.price,
      is_featured: product.is_featured, display_order: product.display_order,
    })
    setShowForm(true)
  }

  function resetForm() {
    setEditingId(null)
    setForm({ ...emptyProduct, category: activeCategory })
    setShowForm(false)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !isSupabaseConfigured()) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `products/${activeCategory}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('images').upload(path, file, { upsert: true })
      if (error) throw error
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
      setForm({ ...form, image_url: urlData.publicUrl })
    } catch {
      setMessage('Error uploading image')
    }
    setUploading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cocoa-dark">Products</h2>
        <span className="text-sm text-cocoa-light">{products.length} total products</span>
      </div>

      {message && (
        <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map(cat => {
          const count = products.filter(p => p.category === cat).length
          return (
            <button key={cat}
              onClick={() => { setActiveCategory(cat); resetForm() }}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-cocoa-dark shadow-md'
                  : 'bg-white text-cocoa-medium hover:bg-cream border border-cream-dark'
              }`}
            >
              {CATEGORY_INFO[cat].emoji} {CATEGORY_INFO[cat].label} ({count})
            </button>
          )
        })}
      </div>

      {/* Add Button */}
      {!showForm && (
        <button onClick={() => { setForm({ ...emptyProduct, category: activeCategory }); setShowForm(true) }}
          className="bg-cocoa-dark text-cream px-5 py-2 rounded-xl font-medium hover:bg-cocoa-medium transition-colors flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> Add {CATEGORY_INFO[activeCategory].label.slice(0, -1)}
        </button>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gold/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-cocoa-dark">{editingId ? 'Edit' : 'Add'} Product</h3>
            <button onClick={resetForm} className="text-cocoa-light hover:text-cocoa-dark"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Name *</label>
              <input type="text" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Type / Variety</label>
              <input type="text" value={form.type} placeholder="e.g. Chocolate, Classic, Fruit"
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Price</label>
              <input type="text" value={form.price} placeholder="e.g. ₹750"
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Display Order</label>
              <input type="number" value={form.display_order}
                onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Description</label>
              <textarea rows={3} value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cream-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Image</label>
              <div className="flex items-center gap-3">
                {form.image_url && (
                  <img src={form.image_url} alt="" className="w-16 h-16 rounded-lg object-cover border" />
                )}
                <label className="cursor-pointer bg-cream hover:bg-cream-dark px-4 py-2 rounded-lg border border-cream-dark transition-colors flex items-center gap-2 text-sm">
                  <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <input type="text" value={form.image_url} placeholder="Or enter image URL"
                  onChange={e => setForm({ ...form, image_url: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg border border-cream-dark focus:border-gold outline-none text-sm" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured}
                  onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 text-gold rounded" />
                <Star className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-cocoa-dark">Featured Product (shows on homepage)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving}
              className="bg-gold text-cocoa-dark px-6 py-2 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2">
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={resetForm} className="bg-cream text-cocoa-dark px-6 py-2 rounded-xl font-medium hover:bg-cream-dark transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-cream-dark hover:shadow-md transition-shadow">
            <div className="relative h-40 bg-cream">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">{CATEGORY_INFO[activeCategory].emoji}</div>
              )}
              {product.is_featured && (
                <div className="absolute top-2 left-2 bg-gold text-cocoa-dark px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> Featured
                </div>
              )}
              <div className="absolute top-2 right-2 bg-cocoa-dark/70 text-cream px-2 py-0.5 rounded-full text-xs">
                {product.type}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-cocoa-dark">{product.name}</h4>
              <p className="text-cocoa-light text-xs mt-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-gold font-bold">{product.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(product)}
                    className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(product.id)}
                    className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categoryProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-cream-dark">
          <p className="text-5xl mb-3">{CATEGORY_INFO[activeCategory].emoji}</p>
          <p className="text-cocoa-light">No {CATEGORY_INFO[activeCategory].label.toLowerCase()} yet. Add your first one!</p>
        </div>
      )}
    </div>
  )
}
