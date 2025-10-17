import Navigation from "@/components/shared/Navigation";
import Hero from "@/components/Hero";
import Services from "@/pages/landingpage/Services";
import Features from "@/pages/landingpage/Features";
import Footer from "@/components/shared/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <section id="features" className="section-bg py-5">
          <Features />
        </section>
        <section id="services" className="section-bg py-5">
          <Services />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
