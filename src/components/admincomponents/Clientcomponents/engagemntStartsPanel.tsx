// EngagementStatsPanel.tsx
// Reusable bottom panel for client engagement dashboard
// Shows engagement trends and streak statistics

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { TrendingUp, Flame, ArrowUp } from "lucide-react";
import "./engagement.css";

interface EngagementStatsPanelProps {
  trends: {
    courseCompletion: number;
    memberActivity: number;
  };
  streaks: {
    sevenDay: number;
    thirtyDay: number;
    sixtyDay: number;
  };
}

const defaultTrends = { courseCompletion: 0, memberActivity: 0 };
const defaultStreaks = { sevenDay: 0, thirtyDay: 0, sixtyDay: 0 };

const EngagementStatsPanel: React.FC<EngagementStatsPanelProps> = ({
  trends = defaultTrends,
  streaks = defaultStreaks,
}) => {
  return (
    <Row className="g-4 mt-4">
      {/* Engagement Trends Card */}
      <Col xs={12} sm={6} md={6}>
        <Card
          className="shadow-lg mb-3 h-100"
          style={{
            fontFamily: "body",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "1.5rem",
          }}
        >
          <Card.Body>
            <div className="icon-circle mb-3">
              <TrendingUp size={24} />
            </div>
            <h5 className="mb-3 fw-bold" style={{ fontSize: "1.25rem" }}>
              Engagement Trends
            </h5>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-medium">Course Completion</span>
              <span className="text-success d-flex align-items-center fw-bold">
                <ArrowUp size={14} className="me-1" />+{trends.courseCompletion}
                %
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-medium">Member Activity</span>
              <span className="text-success d-flex align-items-center fw-bold">
                <ArrowUp size={14} className="me-1" />+{trends.memberActivity}%
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Streak Statistics Card */}
      <Col xs={12} sm={6} md={6}>
        <Card
          className="shadow-lg mb-3 h-100"
          style={{
            fontFamily: "heading",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "1.5rem",
          }}
        >
          <Card.Body>
            {/* Reuse the same circular icon style */}
            <div className="icon-circle mb-3">
              <Flame size={20} />
            </div>

            <h5 className="mb-3">Streak Statistics</h5>

            <div className="d-flex justify-content-between mb-3">
              <span>🔥 7+ Day Streak</span>
              <strong>{streaks.sevenDay}</strong>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span>🔥 14+ Day Streak</span>
              <strong>{streaks.thirtyDay}</strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>🔥 30+ Day Streak</span>
              <strong>{streaks.sixtyDay}</strong>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EngagementStatsPanel;
