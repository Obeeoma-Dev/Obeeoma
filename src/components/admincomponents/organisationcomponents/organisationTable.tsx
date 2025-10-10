// src/components/admincomponents/organisationcomponents/organisationTable.tsx
import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Define the shape of organization data
export interface Organization {
  id: string;
  name: string;
  clients: number;
  programs: number;
  status: string;
  lastActive: string;
}

// Props for the table component
interface OrganizationTableProps {
  organizations: Organization[];
}

// Table component to display organizations
const OrganizationTable: React.FC<OrganizationTableProps> = ({ organizations }) => {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="table-success">
        <tr>
          <th>Organization Name</th>
          <th>Clients</th>
          <th>Programs</th>
          <th>Status</th>
          <th>Last Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((org) => (
          <tr key={org.id}>
            <td>{org.name}</td>
            <td>{org.clients}</td>
            <td>{org.programs}</td>
            <td>{org.status}</td>
            <td>{org.lastActive}</td>
            <td>
              {/* Link to the organization details page */}
              <Link to={`/systemadmin/organizations/${org.id}`}>
                <Button variant="outline-success" size="sm">View Details</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrganizationTable;