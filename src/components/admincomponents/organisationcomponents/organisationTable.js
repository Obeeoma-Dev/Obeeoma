import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Table, Button, Tabs, Tab, Form, Row, Col, InputGroup, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle, FaSearch, } from "react-icons/fa";
import "./organisation.css";
// Render status icon based on status
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
// Main dashboard component
const OrganizationDashboard = ({ organizations, }) => {
    // State for search input
    const [searchTerm, setSearchTerm] = useState("");
    // Filter organizations by tab category
    const filterByTab = (tab) => {
        switch (tab) {
            case "Active":
                return organizations.filter((org) => org.status === "Active");
            case "Inactive":
                return organizations.filter((org) => org.status === "Inactive");
            case "Premium":
                return organizations.filter((org) => org.plan === "Premium");
            case "Freemium":
                return organizations.filter((org) => org.plan === "Freemium");
            default:
                return organizations;
        }
    };
    // Filter by search term
    const filterBySearch = (orgs) => orgs.filter((org) => `${org.name} ${org.id} ${org.plan}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()));
    // Render table rows
    const renderTable = (orgs) => (_jsxs(Table, { bordered: true, hover: true, responsive: true, className: "shadow-sm table-sm align-middle", children: [_jsx("thead", { className: "table-success align-middle", children: _jsxs("tr", { children: [_jsx("th", { children: "Organization" }), _jsx("th", { children: "Clients" }), _jsx("th", { children: "Plan" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Last Active" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: orgs.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center text-muted py-4", children: "No organizations found." }) })) : (orgs.map((org) => (_jsxs("tr", { children: [_jsx("td", { children: _jsxs("div", { className: "d-flex align-items-center", children: [org.icon && org.icon.startsWith("http") && (_jsx("img", { src: org.icon, alt: `${org.name} logo`, className: "me-2", style: {
                                            width: "32px",
                                            height: "32px",
                                            objectFit: "cover",
                                            borderRadius: "4px",
                                        } })), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: org.name }), _jsxs("div", { className: "text-muted small", children: ["ID: ", org.id] })] })] }) }), _jsx("td", { children: org.clients.toLocaleString() }), _jsx("td", { children: _jsx("span", { className: `badge ${org.plan === "Premium" ? "bg-success" : "bg-secondary"}`, children: org.plan }) }), _jsxs("td", { children: [renderStatusIcon(org.status), org.status] }), _jsx("td", { children: _jsx("span", { className: "text-muted", children: org.lastActive }) }), _jsx("td", { children: _jsx(Link, { to: `/systemadmin/organizations/${org.id}`, children: _jsxs(Button, { variant: "outline-success", size: "sm", children: [_jsx(FaEye, { className: "me-1" }), "View Details"] }) }) })] }, org.id)))) })] }));
    return (_jsxs("div", { className: "mt-4", children: [_jsxs(Row, { className: "mb-3 align-items-center", children: [_jsx(Col, { children: _jsx("h5", { className: "fw-semibold text-success", style: { fontFamily: "heading" }, children: "Organization Dashboard" }) }), _jsx(Col, { className: "text-end", children: _jsx(Button, { className: "btn-organization", children: "+ Add Organization" }) })] }), _jsx(Row, { className: "mb-3", children: _jsx(Col, { md: 6, children: _jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { children: _jsx(FaSearch, {}) }), _jsx(Form.Control, { type: "text", placeholder: "Search by name, ID, or plan...", "aria-label": "Search organizations", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }) }) }), _jsx("style", { children: `
    .nav-pills .nav-link.active {
      background-color: #3CB371 !important;
      color: white !important;
    }

    .nav-pills .nav-link {
      border-radius: 6px;
      margin-right: 4px;
    }

    .nav-pills .nav-link:hover {
      background-color: #0B6E45 !important;
      color: white !important;
    }
  ` }), _jsx(Tabs, { defaultActiveKey: "All", className: "mb-3", justify: true, variant: "pills", "aria-label": "Organization filters", children: ["All", "Active", "Inactive", "Premium", "Freemium"].map((tab) => (_jsx(Tab, { eventKey: tab, title: tab, children: renderTable(filterBySearch(filterByTab(tab))) }, tab))) })] }));
};
export default OrganizationDashboard;
