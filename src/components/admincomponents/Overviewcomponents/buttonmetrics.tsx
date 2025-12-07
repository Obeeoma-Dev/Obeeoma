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
const BottomMetrics: React.FC<{ metrics: BottomMetricCard[] }> = ({ metrics }) => {
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
      <Row className="g-4">
        {metrics.map((metric) => {
          // Dynamically select icon from lucide-react
          const IconComponent =
            (Icons[metric.icon as keyof typeof Icons] ?? Icons.Activity) as React.FC<{
              size?: number;
              color?: string;
            }>;

          // Resolve icon color from palette
          const iconColor = colorMap[metric.color] || colorMap.emerald;

          return (
            <Col key={metric.id} xs={12} md={6} lg={3}>
              <Card className="shadow-sm border-0 h-100" style={{ transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)'}>
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  {/* Top section: icon and title */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: "44px", height: "44px", backgroundColor: '#f0f5f2' }}
                    >
                      <IconComponent size={22} color={iconColor} />
                    </div>
                    <h6 className="text-muted fw-500 mb-0" style={{ fontSize: '0.85rem', fontFamily: 'body' }}>{metric.title}</h6>
                  </div>

                  {/* Main value */}
                  <h3 className="fw-bold mb-2" style={{ fontSize: '1.75rem', color: '#1a1a1a', fontFamily: 'body' }}>{metric.value}</h3>

                  {/* Subtitle */}
                  <p className="text-muted small mb-3" style={{ fontSize: '0.85rem', fontFamily: 'body' }}>{metric.subtitle}</p>

                  {/* Link CTA */}
                  <Button
                    variant="link"
                    className="p-0 text-success d-flex align-items-center gap-2 fw-500"
                    style={{ fontSize: '0.9rem' }}
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