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
        icon: "Phone", // Icon representing phone or hotline
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
// Define static data for bottom metric cards
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
        icon: "Phone",
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
<<<<<<< HEAD
    // Root container with full viewport height and horizontal layout
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Row, { className: "gy-4", children: _jsx(DashboardStats, { stats: dashboardStatsData }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(PlatformUsageChart, {}) }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4", children: _jsx(BottomMetrics, { metrics: bottomMetricData }) })] }) })] })] }));
=======
    // Full-height layout with sidebar and main content
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            backgroundColor: '#f8f9fa',
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Row, { className: "gy-4", children: _jsx(DashboardStats, { stats: dashboardStatsData }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(PlatformUsageChart, {}) }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4", children: _jsx(BottomMetrics, { metrics: bottomMetricData }) })] }) }) })] })] }));
>>>>>>> 92caf9a8c63b44a69965a6a5067505d66fe70012
};
// Export the component for use in routing or layout
export default Dashboard;
