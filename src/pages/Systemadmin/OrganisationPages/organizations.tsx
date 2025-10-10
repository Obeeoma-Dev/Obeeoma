// src/pages/Systemadmin/organizations.tsx
import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import OrganizationStats from "../../../components/admincomponents/organisationcomponents/OrganisationStats";
import OrganizationTable, { Organization } from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";

// Sample organization data
const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Wellness Center Inc.",
    clients: 284,
    programs: 12,
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Community Mental Health",
    clients: 194,
    programs: 8,
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: "3",
    name: "Urban Outreach",
    clients: 134,
    programs: 6,
    status: "Inactive",
    lastActive: "2 days ago",
  },
];

// Main admin page for managing organizations
const OrganizationPage: React.FC = () => {
  return (
    <div className="d-flex">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area (right column) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Main content area */}
        <Container fluid className="p-4">
          <h2 className="mb-4 text-success">Organizations Overview</h2>

          {/* Top stats summary */}
          <OrganizationStats />

          {/* Table of organizations with dynamic data */}
          <OrganizationTable organizations={mockOrganizations} />

          {/* Graphs */}
          <OrganizationCharts />
        </Container>
      </div>
    </div>
  );
};

export default OrganizationPage;