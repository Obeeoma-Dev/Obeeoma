import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from 'react-bootstrap';
// Functional component to display metrics
const MetricsPanel = ({ totalOrganizations, totalSubscriptions, coveredEmployees, utilizationRate, }) => {
    return (_jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 3, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Total Organizations" }), _jsx(Card.Text, { children: totalOrganizations })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Total Subscriptions" }), _jsx(Card.Text, { children: totalSubscriptions })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Covered Employees" }), _jsx(Card.Text, { children: coveredEmployees })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Utilization Rate" }), _jsxs(Card.Text, { children: [utilizationRate, "%"] })] }) }) })] }));
};
export default MetricsPanel;
