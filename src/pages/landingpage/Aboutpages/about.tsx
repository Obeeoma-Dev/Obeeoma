import React from "react";
// import { Header } from "../../../components/About/headerAbout";
import { MissionValuesSection } from "../../../components/About/missionValueSection";
import { HeroSection } from "../../../components/About/overlaysection";
import { OurStorySection } from "../../../components/About/storysection";
import { WhyChooseSection } from "../../../components/About/whyChooseArea";
import { CTASection } from "@/components/About/CTAsection";
// import { FloatingWhatsApp } from "../../../components/Contactus/floatingWhatsup";
const About: React.FC = () => {
    return (
        <>
            <HeroSection />
            <OurStorySection />
            <MissionValuesSection />
            <WhyChooseSection />
            <CTASection />
            {/* <FloatingWhatsApp /> */}

        </>
    );
};

export default About;