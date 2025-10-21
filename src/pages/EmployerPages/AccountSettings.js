import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                return (_jsx(AccountSection, { accountData: accountData, onAccountDataChange: setAccountData }));
            case "notifications":
                return (_jsx(NotificationsSection, { notificationSettings: notificationSettings, onNotificationSettingsChange: setNotificationSettings }));
            case "privacy":
                return (_jsx(PrivacySection, { privacySettings: privacySettings, onPrivacySettingsChange: setPrivacySettings }));
            default:
                return (_jsx(AccountSection, { accountData: accountData, onAccountDataChange: setAccountData }));
        }
    };
    return (_jsx(Layout, { title: "Settings", children: _jsxs("div", { className: "container-fluid py-4", children: [_jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12", children: _jsx(SettingsNavigation, { activeSection: activeSection, onSectionChange: setActiveSection }) }) }), _jsx("div", { className: "row", children: _jsxs("div", { className: "col-12", children: [renderSection(), _jsx("div", { className: "mt-4", children: _jsxs("button", { onClick: handleSaveChanges, className: "btn btn-primary d-flex align-items-center gap-2", children: [_jsx(Save, { size: 18 }), "Save Changes"] }) })] }) })] }) }));
};
export default EmployerAccountProfile;
