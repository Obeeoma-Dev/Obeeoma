import Navigation from "@/components/shared/Navigation";
import Hero from "@/pages/landingpage/Hero";
import Features from "@/pages/landingpage/Features";
import Benefits from "@/pages/landingpage/Benefits";
import Footer from "@/components/shared/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <section id="features" className="py-5">
          <Features />
        </section>
        <section id="benefits" className="section-bg py-5">
          <Benefits />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
