// Import React and the useState hook for managing component state
import React, { useState } from 'react';

// Import Tabs and Tab components from React-Bootstrap
import { Tabs, Tab } from 'react-bootstrap';

// Import the AccountForm component to be rendered inside the "Account" tab
import AccountForm from './AccountForm';

/*
 * SettingsTabs component renders a tabbed interface for different settings sections.
 * It uses React-Bootstrap's Tabs and Tab components to organize content.
 */
const SettingsTabs: React.FC = () => {
  // State to track which tab is currently active; default is "account"
  const [key, setKey] = useState<string>('account');

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
        <p>Security settings go here.</p>
      </Tab>

      {/* Tab for Notification preferences */}
      <Tab eventKey="notifications" title="Notifications">
        <p>Notification preferences go here.</p>
      </Tab>

      {/* Tab for Appearance customization */}
      <Tab eventKey="appearance" title="Appearance">
        <p>Theme and layout settings go here.</p>
      </Tab>

      {/* Tab for Subscription details */}
      <Tab eventKey="subscription" title="Subscription">
        <p>Subscription details go here.</p>
      </Tab>
    </Tabs>
  );
};


export default SettingsTabs;