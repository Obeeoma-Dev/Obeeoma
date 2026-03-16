// clientEngagement.tsx
// Main page for displaying client engagement dashboard with sidebar layout
// Data loaded from backend API (admin/client-engagement/)

import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";

import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import EngagementSummary from "../../../components/admincomponents/Clientcomponents/engagementsummary";
import EngagementCharts from "../../../components/admincomponents/Clientcomponents/engagementCharts";
import PatientSearchFilter from "../../../components/admincomponents/Clientcomponents/patientsearchfilter";
// import PatientEngagementTable from "../../../components/admincomponents/Clientcomponents/patientEngagementTable";
import EngagementStatsPanel from "../../../components/admincomponents/Clientcomponents/engagemntStartsPanel";
import { adminAPI } from "../../../api/apiConfig";

// API response shape (from backend ClientEngagementView)
interface ClientEngagementApiResponse {
  average_daily_engagement: number;
  active_reward_programs: number;
  total_points_awarded: number;
  weekly_engagement: number[];
  reward_redemptions: number[];
  clients: Array<{
    id: number;
    client_name: string;
    organization_name: string;
    sessions_completed: number;
    current_streak: number;
    total_points: number;
    engagement_level: string;
    engagement_display: string;
    last_active: string;
    avatar_icon?: string;
  }>;
  engagement_trends: Array<{ trend: string; percentage: number }>;
  streak_statistics: Array<{ streak: string; active_users: number }>;
}

const engagementLevelToRate: Record<string, number> = {
  high: 85,
  medium: 60,
  low: 35,
};

function formatLastActive(isoDate: string): string {
  if (!isoDate) return "—";
  const d = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

const ClientEngagement: React.FC = () => {
  const [data, setData] = useState<ClientEngagementApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getClientEngagement();
        setData(response.data);
      } catch (err) {
        setError((err as Error).message ?? "Failed to load engagement data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <SystemAdminLayout title="Client Engagement">
        <Container className="mt-5">
          <Alert variant="danger">Error: {error}</Alert>
        </Container>
      </SystemAdminLayout>
    );
  }

  if (loading) {
    return (
      <SystemAdminLayout title="Client Engagement">
        <Container className="py-5 text-center">
          <Spinner animation="border" />
          <p className="mt-2">Loading engagement data...</p>
        </Container>
      </SystemAdminLayout>
    );
  }

  const engagementRate = data ? Number(data.average_daily_engagement) : 0;

  const trends = (data?.engagement_trends ?? []).reduce(
    (acc, t) => {
      if (t.trend.toLowerCase().includes("morning"))
        acc.courseCompletion = t.percentage;
      else if (t.trend.toLowerCase().includes("weekend"))
        acc.memberActivity = t.percentage;
      return acc;
    },
    { courseCompletion: 0, memberActivity: 0 },
  );

  const streakList = data?.streak_statistics ?? [];
  const sevenDay =
    streakList.find((s) => s.streak.includes("7"))?.active_users ?? 0;
  const thirtyDay =
    streakList.find((s) => s.streak.includes("14"))?.active_users ?? 0;
  const sixtyDay =
    streakList.find((s) => s.streak.includes("30"))?.active_users ?? 0;
  const streaks = { sevenDay, thirtyDay, sixtyDay };

  const tablePatients = (data?.clients ?? []).map((c) => ({
    name: c.client_name,
    organization: c.organization_name,
    engagementRate: engagementLevelToRate[c.engagement_level] ?? 50,
    lastActivity: formatLastActive(c.last_active),
  }));

  return (
    <SystemAdminLayout title="Client Engagement">
      <div className="flex-grow-1 overflow-auto">
        <Container className="py-4">
          <EngagementSummary engagementRate={engagementRate} />

          <EngagementCharts weeklyEngagement={data?.weekly_engagement ?? []} />

          <PatientSearchFilter />

          {/* <PatientEngagementTable patients={tablePatients} /> */}

          <EngagementStatsPanel trends={trends} streaks={streaks} />
        </Container>
      </div>
    </SystemAdminLayout>
  );
};

export default ClientEngagement;
