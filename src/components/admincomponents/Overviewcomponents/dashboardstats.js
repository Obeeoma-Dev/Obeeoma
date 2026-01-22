import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Col } from "react-bootstrap";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard"; // adjust path if needed
const DashboardStats = ({ stats }) => {
    return (_jsx(_Fragment, { children: stats.map((stat) => (_jsx(Col, { md: 3, children: _jsx(HoverStatCard, { title: stat.title, value: stat.value, subtitle: stat.subtitle ?? "", trend: stat.trend, icon: stat.icon, color: stat.color }) }, stat.id))) }));
};
export default DashboardStats;
