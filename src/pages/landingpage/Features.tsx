import React from "react";
import { Shield, Sparkles, Heart } from "lucide-react"; // icons used for items
import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap grid + utilities
import Personreading from "../../assets/Images/image3.png"; // local left-side illustration

// type describing a single feature item
type FeatureItem = {
  icon: React.ComponentType<{ size?: number; className?: string }>; // icon component
  title: string; // feature title
  desc: string; // feature description
};

// Features component renders heading, image and a list of small cards (features)
const Features: React.FC = () => {
  // expanded feature list — added items to match the Figma image content (cards only, no styling changes)
  const features: FeatureItem[] = [
    {
      icon: Sparkles,
      title: "Self-Assessment Tools",
      desc: "Quick check-ins, daily mood logging, and progress tracking to help you understand and improve your mental wellbeing.",
    },
    {
      icon: Heart,
      title: "Professional Counseling",
      desc: "Access personalized care plans, crisis intervention, and workplace mental health support from certified professionals.",
    },
    {
      icon: Shield,
      title: "Digital Interventions",
      desc: "24/7 access to secure, science-backed digital tools and private conversations to support your mental health journey.",
    },
  ];

  // render layout
  return (
    <section
      aria-label="Features"
      className="section-bg py-5 position-relative"
      style={{ marginTop: 0, background: "#ffffff", paddingBottom: "3rem" }}
    >
      <div className="container">
        {/* Heading */}
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h2 className="fw-bold mb-3 text-dark" style={{ fontFamily: "heading" }}>
              Comprehensive Mental Health Care
            </h2>
            <p className="text-muted mb-5">
              Our platform offers a range of services designed to support your mental health journey.
            </p>
          </div>
        </div>

        {/* Content: left illustration, right feature cards */}
        <div className="row align-items-center g-5">
          <div
            className="overflow-hidden rounded"
            style={{
              width: "50%",
              transition: "transform 0.4s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={Personreading}
              alt="Person reading"
              className="img-fluid w-100"
              style={{
                objectFit: "cover",
                borderRadius: "0.75rem",
              }}
              data-testid="features-illustration"
            />

          </div>

          <div className="col-lg-6">
            <div className="row">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div className="col-12 col-mb-4" key={i}>
                    <div
                      className="feature-card d-flex align-items- mb-5"
                      data-testid={`feature-item-${i}`}
                      style={{
                        padding: "3rem",
                        border: "1px solid #e0e0e0",
                        borderRadius: "0.75rem",
                        backgroundColor: "#f9fdf9",
                      }}
                    >
                      {/* icon square */}
                      <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#3CB371",
                          borderRadius: 8,
                          color: "#fff",
                        }}
                        aria-hidden
                      >
                        <Icon size={18} className="text-white" />
                      </div>

                      {/* title + description */}
                      <div>
                        <h6 className="mb-1" style={{ fontSize: 15, fontWeight: 600, fontFamily: "heading" }}>
                          {f.title}
                        </h6>
                        <p className="mb-0 text-muted" style={{ fontSize: 14 }}>
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* subtle bottom gradient (unchanged) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 80,
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(230,255,237,0.7) 100%)",
        }}
        aria-hidden
      />
    </section>
  );
};

export default Features;