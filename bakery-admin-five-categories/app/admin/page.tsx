'use client'

import { useState, useEffect } from 'react'
import {
  Settings, Image, ShoppingBag, MessageSquare, Star, LayoutDashboard,
  Lock, LogOut, Cake, ChevronRight, Package, Users, Mail
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import SiteSettingsTab from '@/components/admin/SiteSettingsTab'
import HeroTab from '@/components/admin/HeroTab'
import ProductsTab from '@/components/admin/ProductsTab'
import TestimonialsTab from '@/components/admin/TestimonialsTab'
import MessagesTab from '@/components/admin/MessagesTab'

const ADMIN_PASSWORD = 'cakeadmin2024'

type Tab = 'dashboard' | 'settings' | 'hero' | 'products' | 'testimonials' | 'messages'

const tabs: { id: Tab; label: string; icon: typeof Settings }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Site Settings', icon: Settings },
  { id: 'hero', label: 'Hero Section', icon: Image },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
]

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, testimonials: 0, messages: 0, unreadMessages: 0 })

  useEffect(() => {
    async function fetchStats() {
      if (!isSupabaseConfigured()) return
      try {
        const [prodRes, testRes, msgRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact', head: true }),
          supabase.from('testimonials').select('id', { count: 'exact', head: true }),
          supabase.from('messages').select('id, is_read'),
        ])
        const msgs = msgRes.data || []
        setStats({
          products: prodRes.count || 0,
          testimonials: testRes.count || 0,
          messages: msgs.length,
          unreadMessages: msgs.filter((m: { is_read: boolean }) => !m.is_read).length,
        })
      } catch {}
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Testimonials', value: stats.testimonials, icon: Users, color: 'bg-green-50 text-green-600' },
    { label: 'Total Messages', value: stats.messages, icon: Mail, color: 'bg-purple-50 text-purple-600' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: 'bg-orange-50 text-orange-600' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-cocoa-dark">Dashboard</h2>

      {!isSupabaseConfigured() && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
          <p className="font-semibold">Supabase Not Configured</p>
          <p className="text-sm mt-1">
            Add your Supabase credentials to <code className="bg-yellow-100 px-1 rounded">.env.local</code> to enable full functionality.
            The site is currently showing fallback data.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-cocoa-dark">{card.value}</p>
              <p className="text-sm text-cocoa-light mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-cream-dark">
        <h3 className="text-lg font-semibold text-cocoa-dark mb-4">Quick Guide</h3>
        <div className="space-y-3 text-sm text-cocoa-medium">
          <div className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <p><strong>Site Settings:</strong> Update business name, logo, contact details, social media links, and business hours.</p>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <p><strong>Hero Section:</strong> Edit the homepage banner - title, subtitle, image, CTA buttons, and stats.</p>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <p><strong>Products:</strong> Manage all products across 5 categories - Cakes, Brownies, Cup Cakes, Biscuits, Chocolates.</p>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <p><strong>Testimonials:</strong> Add, edit, or remove customer testimonials shown on the homepage.</p>
          </div>
          <div className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 text-gold mt-0.5 shrink-0" />
            <p><strong>Messages:</strong> View messages submitted through the contact form. Mark as read or delete.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') setIsAuthenticated(true)
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  function handleLogout() {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
    setPassword('')
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cocoa-dark via-cocoa-medium to-cocoa-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gold rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Cake className="h-8 w-8 text-cocoa-dark" />
            </div>
            <h1 className="text-2xl font-bold text-cocoa-dark">Admin Panel</h1>
            <p className="text-cocoa-light mt-1">Cake Cravings Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cocoa-dark mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cocoa-light" />
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit"
              className="w-full bg-gold text-cocoa-dark py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors">
              Sign In
            </button>
          </form>

          <p className="text-center text-cocoa-light text-xs mt-6">
            <a href="/" className="hover:text-gold transition-colors">Back to Website</a>
          </p>
        </div>
      </div>
    )
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-cream-light flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-cocoa-dark text-cream transition-all duration-300 flex flex-col shrink-0`}>
        <div className="p-4 border-b border-cocoa-medium">
          <div className="flex items-center gap-2">
            <div className="bg-gold rounded-full p-1.5 shrink-0">
              <Cake className="h-5 w-5 text-cocoa-dark" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Admin Panel</span>}
          </div>
        </div>

        <nav className="flex-1 py-4">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-gold/20 text-gold border-r-3 border-gold'
                    : 'text-cream/70 hover:text-cream hover:bg-cocoa-medium/50'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{tab.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-cocoa-medium space-y-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-cream/50 hover:text-cream text-xs text-center py-1">
            {sidebarOpen ? 'Collapse' : 'Expand'}
          </button>
          <a href="/" className="block text-center text-cream/70 hover:text-gold text-sm transition-colors py-1">
            View Site
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm py-1 transition-colors">
            <LogOut className="h-4 w-4" /> {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'settings' && <SiteSettingsTab />}
          {activeTab === 'hero' && <HeroTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'messages' && <MessagesTab />}
        </div>
      </main>
    </div>
  )
}
