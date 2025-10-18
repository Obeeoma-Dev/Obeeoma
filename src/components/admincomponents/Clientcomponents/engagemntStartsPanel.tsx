// EngagementStatsPanel.tsx
// Displays bottom panel with top rewards, engagement trends, and streak statistics

import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { FaArrowUp, FaFire, FaRedo } from "react-icons/fa";

// ✅ Define TypeScript interface for backend-ready props
interface EngagementStatsPanelProps {
  topRewards: Array<{ name: string; points: number }>;
  trends: {
    courseCompletion: number;
    rewardRedemption: number;
    memberActivity: number;
  };
  streaks: {
    sevenDay: number;
    thirtyDay: number;
    sixtyDay: number;
  };
}

// ✅ Functional component with props
const EngagementStatsPanel: React.FC<EngagementStatsPanelProps> = ({
  topRewards,
  trends,
  streaks,
}) => {
  return (
    <Row className="g-4 mt-4">
      {/* 🏆 Top Rewards Card */}
      <Col md={4}>
        <Card className="shadow-sm border-0 h-100">
          <Card.Body>
            <h5 className="mb-3 text-primary">Top Rewards</h5>
            <ListGroup variant="flush">
              {topRewards.map((reward) => (
                <ListGroup.Item key={reward.name}>
                  {reward.name} – {reward.points.toLocaleString()} pts
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>

      {/* 📈 Engagement Trends Card */}
      <Col md={4}>
        <Card className="shadow-sm border-0 h-100">
          <Card.Body>
            <h5 className="mb-3 text-success">Engagement Trends</h5>
            <p>
              <FaArrowUp className="text-success me-2" />
              Course Completion: +{trends.courseCompletion}%
            </p>
            <p>
              <FaArrowUp className="text-success me-2" />
              Reward Redemption: +{trends.rewardRedemption}%
            </p>
            <p>
              <FaArrowUp className="text-success me-2" />
              Member Activity: +{trends.memberActivity}%
            </p>
          </Card.Body>
        </Card>
      </Col>

      {/* 🔁 Streak Statistics Card */}
      <Col md={4}>
        <Card className="shadow-sm border-0 h-100">
          <Card.Body>
            <h5 className="mb-3 text-warning">Streak Statistics</h5>
            <p>
              <FaFire className="text-danger me-2" />
              7-Day Streak: {streaks.sevenDay}%
            </p>
            <p>
              <FaFire className="text-warning me-2" />
              30-Day Streak: {streaks.thirtyDay}%
            </p>
            <p>
              <FaRedo className="text-info me-2" />
              60-Day Streak: {streaks.sixtyDay}%
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EngagementStatsPanel;