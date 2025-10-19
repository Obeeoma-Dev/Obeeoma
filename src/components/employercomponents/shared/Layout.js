import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users as UsersIcon, CreditCard, Settings as SettingsIcon, FileText, LogOut, Bell, Menu, X, } from "lucide-react";
const Layout = ({ children, title, showSearch = false, additionalHeaderContent }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
        { icon: UsersIcon, label: "Employees", path: "/management", active: false },
        { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
        { icon: FileText, label: "Reports", path: "/reports", active: false },
    ].map(item => ({
        ...item,
        active: location.pathname === item.path
    }));
    return (_jsxs("div", { className: "min-vh-100 bg-light", children: [isSidebarOpen && (_jsx("div", { className: "position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none", onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { className: `position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`, style: { width: "240px" }, children: [_jsxs("div", { className: "p-4 border-bottom d-flex align-items-center justify-content-between", children: [_jsx("button", { onClick: () => navigate("/"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: _jsx("div", { className: "rounded-circle bg-primary d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "text-white fw-bold", children: _jsx("img", { src: "{logo}", alt: "logo" }) }) }) }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", children: _jsx(X, { size: 20 }) })] }), _jsxs("nav", { className: "px-3 mt-4", children: [_jsx("p", { className: "text-muted small mb-3 ps-3", children: "Menu" }), menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light text-primary" : "text-dark"}`, style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(item.icon, { size: 20 }), _jsx("span", { className: "fw-medium", children: item.label })] }, item.label)))] }), _jsxs("div", { className: "position-absolute bottom-0 start-0 end-0 p-3 border-top", children: [_jsxs("button", { onClick: () => navigate("/settings"), className: `w-100 btn d-flex align-items-center gap-3 text-start mb-2 ${location.pathname === "/settings" ? "text-primary bg-light" : "text-dark"}`, style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(SettingsIcon, { size: 20 }), _jsx("span", { className: "fw-medium", children: "Settings" })] }), _jsxs("button", { className: "w-100 btn d-flex align-items-center gap-3 text-start text-dark", style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Logout" })] })] })] }), _jsxs("div", { className: "d-lg-flex", children: [_jsx("div", { className: "d-none d-lg-block", style: { width: "240px" } }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("header", { className: "bg-white border-bottom sticky-top z-30", children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row align-items-center py-3", children: [_jsx("div", { className: "col-auto d-lg-none", children: _jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link p-2", children: _jsx(Menu, { size: 24 }) }) }), _jsx("div", { className: "col", children: _jsx("h1", { className: "h4 fw-bold mb-0", children: title }) }), _jsx("div", { className: "col-auto", children: _jsxs("button", { className: "btn btn-link position-relative p-2 text-dark", children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary p-1" })] }) })] }) }) }), children] })] })] }));
};
export default Layout;
