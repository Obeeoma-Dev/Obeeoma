// src/components/admincomponents/reportcomponents/TreatmentOutcomesChart.tsx

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
  TooltipItem,
} from "chart.js";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TreatmentOutcomesChart: React.FC = () => {
  // Data for treatment outcomes matching the design
  const data = {
    labels: [
      "Significant Improvement",
      "Moderate Improvement",
      "Slight Improvement",
      "No Change",
      "Worsened",
    ],
    datasets: [
      {
        label: "Count",
        data: [42, 28, 11, 6, 3],
        backgroundColor: "#3CB371",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            return `${context.parsed.y ?? 0} patients`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 15,
          callback: function (value: number | string) {
            return value;
          },
        },
        grid: {
          color: "#e9ecef",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Card
      style={{
        border: "none",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Card.Body style={{ padding: "1.5rem" }}>
        <h5
          style={{
            fontFamily: "heading",
            color: "#1a1a1a",
            marginBottom: "1.5rem",
          }}
        >
          Treatment Outcomes (Last 6 Months)
        </h5>
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default TreatmentOutcomesChart;

