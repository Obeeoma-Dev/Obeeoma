import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Download } from "lucide-react";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { downloadReport } from "../../../store/slices/EmployerSlice";
const PRIMARY_COLOR = "#22C55E";
const AvailableReports = () => {
    const dispatch = useAppDispatch();
    const reportTypes = [
        {
            name: "Wellness Summary",
            description: "Overall employee wellness metrics",
            frequency: "Monthly",
            // Placeholder API endpoint that should return a PDF file
            url: "/v1/dashboard/wellness-reports/",
        },
        {
            name: "Department Analysis",
            description: "Detailed department-wise breakdown",
            frequency: "Quarterly",
            url: "/v1/download/department-analysis/",
        },
        {
            name: "Risk Assessment",
            description: "Identified risk factors and trends",
            frequency: "Weekly",
            url: "/v1/download/risk-assessment/",
        },
        {
            name: "Engagement Report",
            description: "Employee engagement and participation",
            frequency: "Monthly",
            url: "/v1/download/engagement/"
        },
    ];
    const handleDownload = (url, name) => {
        const fileName = `${name.replace(/\s/g, '_')}_Report.pdf`;
        dispatch(downloadReport({ url, fileName }));
    };
    return (_jsx("div", { className: "row", children: _jsxs("div", { className: "col-12", children: [_jsx("h3", { className: "h4 fw-semibold mb-4", children: "Available Reports" }), _jsx("div", { className: "row g-4", children: reportTypes.map((report, index) => (_jsx("div", { className: "col-12 col-md-6 col-lg-3", children: _jsx("div", { className: "card border-0 shadow-sm h-100", children: _jsxs("div", { className: "card-body p-4 d-flex flex-column", children: [_jsx("h5", { className: "card-title fw-bold", children: report.name }), _jsx("p", { className: "text-muted small flex-grow-1", children: report.description }), _jsxs("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [_jsx("span", { className: "text-dark", children: report.frequency }), _jsxs("button", { onClick: () => handleDownload(report.url, report.name), className: "btn btn-sm d-flex align-items-center gap-1 text-white", style: { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }, children: [_jsx(Download, { size: 14 }), "Download"] })] })] }) }) }, index))) })] }) }));
};
export default AvailableReports;
