import React from "react";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";

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

const SubscriptionSettingsPage: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar stays fixed on the left */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div style={{ flexGrow: 1 }}>
        <AdminHeader />

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
          }}
        >

          {/* Page title */}
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #dee2e6" }}>
            <h2 style={{ margin: 0 }}>Subscription Settings</h2>
          </div>

          {/* Subscription cards grid */}
          <SubscriptionSettingsComp plans={subscriptionPlans} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettingsPage;
import React from "react";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";

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

const SubscriptionSettingsPage: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar stays fixed on the left */}
      <div style={{ width: "250px", flexShrink: 0 }}>
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div style={{ flexGrow: 1 }}>
        <AdminHeader />

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
          }}
        >

          {/* Page title */}
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #dee2e6" }}>
            <h2 style={{ margin: 0 }}>Subscription Settings</h2>
          </div>

          {/* Subscription cards grid */}
          <SubscriptionSettingsComp plans={subscriptionPlans} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettingsPage;