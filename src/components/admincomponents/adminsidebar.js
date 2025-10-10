import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and necessary hooks
import { useState } from "react";
// Import Bootstrap layout components
import { Nav, Button, Container, Row, Col } from "react-bootstrap";
// Import icons from lucide-react
import * as Icons from "lucide-react";
// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";
/**
 * Sidebar component provides navigation for different sections of the dashboard
 */
const Sidebar = () => {
    // Hook to programmatically navigate between routes
    const navigate = useNavigate();
    // State to track which menu item is currently active
    const [activeItem, setActiveItem] = useState("overview");
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
    // Handle menu item click and navigate to corresponding route
    const handleMenuClick = (id) => {
        setActiveItem(id);
        navigate(`/system-admin/${id}`); // Redirect to route like /system-admin/overview
    };
    // Handle settings button click
    const handleSettingsClick = () => {
        navigate("/system-admin/settings-overview"); // Redirect to admin settings overview
    };
    // Handle logout button click
    const handleLogoutClick = () => {
        console.log("Logging out...");
        navigate("/login"); // Redirect to login page
    };
    return (
    // Sidebar container with vertical layout and pinned bottom actions
    _jsxs("div", { style: {
            width: "250px",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            borderRight: "1px solid #dee2e6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Push bottom actions down
        }, children: [_jsx(Container, { className: "py-4 border-bottom", children: _jsxs(Row, { className: "align-items-center", children: [_jsx(Col, { xs: "auto", children: _jsx("div", { className: "bg-success p-2 rounded", children: _jsx(Icons.Shield, { size: 20, color: "#fff" }) }) }), _jsx(Col, { children: _jsx("h5", { className: "mb-0 fw-semibold", children: "Comestro" }) })] }) }), _jsx(Nav, { className: "flex-column px-3 py-4", children: menuItems.map((item) => {
                    const IconComponent = Icons[item.icon] || Icons.Circle;
                    const isActive = activeItem === item.id;
                    return (_jsx(Nav.Item, { className: "mb-2", children: _jsxs(Button, { variant: isActive ? "light" : "outline-light", onClick: () => handleMenuClick(item.id), className: `w-100 d-flex align-items-center gap-3 text-start ${isActive ? "fw-semibold border-start border-success" : ""}`, style: {
                                backgroundColor: isActive ? "#ffffff" : "transparent",
                                borderColor: isActive ? "#198754" : "transparent",
                                color: isActive ? "#198754" : "#212529",
                            }, children: [_jsx(IconComponent, { size: 18 }), _jsx("span", { className: "small", children: item.label })] }) }, item.id));
                }) }), _jsxs("div", { className: "px-3 py-3 border-top", children: [_jsxs(Button, { variant: "outline-secondary", className: "w-100 d-flex align-items-center gap-3 mb-2 text-start", onClick: handleSettingsClick, children: [_jsx(Icons.Settings, { size: 18 }), _jsx("span", { className: "small", children: "Settings" })] }), _jsxs(Button, { variant: "outline-secondary", className: "w-100 d-flex align-items-center gap-3 text-start", onClick: handleLogoutClick, children: [_jsx(Icons.LogOut, { size: 18 }), _jsx("span", { className: "small", children: "Log Out" })] })] })] }));
};
export default Sidebar;
