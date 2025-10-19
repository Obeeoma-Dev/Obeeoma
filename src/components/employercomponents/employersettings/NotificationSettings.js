import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotificationsSection = ({ notificationSettings, onNotificationSettingsChange }) => {
    const handleToggleChange = (field, value) => {
        onNotificationSettingsChange({
            ...notificationSettings,
            [field]: value
        });
    };
    const notificationItems = [
        {
            key: 'emailNotifications',
            title: 'Email Notifications',
            description: 'Configure when you\'ll receive email notifications'
        },
        {
            key: 'weeklyReports',
            title: 'Weekly Reports',
            description: 'Receive weekly summary reports'
        },
        {
            key: 'browserNotifications',
            title: 'Browser Notifications',
            description: 'Get notifications in your browser'
        },
        {
            key: 'reportGeneration',
            title: 'Report Generation',
            description: 'Notify when new reports are generated'
        }
    ];
    return (_jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Notification Settings" }), _jsx("p", { className: "text-muted mb-4", children: "Configure when you'll receive email notifications" }), _jsx("div", { className: "space-y-4", children: notificationItems.map((item) => (_jsxs("div", { className: "d-flex justify-content-between align-items-center p-3 border rounded", style: { borderRadius: "8px" }, children: [_jsxs("div", { children: [_jsx("div", { className: "fw-medium", children: item.title }), _jsx("div", { className: "text-muted small", children: item.description })] }), _jsx("div", { className: "form-check form-switch", children: _jsx("input", { className: "form-check-input", type: "checkbox", checked: notificationSettings[item.key], onChange: (e) => handleToggleChange(item.key, e.target.checked), style: { width: "3em", height: "1.5em" } }) })] }, item.key))) }), _jsxs("div", { className: "mt-4 p-3 bg-light rounded", children: [_jsx("h5", { className: "h6 fw-semibold mb-2", children: "Notification Preferences" }), _jsxs("div", { className: "row g-3", children: [_jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label small fw-medium", children: "Notification Frequency" }), _jsxs("select", { className: "form-select form-select-sm", style: { borderRadius: "6px" }, children: [_jsx("option", { children: "Immediately" }), _jsx("option", { children: "Daily Digest" }), _jsx("option", { children: "Weekly Summary" })] })] }), _jsxs("div", { className: "col-12 col-md-6", children: [_jsx("label", { className: "form-label small fw-medium", children: "Quiet Hours" }), _jsxs("select", { className: "form-select form-select-sm", style: { borderRadius: "6px" }, children: [_jsx("option", { children: "Disabled" }), _jsx("option", { children: "10:00 PM - 7:00 AM" }), _jsx("option", { children: "11:00 PM - 6:00 AM" }), _jsx("option", { children: "Custom" })] })] })] })] })] }) }));
};
export default NotificationsSection;
