// src/pages/adminpages/AIRecommendationsPage.tsx

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GlobeIcon, LayoutDashboardIcon, SmartphoneIcon } from "lucide-react";
import './aiControls.css';
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
// import AIResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import TopTriggers from "../../../components/admincomponents/Aicomponents/topTrigger";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import type { ResourceRow } from "../../../components/admincomponents/Aicomponents/airesourceTable";
import { AIStatusToggle } from "../../../components/admincomponents/Aicomponents/Aitoggle";
import { FileText, Video, Headphones, MousePointerClick } from "lucide-react";
import { adminAPI } from "../../../api/apiConfig";
import { useAIStatus } from "../../../hooks/useAIStatus";

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

  // Use enhanced AI status hook with caching
  const { aiStatus, updateAIStatus } = useAIStatus();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminAIToggle = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      await adminAPI.toggleAdminAI({ enabled });
      updateAIStatus({ admin_ai: enabled });
    } catch (error) {
      console.error('Failed to toggle Admin AI:', error);
      // Revert the state on error
      updateAIStatus({ admin_ai: !enabled });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLandingAIToggle = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      await adminAPI.toggleLandingAI({ enabled });
      updateAIStatus({ landing_ai: enabled });
    } catch (error) {
      console.error('Failed to toggle Landing AI:', error);
      // Revert the state on error
      updateAIStatus({ landing_ai: !enabled });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileAIToggle = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      await adminAPI.toggleMobileAI({ enabled });
      updateAIStatus({ mobile_ai: enabled });
    } catch (error) {
      console.error('Failed to toggle Mobile AI:', error);
      // Revert the state on error
      updateAIStatus({ mobile_ai: !enabled });
    } finally {
      setIsLoading(false);
    }
  };

  // AI resource effectiveness table
  const resources: ResourceRow[] = [
    {
      id: 1,
      name: "Anxiety Management Techniques",
      type: "Article",
      icon: FileText,
      recommended: "156 times",
      engagement: 78,
      effectiveness: "High",
      lastUpdated: "2023-09-12",
      status: "High Effectiveness",
    },
    {
      id: 2,
      name: "Breathing Exercises for Anxiety",
      type: "Video",
      icon: Video,
      recommended: "243 times",
      engagement: 82,
      effectiveness: "High",
      lastUpdated: "2023-08-10",
      status: "High Effectiveness",
    },
    {
      id: 3,
      name: "Understanding Panic Attacks",
      type: "Article",
      icon: FileText,
      recommended: "124 times",
      engagement: 65,
      effectiveness: "Medium",
      lastUpdated: "2023-09-05",
      status: "High Effectiveness",
    },
    {
      id: 4,
      name: "Guided Meditation for Relief",
      type: "Audio",
      icon: Headphones,
      recommended: "198 times",
      engagement: 72,
      effectiveness: "Medium",
      lastUpdated: "2023-09-08",
      status: "High Effectiveness",
    },
    {
      id: 5,
      name: "Social Anxiety Coping Strategies",
      type: "Interactive",
      icon: MousePointerClick,
      recommended: "87 times",
      engagement: 58,
      effectiveness: "Low",
      lastUpdated: "2023-08-28",
      status: "High Effectiveness",
    },
  ];

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
  ];

  return (
    <SystemAdminLayout title="AI Management">
      {/* Container ensures Bootstrap spacing and responsiveness */}
      <Container fluid className="py-4">

        {/* AI Controls Section */}
        <div className="ai-controls-section">
          <div className="ai-controls-header">
            <div>
              <h2 className="ai-controls-title">AI Controls</h2>
              <p className="ai-controls-subtitle">
                Independently manage AI across each part of the platform
              </p>
            </div>
            <div className="ai-controls-status">
              <span className="ai-controls-indicator" />
              {[aiStatus.landing_ai, aiStatus.admin_ai, aiStatus.mobile_ai].filter(Boolean).length} of 3
              active
            </div>
          </div>

          <Row className="g-4">
            <Col xs={12} md={4}>
              <AIStatusToggle
                isActive={aiStatus.landing_ai}
                onToggle={handleLandingAIToggle}
                label="Landing Page AI"
                description="Reception chatbot that talks about the app and directs visitors. Does not save conversations."
                icon={<GlobeIcon size={20} />}
                lastActive="Today at 1:12 PM"
              />
            </Col>
            <Col xs={12} md={4}>
              <AIStatusToggle
                isActive={aiStatus.admin_ai}
                onToggle={handleAdminAIToggle}
                label="Admin Dashboard AI"
                description="Provides insights, growth recommendations, and analytics summaries to the system admin."
                icon={<LayoutDashboardIcon size={20} />}
                lastActive="Today at 2:34 PM"
              />
            </Col>
            <Col xs={12} md={4}>
              <AIStatusToggle
                isActive={aiStatus.mobile_ai}
                onToggle={handleMobileAIToggle}
                label="Mobile App AI"
                description="Recommends hotline numbers and uploaded resources to users inside the mobile app."
                icon={<SmartphoneIcon size={20} />}
                lastActive="Today at 3:05 PM"
              />
            </Col>
          </Row>
        </div>

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

        <Row>
          {/* <Col md={6}> */}
          <ModelPerformance />
          {/* </Col> */}
          {/* <Col md={6}>
            <TopTriggers triggers={triggers} />
          </Col> */}
        </Row>
      </Container>

      {/* AI Assistant Floating Chat */}
      <AIAssistant isEnabled={aiStatus.admin_ai} />
    </SystemAdminLayout>
  );
};

export default AIRecommendationsPage;
