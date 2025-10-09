// src/pages/organization.tsx
import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../../components/admincomponents/adminsidebar"; 
import OrganizationStats from "../../components/admincomponents/organisationcomponents.tsx/OrganisationStats";
import OrganizationTable from "../../components/admincomponents/organisationcomponents.tsx/organisationTable";
import OrganizationCharts from "../../components/admincomponents/organisationcomponents.tsx/organisation.chats";

// Main admin page for managing organizations
const OrganizationPage: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <Container fluid className="p-4">
        <h2 className="mb-4 text-success">Organizations Overview</h2>

        {/* Top stats summary */}
        <OrganizationStats />

        {/* Table of organizations */}
        <OrganizationTable />

        {/* Graphs */}
        <OrganizationCharts />
      </Container>
    </div>
  );
};

export default OrganizationPage;