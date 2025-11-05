import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Users as UsersIcon, User as UserIcon, CreditCard, FileText, Bell, Menu, X, } from "lucide-react";
import logo from "../../../assets/Images/green..png";
const PRIMARY_COLOR = "#3CB371";
const Layout = ({ children, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
        { icon: HomeIcon, label: "Home", path: "/employer-dashboard", active: false },
        { icon: UsersIcon, label: "Employees", path: "/employee-management", active: false },
        { icon: CreditCard, label: "Subscription", path: "/employer-subscription", active: false },
        { icon: FileText, label: "Reports", path: "/organization-reports", active: false },
    ].map(item => ({
        ...item,
        active: location.pathname === item.path
    }));
    return (_jsxs("div", { className: "min-vh-100 bg-light d-flex flex-column", children: [isSidebarOpen && (_jsx("div", { className: "position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none", onClick: () => setIsSidebarOpen(false) })), _jsx("header", { className: "bg-white border-bottom sticky-top z-30", style: { marginLeft: "240px", width: "calc(100% - 240px)" }, children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row align-items-center py-3", children: [_jsx("div", { className: "col-auto d-lg-none", children: _jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link p-2", style: { fontFamily: "heading", color: PRIMARY_COLOR }, children: _jsx(Menu, { size: 24 }) }) }), _jsx("div", { className: "col", children: _jsx("h1", { className: "h4 fw-bold mb-0", style: { fontFamily: "heading", color: PRIMARY_COLOR }, children: title }) }), _jsx("div", { className: "col-auto", children: _jsxs("button", { className: "btn btn-link position-relative p-2", style: { color: PRIMARY_COLOR }, onClick: () => navigate("/employer-notifications"), children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-circle p-1", style: { backgroundColor: PRIMARY_COLOR } })] }) })] }) }) }), _jsxs("aside", { className: `position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`, style: { width: "240px" }, children: [_jsxs("div", { className: "p-4 border-bottom d-flex align-items-center justify-content-between", children: [_jsx("button", { onClick: () => navigate("/employer-dashboard"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: _jsx("div", { className: "d-flex align-items-center justify-content-center", children: _jsx("img", { src: logo, alt: "logo", height: "80" }) }) }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", style: { color: PRIMARY_COLOR }, children: _jsx(X, { size: 20 }) })] }), _jsx("nav", { className: "px-3 mt-4", children: menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light" : "text-dark"}`, style: {
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px",
                                color: item.active ? PRIMARY_COLOR : "#6c757d",
                                backgroundColor: item.active ? `${PRIMARY_COLOR}15` : "transparent",
                                fontWeight: item.active ? "600" : "400",
                            }, children: [_jsx(item.icon, { size: 20, style: { color: item.active ? PRIMARY_COLOR : "#6c757d" } }), _jsx("span", { className: "fw-medium", children: item.label })] }, item.label))) }), _jsx("div", { className: "position-absolute bottom-0 start-0 end-0 p-3 border-top", children: _jsxs("button", { onClick: () => navigate("/employer-settings"), className: `w-100 btn d-flex align-items-center gap-3 text-start mb-2 ${location.pathname === "/employer-settings" ? "bg-light" : "text-dark"}`, style: {
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px",
                                color: location.pathname === "/employer-settings" ? PRIMARY_COLOR : "#6c757d",
                                backgroundColor: location.pathname === "/employer-settings" ? `${PRIMARY_COLOR}15` : "transparent",
                                fontWeight: location.pathname === "/employer-settings" ? "600" : "400",
                            }, children: [_jsx(UserIcon, { size: 20, style: { color: location.pathname === "/employer-settings" ? PRIMARY_COLOR : "#6c757d" } }), _jsx("span", { className: "fw-medium", children: "My Account" })] }) })] }), _jsx("main", { className: "flex-grow-1 d-flex justify-content-center", style: {
                    marginLeft: "240px",
                    padding: "1rem",
                    transition: "margin-left 0.3s ease",
                    width: "calc(100% - 240px)",
                }, children: _jsx("div", { className: "container-fluid", style: { maxWidth: "1200px" }, children: children }) })] }));
};
export default Layout;
