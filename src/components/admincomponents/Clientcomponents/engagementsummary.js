import { jsx as _jsx } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { TrendingUp } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";
import "./engagement.css";
const EngagementSummary = ({ engagementRate = 0, }) => {
    const metric = {
        title: "Engagement Rate",
        value: `${engagementRate != null ? Number(engagementRate) : 0}%`,
        subtitle: "Client activity this week",
        trend: "+5% this week",
        icon: TrendingUp,
        color: "emerald",
    };
    return (_jsx(Row, { className: "mb-4", children: _jsx(Col, { md: 12, lg: 4, children: _jsx(HoverStatCard, { title: metric.title, value: metric.value, subtitle: metric.subtitle, trend: metric.trend, icon: metric.icon, color: metric.color }) }) }));
};
export default EngagementSummary;
