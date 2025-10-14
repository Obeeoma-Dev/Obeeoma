import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from 'react-bootstrap';
import TopMetrics from '../../../components/admincomponents/Aicomponents/topmetric';
import EffectivenessChart from '../../../components/admincomponents/Aicomponents/effectivenessChart';
import WeeklyRecommendationsChart from '../../../components/admincomponents/Aicomponents/weeklyRecomendationChart';
import AIResourcesTable from '../../../components/admincomponents/Aicomponents/airesourceTable';
import ModelPerformance from '../../../components/admincomponents/Aicomponents/modelPerformance';
import TopTriggers from '../../../components/admincomponents/Aicomponents/topTrigger';
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import AdminHeader from '../../../components/admincomponents/adminheader';
import './airecommendation.css';
const AIRecommendationsPage = () => {
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
    const resources = [
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
    return (_jsxs("div", { className: "dashboard-layout", children: [_jsx(AdminSidebar, {}), _jsxs("div", { className: "dashboard-content", children: [_jsx(AdminHeader, {}), _jsx("div", { className: "dashboard-scrollable", children: _jsxs(Container, { fluid: true, className: "p-4", children: [_jsx(TopMetrics, { ...metrics }), _jsx(EffectivenessChart, { data: effectivenessData }), _jsx(WeeklyRecommendationsChart, {}), _jsx(AIResourcesTable, { resources: resources }), _jsx(ModelPerformance, { performance: modelScores }), _jsx(TopTriggers, { triggers: triggers })] }) })] })] }));
};
export default AIRecommendationsPage;
