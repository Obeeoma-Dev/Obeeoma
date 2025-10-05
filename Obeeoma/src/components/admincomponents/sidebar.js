import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Sidebar navigation component for the dashboard
import { useState } from 'react';
import * as Icons from 'lucide-react';
/**
 * Sidebar component provides navigation for different sections of the dashboard
 * Includes logo, main menu items, and bottom actions
 */
const Sidebar = () => {
    // State to track which menu item is currently active
    const [activeItem, setActiveItem] = useState('overview');
    // Array of main navigation menu items
    const menuItems = [
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
    const handleMenuClick = (id) => {
        setActiveItem(id);
    };
    return (
    // Main sidebar container with dark background
    _jsxs("aside", { className: "w-64 bg-gray-900 text-white flex flex-col h-screen", children: [_jsx("div", { className: "p-6 border-b border-gray-800", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-emerald-500 p-2 rounded-lg", children: _jsx(Icons.Shield, { className: "w-6 h-6 text-white" }) }), _jsx("span", { className: "text-lg font-semibold", children: "Comestro" })] }) }), _jsx("nav", { className: "flex-1 px-3 py-6", children: menuItems.map((item) => {
                    // Get the icon component dynamically
                    const IconComponent = Icons[item.icon] || Icons.Circle;
                    // Check if this item is currently active
                    const isActive = activeItem === item.id;
                    return (
                    // Menu item button with conditional styling
                    _jsxs("button", { onClick: () => handleMenuClick(item.id), className: `
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                transition-all duration-200
                ${isActive
                            ? 'bg-emerald-500 text-white shadow-lg'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `, children: [_jsx(IconComponent, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm font-medium", children: item.label })] }, item.id));
                }) }), _jsxs("div", { className: "p-3 border-t border-gray-800", children: [_jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all mb-1", children: [_jsx(Icons.Settings, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm font-medium", children: "Settings" })] }), _jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all", children: [_jsx(Icons.LogOut, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm font-medium", children: "Log Out" })] })] })] }));
};
export default Sidebar;
