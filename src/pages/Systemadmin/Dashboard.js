import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col } from "react-bootstrap";
// Import custom dashboard components
import Sidebar from "../../components/admincomponents/adminsidebar";
import Header from "../../components/admincomponents/adminheader";
import DashboardStats from "../../components/admincomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/platformusage";
import RecentActivities from "../../components/admincomponents/recentactivities";
import BottomMetrics from "../../components/admincomponents/buttonmetrics";
// Define static data for recent activities
const recentActivityData = [
  {
    id: "1",
    type: "New Organization",
    details: "Wellness Centre Inc. joined the platform",
    time: "2 hours ago",
    icon: "Building2",
    iconColor: "bg-light", // Bootstrap background utility
  },
  // Add more activities as needed
];
// Define static data for bottom metric cards
const bottomMetricData = [
  {
    id: "1",
    title: "Organizations",
    value: "42",
    subtitle: "Active organizations",
    linkText: "View all organizations",
    icon: "Building2",
    color: "success", // Bootstrap contextual color
  },
  // Add more metrics as needed
];
// Define static data for top dashboard stats
const dashboardStatsData = [
  {
    id: "1",
    title: "Total Organizations",
    value: "42",
    change: "+3 this month",
    icon: "Building2",
    iconColor: "bg-light", // Bootstrap background utility
  },
  // Add more stats as needed
];
// Main Dashboard component
const Dashboard = () => {
  return (
    // Root container with full viewport height and horizontal layout
    _jsxs("div", {
      className: "d-flex vh-100",
      children: [
        _jsx(Sidebar, {}),
        _jsxs("div", {
          className: "flex-grow-1 d-flex flex-column overflow-hidden",
          children: [
            _jsx(Header, {}),
            _jsx("div", {
              className: "flex-grow-1 overflow-auto",
              children: _jsxs(Container, {
                fluid: true,
                className: "py-4",
                children: [
                  _jsx(Row, {
                    className: "gy-4",
                    children: _jsx(DashboardStats, {
                      stats: dashboardStatsData,
                    }),
                  }),
                  _jsx(Row, {
                    className: "gy-4",
                    children: _jsx(Col, {
                      children: _jsx(PlatformUsageChart, {}),
                    }),
                  }),
                  _jsx(Row, {
                    className: "gy-4",
                    children: _jsx(Col, {
                      children: _jsx(RecentActivities, {
                        activities: recentActivityData,
                      }),
                    }),
                  }),
                  _jsx(Row, {
                    className: "gy-4",
                    children: _jsx(BottomMetrics, {
                      metrics: bottomMetricData,
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    })
  );
};
// Export the component for use in routing or layout
export default Dashboard;
