// components/Layout.tsx
// This file defines the main application layout using React-Bootstrap utilities.

import React from "react";
import SystemAdminLayout from "../shared/SystemAdminLayout";

// Define the props for the Layout component: children for page content and an optional title
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}


export function LayoutWrapper({ children, title = "Dashboard" }: LayoutProps) {
  return (
    <SystemAdminLayout title={title}>
      {/* Constrain line-length to a readable max width (similar to max-w-7xl) */}
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Render page-specific content (e.g., the "Media Library" upload form and table) */}
        {children}
      </div>
    </SystemAdminLayout>
  );
}
