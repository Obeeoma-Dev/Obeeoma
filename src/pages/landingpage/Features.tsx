import React from "react";
import { Shield, Globe, Sparkles, Heart, BarChart } from "lucide-react"; // icons used for items
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
    { icon: Shield, title: "Subscription", desc: "Receive a care plan based on your specific needs and goals." },
    { icon: BarChart, title: "Progress Tracking", desc: "Monitor your mental health journey with tools that help track your progress and celebrate your achievements." },
    { icon: Sparkles, title: "Crisis Support", desc: "Immediate access to professional crisis intervention and local mental health resources." },
    { icon: Heart, title: "Mood Tracking", desc: "Daily mood logging with insights and trends to help you understand your mental health patterns." },
    { icon: Shield, title: "Complete Privacy", desc: "Your information and conversations are protected with bank-level security and strict privacy controls." },
    // { icon: Globe, title: "Expert Providers", desc: "Connect with licensed therapists, psychiatrists and counselors specialized in mental health." },
    { icon: Sparkles, title: "Self Assessments", desc: "Regular mental health check-ins and personalized wellness recommendations." },
    { icon: Heart, title: "Workplace Support", desc: "Tools and programs to improve team wellbeing, reduce burnout and boost productivity." },
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
        <div className="row align-items-start g-4">
          <div className="col-lg-6">
            <img
              src={Personreading}
              alt="Person reading"
              className="img-fluid rounded shadow-sm"
              style={{ width: "100%", height: "30%", objectFit: "none" }}
              data-testid="features-illustration"
            />
          </div>

          <div className="col-lg-6">
            <div className="row">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div className="col-12 col-md-6" key={i}>
                    <div
                      className="d-flex align-items-start bg-white rounded shadow-sm p-3 mb-3"
                      style={{ minHeight: 72 }}
                      data-testid={`feature-item-${i}`}
                    >
                      {/* icon square */}
                      <div
                        className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: "#00A859",
                          borderRadius: 8,
                          color: "#fff",
                        }}
                        aria-hidden
                      >
                        <Icon size={18} className="text-white" />
                      </div>

                      {/* title + description */}
                      <div>
                        <h6 className="mb-1" style={{ fontSize: 14, fontWeight: 600, fontFamily: "heading" }}>
                          {f.title}
                        </h6>
                        <p className="mb-0 text-muted" style={{ fontSize: 13 }}>
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