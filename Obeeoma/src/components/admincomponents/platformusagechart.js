import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Chart component for displaying weekly platform usage trends
import { useState } from 'react';
/**
 * PlatformUsageChart component displays a line chart showing weekly platform usage
 * Includes tab navigation for different chart views
 */
const PlatformUsageChart = () => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState('platform');
    // Array of tab options for chart navigation
    const tabs = [
        { id: 'platform', label: 'Platform Usage' },
        { id: 'organization', label: 'Organization Growth' },
        { id: 'subscription', label: 'Subscription Revenue' },
    ];
    // Sample data points for the chart (6 weeks of usage data)
    const chartData = [
        { week: 'Week 1', value: 1800 },
        { week: 'Week 2', value: 2100 },
        { week: 'Week 3', value: 2600 },
        { week: 'Week 4', value: 2900 },
        { week: 'Week 5', value: 3200 },
        { week: 'Week 6', value: 3500 },
    ];
    // Calculate the maximum value for chart scaling
    const maxValue = Math.max(...chartData.map((d) => d.value));
    // Add 10% padding to the top of the chart
    const chartHeight = 300;
    const padding = maxValue * 0.1;
    const adjustedMax = maxValue + padding;
    /**
     * Converts a data value to Y coordinate on the chart
     * @param value - The data value to convert
     * @returns Y coordinate in pixels
     */
    const getYPosition = (value) => {
        return chartHeight - (value / adjustedMax) * chartHeight;
    };
    /**
     * Generates the SVG path string for the line chart
     * @returns SVG path data string
     */
    const generatePath = () => {
        // Calculate width for each data point
        const pointWidth = 100 / (chartData.length - 1);
        // Generate path commands for each point
        return chartData
            .map((point, index) => {
            // Calculate X position as percentage
            const x = index * pointWidth;
            // Calculate Y position based on value
            const y = getYPosition(point.value);
            // First point uses M (move to), subsequent points use L (line to)
            const command = index === 0 ? 'M' : 'L';
            return `${command} ${x}% ${y}`;
        })
            .join(' ');
    };
    return (
    // Main chart container with white background
    _jsxs("section", { className: "bg-white rounded-lg p-6 shadow-sm mb-8", children: [_jsx("div", { className: "flex gap-6 mb-6 border-b border-gray-200", children: tabs.map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `
              pb-3 px-1 text-sm font-medium transition-colors relative
              ${activeTab === tab.id
                        ? 'text-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'}
            `, children: [tab.label, activeTab === tab.id && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" }))] }, tab.id))) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Weekly Platform Usage" }), _jsxs("div", { className: "relative", style: { height: `${chartHeight}px` }, children: [_jsxs("svg", { className: "w-full h-full", preserveAspectRatio: "none", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "chartGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#10b981", stopOpacity: "0.2" }), _jsx("stop", { offset: "100%", stopColor: "#10b981", stopOpacity: "0" })] }) }), _jsx("path", { d: `${generatePath()} L 100% ${chartHeight} L 0% ${chartHeight} Z`, fill: "url(#chartGradient)" }), _jsx("path", { d: generatePath(), fill: "none", stroke: "#10b981", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" })] }), chartData.map((point, index) => {
                        // Calculate position for each point
                        const pointWidth = 100 / (chartData.length - 1);
                        const x = index * pointWidth;
                        const y = getYPosition(point.value);
                        return (_jsx("div", { className: "absolute w-3 h-3 bg-emerald-600 rounded-full border-2 border-white shadow-md", style: {
                                left: `${x}%`,
                                top: `${y}px`,
                                transform: 'translate(-50%, -50%)',
                            } }, point.week));
                    })] }), _jsx("div", { className: "flex justify-between mt-4 px-2", children: chartData.map((point) => (_jsx("span", { className: "text-sm text-gray-500", children: point.week }, point.week))) }), _jsxs("div", { className: "absolute left-0 top-0 flex flex-col justify-between h-full py-6 -ml-12 text-xs text-gray-500", children: [_jsx("span", { children: Math.round(adjustedMax) }), _jsx("span", { children: Math.round(adjustedMax / 2) }), _jsx("span", { children: "0" })] })] }));
};
export default PlatformUsageChart;
