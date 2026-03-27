import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

/* ============================
   TYPES
============================ */

interface UserEngagementData {
  total_users?: number;
  active_users?: number;
  engagement_rate?: number;
  new_signups?: number;
  retention_rate?: number;
  monthly_data?: Array<{
    month: string;
    new_signups: number;
    active_users: number;
  }>;
}

interface NewUserRecord {
  id: string;
  month: string;
  users: number;
}

interface ReturningUsersSummary {
  id: string;
  total: number;
  percentageChange?: number;
}

/* ============================
   COMPONENT
============================ */

const UserEngagement: React.FC<{ data?: UserEngagementData }> = ({ data }) => {
  // Generate chart data from backend data
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "New Signups",
        data: data?.monthly_data?.map(item => item.new_signups) || [65, 78, 90, 81, 96, 85, 102, 114, 95, 108, 125, 118],
        borderColor: "#3CB371",
        backgroundColor: "rgba(60, 179, 113, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Active Users",
        data: data?.monthly_data?.map(item => item.active_users) || [120, 135, 128, 142, 156, 165, 158, 172, 185, 178, 192, 205],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#e9ecef",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const engagementPercentage = data?.engagement_rate
    ? (data.engagement_rate * 100).toFixed(1)
    : "0.0";
  const retentionPercentage = data?.retention_rate
    ? (data.retention_rate * 100).toFixed(1)
    : "0.0";

  return (
    <div>
      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-primary mb-1">{data?.total_users || 0}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-success mb-1">{data?.active_users || 0}</h3>
              <p className="text-muted mb-0">Active Users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-info mb-1">{engagementPercentage}%</h3>
              <p className="text-muted mb-0">Engagement Rate</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-warning mb-1">{retentionPercentage}%</h3>
              <p className="text-muted mb-0">Retention Rate</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card className="shadow-sm border-0" style={{ borderRadius: "12px" }}>
        <Card.Body style={{ padding: "1.5rem" }}>
          <h5
            style={{
              fontFamily: "heading",
              color: "#1a1a1a",
              marginBottom: "1.5rem",
            }}
          >
            User Engagement Trends
          </h5>
          <div style={{ height: "400px" }}>
            <Line data={chartData} options={options} />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserEngagement;
