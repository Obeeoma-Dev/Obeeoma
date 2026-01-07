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
    return (_jsx("section", { className: "mb-4", children: _jsx(Row, { className: "g-4", children: metrics.map((metric) => {
                // Dynamically select icon from lucide-react
                const IconComponent = (Icons[metric.icon] ??
                    Icons.Activity);
                // Resolve icon color from palette
                const iconColor = colorMap[metric.color] || colorMap.emerald;
                return (_jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "shadow-sm border-0 h-100", style: { transition: "all 0.3s ease" }, onMouseEnter: (e) => (e.currentTarget.style.boxShadow =
                            "0 8px 24px rgba(0,0,0,0.12)"), onMouseLeave: (e) => (e.currentTarget.style.boxShadow =
                            "0 1px 3px rgba(0,0,0,0.12)"), children: _jsxs(Card.Body, { className: "d-flex flex-column justify-content-between p-4", children: [_jsxs("div", { className: "d-flex align-items-center gap-3 mb-3", children: [_jsx("div", { className: "rounded-circle d-flex align-items-center justify-content-center flex-shrink-0", style: {
                                                width: "44px",
                                                height: "44px",
                                                backgroundColor: "#f0f5f2",
                                            }, children: _jsx(IconComponent, { size: 22, color: iconColor }) }), _jsx("h6", { className: "text-muted fw-500 mb-0", style: { fontSize: "0.85rem", fontFamily: "body" }, children: metric.title })] }), _jsx("h3", { className: "fw-bold mb-2", style: {
                                        fontSize: "1.75rem",
                                        color: "#1a1a1a",
                                        fontFamily: "body",
                                    }, children: metric.value }), _jsx("p", { className: "text-muted small mb-3", style: { fontSize: "0.85rem", fontFamily: "body" }, children: metric.subtitle }), _jsxs(Button, { variant: "link", className: "p-0 text-success d-flex align-items-center gap-2 fw-500", style: { fontSize: "0.9rem" }, children: [_jsx("span", { children: metric.linkText }), _jsx(Icons.ArrowRight, { size: 16 })] })] }) }) }, metric.id));
            }) }) }));
};
export default BottomMetrics;
