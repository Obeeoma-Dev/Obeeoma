import Navigation from "@/components/shared/Navigation";
import Hero from "@/pages/landingpage/Hero";
import Features from "@/pages/landingpage/Features";
import Benefits from "@/pages/landingpage/Benefits";
import Footer from "@/components/shared/Footer";
import ReceptionistFloatingChat from "../../src/components/landingpage/Contacts/ReceptionistFloatingChat";

const Index = () => {
  // For landing page, always enable AI receptionist
  const landingAIEnabled = true;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main style={{ paddingTop: "80px" }}>
        <section id="Hero">
          <Hero />
        </section>
        <section id="features" className="section-bg py-3">
          <Features />
        </section>
        <section id="benefits" className="section-bg pt-5">
          <Benefits />
        </section>
      </main>
      <Footer />
      <ReceptionistFloatingChat isEnabled={landingAIEnabled} />
    </div>
  );
};

export default Index;
