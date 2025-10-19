import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Badge } from 'react-bootstrap';
import { ExclamationCircleFill } from 'react-bootstrap-icons';
// Functional component rendering anxiety triggers as badges
const TopTriggers = ({ triggers }) => {
    return (_jsxs(Card, { className: "shadow-sm mb-4", children: [_jsxs(Card.Header, { className: "fw-semibold d-flex align-items-center", children: [_jsx(ExclamationCircleFill, { className: "me-2 text-danger", size: 20 }), "Top Anxiety Triggers"] }), _jsx(Card.Body, { children: triggers.map((trigger) => (_jsx(Badge, { bg: "danger", className: "me-2 mb-2", style: { fontSize: '0.9rem' }, children: trigger }, trigger))) })] }));
};
export default TopTriggers;
