
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Pantry } from '@/types/pantry'

export const usePantries = (searchQuery: string = '') => {
  return useQuery({
    queryKey: ['pantries', searchQuery],
    queryFn: async () => {
      let query = supabase.from('pantries').select('*')
      
      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%,zip.ilike.%${searchQuery}%`
        )
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data as Pantry[]
    }
  })
}
