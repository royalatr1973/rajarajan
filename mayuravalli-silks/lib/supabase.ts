import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createClient(supabaseUrl, supabaseAnonKey)
}

const client = getSupabaseClient()

// Proxy that returns safe no-ops when Supabase is not configured
export const supabase = client as SupabaseClient

export function isSupabaseConfigured(): boolean {
  return client !== null
}
