import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import NotificationsList from '../../components/employercomponents/notificationcomponents/NotificationsList';
import FilterTabs from '../../components/employercomponents/notificationcomponents/FilterTabs';
const NotificationsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: '5 Employees joined the organization plan Front-Desk',
            category: 'organization',
            department: 'Front-Desk',
            isRead: false,
            isStarred: false,
            timestamp: new Date('2024-01-15T10:30:00')
        },
        {
            id: '2',
            title: 'A new wellness test was completed in Engineering',
            category: 'wellness',
            department: 'Engineering',
            isRead: true,
            isStarred: false,
            timestamp: new Date('2024-01-15T09:15:00')
        },
        {
            id: '3',
            title: 'Department Marketing completed monthly assessments',
            category: 'assessments',
            department: 'Marketing',
            isRead: false,
            isStarred: true,
            timestamp: new Date('2024-01-14T16:45:00')
        },
        {
            id: '4',
            title: 'New wellness resources added to the platform',
            category: 'resources',
            isRead: true,
            isStarred: false,
            timestamp: new Date('2024-01-14T14:20:00')
        },
        {
            id: '5',
            title: 'New wellness resources added to the platform',
            category: 'resources',
            isRead: true,
            isStarred: true,
            timestamp: new Date('2024-01-14T14:15:00')
        }
    ]);
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };
    const handleStarToggle = (notificationId) => {
        setNotifications((prev) => prev.map((notification) => notification.id === notificationId
            ? { ...notification, isStarred: !notification.isStarred }
            : notification));
    };
    const handleMarkAsRead = (notificationId) => {
        setNotifications((prev) => prev.map((notification) => notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification));
    };
    const filteredNotifications = notifications.filter((notification) => {
        switch (activeFilter) {
            case 'unread':
                return !notification.isRead;
            case 'starred':
                return notification.isStarred;
            default:
                return true;
        }
    });
    return (_jsx("div", { className: "container-fluid py-4", children: _jsx("div", { className: "row", children: _jsxs("div", { className: "col-12", children: [_jsx("h1", { className: "h3 mb-4", children: "Notifications" }), _jsx(FilterTabs, { activeFilter: activeFilter, onFilterChange: handleFilterChange, unreadCount: notifications.filter((n) => !n.isRead).length, starredCount: notifications.filter((n) => n.isStarred).length }), _jsx(NotificationsList, { notifications: filteredNotifications, onStarToggle: handleStarToggle, onMarkAsRead: handleMarkAsRead }), _jsx("hr", { className: "my-4" }), _jsx("div", { className: "mt-4", children: _jsx("h6", { className: "text-muted", children: "Settings" }) })] }) }) }));
};
export default NotificationsPage;
