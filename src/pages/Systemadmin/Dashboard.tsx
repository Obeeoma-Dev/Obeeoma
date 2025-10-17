// Import React and required Bootstrap layout components
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";


// Import custom dashboard components
import Sidebar from "../../components/admincomponents/adminsidebar";
import Header from "../../components/admincomponents/adminheader";
import DashboardStats from "../../components/admincomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/platformusage";
import RecentActivities from "../../components/admincomponents/recentactivities";
import BottomMetrics from "../../components/admincomponents/buttonmetrics";

// Import type definitions for props
import { ActivityItem } from "../../components/admincomponents/admindashboard";
import { BottomMetricCard } from "../../components/admincomponents/admindashboard";
import { StatCardData } from "../../components/admincomponents/admindashboard";

// Define static data for recent activities
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

// Define static data for bottom metric cards
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
  // Add more metrics as needed
];

// Define static data for top dashboard stats
const dashboardStatsData: StatCardData[] = [
  {
    id: "1",
    title: "Total Organizations",
    value: "42",
    change: "+3 this month",
    icon: "Building2",
    iconColor: "bg-light", // Bootstrap background utility
  },
  // Add more stats as needed
];

// Main Dashboard component
const Dashboard: React.FC = () => {
  return (
    // Root container with full viewport height and horizontal layout
    <div className="d-flex vh-100">
      {/* Sidebar navigation (left column) */}
      <Sidebar />

      {/* Main content area (right column) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Scrollable content area below the header */}
        <div className="flex-grow-1 overflow-auto">
          {/* Bootstrap container with vertical padding */}
          <Container fluid className="py-4">
            {/* Top dashboard stats section */}
            <Row className="gy-4">
              <DashboardStats stats={dashboardStatsData} />
            </Row>

            {/* Platform usage chart section */}
            <Row className="gy-4">
              <Col>
                <PlatformUsageChart />
              </Col>
            </Row>

            {/* Recent activities section */}
            <Row className="gy-4">
              <Col>
                <RecentActivities activities={recentActivityData} />
              </Col>
            </Row>

            {/* Bottom metrics section */}
            <Row className="gy-4">
              <BottomMetrics metrics={bottomMetricData} />
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in routing or layout
export default Dashboard;
