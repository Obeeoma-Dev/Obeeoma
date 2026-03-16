import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
const BAR_COLORS = ["#3CB371", "#198754", "#9DD3AF", "#0B6E45", "#00A859"];
const defaultLabels = ["Anxiety", "Depression", "Other", "Abuse", "Grief"];
const defaultValues = [30, 25, 15, 20, 10];
const options = {
    responsive: true,
    scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, grid: { display: false } },
    },
};
const CallReasonsChart = ({ callReasons }) => {
    const labels = callReasons?.length
        ? callReasons.map((r) => (r.reason ?? "").charAt(0).toUpperCase() + (r.reason ?? "").slice(1))
        : defaultLabels;
    const values = callReasons?.length
        ? // eslint-disable-next-line no-constant-binary-expression
            callReasons.map((r) => Number(r.count) ?? 0)
        : defaultValues;
    const data = {
        labels,
        datasets: [
            {
                label: "Call Reasons",
                data: values,
                backgroundColor: values.map((_, i) => BAR_COLORS[i % BAR_COLORS.length]),
                borderRadius: 6,
                maxBarThickness: 40,
            },
        ],
    };
    return (_jsx(Card, { className: "mb-4", children: _jsxs(Card.Body, { children: [_jsx("h5", { children: "Call Reasons" }), _jsx(Bar, { data: data, options: options })] }) }));
};
export default CallReasonsChart;
