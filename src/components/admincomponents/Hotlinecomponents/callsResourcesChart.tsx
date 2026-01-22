import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const BAR_COLORS = [
  "#3CB371",
  "#198754",
  "#9DD3AF",
  "#0B6E45",
  "#00A859",
];

const data = {
  labels: ["Anxiety", "Depression", "Other", "Abuse", "Grief"],
  datasets: [
    {
      label: "Call Reasons (%)",
      data: [30, 25, 15, 20, 10],
      backgroundColor: BAR_COLORS,
      borderRadius: 6,
      maxBarThickness: 40,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
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
