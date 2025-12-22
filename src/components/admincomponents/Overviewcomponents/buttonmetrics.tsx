// Import React and required Bootstrap components
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as Icons from "lucide-react";

// Import the BottomMetricCard type from your shared dashboard types
import { BottomMetricCard } from "./admindashboard";

/**
 * Props interface for BottomMetrics component
 * Accepts an array of BottomMetricCard objects
 */
const BottomMetrics: React.FC<{ metrics: BottomMetricCard[] }> = ({
  metrics,
}) => {
  // Define color palette for icons
  const colorMap: Record<string, string> = {
    emerald: "#3CB371",
    blue: "#3CB371",
    purple: "#3CB371",
    pink: "#3CB371",
  };

  return (
    <section className="mb-4">
      {/* Bootstrap grid layout with vertical spacing between rows */}
      <Row className="gy-4">
        {metrics.map((metric) => {
          // Dynamically select icon from lucide-react
          const IconComponent = (Icons[metric.icon as keyof typeof Icons] ??
            Icons.Activity) as React.FC<{
            size?: number;
            color?: string;
          }>;

          // Resolve icon color from palette
          const iconColor = colorMap[metric.color] || colorMap.emerald;

          return (
            <Col key={metric.id} xs={12} md={6} lg={3}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  {/* Top section: icon and title */}
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <div
                      className="rounded d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <IconComponent size={20} color={iconColor} />
                    </div>
                    <h6 className="text-muted fw-semibold mb-0">
                      {metric.title}
                    </h6>
                  </div>

                  {/* Main value */}
                  <h3 className="fw-bold mb-2">{metric.value}</h3>

                  {/* Subtitle */}
                  <p className="text-muted small mb-2">{metric.subtitle}</p>

                  {/* Link CTA */}
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

export default BottomMetrics;
