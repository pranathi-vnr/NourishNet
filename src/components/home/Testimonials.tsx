
import { useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    quote: "NourishNet has made it so easy for our food pantry to communicate our needs and connect with donors. We've seen a 40% increase in donations since joining!",
    author: "Sarah Chen",
    title: "Director, Community Food Bank",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    quote: "As a restaurant owner, I was looking for a way to donate our excess food to those in need. NourishNet has made this process seamless and rewarding.",
    author: "Michael Rodriguez",
    title: "Owner, Fresh Bites Restaurant",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    quote: "I wanted to help local food pantries but didn't know where to start. NourishNet made it simple to find pantries near me and see exactly what they needed.",
    author: "Jasmine Williams",
    title: "Regular Donor",
    image: "https://randomuser.me/api/portraits/women/58.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from food pantries and donors about their experience with NourishNet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="relative h-[400px] md:h-[300px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-300 ease-in-out bg-gray-50 rounded-2xl p-8 shadow-md",
                    index === activeIndex 
                      ? "opacity-100 translate-x-0 z-20" 
                      : index < activeIndex 
                        ? "opacity-0 -translate-x-full z-10" 
                        : "opacity-0 translate-x-full z-10"
                  )}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <svg className="h-8 w-8 text-nourish-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg text-gray-700 mb-8 italic">{testimonial.quote}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    index === activeIndex ? "bg-nourish-600" : "bg-gray-300"
                  )}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
