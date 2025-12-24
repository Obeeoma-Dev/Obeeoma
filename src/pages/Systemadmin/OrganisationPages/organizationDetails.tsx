// src/components/admincomponents/organisationcomponents/OrganizationDetails.tsx

// NOTE: This file is written in a very beginner-friendly style.
// Every line has a short comment explaining what it does.
// It uses only React and React-Bootstrap (like your original),
// so you can replace your current file with this one safely.
// The code keeps your existing Sidebar, Header, and OrganizationCharts,
// and only refines layout and data to match the dashboard in your image.

// 1) Import React features we need from the React library.
import React, { useEffect, useState } from "react";

// 2) Import helpers from react-router-dom to read the URL and navigate to other pages.
import { useParams, useNavigate } from "react-router-dom";

// 3) Import UI components from react-bootstrap for layout and styling.
import {
  Container, // A full-width wrapping area
  Card, // A panel with header/body
  Row, // A horizontal layout row
  Col, // A column inside a row
  Button, // A clickable button
  ListGroup, // A list container for items
  ProgressBar, // A progress bar (we will use it to mimic a bar chart)
  Spinner, // A loading spinner shown while fetching data
  Badge, // A small status pill for the "Active" state
} from "react-bootstrap";

// 4) Import your existing Sidebar component (left navigation).
import Sidebar from "../../../components/admincomponents/adminsidebar";

// 5) Import your existing Header component (top navigation).
import Header from "../../../components/admincomponents/adminheader";

// 6) Import your existing charts component for the "Platform Usage" line graph.
//    We will keep using it to avoid breaking working parts.
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";

// 7) Define the TypeScript interface that describes the organization's data.
//    This helps TypeScript and your editor know what fields exist.
interface OrganizationInfo {
  // The organization name (e.g., "Wellness Center Inc.")
  name: string;
  // The admin's name who manages the organization (e.g., "Sarah Paul")
  admin: string;
  // The total number of client accounts in the organization (e.g., 245)
  clients: number;
  // The total number of programs available/active (e.g., 8)
  programs: number;
  // The last active time in a friendly text format (e.g., "2 hours ago")
  lastActive: string;
  // The unique organization identifier (e.g., "ORG-001")
  id: string;
  // The subscription plan name (e.g., "Premium")
  subscription: string;
  // The current status (e.g., "Active")
  status: string;
  // When the org was created (e.g., "2 years ago")
  created: string;
  // The geographic region (e.g., "West")
  region: string;
  // A basic engagement breakdown shown as progress bars to mimic bar charts.
  // These numbers represent percent values (0 to 100).
  engagementBreakdown: {
    // Crisis Support program engagement (e.g., 45 means 45%)
    crisisSupport: number;
    // Wellbeing program engagement (e.g., 15 means 15%)
    wellbeing: number;
    // Another program engagement (unnamed in the image, e.g., 30%)
    other1: number;
    // Another program engagement (unnamed in the image, e.g., 20%)
    other2: number;
  };
  // A list of recent activity log entries in human-readable text.
  activity: string[];
  // Optional: a list of navigation links we want to show inside the page.
  // This is not strictly required, but it helps match the image content.
  navigationLinks?: string[];
}

