import React from "react";
import {
  FileText,
  Brain,
  Users,
  Calendar,
  TrendingUp,
  Heart,
  CheckCircle2,
} from "lucide-react";
import image3 from "@/assets/Images/image3.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: "Simple Plan",
      desc: "One clear plan with transparent pricing.",
    },
    {
      icon: Brain,
      title: "Mood Tracking",
      desc: "Track your emotions and mental health daily.",
    },
    {
      icon: Users,
      title: "Crisis Support",
      desc: "Instant help whenever you need it most.",
    },
    {
      icon: Calendar,
      title: "Check-ins",
      desc: "Stay on top of your wellness with guided reviews.",
    },
    {
      icon: TrendingUp,
      title: "Skill Building",
      desc: "Grow with evidence-based resilience tools.",
    },
    {
      icon: Heart,
      title: "Assessments",
      desc: "Learn more about yourself through regular self-checks.",
    },
    {
      icon: CheckCircle2,
      title: "Unified Portal",
      desc: "Everything you need, all in one easy place.",
    },
  ];

  return (
    <section className="section-bg py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Our Core Services</h2>
          <p className="text-muted">
            Powerful tools to help you and your organization thrive mentally.
          </p>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img
              src={image3}
              alt="Professional working"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
          <div className="col-lg-7">
            <div className="row g-4">
              {services.map((s, i) => (
                <div key={i} className="col-md-6">
                  <div className="card card-feature h-100 p-3">
                    <div className="text-primary mb-2">
                      <s.icon size={28} />
                    </div>
                    <h6 className="fw-semibold">{s.title}</h6>
                    <p className="text-muted small">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
