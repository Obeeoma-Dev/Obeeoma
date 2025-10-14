// Main dashboard page that assembles all components with fixed sidebar and scrollable content

import React from 'react';
import { Container } from 'react-bootstrap';
import TopMetrics from '../../../components/admincomponents/Aicomponents/topmetric';
import EffectivenessChart from '../../../components/admincomponents/Aicomponents/effectivenessChart';
import WeeklyRecommendationsChart from '../../../components/admincomponents/Aicomponents/weeklyRecomendationChart';
import AIResourcesTable from '../../../components/admincomponents/Aicomponents/airesourceTable';
import ModelPerformance from '../../../components/admincomponents/Aicomponents/modelPerformance';
import TopTriggers from '../../../components/admincomponents/Aicomponents/topTrigger';
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import AdminHeader from '../../../components/admincomponents/adminheader';
import type { ResourceRow } from '../../../components/admincomponents/Aicomponents/airesourceTable';
import './airecommendation.css'; 

const AIRecommendationsPage: React.FC = () => {
  // Dummy data for development
  const metrics = {
    totalRecommendations: 1245,
    engagementRate: 72,
    averageTime: '5m 32s',
  };

  const effectivenessData = [
    { label: 'Activity Assignment Templates', percentage: 80 },
    { label: 'Social Connection Prompts', percentage: 75 },
    { label: 'Personalized Coping Strategies', percentage: 70 },
    { label: 'Family Involvement', percentage: 65 },
    { label: 'Peer Support', percentage: 60 },
  ];

  const resources: ResourceRow[] = [
    { name: 'Activity Assignment Templates', status: 'High Effectiveness' },
    { name: 'Social Connection Prompts', status: 'High Effectiveness' },
    { name: 'Personalized Coping Strategies', status: 'High Effectiveness' },
    { name: 'Peer Support', status: 'Needs Improvement' },
    { name: 'Family Involvement', status: 'Needs Improvement' },
  ];

  const modelScores = [
    { name: 'Activity Assignment Templates', score: 92 },
    { name: 'Social Connection Prompts', score: 89 },
    { name: 'Personalized Coping Strategies', score: 85 },
    { name: 'Peer Support', score: 68 },
    { name: 'Family Involvement', score: 64 },
  ];

  const triggers = [
    'Social situations',
    'Academic pressure',
    'Peer pressure',
    'Family relationships',
  ];

  return (
    <div className="dashboard-layout">
      {/* Fixed sidebar on the left */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="dashboard-content">
        {/* Fixed header at the top */}
        <AdminHeader />

        {/* Scrollable content container */}
        <div className="dashboard-scrollable">
          <Container fluid className="p-4">
            {/* Top summary metrics */}
            <TopMetrics {...metrics} />

            {/* Effectiveness chart */}
            <EffectivenessChart data={effectivenessData} />

            {/* Weekly recommendations chart placeholder */}
            <WeeklyRecommendationsChart />

            {/* Table of AI resources */}
            <AIResourcesTable resources={resources} />

            {/* Model performance list */}
            <ModelPerformance performance={modelScores} />

            {/* Top anxiety triggers */}
            <TopTriggers triggers={triggers} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsPage;