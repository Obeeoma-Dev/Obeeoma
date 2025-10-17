import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

/**
 * Defines the shape of organization data.
 * Extend this interface as needed for backend integration.
 */
export interface Organization {
  id: string;
  name: string;
  clients: number;
  programs: number;
  status: "Active" | "Pending" | "Inactive";
  lastActive: string;
  region?: string; // Optional for now
  established?: string; // Optional for now
}

/**
 * Props for the OrganizationTable component.
 * Accepts an array of organization objects.
 */
interface OrganizationTableProps {
  organizations: Organization[];
}

/**
 * Renders a status icon based on organization status.
 * Helps users quickly identify status visually.
 */
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

/**
 * OrganizationTable component displays a styled table of organizations.
 * Includes status icons, action buttons, and responsive layout.
 */
const OrganizationTable: React.FC<OrganizationTableProps> = ({
  organizations,
}) => {
  return (
    <div className="mt-4">
      {/* Table heading */}
      <h5 className="mb-3 fw-semibold text-success">Organization List</h5>

      {/* Responsive Bootstrap table */}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-success">
          <tr>
            <th>Organization Name</th>
            <th>Clients</th>
            <th>Programs</th>
            <th>Status</th>
            <th>Last Active</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id}>
              <td>{org.name}</td>
              <td>{org.clients.toLocaleString()}</td>
              <td>{org.programs}</td>
              <td>
                {/* Status icon + label */}
                {renderStatusIcon(org.status)}
                {org.status}
              </td>
              <td>{org.lastActive}</td>
              <td>{org.region ?? "—"}</td>
              <td>
                {/* Link to details page with icon */}
                <Link to={`/systemadmin/organizations/${org.id}`}>
                  <Button variant="outline-success" size="sm">
                    <FaEye className="me-1" />
                    View Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrganizationTable;