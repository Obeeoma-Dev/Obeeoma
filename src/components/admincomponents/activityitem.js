import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Icons from "lucide-react";
/**
 * ActivityItem component displays a single activity entry
 * Includes icon, type, details, and timestamp
 */
const ActivityItem = ({ data }) => {
    // Dynamically select icon from lucide-react
    const IconComponent = (Icons[data.icon] ?? Icons.Activity);
    // Map iconColor to pastel background colors
    const bgColorMap = {
        "bg-light": "#f0f4f8",
        "bg-success": "#e6f4ea",
        "bg-info": "#e7f1ff",
        "bg-warning": "#fff4e5",
        "bg-danger": "#fde7f3",
    };
    const iconBgColor = bgColorMap[data.iconColor] || "#f0f4f8";
    return (
    // Main container with spacing and hover effect
    _jsxs("div", { className: "d-flex align-items-start justify-content-between py-3 px-2 border-bottom hover-shadow p-5", children: [_jsxs("div", { className: "d-flex align-items-start gap-3 flex-grow-1", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: {
                            backgroundColor: iconBgColor,
                            width: "40px",
                            height: "40px",
                        }, children: _jsx(IconComponent, { size: 20, color: "#0d6efd" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold mb-1", children: data.type }), _jsx("div", { className: "text-muted small", children: data.details })] })] }), _jsx("div", { className: "text-muted small text-end", children: data.time })] }));
};
export default ActivityItem;
