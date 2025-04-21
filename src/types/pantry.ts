
export interface Pantry {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  needs: string[]
  image: string
  description?: string
  phone?: string
  email?: string
  website?: string
  hours?: { day: string; hours: string }[]
  created_at?: string
}
