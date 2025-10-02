import Navigation from "@/components/shared/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/pages/landingpage/HowItWorks";
import Services from "@/pages/landingpage/Services";
import Features from "@/pages/landingpage/Features";
import Footer from "@/components/shared/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Services />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
