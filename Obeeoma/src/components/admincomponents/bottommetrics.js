import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Icons from 'lucide-react';
/**
 * BottomMetrics component displays four metric cards at the bottom of the dashboard
 * Each card shows a key metric with a link to view more details
 */
const BottomMetrics = () => {
    // Array of metric card data
    const metrics = [
        {
            id: '1',
            title: 'Organizations',
            value: '42',
            subtitle: 'Active organizations',
            linkText: 'View all organizations',
            icon: 'Building2',
            color: 'emerald',
        },
        {
            id: '2',
            title: 'AI Recommendations',
            value: '1,245',
            subtitle: 'Resources recommended',
            linkText: 'View all analytics',
            icon: 'Brain',
            color: 'blue',
        },
        {
            id: '3',
            title: 'Hotline',
            value: '324',
            subtitle: 'Calls this week',
            linkText: 'View hotline activity',
            icon: 'Phone',
            color: 'purple',
        },
        {
            id: '4',
            title: 'Subscriptions',
            value: '$25.8K',
            subtitle: 'Monthly recurring revenue',
            linkText: 'View subscriber details',
            icon: 'CreditCard',
            color: 'pink',
        },
    ];
    /**
     * Returns the appropriate color classes based on the color prop
     * @param color - The color scheme to use
     * @returns Object with icon, text, and link color classes
     */
    const getColorClasses = (color) => {
        const colorMap = {
            emerald: {
                icon: 'bg-emerald-50 text-emerald-600',
                text: 'text-emerald-600',
                link: 'text-emerald-600 hover:text-emerald-700',
            },
            blue: {
                icon: 'bg-blue-50 text-blue-600',
                text: 'text-blue-600',
                link: 'text-blue-600 hover:text-blue-700',
            },
            purple: {
                icon: 'bg-purple-50 text-purple-600',
                text: 'text-purple-600',
                link: 'text-purple-600 hover:text-purple-700',
            },
            pink: {
                icon: 'bg-pink-50 text-pink-600',
                text: 'text-pink-600',
                link: 'text-pink-600 hover:text-pink-700',
            },
        };
        // Return color classes or default to emerald if color not found
        return colorMap[color] || colorMap.emerald;
    };
    return (
    // Main container section
    _jsx("section", { className: "mb-8", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: metrics.map((metric) => {
                // Get the icon component dynamically from lucide-react
                const IconComponent = Icons[metric.icon] || Icons.Activity;
                // Get color classes for this metric
                const colors = getColorClasses(metric.color);
                return (
                // Individual metric card with white background and shadow
                _jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsx("div", { className: `${colors.icon} p-3 rounded-lg`, children: _jsx(IconComponent, { className: "w-6 h-6" }) }), _jsx("div", { children: _jsx("h4", { className: "text-sm font-medium text-gray-500", children: metric.title }) })] }), _jsx("div", { className: "mb-2", children: _jsx("div", { className: "text-3xl font-bold text-gray-900", children: metric.value }) }), _jsx("div", { className: "text-sm text-gray-500 mb-4", children: metric.subtitle }), _jsxs("button", { className: `flex items-center gap-2 text-sm font-medium ${colors.link} transition-colors`, children: [_jsx("span", { children: metric.linkText }), _jsx(Icons.ArrowRight, { className: "w-4 h-4" })] })] }, metric.id));
            }) }) }));
};
export default BottomMetrics;
