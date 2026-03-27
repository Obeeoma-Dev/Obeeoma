import Navigation from "@/components/shared/Navigation";
import Hero from "@/pages/landingpage/Hero";
import Features from "@/pages/landingpage/Features";
import Benefits from "@/pages/landingpage/Benefits";
import Footer from "@/components/shared/Footer";
import ReceptionistFloatingChat from "../../src/components/landingpage/Contacts/ReceptionistFloatingChat";
import { useState, useEffect } from "react";
import { adminAPI } from "../api/apiConfig";

const Index = () => {
  const [landingAIEnabled, setLandingAIEnabled] = useState(true);

  useEffect(() => {
    const fetchAIStatus = async () => {
      try {
        const response = await adminAPI.getAIStatus();
        setLandingAIEnabled(response.data.landing_ai?.is_enabled ?? true);
      } catch (error) {
        console.error("Failed to fetch AI status:", error);
        // Default to enabled if API fails
        setLandingAIEnabled(true);
      }
    };

    fetchAIStatus();
  }, []);

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
