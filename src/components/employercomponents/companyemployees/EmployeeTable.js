import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
const EmployeeTable = ({ searchQuery, onSearchChange }) => {
    // TODO: Replace with API data
    const employees = [
        {
            id: 1,
            name: "Paul Lwanga",
            email: "paul@example.com",
            department: "Marketing",
            status: "Active",
            avatar: "J",
        },
        {
            id: 2,
            name: "Alex Agbonifo",
            email: "alex@example.com",
            department: "HR",
            status: "Active",
            avatar: "A",
        },
        {
            id: 3,
            name: "Sam Mukwano",
            email: "sam@example.com",
            department: "Finance",
            status: "Active",
            avatar: "S",
        },
        {
            id: 4,
            name: "Orena",
            email: "orenagedion2020@gmail.com",
            department: "Engineering",
            status: "Pending",
            avatar: "O",
        },
    ];
    const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (checked) => {
        setIsChecked(checked);
    };
    const loadAddEmployeeForm = () => {
        // Logic to load the Add Employee form/modal
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "d-flex justify-content-between align-items-center", children: _jsx("h2", { className: "h5 fw-semibold mb-0", children: "Employees" }) }) }) }), _jsxs("div", { className: "row mb-3", children: [_jsx("div", { className: "col-8 col-md-6", children: _jsxs("div", { className: "position-relative", children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search employees...", className: "form-control ps-5", value: searchQuery, onChange: (e) => onSearchChange(e.target.value) })] }) }), _jsx("div", { className: "col-4 col-md-6 text-end" }), _jsx("button", { type: "button", className: "btn btn-success", "data-toggle": "modal", "data-target": "#employeeInviteModal", "data-whatever": "@mdo", onClick: loadAddEmployeeForm, children: "Add Employee" })] }), _jsx("div", { className: "modal fade", id: "exampleModal", tabIndex: -1, role: "dialog", "aria-labelledby": "employeeInviteModal", "aria-hidden": "true", children: _jsx("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: _jsxs("div", { className: "modal-content", children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { className: "modal-title", id: "employeeInviteModal", children: "Invite" }), _jsx("button", { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close", children: _jsx("span", { "aria-hidden": "true", children: "\u00D7" }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("form", { children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "employee-email", className: "col-form-label", children: "Email address:" }), _jsx("input", { type: "text", className: "form-control", id: "employee-email" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "phone", className: "col-form-label", children: "Phone number:" }), _jsx("textarea", { className: "form-control", id: "phone" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "department", className: "col-form-label", children: "Department:" }), _jsx("textarea", { className: "form-control", id: "department" })] }), _jsxs("div", { className: "form-group", children: [_jsx("a", { href: "#", className: "tooltip-test", title: "Upload an excel document", children: "Try bulk add" }), ".", _jsx("input", { type: "file", className: "form-control-file", id: "upload-excel" })] })] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { type: "button", className: "btn btn-success", children: "Add" }), _jsx("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", children: "Close" })] })] }) }) }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsx("div", { className: "card-body p-0", children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { className: "bg-light", children: _jsxs("tr", { children: [_jsx("th", { className: "border-0 ps-4 py-3 text-muted fw-normal", children: "Name" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal", children: "Email" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal", children: "Department" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal", children: "Status" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal text-end", children: "Deactivate" })] }) }), _jsx("tbody", { children: filteredEmployees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "ps-4 py-3", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle bg-light d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "fw-bold text-primary", children: employee.avatar }) }), _jsx("span", { className: "fw-medium", children: employee.name })] }) }), _jsx("td", { className: "py-3 text-muted", children: employee.email }), _jsx("td", { className: "py-3 text-muted", children: employee.department }), _jsx("td", { className: "py-3", children: _jsx("span", { className: "badge bg-success bg-opacity-10 text-success", children: employee.status }) }), _jsx("td", { className: "py-3 text-end", children: _jsx(Checkbox, { checked: isChecked, onCheckedChange: handleChange, className: "cursor-pointer " }) })] }, employee.id))) })] }) }) }) }) }) })] }));
};
export default EmployeeTable;
