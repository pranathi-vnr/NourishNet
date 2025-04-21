
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { HandHelping } from "lucide-react";
import { Link } from "react-router-dom";

const Volunteer = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-nourish-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Volunteer With Us</h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our community of volunteers and help make a difference in the lives of those facing food insecurity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <HandHelping className="w-12 h-12 text-nourish-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Food Distribution</h3>
              <p className="text-gray-600 mb-4">
                Help sort donations, pack food boxes, and assist with distribution to families in need.
              </p>
              <Button className="w-full bg-nourish-600 hover:bg-nourish-700">Sign Up</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <HandHelping className="w-12 h-12 text-nourish-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Delivery Driver</h3>
              <p className="text-gray-600 mb-4">
                Deliver food packages to homebound seniors and individuals who cannot visit our pantries.
              </p>
              <Button className="w-full bg-nourish-600 hover:bg-nourish-700">Sign Up</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <HandHelping className="w-12 h-12 text-nourish-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Administrative Support</h3>
              <p className="text-gray-600 mb-4">
                Help with data entry, phone calls, and organizing volunteer schedules.
              </p>
              <Button className="w-full bg-nourish-600 hover:bg-nourish-700">Sign Up</Button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Fill out our volunteer application form and join our team of dedicated volunteers making a difference in our community.
            </p>
            <Button size="lg" className="bg-nourish-600 hover:bg-nourish-700">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Volunteer;
