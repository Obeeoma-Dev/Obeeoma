import React, { useState } from "react";
import {
  Table,
  Button,
  Tabs,
  Tab,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import "./organisation.css";
// Define the shape of organization data
export interface Organization {
  id: string;
  name: string;
  clients: number;
  plan: "Premium" | "Freemium";
  status: "Active" | "Pending" | "Inactive";
  lastActive: string;
  address: string;
  programs: number;
  icon: string; // It is optional because some organisations might not have an icon.
}

// Props for the dashboard component
interface OrganizationDashboardProps {
  organizations: Organization[];
}

// Render status icon based on status
const renderStatusIcon = (status: Organization["status"]) => {
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
  organizations,
}) => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter organizations by tab category
  const filterByTab = (tab: string) => {
    switch (tab) {
      case "Active":
        return organizations.filter((org) => org.status === "Active");
      case "Inactive":
        return organizations.filter((org) => org.status === "Inactive");
      case "Premium":
        return organizations.filter((org) => org.plan === "Premium");
      case "Freemium":
        return organizations.filter((org) => org.plan === "Freemium");
      default:
        return organizations;
    }
  };

  // Filter by search term
  const filterBySearch = (orgs: Organization[]) =>
    orgs.filter((org) =>
      `${org.name} ${org.id} ${org.plan}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  // Render table rows
  const renderTable = (orgs: Organization[]) => (
    <Table
      bordered
      hover
      responsive
      className="shadow-sm table-sm align-middle"
    >
      <thead className="table-success align-middle">
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
        {orgs.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center text-muted py-4">
              No organizations found.
            </td>
          </tr>
        ) : (
          orgs.map((org) => (
            <tr key={org.id}>
              {/* Composite cell: name + ID */}
              <td>
                <div className="d-flex align-items-center">
                  {org.icon && org.icon.startsWith("http") && (
                    <img
                      src={org.icon}
                      alt={`${org.name} logo`}
                      className="me-2"
                      style={{
                        width: "32px",
                        height: "32px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  )}
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
  );

  return (
    <div className="mt-4">
      {/* Heading
      <h5 className="mb-3 fw-semibold text-success">Organization Dashboard</h5> */}

      <Row className="mb-3 align-items-center">
        <Col>
          <h5 className="fw-semibold text-success">Organization Dashboard</h5>
        </Col>
        <Col className="text-end">
          <Button variant="success">+ Add Organization</Button>
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
      background-color: #0B6E45 !important;
      color: white !important;
    }

    .nav-pills .nav-link {
      border-radius: 6px;
      margin-right: 4px;
    }

    .nav-pills .nav-link:hover {
      background-color: #3CB371 !important;
      color: white !important;
    }
  `}
      </style>

      {/* Tabs for filtering */}
      <Tabs
        defaultActiveKey="All"
        className="mb-3"
        justify
        variant="pills"
        aria-label="Organization filters"
      >
        {["All", "Active", "Inactive", "Premium", "Freemium"].map((tab) => (
          <Tab eventKey={tab} title={tab} key={tab}>
            {renderTable(filterBySearch(filterByTab(tab)))}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default OrganizationDashboard;
