
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

export const supabase = createClient<Database>(
  'https://zxenowjlyyupnfgpmekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZW5vd2pseXl1cG5mZ3BtZWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjAyMTAsImV4cCI6MjA2MDgzNjIxMH0.aO4xgpBl0XZaQQeAwZWQBFFgJeQtHknXBy6_XeHgifw'
)
