// src/components/admincomponents/subscriptioncomponents/RecentSubscriptionsTable.tsx

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
    <div style={{ overflowX: "auto" }}>
      <Table hover style={{ marginBottom: 0 }}>
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Organization
            </th>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Plan
            </th>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Employees
            </th>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Active Users
            </th>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Status
            </th>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Expiry Date
            </th>
            <th
              style={{ padding: "1rem", fontWeight: "600", color: "#495057" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #e9ecef" }}>
              <td style={{ padding: "1rem", color: "#1a1a1a" }}>
                {sub.organization}
              </td>
              <td style={{ padding: "1rem", color: "#6c757d" }}>{sub.plan}</td>
              <td style={{ padding: "1rem", color: "#1a1a1a" }}>
                {sub.employees.toLocaleString()}
              </td>
              <td style={{ padding: "1rem", color: "#1a1a1a" }}>
                {sub.activeUsers.toLocaleString()} ({sub.activeUsersPercentage}
                %)
              </td>
              <td style={{ padding: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {sub.status === "Active" ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="#3CB371"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke="#3CB371"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span style={{ color: "#3CB371", fontWeight: "500" }}>
                        Active
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="#ff9800"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <path
                          d="M8 4v4l3 2"
                          stroke="#ff9800"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span style={{ color: "#ff9800", fontWeight: "500" }}>
                        Pending
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td style={{ padding: "1rem", color: "#6c757d" }}>
                {sub.expiryDate}
              </td>
              <td style={{ padding: "1rem" }}>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a
                    href="#"
                    style={{
                      color: "#3CB371",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`View ${sub.organization}`);
                    }}
                  >
                    View
                  </a>
                  <a
                    href="#"
                    style={{
                      color: "#3CB371",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Edit ${sub.organization}`);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    style={{
                      color: "#dc3545",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Deactivate ${sub.organization}`);
                    }}
                  >
                    Deactivate
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentSubscriptionsTable;
