// src/components/admincomponents/aimanagementcomponents/AIResourcesTable.tsx

import React from "react";
import { Table, Badge, Card } from "react-bootstrap";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

// Type for each resource row
export interface ResourceRow {
  name: string;
  status: "High Effectiveness" | "Needs Improvement";
}

// Props interface for the table component
interface AIResourcesTableProps {
  resources: ResourceRow[];
}

// Functional component with styled header and status icons
const AIResourcesTable: React.FC<AIResourcesTableProps> = ({ resources }) => {
  return (
    <Card className="shadow-sm mb-4">
      {/* Card header with section title */}
      <Card.Header className="fw-semibold">AI Resources Overview</Card.Header>

      {/* Table with striped rows and hover effect */}
      <Card.Body className="p-0">
        <Table responsive striped hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Resource</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => (
              <tr key={res.name}>
                {/* Resource name */}
                <td className="align-middle">{res.name}</td>

                {/* Status with icon and badge */}
                <td className="align-middle">
                  {res.status === "High Effectiveness" ? (
                    <Badge
                      bg="success"
                      className="d-flex align-items-center gap-2"
                    >
                      <CheckCircleFill size={16} />
                      {res.status}
                    </Badge>
                  ) : (
                    <Badge
                      bg="warning"
                      text="dark"
                      className="d-flex align-items-center gap-2"
                    >
                      <ExclamationTriangleFill size={16} />
                      {res.status}
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AIResourcesTable;
