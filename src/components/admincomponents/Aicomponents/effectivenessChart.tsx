// src/components/admincomponents/aimanagementcomponents/EffectivenessChart.tsx

import React from "react"
import { Bar } from "react-chartjs-2"
import { Card } from "react-bootstrap"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const BAR_COLORS = [
  "#0d6efd", // Articles - Bootstrap primary
  "#198754", // Videos - Bootstrap success
  "#ffc107", // Audio - Bootstrap warning
  "#6f42c1", // Interactive - Bootstrap purple
  "#dc3545", // Worksheets - Bootstrap danger
]

const data = {
  labels: ["Videos", "Articles", "Audio", "Interactive", "Worksheets"],
  datasets: [
    {
      label: "Effectiveness (%)",
      data: [85, 70, 60, 50, 40], // Replace with your actual values
      backgroundColor: BAR_COLORS,
      borderRadius: 6,
      maxBarThickness: 30,
    },
  ],
}

const options = {
  indexAxis: "y" as const, // Horizontal bars
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
}

const EffectivenessChart: React.FC = () => {
  return (
    <Card className="mb-4 shadow-sm h-100">
      <Card.Body>
        <h5 className="fw-semibold">Effectiveness by Resource Type (%)</h5>
        <p className="text-muted small mb-4">
          Comparison of engagement across different media formats
        </p>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  )
}

export default EffectivenessChart