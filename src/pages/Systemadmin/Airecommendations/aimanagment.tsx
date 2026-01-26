// src/pages/adminpages/AIRecommendationsPage.tsx

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
import AIResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import TopTriggers from "../../../components/admincomponents/Aicomponents/topTrigger";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import type { ResourceRow } from "../../../components/admincomponents/Aicomponents/airesourceTable";
import {
  FileText,
  Video,
  Headphones,
  MousePointerClick,
} from 'lucide-react'


/**
 * AIRecommendationsPage renders the AI management dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const AIRecommendationsPage: React.FC = () => {
  // Placeholder metrics — replace with backend data later
  const metrics = {
    totalRecommendations: 1245,
    engagementRate: 72,
    averageTime: "5m 32s",
  };

  // AI resource effectiveness table
  const resources: ResourceRow[] = [
    {
      id: 1,
      name: 'Anxiety Management Techniques',
      type: 'Article',
      icon: FileText,
      recommended: '156 times',
      engagement: 78,
      effectiveness: 'High',
      lastUpdated: '2023-09-12',
      status: 'High Effectiveness',
    },
    {
      id: 2,
      name: 'Breathing Exercises for Anxiety',
      type: 'Video',
      icon: Video,
      recommended: '243 times',
      engagement: 82,
      effectiveness: 'High',
      lastUpdated: '2023-08-10',
      status: 'High Effectiveness',
    },
    {
      id: 3,
      name: 'Understanding Panic Attacks',
      type: 'Article',
      icon: FileText,
      recommended: '124 times',
      engagement: 65,
      effectiveness: 'Medium',
      lastUpdated: '2023-09-05',
      status: 'High Effectiveness',
    },
    {
      id: 4,
      name: 'Guided Meditation for Relief',
      type: 'Audio',
      icon: Headphones,
      recommended: '198 times',
      engagement: 72,
      effectiveness: 'Medium',
      lastUpdated: '2023-09-08',
      status: 'High Effectiveness',
    },
    {
      id: 5,
      name: 'Social Anxiety Coping Strategies',
      type: 'Interactive',
      icon: MousePointerClick,
      recommended: '87 times',
      engagement: 58,
      effectiveness: 'Low',
      lastUpdated: '2023-08-28',
      status: 'High Effectiveness',
    },
  ]

  // Model performance scores
  const modelScores = [
    { name: "Activity Assignment Templates", score: 92 },
    { name: "Social Connection Prompts", score: 89 },
    { name: "Personalized Coping Strategies", score: 85 },
    { name: "Peer Support", score: 68 },
    { name: "Family Involvement", score: 64 },
  ];

  // Top anxiety triggers
  const triggers = [
    { name: "Social situations", score: 76 },
    { name: "Academic pressure", score: 68 },
    { name: "Peer pressure", score: 65 },
    { name: "Family relationships", score: 61 },
  ]

  return (
    <SystemAdminLayout title="AI Management">
      {/* Container ensures Bootstrap spacing and responsiveness */}
      <Container fluid className="py-4">
        {/* Top summary metrics */}
        <TopMetrics {...metrics} />

        {/* Charts side by side */}
        <Row className="mb-4">
          <Col md={6}>
            <EffectivenessChart />
          </Col>
          <Col md={6}>
            <WeeklyRecommendationsChart />
          </Col>
        </Row>

        {/* Table of AI resources */}
        <AIResourcesTable resources={resources} />

        <Row className="mb-4">
          <Col md={6}>
            <ModelPerformance performance={modelScores} />
          </Col>
          <Col md={6}>
            <TopTriggers triggers={triggers} />
          </Col>
        </Row>
      </Container>
    </SystemAdminLayout>
  );
};

export default AIRecommendationsPage;
