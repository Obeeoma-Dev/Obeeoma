import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Table } from "react-bootstrap";
// Import all Lucide icons as a dynamic map
import * as Icons from "lucide-react";
// Define a mapping of Bootstrap-style color keys to pastel hex codes
const bgColorMap = {
    "bg-light": "#f0f4f8", // Neutral gray
    "bg-success": "#e6f4ea", // Soft green
    "bg-info": "#e7f1ff", // Soft blue
    "bg-warning": "#fff4e5", // Soft orange
    "bg-danger": "#fde7f3", // Soft pink
};
// Define the RecentActivities component
const RecentActivities = ({ activities }) => {
    return (
    // Card container for the Recent Activities section
    _jsxs(Card, { className: "mb-4 shadow-sm border-0", children: [_jsx(Card.Header, { className: "bg-white fw-bold fs-5 px-3 py-3", children: "Recent Activities" }), _jsx(Card.Body, { className: "px-3 py-3", children: _jsxs(Table, { responsive: true, borderless: true, className: "align-middle table-sm", children: [_jsx("thead", { className: "bg-body-tertiary border-bottom", children: _jsxs("tr", { className: "text-dark fw-semibold small", children: [_jsx("th", { children: " Activity Type " }), _jsx("th", { children: " Details " }), _jsx("th", { children: " Time " }), _jsx("th", { children: " Action " })] }) }), _jsx("tbody", { children: activities.map((activity) => {
                                // Dynamically select icon from Lucide or fallback to generic Activity icon
                                const IconComponent = (Icons[activity.icon] ??
                                    Icons.Activity);
                                // Resolve pastel background color for icon container
                                const iconBgColor = bgColorMap[activity.iconColor] || "#f0f4f8";
                                return (
                                // Render a table row for each activity
                                _jsxs("tr", { children: [_jsx("td", { children: _jsxs("div", { className: "d-flex align-items-center gap-2 mb-3", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: {
                                                            backgroundColor: iconBgColor,
                                                            width: "40px",
                                                            height: "40px",
                                                        }, "data-testid": `activity-icon-${activity.id}`, children: _jsx(IconComponent, { size: 18, color: "#3CB371" }) }), _jsx("span", { className: "fw-semibold", children: activity.type })] }) }), _jsx("td", { className: "text-muted small", children: activity.details }), _jsx("td", { className: "text-muted small", children: activity.time }), _jsx("td", { className: "text-center", children: _jsx(Icons.MoreVertical, { size: 18, color: "#6c757d" }) })] }, activity.id));
                            }) })] }) })] }));
};
// Export the component for use in dashboard layout
export default RecentActivities;
