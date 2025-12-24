import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, ListGroup } from "react-bootstrap";
const cases = [
    { id: "04567", reason: "Abuse", status: "Pending", assignedTo: "John Smith" },
];
const CriticalCases = () => {
    return (_jsx(Card, { className: "mb-4", children: _jsxs(Card.Body, { children: [_jsx("h5", { children: "Critical Cases" }), _jsx(ListGroup, { children: cases.map((c) => (_jsxs(ListGroup.Item, { children: [_jsx("strong", { children: "Case ID:" }), " ", c.id, " | ", _jsx("strong", { children: "Reason:" }), " ", c.reason, " | ", _jsx("strong", { children: "Status:" }), " ", c.status, " |", " ", _jsx("strong", { children: "Assigned to:" }), " ", c.assignedTo] }, c.id))) })] }) }));
};
export default CriticalCases;
