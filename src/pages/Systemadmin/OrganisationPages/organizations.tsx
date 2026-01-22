import React from "react";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable, {
  Organization,
} from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";

// Import shared type definitions
import { StatCardData } from "../../../components/admincomponents/Overviewcomponents/admindashboard";
import {
  Building2,
  Users,
  Map,
  CircleCheckBig,
} from "lucide-react";

/**
 * Sample organization data for table display.
 * Will be replaced with backend data later.
 */
const mockOrganizations: Organization[] = [
  {
    id: "1",
    icon: "Building2",
    name: "Wellness Center Inc.",
    clients: 284,
    programs: 12,
    status: "Active",
    lastActive: "2 hours ago",
    plan: "Premium",
    address: "123 Main St",
  },
  {
    id: "2",
    icon: "Building2",
    name: "Community Mental Health",
    clients: 194,
    programs: 8,
    status: "Active",
    lastActive: "3 hours ago",
    plan: "Premium",
    address: "456 Elm Ave",
  },
  {
    id: "3",
    icon: "Building2",
    name: "Urban Outreach",
    clients: 134,
    programs: 6,
    status: "Inactive",
    lastActive: "2 days ago",
    plan: "Freemium",
    address: "789 Oak Blvd",
  },
];

/**
 * Sample stat data for top-level metrics.
 * Moved from OrganizationStats component to here.
 */
const mockStats: StatCardData[] = [
  {
    id: "1",
    title: "Total Organizations",
    value: "0",
    trend: "+3 this month",
    icon: Building2,
    color: "emerald",
    // subtitle: "Active organizations",
    // linkText: "View all organizations",
    // color: "emerald",
  },
  {
    id: "2",
    title: "Total Client",
    value: "0",
    trend: "+24 this month",
    icon: Users,
    color: "emerald",
    // subtitle: "Active organizations",
    // linkText: "View all organizations",
    // color: "emerald",
  },
  {
    id: "3",
    title: "Active Programs",
    value: "0",
    trend: "+5 this month",
    icon: CircleCheckBig,
    color: "emerald",
    // subtitle: "Active organizations",
    // linkText: "View all organizations",
    // color: "emerald",
  },
  {
    id: "4",
    title: "Regional Coverage",
    value: "0 regions",
    trend: "",
    icon: Map,
    color: "emerald",
    // subtitle: "Active organizations",
    // linkText: "View all organizations",
    // color: "emerald",
  },
];

/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 */
const OrganizationPage: React.FC = () => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Scrollable content below header */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Main content container */}
          <div className="flex-grow-1 overflow-auto">
            <Container fluid className="py-4">
              {/* Stats summary with props */}

              <Row className="gy-4">
                <DashboardStats stats={mockStats} />
              </Row>

              {/* Organization table with mock data */}
              <OrganizationTable organizations={mockOrganizations} />

              {/* Graphs section */}
              <OrganizationCharts />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
