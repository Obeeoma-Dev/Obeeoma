import { jsx as _jsx } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
// Import the shared MetricCard component and its type
import MetricCard from "../Commoncomponents/metricCard";
/**
 * BottomMetrics component displays a grid of metric cards
 * Each card shows a key metric with icon, value, subtitle, and link
 */
const BottomMetrics = ({ metrics }) => {
    return (
    // Section wrapper with bottom margin
    _jsx("section", { className: "mb-4", children: _jsx(Row, { className: "gy-4", children: metrics.map((metric) => (
            // Responsive column for each metric card
            _jsx(Col, { xs: 12, md: 6, lg: 3, children: _jsx(MetricCard, { id: metric.id, title: metric.title, value: metric.value, subtitle: metric.subtitle, linkText: metric.linkText, icon: metric.icon, color: metric.color, change: metric.change }) }, metric.title))) }) }));
};
// Export the component for use in dashboard layout
export default BottomMetrics;