// 8) Create the React functional component for the Organization Details page.
const OrganizationDetails: React.FC = () => {
  // 9) Read the "id" parameter from the URL (e.g., /organizations/:id).
  const { id } = useParams<{ id: string }>();

  // 10) Create a helper function to navigate to other pages when buttons are clicked.
  const navigate = useNavigate();

  // 11) Create a state variable "org" to hold the organization data once loaded.
  //     It starts as null until we fetch or prepare data.
  const [org, setOrg] = useState<OrganizationInfo | null>(null);

  // 12) Create a state variable "loading" to indicate when data is being loaded.
  //     We show a spinner while loading is true.
  const [loading, setLoading] = useState<boolean>(true);

  // 13) Load the organization data when the component first renders or when the "id" changes.
  useEffect(() => {
    // 14) Set loading to true before we start fetching/preparing data.
    setLoading(true);

    // 15) Simulate an asynchronous fetch using setTimeout.
    //     In your real app, you will replace this with an actual API call (e.g., fetch or axios).
    setTimeout(() => {
      // 16) This is the placeholder data shaped to match the dashboard image.
      const placeholder: OrganizationInfo = {
        // 17) Organization name shown at the top and in cards.
        name: "Wellness Center Inc.",
        // 18) The admin responsible for the organization.
        admin: "Sarah Paul",
        // 19) Total clients count shown in the summary area.
        clients: 245,
        // 20) The number of active programs (image shows 8).
        programs: 8,
        // 21) Last active time shown in the header details.
        lastActive: "2 hours ago",
        // 22) The unique ID (image shows "ORG-001").
        id: "ORG-001",
        // 23) The subscription plan (image shows "Premium").
        subscription: "Premium",
        // 24) Current status (image shows "Active").
        status: "Active",
        // 25) Created time (your original had "2 years ago"; we keep it).
        created: "2 years ago",
        // 26) The region for this organization (image shows "West").
        region: "West",
        // 27) Program engagement values matching the image (percent values).
        engagementBreakdown: {
          crisisSupport: 45,
          wellbeing: 15,
          other1: 30,
          other2: 20,
        },
        // 28) Recent activity items expanded to match the image.
        activity: [
          "Subscription Renewed: 2 days ago - Premium Plan",
          "Monthly Report Generated: 1 week ago - August 2023",
          "Activity Threshold Alert: 3 weeks ago - Low engagement detected",
          "Client Milestone Achieved: 1 month ago - 50 new active clients",
        ],
        // 29) Optional navigation links we can show in the page (to mirror the image).
        navigationLinks: [
          "Organization Settings",
          "User Management",
          "Program Settings",
          "Billing History",
          "Deactivate Organization",
        ],
      };

      // 30) Save the placeholder data into our "org" state, so the UI can render it.
      setOrg(placeholder);

      // 31) Set loading to false because we are done preparing data.
      setLoading(false);
    }, 800); // 32) A short delay to simulate network time (800ms).
  }, [id]); // 33) If the "id" changes, this effect runs again to load the new org data.

  // 34) If we are still loading, show a full-page layout with the spinner.
  if (loading) {
    return (
      <div className="d-flex vh-100">
        {/* 35) Left sidebar stays visible while loading */}
        <Sidebar />
        {/* 36) The main area uses flexbox to stack Header and content */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          {/* 37) Top header visible while loading */}
          <Header />
          {/* 38) Centered spinner to inform the user that data is loading */}
          <Container fluid className="p-5 text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading organization details...</p>
          </Container>
        </div>
      </div>
    );
  }

  // 39) If loading is done but org is missing (e.g., fetch failed), show a simple error.
  if (!org) {
    return (
      <div className="d-flex vh-100">
        {/* 40) Keep sidebar visible for consistent app layout */}
        <Sidebar />
        {/* 41) Main area with header and error message */}
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <Header />
          <Container fluid className="p-5 text-danger">
            Organization not found.
          </Container>
        </div>
      </div>
    );
  }

  // 42) If we have data and we are not loading, render the main content.
  return (
    <div className="d-flex vh-100">
      {/* 43) The left admin sidebar for navigation */}
      <Sidebar />
      {/* 44) The right main content area (flex column: Header + page content) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* 45) Top admin header */}
        <Header />
        {/* 46) Main page container with padding and scroll when content is long */}
<<<<<<< HEAD
        <Container fluid className="p-4 overflow-auto page-background">
=======
        <Container fluid className="p-4 overflow-auto">
          {/* 47) A back button to return to the organizations overview page */}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/system-admin/organizations")}
            className="mb-4"
          >
            {/* 48) The arrow and text label to make the action clear */}←
            Wellness Center Inc.
          </Button>
>>>>>>> main

          {/* Button Row with Flexbox */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* Left-aligned back button */}
            <Button
              variant="outline-secondary"
              onClick={() => navigate('/system-admin/organizations')}
            >
              ← Wellness Center Inc.
            </Button>

            {/* Right-aligned buttons with spacing */}
            <div className="d-flex gap-2">
              <Button variant="outline-success" size="sm">
                Manage Subscription
              </Button>
              <Button variant="outline-primary" size="sm">
                Save Changes
              </Button>
            </div>
          </div>

<<<<<<< HEAD
          <Card className="p-4 shadow-sm">
=======
          {/* Dashboard Grid Row */}
          <Row className="gy-4 mb-4">
            {/* Organization Summary Card - positioned top-left */}
            <Col md={4}>
              <Card className="shadow-sm h-100">
                <Card.Header className="fw-semibold">
                  Organization Summary
                </Card.Header>
                <Card.Body>
                  <Row className="gy-3">
                    <Col xs={12}>
                      <strong>Name:</strong> <div>{org.name}</div>
                    </Col>
                    <Col xs={12}>
                      <strong>ID:</strong> <div>{org.id}</div>
                    </Col>
                    <Col xs={12}>
                      <strong>Subscription Plan:</strong>{" "}
                      <div>{org.subscription}</div>
                    </Col>
                    <Col xs={12}>
                      <strong>Status:</strong>{" "}
                      <Badge
                        bg={org.status === "Active" ? "success" : "secondary"}
                      >
                        {org.status}
                      </Badge>
                    </Col>
                    <Col xs={12}>
                      <strong>Region:</strong> <div>{org.region}</div>
                    </Col>
                    <Col xs={12}>
                      <strong>Last Active:</strong> <div>{org.lastActive}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
>>>>>>> main

            {/* 49) Page title using the organization name, styled to stand out */}
            <h3 className="text-success fw-bold mb-4">
              Organization Overview: {org.name}
            </h3>

            {/* Dashboard Grid Row */}
            <Row className="gy-4 mb-4">
              {/* Organization Summary Card - positioned top-left */}
              <Col md={4}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Header className="fw-semibold text-white" style={{ backgroundColor: "#00A859" }}>
                    Organization Summary
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-3">
                      {/* Name + Icon + ID */}
                      {/* <Col xs={12}>
                        <div className="d-flex align-items-center">
                          {/* {org.icon && org.icon.startsWith("http") && (
                            <img
                              src={org.icon}
                              alt={`${org.name} logo`}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                marginRight: "10px"
                              }}
                            />
                          )} */}
                          {/* <div>
                            <div className="fw-semibold fs-6">{org.name}</div>
                            <div className="text-muted small">ID: {org.id}</div>
                          </div> */}
                        {/* </div> */}
                      {/* </Col> */} 

<<<<<<< HEAD
                      {/* Subscription Plan */}
                      <Col xs={12}>
                        <strong>Subscription Plan:</strong>{" "}
                        <Badge style={{ backgroundColor: "#00A859", color: "#fff" }}>
                          {org.subscription}
                        </Badge>
                      </Col>

                      {/* Status */}
                      <Col xs={12}>
                        <strong>Status:</strong>
                        <div className="mt-1">
                          <Badge
                            style={{
                              backgroundColor: org.status === "Active" ? "#00A859" : "#6c757d",
                              color: "#fff"
                            }}
                          >
                            {org.status}
                          </Badge>
                        </div>
                      </Col>

                      {/* Region */}
                      <Col xs={12}>
                        <div className="d-flex flex-column">
                          <strong className="mb-1">Region:</strong>
                          <Badge bg="secondary" style={{ color: "#fff" }}>
                            {org.region}
                          </Badge>
                        </div>
                      </Col>

                      {/* Last Active */}
                      <Col xs={12}>
                        <div className="d-flex flex-column">
                          <strong className="mb-1">Last Active:</strong>
                          <span style={{ color: "#fff" }}>{org.lastActive}</span>
                        </div>
                      </Col>

                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              {/* Total Clients Card - top center */}
              <Col md={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <strong>Total Clients:</strong>
                    <h4 className="mt-2 text-primary">{org.clients}</h4>
                  </Card.Body>
                </Card>
              </Col>

              {/* Active Programs Card - top right */}
              <Col md={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <strong>Active Programs:</strong>
                    <h4 className="mt-2 text-primary">{org.programs}</h4>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* 65) Navigation links card to mirror the image's "Navigation Links" section */}
            <Card className="shadow-sm mb-4">
              {/* 66) A header label for clarity */}
              <Card.Header className="fw-semibold">Navigation Links</Card.Header>
              {/* 67) Card body with a simple list of actions or sections */}
              <Card.Body>
                <ListGroup variant="flush">
                  {/* 68) Map through the navigation links if they exist, otherwise show a simple fallback */}
                  {(org.navigationLinks && org.navigationLinks.length > 0
                    ? org.navigationLinks
                    : [
                      'Organization Settings',
                      'User Management',
                      'Program Settings',
                      'Billing History',
                      'Deactivate Organization',
                    ]
                  ).map((linkText, index) => (
                    // 69) Each item is clickable in the future; for now, we just display them.
                    <ListGroup.Item key={index}>{linkText}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>



            {/* 76) Program Engagement card that uses progress bars to mimic the bar chart in the image */}
            <Card className="shadow-sm mb-4">
              {/* 77) Header shows what the card contains */}
              <Card.Header className="fw-semibold">Program Engagement (%)</Card.Header>
              {/* 78) Body where progress bars are displayed */}
              <Card.Body>
                {/* 79) Crisis Support engagement bar */}
                <div className="mb-3">
                  <strong>Crisis Support</strong>
                  {/* 80) ProgressBar shows the percentage visually */}
                  <ProgressBar
                    now={org.engagementBreakdown.crisisSupport}
                    label={`${org.engagementBreakdown.crisisSupport}%`}
                    variant="danger"
                  />
                </div>
                {/* 81) Wellbeing engagement bar */}
                <div className="mb-3">
                  <strong>Wellbeing</strong>
                  <ProgressBar
                    now={org.engagementBreakdown.wellbeing}
                    label={`${org.engagementBreakdown.wellbeing}%`}
                    variant="success"
                  />
                </div>
                {/* 82) Other program 1 engagement bar */}
                <div className="mb-3">
                  <strong>Program A</strong>
                  <ProgressBar
                    now={org.engagementBreakdown.other1}
                    label={`${org.engagementBreakdown.other1}%`}
                    variant="info"
                  />
                </div>
                {/* 83) Other program 2 engagement bar */}
                <div>
                  <strong>Program B</strong>
                  <ProgressBar
                    now={org.engagementBreakdown.other2}
                    label={`${org.engagementBreakdown.other2}%`}
                    variant="warning"
                  />
                </div>
              </Card.Body>
            </Card>

            {/* 84) Platform Usage card showing the last 6 weeks line graph using your existing component */}
            <Card className="shadow-sm mb-4">
              {/* 85) Header title for the chart */}
              <Card.Header className="fw-semibold">Platform Usage (Last 6 Weeks)</Card.Header>
              {/* 86) Body contains the charts component. We keep it as-is to avoid breaking changes. */}
              <Card.Body>
                <OrganizationCharts />
              </Card.Body>
            </Card>
=======
          {/* 65) Navigation links card to mirror the image's "Navigation Links" section */}
          <Card className="shadow-sm mb-4">
            {/* 66) A header label for clarity */}
            <Card.Header className="fw-semibold">Navigation Links</Card.Header>
            {/* 67) Card body with a simple list of actions or sections */}
            <Card.Body>
              <ListGroup variant="flush">
                {/* 68) Map through the navigation links if they exist, otherwise show a simple fallback */}
                {(org.navigationLinks && org.navigationLinks.length > 0
                  ? org.navigationLinks
                  : [
                      "Organization Settings",
                      "User Management",
                      "Program Settings",
                      "Billing History",
                      "Deactivate Organization",
                    ]
                ).map((linkText, index) => (
                  // 69) Each item is clickable in the future; for now, we just display them.
                  <ListGroup.Item key={index}>{linkText}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* 76) Program Engagement card that uses progress bars to mimic the bar chart in the image */}
          <Card className="shadow-sm mb-4">
            {/* 77) Header shows what the card contains */}
            <Card.Header className="fw-semibold">
              Program Engagement (%)
            </Card.Header>
            {/* 78) Body where progress bars are displayed */}
            <Card.Body>
              {/* 79) Crisis Support engagement bar */}
              <div className="mb-3">
                <strong>Crisis Support</strong>
                {/* 80) ProgressBar shows the percentage visually */}
                <ProgressBar
                  now={org.engagementBreakdown.crisisSupport}
                  label={`${org.engagementBreakdown.crisisSupport}%`}
                  variant="danger"
                />
              </div>
              {/* 81) Wellbeing engagement bar */}
              <div className="mb-3">
                <strong>Wellbeing</strong>
                <ProgressBar
                  now={org.engagementBreakdown.wellbeing}
                  label={`${org.engagementBreakdown.wellbeing}%`}
                  variant="success"
                />
              </div>
              {/* 82) Other program 1 engagement bar */}
              <div className="mb-3">
                <strong>Program A</strong>
                <ProgressBar
                  now={org.engagementBreakdown.other1}
                  label={`${org.engagementBreakdown.other1}%`}
                  variant="info"
                />
              </div>
              {/* 83) Other program 2 engagement bar */}
              <div>
                <strong>Program B</strong>
                <ProgressBar
                  now={org.engagementBreakdown.other2}
                  label={`${org.engagementBreakdown.other2}%`}
                  variant="warning"
                />
              </div>
            </Card.Body>
          </Card>

          {/* 84) Platform Usage card showing the last 6 weeks line graph using your existing component */}
          <Card className="shadow-sm mb-4">
            {/* 85) Header title for the chart */}
            <Card.Header className="fw-semibold">
              Platform Usage (Last 6 Weeks)
            </Card.Header>
            {/* 86) Body contains the charts component. We keep it as-is to avoid breaking changes. */}
            <Card.Body>
              <OrganizationCharts />
            </Card.Body>
          </Card>
>>>>>>> main

            {/* 87) Recent Activity card showing the activity list items exactly like the image */}
            <Card className="shadow-sm">
              {/* 88) Header for the activity section */}
              <Card.Header className="fw-semibold">Recent Activity</Card.Header>
              {/* 89) Body renders each activity item in a clean list */}
              <Card.Body>
                <ListGroup variant="flush">
                  {org.activity.map((event, index) => (
                    // 90) Each event gets its own list item with a unique key
                    <ListGroup.Item key={index}>{event}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Card>
        </Container>
      </div>
    </div>
  );
};

// 91) Export the component as the default export so it can be imported elsewhere.
export default OrganizationDetails;
