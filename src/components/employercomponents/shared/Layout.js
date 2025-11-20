import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, User as UserIcon, CreditCard, FileText, Bell, Menu, X, } from "lucide-react";
import logo from "../../../assets/Images/obeeomalogoword1.png";
import { useSelector } from "react-redux";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
const PRIMARY_COLOR = "#3CB371";
const Layout = ({ children, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // Get employer data from Redux store
    const employer = useSelector((state) => state.employer.currentEmployer);
    const companyJoinDate = employer?.company?.createdAt
        ? new Date(employer.company.createdAt)
        : new Date(); // Fallback to current date
    const menuItems = [
        { icon: HomeIcon, label: "Home", path: "/employer-dashboard", active: false },
        { icon: CreditCard, label: "Subscription", path: "/employer-subscription", active: false },
        { icon: FileText, label: "Reports", path: "/organization-reports", active: false },
    ].map(item => ({
        ...item,
        active: location.pathname === item.path
    }));
    const [logoRef, isLogoVisible] = useScrollAnimation({
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    return (_jsxs("div", { className: "min-vh-100 bg-light d-flex flex-column", children: [isSidebarOpen && (_jsx("div", { className: "position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none", onClick: () => setIsSidebarOpen(false) })), _jsx("header", { className: "bg-white border-bottom sticky-top z-30", style: { marginLeft: "240px", width: "calc(100% - 240px)" }, children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row align-items-center py-3", children: [_jsx("div", { className: "col-auto d-lg-none", children: _jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link p-2", style: { fontFamily: "heading", color: PRIMARY_COLOR }, children: _jsx(Menu, { size: 24 }) }) }), _jsx("div", { className: "col", children: _jsxs("div", { className: "d-flex flex-column", children: [_jsx("h1", { className: "h4 fw-bold mb-0", style: { fontFamily: "heading", color: PRIMARY_COLOR }, children: title }), _jsxs("small", { className: "text-muted", children: ["Member since ", formatDate(companyJoinDate)] })] }) }), _jsxs("div", { className: "col-auto d-flex align-items-center gap-3", children: [_jsxs("button", { className: "btn btn-link position-relative p-2", style: { color: PRIMARY_COLOR }, onClick: () => navigate("/employer-notifications"), children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-circle p-1", style: { backgroundColor: PRIMARY_COLOR } })] }), _jsxs("div", { className: "dropdown", children: [_jsx("button", { className: "btn btn-link p-0 border-0 dropdown-toggle d-flex align-items-center", type: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false", children: _jsxs("div", { className: "rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold", style: { width: "40px", height: "40px", fontSize: "16px" }, children: [employer?.firstName?.charAt(0) || 'U', employer?.lastName?.charAt(0) || ''] }) }), _jsxs("ul", { className: "dropdown-menu dropdown-menu-end", children: [_jsx("li", { children: _jsxs("button", { className: "dropdown-item", onClick: () => navigate("/employer-settings"), children: [_jsx(UserIcon, { size: 16, className: "me-2" }), "My Account"] }) }), _jsx("li", { children: _jsx("hr", { className: "dropdown-divider" }) }), _jsx("li", { children: _jsx("button", { className: "dropdown-item text-danger", children: "Logout" }) })] })] })] })] }) }) }), _jsxs("aside", { className: `position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`, style: { width: "240px" }, children: [_jsxs("div", { className: "p-4 border-bottom d-flex align-items-center justify-content-between", children: [_jsx("button", { onClick: () => navigate("/employer-dashboard"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: _jsx("div", { ref: logoRef, className: "d-flex align-items-center justify-content-center", style: {
                                        transform: isLogoVisible ? 'rotate(360deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.6s ease-in-out'
                                    }, children: _jsx("img", { src: logo, alt: "logo", height: "50" }) }) }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", style: { color: PRIMARY_COLOR }, children: _jsx(X, { size: 20 }) })] }), _jsx("nav", { className: "px-3 mt-4", children: menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light" : "text-dark"}`, style: {
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
