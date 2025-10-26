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
        icon: "Building2", // Icon representing an organization or building
        iconColor: "bg-light", // Bootstrap background color class
    },
    {
        id: "2",
        type: "AI Recommendation",
        details: "New AI recommendation available for review",
        time: "1 hour ago",
        icon: "Brain", // Icon representing AI or intelligence
        iconColor: "bg-light",
    },
    {
        id: "3",
        type: "Hotline Activity",
        details: "12 hotline calls were received",
        time: "45 minutes ago",
        icon: "PhoneCall", // Icon representing phone or hotline
        iconColor: "bg-light",
    },
    {
        id: "4",
        type: "Patient Engagement",
        details: "45 patients were engaged today",
        time: "30 minutes ago",
        icon: "UserPlus", // Icon representing user engagement or addition
        iconColor: "bg-light",
    },
    {
        id: "5",
        type: "Subscription",
        details: "University Counseling Center subscribed to the platform",
        time: "25 minutes ago",
        icon: "CreditCard", // Icon representing financial or subscription activity
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
        color: "emerald",
    },
    {
        id: "2",
        title: "AI Recommendations",
        value: "1,245",
        subtitle: "Reviewed today",
        linkText: "View recommendations",
        icon: "Brain",
        color: "blue",
    },
    {
        id: "3",
        title: "Hotline",
        value: "324",
        subtitle: "Calls received",
        linkText: "View hotline logs",
        icon: "PhoneCall",
        color: "purple",
    },
    {
        id: "4",
        title: "Subscriptions",
        value: "$25.8K",
        subtitle: "Monthly revenue",
        linkText: "View subscriptions",
        icon: "CreditCard",
        color: "pink",
    },
];
/**
 * Static placeholder data for top dashboard stats
 * Replace with API data when backend is ready
 */
const dashboardStatsData = [
    {
        id: "1",
        value: "42",
        title: "Total Organizations",
        change: "+3 this month",
        icon: "Building2",
        iconColor: "bg-light",
    },
    {
        id: "2",
        value: "1,284",
        title: "Total Clients",
        change: "+124 this week",
        icon: "Users",
        iconColor: "bg-light",
    },
    {
        id: "3",
        value: "$25,800",
        title: "Monthly Revenue",
        change: "+5.3% this month",
        icon: "CreditCard",
        iconColor: "bg-light",
    },
    {
        id: "4",
        value: "42",
        title: "Hotline Calls Today",
        change: "+8% vs yesterday",
        icon: "PhoneCall",
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
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            backgroundColor: '#f8f9fa',
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Row, { className: "gy-4", children: _jsx(DashboardStats, { stats: dashboardStatsData }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(PlatformUsageChart, {}) }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4", children: _jsx(BottomMetrics, { metrics: bottomMetricData }) })] }) }) })] })] }));
};
export default Dashboard;
