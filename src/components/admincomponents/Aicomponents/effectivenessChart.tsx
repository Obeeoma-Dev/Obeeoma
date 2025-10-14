// Bar chart showing effectiveness by resource type

import React from 'react';
import { ProgressBar } from 'react-bootstrap';

interface ResourceEffectiveness {
  label: string;
  percentage: number;
}

interface EffectivenessChartProps {
  data: ResourceEffectiveness[];
}

const EffectivenessChart: React.FC<EffectivenessChartProps> = ({ data }) => (
  <div className="mb-4">
    <h5>Effectiveness by Resource Type</h5>
    {data.map((item) => (
      <div key={item.label} className="mb-2">
        <strong>{item.label}</strong>
        <ProgressBar now={item.percentage} label={`${item.percentage}%`} />
      </div>
    ))}
  </div>
);

export default EffectivenessChart;