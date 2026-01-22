import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col } from 'react-bootstrap';
import { BrainCircuit, Activity, ThumbsUp } from 'lucide-react';
import { HoverStatCard } from '../Hotlinecomponents/hoverCard';
// TopMetrics component
// Renders the top summary cards using the shared StatCard component
const TopMetrics = ({ totalRecommendations, engagementRate, averageTime, }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Row, { className: "mb-4", children: _jsxs(Col, { children: [_jsx("h1", { className: "fw-bold text-dark", style: { fontFamily: 'heading' }, children: "AI Management" }), _jsx("p", { className: "text-muted small", style: { fontFamily: 'body' }, children: "Monitor and optimize your AI recommendation engine." })] }) }), _jsxs(Row, { className: "g-4 mb-4", children: [_jsx(Col, { xs: 12, md: 4, children: _jsx(HoverStatCard, { title: "Total Recommendations", value: totalRecommendations.toLocaleString(), subtitle: "Generated this month", trend: "+16.5% this month", icon: BrainCircuit, color: "emerald" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(HoverStatCard, { title: "Avg. Engagement Rate", value: `${engagementRate}%`, subtitle: "User interaction with content", trend: "+5% this month", icon: Activity, color: "emerald" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(HoverStatCard, { title: "AI Accuracy Score", value: "89%", subtitle: "Based on user feedback", trend: "+2% this month", icon: ThumbsUp, color: "emerald" }) })] })] }));
};
// Export component
export default TopMetrics;
