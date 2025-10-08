// Import React and required Bootstrap components
import React, { useState } from 'react';
import { Nav, Button, Container, Row, Col } from 'react-bootstrap';

// Import icons from lucide-react
import * as Icons from 'lucide-react';

/**
 * Interface for sidebar menu items
 */
interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Display label for the menu item */
  label: string;
  /** Icon name from lucide-react */
  icon: string;
}

/**
 * Sidebar component provides navigation for different sections of the dashboard
 * Uses React Bootstrap layout and styling
 */
const Sidebar: React.FC = () => {
  // State to track which menu item is currently active
  const [activeItem, setActiveItem] = useState<string>('overview');

  // Array of main navigation menu items
  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'organizations', label: 'Organizations', icon: 'Building2' },
    { id: 'client-engagement', label: 'Client Engagement', icon: 'Users' },
    { id: 'ai-management', label: 'AI Management', icon: 'Brain' },
    { id: 'hotline-activity', label: 'Hotline Activity', icon: 'Phone' },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'CreditCard' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' },
  ];

  // Handler to update active menu item
  const handleMenuClick = (id: string): void => {
    setActiveItem(id);
  };

  return (
    // Sidebar container with fixed width and vertical layout
    <div
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
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
            ((Icons as unknown) as Record<string, React.FC<{ size?: number; color?: string }>>)[item.icon] || Icons.Circle;
          const isActive = activeItem === item.id;

          return (
            <Nav.Item key={item.id} className="mb-2">
              <Button
                variant={isActive ? 'light' : 'outline-light'}
                onClick={() => handleMenuClick(item.id)}
                className={`w-100 d-flex align-items-center gap-3 text-start ${isActive ? 'fw-semibold border-start border-success' : ''
                  }`}
                style={{
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  borderColor: isActive ? '#198754' : 'transparent',
                  color: isActive ? '#198754' : '#212529',
                }}
              >
                <IconComponent size={18} />
                <span className="small">{item.label}</span>
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>

      {/* Bottom actions */}
      <div className="px-3 py-3 border-top">
        <Button variant="outline-secondary" className="w-100 d-flex align-items-center gap-3 mb-2 text-start">
          <Icons.Settings size={18} />
          <span className="small">Settings</span>
        </Button>
        <Button variant="outline-secondary" className="w-100 d-flex align-items-center gap-3 text-start">
          <Icons.LogOut size={18} />
          <span className="small">Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;