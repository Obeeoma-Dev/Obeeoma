import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col } from "react-bootstrap";
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
import AIResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import TopTriggers from "../../../components/admincomponents/Aicomponents/topTrigger";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import { FileText, Video, Headphones, MousePointerClick } from "lucide-react";
/**
 * AIRecommendationsPage renders the AI management dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const AIRecommendationsPage = () => {
    // Placeholder metrics — replace with backend data later
    const metrics = {
        totalRecommendations: 1245,
        engagementRate: 72,
        averageTime: "5m 32s",
    };
    // AI resource effectiveness table
    const resources = [
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
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(TopMetrics, { ...metrics }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(EffectivenessChart, {}) }), _jsx(Col, { md: 6, children: _jsx(WeeklyRecommendationsChart, {}) })] }), _jsx(AIResourcesTable, { resources: resources }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(ModelPerformance, { performance: modelScores }) }), _jsx(Col, { md: 6, children: _jsx(TopTriggers, { triggers: triggers }) })] })] }) }) })] })] }));
};
export default AIRecommendationsPage;
