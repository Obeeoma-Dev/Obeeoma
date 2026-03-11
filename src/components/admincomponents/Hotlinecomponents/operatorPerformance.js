import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import "./hotline.css";
const defaultOperators = [
    { name: "John Smith", performance: 92 },
    { name: "Emily Brown", performance: 85 },
    { name: "Michael Jones", performance: 78 },
    { name: "Sarah Doe", performance: 65 },
];
const OperatorPerformance = ({ operators: operatorsProp }) => {
    const operators = Array.isArray(operatorsProp) && operatorsProp.length > 0 ? operatorsProp : defaultOperators;
    return (_jsx(Card, { className: "h-100 operator-performance-card mb-4", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "mb-4", style: { fontFamily: "heading" }, children: [_jsx(Card.Title, { children: "Operator Performance" }), _jsx(Card.Subtitle, { className: "text-muted", style: { fontFamily: "body" }, children: "Daily resolution rates and call volume" })] }), operators.map((operator) => (_jsxs("div", { className: "mb-4", children: [_jsxs(Row, { className: "align-items-end mb-2", children: [_jsxs(Col, { children: [_jsx("div", { className: "fw-semibold", style: { fontFamily: "body" }, children: operator.name }), _jsx("small", { className: "text-muted", style: { fontFamily: "body" }, children: operator.calls != null ? `${operator.calls} calls today` : `${operator.performance} calls today` })] }), _jsxs(Col, { className: "text-end", children: [_jsxs("div", { className: "fw-bold", style: { color: "#00A859" }, children: [operator.performance, "%"] }), _jsx("small", { className: "text-muted text-uppercase", style: { fontFamily: "body" }, children: "Resolution Rate" })] })] }), _jsx(ProgressBar, { now: operator.performance, className: "operator-progress" })] }, operator.name)))] }) }));
};
export default OperatorPerformance;
