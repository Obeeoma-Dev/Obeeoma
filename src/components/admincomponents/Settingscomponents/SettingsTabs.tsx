// Import React and the useState hook for managing component state
import React, { useState } from "react";

// Import Tabs and Tab components from React-Bootstrap
import { Tabs, Tab } from "react-bootstrap";

// Import the AccountForm component to be rendered inside the "Account" tab
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";
import AppearenceSettings from "./../Appearencesettingscomp/appearancesettings";
import NotificationSettings from "./notificationSettings";
import SecuritySettings from "./securitySettings";

// Placeholder data for subscription plans
const subscriptionPlans = [
  {
    name: "Basic",
    price: "$5.99/month",
    billingNote: "Billed annually (save $12)",
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Up to 10 employees",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$12.99/month",
    billingNote: "Billed annually (save $24)",
    features: [
      "All Basic features",
      "Weekly check-ins",
      "Dedicated support team",
      "Up to 50 employees",
      "Chat support",
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: "$24.99/month",
    billingNote: "Billed annually (save $48)",
    features: [
      "All Professional features",
      "Daily check-ins",
      "24/7 crisis support",
      "Custom solutions",
      "Unlimited employees",
    ],
  },
];

/*
 * SettingsTabs component renders a tabbed interface for different settings sections.
 * It uses React-Bootstrap's Tabs and Tab components to organize content.
 */

const SettingsTabs: React.FC = () => {
  // State to track which tab is currently active; default is "account"
  const [key, setKey] = useState<string>("account");

  return (
    <div className="p-3 settings-main-container">
      {/* Tabs components with controlled activeKey to manage selected tab */}
      <Tabs
        id="settings-tabs" // Unique ID for accessibility
        activeKey={key}
        onSelect={(k) => k && setKey(k)} // Updates active tab when a new one is selected
        className="settings-nav mb-3 border-bottom" // Bottom margin for spacing and custom styles
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
        <Tab eventKey="subscription" title="Subscription">
          <div style={{ paddingTop: 10 }}>
            <SubscriptionSettingsComp plans={subscriptionPlans} />
          </div>
        </Tab>

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
