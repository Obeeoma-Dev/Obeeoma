import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, } from "chart.js";
// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
// Component to display growth and distribution charts
const OrganizationCharts = () => {
    const growthData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Organization Growth",
                data: [5, 10, 15, 25, 35, 42],
                borderColor: "green",
                backgroundColor: "rgba(0,128,0,0.2)",
            },
        ],
    };
    const distributionData = {
        labels: ["Wellness Center", "Community Mental Health", "Urban Outreach"],
        datasets: [
            {
                label: "Clients",
                data: [284, 194, 134],
                backgroundColor: ["#28a745", "#218838", "#1e7e34"],
            },
        ],
    };
    return (_jsxs(Row, { className: "mt-4", children: [_jsx(Col, { md: 6, children: _jsx(Line, { data: growthData }) }), _jsx(Col, { md: 6, children: _jsx(Bar, { data: distributionData }) })] }));
};
export default OrganizationCharts;
