import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import * as Icons from "lucide-react";
import { Button } from "react-bootstrap";
import logo from "../../assets/Images/green..png"; // Obeeoma logo
/**
 * AdminSidebar component for system admin dashboard navigation
 */
const AdminSidebar = () => {
    // Enables programmatic navigation
    const navigate = useNavigate();
    // Gets current route info
    const location = useLocation();
    // Redux dispatch for logout action
    const dispatch = useDispatch();
    // Define sidebar menu items (excluding Settings and Logout)
    const menuItems = [
        { id: "overview", label: "Overview", icon: "LayoutDashboard" },
        { id: "organizations", label: "Organizations", icon: "Building2" },
        { id: "client-engagement", label: "Client Engagement", icon: "Users" },
        { id: "ai-management", label: "AI Management", icon: "Brain" },
        { id: "hotline-activity", label: "Hotline Activity", icon: "Phone" },
        { id: "subscriptions", label: "Subscriptions", icon: "CreditCard" },
        { id: "reports", label: "Reports", icon: "BarChart3" },
    ];
    // Extract current path segment to determine active menu item
    const currentPath = location.pathname.split("/")[2];
    // Navigate to selected menu item
    const handleMenuClick = (id) => {
        // Overview should link to /system-admin directly
        const path = id === "overview" ? "/system-admin" : `/system-admin/${id}`;
        navigate(path);
    };
    // Navigate to settings
    const handleSettingsClick = () => {
        navigate("/system-admin/settings-overview");
    };
    // Navigate to login (logout)
    const handleLogoutClick = () => {
        // Dispatch logout action to clear Redux state and localStorage
        dispatch(logout());
        // Navigate to login page
        navigate("/login");
    };
    return (_jsxs("div", { style: {
            width: "250px",
            height: "100vh",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #dee2e6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }, children: [_jsx("div", { style: {
                    padding: "1rem",
                    borderBottom: "1px solid #dee2e6",
                    display: "flex",
                    justifyContent: "center",
                }, children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: { width: "120px", height: "120px" } }) }), _jsx("div", { style: { padding: "1rem 0", flexGrow: 1 }, children: menuItems.map((item) => {
                    // Cast icon to valid React component
                    const IconComponent = Icons[item.icon];
                    const isActive = currentPath === item.id ||
                        (item.id === "overview" && currentPath === undefined);
                    return (_jsxs(Button, { variant: "light" // Bootstrap light variant for neutral background
                        , onClick: () => handleMenuClick(item.id), className: `w-100 d-flex align-items-center gap-3 px-3 py-2 text-start mb-2 ${isActive ? "fw-semibold border-start" : ""}`, style: {
                            position: "relative", // Enables positioning of accent element
                            backgroundColor: isActive ? "#e9f5ee" : "transparent", // Light green background when active
                            borderLeft: isActive ? "4px solid #198754" : "4px solid transparent", // Green left border when active
                            color: isActive ? "#198754" : "#212529", // Green text when active, default dark otherwise
                            fontWeight: isActive ? "600" : "400", // Slightly bolder font when active
                            transition: "all 0.2s ease", // Smooth transition for hover and active state
                            borderRadius: "0", // Keeps edges flush with sidebar layout
                            boxShadow: isActive ? "inset 0 0 0 1px #e9f5ee" : "none", // Subtle depth effect when active
                        }, onMouseEnter: (e) => {
                            // Light gray hover effect
                            e.currentTarget.style.backgroundColor = "#f1f3f5";
                        }, onMouseLeave: (e) => {
                            // Restore active or default background on mouse leave
                            e.currentTarget.style.backgroundColor = isActive
                                ? "#e9f5ee"
                                : "transparent";
                        }, children: [_jsx(IconComponent, { size: 18 }), _jsx("span", { className: "small", children: item.label }), isActive && (_jsx("div", { style: {
                                    position: "absolute", // Anchored inside the Button
                                    right: 0, // Flush to the right edge
                                    top: 0,
                                    bottom: 0,
                                    width: "4px", // Same width as left border
                                    backgroundColor: "#14532d", // Dark green accent color                    
                                } }))] }, item.id));
                }) }), _jsxs("div", { style: { padding: "1rem", borderTop: "1px solid #dee2e6" }, children: [_jsxs(Button, { variant: "outline-secondary", className: "w-100 d-flex align-items-center gap-3 mb-2 text-start", onClick: handleSettingsClick, children: [_jsx(Icons.Settings, { size: 18 }), _jsx("span", { className: "small", children: "Settings" })] }), _jsxs(Button, { variant: "outline-secondary", className: "w-100 d-flex align-items-center gap-3 text-start", onClick: handleLogoutClick, children: [_jsx(Icons.LogOut, { size: 18 }), _jsx("span", { className: "small", children: "Log Out" })] })] })] }));
};
export default AdminSidebar;
