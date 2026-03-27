import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert, Button, } from "react-bootstrap";
// Import reusable dashboard components
import DashboardStats from "../../components/admincomponents/Overviewcomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/Overviewcomponents/platformusage";
import RecentActivities from "../../components/admincomponents/Overviewcomponents/recentactivities";
import SystemAdminLayout from "../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../components/Aipopup/AiAssintant";
import { BlogManager } from "../../components/admincomponents/Blogmanagement/BlogManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Building2, Users, PhoneCall } from "lucide-react";
import { adminDashboardAPI } from "../../api/adminapiConfig";
import { useAIStatus } from "../../hooks/useAIStatus";
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
        iconColor: "text-success",
    },
    {
        id: "3",
        type: "Hotline Activity",
        details: "12 hotline calls were received",
        time: "45 minutes ago",
        icon: "PhoneCall", // Icon representing phone or hotline
        iconColor: "text-success",
    },
    {
        id: "4",
        type: "Patient Engagement",
        details: "45 patients were engaged today",
        time: "30 minutes ago",
        icon: "UserPlus", // Icon representing user engagement or addition
        iconColor: "text-success",
    },
    {
        id: "5",
        type: "Subscription",
        details: "University Counseling Center subscribed to the platform",
        time: "25 minutes ago",
        icon: "CreditCard", // Icon representing financial or subscription activity
        iconColor: "text-success",
    },
];
/**
 * Default fallback data for dashboard stats
 * Used when API call fails or during loading
 */
const defaultStatsData = [
    {
        id: "1",
        value: "0",
        title: "Total Organizations",
        trend: "+3 this month",
        icon: Building2,
        color: "emerald",
    },
    {
        id: "2",
        value: "0",
        title: "Total Clients",
        trend: "+124 this week",
        icon: Users,
        color: "emerald",
    },
    // {
    //   id: "3",
    //   value: "$0",
    //   title: "Monthly Revenue",
    //   trend: "+5.3% this month",
    //   icon: CreditCard,
    //   color: "emerald",
    // },
    {
        id: "3",
        value: "0",
        title: "Hotline Calls Today",
        trend: "+8% vs yesterday",
        icon: PhoneCall,
        color: "rose",
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
    // Use enhanced AI status hook with caching
    const { aiStatus } = useAIStatus();
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    /* Dashboard stats state */
    const [dashboardStats, setDashboardStats] = useState(defaultStatsData);
    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
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
    // Simple refresh function - shows loading state for 3 seconds
    const handleRefresh = async () => {
        // Show loading state immediately
        setLoading(true);
        setError(null);
        // Clear cache and trigger refresh
        localStorage.removeItem("dashboardStats");
        setRefreshTrigger((prev) => prev + 1);
        // After 3 seconds, if still loading, hide loading state
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    // Fetch real dashboard statistics with persistent cache
    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                // Check if we have cached data (session-based)
                const cachedData = localStorage.getItem("dashboardStats");
                if (cachedData && refreshTrigger === 0) {
                    // Use cached data on initial load - no API call
                    const parsedData = JSON.parse(cachedData || "[]");
                    // Re-add icons since they can't be serialized
                    const dataWithIcons = parsedData.map((item) => {
                        let icon;
                        switch (item.title) {
                            case "Total Organizations":
                                icon = Building2;
                                break;
                            case "Total Clients":
                                icon = Users;
                                break;
                            // case "Monthly Revenue":
                            //   icon = CreditCard;
                            //   break;
                            case "Hotline Calls Today":
                                icon = PhoneCall;
                                break;
                            default:
                                icon = Building2;
                        }
                        return { ...item, icon };
                    });
                    setDashboardStats(dataWithIcons);
                    setLoading(false);
                    return;
                }
                // Only show loading if this is a manual refresh
                if (refreshTrigger > 0) {
                    setLoading(true);
                }
                setError(null);
                // Try API call but fallback to default if it fails
                try {
                    const response = await adminDashboardAPI.getDashboardSummary();
                    const data = response.data;
                    // Store overview data for PlatformUsageChart
                    setOverviewData(data);
                    // Transform API data to match StatCardData format
                    const transformedStats = [
                        {
                            id: "1",
                            value: data.total_organizations?.toString() || "0",
                            title: "Total Organizations",
                            trend: `+${data.organizations_this_month || 0} this month`,
                            icon: Building2,
                            color: "emerald",
                        },
                        {
                            id: "2",
                            value: data.total_clients?.toString() || "0",
                            title: "Total Clients",
                            trend: `+${data.clients_this_month || 0} this month`,
                            icon: Users,
                            color: "emerald",
                        },
                        // {
                        //   id: "3",
                        //   value: `$${data.monthly_revenue?.toFixed(2) || "0"}`,
                        //   title: "Monthly Revenue",
                        //   trend: `+${data.revenue_growth_percentage || 0}% this month`,
                        //   icon: CreditCard,
                        //   color: "emerald",
                        // },
                        {
                            id: "3",
                            value: data.hotline_calls_today?.toString() || "0",
                            title: "Hotline Calls Today",
                            trend: "+8% vs yesterday",
                            icon: PhoneCall,
                            color: "rose",
                        },
                    ];
                    // Cache the data for the session (without icons since they can't be serialized)
                    const dataToCache = transformedStats.map(({ icon, ...rest }) => rest);
                    localStorage.setItem("dashboardStats", JSON.stringify(dataToCache));
                    setDashboardStats(transformedStats);
                }
                catch (apiError) {
                    console.error("API call failed, using default data:", apiError);
                    // Use default data if API fails
                    setDashboardStats(defaultStatsData);
                }
            }
            catch (err) {
                console.error("Failed to fetch dashboard stats:", err);
                setError("Failed to load dashboard statistics");
                // Keep default stats on error
                setDashboardStats(defaultStatsData);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDashboardStats();
    }, [refreshTrigger]); // Run on mount and when refreshTrigger changes
    return (_jsxs(SystemAdminLayout, { title: "Systemadmin Overview", children: [_jsx(ToastContainer, { position: "top-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true }), _jsxs("div", { className: "p-4", children: [_jsx("div", { className: "mb-4 d-flex justify-content-between align-items-center", children: _jsx(Button, { variant: "outline-secondary", size: "sm", onClick: handleRefresh, className: "d-flex align-items-center gap-2", children: "\u21BB Refresh" }) }), _jsx(Row, { className: "g-4 mb-5", children: loading ? (_jsx(Col, { className: "text-center py-4", children: _jsx(Spinner, { animation: "border", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading dashboard stats..." }) }) })) : error ? (_jsxs(Col, { className: "py-2", children: [_jsx(Alert, { variant: "danger", children: error }), _jsx(DashboardStats, { stats: dashboardStats })] })) : (_jsx(DashboardStats, { stats: dashboardStats })) }), _jsx(Row, { className: "g-4 mb-5", children: _jsx(Col, { children: _jsx(PlatformUsageChart, { platformUsageData: overviewData?.platform_usage, subscriptionRevenueData: overviewData?.subscription_revenue }) }) }), _jsx(Row, { className: "g-4 mb-5", children: _jsx(Col, { children: _jsx(RecentActivities, { activities: recentActivityData }) }) }), _jsx(Row, { className: "gy-4 mb-5", children: _jsx(Col, { children: _jsx(BlogManager, {}) }) })] }), _jsx(AIAssistant, { isEnabled: aiStatus.admin_ai })] }));
};
export default Dashboard;
