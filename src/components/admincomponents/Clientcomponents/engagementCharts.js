import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line } from "react-chartjs-2";
import { Row, Col, Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const EngagementCharts = ({ weeklyEngagement = [], }) => {
    const weeklyData = weeklyEngagement.length === 7 ? weeklyEngagement : [0, 0, 0, 0, 0, 0, 0];
    const weeklyEngagementChart = {
        labels: DAY_LABELS,
        datasets: [
            {
                label: "Engagement Rate (%)",
                data: weeklyData,
                borderColor: "#3CB371",
                backgroundColor: "rgba(11, 110, 69, 0.2)",
                fill: true,
            },
        ],
    };
    return (_jsx("div", { className: "mb-4", children: _jsx(Row, { className: "g-4", children: _jsx(Col, { xs: 12, children: _jsx(Card, { className: "shadow-sm border-0 h-100", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "mb-3", style: { color: "#00A859", fontFamily: "body" }, children: "Weekly Engagement Rate (%)" }), _jsx(Line, { data: weeklyEngagementChart })] }) }) }) }) }));
};
export default EngagementCharts;
