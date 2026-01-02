import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RecentActivityFeed = ({ activities }) => {
    const getIcon = (iconType, color) => {
        switch (iconType) {
            case "person":
                return (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "10", cy: "7", r: "3", stroke: color, strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6", stroke: color, strokeWidth: "1.5", strokeLinecap: "round" })] }));
            case "refresh":
                return (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M17 10a7 7 0 1 1-7-7M17 3v4h-4M3 10a7 7 0 1 0 7 7M3 17v-4h4", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
            case "alert":
                return (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M10 6v4M10 14h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", stroke: color, strokeWidth: "1.5", strokeLinecap: "round" }) }));
            case "check":
                return (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("circle", { cx: "10", cy: "10", r: "8", stroke: color, strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M6 10l2 2 4-4", stroke: color, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { children: [activities.map((activity, index) => (_jsxs("div", { style: {
                    padding: "1rem",
                    borderBottom: index !== activities.length - 1 ? "1px solid #e9ecef" : "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                }, children: [_jsx("div", { style: {
                            flexShrink: 0,
                            marginTop: "0.125rem",
                        }, children: getIcon(activity.icon, activity.iconColor) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: {
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "0.25rem",
                                }, children: activity.organization }), _jsx("div", { style: {
                                    fontSize: "0.875rem",
                                    color: "#6c757d",
                                    marginBottom: "0.25rem",
                                }, children: activity.description }), _jsx("div", { style: {
                                    fontSize: "0.75rem",
                                    color: "#adb5bd",
                                }, children: activity.time })] })] }, index))), _jsx("div", { style: {
                    padding: "1rem",
                    textAlign: "center",
                    borderTop: "1px solid #e9ecef",
                }, children: _jsx("a", { href: "#", style: {
                        color: "#3CB371",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                    }, onClick: (e) => {
                        e.preventDefault();
                        console.log("View all activities");
                    }, children: "View all" }) })] }));
};
export default RecentActivityFeed;
