import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from "react-chartjs-2";
import { Row, Col, Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, } from "chart.js";
// Register chart.js components for both line and bar charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
// Line chart data for weekly engagement
const weeklyEngagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Engagement Rate (%)",
            data: [75, 78, 80, 77, 79, 81, 78],
            borderColor: "#3CB371",
            backgroundColor: "rgba(11, 110, 69, 0.2)",
            fill: true,
        },
    ],
};
// Chart options to control sizing and appearance
const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: "top",
        },
    },
};
// Bar chart data for reward redemptions
const rewardRedemptionData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
        {
            label: "Points Redeemed",
            data: [42000, 38000, 45000, 47000, 43000, 50000],
            backgroundColor: "#3CB371",
        },
    ],
};
// Main component rendering both charts
const EngagementCharts = () => {
    return (_jsx("div", { className: "mb-4", children: _jsx(Row, { className: "g-4", children: _jsx(Col, { md: 12, children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "mb-3", style: { color: "#00A859", fontFamily: "body" }, children: "Weekly Engagement Rate (%)" }), _jsx("div", { style: { height: 320, minHeight: 240 }, children: _jsx(Line, { data: weeklyEngagementData, options: lineChartOptions }) })] }) }) }) }) }));
};
export default EngagementCharts;
