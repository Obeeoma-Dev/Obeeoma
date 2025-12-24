import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
/**
 * MetricsPanel Component
 *
 * Displays key subscription metrics in a card layout matching the design specification.
 * Each metric card shows the main value with a percentage change indicator.
 * Maintains backward compatibility with existing props interface.
 *
 * @param totalOrganizations - Number of total organizations
 * @param totalSubscriptions - Number of total subscriptions
 * @param coveredEmployees - String representation of covered employees (e.g., "4.2k")
 * @param utilizationRate - Percentage value for utilization rate
 * @returns React functional component with styled metric cards
 */
const MetricsPanel = ({ totalOrganizations, totalSubscriptions, coveredEmployees, utilizationRate, }) => {
    return (
    // Main container row with bottom margin for spacing
    _jsxs(Row, { className: "mb-4 g-3", children: [_jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", children: "Total Organizations" }), _jsx("div", { className: "fw-bold fs-4 mb-1", children: totalOrganizations }), _jsx("div", { className: "text-success small fw-medium", children: "+12% from last month" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", children: "Total Subscriptions" }), _jsx("div", { className: "fw-bold fs-4 mb-1", children: totalSubscriptions }), _jsx("div", { className: "text-success small fw-medium", children: "+4% from last month" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", children: "Covered Employees" }), _jsx("div", { className: "fw-bold fs-4 mb-1", children: coveredEmployees }), _jsx("div", { className: "text-success small fw-medium", children: "+5% from last month" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsxs(Card.Body, { className: "p-3", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", children: "Utilization Rate" }), _jsxs("div", { className: "fw-bold fs-4 mb-1", children: [utilizationRate, "%"] }), _jsx("div", { className: "text-success small fw-medium", children: "+5% from last month" })] }) }) })] }));
};
export default MetricsPanel;
