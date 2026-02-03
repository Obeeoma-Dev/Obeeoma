import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable, {
  DatabaseOrganization,
} from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { adminAPI } from "../../../api/apiConfig";

// Import shared type definitions
import { StatCardData } from "../../../components/admincomponents/Overviewcomponents/admindashboard";
import { Building2, Users, Map, CircleCheckBig } from "lucide-react";

/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 */
const OrganizationPage: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState<StatCardData[]>([
    {
      id: "1",
      title: "Total Organizations",
      value: "0",
      trend: "+3 this month",
      icon: Building2,
      color: "emerald",
    },
    {
      id: "2",
      title: "Total Client",
      value: "0",
      trend: "+24 this month",
      icon: Users,
      color: "emerald",
    },
    {
      id: "3",
      title: "Active Programs",
      value: "0",
      trend: "+5 this month",
      icon: CircleCheckBig,
      color: "emerald",
    },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminAPI.getDashboardOverview();
        const data = response.data;

        // Update stats with real data
        setDashboardStats([
          {
            id: "1",
            title: "Total Organizations",
            value: data.total_organizations?.toString() || "0",
            trend: `+${data.organizations_this_month || 0} this month`,
            icon: Building2,
            color: "emerald",
          },
          {
            id: "2",
            title: "Total Client",
            value: data.total_clients?.toString() || "0",
            trend: `+${data.clients_this_month || 0} this month`,
            icon: Users,
            color: "emerald",
          },
          {
            id: "3",
            title: "Active Programs",
            value: "0", // This field wasn't in the API response, keeping as 0 for now
            trend: "+5 this month",
            icon: CircleCheckBig,
            color: "emerald",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <SystemAdminLayout title="Organizations">
      {/* Main content container with proper spacing */}
      <div className="p-4">
        {/* Stats summary with props */}
        <Row className="gy-4 mb-4">
          <DashboardStats stats={dashboardStats} />
        </Row>

        {/* Organization table with real data */}
        <OrganizationTable />

        {/* Graphs section */}
        <OrganizationCharts />
      </div>
    </SystemAdminLayout>
  );
};

export default OrganizationPage;
