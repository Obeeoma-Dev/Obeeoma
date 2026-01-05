import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
const BAR_COLORS = [
    "#0d6efd", // Articles - Bootstrap primary
    "#198754", // Videos - Bootstrap success
    "#ffc107", // Audio - Bootstrap warning
    "#6f42c1", // Interactive - Bootstrap purple
    "#dc3545", // Worksheets - Bootstrap danger
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
    return (_jsx(Card, { className: "mb-4 shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx("h5", { className: "fw-semibold", children: "Effectiveness by Resource Type (%)" }), _jsx("p", { className: "text-muted small mb-4", children: "Comparison of engagement across different media formats" }), _jsx(Bar, { data: data, options: options })] }) }));
};
export default EffectivenessChart;
