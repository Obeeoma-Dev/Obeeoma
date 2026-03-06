import React, { useState, useEffect, useRef, useCallback } from "react";
import { ConditionalAPI } from "../../../contexts/OrganizationContext";
import {
  Table,
  Button,
  Tabs,
  Tab,
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import { adminAPI } from "../../../api/apiConfig";
import axios from "axios";
import "./organisation.css";
import OrganizationRegistrationPopup from "./OrganizationRegistrationPopup";

// Database-based organization interface (matching API response)
export interface DatabaseOrganization {
  id: number;
  name: string;
  client_count: number;
  current_plan: string;
  is_active: boolean;
  joined_date: string;
  // Additional fields that might be available
  email?: string;
  phone?: string;
  Location?: string; // Note: Capital L from API
  contact_person?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// Define interface for table format
interface TableOrganization {
  id: string;
  name: string;
  clients: number;
  plan: string;
  status: string;
  lastActive: string;
  address: string;
  programs: number;
  icon: string;
}

// Convert database organization to table format
const convertToTableFormat = (
  org: DatabaseOrganization,
): TableOrganization => ({
  id: org.id.toString(),
  name: org.name,
  clients: org.client_count || 0,
  plan: org.current_plan === "Premium" ? "Premium" : "Freemium",
  status: org.is_active ? "Active" : "Inactive",
  lastActive: new Date(org.joined_date).toLocaleDateString(),
  address: org.Location || "Not specified", // Use Location with capital L
  programs: 0, // Not available from API
  icon: "", // Not available from API
});

interface OrganizationDashboardProps {
  organizations?: TableOrganization[];
  loading?: boolean;
  error?: string | null;
  hasMore?: boolean;
  totalCount?: number;
  onRefresh?: () => void;
  onFetchMore?: (search?: string) => void;
  onSearch?: (search: string) => void;
  onAdd?: (org: TableOrganization) => void;
  onUpdate?: (org: TableOrganization) => void;
  onDelete?: (id: string) => void;
  conditionalAPI?: ConditionalAPI;
}

// Render status icon based on status
const renderStatusIcon = (status: string) => {
  switch (status) {
    case "Active":
      return <FaCheckCircle className="text-success me-1" />;
    case "Pending":
      return <FaClock className="text-warning me-1" />;
    case "Inactive":
      return <FaTimesCircle className="text-danger me-1" />;
    default:
      return null;
  }
};

// Main dashboard component
const OrganizationDashboard: React.FC<OrganizationDashboardProps> = ({
  organizations: propOrganizations = [],
  loading: propLoading = false,
  error: propError = null,
  hasMore: propHasMore = true,
  totalCount: propTotalCount = 0,
  onRefresh,
  onFetchMore,
  onSearch,
  onAdd,
  onUpdate,
  onDelete,
  conditionalAPI,
}) => {
  // State for organizations (use prop data if provided, otherwise fallback to internal state)
  const [organizations, setOrganizations] = useState<TableOrganization[]>(
    propOrganizations,
  );
  const [loading, setLoading] = useState(propLoading);
  const [hasMore, setHasMore] = useState(propHasMore);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(propTotalCount);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // State for registration popup
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);

  // Intersection Observer for endless scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastOrganizationElementRef = useRef<HTMLTableRowElement>(null);

  // Update internal state when props change
  useEffect(() => {
    setOrganizations(propOrganizations);
    setLoading(propLoading);
    setHasMore(propHasMore);
    setTotalCount(propTotalCount);
  }, [
    propOrganizations,
    propLoading,
    propHasMore,
    propTotalCount,
  ]);

  // Fetch organizations with pagination (fallback if no onFetchMore provided)
  const fetchOrganizations = useCallback(
    async (pageNum = 1, search = "") => {
      if (onFetchMore) {
        onFetchMore(search);
        return;
      }

      // Fallback to original logic if no hook provided
      try {
        setLoading(true);
        console.log(
          `Fetching organizations: page=${pageNum}, search="${search}"`,
        );

        // Use conditionalAPI if provided, otherwise use original adminAPI
        const apiInstance = conditionalAPI || adminAPI;
        const response = await apiInstance.getOrganizationsList?.(
          pageNum,
          5,
          search,
        );
        console.log("Table API Response:", response);

        // Handle response with simple typing
        const results = response?.data?.results || response?.data || [];
        const totalCount = response?.data?.count || (Array.isArray(results) ? results.length : 0);
        const hasNext = response?.data?.next !== undefined ? response?.data?.next !== null : false;

        // Convert to table format
        const formattedOrgs = results.map((org: DatabaseOrganization) =>
          convertToTableFormat(org),
        );

        if (pageNum === 1) {
          setOrganizations(formattedOrgs);
        } else {
          setOrganizations((prev: TableOrganization[]) => [
            ...prev,
            ...formattedOrgs,
          ]);
        }

        setHasMore(hasNext);
        setTotalCount(totalCount);

        console.log(
          `Table: Processed ${formattedOrgs.length} organizations, total: ${totalCount}, hasMore: ${hasNext}`,
        );
      } catch (error) {
        console.error("Error fetching organizations for table:", error);
        setOrganizations([]);
        setHasMore(false);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    },
    [conditionalAPI, onFetchMore],
  );

  // Initial fetch and search
  useEffect(() => {
    if (onSearch && searchTerm !== undefined) {
      onSearch(searchTerm);
      setPage(1);
      setHasMore(true);
    } else {
      setPage(1);
      setHasMore(true);
      fetchOrganizations(1, searchTerm);
    }
  }, [
    searchTerm,
    activeTab,
    fetchOrganizations,
    onSearch,
  ]);

  // Infinite scroll observer
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        if (onFetchMore) {
          onFetchMore(searchTerm);
        } else {
          fetchOrganizations(nextPage, searchTerm);
        }
      }
    });

    if (lastOrganizationElementRef.current) {
      observer.current.observe(lastOrganizationElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [
    loading,
    hasMore,
    page,
    searchTerm,
    fetchOrganizations,
    onFetchMore,
  ]);

  // Filter organizations by tab category
  const filterByTab = (orgs: TableOrganization[], tab: string) => {
    switch (tab) {
      case "Active":
        return orgs.filter((org) => org.status === "Active");
      case "Inactive":
        return orgs.filter((org) => org.status === "Inactive");
      case "Premium":
        return orgs.filter((org) => org.plan === "Premium");
      case "Freemium":
        return orgs.filter((org) => org.plan === "Freemium");
      default:
        return orgs;
    }
  };

  // Filter by search term
  const filterBySearch = (orgs: TableOrganization[]) =>
    orgs.filter((org) =>
      `${org.name} ${org.id} ${org.plan}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  // Handle successful organization registration
  const handleRegistrationSuccess = (newOrg?: TableOrganization) => {
    if (newOrg && onAdd) {
      onAdd(newOrg);
    } else {
      // Refresh organizations list to show newly registered organization
      fetchOrganizations(1, searchTerm);
    }
  };

  // Render table rows
  const renderTable = (orgs: TableOrganization[]) => (
    <div>
      {/* Error display */}
      {propError && (
        <div className="alert alert-danger mb-3">
          <p className="mb-2">Error loading organizations: {propError}</p>
          {onRefresh && (
            <Button variant="outline-danger" size="sm" onClick={onRefresh}>
              Retry
            </Button>
          )}
        </div>
      )}

      <div className="mb-2 text-muted">
        Showing {orgs.length} of {totalCount} organizations
      </div>
      <div style={{ height: "450px", overflowY: "auto" }}>
        <Table
          bordered
          hover
          responsive
          className="shadow-sm table-sm align-middle"
        >
          <thead className="table-success align-middle sticky-top">
            <tr>
              <th>Organization</th>
              <th>Clients</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orgs.length === 0 && !loading ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No organizations found.
                </td>
              </tr>
            ) : (
              orgs.map((org, index) => (
                <tr
                  key={org.id}
                  ref={
                    index === orgs.length - 1
                      ? lastOrganizationElementRef
                      : null
                  }
                >
                  {/* Composite cell: name + ID */}
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="fw-semibold">{org.name}</div>
                        <div className="text-muted small">ID: {org.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Clients */}
                  <td>{org.clients.toLocaleString()}</td>

                  {/* Plan */}
                  <td>
                    <span
                      className={`badge ${org.plan === "Premium" ? "bg-success" : "bg-secondary"
                        }`}
                    >
                      {org.plan}
                    </span>
                  </td>

                  {/* Status with icon */}
                  <td>
                    {renderStatusIcon(org.status)}
                    {org.status}
                  </td>

                  {/* Last Active */}
                  <td>
                    <span className="text-muted">{org.lastActive}</span>
                  </td>

                  {/* Actions: single View Details button */}
                  <td>
                    <Link to={`/systemadmin/organizations/${org.id}`}>
                      <Button variant="outline-success" size="sm">
                        <FaEye className="me-1" />
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center p-3">
          <Spinner animation="border" variant="success" />
          <div className="mt-2 text-muted">Loading more organizations...</div>
        </div>
      )}

      {/* End of data indicator */}
      {!hasMore && orgs.length > 0 && (
        <div className="text-center p-3 text-muted">
          All organizations loaded
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-4">
      {/* Heading */}

      <Row className="mb-3 align-items-center">
        <Col>
          <h5
            className="fw-semibold text-success"
            style={{ fontFamily: "heading" }}
          >
            Organization Dashboard
          </h5>
        </Col>
        <Col className="text-end">
          <Button
            className="btn-organization"
            onClick={() => setShowRegistrationPopup(true)}
          >
            + Add Organization
          </Button>
        </Col>
      </Row>

      {/* Search bar */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, ID, or plan..."
              aria-label="Search organizations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <style>
        {`
    .nav-pills .nav-link.active {
      background-color: #3CB371 !important;
      color: white !important;
    }

    .nav-pills .nav-link {
      border-radius: 6px;
      margin-right: 4px;
    }

    .nav-pills .nav-link:hover {
      background-color: #0B6E45 !important;
      color: white !important;
    }
  `}
      </style>

      {/* Tabs for filtering */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "All")}
        className="mb-3"
        justify
        variant="pills"
        aria-label="Organization filters"
      >
        {["All", "Active", "Inactive", "Premium", "Freemium"].map((tab) => (
          <Tab eventKey={tab} title={tab} key={tab}>
            {renderTable(filterBySearch(filterByTab(organizations, tab)))}
          </Tab>
        ))}
      </Tabs>

      {/* Organization Registration Popup */}
      <OrganizationRegistrationPopup
        show={showRegistrationPopup}
        onHide={() => setShowRegistrationPopup(false)}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </div>
  );
};

export default OrganizationDashboard;
