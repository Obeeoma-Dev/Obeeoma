import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Dashboard.tsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Import reusable dashboard components
import Sidebar from "../../components/admincomponents/adminsidebar";
import Header from "../../components/admincomponents/adminheader";
import DashboardStats from "../../components/admincomponents/Overviewcomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/Overviewcomponents/platformusage";
import RecentActivities from "../../components/admincomponents/Overviewcomponents/recentactivities";
import BottomMetrics from "../../components/admincomponents/Overviewcomponents/buttonmetrics";
<<<<<<< HEAD
import { BlogManager } from "../../components/admincomponents/Blogmanagement/BlogManager";
=======
import { BlogTable, } from "../../components/admincomponents/Blogmanagement/BlogTable";
>>>>>>> main
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
        iconColor: "text-success", // Bootstrap background color class
    },
    {
        id: "2",
        type: "AI Recommendation",
        details: "New AI recommendation available for review",
        time: "1 hour ago",
        icon: "Brain", // Icon representing AI or intelligence
        iconColor: "text-info",
    },
    {
        id: "3",
        type: "Hotline Activity",
        details: "12 hotline calls were received",
        time: "45 minutes ago",
        icon: "PhoneCall", // Icon representing phone or hotline
        iconColor: "text-danger",
    },
    {
        id: "4",
        type: "Patient Engagement",
        details: "45 patients were engaged today",
        time: "30 minutes ago",
        icon: "UserPlus", // Icon representing user engagement or addition
        iconColor: "text-primary",
    },
    {
        id: "5",
        type: "Subscription",
        details: "University Counseling Center subscribed to the platform",
        time: "25 minutes ago",
        icon: "CreditCard", // Icon representing financial or subscription activity
        iconColor: "text-warning",
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
        value: "0",
        subtitle: "Active organizations",
        linkText: "View all organizations",
        icon: "Building2",
        color: "emerald",
    },
    {
        id: "2",
        title: "AI Recommendations",
        value: "0",
        subtitle: "Reviewed today",
        linkText: "View recommendations",
        icon: "Brain",
        color: "blue",
    },
    {
        id: "3",
        title: "Hotline",
        value: "0",
        subtitle: "Calls received",
        linkText: "View hotline logs",
        icon: "PhoneCall",
        color: "purple",
    },
    {
        id: "4",
        title: "Subscriptions",
        value: "$0k",
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
        value: "0",
        title: "Total Organizations",
        change: "+3 this month",
        icon: "Building2",
        iconColor: "bg-success-subtle text-success",
    },
    {
        id: "2",
        value: "0",
        title: "Total Clients",
        change: "+124 this week",
        icon: "Users",
        iconColor: "bg-primary-subtle text-primary",
    },
    {
        id: "3",
        value: "$0",
        title: "Monthly Revenue",
        change: "+5.3% this month",
        icon: "CreditCard",
        iconColor: "bg-warning-subtle text-warning",
    },
    {
        id: "4",
        value: "0",
        title: "Hotline Calls Today",
        change: "+8% vs yesterday",
        icon: "PhoneCall",
        iconColor: "bg-danger-subtle text-danger",
    },
];
/**
 * Main Dashboard component
 * Combines sidebar, header, and dashboard content
 */
const Dashboard = () => {
    /* The blog state + handlers */
    const [blogs, setBlogs] = React.useState([]);
    const [selectedBlog, setSelectedBlog] = React.useState(null);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const handleAdd = () => {
        setShowAddModal(true);
    };
    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setShowEditModal(true);
    };
    const handleDelete = (id) => {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    };
    return (
    // Full-height layout with sidebar and main content
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
<<<<<<< HEAD
                            overflowY: 'auto',
                            padding: '2rem 1.5rem',
                            backgroundColor: '#f5f7fa',
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-2", children: [_jsxs("div", { className: "mb-5", children: [_jsx("h2", { className: "fw-bold mb-1", style: { fontSize: '1.75rem', fontFamily: 'heading', color: '#1a1a1a' }, children: "Dashboard" }), _jsx("p", { className: "text-muted mb-0", style: { fontFamily: 'body' }, children: "Welcome back! Here's your platform overview." })] }), _jsx(Row, { className: "g-4 mb-5", children: _jsx(DashboardStats, { stats: dashboardStatsData }) }), _jsx(Row, { className: "g-4 mb-5", children: _jsx(Col, { children: _jsx(PlatformUsageChart, {}) }) }), _jsx(Row, { className: "g-4 mb-5", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4 mb-5", children: _jsx(Col, { children: _jsx(BlogManager, {}) }) }), _jsx(Row, { className: "g-4", children: _jsx(BottomMetrics, { metrics: bottomMetricData }) })] }) }) })] })] }));
=======
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Row, { className: "gy-4", children: _jsx(DashboardStats, { stats: dashboardStatsData }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(PlatformUsageChart, {}) }) }), _jsx(Row, { className: "gy-4", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4 mb-4", children: _jsx(Col, { children: _jsx(BlogTable, { blogs: blogs, onAdd: handleAdd, onEdit: handleEdit, onDelete: handleDelete }) }) }), _jsx(Row, { className: "gy-4", children: _jsx(BottomMetrics, { metrics: bottomMetricData }) })] }) }) })] })] }));
>>>>>>> main
};
export default Dashboard;
