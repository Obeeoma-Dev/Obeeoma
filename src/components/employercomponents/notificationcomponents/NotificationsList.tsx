import React from 'react';
import { Notification } from '../../../types/employernotification.types';
import NotificationItem from './NotificationItem';

interface NotificationsListProps {
  notifications: Notification[];
  onStarToggle: (notificationId: string) => void;
  onMarkAsRead: (notificationId: string) => void;
}

const NotificationsList = ({
  notifications,
  onStarToggle,
  onMarkAsRead
}: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No notifications found.</p>
      </div>
    );
  }

  return (
    <div className="list-group">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onStarToggle={onStarToggle}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};

export default NotificationsList;