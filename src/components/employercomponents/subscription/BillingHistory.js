import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BillingHistory = () => {
    // TODO: Replace with API data
    const billingHistory = [
        { id: 1, date: "Nov 15, 2023", amount: "$79.00", status: "Paid" },
        { id: 2, date: "Oct 15, 2023", amount: "$79.00", status: "Paid" },
        { id: 3, date: "Sep 15, 2023", amount: "$79.00", status: "Paid" },
    ];
    return (_jsx("div", { className: "row", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Billing History" }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date" }), _jsx("th", { children: "Amount" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: billingHistory.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.date }), _jsx("td", { children: item.amount }), _jsx("td", { children: _jsx("span", { className: "badge bg-success", children: item.status }) }), _jsx("td", { children: _jsx("button", { className: "btn btn-link p-0 text-primary", children: "Download" }) })] }, item.id))) })] }) })] }) }) }) }));
};
export default BillingHistory;
