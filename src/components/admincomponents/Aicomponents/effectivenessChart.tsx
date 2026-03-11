import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BAR_COLORS = ["#9DD3AF", "#00A859", "#3CB371", "#0B6E45"];

const defaultData = {
  labels: ["Videos", "Articles", "Audio", "Interactive"],
  datasets: [
    {
      label: "Effectiveness (%)",
      data: [85, 70, 60, 50],
      backgroundColor: BAR_COLORS,
      borderRadius: 6,
      maxBarThickness: 30,
    },
  ],
};

// Horizontal bars
const options = {
  indexAxis: "y" as const,
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: { display: false },
    },
    y: {
      grid: { display: false },
    },
  },
};

interface EffectivenessChartProps {
  effectivenessByType?: Array<{
    resource_type?: string;
    avg_effectiveness?: number;
  }>;
}

const EffectivenessChart: React.FC<EffectivenessChartProps> = ({
  effectivenessByType,
}) => {
  const labels = effectivenessByType?.length
    ? effectivenessByType
        .map((t) => (t.resource_type || "").replace(/_/g, " "))
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    : defaultData.labels;
  const values = effectivenessByType?.length
    ? effectivenessByType.map((t) => Number(t.avg_effectiveness) || 0)
    : defaultData.datasets[0].data;
  const data = {
    labels,
    datasets: [
      {
        label: "Effectiveness (%)",
        data: values,
        backgroundColor: values.map(
          (_, i) => BAR_COLORS[i % BAR_COLORS.length],
        ),
        borderRadius: 6,
        maxBarThickness: 30,
      },
    ],
  };
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Body>
        <h5 className="fw-semibold" style={{ fontFamily: "heading" }}>
          Effectiveness by Resource Type (%)
        </h5>
        <p className="text-muted small mb-4" style={{ fontFamily: "body" }}>
          Comparison of engagement across different media formats
        </p>
        <Bar data={data} options={options} style={{ fontFamily: "body" }} />
      </Card.Body>
    </Card>
  );
};

export default EffectivenessChart;
