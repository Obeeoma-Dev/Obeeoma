import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line, Bar } from "react-chartjs-2";
import { Row, Col, Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, } from "chart.js";
// ✅ Register chart.js components for both line and bar charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
// ✅ Line chart data for weekly engagement
const weeklyEngagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Engagement Rate (%)",
            data: [75, 78, 80, 77, 79, 81, 78],
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            fill: true,
        },
    ],
};
// ✅ Bar chart data for reward redemptions
const rewardRedemptionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
        {
            label: "Points Redeemed",
            data: [42000, 38000, 45000, 47000, 43000, 50000],
            backgroundColor: "#28a745",
        },
    ],
};
// ✅ Main component rendering both charts
const EngagementCharts = () => {
    return (_jsx("div", { className: "mb-4", children: _jsxs(Row, { className: "g-4", children: [_jsx(Col, { md: 6, children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "mb-3 text-primary", children: "Weekly Engagement Rate (%)" }), _jsx(Line, { data: weeklyEngagementData })] }) }) }), _jsx(Col, { md: 6, children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "mb-3 text-success", children: "Reward Redemptions (Last 6 Weeks)" }), _jsx(Bar, { data: rewardRedemptionData })] }) }) })] }) }));
};
export default EngagementCharts;
