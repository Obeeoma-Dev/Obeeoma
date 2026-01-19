import React from "react";
import { Card, Badge } from "react-bootstrap";
import { AlertTriangle, Clock } from "lucide-react";

// Define the Case interface
interface Case {
  id: string;
  reason: string;
  status: string;
  assignedTo: string;
  type?: "critical" | "warning";
}

// Sample data
const cases: Case[] = [
  {
    id: "04567",
    reason: "Abuse",
    status: "Pending",
    assignedTo: "John Smith",
    type: "critical",
  },
  {
    id: "04568",
    reason: "Urgent Referral",
    status: "Referred",
    assignedTo: "Emily Johnson",
    type: "warning",
  },
];

// Styles for the card and cases
const styles = {
  card: { padding: "1.5rem", height: "100%" },
  caseContainer: (type?: string) => ({
    padding: "1rem",
    borderLeft: `4px solid ${type === "critical" ? "#dc3545" : "#ffc107"}`,
    backgroundColor: type === "critical" ? "#f8d7da" : "#fff3cd",
    borderRadius: "0.375rem",
    marginBottom: "1rem",
  }),
  caseTitle: (type?: string) => ({
    fontSize: "0.875rem",
    fontWeight: "bold",
    color: type === "critical" ? "#842029" : "#664d03",
  }),
  caseDescription: (type?: string) => ({
    fontSize: "0.875rem",
    color: type === "critical" ? "#842029" : "#664d03",
    marginTop: "0.25rem",
  }),
  metaText: { fontSize: "0.75rem", color: "#6c757d" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  metaWrapper: { display: "flex", alignItems: "center", gap: "0.25rem" },
};

// Main component
const CriticalCases: React.FC = () => {
  return (
    <Card style={styles.card} className="mb-4">
      {/* Card Header */}
      <div style={styles.header}>
        <AlertTriangle size={20} color="#ffc107" />
        <h5 style={{ margin: 0, fontWeight: 600, fontFamily: "heading" }}>
          Critical Cases
        </h5>
      </div>

      {/* Cases list */}
      <div>
        {cases.map((c) => (
          <div key={c.id} style={styles.caseContainer(c.type)}>
            {/* Top Row: Case title, meta, badge */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                fontFamily: "body",
              }}
            >
              <div>
                {/* Case title */}
                <span style={styles.caseTitle(c.type)}>Case ID: {c.id}</span>

                {/* Meta info: reason and assignedTo */}
                <div style={styles.metaWrapper}>
                  <Clock size={12} style={{ marginRight: "0.25rem" }} />
                  <span style={styles.metaText}>{c.reason}</span>
                  <span style={{ ...styles.metaText, margin: "0 0.25rem" }}>
                    •
                  </span>
                  <span style={styles.metaText}>
                    Assigned to: {c.assignedTo}
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <Badge bg={c.type === "critical" ? "danger" : "warning"}>
                {c.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CriticalCases;
