import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Badge,
  Image,
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon, CheckCircleIcon, SearchIcon } from "lucide-react";
import "./BlogTable.css";

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
  views?: number;
  confirmedReads?: number;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

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

// Categories for filter
const BLOG_CATEGORIES = [
  'All Categories',
  'Innovation',
  'Community',
  'HR & Leadership',
  'Self-care',
  'Technology',
  'Leadership',
  'Workplace Wellness',
  'Mental Health',
  'Productivity',
  'Health',
  'Tech',
  'Uncategorized'
];

type SortOption = 'recent' | 'most-viewed' | 'most-read';

// The main BlogTable component
export function BlogTable({ blogs, onEdit, onDelete, onAdd }: BlogTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // Global stats
  const totalViews = blogs.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalConfirmed = blogs.reduce((sum, p) => sum + (p.confirmedReads || 0), 0);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let result = [...blogs];

    // Category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Search filter (matches title or category)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sortBy) {
      case 'most-viewed':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'most-read':
        result.sort((a, b) => (b.confirmedReads || 0) - (a.confirmedReads || 0));
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return result;
  }, [blogs, searchQuery, selectedCategory, sortBy]);

  // All filtered and sorted blogs will be displayed, with CSS controlling the scrollable area

  return (
    <Card className="blogtable-table-card">
      {/* Header section */}
      <Card.Header className="d-flex justify-content-between align-items-center blogtable-header">
        <div>
          <h3 className="blogtable-title">Blog Articles</h3>
          <p className="blogtable-subtitle">Manage your landing page content</p>
          <div className="blogtable-stats d-flex gap-3 mt-2">
            <span className="blogtable-stat-badge blogtable-views-badge">
              <EyeIcon size={14} className="me-1" />
              {totalViews} views
            </span>
            <span className="blogtable-stat-badge blogtable-reads-badge">
              <CheckCircleIcon size={14} className="me-1" />
              {totalConfirmed} reads
            </span>
          </div>
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

      {/* Search and Filter Toolbar */}
      <div className="blogtable-toolbar px-3 py-3 border-bottom">
        <Row className="g-3 align-items-center">
          <Col md={4}>
            <InputGroup className="blogtable-search-group">
              <InputGroup.Text className="blogtable-search-icon">
                <SearchIcon size={16} />
              </InputGroup.Text>
              <FormControl
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogtable-search-input"
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="blogtable-category-select"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="blogtable-sort-select"
            >
              <option value="recent">Recent First</option>
              <option value="most-viewed">Most Viewed</option>
              <option value="most-read">Most Read</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Scrollable Table wrapper */}
      <div className="blogtable-scrollable-wrapper">
        <div className="blogtable-table-container">
          <Table hover className="blogtable-main-table mb-0">
            <thead className="blogtable-thead blogtable-sticky-header">
              <tr>
                <th className="blogtable-header-title">Title</th>
                <th className="blogtable-header-category">Category</th>
                <th className="blogtable-header-date">Date</th>
                <th className="blogtable-header-status">Status</th>
                <th className="blogtable-header-actions text-end">Actions</th>
              </tr>
            </thead>

            <tbody className="blogtable-tbody">
              {filteredAndSortedBlogs.length > 0 ? (
                filteredAndSortedBlogs.map((blog) => (
                  <tr key={blog.id} className="blog-row">
                    {/* TITLE + IMAGE */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {(() => {
                          const imageSrc = resolveImageSrc(blog.imageUrl);
                          if (imageSrc) {
                            return (
                              <Image
                                src={imageSrc}
                                rounded
                                className="blogtable-thumb"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                }}
                                onError={(e) => {
                                  // Replace with fallback when image fails
                                  const target = e.target as HTMLImageElement;
                                  const parent = target.parentElement;
                                  if (parent) {
                                    target.style.display = "none";
                                    const fallback = parent.querySelector(
                                      ".fallback-icon",
                                    ) as HTMLElement;
                                    if (fallback) {
                                      fallback.style.display = "flex";
                                    }
                                  }
                                }}
                              />
                            );
                          } else {
                            return (
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
                          }
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
                      <div className="d-flex justify-content-end gap-2 align-items-center">
                        {/* View Count */}
                        <div className="blogtable-view-count d-flex align-items-center gap-1">
                          <EyeIcon size={14} className="text-primary" />
                          <span className="blogtable-count-text">{blog.views || 0}</span>
                        </div>

                        {/* Read Count */}
                        <div className="blogtable-read-count d-flex align-items-center gap-1">
                          <CheckCircleIcon size={14} className="text-success" />
                          <span className="blogtable-count-text">{blog.confirmedReads || 0}</span>
                        </div>

                        {/* Edit Button */}
                        <Button
                          variant="light"
                          className="blogtable-action-btn blogtable-edit-btn"
                          onClick={() => onEdit(blog)}
                          title="Edit article"
                        >
                          <PencilIcon size={16} />
                        </Button>

                        {/* Delete Button */}
                        <Button
                          variant="light"
                          className="blogtable-action-btn blogtable-delete-btn"
                          onClick={() => onDelete(blog.id)}
                          title="Delete article"
                        >
                          <TrashIcon size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))) : null}
            </tbody>
          </Table>
        </div>
      </div>

      {/* IF NO BLOGS */}
      {filteredAndSortedBlogs.length === 0 && (
        <div className="blogtable-empty-state text-center py-5">
          <SearchIcon size={32} className="text-muted mb-3" />
          <p className="text-muted">No articles match your search criteria.</p>
          <Button
            variant="link"
            className="blogtable-clear-filters"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
              setSortBy('recent');
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Results count */}
      {filteredAndSortedBlogs.length > 0 && (
        <div className="blogtable-results-count px-3 py-2 border-top bg-light">
          <small className="text-muted">
            Showing <span className="fw-semibold">{Math.min(filteredAndSortedBlogs.length, 6)}</span> of{' '}
            <span className="fw-semibold">{filteredAndSortedBlogs.length}</span> articles
          </small>
        </div>
      )}
    </Card>
  );
}
