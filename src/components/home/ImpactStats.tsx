
import { useEffect, useState, useRef } from "react";

const stats = [
  { id: 1, value: 52, label: "Pantries", suffix: "+" },
  { id: 2, value: 120000, label: "Meals Donated", suffix: "+" },
  { id: 3, value: 850, label: "Active Donors", suffix: "+" },
  { id: 4, value: 32, label: "Communities", suffix: "" }
];

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const intervals = stats.map((stat, index) => {
      const duration = 2000; // 2 seconds for animation
      const steps = 30; // Number of steps
      const increment = Math.ceil(stat.value / steps);
      
      return setInterval(() => {
        setCounters(prevCounters => {
          const newCounters = [...prevCounters];
          const newValue = Math.min(newCounters[index] + increment, stat.value);
          newCounters[index] = newValue;
          
          if (newValue >= stat.value) {
            clearInterval(intervals[index]);
          }
          
          return newCounters;
        });
      }, duration / steps);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isVisible]);
  
  return (
    <section ref={sectionRef} className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together we're making a difference in fighting hunger across our communities.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-nourish-600 mb-2">
                {counters[index].toLocaleString()}
                <span>{stat.suffix}</span>
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
