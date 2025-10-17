// Displays top-level metrics like total recommendations, engagement rate, etc.

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

interface TopMetricsProps {
  totalRecommendations: number;
  engagementRate: number;
  averageTime: string;
}

const TopMetrics: React.FC<TopMetricsProps> = ({
  totalRecommendations,
  engagementRate,
  averageTime,
}) => (
  <Row className="mb-4">
    <Col md={4}>
      <Card>
        <Card.Body>
          <Card.Title>Total Recommendations</Card.Title>
          <Card.Text>{totalRecommendations}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card>
        <Card.Body>
          <Card.Title>Engagement Rate</Card.Title>
          <Card.Text>{engagementRate}%</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card>
        <Card.Body>
          <Card.Title>Avg Engagement Time</Card.Title>
          <Card.Text>{averageTime}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

export default TopMetrics;