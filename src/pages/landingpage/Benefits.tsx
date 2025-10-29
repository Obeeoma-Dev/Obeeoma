import React from "react"; // React import for JSX
import {
  Shield,
  Brain,
  Users,
  Calendar,
  TrendingUp,
  Heart,
  LucideIcon,
} from "lucide-react"; // Import icons we'll use
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles

// TypeScript interface for benefit items
interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Benefits: React.FC = () => {
  // Define benefits data matching the design
  const benefits: Benefit[] = [
    {
      icon: Shield,
      title: "Anonymous & secure",
      description: "End-to-end encryption ensures complete privacy and anonymity for all user interactions.",
    },
    {
      icon: Brain,
      title: "Culturally Relevant",
      description: "Built specifically for African workplace cultures with local mental health practices and languages.",
    },
    {
      icon: Users,
      title: "AI Powered Insights",
      description: "Advanced AI provides personalized recommendations and identifies early warning signs.",
    },
    {
      icon: Calendar,
      title: "Team Wellbeing",
      description: "Track team morale and wellness trends without compromising individual privacy.",
    },
    {
      icon: TrendingUp,
      title: "Responsive Application",
      description: "A responsive application is one that adapts its layout and design to deferent devices and screen sizes for a consistent user experience.",
    },
    {
      icon: Heart,
      title: "ROI Analytics",
      description: "Measure the impact of mental health initiatives on productivity and employee satisfaction.",
    },
  ];

  return (
    <section className="py-5 bg-light" data-testid="benefits-section">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">
            Comprehensive Obeeoma Features
          </h2>
          <p className="text-muted lead mb-5">
            Everything your organization needs to build a mentally healthy workplace
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="col-md-6 col-lg-4"
              data-testid={`benefit-card-${index}`}
            >
              <div className="card h-100 border-0 bg-white p-4">
                {/* Icon Circle */}
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 p-3 mb-4"
                  style={{ width: "64px", height: "64px" }}
                >
                  <benefit.icon
                    className="text-success"
                    size={24}
                  />
                </div>

                {/* Content */}
                <h4 className="h5 mb-3">{benefit.title}</h4>
                <p className="text-muted mb-0 small">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;