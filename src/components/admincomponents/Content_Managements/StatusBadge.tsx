import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { Badge } from "react-bootstrap";

type Status = "published" | "draft" | "processing";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "published") {
    return (
      <Badge bg="success" className="d-flex align-items-center gap-1 px-2 py-1">
        <CheckCircle className="w-3 h-3" />
        Published
      </Badge>
    );
  }

  if (status === "processing") {
    return (
      <Badge bg="info" className="d-flex align-items-center gap-1 px-2 py-1">
        <Circle className="w-3 h-3 fill-current" />
        Processing
      </Badge>
    );
  }

  return (
    <Badge
      bg="warning"
      text="dark"
      className="d-flex align-items-center gap-1 px-2 py-1"
    >
      <Circle className="w-3 h-3 fill-current" />
      Draft
    </Badge>
  );
}
