import React from "react"; // React import required to use JSX

import {
  Network,
  Brain,
  Users,
  Calendar,
  TrendingUp,
  Heart,
} from "lucide-react"; // lucide-react icon components
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap grid & utility classes

// Define the shape of a benefit item. Use a React component type for the icon.
interface Benefit {
  icon: React.ComponentType<{ size?: number; className?: string }>; // icon component type
  title: string; // card title
  description: string; // card description
}

// Benefits functional component (default export)
const Benefits: React.FC = () => {
  // Array of benefit items to render; swap icon components here if needed.
  const benefits: Benefit[] = [
    {
      icon: Network,
      title: "Anonymous & secure", // card title text
      description:
        "End-to-end encryption ensures complete privacy and anonymity for all user interactions.", // card description text
    },
    {
      icon: Network,
      title: "Culturally Relevant", // title
      description:
        "Built specifically for African workplace cultures with local mental health practices and languages.", // description
    },
    {
      icon: Network,
      title: "AI Powered Insights", // title
      description:
        "Advanced AI provides personalized recommendations and identifies early warning signs.", // description
    },
    {
      icon: Network,
      title: "Team Wellbeing", // title
      description:
        "Track team morale and wellness trends without compromising individual privacy.", // description
    },
    {
      icon: Network,
      title: "Responsive Application", // title
      description:
        "A responsive application adapts its layout across devices for a consistent user experience.", // description
    },
    {
      icon: Network,
      title: "ROI Analytics", // title
      description:
        "Measure the impact of mental health initiatives on productivity and employee satisfaction.", // description
    },
  ];

  // Render the benefits section using Bootstrap responsive grid
  return (
    <section
      // Accessible section wrapper with spacing and light background
      className="py-5 bg-light"
      data-testid="benefits-section"
      aria-label="Benefits"
      // inline style kept minimal so Prettier/ESLint don't complain about unused classes
      style={{ marginBottom: 0 }}
    >
      <div className="container">
        {/* Header area: centered heading + subheading */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Comprehensive Obeeoma Features</h2>
          <p className="text-muted lead mb-5">
            Everything your organization needs to build a mentally healthy workplace
          </p>
        </div>

        {/* Grid of benefit cards */}
        <div className="row g-4">
          {benefits.map((benefit, index) => {
            // Extract icon component for this benefit item
            const Icon = benefit.icon;
            return (
              <div
                // Each card column: full width on xs, two per row on md, three per row on lg
                key={index}
                className="col-md-6 col-lg-4"
                data-testid={`benefit-card-${index}`}
              >
                <div
                  // Card container: white background, rounded corners, subtle shadow
                  className="card h-100 border-0 bg-white p-4 rounded-3 shadow-sm"
                  role="group"
                  aria-labelledby={`benefit-title-${index}`}
                >
                  {/* Icon container: white circular background with subtle border to match Figma */}
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: 64, // fixed diameter for visual consistency
                      height: 64,
                      borderRadius: "50%", // make it circular
                      background: "#ffffff", // white background to create the 'white round border' look
                      border: "1px solid rgba(15,157,89,0.06)", // faint green border
                      marginBottom: 16, // spacing under the icon
                    }}
                    aria-hidden="true"
                  >
                    {/* Render chosen icon inside the circular container */}
                    <Icon className="text-success" size={20} />
                  </div>

                  {/* Title text */}
                  <h4 id={`benefit-title-${index}`} className="h5 mb-3">
                    {benefit.title}
                  </h4>

                  {/* Description text */}
                  <p className="text-muted mb-0 small">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;