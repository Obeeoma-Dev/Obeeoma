// PatientEngagementTable.tsx
// Displays a styled table of patient engagement data with icons and status badges

import React from "react";
import { Table, Badge, Card } from "react-bootstrap";
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
  {
    name: "Preston Corbett",
    organization: "WellnessCo",
    engagementRate: 67,
    pointsRedeemed: 870,
    lastActivity: "5h ago",
  },
];

// Helper function to determine engagement level icon
const getEngagementIcon = (rate: number): React.ReactNode => {
  if (rate >= 80)
    return <FaFire className="text-danger me-1" title="High Engagement" />;
  if (rate >= 50)
    return (
      <FaExclamationTriangle
        className="text-warning me-1"
        title="Medium Engagement"
      />
    );
  return <FaSnowflake className="text-info me-1" title="Low Engagement" />;
};

// Helper function to determine status badge
const getStatusBadge = (rate: number): React.ReactNode => {
  return rate >= 50 ? (
    <Badge pill bg="success">
      Active
    </Badge>
  ) : (
    <Badge pill bg="secondary">
      Low Engagement
    </Badge>
  );
};

// helper for getting initials.
const getInitials = (fullName: string) => {
  const names = fullName.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Main component
const PatientEngagementTable: React.FC = () => {
  return (

    <Card className="mb-4 shadow-sm">
      {/* Card header for table title and hierarchy */}
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        style={{ fontFamily: "heading" }}
      >
        <strong>Client Engagement Table</strong>
      </Card.Header>


      <Card.Body className="p-2">
        {/* 
        Responsive Bootstrap table
        - hover: subtle row interaction
        - responsive: horizontal scroll on small screens
        - align-middle: vertical centering of content
        - mb-0: avoid extra spacing inside Card
      */}
        <Table hover responsive className="align-middle mb-0 table-hover">
          {/* Light header with muted text for a modern dashboard feel */}
          <thead
            className="table-light text-muted small"
            style={{ fontFamily: "heading" }}
          >
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
              // Use stable key (name assumed unique for demo data)
              <tr key={patient.name}>
                {/* Patient name */}
                <td className="d-flex align-items-center">
                  {/* Circular initials avatar */}
                  <span
                    className="rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center me-2"
                    style={{ width: 32, height: 32 }}
                  >
                    {getInitials(patient.name)}
                  </span>
                  {/* Actual patient name */}
                  {patient.name}
                </td>

                {/* Organization name */}
                <td>{patient.organization}</td>

                {/* Engagement icon + label aligned horizontally */}
                <td className="fw-medium">
                  <span className="d-inline-flex align-items-center">
                    {getEngagementIcon(patient.engagementRate)}
                    {patient.engagementRate >= 80
                      ? "High"
                      : patient.engagementRate >= 50
                        ? "Medium"
                        : "Low"}
                  </span>
                </td>

                {/* Engagement percentage emphasized for readability */}
                <td className="fw-semibold">{patient.engagementRate}%</td>

                {/* Points formatted and emphasized */}
                <td style={{ fontFamily: "body" }}>
                  {patient.pointsRedeemed.toLocaleString()}
                </td>

                {/* Last activity timestamp */}
                <td>{patient.lastActivity}</td>

                {/* Status badge with pill styling for modern UI */}
                <td>{getStatusBadge(patient.engagementRate)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default PatientEngagementTable;
