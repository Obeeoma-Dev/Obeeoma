// src/components/admincomponents/Hotline-activity/HourlyCallChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale);

// Placeholder data for hourly call volume
const data = {
  labels: [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ],
  datasets: [
    {
      label: "Calls",
      data: [2, 4, 6, 3, 5, 7, 4, 6, 5, 3, 2],
      backgroundColor: "#00A859",
      borderRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false, // remove vertical grid lines
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

const HourlyCallChart: React.FC = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h5>Hourly Call Volume</h5>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default HourlyCallChart;
