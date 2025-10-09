// src/components/Sidebar.tsx

import React from "react"; // React core
import { Nav, Button, Container, Row, Col } from "react-bootstrap"; // Bootstrap layout
import * as Icons from "lucide-react"; // Icon set
import { useNavigate, useLocation } from "react-router-dom"; // Routing hooks

/**
 * Sidebar component provides navigation for system admin dashboard
 */
const Sidebar: React.FC = () => {
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

  // Navigate to selected menu item
  const handleMenuClick = (id: string) => {
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

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Push bottom buttons down
      }}
    >
      {/* Top branding */}
      <Container className="py-4 border-bottom">
        <Row className="align-items-center">
          <Col xs="auto">
            <div className="bg-success p-2 rounded">
              <Icons.Shield size={20} color="#fff" />
            </div>
          </Col>
          <Col>
            <h5 className="mb-0 fw-semibold">Comestro</h5>
          </Col>
        </Row>
      </Container>

      {/* Navigation menu */}
      <Nav className="flex-column px-3 py-4">
        {menuItems.map((item) => {
          const IconComponent = (Icons[item.icon as keyof typeof Icons] || Icons.Circle) as React.FC<{ size?: number }>;

          const isActive = currentPath === item.id;

          return (
            <Nav.Item key={item.id} className="mb-2">
              <Button
                variant={isActive ? "light" : "outline-light"}
                onClick={() => handleMenuClick(item.id)}
                className={`w-100 d-flex align-items-center gap-3 text-start ${
                  isActive ? "fw-semibold border-start border-success" : ""
                }`}
                style={{
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  borderColor: isActive ? "#198754" : "transparent",
                  color: isActive ? "#198754" : "#212529",
                }}
              >
                <IconComponent size={18} />
                <span className="small">{item.label}</span>
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>

      {/* Settings and Logout buttons */}
      <div className="px-3 py-3 border-top">
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

export default Sidebar;