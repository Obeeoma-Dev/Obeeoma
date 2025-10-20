import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * OrganizationCharts component displays two charts:
 * - Line chart for organization growth over time
 * - Bar chart for client distribution across organizations
 * Uses placeholder data for now, ready for backend integration later.
 */
const OrganizationCharts: React.FC = () => {
  // 📈 Line chart data for organization growth
  const growthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Organization Growth",
        data: [5, 10, 15, 25, 35, 42],
        borderColor: "#28a745", // Bootstrap green
        backgroundColor: "rgba(40,167,69,0.2)", // Transparent green fill
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // 📊 Bar chart data for client distribution
  const distributionData = {
    labels: ["Wellness Center", "Community Mental Health", "Urban Outreach"],
    datasets: [
      {
        label: "Clients",
        data: [284, 194, 134],
        backgroundColor: ["#28a745", "#218838", "#1e7e34"], // Varying greens
        borderRadius: 4, // Rounded bars
      },
    ],
  };

  // ✅ Chart options for consistent styling
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6c757d", // Muted gray
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false, // We use Card titles instead
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6c757d",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6c757d",
        },
        grid: {
          color: "#e9ecef",
        },
      },
    },
  };

  return (
    <Row className="mt-4">
      {/* 📈 Line Chart Card */}
      <Col md={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body>
            <Card.Title className="text-success fw-semibold fs-6 mb-3">
              Organization Growth
            </Card.Title>
            <Line data={growthData} options={chartOptions} />
          </Card.Body>
        </Card>
      </Col>

      {/* 📊 Bar Chart Card */}
      <Col md={6} className="mb-4">
        <Card className="shadow-sm h-100">
          <Card.Body>
            <Card.Title className="text-success fw-semibold fs-6 mb-3">
              Client Distribution by Organization
            </Card.Title>
            <Bar data={distributionData} options={chartOptions} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrganizationCharts;