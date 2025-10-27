import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button } from "react-bootstrap";
// Import all icons from lucide-react as a dynamic map
import * as Icons from "lucide-react";
/**
 * MetricCard component displays a single metric block.
 * Can be reused across multiple dashboard sections.
 */
const MetricCard = ({ title, value, subtitle, linkText, icon, color = "emerald", change, }) => {
    // Dynamically select icon from lucide-react
    const IconComponent = (Icons[icon] ?? Icons.Activity);
    // Define color palette for icons
    const colorMap = {
        emerald: "#3CB371",
        blue: "#3CB371",
        purple: "#3CB371",
        pink: "#3CB371",
    };
    // Fallback to emerald if color key is missing
    const iconColor = colorMap[color] || colorMap.emerald;
    return (
    // Bootstrap card container
    _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex align-items-start gap-2 mb-2", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: { width: "24px", height: "24px" }, children: _jsx(IconComponent, { size: 20, color: iconColor }) }), _jsx("h6", { className: "text-muted fw-semibold mb-0", children: title })] }), _jsx("h3", { className: "fw-bold mb-2", children: value }), subtitle && _jsx("p", { className: "text-muted small mb-2", children: subtitle }), change !== undefined && (_jsxs("p", { className: "text-muted small mb-2", children: [_jsxs("span", { className: "text-success", children: ["+", change, "%"] }), " this month"] })), linkText && (_jsxs(Button, { variant: "link", className: "p-0 text-success d-flex align-items-center gap-2", children: [_jsx("span", { children: linkText }), _jsx(Icons.ArrowRight, { size: 16 })] }))] }) }));
};
export default MetricCard;
