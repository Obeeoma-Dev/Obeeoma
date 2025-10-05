// Header component with search bar and user profile

import React from 'react';
import { Search, Bell, User } from 'lucide-react';

/**
 * Header component displays the top bar with search functionality and user profile
 * Includes notification badge and admin identification
 */
const Header: React.FC = () => {
  return (
    // Main header container with white background and bottom border
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      {/* Flex container to space items between left and right */}
      <div className="flex items-center justify-between">
        {/* Left section: Search bar */}
        <div className="flex-1 max-w-xl">
          {/* Search input container with icon */}
          <div className="relative">
            {/* Search icon positioned absolutely inside the input */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {/* Search input field with left padding for icon */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right section: Notifications and user profile */}
        <div className="flex items-center gap-6">
          {/* Notification bell with badge */}
          <button className="relative">
            {/* Bell icon */}
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" />
            {/* Red notification badge showing count */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              2
            </span>
          </button>

          {/* User profile section */}
          <div className="flex items-center gap-3">
            {/* User information text */}
            <div className="text-right">
              {/* Admin label */}
              <div className="text-xs text-gray-500">Dr.</div>
              {/* Admin name */}
              <div className="text-sm font-medium text-gray-900">System Admin Comestro</div>
            </div>
            {/* User avatar circle */}
            <div className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center">
              {/* User icon inside avatar */}
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
