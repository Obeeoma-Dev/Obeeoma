// Import React to enable JSX and component creation
import React from "react";

// Import required React-Bootstrap components
import { Card, Row, Col } from "react-bootstrap";

/**
 * Props interface for a single statistic card
 * - label: description of the stat (e.g., "Total Clients")
 * - value: numeric or string value to display
 */
interface StatCardProps {
  label: string;
  value: string | number;
}

/**
 * Reusable StatCard component
 * Displays a label and a value inside a Bootstrap Card
 */
function StatCard({ label, value }: StatCardProps) {
  return (
    // Bootstrap Card component used instead of Tailwind-based Card
    <Card className="p-3" style={{ fontFamily: "body" }}>
      {/* Card body provides proper Bootstrap spacing */}
      <Card.Body>
        {/* Small muted text for the label */}
        <Card.Text className="text-muted mb-2">{label}</Card.Text>

        {/* Large bold text for the statistic value */}
        <Card.Title as="h2">{value}</Card.Title>
      </Card.Body>
    </Card>
  );
}

/**
 * OrganizationStats component
 */
export function OrganizationStats() {
  return (
    <Row style={{ fontFamily: "body" }} className="mb-4">
      <Col xs={12} className="mb-3">
        <StatCard label="Total Clients" value="245" />
      </Col>
      <Col xs={12}>
        <StatCard label="Active Programs" value="8" />
      </Col>
    </Row>
  );
}
