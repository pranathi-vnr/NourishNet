
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

// Mock data for pantry details
const pantries = {
  "1": {
    id: "1",
    name: "Community Food Bank",
    description: "Community Food Bank serves the Oakland area with fresh and non-perishable food items for families in need. We work with local farmers and grocery stores to provide nutritious options for our community members.",
    address: "123 Main St",
    city: "Oakland",
    state: "CA",
    zip: "94612",
    phone: "(510) 555-1234",
    email: "info@communityfoodbank.org",
    website: "https://www.communityfoodbank.org",
    hours: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    needs: [
      "Canned Goods",
      "Rice",
      "Pasta",
      "Baby Food",
      "Cereal",
      "Peanut Butter",
      "Canned Tuna",
      "Beans"
    ],
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
  },
  "2": {
    id: "2",
    name: "Hope Pantry Center",
    description: "Hope Pantry Center focuses on providing fresh produce, dairy, and protein items to San Francisco residents facing food insecurity. We believe everyone deserves access to healthy, nutritious food options.",
    address: "456 Elm St",
    city: "San Francisco",
    state: "CA",
    zip: "94110",
    phone: "(415) 555-6789",
    email: "contact@hopepantry.org",
    website: "https://www.hopepantry.org",
    hours: [
      { day: "Monday", hours: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
      { day: "Friday", hours: "10:00 AM - 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ],
    needs: [
      "Vegetables",
      "Fruits",
      "Hygiene Products",
      "Dairy Products",
      "Meat",
      "Diapers",
      "Formula",
      "Toilet Paper"
    ],
    image: "https://images.unsplash.com/photo-1576976108824-a8e11d25e782?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
  },
  "3": {
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
    hours: [
      { day: "Monday", hours: "Closed" },
      { day: "Tuesday", hours: "11:00 AM - 7:00 PM" },
      { day: "Wednesday", hours: "11:00 AM - 7:00 PM" },
      { day: "Thursday", hours: "11:00 AM - 7:00 PM" },
      { day: "Friday", hours: "11:00 AM - 7:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", hours: "9:00 AM - 1:00 PM" }
    ],
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
    image: "https://images.unsplash.com/photo-1615397587950-3cbb55f95d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
  }
};

const PantryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pantry = id ? pantries[id as keyof typeof pantries] : null;

  if (!pantry) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-semibold mb-6">Pantry Not Found</h1>
            <p className="text-gray-600 mb-8">
              The pantry you are looking for does not exist or has been removed.
            </p>
            <Button asChild className="bg-nourish-600 hover:bg-nourish-700">
              <Link to="/pantries">View All Pantries</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src={pantry.image} 
            alt={pantry.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Button 
              asChild 
              variant="ghost" 
              className="text-white mb-4 hover:bg-white/10"
              size="sm"
            >
              <Link to="/pantries" className="flex items-center gap-1">
                <ArrowLeft size={16} />
                Back to All Pantries
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">{pantry.name}</h1>
            <div className="flex items-center text-white/90">
              <MapPin size={18} className="mr-1" />
              <p>{pantry.address}, {pantry.city}, {pantry.state} {pantry.zip}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Pantry</h2>
                <p className="text-gray-700 mb-6">{pantry.description}</p>
                
                <h3 className="text-xl font-medium mb-3">Current Needs</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {pantry.needs.map((need, index) => (
                    <Badge key={index} className="bg-nourish-100 text-nourish-800 hover:bg-nourish-200">
                      {need}
                    </Badge>
                  ))}
                </div>
                
                <Button asChild size="lg" className="bg-nourish-600 hover:bg-nourish-700 w-full sm:w-auto">
                  <Link to={`/donate/${pantry.id}`} className="gap-2">
                    Donate to This Pantry
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone size={20} className="mr-3 text-nourish-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">{pantry.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="mr-3 text-nourish-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${pantry.email}`} className="text-nourish-600 hover:text-nourish-700">
                        {pantry.email}
                      </a>
                    </div>
                  </div>
                  
                  {pantry.website && (
                    <div className="pt-2">
                      <a 
                        href={pantry.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-nourish-600 hover:text-nourish-700 font-medium flex items-center"
                      >
                        Visit Website
                        <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Clock size={20} className="mr-2 text-nourish-600" />
                  Hours of Operation
                </h3>
                <div className="space-y-3">
                  {pantry.hours.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{item.day}</span>
                      <span className="text-gray-600">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-3">Want to Help More?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            In addition to donating food, consider volunteering your time or making a monetary contribution
            to support the pantry's operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-nourish-600 hover:bg-nourish-700">
              <Link to="/volunteer">Volunteer</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/donate">Make a Financial Donation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PantryDetail;
