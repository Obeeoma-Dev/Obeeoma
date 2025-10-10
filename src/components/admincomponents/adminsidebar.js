import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Nav, Button, Container, Row, Col } from "react-bootstrap"; // Bootstrap layout
import * as Icons from "lucide-react"; // Icon set
import { useNavigate, useLocation } from "react-router-dom"; // Routing hooks
/**
 * Sidebar component provides navigation for system admin dashboard
 */
const Sidebar = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const location = useLocation(); // Hook to get current route
    // Define sidebar menu items
    const menuItems = [
        { id: "overview", label: "Overview", icon: "LayoutDashboard" },
        { id: "organizations", label: "Organizations", icon: "Building2" },
        { id: "client-engagement", label: "Client Engagement", icon: "Users" },
        { id: "ai-management", label: "AI Management", icon: "Brain" },
        { id: "hotline-activity", label: "Hotline Activity", icon: "Phone" },
        { id: "subscriptions", label: "Subscriptions", icon: "CreditCard" },
        { id: "reports", label: "Reports", icon: "BarChart3" },
    ];
    // Extract current path segment to determine active item
    const currentPath = location.pathname.split("/")[2]; // e.g., /system-admin/organizations → "organizations"
    // Navigate to selected menu item.
    const handleMenuClick = (id) => {
        navigate(`/system-admin/${id}`);
    };
    // Navigate to settings
    const handleSettingsClick = () => {
        navigate("/system-admin/settings-overview");
    };
    // Navigate to login (logout)
    const handleLogoutClick = () => {
        console.log("Logging out...");
        navigate("/login");
    };
    return (_jsxs("div", { style: {
            width: "250px",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #dee2e6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Push bottom buttons down
        }, children: [_jsx(Container, { className: "py-4 border-bottom", children: _jsxs(Row, { className: "align-items-center", children: [_jsx(Col, { xs: "auto", children: _jsx("div", { className: "bg-success p-2 rounded", children: _jsx(Icons.Shield, { size: 20, color: "#fff" }) }) }), _jsx(Col, { children: _jsx("h5", { className: "mb-0 fw-semibold", children: "Comestro" }) })] }) }), _jsx(Nav, { className: "flex-column px-3 py-4", children: menuItems.map((item) => {
                    const IconComponent = (Icons[item.icon] || Icons.Circle);
                    const isActive = currentPath === item.id;
                    return (_jsx(Nav.Item, { className: "mb-2", children: _jsxs(Button, { variant: isActive ? "light" : "outline-light", onClick: () => handleMenuClick(item.id), className: `w-100 d-flex align-items-center gap-3 text-start ${isActive ? "fw-semibold border-start border-success" : ""}`, style: {
                                backgroundColor: isActive ? "#ffffff" : "transparent",
                                borderColor: isActive ? "#198754" : "transparent",
                                color: isActive ? "#198754" : "#212529",
                            }, children: [_jsx(IconComponent, { size: 18 }), _jsx("span", { className: "small", children: item.label })] }) }, item.id));
                }) }), _jsxs("div", { className: "px-3 py-3 border-top", children: [_jsxs(Button, { variant: "outline-secondary", className: "w-100 d-flex align-items-center gap-3 mb-2 text-start", onClick: handleSettingsClick, children: [_jsx(Icons.Settings, { size: 18 }), _jsx("span", { className: "small", children: "Settings" })] }), _jsxs(Button, { variant: "outline-secondary", className: "w-100 d-flex align-items-center gap-3 text-start", onClick: handleLogoutClick, children: [_jsx(Icons.LogOut, { size: 18 }), _jsx("span", { className: "small", children: "Log Out" })] })] })] }));
};
export default Sidebar;
