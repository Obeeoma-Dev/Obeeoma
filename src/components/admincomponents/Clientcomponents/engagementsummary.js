import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
// Functional component with props for dynamic rendering
const EngagementSummary = ({ engagementRate, activePrograms, totalPoints, }) => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("h2", { className: "mb-3", children: "Client Engagement & Rewards" }), _jsxs(Row, { className: "g-3", children: [_jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm border-0 text-center", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "text-success", children: "Engagement Rate" }), _jsxs("h3", { className: "fw-bold", children: [engagementRate, "%"] })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm border-0 text-center", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "text-success", children: "Active Reward Programs" }), _jsx("h3", { className: "fw-bold", children: activePrograms })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm border-0 text-center", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "text-success", children: "Rewards Assisted" }), _jsx("h3", { className: "fw-bold", children: totalPoints.toLocaleString() })] }) }) })] })] }));
};
export default EngagementSummary;
