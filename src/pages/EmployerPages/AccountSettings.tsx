import { useState } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  CreditCard,
  Settings as SettingsIcon,
  Search,
  Bell,
  Menu,
  X,
  Building,
  Mail,
  Phone,
  MapPin,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerAccountSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/employer-dashboard", active: false },
    { icon: UsersIcon, label: "Employees", path: "/employeemanagement", active: false },
    { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
    { icon: SettingsIcon, label: "Settings", path: "/employeraccountsettings", active: true },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f9fafb' }}>
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040,
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: 'white',
          borderRight: '1px solid var(--obeeoma-border)',
          width: '256px',
          zIndex: 1050,
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
        className="d-lg-block"
      >
        <div className="p-4 d-flex align-items-center justify-content-between border-bottom">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>O</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--obeeoma-primary)' }}>
              Obeeoma
            </span>
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="btn btn-link d-lg-none p-0">
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 mt-4">
          <p style={{ fontSize: '12px', color: 'var(--obeeoma-text-muted)', marginBottom: '16px', paddingLeft: '12px' }}>
            Menu
          </p>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="btn w-100 d-flex align-items-center gap-3 mb-2 text-start"
              style={{
                backgroundColor: item.active ? 'var(--obeeoma-mint-dark)' : 'transparent',
                color: item.active ? 'var(--obeeoma-primary)' : 'var(--obeeoma-text-dark)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: '500',
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: 0 }} className="d-lg-flex">
        <div style={{ width: '256px' }} className="d-none d-lg-block"></div>
        
        <div className="flex-grow-1">
          {/* Top Bar */}
          <header className="bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center justify-content-between sticky-top">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-link d-lg-none p-2"
            >
              <Menu size={24} />
            </button>

            <div className="flex-grow-1 mx-4" style={{ maxWidth: '600px' }}>
              <div className="position-relative">
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--obeeoma-text-muted)',
                  }}
                />
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control"
                  style={{
                    paddingLeft: '40px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid var(--obeeoma-border)',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>

            <button className="btn btn-link position-relative p-2">
              <Bell size={20} />
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'var(--obeeoma-primary)',
                  borderRadius: '50%',
                }}
              ></span>
            </button>
          </header>

          {/* Settings Content */}
          <main className="p-3 p-sm-4 p-lg-5">
            <h1 className="mb-4" style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Organization Settings
            </h1>

            <div className="row g-4">
              {/* Organization Profile */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
                      Organization Profile
                    </h3>
                    <form>
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label" style={{ fontWeight: '500', fontSize: '14px' }}>
                            Organization Name
                          </label>
                          <div className="position-relative">
                            <Building
                              size={16}
                              style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--obeeoma-text-muted)',
                              }}
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company Name"
                              defaultValue="Acme Corporation"
                              style={{
                                paddingLeft: '40px',
                                borderRadius: '8px',
                                border: '1px solid var(--obeeoma-border)',
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label" style={{ fontWeight: '500', fontSize: '14px' }}>
                            Industry
                          </label>
                          <select
                            className="form-select"
                            style={{
                              borderRadius: '8px',
                              border: '1px solid var(--obeeoma-border)',
                            }}
                          >
                            <option>Technology</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Education</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label" style={{ fontWeight: '500', fontSize: '14px' }}>
                            Email
                          </label>
                          <div className="position-relative">
                            <Mail
                              size={16}
                              style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--obeeoma-text-muted)',
                              }}
                            />
                            <input
                              type="email"
                              className="form-control"
                              placeholder="contact@company.com"
                              defaultValue="contact@acmecorp.com"
                              style={{
                                paddingLeft: '40px',
                                borderRadius: '8px',
                                border: '1px solid var(--obeeoma-border)',
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label" style={{ fontWeight: '500', fontSize: '14px' }}>
                            Phone
                          </label>
                          <div className="position-relative">
                            <Phone
                              size={16}
                              style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--obeeoma-text-muted)',
                              }}
                            />
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="+1 (555) 000-0000"
                              defaultValue="+1 (555) 123-4567"
                              style={{
                                paddingLeft: '40px',
                                borderRadius: '8px',
                                border: '1px solid var(--obeeoma-border)',
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label" style={{ fontWeight: '500', fontSize: '14px' }}>
                            Address
                          </label>
                          <div className="position-relative">
                            <MapPin
                              size={16}
                              style={{
                                position: 'absolute',
                                left: '12px',
                                top: '16px',
                                color: 'var(--obeeoma-text-muted)',
                              }}
                            />
                            <textarea
                              className="form-control"
                              rows={3}
                              placeholder="123 Main St, City, State, ZIP"
                              defaultValue="123 Business Blvd, San Francisco, CA 94105"
                              style={{
                                paddingLeft: '40px',
                                borderRadius: '8px',
                                border: '1px solid var(--obeeoma-border)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
                      Notification Preferences
                    </h3>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                            Email Notifications
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                            Receive updates via email
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            style={{ cursor: 'pointer', width: '48px', height: '24px' }}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                            Weekly Reports
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                            Get weekly wellness summaries
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            style={{ cursor: 'pointer', width: '48px', height: '24px' }}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                            Alert Notifications
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--obeeoma-text-muted)' }}>
                            Get notified of critical alerts
                          </div>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            style={{ cursor: 'pointer', width: '48px', height: '24px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
                      Security
                    </h3>
                    <div className="d-flex flex-column gap-3">
                      <button
                        className="btn btn-outline-secondary text-start"
                        style={{
                          borderRadius: '8px',
                          padding: '12px 16px',
                          border: '1px solid var(--obeeoma-border)',
                        }}
                      >
                        Change Password
                      </button>
                      <button
                        className="btn btn-outline-secondary text-start"
                        style={{
                          borderRadius: '8px',
                          padding: '12px 16px',
                          border: '1px solid var(--obeeoma-border)',
                        }}
                      >
                        Two-Factor Authentication
                      </button>
                      <button
                        className="btn btn-outline-secondary text-start"
                        style={{
                          borderRadius: '8px',
                          padding: '12px 16px',
                          border: '1px solid var(--obeeoma-border)',
                        }}
                      >
                        Session Management
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="col-12">
                <div className="d-flex justify-content-end gap-3">
                  <button
                    className="btn btn-outline-secondary"
                    style={{
                      borderRadius: '8px',
                      padding: '10px 24px',
                      border: '1px solid var(--obeeoma-border)',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn text-white d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: 'var(--obeeoma-primary)',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      border: 'none',
                    }}
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployerAccountSettings;
