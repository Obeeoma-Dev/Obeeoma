import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as Icons from "lucide-react";
/**
 * OrganizationStats component displays a grid of organization metrics
 * Styled similarly to ActivityItem cards with icon, title, value, and change
 */
const OrganizationStats = ({ stats }) => {
    return (_jsxs("section", { className: "mb-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [_jsx("h4", { className: "fw-semibold text-dark", children: "Organizations" }), _jsx(Button, { variant: "success", size: "sm", children: "+ Add Organization" })] }), _jsx(Row, { className: "gy-4", children: stats.map((stat) => {
                    // Dynamically select icon from lucide-react
                    const IconComponent = (Icons[stat.icon] ??
                        Icons.Activity);
                    return (_jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "border-0 shadow-sm mb-3", children: _jsxs(Card.Body, { className: "d-flex align-items-start justify-content-between px-2 py-3", children: [_jsxs("div", { className: "d-flex align-items-start gap-3 flex-grow-1", children: [_jsx("div", { className: "rounded d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx(IconComponent, { size: 20, color: "#3CB371" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold mb-1", children: stat.title }), _jsx("div", { className: "text-muted small", children: stat.value })] })] }), _jsx("div", { className: "text-muted small text-end", children: stat.change })] }) }) }, stat.id));
                }) })] }));
};
export default OrganizationStats;
