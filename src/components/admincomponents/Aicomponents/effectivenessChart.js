import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "react-bootstrap";
import { Phone } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, } from "chart.js";
// Register Chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
const BAR_COLORS = ["#9DD3AF", "#00A859", "#3CB371", "#0B6E45"];
const PhoneIcon = Phone;
const categoryStyles = {
    "Crisis": "hotline-recommendations-category-crisis",
    "Support": "hotline-recommendations-category-support",
    "Information": "hotline-recommendations-category-information",
    "Emergency": "hotline-recommendations-category-emergency"
};
const hotlines = [
    {
        name: "National Suicide Prevention Lifeline",
        number: "988",
        category: "Crisis",
        timesRecommended: 245,
        status: "Active"
    },
    {
        name: "Crisis Text Line",
        number: "741741",
        category: "Crisis",
        timesRecommended: 189,
        status: "Active"
    },
    {
        name: "SAMHSA National Helpline",
        number: "1-800-662-4357",
        category: "Support",
        timesRecommended: 156,
        status: "Active"
    },
    {
        name: "National Domestic Violence Hotline",
        number: "1-800-799-7233",
        category: "Emergency",
        timesRecommended: 134,
        status: "Active"
    }
];
const defaultData = {
    labels: ["Videos", "Articles", "Audio", "Interactive"],
    datasets: [
        {
            label: "Effectiveness (%)",
            data: [85, 70, 60, 50],
            backgroundColor: BAR_COLORS,
            borderRadius: 6,
            maxBarThickness: 30,
        },
    ],
};
// Horizontal bars
const options = {
    indexAxis: "y",
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
const EffectivenessChart = ({ effectivenessByType, }) => {
    const labels = effectivenessByType?.length
        ? effectivenessByType
            .map((t) => (t.resource_type || "").replace(/_/g, " "))
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        : defaultData.labels;
    const values = effectivenessByType?.length
        ? effectivenessByType.map((t) => Number(t.avg_effectiveness) || 0)
        : defaultData.datasets[0].data;
    const data = {
        labels,
        datasets: [
            {
                label: "Effectiveness (%)",
                data: values,
                backgroundColor: values.map((_, i) => BAR_COLORS[i % BAR_COLORS.length]),
                borderRadius: 6,
                maxBarThickness: 30,
            },
        ],
    };
    return (_jsx(Card, { className: "hotline-recommendations-card", children: _jsxs(Card.Body, { className: "hotline-recommendations-body", children: [_jsxs("div", { className: "hotline-recommendations-header", children: [_jsx("h3", { className: "hotline-recommendations-title", children: "Hotline Recommendations" }), _jsx("p", { className: "hotline-recommendations-subtitle", children: "Numbers the AI is currently recommending to users in crisis" })] }), _jsxs("div", { className: "hotline-recommendations-content", children: [_jsxs("div", { className: "hotline-recommendations-grid-header", children: [_jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-name", children: "Hotline" }), _jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-category", children: "Category" }), _jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-times", children: "Times" }), _jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-status", children: "Status" })] }), _jsx("div", { className: "hotline-recommendations-list", children: hotlines.map((hotline) => (_jsxs("div", { className: "hotline-recommendations-row", children: [_jsxs("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-name", children: [_jsx("p", { className: "hotline-recommendations-name", children: hotline.name }), _jsxs("div", { className: "hotline-recommendations-number-wrapper", children: [_jsx(PhoneIcon, { size: 11, className: "hotline-recommendations-phone-icon" }), _jsx("span", { className: "hotline-recommendations-number", children: hotline.number })] })] }), _jsx("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-category", children: _jsx("span", { className: `hotline-recommendations-category ${categoryStyles[hotline.category]}`, children: hotline.category }) }), _jsxs("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-times", children: [_jsx("span", { className: "hotline-recommendations-times-count", children: hotline.timesRecommended }), _jsx("span", { className: "hotline-recommendations-times-multiply", children: "\u00D7" })] }), _jsx("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-status", children: _jsxs("span", { className: `hotline-recommendations-status ${hotline.status === 'Active' ? 'hotline-recommendations-status-active' : 'hotline-recommendations-status-paused'}`, children: [_jsx("span", { className: `hotline-recommendations-status-indicator ${hotline.status === 'Active' ? 'hotline-recommendations-indicator-active' : 'hotline-recommendations-indicator-paused'}` }), hotline.status] }) })] }, hotline.name))) })] })] }) }));
};
export default EffectivenessChart;
