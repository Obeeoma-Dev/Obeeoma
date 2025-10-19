// EngagementSummary.tsx
// Displays top-level client engagement metrics in a horizontal card layout

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Define TypeScript interface for props (backend-ready)
interface EngagementSummaryProps {
  engagementRate: number;
  activePrograms: number;
  totalPoints: number;
}

// Functional component with props for dynamic rendering
const EngagementSummary: React.FC<EngagementSummaryProps> = ({
  engagementRate,
  activePrograms,
  totalPoints,
}) => {
  return (
    <div className="mb-4">
      {/* Section title */}
      <h2 className="mb-3">Client Engagement & Rewards</h2>

      {/* Responsive row of metric cards */}
      <Row className="g-3">
        {/* Engagement Rate Card */}
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h5 className="text-success">Engagement Rate</h5>
              <h3 className="fw-bold">{engagementRate}%</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* Active Programs Card */}
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h5 className="text-success">Active Reward Programs</h5>
              <h3 className="fw-bold">{activePrograms}</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Points Redeemed Card */}
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <h5 className="text-success">Rewards Assisted</h5>
              <h3 className="fw-bold">{totalPoints.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EngagementSummary;