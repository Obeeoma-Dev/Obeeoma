// src/components/admincomponents/subscriptioncomponents/MetricsPanel.tsx

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// Define the props interface for flexibility and backend readiness
interface MetricsPanelProps {
  totalOrganizations: number;
  totalSubscriptions: number;
  coveredEmployees: string;
  utilizationRate: number;
}

// Functional component to display metrics
const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalOrganizations,
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
}) => {
  return (
    <Row className="mb-4">
      {/* Each metric is displayed in a Bootstrap Card */}
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Total Organizations</Card.Title>
            <Card.Text>{totalOrganizations}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Total Subscriptions</Card.Title>
            <Card.Text>{totalSubscriptions}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Covered Employees</Card.Title>
            <Card.Text>{coveredEmployees}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Utilization Rate</Card.Title>
            <Card.Text>{utilizationRate}%</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MetricsPanel;