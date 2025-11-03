import { User, Bell, Shield } from "lucide-react";

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsNavigation = ({ activeSection, onSectionChange }: SettingsNavigationProps) => {
  const settingsSections: SettingsSection[] = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <nav className="nav nav-pills nav-fill">
              {settingsSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`nav-link d-flex align-items-center gap-2 py-2 px-3 ${
                      activeSection === section.id 
                        ? 'active bg-success text-white' 
                        : 'text-dark'
                    }`}
                    style={{ 
                      borderRadius: "8px",
                      border: "none",
                      margin: "0 4px"
                    }}
                  >
                    <IconComponent size={16} />
                    <span className="fw-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsNavigation;