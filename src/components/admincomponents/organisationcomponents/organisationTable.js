import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
/**
 * Renders a status icon based on organization status.
 * Helps users quickly identify status visually.
 */
const renderStatusIcon = (status) => {
    switch (status) {
        case "Active":
            return _jsx(FaCheckCircle, { className: "text-success me-1" });
        case "Pending":
            return _jsx(FaClock, { className: "text-warning me-1" });
        case "Inactive":
            return _jsx(FaTimesCircle, { className: "text-danger me-1" });
        default:
            return null;
    }
};
/**
 * OrganizationTable component displays a styled table of organizations.
 * Includes status icons, action buttons, and responsive layout.
 */
const OrganizationTable = ({ organizations, }) => {
    return (_jsxs("div", { className: "mt-4", children: [_jsx("h5", { className: "mb-3 fw-semibold text-success", children: "Organization List" }), _jsxs(Table, { striped: true, bordered: true, hover: true, responsive: true, className: "shadow-sm", children: [_jsx("thead", { className: "table-success", children: _jsxs("tr", { children: [_jsx("th", { children: "Organization Name" }), _jsx("th", { children: "Clients" }), _jsx("th", { children: "Programs" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Last Active" }), _jsx("th", { children: "Region" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: organizations.map((org) => (_jsxs("tr", { children: [_jsx("td", { children: org.name }), _jsx("td", { children: org.clients.toLocaleString() }), _jsx("td", { children: org.programs }), _jsxs("td", { children: [renderStatusIcon(org.status), org.status] }), _jsx("td", { children: org.lastActive }), _jsx("td", { children: org.region ?? "—" }), _jsx("td", { children: _jsx(Link, { to: `/systemadmin/organizations/${org.id}`, children: _jsxs(Button, { variant: "outline-success", size: "sm", children: [_jsx(FaEye, { className: "me-1" }), "View Details"] }) }) })] }, org.id))) })] })] }));
};
export default OrganizationTable;
