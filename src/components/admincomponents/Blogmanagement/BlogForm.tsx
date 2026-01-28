import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { BlogPost, resolveImageSrc } from "./BlogTable"; // reuse the BlogPost type
import "./blog.css";

type BlogFormProps = {
  show: boolean;
  mode: "add" | "edit";
  initialData?: BlogPost | null;
  onClose: () => void;
  onSubmit: (data: BlogPost) => void;
};

export function BlogForm({
  show,
  mode,
  initialData,
  onClose,
  onSubmit,
}: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>({
    id: "",
    title: "",
    category: "",
    date: "",
    status: "draft",
    excerpt: "",
    imageUrl: "",
    author: "",
    content: "",
    featured: false,
  });

    
    useEffect(() => {
        if (initialData && mode === "edit") {
            setFormData(initialData);
        } else {
            setFormData({
                id: crypto.randomUUID(),
                title: "",
                category: "",
                date: "",
                status: "draft",
                excerpt: "",
                imageUrl: "",
                author: "",
                content: "",
                featured: false,
            });
        }
    }, [initialData, mode]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    // Just pass the formData back to the parent
    onSubmit(formData);
    onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageUrl: file }));
    }
  }

    return (
        <Modal
            show={show}
            onHide={onClose}
            size="lg"           
            centered
            scrollable          
            backdrop="static"   // prevents accidental close
            keyboard={false}
        >
          {mode === "add" ? "Add New Article" : "Edit Article"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <Form>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group style={{ fontFamily: "body" }}>
                <Form.Label className="fw-semibold">Title</Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Article title"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group style={{ fontFamily: "body" }}>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Control
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Health, Tech..."
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group style={{ fontFamily: "body" }}>
                <Form.Label className="fw-semibold">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group style={{ fontFamily: "body" }}>
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group style={{ fontFamily: "body" }}>
                <Form.Label className="fw-semibold">Author</Form.Label>
                <Form.Control
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" style={{ fontFamily: "body" }}>
            <Form.Label className="fw-semibold">Article Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />

            {/* Image preview goes here */}
            {formData.imageUrl && (
              <img
                src={resolveImageSrc(formData.imageUrl)}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  marginTop: "10px",
                  borderRadius: "4px",
                }}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" style={{ fontFamily: "body" }}>
            <Form.Label className="fw-semibold">Excerpt</Form.Label>
            <Form.Control
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              as="textarea"
              rows={2}
              placeholder="Brief description of the article preview"
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ fontFamily: "body" }}>
            <Form.Label className="fw-semibold">Content</Form.Label>
            <Form.Control
              name="content"
              value={formData.content}
              onChange={handleChange}
              as="textarea"
              rows={5}
              placeholder="Write your article content here"
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ fontFamily: "body" }}>
            <Form.Label className="fw-semibold">Featured</Form.Label>
            <Form.Check
              type="switch"
              id="featured-switch"
              label="Mark this article as featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <div
        className="modal-footer-custom d-flex justify-content-end p-3"
        style={{ fontFamily: "body" }}
      >
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="save-btn ms-2" onClick={handleSubmit}>
          {mode === "add" ? "Add Article" : "Save Changes"}
        </Button>
      </div>
    </Modal>
  );
}
