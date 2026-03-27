import React, { useState, useEffect } from "react";
import { Card, ButtonGroup, Button, Spinner } from "react-bootstrap";

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

import {
  EmployeeDataPoint,
  PlatformUsageData,
  SubscriptionRevenueData,
  MonthlyDataPoint
} from "./admindashboard";
import { adminDashboardAPI } from "../../../api/adminapiConfig";

interface PlatformUsageChartProps {
  platformUsageData?: PlatformUsageData[];
  subscriptionRevenueData?: SubscriptionRevenueData[];
}

const PlatformUsageChart: React.FC<PlatformUsageChartProps> = ({
  platformUsageData,
  subscriptionRevenueData
}) => {
  // Track which tab is currently active
  const [activeTab, setActiveTab] = useState<string>("platform");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for API data
  const [apiPlatformUsage, setApiPlatformUsage] = useState<PlatformUsageData[]>([]);
  const [apiSubscriptionRevenue, setApiSubscriptionRevenue] = useState<SubscriptionRevenueData[]>([]);

  // Define tab options for chart navigation
  const tabs = [
    { id: "platform", label: "Platform Usage" },
    { id: "organization", label: "Organization Growth" },
    { id: "subscription", label: "Subscription Revenue" },
  ];

  // Fetch dashboard overview data on component mount
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminDashboardAPI.getDashboardOverview();
        const data = response.data;

        setApiPlatformUsage(data.platform_usage || []);
        setApiSubscriptionRevenue(data.subscription_revenue || []);
      } catch (err) {
        console.error("Failed to fetch overview data:", err);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  // Transform API data for charts
  const transformPlatformUsage = (data: PlatformUsageData[]): EmployeeDataPoint[] => {
    return data.map(item => ({
      week: `Week ${item.week_number}`,
      value: item.usage_count
    }));
  };

  const transformSubscriptionRevenue = (data: SubscriptionRevenueData[]): MonthlyDataPoint[] => {
    return data.map(item => ({
      month: `${item.month} ${item.year}`,
      value: parseFloat(item.revenue)
    }));
  };

  // Use props data if provided, otherwise use API data
  const platformChartData = platformUsageData
    ? transformPlatformUsage(platformUsageData)
    : transformPlatformUsage(apiPlatformUsage);

  const subscriptionChartData = subscriptionRevenueData
    ? transformSubscriptionRevenue(subscriptionRevenueData)
    : transformSubscriptionRevenue(apiSubscriptionRevenue);

  // Fallback data for platform usage over 6 weeks
  const employeeData: EmployeeDataPoint[] = platformChartData.length > 0
    ? platformChartData
    : [
      { week: "Week 1", value: 1800 },
      { week: "Week 2", value: 2100 },
      { week: "Week 3", value: 2600 },
      { week: "Week 4", value: 2900 },
      { week: "Week 5", value: 3200 },
      { week: "Week 6", value: 3500 },
    ];

  // Fallback data for subscription revenue
  const revenueData: MonthlyDataPoint[] = subscriptionChartData.length > 0
    ? subscriptionChartData
    : [
      { month: "Jan 2024", value: 3200 },
      { month: "Feb 2024", value: 3500 },
      { month: "Mar 2024", value: 3900 },
      { month: "Apr 2024", value: 4200 },
      { month: "May 2024", value: 4600 },
      { month: "Jun 2024", value: 5000 },
    ];

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        {/* Tab navigation using ButtonGroup */}
        <ButtonGroup className="mb-4 w-100 justify-content-between">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="light"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              className={`px-3 py-2 border-0 position-relative ${activeTab === tab.id
                ? "fw-semibold text-success"
                : "text-secondary"
                }`}
              style={{
                backgroundColor: "transparent",
                borderBottom:
                  activeTab === tab.id
                    ? "3px solid #3CB371"
                    : "3px solid transparent",
                borderRadius: 0,
                transition: "border-bottom 0.2s ease",
                boxShadow: activeTab === tab.id ? "0 2px 0 #19875466" : "none",
                fontFamily: "heading",
              }}
            >
              {tab.label}
            </Button>
          ))}
        </ButtonGroup>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading chart data...</span>
            </Spinner>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-4">
            <div className="alert alert-warning">{error}</div>
          </div>
        )}

        {/* Dynamic section header with green underline */}
        {!loading && !error && (
          <h5
            className="fw-semibold text-dark mb-4 md-4 position-relative ms-5"
            style={{ fontFamily: "body" }}
          >
            {activeTab === "platform" && "Weekly Platform Usage"}
            {activeTab === "organization" && "Monthly Organization Growth"}
            {activeTab === "subscription" && "Monthly Subscription Revenue"}
          </h5>
        )}

        {/* Render chart only when 'platform' tab is active and not loading */}
        {!loading && !error && activeTab === "platform" && (
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ fontFamily: "body" }}
          >
            <AreaChart
              data={employeeData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Clean horizontal grid */}
              <CartesianGrid
                stroke="#dee2e6"
                strokeDasharray="0"
                vertical={false}
              />

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
                dot={{
                  r: 3,
                  stroke: "#198754",
                  strokeWidth: 1,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {!loading && !error && activeTab === "organization" && (
          <ResponsiveContainer
            width="100%"
            height={300}
            style={{ fontFamily: "body" }}
          >
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
              <CartesianGrid
                stroke="#dee2e6"
                strokeDasharray="0"
                vertical={false}
              />

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
                stroke="#198754"
                strokeWidth={3}
                dot={{
                  r: 3,
                  stroke: "#198754",
                  strokeWidth: 1,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {!loading && !error && activeTab === "subscription" && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={revenueData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              {/* Horizontal grid only */}
              <CartesianGrid
                stroke="#dee2e6"
                strokeDasharray="0"
                vertical={false}
              />

              {/* X-axis: month labels */}
              <XAxis
                dataKey="month"
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
                stroke="#198754"
                strokeWidth={3}
                fill="#198754"
                fillOpacity={0.1}
                dot={{
                  r: 3,
                  stroke: "#198754",
                  strokeWidth: 1,
                  fill: "#ffffff",
                }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
};

export default PlatformUsageChart;
