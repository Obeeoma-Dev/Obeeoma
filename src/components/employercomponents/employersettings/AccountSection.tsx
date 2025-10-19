import { Building, User, Mail, Lock } from "lucide-react";

interface AccountData {
  organizationName: string;
  adminUser: string;
  email: string;
  password: string;
}

interface AccountSectionProps {
  accountData: AccountData;
  onAccountDataChange: (data: AccountData) => void;
}

const AccountSection = ({ accountData, onAccountDataChange }: AccountSectionProps) => {
  const handleInputChange = (field: keyof AccountData, value: string) => {
    onAccountDataChange({
      ...accountData,
      [field]: value
    });
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-semibold mb-4">Account Information</h3>
        
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label fw-medium">Organization Name</label>
            <div className="position-relative">
              <Building
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />
              <input
                type="text"
                className="form-control ps-5"
                value={accountData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-medium">Admin User</label>
            <div className="position-relative">
              <User
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />
              <input
                type="text"
                className="form-control ps-5"
                value={accountData.adminUser}
                onChange={(e) => handleInputChange('adminUser', e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-medium">Email Address</label>
            <div className="position-relative">
              <Mail
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />
              <input
                type="email"
                className="form-control ps-5"
                value={accountData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-medium">Password</label>
            <div className="position-relative">
              <Lock
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              />
              <input
                type="password"
                className="form-control ps-5"
                value={accountData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{ borderRadius: "8px" }}
                placeholder="Enter new password"
              />
            </div>
            <div className="form-text text-muted mt-1">
              Contact administrator to change your password
            </div>
          </div>

          <div className="col-12">
            <div className="border-top pt-3 mt-2">
              <h4 className="h6 fw-semibold mb-3">Additional Settings</h4>
              
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-medium">Time Zone</label>
                  <select className="form-select" style={{ borderRadius: "8px" }}>
                    <option>UTC-05:00 Eastern Time (US & Canada)</option>
                    <option>UTC-08:00 Pacific Time (US & Canada)</option>
                    <option>UTC+00:00 Greenwich Mean Time</option>
                    <option>UTC+01:00 Central European Time</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-medium">Language</label>
                  <select className="form-select" style={{ borderRadius: "8px" }}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-medium">Date Format</label>
                  <select className="form-select" style={{ borderRadius: "8px" }}>
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;