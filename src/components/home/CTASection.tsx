
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-nourish-600 to-nourish-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg text-white/90 max-w-2xl">
              Join our growing community of donors, food pantries, and volunteers working together to fight hunger. 
              Every contribution, no matter how small, helps feed those in need.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-nourish-700 hover:bg-gray-100">
              <Link to="/donate" className="gap-2">
                Donate Now
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/volunteer">Volunteer</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
