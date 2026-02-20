import React, { useState, useEffect } from "react";
import { Container, Row, Col, Stack, Button, Spinner } from "react-bootstrap";
import { ArrowLeft, CreditCard, Save } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Page components
import Sidebar from "../../../components/admincomponents/adminsidebar";
import Header from "../../../components/admincomponents/adminheader";
import { OrganizationProfile } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationProfile";
import { OrganizationStats } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationStats";
import { PlatformUsageChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationPlatformUse";
import { ProgramEngagementChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/programEngagementChart";
import { RecentActivity } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/recentActivity";
import { adminAPI } from "../../../api/apiConfig";
import { DatabaseOrganization } from "../../../components/admincomponents/organisationcomponents/organisationTable";
import "./orgpage.css";

export function OrganizationDetails() {
  // Get organization ID from URL params
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Environment detection and conditional API setup
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const conditionalAPIBaseURL = isLocalhost
    ? 'http://127.0.0.1:8000/api/v1'  // Neon backend for localhost development
    : 'https://obeeoma-api.com/api/v1'; // Digital Ocean backend for production

  // Create conditional API instance
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

  // Create conditional API methods without /v1/ prefix
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
  };

  console.log('OrganizationDetails - Environment:', isLocalhost ? 'Development (Neon)' : 'Production (Digital Ocean)');
  console.log('OrganizationDetails - API Base URL:', conditionalAPIBaseURL);

  // State for organization data
  const [organization, setOrganization] = useState<DatabaseOrganization | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch organization details
  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      if (!id) {
        setError("Organization ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`Fetching organization details for ID: ${id}`);

        // Use conditional API to avoid /v1/ duplication
        const response = await conditionalAPIWithMethods.getOrganizationsList(1, 100, ""); // Get all orgs
        const allOrgs = response.data.results || response.data || [];

        const foundOrg = allOrgs.find(
          (org: DatabaseOrganization) => org.id.toString() === id,
        );

        if (foundOrg) {
          setOrganization(foundOrg);
          console.log("Found organization:", foundOrg);
        } else {
          setError("Organization not found");
        }
      } catch (err) {
        console.error("Error fetching organization details:", err);
        setError("Failed to load organization details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationDetails();
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <Header />
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <Spinner animation="border" variant="success" />
              <div className="mt-2">Loading organization details...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !organization) {
    return (
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column overflow-hidden">
          <Header />
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div className="text-danger mb-3">
                {error || "Organization not found"}
              </div>
              <Button variant="outline-success" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Root layout: sidebar + main content
    <div className="d-flex vh-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content column */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Top header bar */}
        <Header />

        {/* Scrollable page content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Page container */}
          <Container fluid="xl">
            {/* ================= HEADER SECTION ================= */}
            <Row className="align-items-center mb-4">
              <Col>
                <Stack direction="horizontal" gap={3}>
                  <Button
                    variant="light"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                </Stack>
              </Col>

              <Col xs="auto">
                <Stack direction="horizontal" gap={2}>
                  <Button variant="outline-success">
                    <CreditCard size={16} />
                    Manage Subscription
                  </Button>

                  <Button variant="success">
                    <Save size={16} />
                    Save Changes
                  </Button>
                </Stack>
              </Col>
            </Row>

            {/* ================= MAIN CONTENT ================= */}
            {/* Debug info */}
            <div className="mb-3 p-2 bg-light">
              <small className="text-muted">
                Debug: Organization ID = {id} | Org Name = {organization?.name}{" "}
                | Plan = {organization?.current_plan} | Status ={" "}
                {organization?.is_active ? "Active" : "Inactive"} | Location ={" "}
                {organization?.Location || "No Location field"} | Location Type
                = {typeof organization?.Location} | Location Value ={" "}
                {JSON.stringify(organization?.Location)} | Clients ={" "}
                {organization?.client_count || "No client_count field"} |
                Available Keys:{" "}
                {organization
                  ? Object.keys(organization).join(", ")
                  : "No org data"}
              </small>
            </div>

            {/* OrganizationProfile Props Debug */}
            <div className="mb-3 p-2 bg-warning">
              <small className="text-muted">
                Props being passed to OrganizationProfile: Name ={" "}
                {organization?.name} | ID = {`ORG-${organization?.id}`} | Plan ={" "}
                {organization?.current_plan || "Freemium"} | Status ={" "}
                {organization?.is_active ? "Active" : "Inactive"} | Location ={" "}
                {organization?.Location || "Not specified"} | LastActive ={" "}
                {organization
                  ? new Date(organization.joined_date).toLocaleDateString()
                  : "N/A"}
              </small>
            </div>

            {/* Left profile column */}
            <Row className="mb-4">
              <Col lg={6} className="mb-4">
                <OrganizationProfile
                  name={organization.name}
                  id={`ORG-${organization.id}`}
                  subscriptionPlan={organization.current_plan || "Freemium"}
                  status={organization.is_active ? "Active" : "Inactive"}
                  location={organization.Location || "Not specified"}
                  lastActive={new Date(
                    organization.joined_date,
                  ).toLocaleDateString()}
                />
              </Col>

              <Col lg={6} className="mb-4">
                <OrganizationStats />
              </Col>
            </Row>

            {/* Right content column */}
            <Col lg={12}>
              <div className="chart-row-wrapper">
                <Row className="align-items-stretch mb-4 mb-lg-0">
                  <Col lg={6} className="d-flex flex-column">
                    <div className="flex-grow-1">
                      <PlatformUsageChart />
                    </div>
                  </Col>

                  <Col lg={6} className="d-flex flex-column">
                    <div className="flex-grow-1">
                      <ProgramEngagementChart />
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-4">
                <RecentActivity />
              </div>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
}
