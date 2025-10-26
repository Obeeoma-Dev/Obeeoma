// Import React and required Bootstrap components
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

// Import all icons from lucide-react as a dynamic map
import * as Icons from "lucide-react";

// Import the BottomMetricCard type definition
import { BottomMetricCard } from "./admindashboard";

/**
 * Props interface for BottomMetrics component
 * Accepts an array of BottomMetricCard objects
 */
interface BottomMetricsProps {
  metrics: BottomMetricCard[];
}

/**
 * BottomMetrics component displays a grid of metric cards
 * Each card shows a key metric with icon, value, subtitle, and link
 */
const BottomMetrics: React.FC<BottomMetricsProps> = ({ metrics }) => {
  return (
    // Section wrapper with bottom margin
    <section className="mb-4">
      {/* Bootstrap grid layout for responsive cards */}
      <Row className="gy-4">
        {metrics.map((metric) => {
          // Dynamically select icon from lucide-react
          const IconComponent =
            (Icons[metric.icon as keyof typeof Icons] ??
              Icons.Activity) as React.FC<{ size?: number; color?: string }>;

          // Define color palette for icons and backgrounds
          const colorMap: Record<string, string> = {
            emerald: "#3CB371",
            blue: "#3CB371",
            purple: "#3CB371",
            pink: "#3CB371",
          };


          // Fallbacks for unknown color keys
          const iconColor = colorMap[metric.color] || colorMap.emerald;
          // const iconBgColor = bgColorMap[metric.color] || bgColorMap.emerald;

          return (
            // Responsive column for each card
            <Col key={metric.id} xs={12} md={6} lg={3}>
              {/* Card container with hover effect */}
              <Card className="shadow-sm border-0 h-90 hover-shadow">
                <Card.Body>
                  {/* Top section: icon and title */}
                  <div className="d-flex align-items-start gap-2 mb-2">
                    {/* Icon container with background color */}
                    <div
                      className="rounded d-flex align-items-center justify-content-center"
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    >
                      <IconComponent size={24} color={iconColor} />
                    </div>

                    {/* Metric title */}
                    <div>
                      <h6 className="text-muted fw-semibold mb-1">
                        {metric.title}
                      </h6>
                    </div>
                  </div>

                  {/* Main metric value */}
                  <h3 className="fw-bold display-6 mb-2">{metric.value}</h3>

                  {/* Subtitle or description */}
                  <p className="text-muted small mb-3">{metric.subtitle}</p>

                  {/* Link button with arrow icon */}
                  <Button
                    variant="link"
                    className="p-0 text-success d-flex align-items-center gap-2"
                  >
                    <span>{metric.linkText}</span>
                    <Icons.ArrowRight size={16} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

// Export the component for use in dashboard layout
export default BottomMetrics;