import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, } from 'chart.js';
// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const MonthlyUsageChart = () => {
    // Placeholder data for chart
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                label: 'Platform Usage',
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
                backgroundColor: '#007bff',
            },
        ],
    };
    return (_jsxs(Card, { className: "mb-4", children: [_jsx(Card.Header, { children: "Monthly Platform Usage" }), _jsx(Card.Body, { children: _jsx(Bar, { data: data }) })] }));
};
export default MonthlyUsageChart;
