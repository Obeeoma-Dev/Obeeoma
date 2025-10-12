"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ui/sidebar.tsx
// ------------------------------------------------------
// PURPOSE:
// This file contains only React components related to
// rendering the Sidebar UI. All non-component logic
// (like context or hooks) has been moved to use-sidebar.ts.
// ------------------------------------------------------
import * as React from "react";
import { cn } from "@/lib/utils"; // Utility for combining CSS classes
import { SidebarContext, useSidebar, SIDEBAR_WIDTH } from "./use-sidebar"; // Import logic from use-sidebar.ts
// SidebarProvider — wraps part of your app where the sidebar will be used.
// It provides state (isOpen, toggleSidebar) to all nested components.
export function SidebarProvider({ children }) {
    // React state to track sidebar open/close
    const [isOpen, setIsOpen] = React.useState(false);
    // Function to toggle sidebar visibility
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    return (
    // Provide these values to all nested components
    _jsx(SidebarContext.Provider, { value: { isOpen, toggleSidebar }, children: children }));
}
// Sidebar — main sidebar container component
export function Sidebar({ children }) {
    const { isOpen } = useSidebar(); // useSidebar hook gives access to context
    return (_jsx("aside", { 
        // Apply dynamic class based on whether sidebar is open or closed
        className: cn("fixed left-0 top-0 h-full transition-all duration-300 bg-gray-900 text-white shadow-lg z-50", isOpen ? "translate-x-0" : `-translate-x-[${SIDEBAR_WIDTH}]`), style: { width: SIDEBAR_WIDTH }, children: children }));
}
// SidebarTrigger — button that toggles sidebar visibility
export function SidebarTrigger() {
    const { toggleSidebar } = useSidebar(); // Access the toggle function from context
    return (_jsx("button", { onClick: toggleSidebar, className: "p-2 m-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none", "aria-label": "Toggle sidebar", children: _jsx("svg", { className: "w-6 h-6 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }));
}
// SidebarGroup — optional grouping for sidebar items
export function SidebarGroup({ title, children, }) {
    return (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "px-4 text-xs uppercase text-gray-400", children: title }), _jsx("div", { className: "mt-2", children: children })] }));
}
// SidebarItem — individual clickable item
export function SidebarItem({ label, onClick, }) {
    return (_jsx("button", { onClick: onClick, className: "block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors", children: label }));
}
