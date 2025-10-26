// src/components/admincomponents/adminsidebar.tsx

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import * as Icons from "lucide-react";
import { Button } from "react-bootstrap";
import logo from "../../assets/Images/green..png"; // Obeeoma logo

/**
 * AdminSidebar component for system admin dashboard navigation
 */
const AdminSidebar: React.FC = () => {
  // Enables programmatic navigation
  const navigate = useNavigate();

  // Gets current route info
  const location = useLocation();

  // Redux dispatch for logout action
  const dispatch = useDispatch<AppDispatch>();

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
  const handleMenuClick = (id: string): void => {
    // Overview should link to /system-admin directly
    const path = id === "overview" ? "/system-admin" : `/system-admin/${id}`;
    navigate(path);
  };

  // Navigate to settings
  const handleSettingsClick = (): void => {
    navigate("/system-admin/settings-overview");
  };

  // Navigate to login (logout)
  const handleLogoutClick = (): void => {
    // Dispatch logout action to clear Redux state and localStorage
    dispatch(logout());
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top logo only (no text) */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #dee2e6",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="Obeeoma Logo"
          style={{ width: "120px", height: "120px" }}
        />
      </div>

      {/* Navigation menu */}
      <div style={{ padding: "1rem 0", flexGrow: 1 }}>
        {menuItems.map((item) => {
          // Cast icon to valid React component
          const IconComponent = Icons[
            item.icon as keyof typeof Icons
          ] as React.FC<{
            size?: number;
          }>;

          const isActive =
            currentPath === item.id ||
            (item.id === "overview" && currentPath === undefined);

          return (
            <Button
              key={item.id}
              variant="light" // Bootstrap light variant for neutral background
              onClick={() => handleMenuClick(item.id)} // Navigate to selected route
              className={`w-100 d-flex align-items-center gap-3 px-3 py-2 text-start mb-2 ${isActive ? "fw-semibold border-start" : ""
                }`} // Apply Bootstrap layout and conditional left border + bold font
              style={{
                position: "relative", // Enables positioning of accent element
                backgroundColor: isActive ? "#e9f5ee" : "transparent", // Light green background when active
                borderLeft: isActive ? "4px solid #198754" : "4px solid transparent", // Green left border when active
                color: isActive ? "#198754" : "#212529", // Green text when active, default dark otherwise
                fontWeight: isActive ? "600" : "400", // Slightly bolder font when active
                transition: "all 0.2s ease", // Smooth transition for hover and active state
                borderRadius: "0", // Keeps edges flush with sidebar layout
                boxShadow: isActive ? "inset 0 0 0 1px #e9f5ee" : "none", // Subtle depth effect when active
              }}
              onMouseEnter={(e) => {
                // Light gray hover effect
                e.currentTarget.style.backgroundColor = "#f1f3f5";
              }}
              onMouseLeave={(e) => {
                // Restore active or default background on mouse leave
                e.currentTarget.style.backgroundColor = isActive
                  ? "#e9f5ee"
                  : "transparent";
              }}
            >
              {/* Icon for the menu item */}
              <IconComponent size={18} />

              {/* Text label for the menu item */}
              <span className="small">{item.label}</span>

              {/* Right-end accent bar for active item */}
              {isActive && (
                <div
                  style={{
                    position: "absolute", // Anchored inside the Button
                    right: 0, // Flush to the right edge
                    top: 0,
                    bottom: 0,
                    width: "4px", // Same width as left border
                    backgroundColor: "#14532d", // Dark green accent color                    
                  }}
                />
              )}
            </Button>
          );
        })}
      </div>

      {/* Bottom section: Settings and Logout */}
      <div style={{ padding: "1rem", borderTop: "1px solid #dee2e6" }}>
        <Button
          variant="outline-secondary"
          className="w-100 d-flex align-items-center gap-3 mb-2 text-start"
          onClick={handleSettingsClick}
        >
          <Icons.Settings size={18} />
          <span className="small">Settings</span>
        </Button>
        <Button
          variant="outline-secondary"
          className="w-100 d-flex align-items-center gap-3 text-start"
          onClick={handleLogoutClick}
        >
          <Icons.LogOut size={18} />
          <span className="small">Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
