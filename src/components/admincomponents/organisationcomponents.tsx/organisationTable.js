import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from "react-bootstrap";
// Static table of organizations
const OrganizationTable = () => {
    return (_jsxs(Table, { striped: true, bordered: true, hover: true, responsive: true, className: "mt-3", children: [_jsx("thead", { className: "table-success", children: _jsxs("tr", { children: [_jsx("th", { children: "Organization Name" }), _jsx("th", { children: "Clients" }), _jsx("th", { children: "Programs" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Last Active" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "Wellness Center Inc." }), _jsx("td", { children: "284" }), _jsx("td", { children: "12" }), _jsx("td", { children: "Active" }), _jsx("td", { children: "2 hours ago" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Community Mental Health" }), _jsx("td", { children: "194" }), _jsx("td", { children: "8" }), _jsx("td", { children: "Active" }), _jsx("td", { children: "3 hours ago" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Urban Outreach" }), _jsx("td", { children: "134" }), _jsx("td", { children: "6" }), _jsx("td", { children: "Inactive" }), _jsx("td", { children: "2 days ago" })] })] })] }));
};
export default OrganizationTable;
