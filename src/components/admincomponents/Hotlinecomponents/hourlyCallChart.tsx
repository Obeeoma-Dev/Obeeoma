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

const defaultLabels = [
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
];
const defaultData = [2, 4, 6, 3, 5, 7, 4, 6, 5, 3, 2];

const hourLabels = Array.from({ length: 24 }, (_, i) => {
  const h = i % 12 || 12;
  const am = i < 12 ? " AM" : " PM";
  return `${h}${am}`;
});

const options = {
  responsive: true,
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: { display: false },
    },
  },
};

interface HourlyCallChartProps {
  hourlyVolume?: number[];
}

const HourlyCallChart: React.FC<HourlyCallChartProps> = ({ hourlyVolume }) => {
  const values =
    Array.isArray(hourlyVolume) && hourlyVolume.length > 0
      ? hourlyVolume
      : defaultData;
  const labels =
    values.length === 24
      ? hourLabels
      : values.length <= defaultLabels.length
        ? defaultLabels.slice(0, values.length)
        : values.map((_, i) => `${i}:00`);
  const data = {
    labels: labels.slice(0, values.length),
    datasets: [
      {
        label: "Calls",
        data: values,
        backgroundColor: "#00A859",
        borderRadius: 6,
      },
    ],
  };
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
