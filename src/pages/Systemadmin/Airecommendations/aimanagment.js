import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/adminpages/AIRecommendationsPage.tsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
import ResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import TopTriggers from "../../../components/admincomponents/Aicomponents/topTrigger";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { FileText, Video, Headphones, MousePointerClick } from "lucide-react";
import { adminAPI } from "../../../api/apiConfig";
const typeToIcon = {
    article: FileText,
    video: Video,
    audio: Headphones,
    interactive: MousePointerClick,
};
function normalizeEffectiveness(s) {
    if (!s)
        return "Medium";
    const t = s.toLowerCase();
    if (t === "high")
        return "High";
    if (t === "low")
        return "Low";
    return "Medium";
}
const AIRecommendationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
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
        : [
            { name: "Activity Assignment Templates", score: 92 },
            { name: "Social Connection Prompts", score: 89 },
            { name: "Personalized Coping Strategies", score: 85 },
        ];
    const triggers = (data?.top_anxiety_triggers ?? [])
        .map((t) => ({
        name: t.trigger ?? "—",
        score: Number(t.percentage) || 0,
    }))
        .filter((t) => t.name !== "—");
    const defaultTriggers = [
        { name: "Social situations", score: 76 },
        { name: "Academic pressure", score: 68 },
        { name: "Peer pressure", score: 65 },
    ];
    const triggerList = triggers.length ? triggers : defaultTriggers;
    if (loading) {
        return (_jsx(SystemAdminLayout, { title: "AI Management", children: _jsx(Container, { fluid: true, className: "py-4 d-flex justify-content-center align-items-center min-vh-50", children: _jsx(Spinner, { animation: "border" }) }) }));
    }
    if (error) {
        return (_jsx(SystemAdminLayout, { title: "AI Management", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Alert, { variant: "danger", children: error }), _jsx(TopMetrics, { totalRecommendations: 0, engagementRate: 0, aiAccuracyScore: 0 }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(EffectivenessChart, {}) }), _jsx(Col, { md: 6, children: _jsx(WeeklyRecommendationsChart, {}) })] }), _jsx(ResourcesTable, { resources: [] }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(ModelPerformance, {}) }), _jsx(Col, { md: 6, children: _jsx(TopTriggers, { triggers: defaultTriggers }) })] })] }) }));
    }
    return (_jsxs(SystemAdminLayout, { title: "AI Management", children: [_jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(TopMetrics, { totalRecommendations: totalRecommendations, engagementRate: engagementRate, aiAccuracyScore: aiAccuracyScore }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(EffectivenessChart, { effectivenessByType: effectivenessByType.length ? effectivenessByType : undefined }) }), _jsx(Col, { md: 6, children: _jsx(WeeklyRecommendationsChart, { weeklyRecommendations: weeklyRecommendations }) })] }), _jsx(ResourcesTable, { resources: resources }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(ModelPerformance, {}) }), _jsx(Col, { md: 6, children: _jsx(TopTriggers, { triggers: triggerList }) })] })] }), _jsx(AIAssistant, {})] }));
};
export default AIRecommendationsPage;
