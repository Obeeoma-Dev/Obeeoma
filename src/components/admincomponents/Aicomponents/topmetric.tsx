// src/components/admincomponents/aimanagementcomponents/TopMetrics.tsx

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { BarChartFill, GraphUpArrow, ClockFill } from "react-bootstrap-icons"; // Bootstrap icons for visual polish

// Props interface for top-level metrics
interface TopMetricsProps {
  totalRecommendations: number;
  engagementRate: number;
  averageTime: string;
}

// Functional component with Bootstrap layout and icons
const TopMetrics: React.FC<TopMetricsProps> = ({
  totalRecommendations,
  engagementRate,
  averageTime,
}) => {
  return (
    // Row container for 3 equal-width cards
    <Row className="mb-4 g-4">
      {/* Card 1: Total Recommendations */}
      <Col md={4}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex align-items-center mb-2">
              <BarChartFill className="text-primary me-2" size={24} />
              <Card.Title className="mb-0 fw-semibold">
                Total Recommendations
              </Card.Title>
            </div>
            <Card.Text className="fs-4 fw-bold text-dark">
              {totalRecommendations.toLocaleString()}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Card 2: Engagement Rate */}
      <Col md={4}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex align-items-center mb-2">
              <GraphUpArrow className="text-success me-2" size={24} />
              <Card.Title className="mb-0 fw-semibold">
                Engagement Rate
              </Card.Title>
            </div>
            <Card.Text className="fs-4 fw-bold text-dark">
              {engagementRate}%
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Card 3: Average Engagement Time */}
      <Col md={4}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex align-items-center mb-2">
              <ClockFill className="text-warning me-2" size={24} />
              <Card.Title className="mb-0 fw-semibold">
                Avg Engagement Time
              </Card.Title>
            </div>
            <Card.Text className="fs-4 fw-bold text-dark">
              {averageTime}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TopMetrics;
