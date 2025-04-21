
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PantryCard from "@/components/PantryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for pantries
const allPantries = [
  {
    id: "1",
    name: "Community Food Bank",
    address: "123 Main St",
    city: "Oakland",
    state: "CA",
    zip: "94612",
    needs: ["Canned Goods", "Rice", "Pasta", "Baby Food"],
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Hope Pantry Center",
    address: "456 Elm St",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    needs: ["Vegetables", "Fruits", "Hygiene Products"],
    image: "https://images.unsplash.com/photo-1576976108824-a8e11d25e782?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Nourish Neighborhood Pantry",
    address: "789 Oak St",
    city: "Berkeley",
    state: "CA",
    zip: "94704",
    needs: ["Protein Items", "Dairy", "Cereal", "Cooking Oil"],
    image: "https://images.unsplash.com/photo-1615397587950-3cbb55f95d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    name: "Sunset District Food Assistance",
    address: "321 Sunset Blvd",
    city: "San Francisco",
    state: "CA",
    zip: "94116",
    needs: ["Canned Soups", "Bread", "Peanut Butter", "Jelly"],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    name: "East Bay Food Project",
    address: "555 College Ave",
    city: "Oakland",
    state: "CA",
    zip: "94618",
    needs: ["Grains", "Fresh Produce", "Diapers", "Formula"],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    name: "Mission Neighborhood Center",
    address: "444 Valencia St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    needs: ["Beans", "Rice", "Tortillas", "Cooking Oil"],
    image: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const Pantries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPantries, setFilteredPantries] = useState(allPantries);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredPantries(allPantries);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = allPantries.filter(
      pantry => 
        pantry.name.toLowerCase().includes(query) ||
        pantry.city.toLowerCase().includes(query) ||
        pantry.state.toLowerCase().includes(query) ||
        pantry.zip.includes(query)
    );
    
    setFilteredPantries(results);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-b from-nourish-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Food Pantries Near You</h1>
            <p className="text-lg text-gray-600">
              Discover local food pantries that need your support. Find out what items they need
              and how you can contribute to make a difference.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search by name, city, state or ZIP"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <Button type="submit" className="bg-nourish-600 hover:bg-nourish-700">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              {filteredPantries.length} {filteredPantries.length === 1 ? 'Pantry' : 'Pantries'} Found
            </h2>
          </div>
          
          {filteredPantries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPantries.map(pantry => (
                <PantryCard key={pantry.id} {...pantry} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 mb-4">No pantries found matching your search.</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search terms or browse all pantries.</p>
              <Button onClick={() => {
                setSearchQuery("");
                setFilteredPantries(allPantries);
              }}>
                View All Pantries
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Pantries;
