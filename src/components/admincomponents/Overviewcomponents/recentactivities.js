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
    _jsxs(Card, { className: "mb-4 shadow-sm border-0 h-100", children: [_jsx(Card.Header, { className: "bg-white fw-bold fs-5 px-4 py-3 border-0", style: { fontFamily: "heading" }, children: "Recent Activities" }), _jsx(Card.Body, { className: "px-4 py-3", children: _jsx("div", { className: "d-flex flex-column gap-0", children: activities.map((activity, index) => {
                        const IconComponent = (Icons[activity.icon] ??
                            Icons.Activity);
                        const iconFgColor = iconColorMap[activity.iconColor] || "#3CB371";
                        return (_jsxs(React.Fragment, { children: [_jsx("div", { className: "py-3 px-2 d-flex justify-content-between align-items-center", style: {
                                        borderRadius: "8px",
                                        transition: "background-color 0.2s",
                                    }, onMouseEnter: (e) => (e.currentTarget.style.backgroundColor = "#f8f9fa"), onMouseLeave: (e) => (e.currentTarget.style.backgroundColor = "transparent"), children: _jsxs("div", { className: "d-flex align-items-center justify-content-between w-100", children: [_jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle d-flex align-items-center justify-content-center flex-shrink-0", style: {
                                                            width: "48px",
                                                            height: "48px",
                                                            backgroundColor: "#f0f5f2",
                                                        }, "data-testid": `activity-icon-${activity.id}`, children: _jsx(IconComponent, { size: 24, color: iconFgColor }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-600 text-dark", style: { fontSize: "0.95rem", fontFamily: "body" }, children: activity.type }), _jsx("div", { className: "text-muted small", style: { fontSize: "0.85rem", fontFamily: "body" }, children: activity.details })] })] }), _jsx("div", { className: "text-muted small text-nowrap ms-3", style: { fontSize: "0.8rem", fontFamily: "body" }, children: activity.time })] }) }), index < activities.length - 1 && (_jsx("div", { className: "border-bottom", style: { borderColor: "#e9ecef" } }))] }, activity.id));
                    }) }) })] }));
};
// Export the component for use in dashboard layout (kept as-is)
export default RecentActivities;
