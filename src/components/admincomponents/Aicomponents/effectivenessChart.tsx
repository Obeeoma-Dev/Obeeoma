// src/components/admincomponents/aimanagementcomponents/EffectivenessChart.tsx

import React from "react"
import { Bar } from "react-chartjs-2"
import { Card } from "react-bootstrap"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const BAR_COLORS = [
  "rgba(13, 110, 253, 0.5)",  // Blue
  "rgba(25, 135, 84, 0.5)",   // Green
  "rgba(255, 193, 7, 0.5)",   // Yellow
  "rgba(111, 66, 193, 0.5)",  // Purple
  "rgba(220, 53, 69, 0.5)",   // Red
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
        <h5 className="fw-semibold" style={{ fontFamily: 'heading' }}>Effectiveness by Resource Type (%)</h5>
        <p className="text-muted small mb-4" style={{ fontFamily: 'body' }}>
          Comparison of engagement across different media formats
        </p>
        <Bar data={data} options={options} style={{ fontFamily: 'body' }} />
      </Card.Body>
    </Card>
  )
}

export default EffectivenessChart