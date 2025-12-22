import { jsx as _jsx } from "react/jsx-runtime";
import NotificationItem from "./NotificationItem";
const NotificationsList = ({ notifications, onStarToggle, onMarkAsRead, }) => {
    if (notifications.length === 0) {
        return (_jsx("div", { className: "text-center py-5", children: _jsx("p", { className: "text-muted", children: "No notifications found." }) }));
    }
    return (_jsx("div", { className: "list-group", children: notifications.map((notification) => (_jsx(NotificationItem, { notification: notification, onStarToggle: onStarToggle, onMarkAsRead: onMarkAsRead }, notification.id))) }));
};
export default NotificationsList;
