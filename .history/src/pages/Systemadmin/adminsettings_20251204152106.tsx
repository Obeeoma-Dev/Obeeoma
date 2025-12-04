// Import React and necessary hooks.
import React from "react";

import AdminSidebar from "../../components/admincomponents/adminsidebar";
import AdminHeader from "../../components/admincomponents/adminheader";
import SettingsTabs from "../../components/admincomponents/Settingscomponents/SettingsTabs";
import { Container } from "react-bootstrap";

// AdminSettings now uses the same layout pattern as other system admin pages
// (fixed sidebar, top header, scrollable content). Content is constrained
// to a centered max width so cards never overlap the sidebar.
const AdminSettings: React.FC = () => {
  return (
    <div className="d-flex vh-100">
      {/* Fixed left sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <AdminHeader />

        {/* Scrollable content area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", backgroundColor: "#f8f9fa" }}>
          <Container fluid>
            {/* Center content and constrain width to match industry-standard layout */}
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <SettingsTabs />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
