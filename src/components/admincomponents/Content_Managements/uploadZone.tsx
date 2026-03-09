// components/UploadZone.tsx
// This component implements the "Upload New Content" card from your Media Library.

import React, { useState, useCallback } from "react";
import {
  UploadCloud,
  FileVideo,
  FileAudio,
  Image as ImageIcon,
  File as FileIcon,
  X,
} from "lucide-react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { contentMediaAPI } from "../../../services/contentService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MEDIA_TYPES = [
  { id: "video", label: "Video", icon: FileVideo },
  { id: "audio", label: "Audio", icon: FileAudio },
  { id: "image", label: "Image", icon: ImageIcon },
  { id: "other", label: "Other", icon: FileIcon },
] as const;

// Component export.
interface UploadZoneProps {
  onUploadSuccess?: () => void;
}

export function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  // Track the selected media type (default "other" like your original)
  const [selectedType, setSelectedType] =
    useState<(typeof MEDIA_TYPES)[number]["id"]>("other");
  // Track whether the drag area is active (dragenter/dragover) to adjust visual feedback
  const [dragActive, setDragActive] = useState(false);
  // Track the selected file (from drop or file input)
  const [file, setFile] = useState<File | null>(null);
  // Track title, description, category, and status
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [duration, setDuration] = useState("");

  // Handle drag events to toggle the "active" state and prevent default browser behavior
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault(); // Prevent opening the file in the browser
    e.stopPropagation(); // Stop event bubbling to parent nodes
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true); // Highlight drop zone while dragging over
    } else if (e.type === "dragleave") {
      setDragActive(false); // Remove highlight when leaving
    }
  }, []);

  // Handle drop event: store the first file dropped and reset active state
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); // Prevent default file-open behavior
    e.stopPropagation(); // Stop propagation
    setDragActive(false); // Remove highlight on drop
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]); // Save the dropped file to state
    }
  }, []);

  // Handle file input change: store the first selected file from the input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent form submission (defensive)
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Save the chosen file to state
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    // Auto-capture file size and set duration for videos
    const fileSize = file
      ? (file.size / 1024 / 1024).toFixed(2) + " MB"
      : "0 MB";
    const videoDuration = selectedType === "video" ? duration : "";

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("duration", videoDuration);
    formData.append("file_size", fileSize);
    formData.append("media_type", selectedType); // 'video' | 'audio' | 'image' | 'other'
    formData.append("file", file); // actual file object

    try {
      const response = await contentMediaAPI.createMedia(formData);
      console.log("Upload successful:", response);

      // Call success callback with the uploaded content data
      console.log("Upload successful:", response);

      // Simple success toast
      toast.success("Content uploaded successfully!");

      // Simple approach: just trigger refresh
      onUploadSuccess?.();
      setDescription("");
      setCategory("");
      setStatus("published");
      setDuration("");
    } catch (err) {
      console.error("Upload failed:", err);

      // Simple error toast
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <Card style={{ borderRadius: 12 }}>
      <Card.Header
        as="h2"
        style={{ fontSize: "1rem", fontWeight: 600, fontFamily: "body" }}
      >
        Upload Mobile Resources
      </Card.Header>

      {/* Card body: everything else (tabs, drop zone, form, button) */}
      <Card.Body>
        {/* Media type selection as pill-style nav (scrollable horizontally if needed) */}
        <div
          className="content-type-pills"
          style={{ overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}
        >
          <Nav
            variant="pills"
            activeKey={selectedType}
            onSelect={(k) => k && setSelectedType(k as typeof selectedType)}
          >
            {/* Map media types into Nav.Item/Nav.Link entries */}
            {MEDIA_TYPES.map((type) => {
              const Icon = type.icon; // Select the icon component per type
              const isSelected = selectedType === type.id; // Determine current selection
              return (
                <Nav.Item key={type.id}>
                  <Nav.Link
                    eventKey={type.id} // Link key used by Nav to track active
                    // Add some horizontal spacing between pills
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 8px",
                      marginRight: 8,
                      fontFamily: "body",
                    }}
                  >
                    {/* Icon left of label; color changes subtly when active */}
                    <Icon size={18} color={isSelected ? "#fff" : "#6c757d"} />
                    {/* Label text */}
                    <span
                      style={{
                        fontWeight: 500,
                        color: isSelected ? "#fff" : "#6c757d",
                      }}
                    >
                      {type.label}
                    </span>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </div>

        {/* Drag-and-drop upload area; styled with dashed border and hover/active feedback */}
        <div
          // Relative container to host the invisible file input overlay
          style={{
            position: "relative",
            border: "2px dashed",
            borderColor: dragActive ? "#00A859" : "#ced4da",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
            transition: "border-color 150ms ease, background-color 150ms ease",
            backgroundColor: dragActive
              ? "rgba(25, 135, 84, 0.08)"
              : "transparent",
            cursor: "pointer",
          }}
          onDragEnter={handleDrag} // Activate on drag enter
          onDragLeave={handleDrag} // Deactivate on drag leave
          onDragOver={handleDrag} // Keep active while over
          onDrop={handleDrop} // Handle file drop
        >
          {/* Invisible file input covering the whole drop zone to support click-to-upload */}
          <Form.Control
            type="file" // File input
            onChange={handleChange} // Store selected file
            // Overlay the input so clicks anywhere open the file picker
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />

          {/* If a file is selected, show preview name, size, and a remove button */}
          {file ? (
            <Stack
              direction="horizontal"
              gap={3}
              className="justify-content-center"
            >
              {/* Icon bubble for the selected file */}
              <div
                style={{
                  padding: 12,
                  backgroundColor: "rgba(25, 135, 84, 0.15)",
                  borderRadius: 999,
                }}
              >
                {/* Green file icon */}
                <FileIcon size={24} color="#198754" />
              </div>

              {/* File name and size */}
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#212529",
                    fontFamily: "body",
                  }}
                >
                  {file.name}
                </p>{" "}
                {/* File name */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#6c757d",
                    fontFamily: "body",
                  }}
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Remove file button */}
              <Button
                variant="light"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
                style={{ borderRadius: 999 }}
                aria-label="Remove selected file"
              >
                {/* Gray 'X' icon */}
                <X size={16} color="#6c757d" />
              </Button>
            </Stack>
          ) : (
            // Empty state: prompt user to click or drag files, with an upload icon and helper text
            <div>
              {/* Circular backdrop for upload icon */}
              <div
                style={{
                  margin: "0 auto",
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  backgroundColor: "rgba(25, 135, 84, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UploadCloud size={24} color="#00A859" />
              </div>

              {/* Instruction line: click or drag-and-drop */}
              <div style={{ marginTop: 8, color: "#6c757d" }}>
                <span
                  style={{
                    fontWeight: 600,
                    color: "#00A859",
                    fontFamily: "body",
                  }}
                >
                  Click to upload
                </span>{" "}
                or drag and drop
              </div>

              {/* Supported file types and size note */}
              <p style={{ marginTop: 4, color: "#6c757d", fontFamily: "body" }}>
                MP4, MP3, PNG, JPG up to 50MB
              </p>
            </div>
          )}
        </div>

        {/* Metadata form for Title, Description, Category, and Duration */}
        <Row style={{ marginTop: 24 }} xs={1} md={2}>
          {/* Title input */}
          <Col style={{ fontFamily: "body" }}>
            <Form.Label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#495057",
                marginBottom: 4,
                fontFamily: "body",
              }}
            >
              Title
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter content title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>

          {/* Description input */}
          <Col style={{ fontFamily: "body" }}>
            <Form.Label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#495057",
                marginBottom: 4,
                fontFamily: "body",
              }}
            >
              Description
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 16 }} xs={1} md={2}>
          {/* Category input */}
          <Col style={{ fontFamily: "body" }}>
            <Form.Label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#495057",
                marginBottom: 4,
                fontFamily: "body",
              }}
            >
              Category
            </Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="meditation">Meditation</option>
              <option value="sleep">Sleep</option>
              <option value="anxiety">Anxiety Relief</option>
              <option value="stress">Stress Management</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="general">General Wellness</option>
            </Form.Select>
          </Col>

          {/* Duration input (only for videos) */}
          {selectedType === "video" && (
            <Col style={{ fontFamily: "body" }}>
              <Form.Label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#495057",
                  marginBottom: 4,
                  fontFamily: "body",
                }}
              >
                Duration (e.g., 3:00)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="3:00"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Col>
          )}
        </Row>

        {/* Status toggle */}
        <Row style={{ marginTop: 16 }}>
          <Col style={{ fontFamily: "body" }}>
            <Form.Label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#495057",
                marginBottom: 8,
                fontFamily: "body",
              }}
            >
              Status
            </Form.Label>
            <Stack direction="horizontal" gap={3}>
              <Form.Check
                type="radio"
                id="status-published"
                label="Published"
                checked={status === "published"}
                onChange={() => setStatus("published")}
              />
              <Form.Check
                type="radio"
                id="status-draft"
                label="Draft"
                checked={status === "draft"}
                onChange={() => setStatus("draft")}
              />
            </Stack>
          </Col>
        </Row>

        {/* Right-aligned upload button */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-end",
            fontFamily: "body",
          }}
        >
          <Button variant="success" onClick={handleUpload}>
            Upload Content
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
