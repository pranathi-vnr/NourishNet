
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import FeaturedPantries from "@/components/home/FeaturedPantries";
import ImpactStats from "@/components/home/ImpactStats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedPantries />
      <ImpactStats />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
