// src/pages/Dashboard.tsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

// Import reusable dashboard components
import DashboardStats from "../../components/admincomponents/Overviewcomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/Overviewcomponents/platformusage";
import RecentActivities from "../../components/admincomponents/Overviewcomponents/recentactivities";
import SystemAdminLayout from "../../components/admincomponents/shared/SystemAdminLayout";
// import BottomMetrics from "../../components/admincomponents/Overviewcomponents/buttonmetrics";
import { BlogPost } from "../../components/admincomponents/Blogmanagement/BlogTable";
import { BlogManager } from "../../components/admincomponents/Blogmanagement/BlogManager";
// Import shared type definitions
import {
  ActivityItem,
  // BottomMetricCard,
  StatCardData,
} from "../../components/admincomponents/Overviewcomponents/admindashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Building2, Users, CreditCard, PhoneCall } from "lucide-react";
import { adminAPI } from "../../api/apiConfig";

/**
 * Static placeholder data for recent activities
 * Replace with API data when backend is ready
 */
const recentActivityData: ActivityItem[] = [
  {
    id: "1",
    type: "New Organization",
    details: "Wellness Centre Inc. joined the platform",
    time: "2 hours ago",
    icon: "Building2", // Icon representing an organization or building
    iconColor: "text-success", // Bootstrap background color class
  },
  {
    id: "2",
    type: "AI Recommendation",
    details: "New AI recommendation available for review",
    time: "1 hour ago",
    icon: "Brain", // Icon representing AI or intelligence
    iconColor: "text-success",
  },
  {
    id: "3",
    type: "Hotline Activity",
    details: "12 hotline calls were received",
    time: "45 minutes ago",
    icon: "PhoneCall", // Icon representing phone or hotline
    iconColor: "text-success",
  },
  {
    id: "4",
    type: "Patient Engagement",
    details: "45 patients were engaged today",
    time: "30 minutes ago",
    icon: "UserPlus", // Icon representing user engagement or addition
    iconColor: "text-success",
  },
  {
    id: "5",
    type: "Subscription",
    details: "University Counseling Center subscribed to the platform",
    time: "25 minutes ago",
    icon: "CreditCard", // Icon representing financial or subscription activity
    iconColor: "text-success",
  },
];

/**
 * Default fallback data for dashboard stats
 * Used when API call fails or during loading
 */
const defaultStatsData: StatCardData[] = [
  {
    id: "1",
    value: "0",
    title: "Total Organizations",
    trend: "+3 this month",
    icon: Building2,
    color: "emerald",
  },
  {
    id: "2",
    value: "0",
    title: "Total Clients",
    trend: "+124 this week",
    icon: Users,
    color: "emerald",
  },
  // {
  //   id: "3",
  //   value: "$0",
  //   title: "Monthly Revenue",
  //   trend: "+5.3% this month",
  //   icon: CreditCard,
  //   color: "emerald",
  // },
  {
    id: "3",
    value: "0",
    title: "Hotline Calls Today",
    trend: "+8% vs yesterday",
    icon: PhoneCall,
    color: "rose",
  },
];

/**
 * Main Dashboard component
 * Combines sidebar, header, and dashboard content
 */
