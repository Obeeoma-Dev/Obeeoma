// Import React and the useState hook for managing component state
import React, { useState } from "react";

// Import Tabs and Tab components from React-Bootstrap
import { Tabs, Tab } from "react-bootstrap";

// Import the AccountForm component to be rendered inside the "Account" tab
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";



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
    // Tabs components with controlled activeKey to manage selected tab
    <Tabs
      id="settings-tabs" // Unique ID for accessibility
      activeKey={key}
      onSelect={(k) => k && setKey(k)} // Updates active tab when a new one is selected
      className="mb-3" // Bottom margin for spacing
    >
      {/* Tab for Account settings */}
      <Tab eventKey="account" title="Account">
        <AccountForm />
      </Tab>

      {/* Tab for Security settings */}
      <Tab eventKey="security" title="Security">
        <p>Security settings go here. </p>
      </Tab>

      {/* Tab for Notification preferences */}
      <Tab eventKey="notifications" title="Notifications">
        <p>Notification preferences go here. </p>
      </Tab>

      {/* Tab for Appearance customization */}
      <Tab eventKey="appearance" title="Appearance">
        <p>Theme and layout settings go here. </p>
      </Tab>

      {/* Tab for Subscription details */}
      <Tab eventKey="subscription" title="Subscription">
        <SubscriptionSettingsComp plans={subscriptionPlans}  />
      </Tab>

      {/* Tab for Feature flags */}
      <Tab eventKey="feature-flags" title="Feature Flags">
        <FeatureFlags />
      </Tab>
    </Tabs>
  );
};

export default SettingsTabs;
