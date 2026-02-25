import React from "react";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";

// Placeholder data for subscription plans
const subscriptionPlans = [
  {
    id: "1",
    name: "Freemium",
    organization: "Acme Corp",
    monthlyPrice: 0,
    annualPrice: 0,
    employeeLimit: 10,
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Email support",
    ],
  },
  {
    id: "2",
    name: "Premium",
    organization: "TechStart Inc",
    monthlyPrice: 24.99,
    annualPrice: 251.99,
    employeeLimit: 0,
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Email support",
      "Access to live webinars",
      "Client engagement tools",
      "Dedicated support team",
    ],
    isPopular: true,
  },
];

const SubscriptionSettingsPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Page title */}
      <div style={{ padding: "1.5rem", borderBottom: "1px solid #dee2e6" }}>
        <h2 style={{ margin: 0, fontFamily: "heading" }}>
          Subscription Settings
        </h2>
      </div>

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
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Subscription cards grid */}
          <SubscriptionSettingsComp plans={subscriptionPlans} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettingsPage;
