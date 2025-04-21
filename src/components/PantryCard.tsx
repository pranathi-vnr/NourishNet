
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface PantryCardProps {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  needs: string[];
  image: string;
}

const PantryCard = ({ id, name, address, city, state, zip, needs, image }: PantryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback to a placeholder image if the original fails to load
            e.currentTarget.src = "https://images.unsplash.com/photo-1615397587950-3cbb55f95d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-3">
          {address}, {city}, {state} {zip}
        </p>
        
        {needs && needs.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Current Needs:</p>
            <div className="flex flex-wrap gap-2">
              {needs.slice(0, 3).map((need, index) => (
                <Badge key={index} variant="outline" className="bg-muted text-nourish-700 border-nourish-200">
                  {need}
                </Badge>
              ))}
              {needs.length > 3 && (
                <Badge variant="outline" className="bg-muted text-nourish-700 border-nourish-200">
                  +{needs.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <Button asChild variant="link" className="text-nourish-600 p-0">
            <Link to={`/pantries/${id}`} className="flex items-center gap-1">
              View Details
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild className="bg-nourish-600 hover:bg-nourish-700">
            <Link to={`/donate`}>Donate</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PantryCard;
