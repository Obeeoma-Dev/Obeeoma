// Import React and necessary hooks
import React, { useState } from "react";

// Import Bootstrap layout components
import { Nav, Button, Container, Row, Col } from "react-bootstrap";

// Import icons from lucide-react
import * as Icons from "lucide-react";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

/**
 * Interface for sidebar menu items
 */
interface MenuItem {
  id: string; // Unique identifier
  label: string; // Display label
  icon: string; // Icon name from lucide-react
}

/**
 * Sidebar component provides navigation for different sections of the dashboard
 */
const Sidebar: React.FC = () => {
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // State to track which menu item is currently active
  const [activeItem, setActiveItem] = useState<string>("overview");

  // Define sidebar menu items
  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: "LayoutDashboard" },
    { id: "organizations", label: "Organizations", icon: "Building2" },
    { id: "client-engagement", label: "Client Engagement", icon: "Users" },
    { id: "ai-management", label: "AI Management", icon: "Brain" },
    { id: "hotline-activity", label: "Hotline Activity", icon: "Phone" },
    { id: "subscriptions", label: "Subscriptions", icon: "CreditCard" },
    { id: "reports", label: "Reports", icon: "BarChart3" },
  ];

  // Handle menu item click and navigate to corresponding route
  const handleMenuClick = (id: string): void => {
    setActiveItem(id);
    navigate(`/system-admin/${id}`); // Redirect to route like /system-admin/overview
  };

  // Handle settings button click
  const handleSettingsClick = (): void => {
    navigate("/system-admin/settings-overview"); // Redirect to admin settings overview
  };

  // Handle logout button click
  const handleLogoutClick = (): void => {
    console.log("Logging out...");
    navigate("/login"); // Redirect to login page
  };

  return (
    // Sidebar container with vertical layout and pinned bottom actions
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Push bottom actions down
      }}
    >
      {/* Logo section */}
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
          const IconComponent =
            (
              Icons as unknown as Record<
                string,
                React.FC<{ size?: number; color?: string }>
              >
            )[item.icon] || Icons.Circle;

          const isActive = activeItem === item.id;

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

      {/* Bottom actions pinned to bottom */}
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
