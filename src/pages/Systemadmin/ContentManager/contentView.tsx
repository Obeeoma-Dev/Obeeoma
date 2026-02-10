// pages/ContentDetail.tsx
// This page renders the VideoDetail component with proper SystemAdminLayout
// Following the same pattern as other admin interfaces

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { VideoDetail } from "../../../components/admincomponents/Content_Managements/VideoDetail";
import { contentMediaAPI, ContentItem } from "../../../services/contentService";

export function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contentItem, setContentItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) {
        setError("No content ID provided");
        setLoading(false);
        return;
      }

      try {
        // Fetch specific content item by ID
        const data = await contentMediaAPI.getAllContent();
        const item = data.find(item => item.id === parseInt(id));

        if (item) {
          setContentItem(item);
        } else {
          setError("Content not found");
        }
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const handleBack = () => {
    navigate("/system-admin/content-management");
  };

  if (loading) {
    return (
      <SystemAdminLayout title="Loading Content...">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </SystemAdminLayout>
    );
  }

  if (error || !contentItem) {
    return (
      <SystemAdminLayout title="Error">
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="text-center">
            <h3 className="text-danger mb-3">Error</h3>
            <p className="text-muted">{error || "Content not found"}</p>
            <button
              className="btn btn-primary"
              onClick={handleBack}
            >
              Back to Content Management
            </button>
          </div>
        </div>
      </SystemAdminLayout>
    );
  }

  return (
    <VideoDetail
      item={contentItem}
      onBack={handleBack}
      useLayout={true}
    />
  );
}
