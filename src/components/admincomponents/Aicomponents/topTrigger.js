import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
import './aicomponent.css';
const TopTriggers = ({ triggers }) => {
    return (_jsx(Card, { className: "mb-4 shadow-sm", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "mb-4 d-flex align-items-center", style: { fontFamily: 'heading' }, children: [_jsx(ExclamationCircleFill, { className: "me-2 text-danger", size: 24 }), _jsx("div", { children: _jsx(Card.Title, { className: "mb-0", children: "Top Anxiety Triggers" }) })] }), triggers.map((trigger) => (_jsxs("div", { className: "mb-4", children: [_jsxs(Row, { className: "align-items-center mb-2", children: [_jsx(Col, { children: _jsx("div", { className: "fw-semibold", style: { fontFamily: 'body' }, children: trigger.name }) }), _jsx(Col, { xs: "auto", children: _jsxs("div", { className: "fw-bold text-dark", children: [trigger.score, "%"] }) })] }), _jsx(ProgressBar, { now: trigger.score, style: { height: '6px' }, variant: trigger.score >= 75 ? 'danger' :
                                trigger.score >= 65 ? 'warning' :
                                    trigger.score >= 55 ? 'info' :
                                        'secondary', className: "trigger" })] }, trigger.name)))] }) }));
};
export default TopTriggers;
