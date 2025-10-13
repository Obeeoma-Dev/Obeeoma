// clientEngagement.tsx
// Main page for displaying client engagement dashboard with sidebar layout

import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

// Import sidebar and dashboard components
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import EngagementSummary from '../../../components/admincomponents/Clientcomponents/engagementsummary';
import EngagementCharts from '../../../components/admincomponents/Clientcomponents/engagementCharts';
import PatientSearchFilter from '../../../components/admincomponents/Clientcomponents/patientsearchfilter';
import PatientEngagementTable from '../../../components/admincomponents/Clientcomponents/patientEngagementTable';
import EngagementStatsPanel from '../../../components/admincomponents/Clientcomponents/engagemntStartsPanel';

// Define TypeScript interface for expected backend structure
interface EngagementData {
  engagementRate: number;
  activePrograms: number;
  totalPoints: number;
  patients: Array<{
    name: string;
    organization: string;
    engagementRate: number;
    pointsRedeemed: number;
    lastActivity: string;
  }>;
  trends: {
    weekly: number;
    monthly: number;
    rewardActivity: number;
  };
  streaks: {
    sevenDay: number;
    thirtyDay: number;
    sixtyDay: number;
  };
}

// Placeholder data to simulate backend response
const placeholderData: EngagementData = {
  engagementRate: 78,
  activePrograms: 12,
  totalPoints: 285432,
  patients: [
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
  ],
  trends: {
    weekly: 5,
    monthly: 12,
    rewardActivity: 8,
  },
  streaks: {
    sevenDay: 65,
    thirtyDay: 45,
    sixtyDay: 30,
  },
};

// Main component
const ClientEngagement: React.FC = () => {
  // State to hold engagement data
  const [data, setData] = useState<EngagementData | null>(null);

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);

  // State to track any errors
  const [error, setError] = useState<string | null>(null);

  // Simulate backend fetch using placeholder data
  useEffect(() => {
    const simulateFetch = async (): Promise<void> => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set placeholder data as if it came from backend
        setData(placeholderData);
      } catch (err) {
        // Catch any unexpected errors
        setError((err as Error).message);
      } finally {
        // Stop loading spinner
        setLoading(false);
      }
    };

    simulateFetch();
  }, []);

  // Show spinner while loading
  // if (loading) {
  //   return (
  //     <div style={{ display: 'flex' }}>
  //       {/* Sidebar stays visible during loading */}
  //       <AdminSidebar />
  //       <Container className="mt-5 text-center">
  //         <Spinner animation="border" role="status" />
  //         <p>Loading client engagement data...</p>
  //       </Container>
  //     </div>
  //   );
  // }

  // Show error message if something goes wrong
  if (error) {
    return (
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <Container className="mt-5">
          <Alert variant="danger">Error: {error}</Alert>
        </Container>
      </div>
    );
  }

  // Render dashboard once data is available
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar on the left */}
      <AdminSidebar />

      {/* Main dashboard content on the right */}
      <Container className="mt-4">
        {/* Top summary metrics */}
        <EngagementSummary />

        {/* Charts for engagement and redemptions */}
        <EngagementCharts />

        {/* Search and filter controls */}
        <PatientSearchFilter />

        {/* Table of patient engagement */}
        <PatientEngagementTable />

        {/* Bottom panel with trends and streaks */}
        <EngagementStatsPanel />
      </Container>
    </div>
  );
};

export default ClientEngagement;