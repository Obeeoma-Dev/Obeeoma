import React from "react";
import { Card, Row, Col } from "react-bootstrap";

interface FeedbackItem {
  id?: number;
  user_name?: string;
  rating?: number;
  feedback?: string;
  date?: string;
  organization?: string;
}

const FeedbacknTestimonies: React.FC<{ feedbackData?: FeedbackItem[] }> = ({
  feedbackData,
}) => {
  const records = feedbackData || [];

  if (!records.length) {
    return (
      <Card className="shadow-sm border-0 text-center p-5">
        <h5>No feedback available.</h5>
        <p className="text-muted">
          Feedback will appear here once users start providing testimonials.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <h5
        style={{
          fontFamily: "heading",
          color: "#1a1a1a",
          marginBottom: "1.5rem",
        }}
      >
        User Feedback & Testimonials
      </h5>

      {records.map((item) => (
        <Card
          key={item.id || Math.random().toString()}
          className="mb-3 shadow-sm border-0"
        >
          <Card.Body>
            <Row className="align-items-start">
              <Col md={8}>
                <h6 className="mb-2">{item.user_name || "Anonymous User"}</h6>
                <p className="text-muted mb-2">
                  {item.feedback || "No feedback provided"}
                </p>
                {item.organization && (
                  <small className="text-muted">from {item.organization}</small>
                )}
              </Col>
              <Col md={4} className="text-end">
                {item.rating && (
                  <div className="mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < item.rating! ? "#ffc107" : "#e9ecef",
                          fontSize: "1.2rem",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
                {item.date && (
                  <small className="text-muted d-block">
                    {new Date(item.date).toLocaleDateString()}
                  </small>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FeedbacknTestimonies;
