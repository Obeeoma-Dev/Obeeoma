import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Modal,
  Table,
  Button,
  Spinner,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaTimes, FaEye } from "react-icons/fa";
import { adminAPI } from "../../../api/apiConfig";

// Database-based organization interface (updated to match backend response)
interface DatabaseOrganization {
  id: number;
  name: string;
  client_count: number;
  current_plan: string;
  is_active: boolean;
  joined_date: string;
  // Additional fields that might be available
  email?: string;
  phone?: string;
  location?: string;
  contact_person?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

interface OrganizationListPopupProps {
  show: boolean;
  onHide: () => void;
}

const OrganizationListPopup: React.FC<OrganizationListPopupProps> = ({
  show,
  onHide,
}) => {
  const [organizations, setOrganizations] = useState<DatabaseOrganization[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastOrganizationElementRef = useRef<HTMLTableRowElement>(null);

  // Fetch organizations with pagination
  const fetchOrganizations = useCallback(
    async (pageNum = 1, search = "") => {
      try {
        setLoading(true);
        console.log(
          `Fetching organizations: page=${pageNum}, search="${search}"`,
        );

        const response = await adminAPI.getOrganizationsList(
          pageNum,
          10,
          search,
        );
        console.log("API Response:", response);
        console.log("Response data:", response.data);

        if (pageNum === 1) {
          setOrganizations(response.data.results || response.data || []);
        } else {
          const newOrgs = response.data.results || response.data || [];
          setOrganizations((prev) => [...prev, ...newOrgs]);
        }

        // Handle different response structures
        const results = response.data.results || response.data;
        const totalCount =
          response.data.count || (Array.isArray(results) ? results.length : 0);
        const hasNext =
          response.data.next !== undefined
            ? response.data.next !== null
            : false;

        setHasMore(hasNext);
        setTotalCount(totalCount);

        console.log(
          `Processed: ${results.length} organizations, total: ${totalCount}, hasMore: ${hasMore}`,
        );

        // Log the first organization to see its structure
        if (results.length > 0) {
          console.log("First organization structure:", results[0]);
          console.log("Organization keys:", Object.keys(results[0]));
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);

        // Type-safe error handling
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        const errorResponse =
          error && typeof error === "object" && "response" in error
            ? (error as { response?: { data?: unknown } }).response?.data
            : null;

        console.error("Error details:", errorResponse || errorMessage);

        // Set empty state on error
        setOrganizations([]);
        setHasMore(false);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    },
    [hasMore],
  );

  // Initial fetch and search
  useEffect(() => {
    if (show) {
      setPage(1);
      setHasMore(true);
      fetchOrganizations(1, searchTerm);
    }
  }, [show, searchTerm, fetchOrganizations]);

  // Infinite scroll observer
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchOrganizations(nextPage, searchTerm);
      }
    });

    if (lastOrganizationElementRef.current) {
      observer.current.observe(lastOrganizationElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, page, searchTerm, fetchOrganizations]);

  // Filter organizations by search term
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      org.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      org.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      backdrop="static"
      className="organization-list-modal"
    >
      <Modal.Header className="bg-success text-white">
        <Modal.Title className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <span>All Organizations ({totalCount})</span>
            <Button variant="light" size="sm" onClick={onHide}>
              <FaTimes />
            </Button>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        {/* Search Bar */}
        <div className="p-3 border-bottom">
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Organizations Table */}
        <div style={{ height: "500px", overflowY: "auto" }}>
          <Table striped hover responsive className="mb-0">
            <thead className="table-success sticky-top">
              <tr>
                <th>Organization Name</th>
                <th>Clients</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganizations.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No organizations found.
                  </td>
                </tr>
              ) : (
                filteredOrganizations.map((org, index) => (
                  <tr
                    key={org.id}
                    ref={
                      index === filteredOrganizations.length - 1
                        ? lastOrganizationElementRef
                        : null
                    }
                  >
                    <td className="fw-semibold">{org.name}</td>
                    <td>
                      <span className="badge bg-primary">
                        {org.client_count || 0}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${org.current_plan === "Premium" ? "bg-success" : "bg-secondary"}`}
                      >
                        {org.current_plan}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${org.is_active ? "bg-success" : "bg-danger"}`}
                      >
                        {org.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{formatDate(org.joined_date)}</td>
                    <td>
                      <Button variant="outline-success" size="sm">
                        <FaEye className="me-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Loading indicator */}
          {loading && (
            <div className="text-center p-3">
              <Spinner animation="border" variant="success" />
              <div className="mt-2 text-muted">
                Loading more organizations...
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrganizationListPopup;
