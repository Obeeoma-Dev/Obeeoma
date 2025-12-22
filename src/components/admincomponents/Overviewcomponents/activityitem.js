import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Icons from "lucide-react";
import { Card } from "react-bootstrap";
/**
 * ActivityItem component displays a single activity entry
 * Includes icon, type, details, and timestamp
 * Now wrapped in a Bootstrap Card for semantic clarity and visual consistency
 */
const ActivityItem = ({ data }) => {
    // Dynamically select icon from lucide-react based on string name
    const IconComponent = (Icons[data.icon] ??
        Icons.Activity);
    // Map iconColor to pastel background colors
    const bgColorMap = {
        "bg-light": "#f0f4f8",
        "bg-success": "#e6f4ea",
        "bg-info": "#e7f1ff",
        "bg-warning": "#fff4e5",
        "bg-danger": "#fde7f3",
    };
    // Fallback to light gray if no match
    const iconBgColor = bgColorMap[data.iconColor] || "#f0f4f8";
    return (
    // Bootstrap Card replaces outer div for semantic grouping and styling
    _jsx(Card, { className: "border-0 shadow-sm mb-3", children: _jsxs(Card.Body, { className: "d-flex align-items-start justify-content-between px-2 py-3", children: [_jsxs("div", { className: "d-flex align-items-start gap-3 flex-grow-1", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: {
                                backgroundColor: iconBgColor,
                                width: "40px",
                                height: "40px",
                            }, children: _jsx(IconComponent, { size: 20, color: "#3CB371" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold mb-1", children: data.type }), _jsx("div", { className: "text-muted small", children: data.details })] })] }), _jsx("div", { className: "text-muted small text-end", children: data.time })] }) }));
};
export default ActivityItem;
