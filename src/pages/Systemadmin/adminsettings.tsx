// Import React and necessary hooks.
import React from "react";

// Import React-Boostrap components.
import { Container, Row, Col } from "react-bootstrap";

// Import reusable components.
import Sidebar from "../../components/admincomponents/adminsidebar";
import SettingsTabs from "../../components/admincomponents/SettingsTabs";

// Define the AdminSettings page component.
const AdminSettings: React.FC = () => {
  return (
    // Container provides horizontal padding and centers content.
    <Container fluid>
      {/* Row creates a horizontal layout */}
      <Row>
        {/* Sidebar takes up 2 columns on medium+ screens */}
        <Col md={2}>
          <Sidebar />
        </Col>

        {/* Main content area takes up remaining space */}
        <Col md={10}>
          <SettingsTabs />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
