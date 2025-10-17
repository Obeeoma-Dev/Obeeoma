import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
// Define the component using React.FC for type safety
const EngagementStatsPanel = () => {
    return (_jsx(Card, { className: "mt-4", children: _jsx(Card.Body, { children: _jsxs(Row, { children: [_jsxs(Col, { md: 4, children: [_jsx("h5", { children: "Top Rewards" }), _jsxs(ListGroup, { variant: "flush", children: [_jsx(ListGroup.Item, { children: "Madison Carano \u2013 1,200 pts" }), _jsx(ListGroup.Item, { children: "William Johnson \u2013 980 pts" }), _jsx(ListGroup.Item, { children: "Preston Corbett \u2013 870 pts" })] })] }), _jsxs(Col, { md: 4, children: [_jsx("h5", { children: "Engagement Trends" }), _jsx("p", { children: "Weekly Engagement: +5%" }), _jsx("p", { children: "Monthly Engagement: +12%" }), _jsx("p", { children: "Reward Activity: +8%" })] }), _jsxs(Col, { md: 4, children: [_jsx("h5", { children: "Streak Statistics" }), _jsx("p", { children: "7-Day Streak: 65%" }), _jsx("p", { children: "30-Day Streak: 45%" }), _jsx("p", { children: "60-Day Streak: 30%" })] })] }) }) }));
};
export default EngagementStatsPanel;
