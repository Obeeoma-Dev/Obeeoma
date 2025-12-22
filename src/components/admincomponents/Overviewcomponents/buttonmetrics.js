import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as Icons from "lucide-react";
/**
 * Props interface for BottomMetrics component
 * Accepts an array of BottomMetricCard objects
 */
const BottomMetrics = ({ metrics, }) => {
    // Define color palette for icons
    const colorMap = {
        emerald: "#3CB371",
        blue: "#3CB371",
        purple: "#3CB371",
        pink: "#3CB371",
    };
    return (_jsx("section", { className: "mb-4", children: _jsx(Row, { className: "gy-4", children: metrics.map((metric) => {
                // Dynamically select icon from lucide-react
                const IconComponent = (Icons[metric.icon] ??
                    Icons.Activity);
                // Resolve icon color from palette
                const iconColor = colorMap[metric.color] || colorMap.emerald;
                return (_jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { className: "d-flex flex-column justify-content-between", children: [_jsxs("div", { className: "d-flex align-items-start gap-2 mb-2", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: { width: "32px", height: "32px" }, children: _jsx(IconComponent, { size: 20, color: iconColor }) }), _jsx("h6", { className: "text-muted fw-semibold mb-0", children: metric.title })] }), _jsx("h3", { className: "fw-bold mb-2", children: metric.value }), _jsx("p", { className: "text-muted small mb-2", children: metric.subtitle }), _jsxs(Button, { variant: "link", className: "p-0 text-success d-flex align-items-center gap-2", children: [_jsx("span", { children: metric.linkText }), _jsx(Icons.ArrowRight, { size: 16 })] })] }) }) }, metric.id));
            }) }) }));
};
export default BottomMetrics;
