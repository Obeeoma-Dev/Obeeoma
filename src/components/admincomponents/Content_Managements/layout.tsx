// components/Layout.tsx
// This file defines the main application layout using React-Bootstrap utilities.

import React from "react"; 
import AdminSidebar from "../adminsidebar"; 
import Header from "../adminheader"; 

// Define the props for the Layout component: children for page content and an optional title
interface LayoutProps {
  children: React.ReactNode; 
  title?: string; 
}


export function Layout({ children, title = "Dashboard" }: LayoutProps) {
  return (
    // Root wrapper: full viewport height, light background (Bootstrap), and semantic font defaults
    <div className="d-flex vh-100">
      {/* Sidebar on the left */}
      <AdminSidebar />

      {/* Main content area (right column) */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        {/* Render your existing Sidebar component (Bootstrap-styled internally) */}
        <Header />

        {/* Scrollable content area below the header */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Constrain line-length to a readable max width (similar to max-w-7xl) */}
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Render page-specific content (e.g., the "Media Library" upload form and table) */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
