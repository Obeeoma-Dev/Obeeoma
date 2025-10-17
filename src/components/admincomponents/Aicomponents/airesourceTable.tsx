// Table showing AI resources and their effectiveness status

import React from 'react';
import { Table } from 'react-bootstrap';

export interface ResourceRow {
  name: string;
  status: 'High Effectiveness' | 'Needs Improvement';
}

interface AIResourcesTableProps {
  resources: ResourceRow[];
}

const AIResourcesTable: React.FC<AIResourcesTableProps> = ({ resources }) => (
  <div className="mb-4">
    <h5>AI Resources</h5>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {resources.map((res) => (
          <tr key={res.name}>
            <td>{res.name}</td>
            <td>{res.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default AIResourcesTable;