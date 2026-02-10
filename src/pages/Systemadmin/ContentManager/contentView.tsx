// pages/ContentDetail.tsx
// This page renders the VideoDetail component with proper SystemAdminLayout
// Following the same pattern as other admin interfaces

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { VideoDetail } from "../../../components/admincomponents/Content_Managements/VideoDetail";
import {
  selectSelectedContent,
  selectContentLoading,
  selectContentError,
  fetchContentById,
  setSelectedContent
} from "../../../store/slices/contentSlice";
import { RootState, AppDispatch } from "../../../store/store";

export function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Use Redux selectors instead of local state
  const contentItem = useSelector(selectSelectedContent);
  const loading = useSelector(selectContentLoading);
  const error = useSelector(selectContentError);

  useEffect(() => {
    if (!id) {
      return;
    }

    // Check if content is already cached in Redux
    if (contentItem && contentItem.id === parseInt(id)) {
      // Content already cached, no need to fetch
      return;
    }

    // Fetch content if not cached or if ID doesn't match
    dispatch(fetchContentById(id));
  }, [id, contentItem, dispatch]);

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
