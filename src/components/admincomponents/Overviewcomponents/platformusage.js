import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, } from "recharts";
<<<<<<< HEAD
const PlatformUsageChart = ({ platformUsageData = [], subscriptionRevenueData = [], }) => {
=======
const PlatformUsageChart = ({ platformData = [], subscriptionData = [], }) => {
>>>>>>> 87eb88844960420a100f2d1548e8d8102dfa0d8b
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
    // Use backend data or show empty state
    const employeeData = platformUsageData;
    const revenueData = subscriptionRevenueData;
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
                        }, children: tab.label }, tab.id))) }), loading && (_jsx("div", { className: "text-center py-4", children: _jsx(Spinner, { animation: "border", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading chart data..." }) }) })), error && (_jsx("div", { className: "text-center py-4", children: _jsx("div", { className: "alert alert-warning", children: error }) })), !loading && !error && (_jsxs("h5", { className: "fw-semibold text-dark mb-4 md-4 position-relative ms-5", style: { fontFamily: "body" }, children: [activeTab === "platform" && "Weekly Platform Usage", activeTab === "organization" && "Monthly Organization Growth", activeTab === "subscription" && "Monthly Subscription Revenue"] })), !loading && !error && activeTab === "platform" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, style: { fontFamily: "body" }, children: employeeData.length > 0 ? (_jsxs(AreaChart, { data: employeeData, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Area, { type: "natural", dataKey: "value", stroke: "#198754", strokeWidth: 3, fill: "#198754", fillOpacity: 0.1, dot: {
                                    r: 3,
                                    stroke: "#198754",
                                    strokeWidth: 1,
                                    fill: "#ffffff",
                                }, activeDot: { r: 5 } })] })) : (_jsx("div", { className: "d-flex justify-content-center align-items-center h-100 text-muted", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { children: "No platform usage data available" }), _jsx("small", { children: "Data will appear here once users start using the platform" })] }) })) })), !loading && !error && activeTab === "organization" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, style: { fontFamily: "body" }, children: employeeData.length > 0 ? (_jsxs(LineChart, { data: employeeData, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Line, { type: "natural", dataKey: "value", stroke: "#198754", strokeWidth: 3, dot: {
                                    r: 3,
                                    stroke: "#198754",
                                    strokeWidth: 1,
                                    fill: "#ffffff",
                                }, activeDot: { r: 5 } })] })) : (_jsx("div", { className: "d-flex justify-content-center align-items-center h-100 text-muted", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { children: "No organization growth data available" }), _jsx("small", { children: "Data will appear here once organizations start joining" })] }) })) })), !loading && !error && activeTab === "subscription" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: revenueData.length > 0 ? (_jsxs(AreaChart, { data: revenueData, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Area, { type: "natural", dataKey: "value", stroke: "#198754", strokeWidth: 3, fill: "#198754", fillOpacity: 0.1, dot: {
                                    r: 3,
                                    stroke: "#198754",
                                    strokeWidth: 1,
                                    fill: "#ffffff",
                                }, activeDot: { r: 5 } })] })) : (_jsx("div", { className: "d-flex justify-content-center align-items-center h-100 text-muted", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { children: "No subscription revenue data available" }), _jsx("small", { children: "Data will appear here once subscriptions are active" })] }) })) }))] }) }));
};
export default PlatformUsageChart;
