import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { useList } from "@refinedev/core";

interface FeedbackItem {
  id: string;
  userName: string;
  message: string;
  createdAt: string;
}

const FeedbacknTestimonies: React.FC = () => {
  const { query, result } = useList<FeedbackItem>({
    resource: "feedback",
  });

  const { isLoading, isError } = query;
  const records = result?.data ?? [];

  if (isLoading) {
    return (
      <Card className="shadow-sm border-0 text-center p-5">
        <Spinner animation="border" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-sm border-0 text-center p-5 text-danger">
        Failed to load feedback.
      </Card>
    );
  }

  if (!records.length) {
    return (
      <Card className="shadow-sm border-0 text-center p-5">
        No feedback available.
      </Card>
    );
  }

  return (
    <>
      {records.map((item) => (
        <Card key={item.id} className="mb-3 shadow-sm border-0">
          <Card.Body>
            <h6>{item.userName}</h6>
            <p className="text-muted">{item.message}</p>
            <small>{item.createdAt}</small>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default FeedbacknTestimonies;
