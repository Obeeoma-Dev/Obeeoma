import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from "react-bootstrap";
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
import AIResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import TopTriggers from "../../../components/admincomponents/Aicomponents/topTrigger";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
/**
 * AIRecommendationsPage renders the AI management dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const AIRecommendationsPage = () => {
    // 📊 Placeholder metrics — replace with backend data later
    const metrics = {
        totalRecommendations: 1245,
        engagementRate: 72,
        averageTime: "5m 32s",
    };
    // 📈 Effectiveness chart data
    const effectivenessData = [
        { label: "Activity Assignment Templates", percentage: 80 },
        { label: "Social Connection Prompts", percentage: 75 },
        { label: "Personalized Coping Strategies", percentage: 70 },
        { label: "Family Involvement", percentage: 65 },
        { label: "Peer Support", percentage: 60 },
    ];
    // 📋 AI resource effectiveness table
    const resources = [
        { name: "Activity Assignment Templates", status: "High Effectiveness" },
        { name: "Social Connection Prompts", status: "High Effectiveness" },
        { name: "Personalized Coping Strategies", status: "High Effectiveness" },
        { name: "Peer Support", status: "Needs Improvement" },
        { name: "Family Involvement", status: "Needs Improvement" },
    ];
    // 🧪 Model performance scores
    const modelScores = [
        { name: "Activity Assignment Templates", score: 92 },
        { name: "Social Connection Prompts", score: 89 },
        { name: "Personalized Coping Strategies", score: 85 },
        { name: "Peer Support", score: 68 },
        { name: "Family Involvement", score: 64 },
    ];
    // 🔥 Top anxiety triggers
    const triggers = [
        "Social situations",
        "Academic pressure",
        "Peer pressure",
        "Family relationships",
    ];
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            backgroundColor: '#f8f9fa',
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(TopMetrics, { ...metrics }), _jsx(EffectivenessChart, { data: effectivenessData }), _jsx(WeeklyRecommendationsChart, {}), _jsx(AIResourcesTable, { resources: resources }), _jsx(ModelPerformance, { performance: modelScores }), _jsx(TopTriggers, { triggers: triggers })] }) }) })] })] }));
};
export default AIRecommendationsPage;
