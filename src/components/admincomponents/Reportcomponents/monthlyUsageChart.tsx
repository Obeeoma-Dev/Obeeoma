// src/components/admincomponents/reportcomponents/MonthlyUsageChart.tsx

import React from "react";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyUsageChart: React.FC = () => {
  // Placeholder data for chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Platform Usage",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        backgroundColor: "#007bff",
      },
    ],
  };

  return (
    <Card className="mb-4" style={{ fontFamily: "heading" }}>
      <Card.Header>Monthly Platform Usage</Card.Header>
      <Card.Body>
        <Bar data={data} />
      </Card.Body>
    </Card>
  );
};

export default MonthlyUsageChart;
