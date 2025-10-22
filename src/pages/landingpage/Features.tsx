import React from "react";
import {Shield, Globe, Sparkles, Heart, Smartphone, BarChart} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      desc: "Your wellbeing data stays confidential and encrypted.",
    },
    {
      icon: Globe,
      title: "Culturally Relevant",
      desc: "Built with empathy for diverse African communities.",
    },
    {
      icon: Sparkles,
      title: "AI Insights",
      desc: "Personalized feedback powered by smart analytics.",
    },
    {
      icon: Heart,
      title: "Workplace Support",
      desc: "Tools to improve team wellbeing and harmony.",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      desc: "Access your support from any device, anytime.",
    },
    {
      icon: BarChart,
      title: "Analytics",
      desc: "Understand wellbeing trends and program impact.",
    },
  ];

  return (
    <section className="section-bg py-5 position-relative"
    style={{ marginTop: "0rem", background: "#ffffff", paddingBottom: "3rem" }}>
    <div className="container text-center">
      <h2 className="fw-bold mb-3 text-success">
        Comprehensive Obeeoma Features
      </h2>
      <p className="text-muted mb-5">
        Explore tools designed to enhance mental health in your organization.
      </p>
      <div className="row g-4">
        {features.map((f, i) => (
          <div className="col-md-4" key={i}>
            <div className="card card-feature h-100 p-4">
              <div className="mb-3 text-success">
                <f.icon size={36} className="text-success" />
              </div>
              <h5 className="fw-semibold">{f.title}</h5>
              <p className="text-muted">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Fade into Benefits */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "120px",
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(230,255,237,0.7) 100%)",
      }}
    />
      {/* Fade into Benefits
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "120px",
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(230,255,237,0.7) 100%)",
      }}
    /> */}
  </section>

  );
};

export default Features;
