import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React-Bootstrap Card for layout consistency across the app
import { Card } from 'react-bootstrap';
// Line chart component from react-chartjs-2
import { Line } from 'react-chartjs-2';
// Core Chart.js modules that must be registered manually
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, } from 'chart.js';
// Import component-specific CSS (no Tailwind)
import './aicomponent.css';
// Register Chart.js components once
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
// Chart data (visuals only — backend can replace this later)
const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
        {
            label: 'Recommendations Sent',
            data: [245, 312, 289, 340, 298, 360],
            borderColor: '#3CB371', // refined green (matches previous chart)
            backgroundColor: 'rgba(13,148,136,0.15)',
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#3CB371',
            pointBorderWidth: 2,
        },
    ],
};
// Chart display options (no functional changes)
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: '#ffffff',
            titleColor: '#111827',
            bodyColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 10,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: '#6b7280',
                font: {
                    size: 12,
                },
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                color: '#f3f4f6',
            },
            ticks: {
                stepSize: 50,
                color: '#6b7280',
                font: {
                    size: 12,
                },
            },
        },
    },
};
// Functional component definition
const WeeklyRecommendationsChart = () => {
    return (_jsx(Card, { className: "weekly-recommendations-card", children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "weekly-recommendations-header", children: [_jsx("h3", { className: "weekly-recommendations-title", children: "Weekly Recommendations" }), _jsx("p", { className: "weekly-recommendations-subtitle", children: "Volume of AI suggestions over the last 6 weeks" })] }), _jsx("div", { className: "weekly-recommendations-chart", children: _jsx(Line, { data: chartData, options: chartOptions }) })] }) }));
};
export default WeeklyRecommendationsChart;
