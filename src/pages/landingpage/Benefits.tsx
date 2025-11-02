import React, { useEffect, useRef, useState } from "react";

// Importing icons (from lucide react library).
import {
  Shield,
  Globe,
  Brain,
  Heart,
  Smartphone,
  BarChart,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

// Define an array of benifit. 
const benefits = [
  { icon: Shield, title: "Anonymous & secure", description: "Private, encrypted, and fully anonymous." },
  { icon: Globe, title: "Culturally Relevant", description: "Built for African workplaces and languages." },
  { icon: Brain, title: "AI Powered Insights", description: "Smart alerts and tailored suggestions." },
  { icon: Heart, title: "Team Wellbeing", description: "Track morale without breaching privacy" },
  { icon: Smartphone, title: "Responsive Application", description: "Works seamlessly across all devices." },
  { icon: BarChart, title: "ROI Analytics", description: "See impact on productivity and satisfaction" },
];

// duplicate for seamless looping.
const extendedBenefits = [...benefits, ...benefits];
const useImages = true;

function BenefitCarousel() {
  // A reference to the scroll container.
  const scrollRedf = useRef<HTMLDivElement | null>(null);

  // Track which card is active for pagination dots.
  const [activeIndex, setActiveIndex] = useState(0);

  // Pause scrolling when true.
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRedf.current;
    if (!scrollContainer) return;

    let rafId = 0;
    let scrollPosition = scrollContainer.scrollLeft || 0;

    // Tune the speed.
    const scrollSpeed = 0.35;

    // Using duplicated content to loop back.
    const fullWidth = scrollContainer.scrollWidth;
    const halfWidth = fullWidth / 2;

    const singleCount = benefits.length;
    // approximate card width = halfWidth / singleCount (only original set)
    const approxCardWidth = halfWidth / singleCount || 300;

    const loop = () => {
      if (!isPaused) {
        // Update the scroll position
        scrollPosition += scrollSpeed;

        // Wrap scroll position for seamless looping.
        if (scrollPosition >= halfWidth) {
          scrollPosition -= halfWidth;
        }

        // Apply scroll to DOM
        scrollContainer.scrollLeft = scrollPosition;

        // update pagination dot.
        const idx = Math.floor((scrollPosition / approxCardWidth) % singleCount);
        if (idx !== activeIndex) {
          // setActiveIndex can be called here.
          setActiveIndex(idx);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  });

  return (
    <section className="py-5 bg-light" data-testid="benefits-section" aria-label="Benefits">
      <div className="container overflow-hidden">
        <div className="text-center mb-4">
          <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: "heading" }}>Mental health Features</h2>
          <p className="text-muted lead mb-5">Everything your organization needs to build a mentally healthy workplace</p>
        </div>

        {/* Carousel (pause on hover) */}
        <div
          ref={scrollRedf}
          className="d-flex overflow-hidden px-2"
          onMouseEnter={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            // No snaps and only a continuous scroll
            gap: "1rem",
            paddingBottom: "1rem",
            position: "relative",
            overflowX: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {extendedBenefits.map((benefit, index) => {

            // Dynamically render the icons.
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  scrollSnapAlign: "none",
                  width: 300,
                  display: "inline-block",
                }}
                data-testid={`benefit-card-${index}`}
              >
                <div className="card h-100 border-0 bg-white p-4 rounded-3 shadow-sm text-center">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-4 mx-auto"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundImage: useImages ? `url(/images/bg-${index % benefits.length}.jpg)` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={24} />
                  </div>

                  <h4 className="fw-semibold mb-2">{benefit.title}</h4>
                  <p className="text-muted mb-0 small">{benefit.description}</p>
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
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: i === activeIndex ? "#0f9d59" : "#ccc",
                margin: "0 4px",
                transition: "background-color 200ms",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitCarousel;
