// components/ContentTable.tsx
// This component renders the "Content Library" table from your Media Library.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  PlayCircle,
  Image as ImageIcon,
  FileText,
  Music,
  CheckCircle2,
  Clock,
  MoreVertical,
} from "lucide-react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { toast, ToastContainer } from "react-toastify";
import { contentMediaAPI, ContentItem } from "../../../services/contentService";
import {
  selectContentItems,
  selectContentLoading,
  selectContentError,
  selectContentLastFetched,
  fetchAllContent,
  setSelectedContent,
  deleteContent,
} from "../../../store/slices/contentSlice";
import { RootState, AppDispatch } from "../../../store/store";
// import { VideoDetail } from "./VideoDetail";
import { ActionModal } from "../Reusedcomponents/ActionModal";
import { ConfirmModal } from "../Reusedcomponents/ConfirmModal";
import "react-toastify/dist/ReactToastify.css";

// Helper component: render icon or image based on content type
const TypeIcon = ({
  type,
  public_url,
  s3_key,
}: {
  type: ContentItem["media_type"];
  public_url?: string;
  s3_key?: string;
}) => {
  if (type === "image" && (public_url || s3_key)) {
    // Use public_url if available, otherwise construct from s3_key
    const src =
      public_url ||
      (s3_key ? `http://127.0.0.1:8000/media/${s3_key}` : undefined);
    if (src) {
      return (
        <Image
          src={src}
          rounded
          style={{ width: 40, height: 40, objectFit: "cover" }}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.src = "https://placehold.co/40x40?text=No+Image";
          }}
        />
      );
    }
  }

  switch (type) {
    case "video":
      return <PlayCircle size={20} color="#0d6efd" />;
    case "audio":
      return <Music size={20} color="#6f42c1" />;
    case "image":
      return <ImageIcon size={20} color="#198754" />;
    default:
      return <FileText size={20} color="#6c757d" />;
  }
};

// Helper component: render badge based on status
const StatusBadge = ({ status }: { status: ContentItem["status"] }) => {
  // Map status to Bootstrap background/text colors
  const styles: Record<ContentItem["status"], React.CSSProperties> = {
    published: { backgroundColor: "#d1e7dd", color: "#0f5132" },
    draft: { backgroundColor: "#fff3cd", color: "#664d03" },
    processing: { backgroundColor: "#cfe2ff", color: "#084298" },
  };

  // Map status to labels
  const labels: Record<ContentItem["status"], string> = {
    published: "Published",
    draft: "Draft",
    processing: "Processing",
  };

  return (
    <span
      style={{
        ...styles[status],
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    >
      {/* Add icon depending on status */}
      {status === "published" && (
        <CheckCircle2 size={12} style={{ marginRight: 4 }} />
      )}
      {status === "processing" && (
        <Clock size={12} style={{ marginRight: 4 }} />
      )}
      {labels[status]}
    </span>
  );
};

// Main component: renders the content table
export function ContentTable({ key }: { key?: number }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Use Redux selectors instead of local state
  const contentData = useSelector(selectContentItems);
  const loading = useSelector(selectContentLoading);
  const error = useSelector(selectContentError);
  const lastFetched = useSelector(selectContentLastFetched);

  // Local state for modals
  const [showActionModal, setShowActionModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    // Force refresh data when component mounts
    dispatch(fetchAllContent());
  }, [dispatch]);

  // Action handlers
  const handleViewContent = (item: ContentItem) => {
    dispatch(setSelectedContent(item));
    navigate(`/system-admin/content-management/view/${item.id}`);
  };

  const handleEditContent = (item: ContentItem) => {
    // TODO: Implement edit functionality
    console.log("Edit content:", item);
    // Navigate to edit page or open edit modal
  };

  const handleDeleteClick = (item: ContentItem) => {
    setSelectedItem(item);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      try {
        console.log("Deleting content:", selectedItem);

        // Close modal immediately to prevent double-clicks
        setShowConfirmModal(false);

        // Show loading toast
        const toastId = toast.loading("Deleting content...", {
          position: "top-right",
        });

        // Dispatch delete action to call API and update state
        await dispatch(deleteContent(selectedItem.id)).unwrap();

        // Update toast to success
        toast.update(toastId, {
          render: `"${selectedItem.title}" deleted successfully!`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        });

        console.log("Content deleted successfully");

        // Clear selection
        setSelectedItem(null);
      } catch (error) {
        console.error("Failed to delete content:", error);

        // Show error toast
        toast.error(
          `Failed to delete "${selectedItem.title}". Please try again.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          },
        );

        // Refetch data on error to restore correct state
        dispatch(fetchAllContent());

        // Ensure modal is closed on error too
        setShowConfirmModal(false);
        setSelectedItem(null);
      }
    }
  };

  const handleActionClick = (item: ContentItem) => {
    setSelectedItem(item);
    setShowActionModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ToastContainer />
      <Card style={{ borderRadius: 12 }}>
        {/* Header with title and filters */}
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "heading",
          }}
        >
          <h3 style={{ margin: 0, fontFamily: "heading" }}>Content Library</h3>
          {/* Filters: type and status dropdowns */}
          <Stack direction="horizontal" gap={2} style={{ fontFamily: "body" }}>
            <Form.Select size="sm">
              <option>All Types</option>
              <option>Video</option>
              <option>Audio</option>
              <option>Image</option>
            </Form.Select>
            <Form.Select size="sm">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </Form.Select>
          </Stack>
        </Card.Header>

        {/* Table body */}
        <div style={{ overflowX: "auto", fontFamily: "body" }}>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Content</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Size</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentData.map((item) => (
                <tr key={item.id}>
                  {/* Content cell: icon + title + type */}
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      {/* Icon bubble */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          backgroundColor: "#f8f9fa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TypeIcon
                          type={item.media_type}
                          public_url={item.public_url}
                          s3_key={item.s3_key}
                        />
                      </div>
                      {/* Title and type */}
                      <div>
                        <div>{item.title}</div>
                        <div
                          style={{
                            color: "#6c757d",
                            textTransform: "capitalize",
                          }}
                        >
                          <div>{item.media_type}</div>
                        </div>
                      </div>
                    </Stack>
                  </td>

                  {/* Category */}
                  <td style={{ color: "#6c757d" }}>{item.category || "N/A"}</td>

                  {/* Status */}
                  <td>
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Date */}
                  <td style={{ color: "#6c757d" }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  {/* Size */}
                  <td style={{ color: "#6c757d" }}>
                    {item.file_size || "N/A"}
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: "right" }}>
                    <Button
                      variant="light"
                      size="sm"
                      style={{ borderRadius: 999 }}
                      aria-label="Actions"
                      onClick={() => handleActionClick(item)}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination footer */}
        <Card.Footer
          className="d-flex justify-content-between align-items-center"
          style={{ padding: "16px 24px", backgroundColor: "#f8f9fa" }}
        >
          <div style={{ color: "#6c757d", fontSize: "14px" }}>
            Showing {contentData.length} items
          </div>
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-secondary" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline-secondary" size="sm">
              Next
            </Button>
          </Stack>
        </Card.Footer>

        {/* Action Modal */}
        {selectedItem && (
          <ActionModal<ContentItem>
            show={showActionModal}
            item={selectedItem}
            onView={handleViewContent}
            onEdit={handleEditContent}
            onDelete={handleDeleteClick}
            onClose={() => setShowActionModal(false)}
          />
        )}

        {/* Confirm Delete Modal */}
        <ConfirmModal
          show={showConfirmModal}
          title="Delete Content"
          message={`Are you sure you want to delete "${selectedItem?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      </Card>
    </>
  );
}
