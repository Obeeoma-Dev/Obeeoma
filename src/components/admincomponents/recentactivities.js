import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
// Import all icons from lucide-react as a dynamic map
import * as Icons from "lucide-react";
/**
 * RecentActivities component displays a list of recent system activities
 * Each activity includes an icon, type, details, and timestamp
 */
const RecentActivities = ({ activities }) => {
    // Define a mapping of Bootstrap-style color keys to pastel background hex codes
    const bgColorMap = {
        "bg-light": "#f0f4f8", // Default light gray
        "bg-success": "#e6f4ea", // Soft green
        "bg-info": "#e7f1ff", // Soft blue
        "bg-warning": "#fff4e5", // Soft orange
        "bg-danger": "#fde7f3", // Soft pink
    };
    return (
    // Card container for the Recent Activities section
    _jsxs(Card, { className: "mb-4 shadow-sm border-0", children: [_jsx(Card.Header, { className: "bg-white fw-bold fs-5 px-3 py-3", children: "Recent Activities" }), _jsx(Card.Body, { className: "px-3 py-3", children: activities.map((activity) => {
                    // Dynamically select the icon component from lucide-react
                    const IconComponent = (Icons[activity.icon] ??
                        Icons.Activity);
                    // Resolve the background color for the icon container
                    const iconBgColor = bgColorMap[activity.iconColor] || "#f0f4f8";
                    return (
                    // Bootstrap row for each activity item
                    _jsxs(Row, { className: "align-items-center mb-3 pb-3 border-bottom", children: [_jsx(Col, { xs: "auto", children: _jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: {
                                        backgroundColor: iconBgColor, // Pastel background
                                        width: "48px", // Icon container width
                                        height: "48px", // Icon container height
                                    }, "data-testid": `activity-icon-${activity.id}`, children: _jsx(IconComponent, { size: 24, color: "#0d6efd" }) }) }), _jsxs(Col, { children: [_jsx("div", { className: "fw-semibold", children: activity.type }), _jsx("div", { className: "text-muted small", children: activity.details })] }), _jsx(Col, { xs: "auto", className: "text-muted small text-end", children: activity.time })] }, activity.id));
                }) })] }));
};
// Export the component for use in dashboard layout
export default RecentActivities;
