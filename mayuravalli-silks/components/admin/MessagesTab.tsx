'use client'

import { useState, useEffect } from 'react'
import { Mail, MailOpen, Trash2, RefreshCw, Phone, Calendar } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Message } from '@/lib/types'

export default function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => { fetchMessages() }, [])

  async function fetchMessages() {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    try {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
      if (data) setMessages(data)
    } catch {}
    setLoading(false)
  }

  async function toggleRead(msg: Message) {
    if (!isSupabaseConfigured()) return
    try {
      await supabase.from('messages').update({ is_read: !msg.is_read }).eq('id', msg.id)
      await fetchMessages()
    } catch {}
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this message?')) return
    if (!isSupabaseConfigured()) return
    try {
      await supabase.from('messages').delete().eq('id', id)
      await fetchMessages()
      setMessage('Message deleted')
      setTimeout(() => setMessage(''), 3000)
    } catch { setMessage('Error deleting message') }
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-silk-dark">Messages</h2>
          <p className="text-sm text-silk-light mt-1">{messages.length} total, {unreadCount} unread</p>
        </div>
        <button onClick={fetchMessages}
          className="bg-cream text-silk-dark px-4 py-2 rounded-xl font-medium hover:bg-cream-dark transition-colors flex items-center gap-2 text-sm border border-cream-dark">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-xl text-sm font-medium ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-cream-dark">
          <Mail className="h-12 w-12 text-silk-light mx-auto mb-3" />
          <p className="text-silk-light">No messages yet. Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.id}
              className={`bg-white rounded-xl p-5 shadow-sm border transition-all ${
                msg.is_read ? 'border-cream-dark' : 'border-gold/50 bg-gold/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-silk-dark">{msg.name}</span>
                    {!msg.is_read && (
                      <span className="bg-gold text-silk-dark px-2 py-0.5 rounded-full text-xs font-semibold">New</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-silk-light mb-3">
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {msg.email}</span>
                    {msg.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {msg.phone}</span>}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                    </span>
                  </div>
                  <p className="text-silk-light text-sm leading-relaxed bg-cream-light p-3 rounded-lg">{msg.message}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => toggleRead(msg)}
                    className={`p-2 rounded-lg transition-colors ${msg.is_read ? 'bg-gray-50 text-gray-500 hover:bg-gray-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                    title={msg.is_read ? 'Mark as unread' : 'Mark as read'}>
                    {msg.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </button>
                  <button onClick={() => handleDelete(msg.id)}
                    className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                    title="Delete message">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
