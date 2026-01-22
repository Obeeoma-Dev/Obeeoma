import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import * as Icons from "lucide-react";
import { Button } from "react-bootstrap";
import logo from "../../assets/Images/obeeomalogoword1.png"; // Obeeoma logo

const SideNavButton = ({
  id,
  label,
  icon,
  onClick,
}: {
  id: string;
  label: string;
  icon: keyof typeof Icons;
  onClick: () => void;
  detectActive?: boolean;
}) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const isActive =
    (id === "overview" && (currentPath === undefined || currentPath === "")) ||
    currentPath === id;

  const IconComponent = Icons[icon] as React.FC<{
    size?: number;
    color?: string;
  }>;

  return (
    <Button
      variant="light"
      onClick={onClick}
      className={`w-100 d-flex align-items-center gap-3 px-3 py-2 text-start ${isActive ? "fw-semibold border-start" : ""}`}
      style={{
        position: "relative",
        backgroundColor: isActive ? "#e9f5ee" : "transparent",
        borderLeft: isActive ? "4px solid #3CB371" : "4px solid transparent",
        color: isActive ? "#3CB371" : "#212529",
        fontWeight: isActive ? 600 : 400,
        transition: "all 0.2s ease",
        borderRadius: 0,
        boxShadow: "none",
        marginBottom: "8px",
        borderTop: "none",
        borderBottom: "none",
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
      <IconComponent size={20} color="#3CB371" />
      <span className="small">{label}</span>
      {isActive && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            backgroundColor: "#3CB371",
          }}
        />
      )}
    </Button>
  );
};

/* AdminSidebar component for navigation */
const AdminSidebar: React.FC = () => {

  const navigate = useNavigate();

  // Redux dispatch for logout action
  const dispatch = useDispatch<AppDispatch>();

  // Define sidebar menu items (excluding Settings and Logout)
  const menuItems = [
    { id: "overview", label: "Overview", icon: "LayoutDashboard" },
    { id: "organizations", label: "Organizations", icon: "Building2" },
    { id: "client-engagement", label: "Client Engagement", icon: "Users" },
    { id: "ai-management", label: "AI Management", icon: "Brain" },
    { id: "hotline-activity", label: "Hotline Activity", icon: "PhoneCall" },
    { id: "system-subscriptions", label: "Subscriptions", icon: "CreditCard" },
    { id: "reports", label: "Reports", icon: "BarChart3" },
    { id: "content-management", label: "Content Management", icon: "FolderOutput" },
  ];

  // Extract current path segment to determine active menu item
  // const currentPath = location.pathname.split("/")[2];

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
        borderRight: "1px solid #e9ecef",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Top logo only (no text) */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid #e9ecef",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="Obeeoma Logo"
          style={{ width: "160px", height: "45px", objectFit: "contain" }}
        />
      </div>

      {/* Navigation menu */}
      <div
        style={{
          padding: "1rem 0.5rem",
          fontFamily: "body",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {menuItems.map((item) => {
          return (
            <SideNavButton
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon as keyof typeof Icons}
              onClick={() => handleMenuClick(item.id)}
            />
          );
        })}
      </div>

      {/* Bottom section: Settings and Logout */}
      <div
        style={{
          padding: "0.5rem",
          fontFamily: "body",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <SideNavButton
          id="settings-overview"
          label="Settings"
          icon="Settings"
          onClick={handleSettingsClick}
        />
        <SideNavButton
          id="login"
          label="Log Out"
          icon="LogOut"
          onClick={handleLogoutClick}
          detectActive={false}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
