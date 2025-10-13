// src/components/admincomponents/adminsidebar.tsx

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { Button } from "react-bootstrap";
import logo from "../../assets/Images/green..png"; // Obeeoma logo

/**
 * AdminSidebar component for system admin dashboard navigation
 */
const AdminSidebar: React.FC = () => {
  const navigate = useNavigate(); // Enables programmatic navigation
  const location = useLocation(); // Gets current route info

  // Define sidebar menu items (excluding Settings and Logout)
  const menuItems = [
    { id: "overview", label: "Overview", icon: "LayoutDashboard" },
    { id: "organizations", label: "Organizations", icon: "Building2" },
    { id: "client-engagement", label: "Client Engagement", icon: "Users" },
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
          style={{ width: "40px", height: "40px" }}
        />
      </div>

      {/* Navigation menu */}
      <div style={{ padding: "1rem 0", flexGrow: 1 }}>
        {menuItems.map((item) => {
          // Cast icon to valid React component
          const IconComponent = Icons[item.icon as keyof typeof Icons] as React.FC<{
            size?: number;
          }>;

          const isActive =
            currentPath === item.id || (item.id === "overview" && currentPath === undefined);

          return (
            <Button
              key={item.id}
              variant="light"
              onClick={() => handleMenuClick(item.id)}
              className={`w-100 d-flex align-items-center gap-3 px-3 py-2 text-start mb-2 ${
                isActive ? "fw-semibold border-start border-success" : ""
              }`}
              style={{
                backgroundColor: isActive ? "#e9f5ee" : "transparent",
                borderColor: isActive ? "#198754" : "transparent",
                color: isActive ? "#198754" : "#212529",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f3f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isActive
                  ? "#e9f5ee"
                  : "transparent";
              }}
            >
              <IconComponent size={18} />
              <span className="small">{item.label}</span>
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