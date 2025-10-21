export interface Notification {
  id: string;
  title: string;
  category: string;
  department?: string;
  isRead: boolean;
  isStarred: boolean;
  timestamp: Date;
}

export type NotificationFilter = 'all' | 'unread' | 'starred';