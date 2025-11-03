import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/employercomponents/shared/Layout";
import WellnessTrends from "../../components/employercomponents/reports/WellnessTrends";
import DepartmentMetrics from "../../components/employercomponents/reports/DepartmentMetrics";
import AvailableReports from "../../components/employercomponents/reports/AvailableReports";
import KeyMetrics from "../../components/employercomponents/reports/KeyMetrics";
import { Download, Filter, Calendar } from "lucide-react";
const CompanyReports = () => {
    // TODO: Replace with API call to fetch reports data
    // Example: const { data: reportsData, loading } = useReportsData();
    const additionalHeader = (_jsxs("div", { className: "d-flex gap-2", children: [_jsxs("button", { className: "btn btn-outline-secondary d-flex align-items-center gap-2", children: [_jsx(Filter, { size: 16 }), "Filter"] }), _jsxs("button", { className: "btn btn-outline-secondary d-flex align-items-center gap-2", children: [_jsx(Calendar, { size: 16 }), "Date Range"] }), _jsxs("button", { className: "btn btn-success d-flex align-items-center gap-2", children: [_jsx(Download, { size: 16 }), "Export All"] })] }));
    return (_jsx(Layout, { title: "Company Reports", showSearch: true, additionalHeaderContent: additionalHeader, children: _jsxs("div", { className: "container-fluid py-4", children: [_jsx(WellnessTrends, {}), _jsx(DepartmentMetrics, {}), _jsx(AvailableReports, {}), _jsx(KeyMetrics, {})] }) }));
};
export default CompanyReports;
