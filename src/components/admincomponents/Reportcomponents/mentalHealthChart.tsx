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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MentalHealthChart: React.FC = () => {
  const data = {
    labels: [
      "Anxiety",
      "Depression",
      "PTSD",
      "Bipolar",
      "ADHD",
      "OCD",
      "Other",
    ],
    datasets: [
      {
        label: "Distribution (%)",
        data: [35, 28, 12, 8, 6, 5, 5],
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
            return `${context.parsed.y ?? 0}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 36,
        ticks: {
          stepSize: 9,
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
          Mental Health Condition Distribution (%)
        </h5>
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MentalHealthChart;
