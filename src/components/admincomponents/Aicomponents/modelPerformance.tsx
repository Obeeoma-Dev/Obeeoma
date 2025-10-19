// src/components/admincomponents/aimanagementcomponents/ModelPerformance.tsx

import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { Speedometer } from 'react-bootstrap-icons';

// Props interface for model performance data
interface ModelPerformanceProps {
  performance: { name: string; score: number }[];
}

// Functional component rendering model scores with visual polish
const ModelPerformance: React.FC<ModelPerformanceProps> = ({ performance }) => {
  return (
    <Card className="shadow-sm mb-4">
      {/* Section header with icon */}
      <Card.Header className="fw-semibold d-flex align-items-center">
        <Speedometer className="me-2 text-primary" size={20} />
        AI Model Performance
      </Card.Header>

      {/* List of model scores */}
      <Card.Body className="p-0">
        <ListGroup variant="flush">
          {performance.map((model) => (
            <ListGroup.Item
              key={model.name}
              className="d-flex justify-content-between align-items-center"
            >
              {/* Model name */}
              <span>{model.name}</span>

              {/* Score badge with dynamic color */}
              <Badge
                bg={
                  model.score >= 85
                    ? 'success'
                    : model.score >= 70
                      ? 'warning'
                      : 'danger'
                }
              >
                {model.score}%
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ModelPerformance;