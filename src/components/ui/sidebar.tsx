"use client";
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
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // React state to track sidebar open/close
  const [isOpen, setIsOpen] = React.useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    // Provide these values to all nested components
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Sidebar — main sidebar container component
export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar(); // useSidebar hook gives access to context

  return (
    <aside
      // Apply dynamic class based on whether sidebar is open or closed
      className={cn(
        "fixed left-0 top-0 h-full transition-all duration-300 bg-gray-900 text-white shadow-lg z-50",
        isOpen ? "translate-x-0" : `-translate-x-[${SIDEBAR_WIDTH}]`,
      )}
      style={{ width: SIDEBAR_WIDTH }}
    >
      {children}
    </aside>
  );
}

// SidebarTrigger — button that toggles sidebar visibility
export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar(); // Access the toggle function from context

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 m-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none"
      aria-label="Toggle sidebar"
    >
      {/* Simple hamburger icon */}
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}

// SidebarGroup — optional grouping for sidebar items
export function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <h3 className="px-4 text-xs uppercase text-gray-400">{title}</h3>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// SidebarItem — individual clickable item
export function SidebarItem({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors"
    >
      {label}
    </button>
  );
}

// ------------------------------------------------------
// ESLint / Prettier / Jest Notes:
// - No non-component exports (only components here).
// - Uses `useSidebar` from another file (which is .ts).
// - All components are functional React components.
// - Will pass ESLint’s react-refresh/only-export-components rule.
// ------------------------------------------------------
