import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users as UsersIcon, CreditCard, Settings as SettingsIcon, Search, Bell, Menu, X, FileText, LogOut, Plus, MessageCircle, } from "lucide-react";
const EmployeeManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const employees = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            department: "Marketing",
            status: "Active",
            avatar: "J",
        },
        {
            id: 2,
            name: "Alex Johnson",
            email: "alex@example.com",
            department: "HR",
            status: "Active",
            avatar: "A",
        },
        {
            id: 3,
            name: "Sam Wilson",
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
            status: "Active",
            avatar: "O",
        },
    ];
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
        { icon: UsersIcon, label: "Employees", path: "/management", active: true },
        { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
        { icon: FileText, label: "Reports", path: "/reports", active: false },
    ];
    const filteredEmployees = employees.filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "min-vh-100 bg-light", children: [isSidebarOpen && (_jsx("div", { className: "position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none", onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { className: `position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`, style: { width: "240px" }, children: [_jsxs("div", { className: "p-4 border-bottom d-flex align-items-center justify-content-between", children: [_jsxs("button", { onClick: () => navigate("/"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: [_jsx("div", { className: "rounded-circle bg-primary d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "text-white fw-bold", children: "O" }) }), _jsx("span", { className: "fw-bold text-dark", children: "Obeeoma" })] }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", children: _jsx(X, { size: 20 }) })] }), _jsxs("nav", { className: "px-3 mt-4", children: [_jsx("p", { className: "text-muted small mb-3 ps-3", children: "Menu" }), menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light text-primary" : "text-dark"}`, style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(item.icon, { size: 20 }), _jsx("span", { className: "fw-medium", children: item.label })] }, item.label)))] }), _jsxs("div", { className: "position-absolute bottom-0 start-0 end-0 p-3 border-top", children: [_jsxs("div", { className: "d-flex align-items-center gap-3 px-3 py-2 mb-2", children: [_jsx("div", { className: "rounded-circle bg-primary d-flex align-items-center justify-content-center", style: { width: "36px", height: "36px" }, children: _jsx("span", { className: "text-white fw-bold", children: "E" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-medium small", children: "Emma Wilson" }), _jsx("div", { className: "text-muted small", children: "Member since Oct 2022" })] })] }), _jsxs("button", { onClick: () => navigate("/settings"), className: "w-100 btn d-flex align-items-center gap-3 text-start text-dark", style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(SettingsIcon, { size: 20 }), _jsx("span", { children: "Settings" })] }), _jsxs("button", { className: "w-100 btn d-flex align-items-center gap-3 text-start text-dark", style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Logout" })] })] })] }), _jsxs("div", { className: "d-lg-flex", children: [_jsx("div", { className: "d-none d-lg-block", style: { width: "240px" } }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("header", { className: "bg-white border-bottom sticky-top z-30", children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row align-items-center py-3", children: [_jsx("div", { className: "col-auto d-lg-none", children: _jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link p-2", children: _jsx(Menu, { size: 24 }) }) }), _jsx("div", { className: "col", children: _jsx("h1", { className: "h4 fw-bold mb-0", children: "Employee Management" }) }), _jsx("div", { className: "col-auto", children: _jsxs("button", { className: "btn btn-link position-relative p-2 text-dark", children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary p-1" })] }) })] }) }) }), _jsxs("main", { className: "container-fluid py-4", children: [_jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12", children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsx("h2", { className: "h5 fw-semibold mb-0", children: "Employees" }), _jsxs("button", { className: "btn btn-primary d-flex align-items-center gap-2", children: [_jsx(Plus, { size: 16 }), "Add Employee"] })] }) }) }), _jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: "position-relative", children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search employees...", className: "form-control ps-5", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) }) }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsx("div", { className: "card-body p-0", children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { className: "bg-light", children: _jsxs("tr", { children: [_jsx("th", { className: "border-0 ps-4 py-3 text-muted fw-normal", children: "Name" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal", children: "Email" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal", children: "Department" }), _jsx("th", { className: "border-0 py-3 text-muted fw-normal", children: "Status" }), _jsx("th", { className: "border-0 pe-4 py-3 text-muted fw-normal text-end", children: "Actions" })] }) }), _jsx("tbody", { children: filteredEmployees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "ps-4 py-3", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("div", { className: "rounded-circle bg-light d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "fw-bold text-primary", children: employee.avatar }) }), _jsx("span", { className: "fw-medium", children: employee.name })] }) }), _jsx("td", { className: "py-3 text-muted", children: employee.email }), _jsx("td", { className: "py-3 text-muted", children: employee.department }), _jsx("td", { className: "py-3", children: _jsx("span", { className: "badge bg-success bg-opacity-10 text-success", children: employee.status }) }), _jsx("td", { className: "pe-4 py-3 text-end", children: _jsx("button", { className: "btn btn-link p-0 text-muted", children: _jsx(MessageCircle, { size: 18 }) }) })] }, employee.id))) })] }) }) }) }) }) }), _jsx("div", { className: "row mt-5", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Add Employee" }), _jsx("div", { className: "row", children: _jsxs("div", { className: "col-12 col-md-6", children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label fw-medium", children: "Name" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter employee name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label fw-medium", children: "Department" }), _jsxs("select", { className: "form-select", children: [_jsx("option", { children: "Select department" }), _jsx("option", { children: "Marketing" }), _jsx("option", { children: "HR" }), _jsx("option", { children: "Finance" }), _jsx("option", { children: "Engineering" })] })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label fw-medium", children: "Reports" }), _jsxs("select", { className: "form-select", children: [_jsx("option", { children: "Select report type" }), _jsx("option", { children: "Wellness Report" }), _jsx("option", { children: "Performance Report" }), _jsx("option", { children: "Attendance Report" })] })] }), _jsx("button", { className: "btn btn-primary", children: "Add Employee" })] }) })] }) }) }) })] })] })] })] }));
};
export default EmployeeManagement;
