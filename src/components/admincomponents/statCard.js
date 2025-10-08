import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Badge } from 'react-bootstrap';
// Import icons from lucide-react
import * as Icons from 'lucide-react';
/**
 * StatCard component displays a metric with:
 * - Title
 * - Value
 * - Change indicator
 * - Icon
 * Uses React Bootstrap Card and Badge components
 */
const StatCard = ({ data }) => {
    // Determine if the change is positive (starts with '+') for conditional styling
    const isPositive = data.change.startsWith('+');
    // Dynamically get the icon component from lucide-react
    const IconComponent = (Icons[data.icon] ?? Icons.Activity);
    // Set icon color based on change direction
    const iconColor = isPositive ? '#059669' : '#dc3545'; // emerald vs red
    // Set badge variant and text color
    const badgeVariant = isPositive ? 'success' : 'danger';
    return (
    // Bootstrap Card container
    _jsx(Card, { className: "shadow-sm border-0", role: "region", "aria-label": `Stat card for ${data.title}`, children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex justify-content-between align-items-start mb-3", children: [_jsx("div", { className: `rounded p-2 d-flex align-items-center justify-content-center ${data.iconColor}`, style: { backgroundColor: '#e6f4ea', width: '40px', height: '40px' }, children: _jsx(IconComponent, { size: 20, color: iconColor }) }), _jsx(Badge, { bg: badgeVariant, className: "px-2 py-1 text-uppercase small", children: data.change })] }), _jsxs("div", { children: [_jsx("h3", { className: "fw-bold mb-1", children: data.value }), _jsx("p", { className: "text-muted small mb-0", children: data.title })] })] }) }));
};
// Export the component for use in DashboardStats
export default StatCard;
