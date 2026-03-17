import React from "react";
import Navigation from "../../../components/shared/Navigation";
import { MissionValuesSection } from "../../../components/About/missionValueSection";
import { AboutUsHero } from "../../../components/About/overlaysection";
import { OurStorySection } from "../../../components/About/storysection";
import { WhyChooseSection } from "../../../components/About/whyChooseArea";
import { CTASection } from "@/components/About/CTAsection";
import { FloatingWhatsApp } from "../../../components/Contactus/floatingWhatsup";
import ReceptionistFloatingChat from "../../../components/landingpage/Contacts/ReceptionistFloatingChat";
const About: React.FC = () => {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: "80px" }}>
        <AboutUsHero />
        <OurStorySection />
        <MissionValuesSection />
        <WhyChooseSection />
        <CTASection />
        <FloatingWhatsApp />
        <ReceptionistFloatingChat />
      </main>
    </>
  );
};

export default About;
