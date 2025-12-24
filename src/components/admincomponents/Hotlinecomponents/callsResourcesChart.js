import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
const data = {
    labels: ["Anxiety", "Depression", "Other", "Abuse", "Grief"],
    datasets: [
        {
            label: "Call Reasons (%)",
            data: [30, 25, 15, 20, 10],
            backgroundColor: "#198754",
        },
    ],
};
const options = {
    responsive: true,
    indexAxis: "y",
    scales: {
        x: {
            beginAtZero: true,
        },
    },
};
const CallReasonsChart = () => {
    return (_jsx(Card, { className: "mb-4", children: _jsxs(Card.Body, { children: [_jsx("h5", { children: "Call Reasons (%)" }), _jsx(Bar, { data: data, options: options })] }) }));
};
export default CallReasonsChart;
