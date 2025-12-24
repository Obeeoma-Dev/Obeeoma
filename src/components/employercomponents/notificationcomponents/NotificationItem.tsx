import React from "react";
import { Notification } from "../../../types/employernotification.types";

interface NotificationItemProps {
  notification: Notification;
  onStarToggle: (notificationId: string) => void;
  onMarkAsRead: (notificationId: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onStarToggle,
  onMarkAsRead,
}) => {
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStarToggle(notification.id);
  };

  return (
    <div
      className={`list-group-item list-group-item-action ${
        !notification.isRead ? "bg-light" : ""
      }`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <p className="mb-1">{notification.title}</p>
          {notification.department && (
            <small className="text-muted">
              Department: {notification.department}
            </small>
          )}
          <small className="text-muted d-block">
            {notification.timestamp.toLocaleDateString()} at{" "}
            {notification.timestamp.toLocaleTimeString()}
          </small>
        </div>
        <button
          className={`btn btn-link p-0 ms-2 ${
            notification.isStarred ? "text-warning" : "text-muted"
          }`}
          onClick={handleStarClick}
          aria-label={
            notification.isStarred ? "Unstar notification" : "Star notification"
          }
        >
          <i
            className={`bi ${notification.isStarred ? "bi-star-fill" : "bi-star"}`}
          ></i>
        </button>
      </div>
      {!notification.isRead && (
        <span className="badge bg-primary rounded-pill mt-2">New</span>
      )}
    </div>
  );
};

export default NotificationItem;
