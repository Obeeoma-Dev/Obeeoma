import React from "react";
import {
  Shield,
  Globe,
  Sparkles,
  Heart,
  Smartphone,
  BarChart,
} from "lucide-react";
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
    <section className="section-bg py-5">
      <div className="container text-center">
        <h2
          className="fw-bold mb-3 text-primary"
          style={{ color: "var(--color-green)" }}
        >
          Comprehensive Obeeoma Features
        </h2>
        <p className="text-muted mb-5">
          Explore tools designed to enhance mental health in your organization.
        </p>
        <div className="row g-4">
          {features.map((f, i) => (
            <div className="col-md-4" key={i}>
              <div className="card card-feature h-100 p-4">
                <div className="mb-3 text-primary">
                  <f.icon size={36} />
                </div>
                <h5 className="fw-semibold">{f.title}</h5>
                <p className="text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
