import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card, Button } from "react-bootstrap";
// Import all icons from lucide-react as a dynamic map
import * as Icons from "lucide-react";
/**
 * BottomMetrics component displays a grid of metric cards
 * Each card shows a key metric with icon, value, subtitle, and link
 */
const BottomMetrics = ({ metrics }) => {
    return (
    // Section wrapper with bottom margin
    _jsx("section", { className: "mb-4", children: _jsx(Row, { className: "gy-4", children: metrics.map((metric) => {
                // Dynamically select icon from lucide-react
                const IconComponent = (Icons[metric.icon] ??
                    Icons.Activity);
                // Define color palette for icons and backgrounds
                const colorMap = {
                    emerald: "#3CB371",
                    blue: "#3CB371",
                    purple: "#3CB371",
                    pink: "#3CB371",
                };
                // Fallbacks for unknown color keys
                const iconColor = colorMap[metric.color] || colorMap.emerald;
                // const iconBgColor = bgColorMap[metric.color] || bgColorMap.emerald;
                return (
                // Responsive column for each card
                _jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "shadow-sm border-0 h-90 hover-shadow", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex align-items-start gap-2 mb-2", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: {
                                                width: "20px",
                                                height: "20px",
                                            }, children: _jsx(IconComponent, { size: 24, color: iconColor }) }), _jsx("div", { children: _jsx("h6", { className: "text-muted fw-semibold mb-1", children: metric.title }) })] }), _jsx("h3", { className: "fw-bold display-6 mb-2", children: metric.value }), _jsx("p", { className: "text-muted small mb-3", children: metric.subtitle }), _jsxs(Button, { variant: "link", className: "p-0 text-success d-flex align-items-center gap-2", children: [_jsx("span", { children: metric.linkText }), _jsx(Icons.ArrowRight, { size: 16 })] })] }) }) }, metric.id));
            }) }) }));
};
// Export the component for use in dashboard layout
export default BottomMetrics;
