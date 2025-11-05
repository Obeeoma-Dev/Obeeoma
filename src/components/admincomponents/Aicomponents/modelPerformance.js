import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { Speedometer } from 'react-bootstrap-icons';
// Functional component rendering model scores with visual polish
const ModelPerformance = ({ performance }) => {
    return (_jsxs(Card, { className: "shadow-sm mb-4", children: [_jsxs(Card.Header, { className: "fw-semibold d-flex align-items-center", children: [_jsx(Speedometer, { className: "me-2 text-primary", size: 20 }), "AI Model Performance"] }), _jsx(Card.Body, { className: "p-0", children: _jsx(ListGroup, { variant: "flush", children: performance.map((model) => (_jsxs(ListGroup.Item, { className: "d-flex justify-content-between align-items-center", children: [_jsx("span", { children: model.name }), _jsxs(Badge, { bg: model.score >= 85
                                    ? 'success'
                                    : model.score >= 70
                                        ? 'warning'
                                        : 'danger', children: [model.score, "%"] })] }, model.name))) }) })] }));
};
export default ModelPerformance;
