import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and required Bootstrap components
import { useState } from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
// Import chart components from Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
/**
 * PlatformUsageChart component renders a responsive line chart
 * Includes tab navigation for future expansion (organization growth, subscription revenue)
 */
const PlatformUsageChart = () => {
    // Track which tab is currently active
    const [activeTab, setActiveTab] = useState('platform');
    // Define tab options for chart navigation
    const tabs = [
        { id: 'platform', label: 'Platform Usage' },
        { id: 'organization', label: 'Organization Growth' },
        { id: 'subscription', label: 'Subscription Revenue' },
    ];
    // Sample data for platform usage over 6 weeks
    const chartData = [
        { week: 'Week 1', value: 1800 },
        { week: 'Week 2', value: 2100 },
        { week: 'Week 3', value: 2600 },
        { week: 'Week 4', value: 2900 },
        { week: 'Week 5', value: 3200 },
        { week: 'Week 6', value: 3500 },
    ];
    return (
    // Bootstrap Card container for chart section
    _jsx(Card, { className: "mb-4 shadow-sm border-0", children: _jsxs(Card.Body, { children: [_jsx(ButtonGroup, { className: "mb-4", children: tabs.map((tab) => (_jsx(Button, { variant: activeTab === tab.id ? 'success' : 'outline-secondary', onClick: () => setActiveTab(tab.id), "aria-pressed": activeTab === tab.id, children: tab.label }, tab.id))) }), _jsx("h5", { className: "fw-semibold mb-4", children: "Weekly Platform Usage" }), activeTab === 'platform' && (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: chartData, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "week" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#10b981", strokeWidth: 3, dot: { r: 4 } })] }) })), activeTab === 'organization' && (_jsx("div", { className: "text-muted small", children: "Organization Growth chart coming soon..." })), activeTab === 'subscription' && (_jsx("div", { className: "text-muted small", children: "Subscription Revenue chart coming soon..." }))] }) }));
};
// Export the component for use in the dashboard layout
export default PlatformUsageChart;
