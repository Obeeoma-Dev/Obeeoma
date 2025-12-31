import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, } from "chart.js";
// Register chart components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
/**
 * OrganizationCharts component displays two charts:
 * - Line chart for organization growth over time
 * - Bar chart for client distribution across organizations
 * Uses placeholder data for now, ready for backend integration later.
 */
const OrganizationCharts = () => {
    // Line chart data for organization growth
    const growthData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Organization Growth",
                data: [5, 10, 15, 25, 35, 42],
                borderColor: "#00A859", // Bootstrap green
                backgroundColor: "rgba(40,167,69,0.2)", // Transparent green fill
                tension: 0.4, // Smooth curve
            },
        ],
    };
    // Bar chart data for client distribution
    const distributionData = {
        labels: ["Wellness Center", "Community Mental Health", "Urban Outreach"],
        datasets: [
            {
                label: "Clients",
                data: [284, 194, 134],
                backgroundColor: ["#00A859", "#00A859", "#00A859"], // Varying greens
                borderRadius: 4, // Rounded bars
            },
        ],
    };
    // Chart options for consistent styling
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#6c757d", // Muted gray
                    font: {
                        size: 12,
                    },
                },
            },
            title: {
                display: false, // We use Card titles instead
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#6c757d",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: "#6c757d",
                },
                grid: {
                    color: "#e9ecef",
                },
            },
        },
    };
    return (_jsxs(Row, { className: "mt-4", children: [_jsx(Col, { md: 6, className: "mb-4", children: _jsx(Card, { className: "shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "fw-semibold fs-6 mb-3", style: { fontFamily: 'body', color: '#00A859' }, children: "Organization Growth" }), _jsx(Line, { data: growthData, options: chartOptions })] }) }) }), _jsx(Col, { md: 6, className: "mb-4", children: _jsx(Card, { className: "shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "fw-semibold fs-6 mb-3", style: { fontFamily: 'body', color: '#00A859' }, children: "Client Distribution by Organization" }), _jsx(Bar, { data: distributionData, options: chartOptions })] }) }) })] }));
};
export default OrganizationCharts;
