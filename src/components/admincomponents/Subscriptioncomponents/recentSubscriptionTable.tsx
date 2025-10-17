// src/components/admincomponents/subscriptioncomponents/RecentSubscriptionsTable.tsx

import React from 'react';
import { Table, Button } from 'react-bootstrap';

// Define the shape of each subscription entry
interface Subscription {
  organization: string;
  type: string;
  employees: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Inactive';
}

// Props interface for backend-ready data injection
interface Props {
  subscriptions: Subscription[];
}

const RecentSubscriptionsTable: React.FC<Props> = ({ subscriptions }) => {
  return (
    <div className="mb-4">
      <h5>Recent Subscriptions</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Type</th>
            <th>Employees</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={index}>
              <td>{sub.organization}</td>
              <td>{sub.type}</td>
              <td>{sub.employees}</td>
              <td>{sub.startDate}</td>
              <td>{sub.endDate}</td>
              <td>{sub.status}</td>
              <td>
                <Button variant="outline-primary" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentSubscriptionsTable;