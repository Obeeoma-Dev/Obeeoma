import React, { useState } from 'react';
import { Notification, NotificationFilter } from '../../types/employernotification.types';
import NotificationsList from '../../components/employercomponents/notificationcomponents/NotificationsList';
import FilterTabs from '../../components/employercomponents/notificationcomponents/FilterTabs';

const NotificationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
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

  const handleFilterChange = (filter: NotificationFilter) => {
    setActiveFilter(filter);
  };

  const handleStarToggle = (notificationId: string) => {
    setNotifications((prev: Notification[]) =>
      prev.map((notification: Notification) =>
        notification.id === notificationId
          ? { ...notification, isStarred: !notification.isStarred }
          : notification
      )
    );
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev: Notification[]) =>
      prev.map((notification: Notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const filteredNotifications = notifications.filter((notification: Notification) => {
    switch (activeFilter) {
      case 'unread':
        return !notification.isRead;
      case 'starred':
        return notification.isStarred;
      default:
        return true;
    }
  });

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-4">Notifications</h1>
          
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            unreadCount={notifications.filter((n: Notification) => !n.isRead).length}
            starredCount={notifications.filter((n: Notification) => n.isStarred).length}
          />
          
          <NotificationsList
            notifications={filteredNotifications}
            onStarToggle={handleStarToggle}
            onMarkAsRead={handleMarkAsRead}
          />

          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;