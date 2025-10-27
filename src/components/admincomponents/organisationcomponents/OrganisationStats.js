import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col, Button } from "react-bootstrap";
/**
 * OrganizationStats component displays top-level metrics.
 * Now receives data via props instead of hardcoding.
 */
const OrganizationStats = ({ stats }) => {
    return (_jsxs("section", { className: "mb-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [_jsx("h4", { className: "fw-semibold text-dark", children: "Organizations" }), _jsx(Button, { variant: "success", size: "sm", children: "+ Add Organization" })] }), _jsx(Row, { children: stats.map((stat, index) => (_jsx(Col, { xs: 12, sm: 6, md: 3, className: "mb-3", children: _jsx(Card, { className: "border-0 shadow-sm h-100", children: _jsxs(Card.Body, { className: "d-flex flex-column justify-content-between", children: [_jsxs("div", { children: [_jsx(Card.Title, { className: "text-muted fs-6 mb-1", children: stat.title }), _jsx(Card.Text, { className: "fs-3 fw-bold text-success mb-0", children: stat.value.toLocaleString() })] }), stat.change !== undefined && (_jsxs("div", { className: "text-muted small mt-2", children: [_jsxs("span", { className: "text-success", children: ["+", stat.change, "%"] }), " this month"] }))] }) }) }, index))) })] }));
};
export default OrganizationStats;
