import React, { useEffect, useRef, useState } from "react";
// Importing images
import teamWellbeingImg from "../../assets/Images/team-wellbing.png";
import culturallyRelevantImg from "../../assets/Images/culturally-relevant.png";
import anonymousSecureImg from "../../assets/Images/padlock.png";
import aiInsightsImg from "../../assets/Images/ai-logo.png";
import responsiveAppImg from "../../assets/Images/smartphone.png";
import roiAnalyticsImg from "../../assets/Images/roi-analytics.png";

// Importing icons (from lucide react library)
import {
  Shield,
  Globe,
  Brain,
  Heart,
  Smartphone,
  BarChart,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

// Define array of benefits
const benefits = [
  {
    icon: Shield,
    title: "Anonymous & secure",
    description: "Private, encrypted, and fully anonymous.",
    image: anonymousSecureImg,
  },
  {
    icon: Globe,
    title: "Culturally Relevant",
    description: "Built for African workplaces and languages.",
    image: culturallyRelevantImg,
  },
  {
    icon: Brain,
    title: "AI Powered Insights",
    description: "Smart alerts and tailored suggestions.",
    image: aiInsightsImg,
  },
  {
    icon: Heart,
    title: "Team Wellbeing",
    description: "Track morale without breaching privacy",
    image: teamWellbeingImg,
  },
  {
    icon: Smartphone,
    title: "Responsive Application",
    description: "Works seamlessly across all devices.",
    image: responsiveAppImg,
  },
  {
    icon: BarChart,
    title: "ROI Analytics",
    description: "See impact on productivity and satisfaction",
    image: roiAnalyticsImg,
  },
];

// Duplicate for seamless looping
const extendedBenefits = [...benefits, ...benefits];

function BenefitCarousel() {
  const scrollRedf = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Added for hover effect

  useEffect(() => {
    const scrollContainer = scrollRedf.current;
    if (!scrollContainer) return;

    let rafId = 0;
    let scrollPosition = scrollContainer.scrollLeft || 0;
    const scrollSpeed = 0.35;

    const fullWidth = scrollContainer.scrollWidth;
    const halfWidth = fullWidth / 2;
    const singleCount = benefits.length;
    const approxCardWidth = halfWidth / singleCount || 300;

    const loop = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= halfWidth) scrollPosition -= halfWidth;

        scrollContainer.scrollLeft = scrollPosition;

        const idx = Math.floor(
          (scrollPosition / approxCardWidth) % singleCount,
        );
        if (idx !== activeIndex) setActiveIndex(idx);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  });

  const scrollToIndex = (index: number) => {
    const scrollContainer = scrollRedf.current;
    if (!scrollContainer) return;

    const singleCount = benefits.length;
    const halfWidth = scrollContainer.scrollWidth / 2;
    const cardWidth = halfWidth / singleCount;

    scrollContainer.scrollLeft = index * cardWidth;
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section
      className="py-5 bg-light"
      data-testid="benefits-section"
      aria-label="Benefits"
    >
      <div className="container overflow-hidden">
        <div className="text-center mb-4">
          <h2
            className="display-6 fw-bold mb-3"
            style={{ fontFamily: "heading" }}
          >
            Why Choose <span style={{ color: "#3CB371" }}>ObeeOma</span>
          </h2>
          <p className="text-muted lead mb-5">
            Everything your organization needs to build a mentally healthy
            workplace
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRedf}
          className="d-flex overflow-hidden px-2"
          onMouseEnter={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            gap: "1rem",
            paddingBottom: "1rem",
            position: "relative",
            overflowX: "visible",
            overflowY: "visible",
            whiteSpace: "nowrap",
            paddingTop: "1rem",
          }}
        >
          {extendedBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHovered = hoveredIndex === index; // Detect hover

            return (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: "none",
                  width: 300,
                  display: "inline-block",
                  transition: "transform 0.3s ease", // Smooth animation
                  transform: isHovered ? "scale(1.05)" : "scale(1)", // Enlarge on hover
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)} // Track hover start
                onMouseLeave={() => setHoveredIndex(null)} // Reset hover
                data-testid={`benefit-card-${index}`}
              >
                <div
                  className="card h-100 border-0 p-4 rounded-3 shadow-sm text-center"
                  style={{
                    position: "relative",
                    backgroundImage: benefit.image
                      ? `url(${benefit.image})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "#fff",
                  }}
                >
                  {/* Overlay for readability */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.4)",
                      borderRadius: "inherit",
                      zIndex: 0,
                    }}
                  />

                  {/* Content layer */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-4 mx-auto"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        backgroundColor: "#3CB371",
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={24} />
                    </div>

                    <h4 className="fw-semibold mb-2">{benefit.title}</h4>
                    <p className="mb-0 small">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination dots */}
        <div className="d-flex justify-content-center mt-4">
          {[...Array(benefits.length)].map((_, i) => (
            <div
              key={i}
              onClick={() => scrollToIndex(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: i === activeIndex ? "#0f9d59" : "#ccc",
                margin: "0 4px",
                transition: "background-color 200ms",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitCarousel;
