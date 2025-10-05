import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ActivityItem from './activityitem';
/**
 * RecentActivities component displays a list of recent system activities
 * Shows various types of events with timestamps and details
 */
const RecentActivities = () => {
    // Array of recent activity data
    const activities = [
        {
            id: '1',
            type: 'New Organization',
            details: 'Wellness Centre Inc. joined the platform',
            time: '2 hours ago',
            icon: 'Building2',
            iconColor: 'bg-emerald-50',
        },
        {
            id: '2',
            type: 'AI Recommendation',
            details: 'New sinfully resource added with 57% effectiveness',
            time: '3 hours ago',
            icon: 'Brain',
            iconColor: 'bg-blue-50',
        },
        {
            id: '3',
            type: 'Hotline Activity',
            details: 'Spike in call volume (32% increase)',
            time: '5 hours ago',
            icon: 'Phone',
            iconColor: 'bg-purple-50',
        },
        {
            id: '4',
            type: 'Patient Engagement',
            details: 'Monthly engagement up by 15%',
            time: '1 day ago',
            icon: 'TrendingUp',
            iconColor: 'bg-orange-50',
        },
        {
            id: '5',
            type: 'Subscription',
            details: 'University Counselling Center upgraded to Premium',
            time: '1 day ago',
            icon: 'CreditCard',
            iconColor: 'bg-pink-50',
        },
    ];
    return (
    // Main container with white background and shadow
    _jsxs("section", { className: "bg-white rounded-lg p-6 shadow-sm mb-8", children: [_jsx("div", { className: "mb-4", children: _jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Recent Activities" }) }), _jsxs("div", { className: "flex items-center justify-between px-4 pb-3 border-b border-gray-200", children: [_jsx("div", { className: "flex-1", children: _jsx("span", { className: "text-xs font-medium text-gray-500 uppercase", children: "Activity Type" }) }), _jsx("div", { className: "flex-1", children: _jsx("span", { className: "text-xs font-medium text-gray-500 uppercase", children: "Details" }) }), _jsx("div", { className: "w-32 text-right", children: _jsx("span", { className: "text-xs font-medium text-gray-500 uppercase", children: "Time" }) })] }), _jsx("div", { className: "divide-y divide-gray-100", children: activities.map((activity) => (_jsx(ActivityItem, { data: activity }, activity.id))) })] }));
};
export default RecentActivities;
