import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { TrendingUp, Award, Gift } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard"; // adjust path
import "./engagement.css";
const EngagementSummary = ({ engagementRate, activePrograms, totalPoints, }) => {
    const metrics = [
        {
            title: "Engagement Rate",
            value: `${engagementRate}%`,
            subtitle: "Client activity this week",
            trend: "+5% this week",
            icon: TrendingUp,
            color: "emerald",
        },
        {
            title: "Active Reward Programs",
            value: activePrograms,
            subtitle: "Programs currently running",
            trend: "+2 this month",
            icon: Award,
            color: "emerald",
        },
        {
            title: "Rewards Assisted",
            value: totalPoints.toLocaleString(),
            subtitle: "Total points distributed",
            trend: "+15% this month",
            icon: Gift,
            color: "emerald",
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-4", style: { fontFamily: "heading" }, children: [_jsx("h2", { children: "Client Engagement & Rewards" }), _jsx("p", { className: "text-muted", style: { fontFamily: "body" }, children: "Monitor client activity and reward program performance." })] }), _jsx(Row, { className: "mb-4", children: metrics.map((metric, index) => (_jsx(Col, { md: 4, children: _jsx(HoverStatCard, { title: metric.title, value: metric.value, subtitle: metric.subtitle, trend: metric.trend, icon: metric.icon, color: metric.color }) }, index))) })] }));
};
export default EngagementSummary;
