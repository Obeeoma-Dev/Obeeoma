import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListGroup } from 'react-bootstrap';
const ModelPerformance = ({ performance }) => (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "AI Model Performance" }), _jsx(ListGroup, { children: performance.map((model) => (_jsxs(ListGroup.Item, { children: [model.name, ": ", model.score, "%"] }, model.name))) })] }));
export default ModelPerformance;
