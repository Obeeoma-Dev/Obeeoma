// Import React and required Bootstrap components
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

// Import icons from lucide-react
import * as Icons from "lucide-react";

// Import the BottomMetricCard type
import { BottomMetricCard } from "./admindashboard";

/**
 * Props interface for BottomMetrics component
 * Accepts an array of BottomMetricCard objects
 */
interface BottomMetricsProps {
  metrics: BottomMetricCard[];
}

/**
 * BottomMetrics component displays four metric cards at the bottom of the dashboard
 * Each card shows a key metric with a link to view more details
 */
const BottomMetrics: React.FC<BottomMetricsProps> = ({ metrics }) => {
  return (
    // Section wrapper with bottom margin
    <section className="mb-4">
      {/* Bootstrap grid layout for metric cards */}
      <Row className="gy-4">
        {/* Map through metrics array and render each card */}
        {metrics.map((metric) => {
          // Dynamically get the icon component from lucide-react
          const IconComponent = (Icons[metric.icon as keyof typeof Icons] ??
            Icons.Activity) as React.FC<{ size?: number; color?: string }>;

          // Define Bootstrap contextual color
          const colorMap: Record<string, string> = {
            emerald: "#059669",
            blue: "#0d6efd",
            purple: "#6f42c1",
            pink: "#d63384",
          };

          // Fallback to emerald if color not found
          const iconColor = colorMap[metric.color] || colorMap.emerald;

          return (
            // Responsive column for each metric card
            <Col key={metric.id} xs={12} md={6} lg={3}>
              {/* Bootstrap Card container */}
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  {/* Top section: icon and title */}
                  <div className="d-flex align-items-start gap-3 mb-3">
                    {/* Icon container with background */}
                    <div
                      className="rounded p-2 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "#e6f4ea",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <IconComponent size={20} color={iconColor} />
                    </div>

                    {/* Metric title */}
                    <div>
                      <h6 className="text-muted mb-0">{metric.title}</h6>
                    </div>
                  </div>

                  {/* Main value */}
                  <h3 className="fw-bold mb-2">{metric.value}</h3>

                  {/* Subtitle */}
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

// Export the component for use in the dashboard layout
export default BottomMetrics;
