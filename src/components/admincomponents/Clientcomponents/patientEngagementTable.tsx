// PatientEngagementTable.tsx
// Displays a table of patient engagement data

import React from 'react';
import { Table } from 'react-bootstrap';

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
    name: 'Madison Carano',
    organization: 'HealthOne',
    engagementRate: 92,
    pointsRedeemed: 1200,
    lastActivity: '2h ago',
  },
  {
    name: 'William Johnson',
    organization: 'MediCare',
    engagementRate: 88,
    pointsRedeemed: 980,
    lastActivity: '3h ago',
  },
  {
    name: 'Vanessa Jefferson',
    organization: 'HealthOne',
    engagementRate: 85,
    pointsRedeemed: 1100,
    lastActivity: '1h ago',
  },
];

// Define the component
const PatientEngagementTable: React.FC = () => {
  return (
    <Table striped bordered hover responsive>
      {/* Table header */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Organization</th>
          <th>Engagement Rate (%)</th>
          <th>Points Redeemed</th>
          <th>Last Activity</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.name}>
            <td>{patient.name}</td>
            <td>{patient.organization}</td>
            <td>{patient.engagementRate}</td>
            <td>{patient.pointsRedeemed}</td>
            <td>{patient.lastActivity}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientEngagementTable;