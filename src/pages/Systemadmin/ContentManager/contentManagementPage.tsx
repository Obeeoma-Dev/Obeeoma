// pages/ContentManagement.tsx
// This page composes your Media Library using React-Bootstrap-only styling.
// It renders the heading, the UploadZone, and the ContentTable inside your Layout.
// Tailwind classes are removed; spacing and typography use inline styles for clarity.

import React from "react";
import { useDispatch } from "react-redux";
import { LayoutWrapper } from "../../../components/admincomponents/Content_Managements/layout";
import { UploadZone } from "../../../components/admincomponents/Content_Managements/uploadZone";
import { ContentTable } from "../../../components/admincomponents/Content_Managements/contentTable";
import { AppDispatch } from "../../../store/store";
import { fetchAllContent } from "../../../store/slices/contentSlice";

// Export the page component so it can be routed/used elsewhere
export function ContentManagement() {
  const dispatch = useDispatch<AppDispatch>();

  const handleUploadSuccess = () => {
    // Refresh table immediately after upload (same as delete behavior)
    dispatch(fetchAllContent());
    console.log("Content uploaded and table refreshed!");
  };

  // Return the structured page using the shared Layout wrapper
  return (
    // Layout provides the fixed sidebar, sticky header, and a scrollable content region
    <LayoutWrapper title="Content Management">
      {/* Upload card: drag-and-drop area, file preview, metadata form, and submit button */}
      <UploadZone onUploadSuccess={handleUploadSuccess} />

      {/* Spacer between the upload card and the table */}
      <div
        // Top margin to visually separate sections, matching your original spacing
        style={{ marginTop: 32 }}
      >
        {/* Content table: lists existing media with type icon, status badge, and actions */}
        <ContentTable />
      </div>
    </LayoutWrapper>
  );
}
