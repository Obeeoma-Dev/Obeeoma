// EngagementStatsPanel.tsx
// Reusable bottom panel component for client engagement dashboard
// Shows top rewards, engagement trends, and streak statistics

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Award, TrendingUp, Flame, ArrowUp } from "lucide-react";

// Props interface
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

// Functional component
const EngagementStatsPanel: React.FC<EngagementStatsPanelProps> = ({
  topRewards,
  trends,
  streaks,
}) => {
  return (
    <Row className="g-4 mt-4">
      {/* Top Rewards Card */}
      <Col xs={12} sm={6} md={4}>
        <Card className="shadow-lg mb-3 h-100" style={{ fontFamily: 'body', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '1.5rem' }}>
          <Card.Body>
            <Award size={20} className="mb-2 text-primary" />
            <h5 className="mb-3 fw-semibold" style={{ fontSize: "1.125rem", color: "#212529", fontFamily: 'heading' }}>
              Top Rewards
            </h5>
            {topRewards.map((reward, index) => (
              <div
                key={reward.name}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span className="me-2" style={{ fontWeight: "bold", color: "#6c757d" }}>
                  #{index + 1}
                </span>
                <span>{reward.name}</span>
                <strong>{reward.points.toLocaleString()} pts</strong>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>

      {/* Engagement Trends Card */}
      <Col xs={12} sm={6} md={4}>
        <Card className="shadow-lg mb-3 h-100" style={{ fontFamily: 'body', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '1.5rem' }}>
          <Card.Body>
            <TrendingUp size={24} className="mb-2 text-primary" />
            <h5 className="mb-3 fw-bold" style={{ fontSize: '1.25rem' }}>Engagement Trends</h5>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-medium">Course Completion</span>
              <span className="text-success d-flex align-items-center fw-bold">
                <ArrowUp size={14} className="me-1" />
                +{trends.courseCompletion}%
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-medium">Reward Redemption</span>
              <span className="text-success d-flex align-items-center fw-bold">
                <ArrowUp size={14} className="me-1" />
                +{trends.rewardRedemption}%
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-medium">Member Activity</span>
              <span className="text-success d-flex align-items-center fw-bold">
                <ArrowUp size={14} className="me-1" />
                +{trends.memberActivity}%
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Streak Statistics Card */}
      <Col xs={12} sm={6} md={4}>
        <Card className="shadow-lg mb-3 h-100" style={{ fontFamily: 'body', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '1.5rem' }}>
          <Card.Body>
            <Flame size={20} className="mb-2 text-warning" />
            <h5 className="mb-3">Streak Statistics</h5>
            <div className="d-flex justify-content-between mb-3">
              <span>🔥 7-Day Streak</span>
              <strong>{streaks.sevenDay}%</strong>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>🔥 30-Day Streak</span>
              <strong>{streaks.thirtyDay}%</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>💧 60-Day Streak</span>
              <strong>{streaks.sixtyDay}%</strong>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EngagementStatsPanel;
