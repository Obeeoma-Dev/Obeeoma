import React from "react";
import { Modal, Button, Form, Stack } from "react-bootstrap";
import { FileText, Download } from "lucide-react";
import "./reports.css";

interface DownloadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  reportType: string;
  reportDate: string;
  reportSize: string;
}

export function DownloadPopup({
  isOpen,
  onClose,
  reportTitle,
  reportType,
  reportDate,
  reportSize,
}: DownloadPopupProps) {
  const handleDownload = () => {
    console.log("Downloading:", reportTitle);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "heading" }}>
          Download Report
        </Modal.Title>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body>
        <Stack gap={4}>
          {/* Report Info Card */}
          <div className="report-card" style={{ fontFamily: "body" }}>
            <div className="report-icon">
              <FileText size={24} />
            </div>

            <div className="flex-grow-1">
              <p className="report-title">{reportTitle}</p>
              <p className="report-meta">
                {reportType} {reportDate} • {reportSize}
              </p>
            </div>
          </div>

          {/* Download Options */}
          <div>
            <p className="fw-medium mb-2" style={{ fontFamily: "body" }}>
              Download Options
            </p>

            {/* Radio Group */}
            <Form style={{ fontFamily: "body" }}>
              <Stack gap={2}>
                <Form.Check
                  type="radio"
                  name="format"
                  id="pdf"
                  label="PDF Format"
                  defaultChecked
                />

                <Form.Check
                  type="radio"
                  name="format"
                  id="excel"
                  label="Excel Format"
                />

                <Form.Check
                  type="radio"
                  name="format"
                  id="csv"
                  label="CSV Format"
                />
              </Stack>
            </Form>
          </div>
        </Stack>
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer style={{ fontFamily: "body" }}>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="success" onClick={handleDownload}>
          <Download size={16} className="me-2" />
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
