import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Icons from 'lucide-react';
/**
 * StatCard component displays a metric with an icon, value, and percentage change
 * Used throughout the dashboard to show key performance indicators
 */
const StatCard = ({ data }) => {
    // Dynamically get the icon component from lucide-react based on the icon name
    const IconComponent = Icons[data.icon] || Icons.Activity;
    // Determine if the change is positive or negative for styling
    const isPositive = data.change.startsWith('+');
    // Set text color based on whether change is positive or negative
    const changeColor = isPositive ? 'text-emerald-500' : 'text-red-500';
    return (
    // Main card container with white background and subtle shadow
    _jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx("div", { className: `${data.iconColor} p-3 rounded-lg`, children: _jsx(IconComponent, { className: "w-6 h-6 text-emerald-600" }) }), _jsx("span", { className: `text-sm font-medium ${changeColor}`, children: data.change })] }), _jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold text-gray-900 mb-1", children: data.value }), _jsx("div", { className: "text-sm text-gray-500", children: data.title })] })] }));
};
export default StatCard;
