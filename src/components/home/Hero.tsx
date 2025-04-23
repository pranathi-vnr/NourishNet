
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 w-full overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTEwaDJ2MTBoLTJ6bTAgMTZ2LTZoMnY2aC0yem0tMTggNmgtNFY0MGg0djEwem0wLTE2aC00VjIwaDR2MTB6bTAtMTZoLTRWNGg0djEweiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-nourish-600 to-harvest-500 bg-clip-text text-transparent">
                Connect, Donate, Nourish
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Bridging the gap between food donors and local pantries to fight hunger in our communities, one donation at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-nourish-600 hover:bg-nourish-700">
                <Link to="/pantries" className="gap-2">
                  Find Food Pantries
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/donate">Donate Food</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1607113281783-b1df5a973533?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&h=1000&q=80" 
                alt="Food donations" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-nourish-700 font-medium px-4 py-2 rounded-full text-sm">
                  Join 200+ pantries making a difference
                </span>
              </div>
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-5 hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-nourish-600">500+</p>
                  <p className="text-sm text-gray-600">Donors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-harvest-500">10k+</p>
                  <p className="text-sm text-gray-600">Meals Donated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave SVG Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,75C1120,75,1280,53,1360,42.7L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
