import Navigation from "@/components/shared/Navigation";
import Hero from "@/components/Hero";
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
