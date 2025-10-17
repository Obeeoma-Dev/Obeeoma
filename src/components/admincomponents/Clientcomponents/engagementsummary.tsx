// EngagementSummary.tsx
// Displays top-level client engagement metrics

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Define the component using React.FC for type safety
const EngagementSummary: React.FC = () => {
  return (
    <Card className="mb-4">
      {/* Card header with dashboard title */}
      <Card.Header>
        <h2>Client Engagement & Rewards</h2>
      </Card.Header>

      {/* Card body with metrics laid out in a responsive grid */}
      <Card.Body>
        <Row>
          <Col md={4}>
            <strong>Engagement Rate:</strong> 78%
          </Col>
          <Col md={4}>
            <strong>Active Reward Programs:</strong> 12
          </Col>
          <Col md={4}>
            <strong>Total Points Redeemed:</strong> 285,432
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EngagementSummary;
