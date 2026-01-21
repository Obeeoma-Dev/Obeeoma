import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
const BAR_COLORS = [
    "rgba(13, 110, 253, 0.5)", // Blue
    "rgba(25, 135, 84, 0.5)", // Green
    "rgba(255, 193, 7, 0.5)", // Yellow
    "rgba(111, 66, 193, 0.5)", // Purple
    "rgba(220, 53, 69, 0.5)", // Red
];
const data = {
    labels: ["Videos", "Articles", "Audio", "Interactive", "Worksheets"],
    datasets: [
        {
            label: "Effectiveness (%)",
            data: [85, 70, 60, 50, 40], // Replace with your actual values
            backgroundColor: BAR_COLORS,
            borderRadius: 6,
            maxBarThickness: 30,
        },
    ],
};
const options = {
    indexAxis: "y", // Horizontal bars
    responsive: true,
    scales: {
        x: {
            beginAtZero: true,
            grid: { display: false },
        },
        y: {
            grid: { display: false },
        },
    },
};
const EffectivenessChart = () => {
    return (_jsx(Card, { className: "mb-4 shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "fw-semibold", style: { fontFamily: 'heading' }, children: "Effectiveness by Resource Type (%)" }), _jsx("p", { className: "text-muted small mb-4", style: { fontFamily: 'body' }, children: "Comparison of engagement across different media formats" }), _jsx(Bar, { data: data, options: options, style: { fontFamily: 'body' } })] }) }));
};
export default EffectivenessChart;
