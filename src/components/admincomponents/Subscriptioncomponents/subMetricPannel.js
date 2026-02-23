import { jsx as _jsx } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { Calendar, Users, TrendingUp, } from "lucide-react";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";
const MetricsPanel = ({ totalSubscriptions, coveredEmployees, utilizationRate, revenueGrowth = 0, organizationsGrowth = 0, }) => {
    const metrics = [
        {
            title: "Total Subscriptions",
            value: totalSubscriptions,
            subtitle: "Active subscription plans",
            trend: `${revenueGrowth >= 0 ? '+' : ''}${revenueGrowth.toFixed(1)}% from last month`,
            icon: Calendar,
            color: revenueGrowth >= 0 ? "emerald" : "rose",
        },
        {
            title: "Covered Employees",
            value: coveredEmployees,
            subtitle: "Employees covered",
            trend: `${organizationsGrowth >= 0 ? '+' : ''}${organizationsGrowth.toFixed(1)}% from last month`,
            icon: Users,
            color: organizationsGrowth >= 0 ? "emerald" : "rose",
        },
        {
            title: "Utilization Rate",
            value: `${utilizationRate}%`,
            subtitle: "Platform usage",
            trend: utilizationRate >= 70 ? "+3% from last month" : "-2% from last month",
            icon: TrendingUp,
            color: utilizationRate >= 70 ? "emerald" : "amber",
        },
    ];
    return (_jsx(Row, { className: "mb-4 g-3", children: metrics.map((metric, index) => (_jsx(Col, { md: 4, className: "d-flex", children: _jsx(HoverStatCard, { title: metric.title, value: metric.value, subtitle: metric.subtitle, trend: metric.trend, icon: metric.icon, color: metric.color }) }, index))) }));
};
export default MetricsPanel;
