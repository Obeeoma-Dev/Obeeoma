// src/components/admincomponents/Hotline-activity/OperatorPerformance.tsx
import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

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
    <Card className="mb-4">
      <Card.Body>
        <h5>Operator Performance</h5>
        {operators.map((op) => (
          <div key={op.name} className="mb-2">
            <strong>{op.name}</strong>
            <ProgressBar now={op.performance} label={`${op.performance}%`} />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default OperatorPerformance;
