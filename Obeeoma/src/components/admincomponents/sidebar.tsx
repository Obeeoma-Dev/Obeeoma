// Sidebar navigation component for the dashboard

import React, { useState } from 'react';
import * as Icons from 'lucide-react';

/**
 * Interface for navigation menu items
 */
interface MenuItem {
  // Unique identifier for the menu item
  id: string;
  // Display label
  label: string;
  // Icon name from lucide-react
  icon: string;
  // Whether this item is currently active
  active: boolean;
}

/**
 * Sidebar component provides navigation for different sections of the dashboard
 * Includes logo, main menu items, and bottom actions
 */
const Sidebar: React.FC = () => {
  // State to track which menu item is currently active
  const [activeItem, setActiveItem] = useState<string>('overview');

  // Array of main navigation menu items
  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard', active: true },
    { id: 'organizations', label: 'Organizations', icon: 'Building2', active: false },
    { id: 'client-engagement', label: 'Client Engagement', icon: 'Users', active: false },
    { id: 'ai-management', label: 'AI Management', icon: 'Brain', active: false },
    { id: 'hotline-activity', label: 'Hotline Activity', icon: 'Phone', active: false },
    { id: 'subscriptions', label: 'Subscriptions', icon: 'CreditCard', active: false },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', active: false },
  ];

  /**
   * Handles click on a menu item to set it as active
   * @param id - The id of the clicked menu item
   */
  const handleMenuClick = (id: string) => {
    setActiveItem(id);
  };

  return (
    // Main sidebar container with dark background
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      {/* Logo section at the top */}
      <div className="p-6 border-b border-gray-800">
        {/* Logo container with icon and text */}
        <div className="flex items-center gap-3">
          {/* Logo icon with emerald background */}
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Icons.Shield className="w-6 h-6 text-white" />
          </div>
          {/* Brand name */}
          <span className="text-lg font-semibold">Comestro</span>
        </div>
      </div>

      {/* Main navigation menu */}
      <nav className="flex-1 px-3 py-6">
        {/* Map through menu items and render each one */}
        {menuItems.map((item) => {
          // Get the icon component dynamically
          const IconComponent = (Icons as any)[item.icon] || Icons.Circle;
          // Check if this item is currently active
          const isActive = activeItem === item.id;

          return (
            // Menu item button with conditional styling
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                transition-all duration-200
                ${isActive
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              {/* Menu item icon */}
              <IconComponent className="w-5 h-5" />
              {/* Menu item label */}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom actions section */}
      <div className="p-3 border-t border-gray-800">
        {/* Settings button */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all mb-1">
          <Icons.Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        {/* Log out button */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
          <Icons.LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
