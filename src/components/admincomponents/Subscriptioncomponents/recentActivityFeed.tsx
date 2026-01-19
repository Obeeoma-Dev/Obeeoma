import React from 'react';
import { Users, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface Activity {
  organization: string;
  message: string;
  icon: 'person' | 'refresh' | 'warning' | 'check';
  iconColor: 'green' | 'blue' | 'red' | 'purple';
  timeAgo: string;
}

interface Props {
  activities: Activity[];
}

const RecentActivityFeed: React.FC<Props> = ({ activities }) => {
  const getIcon = (iconType: string, color: string) => {
    const iconSize = 16;
    const colorStyle = {
      green: { color: '#28a745' },
      blue: { color: '#007bff' },
      red: { color: '#dc3545' },
      purple: { color: '#6f42c1' },
    }[color] || { color: '#6c757d' };

    switch (iconType) {
      case 'person':
        return <Users size={iconSize} style={colorStyle} />;
      case 'refresh':
        return <RefreshCw size={iconSize} style={colorStyle} />;
      case 'warning':
        return <AlertCircle size={iconSize} style={colorStyle} />;
      case 'check':
        return <CheckCircle2 size={iconSize} style={colorStyle} />;
      default:
        return <Users size={iconSize} style={colorStyle} />;
    }
  };

  return (
    <div className="p-3">
      {activities.map((activity, index) => (
        <div
          key={index}
          className={`d-flex align-items-start mb-3 pb-3 ${index < activities.length - 1 ? 'border-bottom' : ''}`}
        >
          <div className="me-3 mt-1">
            {getIcon(activity.icon, activity.iconColor)}
          </div>
          <div className="flex-grow-1" style={{ fontFamily: 'body' }}>
            <div className="small fw-medium mb-1">{activity.organization}</div>
            <div className="small text-muted mb-1">{activity.message}</div>
            <div className="small text-muted">{activity.timeAgo}</div>
          </div>
        </div>
      ))}
      <div className="text-center mt-3" style={{ fontFamily: 'body' }}>
        <a href="#" className="text-success text-decoration-none small">View all</a>
      </div>
    </div>
  );
};

export default RecentActivityFeed;