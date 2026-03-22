import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, } from "recharts";
import { adminDashboardAPI } from "../../../api/adminapiConfig";
const PlatformUsageChart = ({ platformUsageData, subscriptionRevenueData, }) => {
    // Track which tab is currently active
    const [activeTab, setActiveTab] = useState("platform");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // State for API data
    const [apiPlatformUsage, setApiPlatformUsage] = useState([]);
    const [apiSubscriptionRevenue, setApiSubscriptionRevenue] = useState([]);
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
            }
            catch (err) {
                console.error("Failed to fetch overview data:", err);
                setError("Failed to load chart data");
            }
            finally {
                setLoading(false);
            }
        };
        fetchOverviewData();
    }, []);
    // Transform API data for charts
    const transformPlatformUsage = (data) => {
        return data.map((item) => ({
            week: `Week ${item.week_number}`,
            value: item.usage_count,
        }));
    };
    const transformSubscriptionRevenue = (data) => {
        return data.map((item) => ({
            month: `${item.month} ${item.year}`,
            value: parseFloat(item.revenue),
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
    const employeeData = platformChartData.length > 0
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
    const revenueData = subscriptionChartData.length > 0
        ? subscriptionChartData
        : [
            { month: "Jan 2024", value: 3200 },
            { month: "Feb 2024", value: 3500 },
            { month: "Mar 2024", value: 3900 },
            { month: "Apr 2024", value: 4200 },
            { month: "May 2024", value: 4600 },
            { month: "Jun 2024", value: 5000 },
        ];
    return (_jsx(Card, { className: "mb-4 shadow-sm border-0", children: _jsxs(Card.Body, { children: [_jsx(ButtonGroup, { className: "mb-4 w-100 justify-content-between", children: tabs.map((tab) => (_jsx(Button, { variant: "light", onClick: () => setActiveTab(tab.id), "aria-pressed": activeTab === tab.id, className: `px-3 py-2 border-0 position-relative ${activeTab === tab.id
                            ? "fw-semibold text-success"
                            : "text-secondary"}`, style: {
                            backgroundColor: "transparent",
                            borderBottom: activeTab === tab.id
                                ? "3px solid #3CB371"
                                : "3px solid transparent",
                            borderRadius: 0,
                            transition: "border-bottom 0.2s ease",
                            boxShadow: activeTab === tab.id ? "0 2px 0 #19875466" : "none",
                            fontFamily: "heading",
                        }, children: tab.label }, tab.id))) }), loading && (_jsx("div", { className: "text-center py-4", children: _jsx(Spinner, { animation: "border", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading chart data..." }) }) })), error && (_jsx("div", { className: "text-center py-4", children: _jsx("div", { className: "alert alert-warning", children: error }) })), !loading && !error && (_jsxs("h5", { className: "fw-semibold text-dark mb-4 md-4 position-relative ms-5", style: { fontFamily: "body" }, children: [activeTab === "platform" && "Weekly Platform Usage", activeTab === "organization" && "Monthly Organization Growth", activeTab === "subscription" && "Monthly Subscription Revenue"] })), !loading && !error && activeTab === "platform" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, style: { fontFamily: "body" }, children: _jsxs(AreaChart, { data: employeeData, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Area, { type: "natural", dataKey: "value", stroke: "#198754", strokeWidth: 3, fill: "#198754", fillOpacity: 0.1, dot: {
                                    r: 3,
                                    stroke: "#198754",
                                    strokeWidth: 1,
                                    fill: "#ffffff",
                                }, activeDot: { r: 5 } })] }) })), !loading && !error && activeTab === "organization" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, style: { fontFamily: "body" }, children: _jsxs(LineChart, { data: [
                            { week: "Week 1", value: 1200 },
                            { week: "Week 2", value: 1500 },
                            { week: "Week 3", value: 1800 },
                            { week: "Week 4", value: 2100 },
                            { week: "Week 5", value: 2400 },
                            { week: "Week 6", value: 2700 },
                        ], margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Line, { type: "natural", dataKey: "value", stroke: "#198754", strokeWidth: 3, dot: {
                                    r: 3,
                                    stroke: "#198754",
                                    strokeWidth: 1,
                                    fill: "#ffffff",
                                }, activeDot: { r: 5 } })] }) })), !loading && !error && activeTab === "subscription" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: revenueData, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "month", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Area, { type: "natural", dataKey: "value", stroke: "#198754", strokeWidth: 3, fill: "#198754", fillOpacity: 0.1, dot: {
                                    r: 3,
                                    stroke: "#198754",
                                    strokeWidth: 1,
                                    fill: "#ffffff",
                                }, activeDot: { r: 5 } })] }) }))] }) }));
};
export default PlatformUsageChart;
