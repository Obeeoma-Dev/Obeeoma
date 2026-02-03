import React, { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { FileText, Download } from "lucide-react";
import { DownloadPopup } from "./dowloadpopup";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}

const reports: Report[] = [
  {
    id: "1",
    title: "Monthly Usage Report",
    type: "PDF",
    date: "Jan 2026",
    size: "2.3 MB",
  },
];

export function AvailableReports() {
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Handles clicking the download button
  const handleDownloadClick = (report: Report) => {
    // Set selected report
    setSelectedReport(report);

    // Open popup
    setDownloadPopupOpen(true);
  };

  return (
    <Card className="p-3">
      {/* Card body */}
      <Card.Body>
        {/* Section title */}
        <Card.Title className="mb-4" style={{ fontFamily: "heading" }}>
          Available Reports
        </Card.Title>

        {/* Reports list */}
        <Stack gap={3}>
          {reports.map((report) => (
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

                  {/* Download button */}
                  <Button
                    variant="outline-success"
                    onClick={() => handleDownloadClick(report)}
                  >
                    <Download size={18} />
                  </Button>
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
