import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Button } from "react-bootstrap";
// Import the shared MetricCard component and its type
import MetricCard from "../Commoncomponents/metricCard";
/**
 * OrganizationStats component displays top-level organization metrics
 * Uses MetricCard for consistent layout and styling
 */
const OrganizationStats = ({ stats }) => {
    return (
    // Section wrapper with bottom margin
    _jsxs("section", { className: "mb-4", children: [_jsxs("div", { className: "d-flex justify-content-between align-items-center mb-3", children: [_jsx("h4", { className: "fw-semibold text-dark", children: "Organizations" }), _jsx(Button, { variant: "success", size: "sm", children: "+ Add Organization" })] }), _jsx(Row, { children: stats.map((stat, index) => (
                // Responsive column for each card
                _jsx(Col, { xs: 12, sm: 6, md: 3, className: "mb-3", children: _jsx(MetricCard, { id: stat.id, title: stat.title, value: stat.value, change: stat.change, subtitle: stat.subtitle, linkText: stat.linkText, icon: stat.icon, color: stat.color }) }, index))) })] }));
};
// Export the component for use in dashboard layout
export default OrganizationStats;
