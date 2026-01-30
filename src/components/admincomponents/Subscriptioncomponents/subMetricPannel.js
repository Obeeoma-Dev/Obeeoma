import { jsx as _jsx } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { Calendar, Users, TrendingUp, } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";
const MetricsPanel = ({ totalSubscriptions, coveredEmployees, utilizationRate, }) => {
    const metrics = [
        {
            title: "Total Subscriptions",
            value: totalSubscriptions,
            subtitle: "Active subscription plans",
            trend: "+8% from last month",
            icon: Calendar,
            color: "emerald",
        },
        {
            title: "Covered Employees",
            value: coveredEmployees,
            subtitle: "Employees covered",
            trend: "+5% from last month",
            icon: Users,
            color: "emerald",
        },
        {
            title: "Utilization Rate",
            value: `${utilizationRate}%`,
            subtitle: "Platform usage",
            trend: "+3% from last month",
            icon: TrendingUp,
            color: "emerald",
        },
    ];
    return (_jsx(Row, { className: "mb-4 g-3", children: metrics.map((metric, index) => (_jsx(Col, { md: 4, className: "d-flex", children: _jsx(HoverStatCard, { title: metric.title, value: metric.value, subtitle: metric.subtitle, trend: metric.trend, icon: metric.icon, color: metric.color }) }, index))) }));
};
export default MetricsPanel;
