import { useQuery } from '@tanstack/react-query'
import type { Pantry } from '@/types/pantry'

// Mock data
const mockPantries: Pantry[] = [
  {
    id: "1",
    name: "Community Food Bank",
    description: "Community Food Bank serves the Oakland area with fresh and non-perishable food items for families in need.",
    address: "123 Main St",
    city: "Oakland",
    state: "CA",
    zip: "94612",
    phone: "(510) 555-1234",
    email: "info@communityfoodbank.org",
    website: "https://www.communityfoodbank.org",
    needs: ["Canned Goods", "Rice", "Pasta", "Baby Food"],
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    hours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" }
    ]
  },
  {
    id: "2",
    name: "Hope Pantry Center",
    description: "Hope Pantry Center focuses on providing fresh produce and dairy items to San Francisco residents.",
    address: "456 Elm St",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    phone: "(415) 555-6789",
    email: "contact@hopepantry.org",
    website: "https://www.hopepantry.org",
    needs: ["Vegetables", "Fruits", "Dairy Products"],
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    hours: [
      { day: "Monday", hours: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 6:00 PM" }
    ]
  },
  {
    id: "3",
    name: "Nourish Neighborhood Pantry",
    description: "Nourish Neighborhood Pantry is a volunteer-run food distribution center serving Berkeley and surrounding communities. We offer both emergency food assistance and regular distribution programs.",
    address: "789 Oak St",
    city: "Berkeley", 
    state: "CA",
    zip: "94704",
    phone: "(510) 555-4321",
    email: "hello@nourishpantry.org",
    website: "https://www.nourishpantry.org",
    needs: [
      "Protein Items",
      "Dairy",
      "Cereal",
      "Cooking Oil",
      "Spices",
      "Coffee",
      "Tea",
      "Soup"
    ],
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
    hours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" }
    ]
  }
]

export const usePantries = (searchQuery: string = '') => {
  return useQuery({
    queryKey: ['pantries', searchQuery],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase()
        return mockPantries.filter(pantry => 
          pantry.name.toLowerCase().includes(lowercaseQuery) ||
          pantry.city.toLowerCase().includes(lowercaseQuery) ||
          pantry.state.toLowerCase().includes(lowercaseQuery) ||
          pantry.zip.includes(searchQuery)
        )
      }
      
      return mockPantries
    }
  })
}
