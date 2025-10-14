import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from 'react-bootstrap';
const TopTriggers = ({ triggers }) => (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "Top Anxiety Triggers" }), triggers.map((trigger) => (_jsx(Badge, { bg: "danger", className: "me-2", children: trigger }, trigger)))] }));
export default TopTriggers;
