// Import React and required Bootstrap components
import React, { useState } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";

// Import chart components from Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Import the chart data type
import { ChartDataPoint } from "./admindashboard";

/**
 * PlatformUsageChart component renders a responsive line chart
 * Includes tab navigation for future expansion (organization growth, subscription revenue)
 */
const PlatformUsageChart: React.FC = () => {
  // Track which tab is currently active
  const [activeTab, setActiveTab] = useState<string>("platform");

  // Define tab options for chart navigation
  const tabs = [
    { id: "platform", label: "Platform Usage" },
    { id: "organization", label: "Organization Growth" },
    { id: "subscription", label: "Subscription Revenue" },
  ];

  // Sample data for platform usage over 6 weeks
  const chartData: ChartDataPoint[] = [
    { week: "Week 1", value: 1800 },
    { week: "Week 2", value: 2100 },
    { week: "Week 3", value: 2600 },
    { week: "Week 4", value: 2900 },
    { week: "Week 5", value: 3200 },
    { week: "Week 6", value: 3500 },
  ];

  return (
    // Bootstrap Card container for chart section
    <Card className="mb-4 shadow-sm border-0">
      {/* Card body contains tab navigation and chart */}
      <Card.Body>
        {/* Tab navigation using ButtonGroup */}
        <ButtonGroup className="mb-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="light"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`px-3 py-2 border-0 position-relative ${activeTab === tab.id ? "fw-semibold text-success" : "text-secondary"
                }`}
              style={{
                backgroundColor: "transparent",
                borderBottom: activeTab === tab.id ? "3px solid #3CB371" : "3px solid transparent",
                borderRadius: 0,
                transition: "border-bottom 0.2s ease",
                boxShadow: activeTab === tab.id ? "0 2px 0 #19875466" : "none",
              }}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>

        {/* Dynamic section header with green underline */}
        <h5
          className="fw-semibold text-dark mb-4 position-relative"
        >
          {activeTab === "platform" && "Weekly Platform Usage"}
          {activeTab === "organization" && "Monthly Organization Growth"}
          {activeTab === "subscription" && "Monthly Subscription Revenue"}
        </h5>

        {/* Render chart only when 'platform' tab is active */}
        {activeTab === "platform" && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Clean horizontal grid */}
              <CartesianGrid stroke="#dee2e6" strokeDasharray="0" vertical={false} />

              {/* X-axis with subtle styling */}
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: "#6c757d" }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y-axis with subtle styling */}
              <YAxis
                tick={{ fontSize: 12, fill: "#6c757d" }}
                axisLine={false}
                tickLine={false}
              />

              {/* Minimal tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  fontSize: "0.875rem",
                  color: "#212529",
                }}
              />

              {/* Flowing green fill + line */}
              <Area
                type="natural"
                dataKey="value"
                stroke="#198754"
                strokeWidth={3}
                fill="#198754"
                fillOpacity={0.1}
                dot={{ r: 3, stroke: "#198754", strokeWidth: 1, fill: "#ffffff" }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeTab === "organization" && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { week: "Week 1", value: 1200 },
                { week: "Week 2", value: 1500 },
                { week: "Week 3", value: 1800 },
                { week: "Week 4", value: 2100 },
                { week: "Week 5", value: 2400 },
                { week: "Week 6", value: 2700 },
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Horizontal grid only */}
              <CartesianGrid stroke="#dee2e6" strokeDasharray="0" vertical={false} />

              {/* X-axis: week labels */}
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: "#6c757d" }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y-axis: growth values */}
              <YAxis
                tick={{ fontSize: 12, fill: "#6c757d" }}
                axisLine={false}
                tickLine={false}
              />

              {/* Tooltip: styled like Bootstrap */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  fontSize: "0.875rem",
                  color: "#212529",
                }}
              />

              {/* Growth line: clean and smooth */}
              <Line
                type="natural"
                dataKey="value"
                stroke="#198754" // Bootstrap blue
                strokeWidth={3}
                dot={{ r: 3, stroke: "#198754", strokeWidth: 1, fill: "#ffffff" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {activeTab === "subscription" && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={[
                { week: "Week 1", value: 3200 },
                { week: "Week 2", value: 3500 },
                { week: "Week 3", value: 3900 },
                { week: "Week 4", value: 4200 },
                { week: "Week 5", value: 4600 },
                { week: "Week 6", value: 5000 },
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Horizontal grid only */}
              <CartesianGrid stroke="#dee2e6" strokeDasharray="0" vertical={false} />

              {/* X-axis: week labels */}
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: "#6c757d" }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y-axis: revenue values */}
              <YAxis
                tick={{ fontSize: 12, fill: "#6c757d" }}
                axisLine={false}
                tickLine={false}
              />

              {/* Tooltip: styled like Bootstrap */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  fontSize: "0.875rem",
                  color: "#212529",
                }}
              />

              {/* Revenue line with glowing fill */}
              <Area
                type="natural"
                dataKey="value"
                stroke="#198754" // Bootstrap green
                strokeWidth={3}
                fill="#198754"
                fillOpacity={0.1}
                dot={{ r: 3, stroke: "#198754", strokeWidth: 1, fill: "#ffffff" }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

// Export the component for use in the dashboard layout
export default PlatformUsageChart;
