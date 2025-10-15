// src/components/admincomponents/Hotline-activity/CallReasonsChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

const data = {
  labels: ['Anxiety', 'Depression', 'Other', 'Abuse', 'Grief'],
  datasets: [
    {
      label: 'Call Reasons (%)',
      data: [30, 25, 15, 20, 10],
      backgroundColor: '#198754',
    },
  ],
};

const options = {
  responsive: true,
  indexAxis: 'y' as const,
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};

const CallReasonsChart: React.FC = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h5>Call Reasons (%)</h5>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default CallReasonsChart;