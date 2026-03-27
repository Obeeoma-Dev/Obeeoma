import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/adminpages/AIRecommendationsPage.tsx
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GlobeIcon, LayoutDashboardIcon } from "lucide-react";
import "./aiControls.css";
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
import AIResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import TopTriggers from "../../../components/admincomponents/Aicomponents/topTrigger";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { AIStatusToggle } from "../../../components/admincomponents/Aicomponents/Aitoggle";
import { FileText, Video, Headphones, MousePointerClick } from "lucide-react";
import { adminAPI } from "../../../api/apiConfig";
import { useAIStatus } from "../../../hooks/useAIStatus";
// Helper functions
const typeToIcon = {
    video: Video,
    audio: Headphones,
    article: FileText,
    interactive: MousePointerClick,
};
const normalizeEffectiveness = (value) => {
    if (typeof value === 'string') {
        const normalized = value.toLowerCase();
        if (normalized.includes('high') || normalized.includes('h'))
            return "High";
        if (normalized.includes('medium') || normalized.includes('m'))
            return "Medium";
        if (normalized.includes('low') || normalized.includes('l'))
            return "Low";
    }
    if (typeof value === 'number') {
        if (value >= 70)
            return "High";
        if (value >= 40)
            return "Medium";
        return "Low";
    }
    return "Medium";
};
const AIRecommendationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { aiStatus, updateAIStatus } = useAIStatus();
    const handleLandingAIToggle = () => {
        updateAIStatus({ landing_ai: !aiStatus?.landing_ai });
    };
    const handleAdminAIToggle = () => {
        updateAIStatus({ admin_ai: !aiStatus?.admin_ai });
    };
    const handleMobileAIToggle = () => {
        updateAIStatus({ mobile_ai: !aiStatus?.mobile_ai });
    };
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await adminAPI.getAIManagement();
                if (!cancelled)
                    setData(res?.data ?? res ?? null);
            }
            catch (e) {
                if (!cancelled)
                    setError(e instanceof Error
                        ? e.message
                        : "Failed to load AI management data");
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    const totalRecommendations = data?.total_recommendations ?? 0;
    // eslint-disable-next-line no-constant-binary-expression
    const engagementRate = Number(data?.average_engagement_rate) ?? 0;
    const aiAccuracyScore = data?.ai_accuracy_score != null
        ? Number(data.ai_accuracy_score)
        : undefined;
    const resources = (data?.resources ?? []).map((r, i) => {
        const typeStr = (r.resource_type ?? "article").toLowerCase();
        const typeLabel = typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
        const id = typeof r.id === "number" ? r.id : Number(r.id ?? i + 1);
        return {
            id: Number.isFinite(id) ? id : i + 1,
            name: r.title ?? "Untitled",
            type: typeLabel,
            icon: typeToIcon[typeStr] ?? FileText,
            recommended: `${r.recommended_count ?? 0} times`,
            engagement: Number(r.engagement_rate ?? 0),
            effectiveness: normalizeEffectiveness(r.effectiveness_display ?? "Medium"),
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
    return (_jsxs(SystemAdminLayout, { title: "AI Management", children: [_jsxs(Container, { fluid: true, className: "py-4", children: [_jsxs("div", { className: "ai-controls-section", children: [_jsxs("div", { className: "ai-controls-header", children: [_jsxs("div", { children: [_jsx("h2", { className: "ai-controls-title", children: "AI Controls" }), _jsx("p", { className: "ai-controls-subtitle", children: "Independently manage AI across each part of the platform" })] }), _jsxs("div", { className: "ai-controls-status", children: [_jsx("span", { className: "ai-controls-indicator" }), [
                                                aiStatus?.landing_ai,
                                                aiStatus?.admin_ai,
                                                aiStatus?.mobile_ai,
                                            ].filter(Boolean).length, " ", "of 3 active"] })] }), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { xs: 12, md: 4, children: _jsx(AIStatusToggle, { isActive: aiStatus?.landing_ai || false, onToggle: handleLandingAIToggle, label: "Landing Page AI", description: "Reception chatbot that talks about the app and directs visitors. Does not save conversations.", icon: _jsx(GlobeIcon, { size: 20 }), lastActive: "Today at 1:12 PM" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(AIStatusToggle, { isActive: aiStatus?.admin_ai || false, onToggle: handleAdminAIToggle, label: "Admin Dashboard AI", description: "Provides insights, growth recommendations, and analytics summaries to the system admin.", icon: _jsx(LayoutDashboardIcon, { size: 20 }), lastActive: "Today at 2:34 PM" }) })] }), _jsx(AIResourcesTable, { resources: [] }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(ModelPerformance, {}) }), _jsx(Col, { md: 6, children: _jsx(TopTriggers, { triggers: triggers }) })] })] }), _jsx(TopMetrics, { totalRecommendations: totalRecommendations, engagementRate: engagementRate, averageTime: "2:30" }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(EffectivenessChart, {}) }), _jsx(Col, { md: 6, children: _jsx(WeeklyRecommendationsChart, {}) })] }), _jsx(AIResourcesTable, { resources: resources }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(ModelPerformance, {}) }), _jsx(Col, { md: 6, children: _jsx(TopTriggers, { triggers: triggers }) })] })] }), _jsx(AIAssistant, { isEnabled: aiStatus?.admin_ai || false })] }));
};
export default AIRecommendationsPage;
