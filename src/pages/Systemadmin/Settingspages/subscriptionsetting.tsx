import React from "react";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";

const SubscriptionSettingsPage: React.FC = () => {
  // Subscription plans will be fetched by the SubscriptionSettingsComp component
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
          {/* Subscription cards grid - will fetch data from backend */}
          <SubscriptionSettingsComp plans={[]} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettingsPage;
