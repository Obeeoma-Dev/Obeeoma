import React from "react";
import { Card, Spinner, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { useList, useOne } from "@refinedev/core";
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

const UserEngagement: React.FC = () => {
  /* ---- New Users Query ---- */
  const { query: newUsersQuery, result: newUsersResult } =
    useList<NewUserRecord>({
      resource: "new-users",
    });

  /* ---- Returning Users Query ---- */
  const { query: returningQuery, result: returningResult } =
    useOne<ReturningUsersSummary>({
      resource: "returning-users",
      id: "summary",
    });

  const isLoading = newUsersQuery.isLoading || returningQuery.isLoading;

  const isError = newUsersQuery.isError || returningQuery.isError;

  const newUsers = newUsersResult?.data ?? [];
  const returningUsers = returningResult;

  /* ============================
     LOADING STATE
  ============================ */

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center p-5">
          <Spinner animation="border" />
        </Card.Body>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="text-center p-5 text-danger">
          Failed to load user engagement data.
        </Card.Body>
      </Card>
    );
  }

  /* ============================
     CHART DATA
  ============================ */

  const labels = newUsers.map((d) => d.month);
  const values = newUsers.map((d) => d.users);

  const chartData = {
    labels,
    datasets: [
      {
        label: "New Organizations",
        data: values,
        borderColor: "#3CB371",
        backgroundColor: "rgba(60,179,113,0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#3CB371",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y?.toLocaleString()} sign-ups`,
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

  const totalReturning = returningUsers?.total ?? 0;
  const percentageChange = returningUsers?.percentageChange;
  const isPositive = (percentageChange ?? 0) >= 0;

  /* ============================
     RENDER
  ============================ */

  return (
    <div>
      {/* Page Title */}
      <h4
        style={{
          fontFamily: "heading",
          marginBottom: "1.5rem",
        }}
      >
        User Engagement
      </h4>

      <Row className="g-4">
        {/* Returning Users KPI */}
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body
              style={{
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <h6 style={{ marginBottom: "1rem" }}>
                Returning Users (Last 6 Months)
              </h6>

              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#3CB371",
                }}
              >
                {totalReturning.toLocaleString()}
              </h1>

              {percentageChange !== undefined && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    color: isPositive ? "#28a745" : "#dc3545",
                    fontWeight: 500,
                  }}
                >
                  {isPositive ? "▲" : "▼"} {Math.abs(percentageChange)}% vs
                  previous period
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* New Users Trend */}
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body style={{ padding: "1.5rem" }}>
              <h6 style={{ marginBottom: "1.5rem" }}>
                New Organizations Signed Up (Last 6 Months)
              </h6>

              <div style={{ height: "350px" }}>
                <Line data={chartData} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserEngagement;
