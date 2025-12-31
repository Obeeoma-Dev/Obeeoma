// Import React and necessary hooks
import React, { useState, useEffect } from "react";

// Import Bootstrap components
import { Form, Row, Col, Container, Card } from "react-bootstrap";

// Define the shape of a feature flag
interface FeatureFlag {
  id: string;
  label: string;
  enabled: boolean;
}

// Initial feature flags list
const defaultFlags: FeatureFlag[] = [
  { id: "featureFlags", label: "Feature Flags", enabled: true },
  { id: "subscriptionTiers", label: "Subscription Tiers", enabled: true },
  { id: "multipleProducts", label: "Multiple Products", enabled: true },
  { id: "customTrialLengths", label: "Custom Trial Lengths", enabled: true },
  { id: "trialExtension", label: "Trial Extension", enabled: true },
  { id: "trialConversion", label: "Trial Conversion", enabled: true },
  { id: "emailCustomization", label: "Email Customization", enabled: true },
  { id: "emailTemplates", label: "Email Templates", enabled: true },
  { id: "emailDelivery", label: "Email Delivery", enabled: true },
  { id: "emailMetrics", label: "Email Metrics", enabled: true },
  { id: "emailLogs", label: "Email Logs", enabled: true },
  { id: "emailSuppression", label: "Email Suppression", enabled: true },
  { id: "emailThrottling", label: "Email Throttling", enabled: true },
  { id: "emailRetry", label: "Email Retry", enabled: true },
  { id: "emailAlias", label: "Email Alias", enabled: true },
];

/**
 * FeatureFlags component — renders toggle switches for each feature
 * with persistent state and custom styling
 */
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
      
      {/* Bootstrap form container */}
      <Form>
        <Container fluid>
          <Row className="g-2">
            {/* Loop through each flag and render a toggle switch */}
            {flags.map((flag) => (
              <Col md={6} lg={5} key={flag.id}>
                <div className="p-2 border rounded-2 bg-light-hover transition settings-section-compact">
                  <Form.Check
                    type="switch" // Render as a toggle switch
                    id={`switch-${flag.id}`} // Unique ID for accessibility
                    label={flag.label} // Display label next to the switch
                    checked={flag.enabled} // Controlled checked state
                    onChange={() => handleToggle(flag.id)} // Toggle handler
                    className={flag.enabled ? "text-success fw-500" : "text-muted"} // Color feedback
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
