import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import './aicomponent.css';
const ModelPerformance = ({ performance }) => {
    return (_jsx(Card, { className: "mb-4 shadow-sm", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "mb-4", style: { fontFamily: 'heading' }, children: [_jsx(Card.Title, { children: "AI Model Performance" }), _jsx(Card.Subtitle, { className: "text-muted", style: { fontFamily: 'body' }, children: "Key metrics for evaluating model effectiveness" })] }), performance.map((item) => (_jsxs("div", { className: "mb-4", children: [_jsxs(Row, { className: "align-items-center mb-2", children: [_jsx(Col, { children: _jsx("div", { className: "fw-semibold", style: { fontFamily: 'body' }, children: item.name }) }), _jsx(Col, { xs: "auto", children: _jsxs("div", { className: "fw-bold text-dark", children: [item.score, "%"] }) })] }), _jsx(ProgressBar, { now: item.score, variant: item.score >= 85 ? 'success' :
                                item.score >= 70 ? 'primary' :
                                    item.score >= 60 ? 'warning' :
                                        'danger', className: "thin-progress" })] }, item.name)))] }) }));
};
export default ModelPerformance;
