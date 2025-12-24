// src/components/admincomponents/aimanagementcomponents/EffectivenessChart.tsx

import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { BarChartFill } from "react-bootstrap-icons";

// ✅ Type for each resource effectiveness entry
interface ResourceEffectiveness {
  label: string;
  percentage: number;
}

// ✅ Props interface for chart component
interface EffectivenessChartProps {
  data: ResourceEffectiveness[];
}

// ✅ Functional component with Bootstrap layout and icons
const EffectivenessChart: React.FC<EffectivenessChartProps> = ({ data }) => {
  return (
    <Card className="shadow-sm h-100">
      {/* ✅ Card header with icon and title */}
      <Card.Header className="fw-semibold d-flex align-items-center">
        <BarChartFill className="me-2 text-primary" size={20} />
        Effectiveness by Resource Type (%)
      </Card.Header>

      {/* ✅ Card body with progress bars */}
      <Card.Body>
        {data.map((item) => (
          <div key={item.label} className="mb-3">
            <strong>{item.label}</strong>
            <ProgressBar
              now={item.percentage}
              label={`${item.percentage}%`}
              variant={
                item.percentage >= 80
                  ? "success"
                  : item.percentage >= 60
                    ? "warning"
                    : "danger"
              }
              className="mt-1"
            />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default EffectivenessChart;
