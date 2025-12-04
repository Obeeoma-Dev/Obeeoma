import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and required Bootstrap components
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
// Import chart components from Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, } from "recharts";
/**
 * PlatformUsageChart component renders a responsive line chart
 * Includes tab navigation for future expansion (organization growth, subscription revenue)
 */
const PlatformUsageChart = () => {
    // Track which tab is currently active
    const [activeTab, setActiveTab] = useState("platform");
    // Define tab options for chart navigation
    const tabs = [
        { id: "platform", label: "Platform Usage" },
        { id: "organization", label: "Organization Growth" },
        { id: "subscription", label: "Subscription Revenue" },
    ];
    // Sample data for platform usage over 6 weeks
    const employeeData = [
        { week: "Week 1", value: 1800 },
        { week: "Week 2", value: 2100 },
        { week: "Week 3", value: 2600 },
        { week: "Week 4", value: 2900 },
        { week: "Week 5", value: 3200 },
        { week: "Week 6", value: 3500 },
    ];
    return (
    // Bootstrap Card container for chart section
    _jsx(Card, { className: "mb-4 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-4", children: [_jsx("div", { className: "d-flex gap-4 mb-5 border-bottom pb-3", children: tabs.map((tab) => (_jsx(Button, { variant: "link", onClick: () => setActiveTab(tab.id), "aria-pressed": activeTab === tab.id, className: `p-0 border-0 text-decoration-none fw-500 ${activeTab === tab.id ? "text-success" : "text-muted"}`, style: {
                            backgroundColor: "transparent",
                            fontSize: '0.95rem',
                            transition: "color 0.2s ease",
                            borderBottom: activeTab === tab.id ? "3px solid #3CB371" : "3px solid transparent",
                            paddingBottom: activeTab === tab.id ? '3px' : '3px',
                        }, children: tab.label }, tab.id))) }), _jsxs("h6", { className: "fw-semibold text-dark mb-4", style: { fontSize: '1rem', color: '#1a1a1a' }, children: [activeTab === "platform" && "Weekly Platform Usage", activeTab === "organization" && "Monthly Organization Growth", activeTab === "subscription" && "Monthly Subscription Revenue"] }), activeTab === "platform" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: employeeData, margin: { top: 10, right: 30, left: -20, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#e9ecef", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                } }), _jsx(Area, { type: "natural", dataKey: "value", stroke: "#3CB371", strokeWidth: 3, fill: "#3CB371", fillOpacity: 0.08, dot: { r: 4, stroke: "#3CB371", strokeWidth: 2, fill: "#ffffff" }, activeDot: { r: 6 } })] }) })), activeTab === "organization" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: [
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
                                } }), _jsx(Line, { type: "natural", dataKey: "value", stroke: "#198754" // Bootstrap blue
                                , strokeWidth: 3, dot: { r: 3, stroke: "#198754", strokeWidth: 1, fill: "#ffffff" }, activeDot: { r: 5 } })] }) })), activeTab === "subscription" && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: [
                            { week: "Week 1", value: 3200 },
                            { week: "Week 2", value: 3500 },
                            { week: "Week 3", value: 3900 },
                            { week: "Week 4", value: 4200 },
                            { week: "Week 5", value: 4600 },
                            { week: "Week 6", value: 5000 },
                        ], margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { stroke: "#dee2e6", strokeDasharray: "0", vertical: false }), _jsx(XAxis, { dataKey: "week", tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 12, fill: "#6c757d" }, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #dee2e6",
                                    fontSize: "0.875rem",
                                    color: "#212529",
                                } }), _jsx(Area, { type: "natural", dataKey: "value", stroke: "#198754" // Bootstrap green
                                , strokeWidth: 3, fill: "#198754", fillOpacity: 0.1, dot: { r: 3, stroke: "#198754", strokeWidth: 1, fill: "#ffffff" }, activeDot: { r: 5 } })] }) }))] }) }));
};
// Export the component for use in the dashboard layout
export default PlatformUsageChart;
