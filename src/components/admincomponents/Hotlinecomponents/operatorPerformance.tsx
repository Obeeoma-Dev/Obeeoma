import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import "./hotline.css";

export interface Operator {
  name: string;
  performance: number;
  calls?: number;
}

const defaultOperators: Operator[] = [
  { name: "John Smith", performance: 92 },
  { name: "Emily Brown", performance: 85 },
  { name: "Michael Jones", performance: 78 },
  { name: "Sarah Doe", performance: 65 },
];

interface OperatorPerformanceProps {
  operators?: Operator[];
}

const OperatorPerformance: React.FC<OperatorPerformanceProps> = ({
  operators: operatorsProp,
}) => {
  const operators =
    Array.isArray(operatorsProp) && operatorsProp.length > 0
      ? operatorsProp
      : defaultOperators;
  return (
    <Card className="h-100 operator-performance-card mb-4">
      <Card.Body>
        <div className="mb-4" style={{ fontFamily: "heading" }}>
          <Card.Title>Operator Performance</Card.Title>
          <Card.Subtitle className="text-muted" style={{ fontFamily: "body" }}>
            Daily resolution rates and call volume
          </Card.Subtitle>
        </div>
        {operators.map((operator) => (
          <div key={operator.name} className="mb-4">
            <Row className="align-items-end mb-2">
              <Col>
                <div className="fw-semibold" style={{ fontFamily: "body" }}>
                  {operator.name}
                </div>
                <small className="text-muted" style={{ fontFamily: "body" }}>
                  {operator.calls != null
                    ? `${operator.calls} calls today`
                    : `${operator.performance} calls today`}
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
