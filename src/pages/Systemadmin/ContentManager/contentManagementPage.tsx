// pages/ContentManagement.tsx
// This page composes your Media Library using React-Bootstrap-only styling.
// It renders the heading, the UploadZone, and the ContentTable inside your Layout.
// Tailwind classes are removed; spacing and typography use inline styles for clarity.

import React, { useState } from 'react'; // Import React to define the component
import { LayoutWrapper } from '../../../components/admincomponents/Content_Managements/layout'; // Import the app-wide layout (sidebar + header + scrollable content area)
import { UploadZone } from '../../../components/admincomponents/Content_Managements/uploadZone'; // Import the upload card component (React-Bootstrap version)
import { ContentTable } from '../../../components/admincomponents/Content_Managements/contentTable'; // Import the content table component (React-Bootstrap version)
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Export the page component so it can be routed/used elsewhere
export function ContentManagement() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    toast.success("Content saved successfully!", {
      position: "top-right", // you can change to "top-center", "bottom-left", etc.
      autoClose: 3000, // auto dismiss after 3s
      hideProgressBar: false, // show progress bar
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored", // "light", "dark", or "colored"
    });
  };

    // Return the structured page using the shared Layout wrapper
    return (
        // Layout provides the fixed sidebar, sticky header, and a scrollable content region
        <LayoutWrapper title="Content Management">

            {/* Toast container must be rendered once */}
            <ToastContainer />

            {/* Upload card: drag-and-drop area, file preview, metadata form, and submit button */}
            <UploadZone onUploadSuccess={handleUploadSuccess} />

            {/* Spacer between the upload card and the table */}
            <div
                // Top margin to visually separate sections, matching your original spacing
                style={{ marginTop: 32 }}
            >
                {/* Content table: lists existing media with type icon, status badge, and actions */}
                <ContentTable key={refreshKey} />
            </div>
        </LayoutWrapper>
    );
}
