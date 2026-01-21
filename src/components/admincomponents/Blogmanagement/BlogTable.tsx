import React from "react";
import {
  Table,
  Button,
  Badge,
  Image,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";

// Type definition for a blog post
export type BlogPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: "published" | "draft";
  excerpt: string;
  imageUrl: string | File;
  author: string;
  content: string;
  featured: boolean;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export const resolveImageSrc = (imageUrl: string | File): string => {
  // Handle File objects (for newly uploaded images)
  if (
    imageUrl &&
    typeof imageUrl === "object" &&
    "name" in imageUrl &&
    "type" in imageUrl
  ) {
    return URL.createObjectURL(imageUrl);
  }

  // Handle string URLs
  if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
    // If it's a relative path, prepend the base URL
    if (imageUrl.startsWith("/")) {
      return `${BASE_URL}${imageUrl}`;
    }
    // If it's already a full URL, return as is
    return imageUrl;
  }

  // Return empty string for null/undefined/empty values
  return "";
};

// Date formator.
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

// Component props
type BlogTableProps = {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};

// The main BlogTable component
export function BlogTable({ blogs, onEdit, onDelete, onAdd }: BlogTableProps) {
  return (
    <Card className="blogtable-table-card">
      {/* Header section */}
      <Card.Header className="d-flex justify-content-between align-items-center blogtable-header">
        <div>
          <h3 className="blogtable-title">Blog Articles</h3>
          <p className="blogtable-subtitle">Manage your landing page content</p>
        </div>

        {/* Add Article Button */}
        <Button
          className="blogtable-add-button d-flex align-items-center gap-2"
          style={{ fontFamily: "body" }}
          onClick={onAdd}
        >
          <PlusIcon size={16} />
          Add Article
        </Button>
      </Card.Header>

      {/* Table wrapper */}
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead className="blogtable-thead">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="blog-row">
                {/* TITLE + IMAGE */}
                <td>
                  <div className="d-flex align-items-center gap-3">
                    {(() => {
                      const imageSrc = resolveImageSrc(blog.imageUrl);
                      return imageSrc ? (
                        <Image
                          src={imageSrc}
                          rounded
                          className="blogtable-thumb"
                          onError={(e) => {
                            // Fallback to default image if loading fails
                            const target = e.target as HTMLImageElement;
                            target.src = "/default-thumbnail.png";
                          }}
                        />
                      ) : (
                        <div
                          className="blogtable-thumb d-flex align-items-center justify-content-center bg-light rounded"
                          style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "18px",
                            color: "#6c757d",
                          }}
                        >
                          📄
                        </div>
                      );
                    })()}
                    <span className="blogtable-title-text">{blog.title}</span>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="text-muted" style={{ fontFamily: "body" }}>
                  {blog.category}
                </td>

                {/* DATE */}
                <td className="text-muted" style={{ fontFamily: "body" }}>
                  {blog.date ? formatDate(blog.date) : "—"}
                </td>

                {/* STATUS */}
                <td>
                  <Badge
                    className={
                      blog.status === "published"
                        ? "blogtable-status-published"
                        : "blogtable-status-draft"
                    }
                  >
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </Badge>
                </td>

                {/* ACTION BUTTONS */}
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="light"
                      className="blogtable-action-btn blogtable-edit-btn"
                      onClick={() => onEdit(blog)}
                    >
                      <PencilIcon size={16} />
                    </Button>

                    <Button
                      variant="light"
                      className="blogtable-action-btn blogtable-delete-btn"
                      onClick={() => onDelete(blog.id)}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* IF NO BLOGS */}
      {blogs.length === 0 && (
        <div className="blogtable-empty-state text-center py-5">
          <p>No articles yet. Add your first article to get started.</p>
        </div>
      )}
    </Card>
  );
}
