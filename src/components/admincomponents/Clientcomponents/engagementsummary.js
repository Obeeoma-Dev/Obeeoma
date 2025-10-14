import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
// Define the component using React.FC for type safety
const EngagementSummary = () => {
    return (_jsxs(Card, { className: "mb-4", children: [_jsx(Card.Header, { children: _jsx("h2", { children: "Client Engagement & Rewards" }) }), _jsx(Card.Body, { children: _jsxs(Row, { children: [_jsxs(Col, { md: 4, children: [_jsx("strong", { children: "Engagement Rate:" }), " 78%"] }), _jsxs(Col, { md: 4, children: [_jsx("strong", { children: "Active Reward Programs:" }), " 12"] }), _jsxs(Col, { md: 4, children: [_jsx("strong", { children: "Total Points Redeemed:" }), " 285,432"] })] }) })] }));
};
export default EngagementSummary;
