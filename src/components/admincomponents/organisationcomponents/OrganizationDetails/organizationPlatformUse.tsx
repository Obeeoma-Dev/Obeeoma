import React from "react";
import { Card } from "react-bootstrap";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./organizationUse.css";

interface PlatformUsageData {
  week: string;
  usage: number;
}

interface PlatformUsageChartProps {
  data?: PlatformUsageData[];
}

// Functional component definition
export function PlatformUsageChart({ data = [] }: PlatformUsageChartProps) {
  return (
    <Card className="platform-usage-card">
      <Card.Body>
        {/* Chart title */}
        <Card.Title className="platform-usage-title">
          Platform Usage (Last 6 Weeks)
        </Card.Title>

        {/* Fixed-height container to control chart size */}
        <div className="program-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            {data.length > 0 ? (
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                {/* Gradient definition for area fill */}
                <defs>
                  <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#20c997" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#20c997" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Grid lines (horizontal only) */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e9ecef"
                />

                {/* X-axis configuration */}
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6c757d", fontSize: 12 }}
                />

                {/* Y-axis configuration */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6c757d", fontSize: 12 }}
                />

                {/* Tooltip styling */}
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                  }}
                />

                {/* Area (usage line + filled area) */}
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#20c997"
                  strokeWidth={3}
                  fill="url(#usageGradient)"
                />
              </AreaChart>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                <div className="text-center">
                  <p>No platform usage data available</p>
                  <small>Usage data will appear here once the organization starts using the platform</small>
                </div>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
