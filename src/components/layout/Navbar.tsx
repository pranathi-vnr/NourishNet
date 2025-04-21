
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  User,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-nourish-600 to-harvest-500 bg-clip-text text-transparent">
            NourishNet
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/pantries" className="text-gray-700 hover:text-nourish-600 transition-colors">
            Find Pantries
          </Link>
          <Link to="/donate" className="text-gray-700 hover:text-nourish-600 transition-colors">
            Donate
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-nourish-600 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-nourish-600 transition-colors">
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <User size={18} />
            Login
          </Button>
          <Button size="sm" className="bg-nourish-600 hover:bg-nourish-700 gap-2">
            Get Started
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/pantries" 
              className="text-gray-700 hover:text-nourish-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Pantries
            </Link>
            <Link 
              to="/donate" 
              className="text-gray-700 hover:text-nourish-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-nourish-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-nourish-600 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 flex flex-col gap-3">
              <Button variant="outline" size="sm" className="w-full justify-center gap-2">
                <User size={18} />
                Login
              </Button>
              <Button size="sm" className="w-full bg-nourish-600 hover:bg-nourish-700 justify-center gap-2">
                Get Started
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
