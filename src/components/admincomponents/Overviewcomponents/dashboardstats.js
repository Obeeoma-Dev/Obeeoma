import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, Col } from "react-bootstrap";
import * as Icons from "lucide-react";
/**
 * DashboardStats renders a responsive row of stat cards
 * Each card displays an icon, title, value, and change indicator
 * Styled to match modern dashboard layout
 */
const DashboardStats = ({ stats }) => {
    return (_jsx(_Fragment, { children: stats.map((stat) => {
            const IconComponent = Icons[stat.icon];
            return (_jsx(Col, { xs: 12, sm: 6, md: 3, className: "mb-4", children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { className: "d-flex flex-column justify-content-between p-3", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-3", children: [_jsx("div", { className: `d-flex align-items-center justify-content-center`, children: _jsx(IconComponent, { size: 20, style: { color: "#198754" } }) }), _jsx("span", { className: "badge text-success fw-medium", style: { fontSize: "0.75rem", padding: "0.4em 0.6em" }, children: stat.change })] }), _jsxs("div", { children: [_jsx("div", { className: "fs-3 fw-bold text-dark", children: stat.value }), _jsx("div", { className: "text-muted small", children: stat.title })] })] }) }) }, stat.id));
        }) }));
};
export default DashboardStats;
