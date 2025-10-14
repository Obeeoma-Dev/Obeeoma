import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from 'react-bootstrap';
const AIResourcesTable = ({ resources }) => (_jsxs("div", { className: "mb-4", children: [_jsx("h5", { children: "AI Resources" }), _jsxs(Table, { striped: true, bordered: true, hover: true, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Resource" }), _jsx("th", { children: "Status" })] }) }), _jsx("tbody", { children: resources.map((res) => (_jsxs("tr", { children: [_jsx("td", { children: res.name }), _jsx("td", { children: res.status })] }, res.name))) })] })] }));
export default AIResourcesTable;
