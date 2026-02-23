import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
// import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";
import AppearenceSettings from "./../Appearencesettingscomp/appearancesettings";
import NotificationSettings from "./notificationSettings";
import SecuritySettings from "./securitySettings";

// Placeholder data for subscription plans
const subscriptionPlans = [  
  {
    id: "1",
    name: "Freemium",
    organization: "TechStart Inc",    
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Email support",      
    ],
    isPopular: true,
  },
  {
    id: "2",
    name: "Premium",
    organization: "Global Enterprise",
    monthlyPrice: 24.99,
    annualPrice: 251.99,
    employeeLimit: 0,
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Email support",
      "Access to live webinars",
      "Client engagement tools",      
      "Advanced analytics",
      "Custom integrations",
      "Priority support",
    ],
  },
];

const SettingsTabs: React.FC = () => {
  // State to track which tab is currently active; default is "account"
  const [key, setKey] = useState<string>("account");

  return (
    <div className="p-3 settings-main-container">
      {/* Tabs components with controlled activeKey to manage selected tab */}
      <Tabs
        id="settings-tabs"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="settings-nav mb-3 border-bottom"
      >
        {/* Tab for Account settings */}
        <Tab eventKey="account" title="Account">
          <div style={{ paddingTop: 10 }}>
            <AccountForm />
          </div>
        </Tab>

        {/* Tab for Security settings */}
        <Tab eventKey="security" title="Security">
          <div style={{ paddingTop: 10 }}>
            <SecuritySettings />
          </div>
        </Tab>

        {/* Tab for Notification preferences */}
        <Tab eventKey="notifications" title="Notifications">
          <div style={{ paddingTop: 10 }}>
            <NotificationSettings />
          </div>
        </Tab>

        {/* Tab for Appearance customization */}
        <Tab eventKey="appearance" title="Appearance">
          <div style={{ paddingTop: 10 }}>
            <AppearenceSettings />
          </div>
        </Tab>

        {/* Tab for Subscription details */}
        {/* <Tab eventKey="subscription" title="Subscription">
          <div style={{ paddingTop: 10 }}>
            <SubscriptionSettingsComp plans={subscriptionPlans} />
          </div>
        </Tab> */}

        {/* Tab for Feature flags */}
        <Tab eventKey="feature-flags" title="Feature Flags">
          <div style={{ paddingTop: 10 }}>
            <FeatureFlags />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SettingsTabs;
