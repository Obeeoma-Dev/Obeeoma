import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form, Row, Col } from "react-bootstrap";
import { BlogPost } from "./BlogTable"; // reuse the BlogPost type

type BlogFormProps = {
    show: boolean;
    mode: "add" | "edit";
    initialData?: BlogPost | null;
    onClose: () => void;
    onSubmit: (data: BlogPost) => void;
};

export function BlogForm({ show, mode, initialData, onClose, onSubmit }: BlogFormProps) {
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
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        onSubmit(formData);
        onClose();
    }

    return (
        <Offcanvas
            show={show}
            onHide={onClose}
            placement="end"
            className="blog-modal"   // 👈 reusing your existing CSS root class
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="modal-title-custom">
                    {mode === "add" ? "Add New Article" : "Edit Article"}
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="modal-body-custom">
                <Form>
                    <Row className="mb-3">
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
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
                                <Form.Label>Category</Form.Label>
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
                                <Form.Label>Date</Form.Label>
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
                                <Form.Label>Status</Form.Label>
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
                                <Form.Label>Author</Form.Label>
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
                        <Form.Label>Article Image URL</Form.Label>
                        <Form.Control
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Excerpt</Form.Label>
                        <Form.Control
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            as="textarea"
                            rows={2}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            as="textarea"
                            rows={5}
                        />
                    </Form.Group>
                </Form>
            </Offcanvas.Body>

            <div className="modal-footer-custom d-flex justify-content-end p-3">
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button className="save-btn ms-2" onClick={handleSubmit}>
                    {mode === "add" ? "Add Article" : "Save Changes"}
                </Button>
            </div>
        </Offcanvas>
    );
}