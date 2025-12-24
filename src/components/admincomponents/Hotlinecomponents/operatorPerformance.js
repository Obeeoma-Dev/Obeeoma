import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, ProgressBar } from "react-bootstrap";
const operators = [
    { name: "John Smith", performance: 92 },
    { name: "Emily Brown", performance: 85 },
    { name: "Michael Jones", performance: 78 },
    { name: "Sarah Doe", performance: 65 },
];
const OperatorPerformance = () => {
    return (_jsx(Card, { className: "mb-4", children: _jsxs(Card.Body, { children: [_jsx("h5", { children: "Operator Performance" }), operators.map((op) => (_jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: op.name }), _jsx(ProgressBar, { now: op.performance, label: `${op.performance}%` })] }, op.name)))] }) }));
};
export default OperatorPerformance;
