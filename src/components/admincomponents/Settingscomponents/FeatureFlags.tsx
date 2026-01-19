import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Card } from "react-bootstrap";

// Define the shape of a feature flag
interface FeatureFlag {
  id: string;
  label: string;
  enabled: boolean;
}

// Initial feature flags list
const defaultFlags: FeatureFlag[] = [
  { id: "assessments", label: "Assessments", enabled: true },
  { id: "subscriptionTiers", label: "Subscription Tiers", enabled: true },
  { id: "emailDelivery", label: "Email Delivery", enabled: true },
  { id: "notifications", label: "Notifications", enabled: true },
  { id: "hotline", label: "Hot Line", enabled: true },
  { id: "sanaai", label: "Sana Ai", enabled: true },
];

/* FeatureFlags component — renders toggle switches for each feature */
const FeatureFlags: React.FC = () => {
  // Load flags from localStorage or use default
  const [flags, setFlags] = useState<FeatureFlag[]>(() => {
    const stored = localStorage.getItem("featureFlags");
    return stored ? JSON.parse(stored) : defaultFlags;
  });

  // Save flags to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("featureFlags", JSON.stringify(flags));
  }, [flags]);

  // Toggle handler for each switch
  const handleToggle = (id: string) => {
    setFlags((prevFlags) =>
      prevFlags.map((flag) =>
        flag.id === id ? { ...flag, enabled: !flag.enabled } : flag,
      ),
    );
  };

  return (
    <Card className="settings-card-compact shadow-sm border-0">
      <Card.Header className="fw-semibold mb-2 ps-0">Feature Flags</Card.Header>


      <Form>
        <Container fluid>
          <Row className="g-2">
            {/* Loop through each flag and render a toggle switch */}
            {flags.map((flag) => (
              <Col md={6} lg={5} key={flag.id}>
                <div className="p-2 border rounded-2 bg-light-hover transition settings-section-compact">
                  <Form.Check
                    type="switch"
                    id={`switch-${flag.id}`}
                    label={flag.label}
                    checked={flag.enabled}
                    onChange={() => handleToggle(flag.id)}
                    className={
                      flag.enabled ? "text-success fw-500" : "text-muted"
                    }
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Form>
    </Card>
  );
};

export default FeatureFlags;
