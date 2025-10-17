// src/pages/Dashboard.tsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import reusable dashboard components
import Sidebar from "../../components/admincomponents/adminsidebar";
import Header from "../../components/admincomponents/adminheader";
import DashboardStats from "../../components/admincomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/platformusage";
import RecentActivities from "../../components/admincomponents/recentactivities";
import BottomMetrics from "../../components/admincomponents/buttonmetrics";

// Import shared type definitions
import {
  ActivityItem,
  BottomMetricCard,
  StatCardData,
} from "../../components/admincomponents/admindashboard";

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
    iconColor: "bg-light", // Bootstrap background color class
  },
  {
    id: "2",
    type: "AI Recommendation",
    details: "New AI recommendation available for review",
    time: "1 hour ago",
    icon: "Brain", // Icon representing AI or intelligence
    iconColor: "bg-light",
  },
  {
    id: "3",
    type: "Hotline Activity",
    details: "12 hotline calls were received",
    time: "45 minutes ago",
    icon: "Phone", // Icon representing phone or hotline
    iconColor: "bg-light",
  },
  {
    id: "4",
    type: "Patient Engagement",
    details: "45 patients were engaged today",
    time: "30 minutes ago",
    icon: "UserPlus", // Icon representing user engagement or addition
    iconColor: "bg-light",
  },
  {
    id: "5",
    type: "Subscription",
    details: "University Counseling Center subscribed to the platform",
    time: "25 minutes ago",
    icon: "CreditCard", // Icon representing financial or subscription activity
    iconColor: "bg-light",
  },
];

/**
 * Static placeholder data for bottom metric cards
 * Replace with API data when backend is ready
 */
const bottomMetricData: BottomMetricCard[] = [
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
    icon: "Phone",
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
 * Static placeholder data for top dashboard stats
 * Replace with API data when backend is ready
 */
const dashboardStatsData: StatCardData[] = [
  {
    id: "1",
    title: "Total Organizations",
    value: "42",
    change: "+3 this month",
    icon: "Building2",
    iconColor: "bg-light",
  },
  {
    id: "2",
    title: "Total Clients",
    value: "1,284",
    change: "+12 this week",
    icon: "Users",
    iconColor: "bg-light",
  },
  {
    id: "3",
    title: "AI Recommendations",
    value: "25,800",
    change: "+1,245 today",
    icon: "Brain",
    iconColor: "bg-light",
  },
  {
    id: "4",
    title: "Hotline Calls Today",
    value: "42",
    change: "+5 since yesterday",
    icon: "Phone",
    iconColor: "bg-light",
  },
];

/**
 * Main Dashboard component
 * Combines sidebar, header, and dashboard content
 */
const Dashboard: React.FC = () => {
  return (
    // Full-height layout with sidebar and main content
    <div className="d-flex vh-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Scrollable content below header */}
        <div className="flex-grow-1 overflow-auto">
          <Container fluid className="py-4">
            {/* Top dashboard stats cards */}
            <Row className="gy-4">
              <DashboardStats stats={dashboardStatsData} />
            </Row>

            {/* Platform usage chart */}
            <Row className="gy-4">
              <Col>
                <PlatformUsageChart />
              </Col>
            </Row>

            {/* Recent activity feed */}
            <Row className="gy-4">
              <Col>
                <RecentActivities activities={recentActivityData} />
              </Col>
            </Row>

            {/* Bottom metric summary cards */}
            <Row className="gy-4">
              <BottomMetrics metrics={bottomMetricData} />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
