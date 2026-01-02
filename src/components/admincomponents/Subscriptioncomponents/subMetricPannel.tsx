// src/components/admincomponents/subscriptioncomponents/subMetricPannel.tsx

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Define the props interface for flexibility and backend readiness
interface MetricsPanelProps {
  totalOrganizations: number;
  totalSubscriptions: number;
  coveredEmployees: string;
  utilizationRate: number;
}

/**
 * MetricsPanel Component
 *
 * Displays key subscription metrics in a card layout matching the design specification.
 * Each metric card shows the main value with a percentage change indicator and icon.
 */
const MetricsPanel: React.FC<MetricsPanelProps> = ({
  totalOrganizations,
  totalSubscriptions,
  coveredEmployees,
  utilizationRate,
}) => {
  return (
    <Row className="mb-4 g-3">
      {/* Total Organizations Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Card.Title className="text-muted small fw-normal mb-0">
                Total Organizations
              </Card.Title>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3CB371",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6h12M3 9h12M3 12h8M15 3H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="fw-bold fs-4 mb-1">{totalOrganizations}</div>
            <div className="text-success small fw-medium">
              +12% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Total Subscriptions Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Card.Title className="text-muted small fw-normal mb-0">
                Total Subscriptions
              </Card.Title>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3CB371",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="12"
                    height="10"
                    rx="1"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M3 7h12M6 4V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1v2"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="fw-bold fs-4 mb-1">{totalSubscriptions}</div>
            <div className="text-success small fw-medium">
              +8% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Covered Employees Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Card.Title className="text-muted small fw-normal mb-0">
                Covered Employees
              </Card.Title>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3CB371",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9"
                    cy="6"
                    r="3"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="fw-bold fs-4 mb-1">{coveredEmployees}</div>
            <div className="text-success small fw-medium">
              +5% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Utilization Rate Metric Card */}
      <Col md={3}>
        <Card className="h-100 shadow-sm border-0">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Card.Title className="text-muted small fw-normal mb-0">
                Utilization Rate
              </Card.Title>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#3CB371",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 15L6 9l3 3 6-9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="fw-bold fs-4 mb-1">{utilizationRate}%</div>
            <div className="text-success small fw-medium">
              +3% from last month
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default MetricsPanel;
