
import { createClient } from '@supabase/supabase-js'

// Check if the environment variables are defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Please check your .env file.')
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)
