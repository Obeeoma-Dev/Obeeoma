import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button, Row, Col } from "react-bootstrap";
const TopMetrics = ({ totalCalls, avgCallTime, missedCalls, }) => {
    return (_jsx(Card, { className: "mb-4", children: _jsxs(Card.Body, { children: [_jsxs(Row, { children: [_jsxs(Col, { md: 4, children: [_jsx("h5", { children: "Total Calls" }), _jsx("p", { children: totalCalls })] }), _jsxs(Col, { md: 4, children: [_jsx("h5", { children: "Average Call Time" }), _jsx("p", { children: avgCallTime })] }), _jsxs(Col, { md: 4, children: [_jsx("h5", { children: "Missed Calls" }), _jsx("p", { children: missedCalls })] })] }), _jsx(Button, { variant: "success", className: "mt-3", children: "New Schedule" })] }) }));
};
export default TopMetrics;
