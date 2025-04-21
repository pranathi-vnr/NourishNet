
import { ShoppingCart, Search, User } from "lucide-react";

const features = [
  {
    icon: <Search className="h-10 w-10 text-nourish-600" />,
    title: "Find Local Pantries",
    description: "Easily locate food pantries in your area that need donations the most."
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-harvest-500" />,
    title: "Make Donations",
    description: "Contribute food items, funds, or volunteer your time to support local pantries."
  },
  {
    icon: <User className="h-10 w-10 text-nourish-600" />,
    title: "Track Impact",
    description: "See how your contributions are making a difference in your community."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How NourishNet Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to connect food donors with local pantries, helping to reduce 
            food waste and fight hunger in communities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-8 transition-all hover:shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-3 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
