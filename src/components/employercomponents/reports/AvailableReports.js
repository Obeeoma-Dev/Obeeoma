import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Download } from "lucide-react";
const PRIMARY_COLOR = "#22C55E";
const ReportCard = ({ report }) => {
    const [frequency, setFrequency] = useState("Monthly");
    const handleDownload = async () => {
        try {
            const blob = await report.fetchBlob();
            let extension = "pdf";
            if (blob.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                extension = "xlsx";
            }
            else if (blob.type && blob.type !== "application/pdf") {
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
        }
        catch (error) {
            console.error("Failed to download report", error);
            // Optional: show UI toast notification if app has one
        }
    };
    return (_jsx("div", { className: "card border-0 shadow-sm h-100", children: _jsxs("div", { className: "card-body p-4 d-flex flex-column", children: [_jsx("h5", { className: "card-title fw-bold text-truncate", title: report.name, children: report.name }), _jsx("p", { className: "text-muted small flex-grow-1", children: report.description }), _jsxs("div", { className: "d-flex align-items-center justify-content-between gap-2 mt-3", children: [_jsx("div", { style: { maxWidth: "50%" }, children: _jsxs("select", { className: "form-select form-select-sm shadow-none border-secondary-subtle", value: frequency, onChange: (e) => setFrequency(e.target.value), style: { fontSize: "0.85rem", cursor: "pointer" }, children: [_jsx("option", { value: "Weekly", children: "Weekly" }), _jsx("option", { value: "Monthly", children: "Monthly" })] }) }), _jsxs("button", { onClick: handleDownload, className: "btn btn-sm d-flex align-items-center justify-content-center gap-1 text-white", style: {
                                backgroundColor: PRIMARY_COLOR,
                                borderColor: PRIMARY_COLOR,
                                flexShrink: 1,
                                minWidth: 0,
                                maxWidth: "50%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }, children: [_jsx(Download, { size: 14, className: "flex-shrink-0" }), _jsx("span", { className: "text-truncate", children: "Download" })] })] })] }) }));
};
const AvailableReports = ({ reports }) => {
    return (_jsx("div", { className: "row", children: _jsxs("div", { className: "col-12", children: [_jsx("h3", { className: "h4 fw-semibold mb-4", children: "Available Reports" }), _jsx("div", { className: "row g-4", children: reports.map((report, index) => (_jsx("div", { className: "col-12 col-md-6 col-lg-3", children: _jsx(ReportCard, { report: report }) }, index))) })] }) }));
};
export default AvailableReports;
