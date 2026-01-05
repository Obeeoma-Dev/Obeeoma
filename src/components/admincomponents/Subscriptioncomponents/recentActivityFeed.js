import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
const RecentActivityFeed = ({ activities }) => {
    const getIcon = (iconType, color) => {
        const iconSize = 16;
        const colorStyle = {
            green: { color: '#28a745' },
            blue: { color: '#007bff' },
            red: { color: '#dc3545' },
            purple: { color: '#6f42c1' },
        }[color] || { color: '#6c757d' };
        switch (iconType) {
            case 'person':
                return _jsx(Users, { size: iconSize, style: colorStyle });
            case 'refresh':
                return _jsx(RefreshCw, { size: iconSize, style: colorStyle });
            case 'warning':
                return _jsx(AlertCircle, { size: iconSize, style: colorStyle });
            case 'check':
                return _jsx(CheckCircle2, { size: iconSize, style: colorStyle });
            default:
                return _jsx(Users, { size: iconSize, style: colorStyle });
        }
    };
    return (_jsxs("div", { className: "p-3", children: [activities.map((activity, index) => (_jsxs("div", { className: `d-flex align-items-start mb-3 pb-3 ${index < activities.length - 1 ? 'border-bottom' : ''}`, children: [_jsx("div", { className: "me-3 mt-1", children: getIcon(activity.icon, activity.iconColor) }), _jsxs("div", { className: "flex-grow-1", style: { fontFamily: 'body' }, children: [_jsx("div", { className: "small fw-medium mb-1", children: activity.organization }), _jsx("div", { className: "small text-muted mb-1", children: activity.message }), _jsx("div", { className: "small text-muted", children: activity.timeAgo })] })] }, index))), _jsx("div", { className: "text-center mt-3", style: { fontFamily: 'body' }, children: _jsx("a", { href: "#", className: "text-success text-decoration-none small", children: "View all" }) })] }));
};
export default RecentActivityFeed;
