import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface PlatformUsageData {
  daily_active_users?: number;
  weekly_active_users?: number;
  monthly_active_users?: number;
  total_sessions?: number;
  average_session_duration?: string;
}

interface PlatformUsageRecord {
  id: string;
  date: string;
  activeUsers: number;
}

const PlatformUsageChart: React.FC<{ data?: PlatformUsageData }> = ({
  data,
}) => {
  // Generate chart data from backend data
  const chartData = {
    labels: [
      "Daily Active",
      "Weekly Active",
      "Monthly Active",
      "Total Sessions",
    ],
    datasets: [
      {
        label: "Platform Usage Metrics",
        data: [
          data?.daily_active_users || 0,
          data?.weekly_active_users || 0,
          data?.monthly_active_users || 0,
          data?.total_sessions || 0,
        ],
        backgroundColor: ["#3CB371", "#28a745", "#17a2b8", "#6c757d"],
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y?.toLocaleString()} users`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
        grid: { color: "#e9ecef" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <Card.Body style={{ padding: "1.5rem" }}>
        <h5
          style={{
            fontFamily: "heading",
            color: "#1a1a1a",
            marginBottom: "1.5rem",
          }}
        >
          Platform Usage Overview
        </h5>

        <div style={{ height: "400px" }}>
          <Bar data={chartData} options={options} />
        </div>

        {data?.average_session_duration && (
          <div className="mt-3 text-center">
            <small className="text-muted">
              Average Session Duration: {data.average_session_duration}
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PlatformUsageChart;
