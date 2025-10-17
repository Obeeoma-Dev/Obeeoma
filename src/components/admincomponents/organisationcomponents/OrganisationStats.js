import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col, Button } from "react-bootstrap";
/**
 * OrganizationStats component displays top-level metrics
 * using placeholder data for now.
 * Includes a header row with title and action button.
 */
const OrganizationStats = () => {
    // Placeholder data — replace with props or API data when backend is ready
    const stats = [
        { title: "Total Organizations", value: 42 },
        { title: "Total Clients", value: 1284 },
        { title: "Active Programs", value: 68 },
        { title: "Regional Coverage", value: 6 },
    ];
    return (_jsxs("section", { className: "mb-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [_jsx("h4", { className: "text-success fw-semibold", children: "Organizations Overview" }), _jsx(Button, { variant: "success", size: "sm", children: "+ Add Organization" })] }), _jsx(Row, { children: stats.map((stat, index) => (_jsx(Col, { xs: 12, sm: 6, md: 3, className: "mb-3", children: _jsx(Card, { className: "text-center border-success shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "text-muted fs-6", children: stat.title }), _jsx(Card.Text, { className: "fs-3 fw-bold text-success", children: stat.value.toLocaleString() })] }) }) }, index))) })] }));
};
export default OrganizationStats;
