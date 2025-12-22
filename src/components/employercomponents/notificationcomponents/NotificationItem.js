import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotificationItem = ({ notification, onStarToggle, onMarkAsRead, }) => {
    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }
    };
    const handleStarClick = (e) => {
        e.stopPropagation();
        onStarToggle(notification.id);
    };
    return (_jsxs("div", { className: `list-group-item list-group-item-action ${!notification.isRead ? "bg-light" : ""}`, onClick: handleClick, style: { cursor: "pointer" }, children: [_jsxs("div", { className: "d-flex justify-content-between align-items-start", children: [_jsxs("div", { className: "flex-grow-1", children: [_jsx("p", { className: "mb-1", children: notification.title }), notification.department && (_jsxs("small", { className: "text-muted", children: ["Department: ", notification.department] })), _jsxs("small", { className: "text-muted d-block", children: [notification.timestamp.toLocaleDateString(), " at", " ", notification.timestamp.toLocaleTimeString()] })] }), _jsx("button", { className: `btn btn-link p-0 ms-2 ${notification.isStarred ? "text-warning" : "text-muted"}`, onClick: handleStarClick, "aria-label": notification.isStarred ? "Unstar notification" : "Star notification", children: _jsx("i", { className: `bi ${notification.isStarred ? "bi-star-fill" : "bi-star"}` }) })] }), !notification.isRead && (_jsx("span", { className: "badge bg-primary rounded-pill mt-2", children: "New" }))] }));
};
export default NotificationItem;
