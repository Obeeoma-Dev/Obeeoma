interface NotificationSettings {
  emailNotifications: boolean;
  weeklyReports: boolean;
  browserNotifications: boolean;
  reportGeneration: boolean;
}

interface NotificationsSectionProps {
  notificationSettings: NotificationSettings;
  onNotificationSettingsChange: (settings: NotificationSettings) => void;
}

const NotificationsSection = ({ 
  notificationSettings, 
  onNotificationSettingsChange 
}: NotificationsSectionProps) => {
  const handleToggleChange = (field: keyof NotificationSettings, value: boolean) => {
    onNotificationSettingsChange({
      ...notificationSettings,
      [field]: value
    });
  };

  const notificationItems = [
    {
      key: 'emailNotifications' as keyof NotificationSettings,
      title: 'Email Notifications',
      description: 'Configure when you\'ll receive email notifications'
    },
    {
      key: 'weeklyReports' as keyof NotificationSettings,
      title: 'Weekly Reports',
      description: 'Receive weekly summary reports'
    },
    {
      key: 'browserNotifications' as keyof NotificationSettings,
      title: 'Browser Notifications',
      description: 'Get notifications in your browser'
    },
    {
      key: 'reportGeneration' as keyof NotificationSettings,
      title: 'Report Generation',
      description: 'Notify when new reports are generated'
    }
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-semibold mb-4">Notification Settings</h3>
        <p className="text-muted mb-4">Configure when you'll receive email notifications</p>
        
        <div className="space-y-4">
          {notificationItems.map((item) => (
            <div key={item.key} className="d-flex justify-content-between align-items-center p-3 border rounded" style={{ borderRadius: "8px" }}>
              <div>
                <div className="fw-medium">{item.title}</div>
                <div className="text-muted small">{item.description}</div>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notificationSettings[item.key]}
                  onChange={(e) => handleToggleChange(item.key, e.target.checked)}
                  style={{ width: "3em", height: "1.5em" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-light rounded">
          <h5 className="h6 fw-semibold mb-2">Notification Preferences</h5>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-medium">Notification Frequency</label>
              <select className="form-select form-select-sm" style={{ borderRadius: "6px" }}>
                <option>Immediately</option>
                <option>Daily Digest</option>
                <option>Weekly Summary</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small fw-medium">Quiet Hours</label>
              <select className="form-select form-select-sm" style={{ borderRadius: "6px" }}>
                <option>Disabled</option>
                <option>10:00 PM - 7:00 AM</option>
                <option>11:00 PM - 6:00 AM</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;