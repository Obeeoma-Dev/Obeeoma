import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DashboardStats from "../../../components/admincomponents/Overviewcomponents/dashboardstats";
import OrganizationTable, {
  DatabaseOrganization,
} from "../../../components/admincomponents/organisationcomponents/organisationTable";
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { adminAPI } from "../../../api/apiConfig";
import axios from "axios";

// Import shared type definitions
import { StatCardData } from "../../../components/admincomponents/Overviewcomponents/admindashboard";
import { Building2, Users, Map, CircleCheckBig } from "lucide-react";

/**
 * Main admin page for managing organizations.
 * Combines sidebar, header, stats, table, and charts.
 * Supports switching between Digital Ocean (production) and Neon (development) databases.
 */
const OrganizationPage: React.FC = () => {
  // Environment detection and API configuration
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Conditional API base URL for table and graphs
  const conditionalAPIBaseURL = isLocalhost
    ? 'http://127.0.0.1:8000/api/v1'  // Neon backend for localhost development
    : 'https://obeeoma-api.com/api/v1'; // Digital Ocean backend for production

  // Create conditional API instance for table and graphs
  const conditionalAPI = axios.create({
    baseURL: conditionalAPIBaseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add authorization interceptor to conditional API
  conditionalAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Create conditional API methods without /v1/ prefix (since it's already in baseURL)
  const conditionalAPIWithMethods = {
    ...conditionalAPI,
    getOrganizationsList: async (page = 1, pageSize = 10, search = "") => {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      const response = await conditionalAPI.get(`/admin/organizations/?${params}`);
      return response;
    },
    getOrganizationsGrowthChart: async () => {
      const response = await conditionalAPI.get("/admin/organizations/growth-chart/");
      return response;
    },
    getOrganizationsClientDistribution: async () => {
      const response = await conditionalAPI.get("/admin/organizations/client-distribution/");
      return response;
    },
  };

  console.log('Environment:', isLocalhost ? 'Development (Neon)' : 'Production (Digital Ocean)');
  console.log('Conditional API Base URL:', conditionalAPIBaseURL);
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

        {/* Organization table with conditional API */}
        <OrganizationTable conditionalAPI={conditionalAPIWithMethods} />

        {/* Graphs section with conditional API */}
        <OrganizationCharts conditionalAPI={conditionalAPIWithMethods} />
      </div>
    </SystemAdminLayout>
  );
};

export default OrganizationPage;
