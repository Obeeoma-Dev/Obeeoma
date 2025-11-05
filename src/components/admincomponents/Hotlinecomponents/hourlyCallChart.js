import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale);
// Placeholder data for hourly call volume
const data = {
    labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'],
    datasets: [
        {
            label: 'Calls',
            data: [2, 4, 6, 3, 5, 7, 4, 6, 5, 3, 2],
            backgroundColor: '#0d6efd',
        },
    ],
};
const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};
const HourlyCallChart = () => {
    return (_jsx(Card, { className: "mb-4", children: _jsxs(Card.Body, { children: [_jsx("h5", { children: "Hourly Call Volume" }), _jsx(Bar, { data: data, options: options })] }) }));
};
export default HourlyCallChart;
