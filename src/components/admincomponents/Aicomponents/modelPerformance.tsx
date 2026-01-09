import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import "./aicomponent.css";

interface ScoreItem {
  name: string;
  score: number;
}

interface ModelPerformanceProps {
  performance: ScoreItem[];
}

const ModelPerformance: React.FC<ModelPerformanceProps> = ({ performance }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="mb-4" style={{ fontFamily: "heading" }}>
          <Card.Title>AI Model Performance</Card.Title>
          <Card.Subtitle className="text-muted" style={{ fontFamily: "body" }}>
            Key metrics for evaluating model effectiveness
          </Card.Subtitle>
        </div>

        {performance.map((item) => (
          <div key={item.name} className="mb-4">
            <Row className="align-items-center mb-2">
              <Col>
                <div className="fw-semibold" style={{ fontFamily: "body" }}>
                  {item.name}
                </div>
              </Col>
              <Col xs="auto">
                <div className="fw-bold text-dark">{item.score}%</div>
              </Col>
            </Row>
            <ProgressBar
              now={item.score}
              variant={
                item.score >= 85
                  ? "success"
                  : item.score >= 70
                    ? "primary"
                    : item.score >= 60
                      ? "warning"
                      : "danger"
              }
              className="thin-progress"
            />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default ModelPerformance;
