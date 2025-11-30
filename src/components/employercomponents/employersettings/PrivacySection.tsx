interface PrivacySettings {
  anonymizeData: boolean;
  enhancedPrivacy: boolean;
  dataRetentionPeriod: number;
}

interface PrivacySectionProps {
  privacySettings: PrivacySettings;
  onPrivacySettingsChange: (settings: PrivacySettings) => void;
}

const PrivacySection = ({ privacySettings, onPrivacySettingsChange }: PrivacySectionProps) => {
  const handleToggleChange = (field: keyof PrivacySettings, value: boolean) => {
    onPrivacySettingsChange({
      ...privacySettings,
      [field]: value
    });
  };

  const handleRangeChange = (value: number) => {
    onPrivacySettingsChange({
      ...privacySettings,
      dataRetentionPeriod: value
    });
  };

  const privacyItems = [
    {
      key: 'anonymizeData' as keyof PrivacySettings,
      title: 'Anonymize Data',
      description: 'Always anonymize employee test results'
    },
    {
      key: 'enhancedPrivacy' as keyof PrivacySettings,
      title: 'Enhanced Privacy',
      description: 'Apply additional anonymization techniques'
    }
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-semibold mb-4">Privacy Settings</h3>
        <p className="text-muted mb-4">Configure how employee data is handled</p>
        
        <div className="space-y-4">
          {privacyItems.map((item) => (
            <div key={item.key} className="d-flex justify-content-between align-items-center p-3 border rounded" style={{ borderRadius: "8px" }}>
              <div>
                <div className="fw-medium">{item.title}</div>
                <div className="text-muted small">{item.description}</div>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={privacySettings[item.key] as boolean}
                  onChange={(e) => handleToggleChange(item.key, e.target.checked)}
                  style={{ width: "3em", height: "1.5em" }}
                />
              </div>
            </div>
          ))}

          <div className="p-3 border rounded" style={{ borderRadius: "8px" }}>
            <div className="mb-3">
              <div className="fw-medium">Data Retention Period</div>
              <div className="text-muted small">How long to keep employee data</div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <input
                type="range"
                className="form-range flex-grow-1"
                min="30"
                max="365"
                step="30"
                value={privacySettings.dataRetentionPeriod}
                onChange={(e) => handleRangeChange(parseInt(e.target.value))}
              />
              <span className="fw-medium text-nowrap">{privacySettings.dataRetentionPeriod} days</span>
            </div>
            <div className="form-text text-muted mt-2">
              Data will be automatically deleted after this period
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-light rounded">
          <h5 className="h6 fw-semibold mb-3">Data Export & Deletion</h5>
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <button className="btn  w-100 btn-sm" style={{backgroundColor:'#22C55E'}}>
                Export All Data
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button className="btn  w-100 btn-sm">
                Delete All Data
              </button>
            </div>
          </div>
          <div className="form-text text-muted mt-2">
            Export or permanently delete all organization data
          </div>
        </div>

        <div className="mt-4 p-3 border rounded">
          <h5 className="h6 fw-semibold mb-2">GDPR Compliance</h5>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gdprConsent" />
            <label className="form-check-label small" htmlFor="gdprConsent">
              I acknowledge that this organization complies with GDPR regulations for data protection
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;