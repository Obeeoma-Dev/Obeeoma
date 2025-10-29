import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, FileCheck, TrendingUp, AlertTriangle } from "lucide-react";
const StatsGrid = ({ stats }) => {
    // TODO: This mapping can be moved to a utility function
    const getIcon = (iconName) => {
        const icons = {
            Users,
            FileCheck,
            TrendingUp,
            AlertTriangle,
        };
        return icons[iconName] || Users;
    };
    return (_jsx("div", { className: "row g-3 mb-4", children: stats.map((stat) => {
            const IconComponent = getIcon(stat.icon);
            return (_jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card h-100 border-0 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "d-flex align-items-start gap-3", children: [_jsx("div", { className: `rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`, style: { width: "48px", height: "48px", fontFamily: "body", color: "3CB371" }, children: _jsx(IconComponent, { className: "text-white", size: 24 }) }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("p", { className: "text-muted small mb-1", style: { fontFamily: "heading", }, children: stat.title }), _jsx("h3", { className: "h4 fw-bold mb-1", style: { fontFamily: "heading", }, children: stat.value }), _jsx("p", { className: "text-muted small mb-0", style: { fontFamily: "heading", }, children: stat.description })] })] }) }) }) }, stat.title));
        }) }));
};
export default StatsGrid;
