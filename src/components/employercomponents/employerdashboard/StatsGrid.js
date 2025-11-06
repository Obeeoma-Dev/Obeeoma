import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, FileCheck, TrendingUp, AlertTriangle } from "lucide-react";
// --- 1. Define the Icon Mapping outside the component ---
// This mapping is static and should not be recreated on every render.
const IconMap = {
    Users,
    FileCheck,
    TrendingUp,
    AlertTriangle,
};
// --- 2. Define a Utility Function for Icon Retrieval ---
// This is a clean utility function, eliminating the need for the inefficient
// definition inside the component.
const getIconComponent = (iconName) => {
    // Return the specific Lucide icon component, or Users as a default fallback
    return IconMap[iconName] || Users;
};
const StatsGrid = ({ stats }) => {
    return (_jsx("div", { className: "row g-2 mb-4", children: stats.map((stat) => {
            // Use the utility function to get the correct icon component
            const IconComponent = getIconComponent(stat.icon.toString());
            return (_jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card h-100 border-0 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "d-flex align-items-start gap-3", children: [_jsx("div", { 
                                    // Use the dynamic Bootstrap background class and standard classes
                                    className: `rounded-circle bg-${stat.color} d-flex align-items-center justify-content-center flex-shrink-0`, style: {
                                        width: "48px",
                                        height: "48px",
                                        fontFamily: "body",
                                        // Removed the conflicting 'color: "#3CB371"' inline style
                                        // as the icon component handles its color via text-white class.
                                    }, children: _jsx(IconComponent, { className: "text-white", size: 24 }) }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("p", { className: "text-muted small mb-1", style: { fontFamily: "heading" }, children: stat.title }), _jsx("h3", { className: "h4 fw-bold mb-1", style: { fontFamily: "heading" }, children: stat.value })] })] }) }) }) }, stat.title));
        }) }));
};
export default StatsGrid;
