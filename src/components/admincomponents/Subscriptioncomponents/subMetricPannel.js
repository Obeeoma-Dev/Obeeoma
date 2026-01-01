import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from 'react-bootstrap';
import { Building2, Layers, Users, BarChart3, } from 'lucide-react';
import './subscription.css';
/**
 * SubMetricPanel Component
 *
 * Visually aligned with the top stat cards used in the Subscriptions page.
 * Uses icon + change indicator layout for consistency across admin dashboards.
 */
const MetricsPanel = ({ totalOrganizations, totalSubscriptions, coveredEmployees, utilizationRate, }) => {
    return (_jsxs(Row, { className: "g-4 mb-4", children: [_jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "stat-card h-100", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "stat-card-header", children: [_jsx("div", { className: "icon-circle primary", children: _jsx(Building2, { size: 20 }) }), _jsx("span", { className: "stat-change", children: "+12% from last month" })] }), _jsx("div", { className: "stat-value", children: totalOrganizations }), _jsx("div", { className: "stat-label", children: "Total Organizations" })] }) }) }), _jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "stat-card h-100", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "stat-card-header", children: [_jsx("div", { className: "icon-circle success", children: _jsx(Layers, { size: 20 }) }), _jsx("span", { className: "stat-change", children: "+4% from last month" })] }), _jsx("div", { className: "stat-value", children: totalSubscriptions }), _jsx("div", { className: "stat-label", children: "Total Subscriptions" })] }) }) }), _jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "stat-card h-100", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "stat-card-header", children: [_jsx("div", { className: "icon-circle purple", children: _jsx(Users, { size: 20 }) }), _jsx("span", { className: "stat-change", children: "+5% from last month" })] }), _jsx("div", { className: "stat-value", children: coveredEmployees }), _jsx("div", { className: "stat-label", children: "Covered Employees" })] }) }) }), _jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(Card, { className: "stat-card h-100", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "stat-card-header", children: [_jsx("div", { className: "icon-circle success", children: _jsx(BarChart3, { size: 20 }) }), _jsx("span", { className: "stat-change", children: "+5% from last month" })] }), _jsxs("div", { className: "stat-value", children: [utilizationRate, "%"] }), _jsx("div", { className: "stat-label", children: "Utilization Rate" })] }) }) })] }));
};
export default MetricsPanel;
