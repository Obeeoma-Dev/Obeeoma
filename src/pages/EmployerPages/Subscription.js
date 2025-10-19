import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users as UsersIcon, CreditCard, Search, Bell, Menu, X, FileText, LogOut, Check, Star, } from "lucide-react";
const Subscription = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: false },
        { icon: UsersIcon, label: "Employees", path: "/management", active: false },
        { icon: CreditCard, label: "Subscription", path: "/subscription", active: true },
        { icon: FileText, label: "Reports", path: "/reports", active: false },
    ];
    const plans = [
        {
            name: "Starter",
            price: "$29",
            period: "per month",
            description: "Perfect for small teams",
            features: [
                "Up to 10 employees",
                "Basic wellness assessments",
                "Email support",
                "Monthly reports",
            ],
            current: false,
            recommended: false,
        },
        {
            name: "Professional",
            price: "$79",
            period: "per month",
            description: "Ideal for growing organizations",
            features: [
                "Up to 50 employees",
                "Advanced analytics",
                "Priority support",
                "Custom assessments",
                "Weekly reports",
                "API access",
            ],
            current: true,
            recommended: true,
        },
        {
            name: "Enterprise",
            price: "$199",
            period: "per month",
            description: "For large organizations",
            features: [
                "Unlimited employees",
                "Advanced analytics",
                "24/7 dedicated support",
                "White-label solutions",
                "Custom integrations",
                "SLA guarantee",
            ],
            current: false,
            recommended: false,
        },
    ];
    const billingHistory = [
        { id: 1, date: "Nov 15, 2023", amount: "$79.00", status: "Paid" },
        { id: 2, date: "Oct 15, 2023", amount: "$79.00", status: "Paid" },
        { id: 3, date: "Sep 15, 2023", amount: "$79.00", status: "Paid" },
    ];
    return (_jsxs("div", { className: "min-vh-100 bg-light", children: [isSidebarOpen && (_jsx("div", { className: "position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-40 d-lg-none", onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { className: `position-fixed top-0 start-0 h-100 bg-white border-end z-50 transition-all ${isSidebarOpen ? "translate-x-0" : "translate-x-n100"} d-lg-block`, style: { width: "240px" }, children: [_jsxs("div", { className: "p-4 border-bottom d-flex align-items-center justify-content-between", children: [_jsxs("button", { onClick: () => navigate("/"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: [_jsx("div", { className: "rounded-circle bg-primary d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx("span", { className: "text-white fw-bold", children: "O" }) }), _jsx("span", { className: "fw-bold text-dark", children: "Obeeoma" })] }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", children: _jsx(X, { size: 20 }) })] }), _jsxs("nav", { className: "px-3 mt-4", children: [_jsx("p", { className: "text-muted small mb-3 ps-3", children: "Menu" }), menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `w-100 btn d-flex align-items-center gap-3 mb-2 text-start ${item.active ? "bg-light text-primary" : "text-dark"}`, style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(item.icon, { size: 20 }), _jsx("span", { className: "fw-medium", children: item.label })] }, item.label)))] }), _jsxs("div", { className: "position-absolute bottom-0 start-0 end-0 p-3 border-top", children: [_jsxs("button", { onClick: () => navigate("/settings"), className: "w-100 btn d-flex align-items-center gap-3 text-start text-dark", style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(Settings, { size: 20 }), _jsx("span", { children: "Settings" })] }), _jsxs("button", { className: "w-100 btn d-flex align-items-center gap-3 text-start text-dark", style: {
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                }, children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Logout" })] })] })] }), _jsxs("div", { className: "d-lg-flex", children: [_jsx("div", { className: "d-none d-lg-block", style: { width: "240px" } }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("header", { className: "bg-white border-bottom sticky-top z-30", children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row align-items-center py-3", children: [_jsx("div", { className: "col-auto d-lg-none", children: _jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link p-2", children: _jsx(Menu, { size: 24 }) }) }), _jsx("div", { className: "col", children: _jsxs("div", { className: "position-relative", style: { maxWidth: "400px" }, children: [_jsx(Search, { className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", size: 16 }), _jsx("input", { type: "search", placeholder: "Search...", className: "form-control ps-5 bg-light" })] }) }), _jsx("div", { className: "col-auto", children: _jsxs("button", { className: "btn btn-link position-relative p-2 text-dark", children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary p-1" })] }) })] }) }) }), _jsxs("main", { className: "container-fluid py-4", children: [_jsx("h1", { className: "h2 fw-bold mb-4", children: "Subscription Management" }), _jsx("div", { className: "row mb-5", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-3", children: "Current Plan" }), _jsxs("div", { className: "row align-items-center", children: [_jsxs("div", { className: "col-md-6", children: [_jsx("h4", { className: "h4 fw-bold text-primary mb-1", children: "Professional Plan" }), _jsx("p", { className: "text-muted mb-2", children: "$79 per month \u2022 Billed monthly" }), _jsx("p", { className: "text-muted small", children: "Next billing date: Dec 15, 2023" })] }), _jsxs("div", { className: "col-md-6 text-md-end", children: [_jsx("button", { className: "btn btn-outline-primary me-2", children: "Change Plan" }), _jsx("button", { className: "btn btn-primary", children: "Update Payment Method" })] })] })] }) }) }) }), _jsx("div", { className: "row mb-5", children: _jsxs("div", { className: "col-12", children: [_jsx("h3", { className: "h4 fw-semibold mb-4", children: "Available Plans" }), _jsx("div", { className: "row g-4", children: plans.map((plan, index) => (_jsx("div", { className: "col-12 col-md-4", children: _jsxs("div", { className: `card h-100 border-0 shadow-sm ${plan.recommended ? 'border-primary' : ''}`, children: [plan.recommended && (_jsxs("div", { className: "card-header bg-primary text-white text-center py-2", children: [_jsx(Star, { size: 16, className: "me-1" }), "Recommended"] })), _jsxs("div", { className: "card-body p-4 d-flex flex-column", children: [_jsx("h5", { className: "card-title fw-bold", children: plan.name }), _jsxs("div", { className: "my-3", children: [_jsx("span", { className: "h2 fw-bold", children: plan.price }), _jsxs("span", { className: "text-muted", children: ["/", plan.period] })] }), _jsx("p", { className: "text-muted mb-4", children: plan.description }), _jsx("ul", { className: "list-unstyled mb-4 flex-grow-1", children: plan.features.map((feature, featureIndex) => (_jsxs("li", { className: "mb-2", children: [_jsx(Check, { size: 16, className: "text-success me-2" }), _jsx("span", { className: "small", children: feature })] }, featureIndex))) }), _jsx("div", { className: "mt-auto", children: plan.current ? (_jsx("button", { className: "btn btn-outline-primary w-100", disabled: true, children: "Current Plan" })) : (_jsx("button", { className: `btn w-100 ${plan.recommended ? 'btn-primary' : 'btn-outline-primary'}`, children: "Select Plan" })) })] })] }) }, index))) })] }) }), _jsx("div", { className: "row", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Billing History" }), _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "table table-hover", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date" }), _jsx("th", { children: "Amount" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: billingHistory.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.date }), _jsx("td", { children: item.amount }), _jsx("td", { children: _jsx("span", { className: "badge bg-success", children: item.status }) }), _jsx("td", { children: _jsx("button", { className: "btn btn-link p-0 text-primary", children: "Download" }) })] }, item.id))) })] }) })] }) }) }) })] })] })] })] }));
};
export default Subscription;