const Dashboard: React.FC = () => {
  /* The blog state + handlers */
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = React.useState<BlogPost | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  /* Dashboard stats state */
  const [dashboardStats, setDashboardStats] =
    useState<StatCardData[]>(defaultStatsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  // Simple refresh function - shows loading state for 3 seconds
  const handleRefresh = async () => {
    // Show loading state immediately
    setLoading(true);
    setError(null);

    // Clear cache and trigger refresh
    localStorage.removeItem("dashboardStats");
    setRefreshTrigger((prev) => prev + 1);

    // After 3 seconds, if still loading, hide loading state
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // Fetch real dashboard statistics with persistent cache
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Check if we have cached data (session-based)
        const cachedData = localStorage.getItem("dashboardStats");

        if (cachedData && refreshTrigger === 0) {
          // Use cached data on initial load - no API call
          const parsedData = JSON.parse(cachedData || "[]");

          // Re-add icons since they can't be serialized
          const dataWithIcons = parsedData.map((item: StatCardData) => {
            let icon;
            switch (item.title) {
              case "Total Organizations":
                icon = Building2;
                break;
              case "Total Clients":
                icon = Users;
                break;
              // case "Monthly Revenue":
              //   icon = CreditCard;
              //   break;
              case "Hotline Calls Today":
                icon = PhoneCall;
                break;
              default:
                icon = Building2;
            }
            return { ...item, icon };
          });

          setDashboardStats(dataWithIcons);
          setLoading(false);
          return;
        }

        // Only show loading if this is a manual refresh
        if (refreshTrigger > 0) {
          setLoading(true);
        }
        setError(null);

        // Try API call but fallback to default if it fails
        try {
          const response = await adminAPI.getDashboardSummary();
          const data = response.data;

          // Transform API data to match StatCardData format
          const transformedStats: StatCardData[] = [
            {
              id: "1",
              value: data.total_organizations?.toString() || "0",
              title: "Total Organizations",
              trend: `+${data.organizations_this_month || 0} this month`,
              icon: Building2,
              color: "emerald",
            },
            {
              id: "2",
              value: data.total_clients?.toString() || "0",
              title: "Total Clients",
              trend: `+${data.clients_this_month || 0} this month`,
              icon: Users,
              color: "emerald",
            },
            // {
            //   id: "3",
            //   value: `$${data.monthly_revenue?.toFixed(2) || "0"}`,
            //   title: "Monthly Revenue",
            //   trend: `+${data.revenue_growth_percentage || 0}% this month`,
            //   icon: CreditCard,
            //   color: "emerald",
            // },
            {
              id: "3",
              value: data.hotline_calls_today?.toString() || "0",
              title: "Hotline Calls Today",
              trend: "+8% vs yesterday",
              icon: PhoneCall,
              color: "rose",
            },
          ];

          // Cache the data for the session (without icons since they can't be serialized)
          const dataToCache = transformedStats.map(({ icon, ...rest }) => rest);
          localStorage.setItem("dashboardStats", JSON.stringify(dataToCache));
          setDashboardStats(transformedStats);
        } catch (apiError) {
          console.error("API call failed, using default data:", apiError);
          // Use default data if API fails
          setDashboardStats(defaultStatsData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard statistics");
        // Keep default stats on error
        setDashboardStats(defaultStatsData);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [refreshTrigger]); // Run on mount and when refreshTrigger changes

  return (
    <SystemAdminLayout title="Dashboard">
      {/* Toast container must be rendered once */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Main content container with proper spacing */}
      <div className="p-4">
        {/* Dashboard Title Section */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleRefresh}
            className="d-flex align-items-center gap-2"
          >
            ↻ Refresh
          </Button>
        </div>

        {/* Top dashboard stats cards */}
        <Row className="g-4 mb-5">
          {loading ? (
            <Col className="text-center py-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">
                  Loading dashboard stats...
                </span>
              </Spinner>
            </Col>
          ) : error ? (
            <Col className="py-2">
              <Alert variant="danger">{error}</Alert>
              <DashboardStats stats={dashboardStats} />
            </Col>
          ) : (
            <DashboardStats stats={dashboardStats} />
          )}
        </Row>

        {/* Platform usage chart */}
        <Row className="g-4 mb-5">
          <Col>
            <PlatformUsageChart />
          </Col>
        </Row>

        {/* Recent activity feed and Bottom metrics in a 2-column layout */}
        <Row className="g-4 mb-5">
          {/* Left column: Recent Activities */}
          <Col>
            <RecentActivities activities={recentActivityData} />
          </Col>

          {/* Right column: Quick Stats
          <Col lg={5}>
            <Card className="mb-4 shadow-sm border-0 h-100">
              <Card.Header className="bg-white fw-bold fs-6 px-4 py-3 border-0">Quick Stats</Card.Header>
              <Card.Body className="px-4 py-3">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ backgroundColor: '#f0f9f7' }}>
                    <div>
                      <div className="small text-muted">Active Users</div>
                      <div className="h5 fw-bold text-dark mb-0">2,450</div>
                    </div>
                    <div className="text-success fw-semibold">+12%</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ backgroundColor: '#f0f5ff' }}>
                    <div>
                      <div className="small text-muted">Platform Health</div>
                      <div className="h5 fw-bold text-dark mb-0">99.8%</div>
                    </div>
                    <div className="text-primary fw-semibold">Excellent</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{ backgroundColor: '#fffaf0' }}>
                    <div>
                      <div className="small text-muted">Support Tickets</div>
                      <div className="h5 fw-bold text-dark mb-0">24</div>
                    </div>
                    <div className="text-warning fw-semibold">In Progress</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>

        {/* Platform usage chart */}
        <Row className="gy-4 mb-5">
          <Col>
            <BlogManager />
          </Col>
        </Row>

        {/* Bottom metric summary cards */}
        {/* <Row className="g-4">
          <BottomMetrics metrics={bottomMetricData} />
        </Row> */}
      </div>
    </SystemAdminLayout>
  );
};

export default Dashboard;
