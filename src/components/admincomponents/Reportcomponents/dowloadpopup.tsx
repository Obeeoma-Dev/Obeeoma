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

/**
 * DownloadPopup Component
 */
export function DownloadPopup({
  isOpen,
  onClose,
  reportTitle,
  reportType,
  reportDate,
  reportSize,
}: DownloadPopupProps) {
  /**
   * Handles the download action
   */
  const handleDownload = () => {
    console.log("Downloading:", reportTitle);
    onClose();
  };

  return (
    /**
     * Bootstrap Modal replaces your Popup component
     * show      -> controls visibility
     * onHide    -> handles close events
     * centered  -> vertically centers modal
     */
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title>Download Report</Modal.Title>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body>
        {/* Stack replaces Tailwind flex + spacing */}
        <Stack gap={4}>
          {/* Report Info Card */}
          <div className="report-card">
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
            <p className="fw-medium mb-2">Download Options</p>

            {/* Radio Group */}
            <Form>
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
      <Modal.Footer>
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
