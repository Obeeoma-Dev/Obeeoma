import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
            // Split the stat.change string into numeric value and rest of the text
            // Example: "+8% vs yesterday" => value = "+8%", restText = "vs yesterday"
            // const [...rest] = stat.change.split(" ");
            // const restText = rest.join(" ");
            return (_jsx(Col, { xs: 12, sm: 6, md: 3, className: "mb-4", children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { className: "d-flex flex-column justify-content-between p-3", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-3", children: [_jsx("div", { className: `d-flex align-items-center justify-content-center rounded-circle p-3 ${stat.iconColor}`, style: { width: "50px", height: "50px" }, children: _jsx(IconComponent, { size: 25, className: "icon-color" }) }), _jsx("span", { className: "fw-medium", style: {
                                            fontSize: "0.75rem",
                                            padding: "0.4em 0.6em",
                                            color: stat.change.startsWith("+")
                                                ? "#3CB371"
                                                : "#dc3545",
                                            fontWeight: 600,
                                            display: "inline-block",
                                        }, children: stat.id === "4" ? (
                                        // Make whole change text red
                                        _jsx("span", { style: { color: "red" }, children: stat.change })) : (
                                        // Default for all other cards
                                        _jsx(_Fragment, { children: stat.change })) })] }), _jsxs("div", { children: [_jsx("div", { className: "fs-3 fw-bold text-dark", children: stat.value }), _jsx("div", { className: "text-muted small", children: stat.title })] })] }) }) }, stat.id));
        }) }));
};
export default DashboardStats;
