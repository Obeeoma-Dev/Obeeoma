// src/pages/adminpages/AIRecommendationsPage.tsx

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GlobeIcon, LayoutDashboardIcon, SmartphoneIcon } from "lucide-react";
import "./aiControls.css";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AIManagementResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await adminAPI.getAIManagement();
        if (!cancelled) setData(res?.data ?? res ?? null);
      } catch (e: unknown) {
        if (!cancelled)
          setError(
            e instanceof Error
              ? e.message
              : "Failed to load AI management data",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalRecommendations = data?.total_recommendations ?? 0;
  // eslint-disable-next-line no-constant-binary-expression
  const engagementRate = Number(data?.average_engagement_rate) ?? 0;

  const aiAccuracyScore =
    data?.ai_accuracy_score != null
      ? Number(data.ai_accuracy_score)
      : undefined;

  const resources: ResourceRow[] = (data?.resources ?? []).map((r, i) => {
    const typeStr = (r.resource_type ?? "article").toLowerCase();
    const typeLabel = typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
    return {
      id: r.id ?? i + 1,
      name: r.title ?? "Untitled",
      type: typeLabel,

      icon: typeToIcon[typeStr] ?? FileText,

      recommended: `${r.recommended_count ?? 0} times`,
      // eslint-disable-next-line no-constant-binary-expression
      engagement: Number(r.engagement_rate) ?? 0,
      effectiveness: normalizeEffectiveness(r.effectiveness_display),

      lastUpdated: r.last_updated ?? "—",
      status: r.is_active ? "Active" : "Inactive",
    };
  });

  const effectivenessByType = data?.effectiveness_by_type ?? [];
  const weeklyRecommendations = data?.weekly_recommendations;
  const modelScores = effectivenessByType.length
    ? effectivenessByType.map((t) => ({
        name: (t.resource_type ?? "")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        score: Number(t.avg_effectiveness) || 0,
      }))
    : [];
  const triggers = (data?.top_anxiety_triggers ?? [])
    .map((t) => ({
      name: t.trigger ?? "",
      score: Number(t.percentage) || 0,
    }))
    .filter((t) => t.name !== "");

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
              {
                [
                  aiStatus.landing_ai,
                  aiStatus.admin_ai,
                  aiStatus.mobile_ai,
                ].filter(Boolean).length
              }{" "}
              of 3 active
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
          </Row>
          <AIResourcesTable resources={[]} />
          <Row className="mb-4">
            <Col md={6}>
              <ModelPerformance performance={modelScores} />
            </Col>
            <Col md={6}>
              <TopTriggers triggers={triggers} />
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

      {/* AI Assistant Floating Chat */}
      <AIAssistant isEnabled={aiStatus.admin_ai} />
    </SystemAdminLayout>
  );
};

export default AIRecommendationsPage;
