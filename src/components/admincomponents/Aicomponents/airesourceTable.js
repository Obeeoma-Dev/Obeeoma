import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Badge, Card } from 'react-bootstrap';
import { CheckCircleFill, ExclamationTriangleFill, } from 'react-bootstrap-icons';
// Functional component with styled header and status icons
const AIResourcesTable = ({ resources }) => {
    return (_jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "AI Resources Overview" }), _jsx(Card.Body, { className: "p-0", children: _jsxs(Table, { responsive: true, striped: true, hover: true, className: "mb-0", children: [_jsx("thead", { className: "table-light", children: _jsxs("tr", { children: [_jsx("th", { children: "Resource" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: resources.map((res) => (_jsxs("tr", { children: [_jsx("td", { className: "align-middle", children: res.name }), _jsx("td", { className: "align-middle", children: res.status === 'High Effectiveness' ? (_jsxs(Badge, { bg: "success", className: "d-flex align-items-center gap-2", children: [_jsx(CheckCircleFill, { size: 16 }), res.status] })) : (_jsxs(Badge, { bg: "warning", text: "dark", className: "d-flex align-items-center gap-2", children: [_jsx(ExclamationTriangleFill, { size: 16 }), res.status] })) })] }, res.name))) })] }) })] }));
};
export default AIResourcesTable;
