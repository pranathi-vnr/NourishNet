
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nourish-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About NourishNet</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're on a mission to fight hunger by connecting food donors with local food pantries,
            making it easier for everyone to contribute to food security in their communities.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
                alt="Volunteers at food pantry" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-nourish-600 font-medium mb-2 block">Our Story</span>
              <h2 className="text-3xl font-bold mb-6">How NourishNet Began</h2>
              <p className="text-gray-700 mb-4">
                NourishNet was founded in 2021 by a group of community activists and tech professionals who saw a disconnect between food donors and local pantries. While many people wanted to help fight hunger, they often didn't know what items were needed or where to donate them.
              </p>
              <p className="text-gray-700 mb-4">
                At the same time, food pantries were struggling to communicate their specific needs to potential donors, resulting in surpluses of some items while desperately needing others.
              </p>
              <p className="text-gray-700 mb-4">
                Our platform bridges this gap, providing a transparent and efficient way for donors to see exactly what items local pantries need most, and making it easy for pantries to communicate their changing requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-nourish-600 font-medium mb-2 block">Our Mission</span>
            <h2 className="text-3xl font-bold mb-6">What Drives Us</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We believe that no one should go hungry in a world with abundant food resources. Our mission is to create more efficient pathways for food to reach those who need it most, reducing waste and increasing food security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-nourish-100 text-nourish-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Reduce Hunger</h3>
              <p className="text-gray-600">
                Ensure that nutritious food reaches individuals and families experiencing food insecurity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-nourish-100 text-nourish-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Communities</h3>
              <p className="text-gray-600">
                Build stronger communities by connecting donors, volunteers, and those in need.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-nourish-100 text-nourish-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Reduce Food Waste</h3>
              <p className="text-gray-600">
                Minimize food waste by helping surplus food reach people who need it instead of landfills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-nourish-600 font-medium mb-2 block">Our Team</span>
            <h2 className="text-3xl font-bold mb-6">The People Behind NourishNet</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Our team combines expertise in food security, community organizing, and technology to create effective solutions for fighting hunger.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Elena Rodriguez",
                role: "Founder & Executive Director",
                image: "https://randomuser.me/api/portraits/women/23.jpg"
              },
              {
                name: "David Kim",
                role: "Technology Director",
                image: "https://randomuser.me/api/portraits/men/54.jpg"
              },
              {
                name: "Aisha Johnson",
                role: "Community Partnerships",
                image: "https://randomuser.me/api/portraits/women/45.jpg"
              },
              {
                name: "Marcus Thompson",
                role: "Operations Manager",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-nourish-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Fighting Hunger</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Whether you want to donate food, volunteer your time, or support a local pantry,
            there are many ways to get involved and make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-nourish-600 hover:bg-gray-100">
              <Link to="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/volunteer">Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
