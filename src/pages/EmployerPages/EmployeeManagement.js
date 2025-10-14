import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LayoutDashboard, Users as UsersIcon, CreditCard, Settings, Search, Bell, Menu, X, Plus, Mail, 
//   Phone,
MoreVertical, } from "lucide-react";
import { useNavigate } from "react-router-dom";
const EmployeeManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const employees = [
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.j@company.com",
            department: "Marketing",
            role: "Manager",
            status: "Active",
            testsCompleted: 3,
            lastActive: "2 hours ago",
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.c@company.com",
            department: "Engineering",
            role: "Senior Developer",
            status: "Active",
            testsCompleted: 2,
            lastActive: "1 day ago",
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            email: "emily.r@company.com",
            department: "HR",
            role: "HR Specialist",
            status: "Active",
            testsCompleted: 1,
            lastActive: "3 days ago",
        },
        {
            id: 4,
            name: "David Kim",
            email: "david.k@company.com",
            department: "Finance",
            role: "Analyst",
            status: "Active",
            testsCompleted: 0,
            lastActive: "1 week ago",
        },
    ];
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/employer-dashboard", active: false },
        { icon: UsersIcon, label: "Employees", path: "/employeemanagement", active: true },
        { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
        { icon: Settings, label: "Settings", path: "/employeraccountsettings", active: false },
    ];
    return (_jsxs("div", { className: "min-vh-100", style: { backgroundColor: '#f9fafb' }, children: [isSidebarOpen && (_jsx("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1040,
                }, onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100%',
                    backgroundColor: 'white',
                    borderRight: '1px solid var(--obeeoma-border)',
                    width: '256px',
                    zIndex: 1050,
                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                }, className: "d-lg-block", children: [_jsxs("div", { className: "p-4 d-flex align-items-center justify-content-between border-bottom", children: [_jsxs("button", { onClick: () => navigate("/"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: [_jsx("div", { style: {
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: _jsx("span", { style: { color: 'white', fontWeight: 'bold', fontSize: '20px' }, children: "O" }) }), _jsx("span", { style: { fontSize: '20px', fontWeight: 'bold', color: 'var(--obeeoma-primary)' }, children: "Obeeoma" })] }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", children: _jsx(X, { size: 20 }) })] }), _jsxs("nav", { className: "px-3 mt-4", children: [_jsx("p", { style: { fontSize: '12px', color: 'var(--obeeoma-text-muted)', marginBottom: '16px', paddingLeft: '12px' }, children: "Menu" }), menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: "btn w-100 d-flex align-items-center gap-3 mb-2 text-start", style: {
                                    backgroundColor: item.active ? 'var(--obeeoma-mint-dark)' : 'transparent',
                                    color: item.active ? 'var(--obeeoma-primary)' : 'var(--obeeoma-text-dark)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontWeight: '500',
                                }, children: [_jsx(item.icon, { size: 20 }), _jsx("span", { children: item.label })] }, item.label)))] })] }), _jsxs("div", { style: { marginLeft: 0 }, className: "d-lg-flex", children: [_jsx("div", { style: { width: '256px' }, className: "d-none d-lg-block" }), _jsxs("div", { className: "flex-grow-1", children: [_jsxs("header", { className: "bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center justify-content-between sticky-top", children: [_jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link d-lg-none p-2", children: _jsx(Menu, { size: 24 }) }), _jsx("div", { className: "flex-grow-1 mx-4", style: { maxWidth: '600px' }, children: _jsxs("div", { className: "position-relative", children: [_jsx(Search, { size: 16, style: {
                                                        position: 'absolute',
                                                        left: '12px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: 'var(--obeeoma-text-muted)',
                                                    } }), _jsx("input", { type: "search", placeholder: "Search...", className: "form-control", style: {
                                                        paddingLeft: '40px',
                                                        backgroundColor: '#f3f4f6',
                                                        border: '1px solid var(--obeeoma-border)',
                                                        borderRadius: '8px',
                                                    } })] }) }), _jsxs("button", { className: "btn btn-link position-relative p-2", children: [_jsx(Bell, { size: 20 }), _jsx("span", { style: {
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: 'var(--obeeoma-primary)',
                                                    borderRadius: '50%',
                                                } })] })] }), _jsxs("main", { className: "p-3 p-sm-4 p-lg-5", children: [_jsxs("div", { className: "d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "mb-1", style: { fontSize: '28px', fontWeight: 'bold' }, children: "Employee Management" }), _jsx("p", { className: "mb-0", style: { color: 'var(--obeeoma-text-muted)' }, children: "Manage your organization's employees" })] }), _jsxs("button", { className: "btn text-white d-flex align-items-center gap-2", style: {
                                                    backgroundColor: 'var(--obeeoma-primary)',
                                                    borderRadius: '8px',
                                                    padding: '10px 20px',
                                                    border: 'none',
                                                }, children: [_jsx(Plus, { size: 20 }), "Add Employee"] })] }), _jsxs("div", { className: "row g-3 mb-4", children: [_jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-3", children: [_jsx("p", { className: "mb-1", style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Total Employees" }), _jsx("p", { className: "mb-0", style: { fontSize: '24px', fontWeight: 'bold' }, children: "4" })] }) }) }), _jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-3", children: [_jsx("p", { className: "mb-1", style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Active" }), _jsx("p", { className: "mb-0", style: { fontSize: '24px', fontWeight: 'bold' }, children: "4" })] }) }) }), _jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-3", children: [_jsx("p", { className: "mb-1", style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Departments" }), _jsx("p", { className: "mb-0", style: { fontSize: '24px', fontWeight: 'bold' }, children: "4" })] }) }) }), _jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-3", children: [_jsx("p", { className: "mb-1", style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: "Avg Tests" }), _jsx("p", { className: "mb-0", style: { fontSize: '24px', fontWeight: 'bold' }, children: "1.5" })] }) }) })] }), _jsx("div", { className: "card border-0 shadow-sm", children: _jsx("div", { className: "card-body p-0", children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover mb-0", children: [_jsx("thead", { style: { backgroundColor: '#f9fafb' }, children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3", style: { fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }, children: "Name" }), _jsx("th", { className: "px-4 py-3 d-none d-md-table-cell", style: { fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }, children: "Department" }), _jsx("th", { className: "px-4 py-3 d-none d-lg-table-cell", style: { fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }, children: "Role" }), _jsx("th", { className: "px-4 py-3 d-none d-lg-table-cell", style: { fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }, children: "Tests Completed" }), _jsx("th", { className: "px-4 py-3", style: { fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }, children: "Status" }), _jsx("th", { className: "px-4 py-3", style: { fontSize: '14px', fontWeight: '600', color: 'var(--obeeoma-text-dark)' }, children: "Actions" })] }) }), _jsx("tbody", { children: employees.map((employee) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', marginBottom: '4px' }, children: employee.name }), _jsxs("div", { className: "d-flex align-items-center gap-2", style: { fontSize: '12px', color: 'var(--obeeoma-text-muted)' }, children: [_jsx(Mail, { size: 12 }), employee.email] })] }) }), _jsx("td", { className: "px-4 py-3 d-none d-md-table-cell", children: _jsx("span", { className: "badge", style: {
                                                                                backgroundColor: 'var(--obeeoma-mint-dark)',
                                                                                color: 'var(--obeeoma-primary)',
                                                                                padding: '6px 12px',
                                                                                borderRadius: '6px',
                                                                                fontWeight: '500',
                                                                            }, children: employee.department }) }), _jsx("td", { className: "px-4 py-3 d-none d-lg-table-cell", style: { color: 'var(--obeeoma-text-muted)' }, children: employee.role }), _jsx("td", { className: "px-4 py-3 d-none d-lg-table-cell", children: _jsxs("div", { className: "d-flex align-items-center gap-2", children: [_jsx("div", { style: {
                                                                                        width: '40px',
                                                                                        height: '8px',
                                                                                        backgroundColor: '#e5e7eb',
                                                                                        borderRadius: '4px',
                                                                                        overflow: 'hidden',
                                                                                    }, children: _jsx("div", { style: {
                                                                                            width: `${(employee.testsCompleted / 3) * 100}%`,
                                                                                            height: '100%',
                                                                                            backgroundColor: 'var(--obeeoma-primary)',
                                                                                        } }) }), _jsxs("span", { style: { fontSize: '14px' }, children: [employee.testsCompleted, "/3"] })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "badge bg-success", style: {
                                                                                padding: '6px 12px',
                                                                                borderRadius: '6px',
                                                                                fontWeight: '500',
                                                                            }, children: employee.status }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { className: "btn btn-link p-1", children: _jsx(MoreVertical, { size: 18, color: "var(--obeeoma-text-muted)" }) }) })] }, employee.id))) })] }) }) }) })] })] })] })] }));
};
export default EmployeeManagement;
