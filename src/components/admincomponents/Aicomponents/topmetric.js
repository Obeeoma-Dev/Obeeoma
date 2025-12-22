import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
import { BarChartFill, GraphUpArrow, ClockFill } from "react-bootstrap-icons"; // Bootstrap icons for visual polish
// Functional component with Bootstrap layout and icons
const TopMetrics = ({ totalRecommendations, engagementRate, averageTime, }) => {
    return (
    // Row container for 3 equal-width cards
    _jsxs(Row, { className: "mb-4 g-4", children: [_jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm border-0", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex align-items-center mb-2", children: [_jsx(BarChartFill, { className: "text-primary me-2", size: 24 }), _jsx(Card.Title, { className: "mb-0 fw-semibold", children: "Total Recommendations" })] }), _jsx(Card.Text, { className: "fs-4 fw-bold text-dark", children: totalRecommendations.toLocaleString() })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm border-0", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex align-items-center mb-2", children: [_jsx(GraphUpArrow, { className: "text-success me-2", size: 24 }), _jsx(Card.Title, { className: "mb-0 fw-semibold", children: "Engagement Rate" })] }), _jsxs(Card.Text, { className: "fs-4 fw-bold text-dark", children: [engagementRate, "%"] })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm border-0", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex align-items-center mb-2", children: [_jsx(ClockFill, { className: "text-warning me-2", size: 24 }), _jsx(Card.Title, { className: "mb-0 fw-semibold", children: "Avg Engagement Time" })] }), _jsx(Card.Text, { className: "fs-4 fw-bold text-dark", children: averageTime })] }) }) })] }));
};
export default TopMetrics;
