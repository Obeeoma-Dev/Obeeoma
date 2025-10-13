import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col } from "react-bootstrap";
// Import reusable dashboard components
import Sidebar from "../../components/admincomponents/adminsidebar";
import Header from "../../components/admincomponents/adminheader";
import DashboardStats from "../../components/admincomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/platformusage";
import RecentActivities from "../../components/admincomponents/recentactivities";
import BottomMetrics from "../../components/admincomponents/buttonmetrics";
/**
 * Static placeholder data for recent activities
 * Replace with API data when backend is ready
 */
const recentActivityData = [
    {
        id: "1",
        type: "New Organization",
        details: "Wellness Centre Inc. joined the platform",
        time: "2 hours ago",
        icon: "Building2",
        iconColor: "bg-light",
    },
    {
        id: "2",
        type: "AI Recommendation",
        details: "New AI recommendation available for review",
        time: "1 hour ago",
        icon: "Brain",
        iconColor: "bg-light",
    },
];
/**
 * Static placeholder data for bottom metric cards
 * Replace with API data when backend is ready
 */
const bottomMetricData = [
    {
        id: "1",
        title: "Organizations",
        value: "42",
        subtitle: "Active organizations",
        linkText: "View all organizations",
        icon: "Building2",
        color: "success",
    },
    {
        id: "2",
        title: "AI Recommendations",
        value: "1,245",
        subtitle: "Reviewed today",
        linkText: "View recommendations",
        icon: "Brain",
        color: "info",
    },
];
/**
 * Static placeholder data for top dashboard stats
 * Replace with API data when backend is ready
 */
const dashboardStatsData = [
    {
        id: "1",
        title: "Total Organizations",
        value: "42",
        change: "+3 this month",
        icon: "Building2",
        iconColor: "bg-light",
    },
    {
        id: "2",
        title: "Total Clients",
        value: "1,284",
        change: "+12 this week",
        icon: "Users",
        iconColor: "bg-light",
    },
    {
        id: "3",
        title: "AI Recommendations",
        value: "25,800",
        change: "+1,245 today",
        icon: "Brain",
        iconColor: "bg-light",
    },
    {
        id: "4",
        title: "Hotline Calls Today",
        value: "42",
        change: "+5 since yesterday",
        icon: "Phone",
        iconColor: "bg-light",
    },
];
/**
 * Main Dashboard component
 * Combines sidebar, header, and dashboard content
 */
const Dashboard = () => {
    return (
    // Full-height layout with sidebar and main content
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Row, { className: "gy-4", children: _jsx(DashboardStats, { stats: dashboardStatsData }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(PlatformUsageChart, {}) }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4", children: _jsx(BottomMetrics, { metrics: bottomMetricData }) })] }) })] })] }));
};
export default Dashboard;
