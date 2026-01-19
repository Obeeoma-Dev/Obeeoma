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

const OrganizationPerformanceChart: React.FC = () => {
 
  const data = {
    labels: [
      "Wellness Center",
      "Community Health",
      "Urban Outreach",
      "Mental Health Clinic",
      "Corporate Wellness",
    ],
    datasets: [
      {
        label: "Performance Score",
        data: [85, 78, 72, 68, 65],
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
            return `Score: ${context.parsed.y ?? 0}/100`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
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
          Organization Performance Score
        </h5>
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrganizationPerformanceChart;

