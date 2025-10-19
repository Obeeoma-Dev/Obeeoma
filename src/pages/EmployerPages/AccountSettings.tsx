import { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import SettingsNavigation from "../../components/employercomponents/employersettings/SettingsNavigation";
import AccountSection from "../../components/employercomponents/employersettings/AccountSection";
import NotificationsSection from "../../components/employercomponents/employersettings/NotificationSettings";
import PrivacySection from "../../components/employercomponents/employersettings/PrivacySection";
import { Save } from "lucide-react";

const EmployerAccountProfile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [accountData, setAccountData] = useState({
    organizationName: "Acme Corporation",
    adminUser: "Admin User",
    email: "admin@example.com",
    password: "••••••••",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    weeklyReports: true,
    browserNotifications: false,
    reportGeneration: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    anonymizeData: true,
    enhancedPrivacy: false,
    dataRetentionPeriod: 90,
  });

  const handleSaveChanges = () => {
    console.log("Saving changes:", { accountData, notificationSettings, privacySettings });
    alert("Settings saved successfully!");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return (
          <AccountSection 
            accountData={accountData} 
            onAccountDataChange={setAccountData} 
          />
        );
      case "notifications":
        return (
          <NotificationsSection 
            notificationSettings={notificationSettings}
            onNotificationSettingsChange={setNotificationSettings}
          />
        );
      case "privacy":
        return (
          <PrivacySection 
            privacySettings={privacySettings}
            onPrivacySettingsChange={setPrivacySettings}
          />
        );
      default:
        return (
          <AccountSection 
            accountData={accountData} 
            onAccountDataChange={setAccountData} 
          />
        );
    }
  };

  return (
    <Layout title="Settings">
      <div className="container-fluid py-4">
        {/* Horizontal Navigation Bar */}
        <div className="row mb-4">
          <div className="col-12">
            <SettingsNavigation 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>
        </div>

        {/* Settings Content */}
        <div className="row">
          <div className="col-12">
            {renderSection()}
            
            {/* Save Changes Button */}
            <div className="mt-4">
              <button
                onClick={handleSaveChanges}
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerAccountProfile;