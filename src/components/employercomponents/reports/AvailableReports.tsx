import React, { useState } from "react";
import { Download } from "lucide-react";

const PRIMARY_COLOR = "#22C55E";

export interface ReportType {
  name: string;
  description: string;
  defaultFrequency: string;
  fetchBlob: () => Promise<Blob>;
}

const ReportCard = ({ report }: { report: ReportType }) => {
  const [frequency, setFrequency] = useState("Monthly");

  const handleDownload = async () => {
    try {
      const blob = await report.fetchBlob();

      let extension = "pdf";
      if (blob.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        extension = "xlsx";
      } else if (blob.type && blob.type !== "application/pdf") {
        extension = blob.type.split("/").pop() || "bin";
      }

      const fileName = `${report.name.replace(/\s/g, "_")}_${frequency}_Report.${extension}`;
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download report", error);
      // Optional: show UI toast notification if app has one
    }
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4 d-flex flex-column">
        <h5 className="card-title fw-bold text-truncate" title={report.name}>
          {report.name}
        </h5>
        <p className="text-muted small flex-grow-1">{report.description}</p>
        <div className="d-flex align-items-center justify-content-between gap-2 mt-3">
          <div style={{ maxWidth: "50%" }}>
            <select
              className="form-select form-select-sm shadow-none border-secondary-subtle"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              style={{ fontSize: "0.85rem", cursor: "pointer" }}
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <button
            onClick={handleDownload}
            className="btn btn-sm d-flex align-items-center justify-content-center gap-1 text-white"
            style={{
              backgroundColor: PRIMARY_COLOR,
              borderColor: PRIMARY_COLOR,
              flexShrink: 1,
              minWidth: 0,
              maxWidth: "50%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Download size={14} className="flex-shrink-0" />
            <span className="text-truncate">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AvailableReports = ({ reports }: { reports: ReportType[] }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h3 className="h4 fw-semibold mb-4">Available Reports</h3>
        <div className="row g-4">
          {reports.map((report, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <ReportCard report={report} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableReports;
