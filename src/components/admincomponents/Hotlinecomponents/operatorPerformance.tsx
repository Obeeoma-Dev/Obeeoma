import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import "./hotline.css";

interface Operator {
  name: string;
  performance: number;
}

const operators: Operator[] = [
  { name: "John Smith", performance: 92 },
  { name: "Emily Brown", performance: 85 },
  { name: "Michael Jones", performance: 78 },
  { name: "Sarah Doe", performance: 65 },
];

const OperatorPerformance: React.FC = () => {
  return (
    <Card className="h-100 operator-performance-card mb-4">
      <Card.Body>
        {/* Header */}
        <div className="mb-4" style={{ fontFamily: "heading" }}>
          <Card.Title>Operator Performance</Card.Title>
          <Card.Subtitle className="text-muted" style={{ fontFamily: "body" }}>
            Daily resolution rates and call volume
          </Card.Subtitle>
        </div>

        {/* Operator list */}
        {operators.map((operator) => (
          <div key={operator.name} className="mb-4">
            {/* Operator info row */}
            <Row className="align-items-end mb-2">
              <Col>
                <div className="fw-semibold" style={{ fontFamily: "body" }}>
                  {operator.name}
                </div>
                <small className="text-muted" style={{ fontFamily: "body" }}>
                  {operator.performance} calls today
                </small>
              </Col>

              <Col className="text-end">
                <div className="fw-bold" style={{ color: "#00A859" }}>
                  {operator.performance}%
                </div>
                <small
                  className="text-muted text-uppercase"
                  style={{ fontFamily: "body" }}
                >
                  Resolution Rate
                </small>
              </Col>
            </Row>

            {/* Progress bar */}
            <ProgressBar
              now={operator.performance}
              className="operator-progress"
            />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default OperatorPerformance;
