import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { BlogPost } from "./BlogTable"; // reuse the BlogPost type

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
      size="lg" // IMPORTANT: gives space like your image
      centered
      scrollable // allows long article forms
      backdrop="static" // prevents accidental close
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="modal-title-custom"
          style={{ fontFamily: "heading" }}
        >
          {mode === "add" ? "Add New Article" : "Edit Article"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <Form>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label
                  className="fw-semibold"
                  style={{ fontFamily: "body" }}
                >
                  Title
                </Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Article title"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label
                  className="fw-semibold"
                  style={{ fontFamily: "body" }}
                >
                  Category
                </Form.Label>
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
              <Form.Group>
                <Form.Label
                  className="fw-semibold"
                  style={{ fontFamily: "body" }}
                >
                  Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label
                  className="fw-semibold"
                  style={{ fontFamily: "body" }}
                >
                  Status
                </Form.Label>
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
              <Form.Group>
                <Form.Label
                  className="fw-semibold"
                  style={{ fontFamily: "body" }}
                >
                  Author
                </Form.Label>
                <Form.Control
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Article Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ fontFamily: "body" }}>
              Excerpt
            </Form.Label>
            <Form.Control
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              as="textarea"
              rows={2}
              placeholder="Brief description of the article preview"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ fontFamily: "body" }}>
              Content
            </Form.Label>
            <Form.Control
              name="content"
              value={formData.content}
              onChange={handleChange}
              as="textarea"
              rows={5}
              placeholder="Write your article content here"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ fontFamily: "body" }}>
              Featured
            </Form.Label>
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
