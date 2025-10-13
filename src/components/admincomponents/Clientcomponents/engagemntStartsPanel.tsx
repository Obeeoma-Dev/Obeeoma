// EngagementStatsPanel.tsx
// Displays bottom panel with top rewards, engagement trends, and streak statistics

import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

// Define the component using React.FC for type safety
const EngagementStatsPanel: React.FC = () => {
  return (
    <Card className="mt-4">
      {/* Card body with three columns for stats */}
      <Card.Body>
        <Row>
          {/* Top Rewards List */}
          <Col md={4}>
            <h5>Top Rewards</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>Madison Carano – 1,200 pts</ListGroup.Item>
              <ListGroup.Item>William Johnson – 980 pts</ListGroup.Item>
              <ListGroup.Item>Preston Corbett – 870 pts</ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Engagement Trends */}
          <Col md={4}>
            <h5>Engagement Trends</h5>
            <p>Weekly Engagement: +5%</p>
            <p>Monthly Engagement: +12%</p>
            <p>Reward Activity: +8%</p>
          </Col>

          {/* Streak Statistics */}
          <Col md={4}>
            <h5>Streak Statistics</h5>
            <p>7-Day Streak: 65%</p>
            <p>30-Day Streak: 45%</p>
            <p>60-Day Streak: 30%</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EngagementStatsPanel;
