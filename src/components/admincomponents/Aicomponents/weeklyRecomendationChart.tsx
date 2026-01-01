// src/components/admincomponents/aimanagementcomponents/WeeklyRecommendationsChart.tsx

// React import required for JSX
import React from 'react'

// React-Bootstrap Card for layout consistency across the app
import { Card } from 'react-bootstrap'

// Line chart component from react-chartjs-2
import { Line } from 'react-chartjs-2'

// Core Chart.js modules that must be registered manually
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Import component-specific CSS (no Tailwind)
import './aicomponent.css'

// Register Chart.js components once
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
)

// Chart data (visuals only — backend can replace this later)
const chartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Recommendations Sent',
      data: [245, 312, 289, 340, 298, 360],
      borderColor: '#0d9488', // refined green (matches previous chart)
      backgroundColor: 'rgba(13,148,136,0.15)',
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#0d9488',
      pointBorderWidth: 2,
    },
  ],
}

// Chart display options (no functional changes)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#ffffff',
      titleColor: '#111827',
      bodyColor: '#374151',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
      },
      ticks: {
        stepSize: 50,
        color: '#6b7280',
        font: {
          size: 12,
        },
      },
    },
  },
}

// Functional component definition
const WeeklyRecommendationsChart: React.FC = () => {
  return (
    <Card className="weekly-recommendations-card">
      <Card.Body>
        {/* Header section */}
        <div className="weekly-recommendations-header">
          <h3 className="weekly-recommendations-title">
            Weekly Recommendations
          </h3>
          <p className="weekly-recommendations-subtitle">
            Volume of AI suggestions over the last 6 weeks
          </p>
        </div>

        {/* Chart container with fixed height */}
        <div className="weekly-recommendations-chart">
          <Line data={chartData} options={chartOptions} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default WeeklyRecommendationsChart
