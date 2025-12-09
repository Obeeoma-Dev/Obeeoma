import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Card } from "react-bootstrap";
import * as Icons from "lucide-react";
const iconColorMap = {
    "text-danger": "#dc3545",
    "text-primary": "#0d6efd",
    "text-warning": "#ffc107",
    "text-success": "#198754",
    "text-info": "#0dcaf0",
};
// Define the RecentActivities component (kept name and structure)
const RecentActivities = ({ activities }) => {
    // Return the card layout that wraps recent activities
    return (
    // Card container for the Recent Activities section (kept class names)
    _jsxs(Card, { className: "mb-4 shadow-sm border-0", children: [_jsx(Card.Header, { className: "bg-white fw-bold fs-5 px-3 py-3 border-0", children: "Recent Activities" }), _jsx(Card.Body, { className: "px-3 py-3", children: _jsx("div", { className: "d-flex flex-column gap-3", children: activities.map((activity, index) => {
                        const IconComponent = (Icons[activity.icon] ?? Icons.Activity);
                        const iconFgColor = iconColorMap[activity.iconColor] || "#3CB371";
                        return (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between w-100", children: [_jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle d-flex align-items-center justify-content-center", style: { width: "50px", height: "50px" }, "data-testid": `activity-icon-${activity.id}`, children: _jsx(IconComponent, { size: 22, color: iconFgColor }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: activity.type }), _jsx("div", { className: "text-muted small", children: activity.details })] })] }), _jsx("div", { className: "text-muted small text-nowrap", children: activity.time })] }), _jsx("div", { className: "text-end", children: _jsx(Icons.ChevronRight, { size: 20, color: "#6c757d" }) })] }), index < activities.length - 1 && (_jsx("div", { className: "border-bottom border-secondary" }))] }, activity.id));
                    }) }) })] }));
};
// Export the component for use in dashboard layout (kept as-is)
export default RecentActivities;
