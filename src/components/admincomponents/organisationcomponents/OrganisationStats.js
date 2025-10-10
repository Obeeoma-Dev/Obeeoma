import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col } from "react-bootstrap";
// Component to display top-level organization stats
const OrganizationStats = () => {
    return (_jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 3, children: _jsx(Card, { className: "text-center border-success", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Total Organizations" }), _jsx(Card.Text, { className: "fs-4 fw-bold text-success", children: "42" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "text-center border-success", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Total Clients" }), _jsx(Card.Text, { className: "fs-4 fw-bold text-success", children: "1,284" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "text-center border-success", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Active Programs" }), _jsx(Card.Text, { className: "fs-4 fw-bold text-success", children: "68" })] }) }) }), _jsx(Col, { md: 3, children: _jsx(Card, { className: "text-center border-success", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Regional Coverage" }), _jsx(Card.Text, { className: "fs-4 fw-bold text-success", children: "6" })] }) }) })] }));
};
export default OrganizationStats;
