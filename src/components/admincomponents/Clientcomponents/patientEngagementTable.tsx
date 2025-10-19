// PatientEngagementTable.tsx
// Displays a styled table of patient engagement data with icons and status badges

import React from "react";
import { Table, Badge } from "react-bootstrap";
import { FaFire, FaExclamationTriangle, FaSnowflake } from "react-icons/fa";

// Define a type for patient data
interface Patient {
  name: string;
  organization: string;
  engagementRate: number;
  pointsRedeemed: number;
  lastActivity: string;
}

// Sample patient data (can be replaced with props or API)
const patients: Patient[] = [
  {
    name: "Madison Carano",
    organization: "HealthOne",
    engagementRate: 92,
    pointsRedeemed: 1200,
    lastActivity: "2h ago",
  },
  {
    name: "William Johnson",
    organization: "MediCare",
    engagementRate: 88,
    pointsRedeemed: 980,
    lastActivity: "3h ago",
  },
  {
    name: "Vanessa Jefferson",
    organization: "HealthOne",
    engagementRate: 45,
    pointsRedeemed: 1100,
    lastActivity: "1h ago",
  },
];

// Helper function to determine engagement level icon
const getEngagementIcon = (rate: number): React.ReactNode => {
  if (rate >= 80) return <FaFire className="text-danger me-1" title="High Engagement" />;
  if (rate >= 50) return <FaExclamationTriangle className="text-warning me-1" title="Medium Engagement" />;
  return <FaSnowflake className="text-info me-1" title="Low Engagement" />;
};

// Helper function to determine status badge
const getStatusBadge = (rate: number): React.ReactNode => {
  return rate >= 50 ? (
    <Badge bg="success">Active</Badge>
  ) : (
    <Badge bg="secondary">Low Engagement</Badge>
  );
};

// Main component
const PatientEngagementTable: React.FC = () => {
  return (
    <div className="mb-4">
      <h5 className="mb-3">Client Engagement Table</h5>

      {/* Responsive Bootstrap table */}
      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Organization</th>
            <th>Engagement</th>
            <th>Engagement Rate (%)</th>
            <th>Points Redeemed</th>
            <th>Last Activity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.name}>
              <td>{patient.name}</td>
              <td>{patient.organization}</td>

              {/* Engagement icon + label */}
              <td>
                {getEngagementIcon(patient.engagementRate)}
                {patient.engagementRate >= 80
                  ? "High"
                  : patient.engagementRate >= 50
                    ? "Medium"
                    : "Low"}
              </td>

              {/* Numeric rate */}
              <td>{patient.engagementRate}%</td>

              {/* Points redeemed */}
              <td>{patient.pointsRedeemed.toLocaleString()}</td>

              {/* Last activity */}
              <td>{patient.lastActivity}</td>

              {/* Status badge */}
              <td>{getStatusBadge(patient.engagementRate)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientEngagementTable;