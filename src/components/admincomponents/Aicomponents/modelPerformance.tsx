// Displays model performance percentages

import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface ModelPerformanceProps {
  performance: { name: string; score: number }[];
}

const ModelPerformance: React.FC<ModelPerformanceProps> = ({ performance }) => (
  <div className="mb-4">
    <h5>AI Model Performance</h5>
    <ListGroup>
      {performance.map((model) => (
        <ListGroup.Item key={model.name}>
          {model.name}: {model.score}%
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default ModelPerformance;