import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2'; // Chart.js integration
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
// Sample chart data (replace with backend data later)
const employeeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
        {
            label: 'Recommendations Sent',
            data: [245, 312, 289, 340, 298, 360],
            borderColor: '#198754',
            backgroundColor: 'rgba(25,135,84,0.2)',
            tension: 0.3,
            pointRadius: 4,
        },
    ],
};
// Chart options for styling
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 50,
            },
        },
    },
};
// Functional component with chart integration
const WeeklyRecommendationsChart = () => {
    return (_jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Weekly Recommendations (Last 6 Weeks)" }), _jsx(Card.Body, { children: _jsx(Line, { data: employeeData, options: chartOptions }) })] }));
};
export default WeeklyRecommendationsChart;
