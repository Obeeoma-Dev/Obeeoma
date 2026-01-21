// src/components/ProgramEngagementChart.tsx

// Import React (required for JSX)
import React from "react";

// Import Card component from react-bootstrap
import { Card } from "react-bootstrap";

// Import required chart components from Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Import component-specific CSS (NO Tailwind)
import "./organizationUse.css";

// Chart data definition
// Each object represents one bar in the chart
const data = [
  { name: "AM", full: "Anxiety Management", value: 52 },
  { name: "SR", full: "Stress Reduction", value: 45 },
  { name: "SI", full: "Sleep Improvement", value: 38 },
  { name: "M", full: "Mindfulness", value: 28 },
  { name: "CS", full: "Crisis Support", value: 18 },
];

// Functional component definition
export function ProgramEngagementChart() {
  // JSX returned by the component
  return (
    // React-Bootstrap Card wrapper
    <Card className="program-card">
      {/* Card body for proper Bootstrap spacing */}
      <Card.Body>
        {/* Chart title */}
        <Card.Title className="program-title">
          Program Engagement (%)
        </Card.Title>

        {/* Fixed-height container for responsive chart */}
        <div className="program-chart-container">
          {/* Makes the chart automatically resize */}
          <ResponsiveContainer width="100%" height="100%">
            {/* Bar chart definition */}
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              {/* Background grid lines */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#dee2e6"
              />

              {/* X-axis configuration */}
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                angle={0}
                textAnchor="middle"
                height={60}
                tick={({ x, y, payload }) => {
                  const full = data.find((d) => d.name === payload.value)?.full;
                  return (
                    <text
                      x={x}
                      y={y + 10}
                      textAnchor="middle"
                      fill="#6c757d"
                      fontSize={11}
                    >
                      {/* SVG way to show hover tooltip on text */}
                      {full && <title>{full}</title>}
                      {payload.value}
                    </text>
                  );
                }}
              />

              {/* Y-axis configuration */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6c757d",
                  fontSize: 12,
                }}
              />

              {/* Tooltip shown on hover */}
              <Tooltip
                cursor={{ fill: "#f8f9fa" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div
                        style={{
                          backgroundColor: "#fff",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
                          fontSize: "0.85rem",
                          color: "#212529",
                        }}
                      >
                        <strong>{item.full}</strong>: {item.value}%
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Bar configuration */}
              <Bar
                dataKey="value"
                fill="#3CB371"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
