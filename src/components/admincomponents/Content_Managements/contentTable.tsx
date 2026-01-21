// components/ContentTable.tsx
// This component renders the "Content Library" table from your Media Library.
// It uses React-Bootstrap components for layout, table, form controls, and buttons.
// Tailwind classes are removed, replaced with Bootstrap styling and inline styles where needed.

import React, { useEffect, useState } from "react";
import {
  MoreVertical,
  PlayCircle,
  Image as ImageIcon,
  FileText,
  Music,
  CheckCircle2,
  Clock,
} from "lucide-react"; // Import icons for type/status visualization
import Card from "react-bootstrap/Card"; // Bootstrap card container
import Table from "react-bootstrap/Table"; // Bootstrap table
import Form from "react-bootstrap/Form"; // Bootstrap form controls (select dropdowns)
import Button from "react-bootstrap/Button"; // Bootstrap buttons
import Stack from "react-bootstrap/Stack"; // Flexbox utility for spacing/alignment
import Image from "react-bootstrap/Image"; // Bootstrap image component
import { contentMediaAPI, ContentItem } from "../../../services/contentService";

// Helper component: render icon or image based on content type
const TypeIcon = ({
  type,
  file_url,
}: {
  type: ContentItem["type"];
  file_url?: string;
}) => {
  if (type === "image" && file_url) {
    const src = file_url.startsWith("/")
      ? `http://127.0.0.1:8000${file_url}`
      : file_url;
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

  switch (type) {
    case "video":
      return <PlayCircle size={20} color="#0d6efd" />; // Blue for video
    case "audio":
      return <Music size={20} color="#6f42c1" />; // Purple for audio
    case "image":
      return <ImageIcon size={20} color="#198754" />; // Green for image (fallback)
    default:
      return <FileText size={20} color="#6c757d" />; // Gray for other
  }
};

// Helper component: render badge based on status
const StatusBadge = ({ status }: { status: ContentItem["status"] }) => {
  // Map status to Bootstrap background/text colors
  const styles: Record<ContentItem["status"], React.CSSProperties> = {
    published: { backgroundColor: "#d1e7dd", color: "#0f5132" }, // Green
    draft: { backgroundColor: "#fff3cd", color: "#664d03" }, // Yellow
    processing: { backgroundColor: "#cfe2ff", color: "#084298" }, // Blue
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
export function ContentTable() {
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await contentMediaAPI.getAllContent();
        setContentData(data);
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // Card container for the whole table
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
                      <TypeIcon type={item.type} file_url={item.file_url} />
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
                        {item.type}
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
                <td style={{ color: "#6c757d" }}>{item.date}</td>

                {/* Size */}
                <td style={{ color: "#6c757d" }}>{item.size}</td>

                {/* Actions */}
                <td style={{ textAlign: "right" }}>
                  <Button
                    variant="light"
                    size="sm"
                    style={{ borderRadius: 999 }}
                    aria-label="More actions"
                  >
                    <MoreVertical size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination footer */}
      <Card.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "body",
        }}
      >
        {/* Showing results info */}
        <div style={{ fontSize: 14, color: "#6c757d" }}>
          Showing <strong>1</strong> to <strong>5</strong> of{" "}
          <strong>12</strong> results
        </div>

        {/* Pagination buttons */}
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-secondary" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline-secondary" size="sm">
            Next
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}
