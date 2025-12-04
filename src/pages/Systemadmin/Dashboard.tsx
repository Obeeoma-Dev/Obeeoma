// src/pages/Dashboard.tsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import reusable dashboard components
import Sidebar from "../../components/admincomponents/adminsidebar";
import Header from "../../components/admincomponents/adminheader";
import DashboardStats from "../../components/admincomponents/Overviewcomponents/dashboardstats";
import PlatformUsageChart from "../../components/admincomponents/Overviewcomponents/platformusage";
import RecentActivities from "../../components/admincomponents/Overviewcomponents/recentactivities";
import BottomMetrics from "../../components/admincomponents/Overviewcomponents/buttonmetrics";
import { BlogTable, BlogPost } from "../../components/admincomponents/Blogmanagement/BlogTable";

// Import shared type definitions
import {
  ActivityItem,
  BottomMetricCard,
  StatCardData,
} from "../../components/admincomponents/Overviewcomponents/admindashboard";

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
    iconColor: "text-info",
  },
  {
    id: "3",
    type: "Hotline Activity",
    details: "12 hotline calls were received",
    time: "45 minutes ago",
    icon: "PhoneCall", // Icon representing phone or hotline
    iconColor: "text-danger",
  },
  {
    id: "4",
    type: "Patient Engagement",
    details: "45 patients were engaged today",
    time: "30 minutes ago",
    icon: "UserPlus", // Icon representing user engagement or addition
    iconColor: "text-primary",
  },
  {
    id: "5",
    type: "Subscription",
    details: "University Counseling Center subscribed to the platform",
    time: "25 minutes ago",
    icon: "CreditCard", // Icon representing financial or subscription activity
    iconColor: "text-warning",
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
    value: "0",
    subtitle: "Active organizations",
    linkText: "View all organizations",
    icon: "Building2",
    color: "emerald",
  },
  {
    id: "2",
    title: "AI Recommendations",
    value: "0",
    subtitle: "Reviewed today",
    linkText: "View recommendations",
    icon: "Brain",
    color: "blue",
  },
  {
    id: "3",
    title: "Hotline",
    value: "0",
    subtitle: "Calls received",
    linkText: "View hotline logs",
    icon: "PhoneCall",
    color: "purple",
  },
  {
    id: "4",
    title: "Subscriptions",
    value: "$0k",
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
    value: "0",
    title: "Total Organizations",
    change: "+3 this month",
    icon: "Building2",
    iconColor: "bg-success-subtle text-success",
  },
  {
    id: "2",
    value: "0",
    title: "Total Clients",
    change: "+124 this week",
    icon: "Users",
    iconColor: "bg-primary-subtle text-primary",
  },
  {
    id: "3",
    value: "$0",
    title: "Monthly Revenue",
    change: "+5.3% this month",
    icon: "CreditCard",
    iconColor: "bg-warning-subtle text-warning",
  },
  {
    id: "4",
    value: "0",
    title: "Hotline Calls Today",
    change: "+8% vs yesterday",
    icon: "PhoneCall",
    iconColor: "bg-danger-subtle text-danger",
  },
];


/**
 * Main Dashboard component
 * Combines sidebar, header, and dashboard content
 */
const Dashboard: React.FC = () => {

  /* The blog state + handlers */
  const [blogs, setBlogs] = React.useState<BlogPost[]>([
    {
      id: "1",
      title: "The Future of AI in Healthcare",
      category: "Health",
      date: "2025-12-01",
      status: "published",
      excerpt: "Exploring how AI is transforming patient care and diagnostics.",
      imageUrl: "https://via.placeholder.com/150",
      author: "Dr. Jane Doe",
      content: "Full article content goes here...",
      featured: true,
    },
    {
      id: "2",
      title: "Top 10 Web Development Trends",
      category: "Tech",
      date: "2025-11-28",
      status: "draft",
      excerpt: "A look at the latest frameworks and tools shaping web dev.",
      imageUrl: "https://via.placeholder.com/150",
      author: "ORENA",
      content: "Full article content goes here...",
      featured: false,
    },
  ]);


  const [selectedBlog, setSelectedBlog] = React.useState<BlogPost | null>(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };


  return (
    // Full-height layout with sidebar and main content
    <div className="d-flex vh-100">
      {/* Sidebar navigation */}
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />


        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
          }}
        >

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

              {/* Blog table */}
              <Row className="gy-4 mb-4">
                <Col>
                  <BlogTable
                    blogs={blogs}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
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
    </div >
  );
};

export default Dashboard;
