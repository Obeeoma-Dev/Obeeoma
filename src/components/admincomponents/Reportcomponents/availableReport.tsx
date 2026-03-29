import React, { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { FileText, Download, Trash2, Upload } from "lucide-react";
import { DownloadPopup } from "./dowloadpopup";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}

interface AvailableReportsProps {
  reports?: Report[];
  onDeleteReport?: (reportId: string) => Promise<void>;
  onUploadReport?: () => void;
}

export function AvailableReports({
  reports,
  onDeleteReport,
  onUploadReport,
}: AvailableReportsProps) {
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reportsData = reports || [];

  // Handles clicking the download button
  const handleDownloadClick = (report: Report) => {
    // Set selected report
    setSelectedReport(report);

    // Open popup
    setDownloadPopupOpen(true);
  };

  // Handles clicking the delete button
  const handleDeleteClick = async (reportId: string) => {
    if (onDeleteReport) {
      await onDeleteReport(reportId);
    }
  };

  if (!reportsData.length) {
    return (
      <Card className="p-3">
        <Card.Body>
          <Card.Title className="mb-4" style={{ fontFamily: "heading" }}>
            Available Reports
          </Card.Title>
          <div className="text-center text-muted py-4">
            <FileText size={48} className="mb-3" />
            <h5>No reports available</h5>
            <p>Generated reports will appear here</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="p-3">
      {/* Card body */}
      <Card.Body>
        {/* Section title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Title className="mb-0" style={{ fontFamily: "heading" }}>
            Available Reports
          </Card.Title>
          {onUploadReport && (
            <Button
              variant="success"
              onClick={onUploadReport}
              className="d-flex align-items-center gap-2"
            >
              <Upload size={16} />
              Upload Report
            </Button>
          )}
        </div>

        {/* Reports list */}
        <Stack gap={3}>
          {reportsData.map((report) => (
            // Individual report card
            <Card key={report.id}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Left side: icon + text */}
                  <div className="d-flex align-items-center gap-3">
                    {/* Icon wrapper */}
                    <div>
                      <FileText size={20} />
                    </div>

                    {/* Text content */}
                    <div style={{ fontFamily: "body" }}>
                      <div className="fw-medium">{report.title}</div>
                      <small className="text-muted">
                        {report.type} • {report.date} • {report.size}
                      </small>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-success"
                      onClick={() => handleDownloadClick(report)}
                    >
                      <Download size={18} />
                    </Button>
                    {onDeleteReport && (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteClick(report.id)}
                        title="Delete report"
                      >
                        <Trash2 size={18} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Stack>

        {/* Download popup */}
        {selectedReport && (
          <DownloadPopup
            isOpen={downloadPopupOpen}
            onClose={() => setDownloadPopupOpen(false)}
            reportTitle={selectedReport.title}
            reportType={selectedReport.type}
            reportDate={selectedReport.date}
            reportSize={selectedReport.size}
          />
        )}
      </Card.Body>
    </Card>
  );
}
