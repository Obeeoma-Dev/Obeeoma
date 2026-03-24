import React from "react";
import { useList } from "@refinedev/core";
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

interface PlatformUsageRecord {
  id: string;
  date: string;
  activeUsers: number;
}

const PlatformUsageChart: React.FC = () => {
  const { query, result } = useList<PlatformUsageRecord>({
    resource: "platform-usage",
  });

  const { isLoading, isError } = query;
  const records = result?.data ?? [];

  if (isLoading) {
    return (
      <Card className="shadow-sm border-0 text-center p-5">
        <Spinner animation="border" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-sm border-0 text-center p-5 text-danger">
        Start logging to load platform usage data.
      </Card>
    );
  }

  if (!records.length) {
    return (
      <Card className="shadow-sm border-0 text-center p-5">
        No platform usage data available.
      </Card>
    );
  }

  const labels = records.map((item) => item.date);
  const values = records.map((item) => item.activeUsers);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Active Users",
        data: values,
        backgroundColor: "#3CB371",
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
          Daily Platform Usage
        </h5>

        <div style={{ height: "400px" }}>
          <Bar data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlatformUsageChart;
