import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import {
  X,
  Calendar,
  Clock,
  User,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
} from "lucide-react";
import "./BlogReadModal.css";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  fullContent: string;
  views: number;
  confirmedReads: number;
}

interface BlogReadModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRead: (postId: string) => void;
  onSkipRead: (postId: string) => void;
}

type FeedbackState = "idle" | "prompted" | "confirmed" | "skipped";

export function BlogReadModal({
  post,
  isOpen,
  onClose,
  onConfirmRead,
  onSkipRead,
}: BlogReadModalProps) {
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFeedback("idle");
      setScrolledToBottom(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 80;
    if (nearBottom && feedback === "idle") {
      setFeedback("prompted");
    }
  };

  const handleYes = () => {
    if (!post) return;
    setFeedback("confirmed");
    onConfirmRead(post.id);
  };

  const handleNo = () => {
    if (!post) return;
    setFeedback("skipped");
    onSkipRead(post.id);
  };

  const handleClose = () => {
    if (feedback === "idle" && post) {
      // Prompt before closing if they haven't responded
      setFeedback("prompted");
      return;
    }
    onClose();
  };

  if (!isOpen || !post) return null;

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      size="lg"
      centered
      dialogClassName="blog-read-modal-dialog"
      contentClassName="blog-read-modal-content"
      backdropClassName="blog-read-modal-backdrop"
    >
      <Modal.Header className="blog-read-modal-header">
        <Button
          variant="light"
          className="blog-read-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={14} />
        </Button>
      </Modal.Header>

      <Modal.Body className="blog-read-modal-body" onScroll={handleScroll}>
        {/* Hero image - moved outside container to touch edges */}
        <div className="blog-read-modal-hero">
          <img
            src={post.image}
            alt={post.title}
            className="blog-read-modal-hero-img"
          />
          <div className="blog-read-modal-hero-overlay"></div>
          <div className="blog-read-modal-badges">
            <span className="blog-read-modal-category">{post.category}</span>
            {post.featured && (
              <span className="blog-read-modal-featured">Featured</span>
            )}
          </div>
        </div>

        {/* Article content */}
        <Container className="blog-read-modal-content-container">
          {/* Meta */}
          <Row className="blog-read-modal-meta">
            <Col className="blog-read-modal-meta-col">
              <div className="blog-read-modal-meta-item">
                <Calendar size={12} className="blog-read-modal-meta-icon" />
                <span className="blog-read-modal-meta-text">{post.date}</span>
              </div>
              <div className="blog-read-modal-meta-item">
                <Clock size={12} className="blog-read-modal-meta-icon" />
                <span className="blog-read-modal-meta-text">
                  {post.readTime}
                </span>
              </div>
              <div className="blog-read-modal-meta-item">
                <User size={12} className="blog-read-modal-meta-icon" />
                <span className="blog-read-modal-meta-text">{post.author}</span>
              </div>
            </Col>
          </Row>

          {/* Title */}
          <h1 className="blog-read-modal-title">{post.title}</h1>

          {post.excerpt && (
            <p className="blog-read-modal-excerpt">{post.excerpt}</p>
          )}

          {/* Full content */}
          <div className="blog-read-modal-full-content">
            {post.fullContent.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Stats */}
          <div className="blog-read-modal-stats">
            <div className="blog-read-modal-stat-item">
              <Eye size={16} className="blog-read-modal-stat-icon" />
              {post.views} views
            </div>
            <div className="blog-read-modal-stat-item">
              <CheckCircle size={16} className="blog-read-modal-stat-icon" />
              {post.confirmedReads} confirmed reads
            </div>
          </div>

          {/* Feedback section */}
          <div className="blog-read-modal-feedback">
            {feedback === "idle" && (
              <div className="blog-read-modal-feedback-idle">
                <p>Scroll to the end to share your feedback</p>
              </div>
            )}

            {feedback === "prompted" && (
              <div className="blog-read-modal-feedback-prompted">
                <div className="blog-read-modal-feedback-header">
                  <Eye size={20} className="blog-read-modal-feedback-icon" />
                  <h3>Did you read this article?</h3>
                </div>
                <p className="blog-read-modal-feedback-text">
                  Your honest feedback helps us understand our readers better.
                </p>
                <div className="blog-read-modal-feedback-buttons">
                  <Button
                    variant="success"
                    className="blog-read-modal-feedback-yes"
                    onClick={handleYes}
                  >
                    <ThumbsUp size={16} />
                    Yes, I read it!
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="blog-read-modal-feedback-no"
                    onClick={handleNo}
                  >
                    <ThumbsDown size={16} />
                    Not really
                  </Button>
                </div>
              </div>
            )}

            {feedback === "confirmed" && (
              <div className="blog-read-modal-feedback-confirmed">
                <CheckCircle
                  size={40}
                  className="blog-read-modal-feedback-success-icon"
                />
                <h3>Thank you for reading! 🎉</h3>
                <p className="blog-read-modal-feedback-text">
                  Your read has been confirmed and recorded.
                </p>
                <Button
                  variant="success"
                  className="blog-read-modal-feedback-close"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            )}

            {feedback === "skipped" && (
              <div className="blog-read-modal-feedback-skipped">
                <h3>Thanks for your honesty!</h3>
                <p className="blog-read-modal-feedback-text">
                  No worries — feel free to come back and read it later.
                </p>
                <Button
                  variant="secondary"
                  className="blog-read-modal-feedback-close-secondary"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
