import React from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../../../components/admincomponents/adminsidebar";
import OrganizationStats from "../../../components/admincomponents/organisationcomponents/OrganisationStats";
import { StatCard } from "../../../components/admincomponents/Commoncomponents/metricCard";
import OrganizationTable, {
  Organization,
} from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import Header from "../../../components/admincomponents/adminheader";

/**
 * Sample organization data for table display.
 * Will be replaced with backend data later.
 */
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

/**
 * Sample stat data for top-level metrics.
 * Moved from OrganizationStats component to here.
 */
const mockStats: StatCard[] = [
  {
    id: "1",
    title: "Organizations",
    value: "42",
    subtitle: "Active organizations",
    linkText: "View all organizations",
    icon: "Building2",
    color: "emerald",
  },
  {
    id: "2",
    title: "AI Recommendations",
    value: "1,245",
    subtitle: "Reviewed today",
    linkText: "View recommendations",
    icon: "Brain",
    color: "blue",
  },
  {
    id: "3",
    title: "Hotline",
    value: "324",
    subtitle: "Calls received",
    linkText: "View hotline logs",
    icon: "PhoneCall",
    color: "purple",
  },
  {
    id: "4",
    title: "Subscriptions",
    value: "$25.8K",
    subtitle: "Monthly revenue",
    linkText: "View subscriptions",
    icon: "CreditCard",
    color: "pink",
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
              <OrganizationStats stats={mockStats} />

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