// src/components/admincomponents/Hotline-activity/TopMetrics.tsx
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

// Define the props interface for flexibility and future backend integration
interface TopMetricsProps {
  totalCalls: number;
  avgCallTime: string;
  missedCalls: number;
}

const TopMetrics: React.FC<TopMetricsProps> = ({ totalCalls, avgCallTime, missedCalls }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          {/* Display total calls */}
          <Col md={4}>
            <h5>Total Calls</h5>
            <p>{totalCalls}</p>
          </Col>

          {/* Display average call time */}
          <Col md={4}>
            <h5>Average Call Time</h5>
            <p>{avgCallTime}</p>
          </Col>

          {/* Display missed calls */}
          <Col md={4}>
            <h5>Missed Calls</h5>
            <p>{missedCalls}</p>
          </Col>
        </Row>

        {/* Button to trigger scheduling logic */}
        <Button variant="success" className="mt-3">
          New Schedule
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TopMetrics;