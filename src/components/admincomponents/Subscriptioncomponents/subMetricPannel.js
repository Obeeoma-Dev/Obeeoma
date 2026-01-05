import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from 'react-bootstrap';
import { Building2, Calendar, Users, TrendingUp } from 'lucide-react';
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
    _jsxs(Row, { className: "mb-4 g-3", children: [_jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsx(Card.Body, { className: "p-3", children: _jsxs("div", { className: "d-flex justify-content-between align-items-start mb-2", children: [_jsxs("div", { className: "flex-grow-1", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", style: { fontFamily: 'heading' }, children: "Total Organizations" }), _jsx("div", { className: "fw-bold fs-4 mb-1", style: { fontFamily: 'body' }, children: totalOrganizations }), _jsxs("div", { className: "text-success small fw-medium d-flex align-items-center", style: { fontFamily: 'body' }, children: [_jsx("span", { className: "me-1", children: "\u2191" }), "+12% from last month"] })] }), _jsx(Building2, { size: 24, className: "text-success" })] }) }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsx(Card.Body, { className: "p-3", children: _jsxs("div", { className: "d-flex justify-content-between align-items-start mb-2", children: [_jsxs("div", { className: "flex-grow-1", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", style: { fontFamily: 'heading' }, children: "Total Subscriptions" }), _jsx("div", { className: "fw-bold fs-4 mb-1", style: { fontFamily: 'body' }, children: totalSubscriptions }), _jsxs("div", { className: "text-success small fw-medium d-flex align-items-center", style: { fontFamily: 'body' }, children: [_jsx("span", { className: "me-1", children: "\u2191" }), "+8% from last month"] })] }), _jsx(Calendar, { size: 24, className: "text-success" })] }) }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsx(Card.Body, { className: "p-3", children: _jsxs("div", { className: "d-flex justify-content-between align-items-start mb-2", children: [_jsxs("div", { className: "flex-grow-1", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", style: { fontFamily: 'heading' }, children: "Covered Employees" }), _jsx("div", { className: "fw-bold fs-4 mb-1", style: { fontFamily: 'body' }, children: coveredEmployees }), _jsxs("div", { className: "text-success small fw-medium d-flex align-items-center", style: { fontFamily: 'body' }, children: [_jsx("span", { className: "me-1", children: "\u2191" }), "+5% from last month"] })] }), _jsx(Users, { size: 24, className: "text-success" })] }) }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "h-100 shadow-sm border-0", children: _jsx(Card.Body, { className: "p-3", children: _jsxs("div", { className: "d-flex justify-content-between align-items-start mb-2", children: [_jsxs("div", { className: "flex-grow-1", children: [_jsx(Card.Title, { className: "text-muted small fw-normal mb-1", style: { fontFamily: 'heading' }, children: "Utilization Rate" }), _jsxs("div", { className: "fw-bold fs-4 mb-1", style: { fontFamily: 'body' }, children: [utilizationRate, "%"] }), _jsxs("div", { className: "text-success small fw-medium d-flex align-items-center", style: { fontFamily: 'body' }, children: [_jsx("span", { className: "me-1", children: "\u2191" }), "+3% from last month"] })] }), _jsx(TrendingUp, { size: 24, className: "text-success" })] }) }) }) })] }));
};
export default MetricsPanel;
