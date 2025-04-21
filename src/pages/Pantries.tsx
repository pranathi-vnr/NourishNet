
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PantryCard from "@/components/PantryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePantries } from "@/hooks/usePantries";

const Pantries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: pantries = [], isLoading, error } = usePantries(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is handled automatically by the hook when searchQuery changes
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
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Loading pantries...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-red-600 mb-4">Error loading pantries</h3>
              <p className="text-gray-500">Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">
                  {pantries.length} {pantries.length === 1 ? 'Pantry' : 'Pantries'} Found
                </h2>
              </div>
              
              {pantries.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pantries.map(pantry => (
                    <PantryCard key={pantry.id} {...pantry} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-600 mb-4">No pantries found matching your search.</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search terms or browse all pantries.</p>
                  <Button onClick={() => setSearchQuery("")}>
                    View All Pantries
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Pantries;
