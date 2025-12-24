// src/components/admincomponents/aimanagementcomponents/WeeklyRecommendationsChart.tsx

import React from "react";
import { Card } from "react-bootstrap";
import { Line } from "react-chartjs-2"; // Chart.js integration
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

// Sample chart data (replace with backend data later)
<<<<<<< HEAD
const employeeData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
=======
const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
>>>>>>> main
  datasets: [
    {
      label: "Recommendations Sent",
      data: [245, 312, 289, 340, 298, 360],
      borderColor: "#198754",
      backgroundColor: "rgba(25,135,84,0.2)",
      tension: 0.3,
      pointRadius: 4,
    },
  ],
};

// Chart options for styling
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 50,
      },
    },
  },
};

// Functional component with chart integration
const WeeklyRecommendationsChart: React.FC = () => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="fw-semibold">
        Weekly Recommendations (Last 6 Weeks)
      </Card.Header>
      <Card.Body>
        <Line data={employeeData} options={chartOptions} />
      </Card.Body>
    </Card>
  );
};

export default WeeklyRecommendationsChart;
