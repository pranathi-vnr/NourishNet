import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PantryCard from "../PantryCard";
import { ArrowRight } from "lucide-react";

// Mock data for featured pantries
const featuredPantries = [
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
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Nourish Neighborhood Pantry",
    address: "789 Oak St",
    city: "Berkeley",
    state: "CA",
    zip: "94704",
    needs: ["Protein Items", "Dairy", "Cereal", "Cooking Oil"],
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturedPantries = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Food Pantries</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              These local pantries are in need of donations right now. 
              Your contribution can make a real difference.
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-nourish-600 hover:bg-nourish-700">
            <Link to="/pantries" className="gap-2">
              View All Pantries
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPantries.map((pantry) => (
            <PantryCard key={pantry.id} {...pantry} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPantries;
