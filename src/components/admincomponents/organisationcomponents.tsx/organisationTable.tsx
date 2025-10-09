// src/components/admincomponents/OrganizationTable.tsx
import React from "react";
import { Table } from "react-bootstrap";

// Static table of organizations
const OrganizationTable: React.FC = () => {
  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="table-success">
        <tr>
          <th>Organization Name</th>
          <th>Clients</th>
          <th>Programs</th>
          <th>Status</th>
          <th>Last Active</th>
        </tr>
      </thead>
      <tbody>
        {/* Example rows — replace with dynamic data later */}
        <tr>
          <td>Wellness Center Inc.</td>
          <td>284</td>
          <td>12</td>
          <td>Active</td>
          <td>2 hours ago</td>
        </tr>
        <tr>
          <td>Community Mental Health</td>
          <td>194</td>
          <td>8</td>
          <td>Active</td>
          <td>3 hours ago</td>
        </tr>
        <tr>
          <td>Urban Outreach</td>
          <td>134</td>
          <td>6</td>
          <td>Inactive</td>
          <td>2 days ago</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default OrganizationTable;