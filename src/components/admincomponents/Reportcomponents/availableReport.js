import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "react-bootstrap";
const AvailableReports = () => {
    // Reports data matching the design
    const reports = [
        {
            id: 1,
            name: "Monthly Platform Usage Statistics",
            format: "PDF",
            date: "2023-09-01",
            size: "1.2 MB",
        },
        {
            id: 2,
            name: "Quarterly Organization Performance",
            format: "Excel",
            date: "2023-07-01",
            size: "3.5 MB",
        },
        {
            id: 3,
            name: "Annual Mental Health Trends",
            format: "PDF",
            date: "2023-01-15",
            size: "4.8 MB",
        },
        {
            id: 4,
            name: "AI Recommendation Effectiveness",
            format: "PDF",
            date: "2023-08-15",
            size: "2.1 MB",
        },
        {
            id: 5,
            name: "Hotline Activity Analysis",
            format: "Excel",
            date: "2023-09-10",
            size: "1.8 MB",
        },
    ];
    const getIconColor = (format) => {
        return format === "PDF" ? "#3CB371" : "#007bff";
    };
    return (_jsx(Card, { style: {
            border: "none",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
        }, children: _jsxs(Card.Body, { style: { padding: "1.5rem" }, children: [_jsx("h5", { style: {
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        marginBottom: "1.5rem",
                    }, children: "Available Reports" }), _jsx("div", { children: reports.map((report) => (_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            padding: "1rem 0",
                            borderBottom: report.id !== reports.length
                                ? "1px solid #e9ecef"
                                : "none",
                            gap: "1rem",
                        }, children: [_jsx("div", { style: {
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: getIconColor(report.format),
                                    borderRadius: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }, children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M6 2h8l4 4v14H6V2z", stroke: "white", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M14 2v4h4", stroke: "white", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("line", { x1: "8", y1: "10", x2: "16", y2: "10", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("line", { x1: "8", y1: "13", x2: "16", y2: "13", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("line", { x1: "8", y1: "16", x2: "14", y2: "16", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round" })] }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: {
                                            fontSize: "1rem",
                                            fontWeight: "500",
                                            color: "#1a1a1a",
                                            marginBottom: "0.25rem",
                                        }, children: report.name }), _jsxs("div", { style: {
                                            fontSize: "0.875rem",
                                            color: "#6c757d",
                                        }, children: [report.format, " \u2022 Generated on ", report.date, " \u2022 ", report.size] })] }), _jsx("button", { style: {
                                    background: "none",
                                    border: "none",
                                    color: "#3CB371",
                                    cursor: "pointer",
                                    padding: "0.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, onClick: () => {
                                    // Handle download
                                    console.log(`Downloading ${report.name}`);
                                }, children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M10 13V3M10 13L6 9M10 13L14 9M4 16h12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] }, report.id))) })] }) }));
};
export default AvailableReports;
