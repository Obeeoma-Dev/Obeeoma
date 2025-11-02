import { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import SettingsNavigation from "../../components/employercomponents/employersettings/SettingsNavigation";
import AccountSection from "../../components/employercomponents/employersettings/AccountSection";
import NotificationsSection from "../../components/employercomponents/employersettings/NotificationSettings";
import PrivacySection from "../../components/employercomponents/employersettings/PrivacySection";
import { Save, Logout } from "lucide-react";

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
      <div className="container-fluid py-4 px-3">
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
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            {renderSection()}
            
            {/* Save Changes Button */}
            <div className="mt-4 d-flex justify-content-end gap-3">
              <button
                onClick={handleSaveChanges}
                className="btn btn-success d-flex align-items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
              <button
                onClick={handleSaveChanges}
                className="btn btn-success d-flex align-items-center gap-2"
              >
                <Logout size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerAccountProfile;