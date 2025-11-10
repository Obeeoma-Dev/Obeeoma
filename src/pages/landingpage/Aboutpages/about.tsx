import React from "react";
// import { Header } from "../../../components/About/headerAbout";
import { MissionValuesSection } from "../../../components/About/missionValueSection";
import { AboutUsHero } from "../../../components/About/overlaysection";
import { OurStorySection } from "../../../components/About/storysection";
import { WhyChooseSection } from "../../../components/About/whyChooseArea";
import { CTASection } from "@/components/About/CTAsection";
import { FloatingWhatsApp } from "../../../components/Contactus/floatingWhatsup";
const About: React.FC = () => {
    return (
        <>
            <AboutUsHero />
            <OurStorySection />
            <MissionValuesSection />
            <WhyChooseSection />
            <CTASection />
            <FloatingWhatsApp />

        </>
    );
};

export default About;