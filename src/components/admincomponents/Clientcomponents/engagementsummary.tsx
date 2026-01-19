// Displays top-level client engagement metrics in a horizontal card layout

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { TrendingUp, Award, Gift } from "lucide-react";
import "./engagement.css";

interface EngagementSummaryProps {
  engagementRate: number;
  activePrograms: number;
  totalPoints: number;
}

const EngagementSummary: React.FC<EngagementSummaryProps> = ({
  engagementRate,
  activePrograms,
  totalPoints,
}) => {
  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <div className="mb-4" style={{ fontFamily: "heading" }}>
        <h2>Client Engagement & Rewards</h2>
        <p className="text-muted" style={{ fontFamily: "body" }}>
          Monitor client activity and reward program performance.
        </p>
      </div>

      <Row className="mb-4">
        {/* Engagement Rate */}
        <Col md={4}>
          <Card
            className="shadow-sm border-0 rounded-2"
            style={{ fontFamily: "body" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-badge icon-green">
                  <TrendingUp size={24} />
                </div>
                <small className="text-success fw-medium">+5% this week</small>
              </div>

              <div className="mt-3 metric-value">{engagementRate}%</div>
              <p className="text-muted mb-0">Engagement Rate</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Active Programs */}
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-2">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-badge icon-blue">
                  <Award size={24} />
                </div>
                <small className="text-success fw-medium">+2 this month</small>
              </div>

              <div className="mt-3 metric-value">{activePrograms}</div>
              <p className="text-muted mb-0">Active Reward Programs</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Rewards Assisted */}
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-2">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-badge icon-purple">
                  <Gift size={24} />
                </div>
                <small className="text-success fw-medium">
                  +15% this month
                </small>
              </div>

              <div className="mt-3 metric-value">
                {totalPoints.toLocaleString()}
              </div>
              <p className="text-muted mb-0">Rewards Assisted</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EngagementSummary;
