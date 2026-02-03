import React from "react";
import { Table } from "react-bootstrap";
import { CheckCircle2, Clock } from "lucide-react";

// Define the shape of each subscription entry
interface Subscription {
  organization: string;
  plan: string;
  employees: number;
  activeUsers: number;
  activeUsersPercentage: number;
  status: "Active" | "Pending";
  expiryDate: string;
}

// Props interface for backend-ready data injection
interface Props {
  subscriptions: Subscription[];
}

const RecentSubscriptionsTable: React.FC<Props> = ({ subscriptions }) => {
  return (
    <Table responsive className="mb-0">
      <thead className="bg-light" style={{ fontFamily: "heading" }}>
        <tr>
          <th className="px-4 py-3 text-muted small fw-semibold">
            Organization
          </th>
          <th className="px-4 py-3 text-muted small fw-semibold">Plan</th>
          <th className="px-4 py-3 text-muted small fw-semibold">Employees</th>
          <th className="px-4 py-3 text-muted small fw-semibold">
            Active Users
          </th>
          <th className="px-4 py-3 text-muted small fw-semibold">Status</th>
          <th className="px-4 py-3 text-muted small fw-semibold">
            Expiry Date
          </th>
          <th className="px-4 py-3 text-muted small fw-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions.map((sub, index) => (
          <tr
            key={index}
            className="border-bottom"
            style={{ fontFamily: "body" }}
          >
            <td className="px-4 py-3">{sub.organization}</td>
            <td className="px-4 py-3">{sub.plan}</td>
            <td className="px-4 py-3">{sub.employees}</td>
            <td className="px-4 py-3">
              {sub.activeUsers} ({sub.activeUsersPercentage}%)
            </td>
            <td className="px-4 py-3">
              {sub.status === "Active" ? (
                <span className="d-flex align-items-center text-success">
                  <CheckCircle2 size={16} className="me-1" />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center text-warning">
                  <Clock size={16} className="me-1" />
                  Pending
                </span>
              )}
            </td>
            <td className="px-4 py-3">{sub.expiryDate}</td>
            <td className="px-4 py-3">
              <div className="d-flex gap-2">
                <a href="#" className="text-success text-decoration-none small">
                  View
                </a>
                <a href="#" className="text-success text-decoration-none small">
                  Edit
                </a>
                <a href="#" className="text-danger text-decoration-none small">
                  Deactivate
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RecentSubscriptionsTable;
