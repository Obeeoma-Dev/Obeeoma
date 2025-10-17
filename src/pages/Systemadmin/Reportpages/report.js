import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminHeader from '../../../components/admincomponents/adminheader';
import AdminSidebar from '../../../components/admincomponents/adminsidebar';
import MonthlyUsageChart from '../../../components/admincomponents/Reportcomponents/monthlyUsageChart';
import AvailableReports from '../../../components/admincomponents/Reportcomponents/availableReport';
import CustomReportForm from '../../../components/admincomponents/Reportcomponents/customerReportForm';
/**
 * ReportPage component renders the full layout for the system admin report dashboard.
 * It includes a fixed header, fixed sidebar, and scrollable main content area.
 */
const ReportPage = () => {
    return (
    // Root container for the entire page
    _jsxs("div", { style: { display: 'flex', flexDirection: 'column', height: '100vh' }, children: [_jsx("div", { style: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }, children: _jsx(AdminHeader, {}) }), _jsxs("div", { style: {
                    display: 'flex',
                    flex: 1,
                    marginTop: '72px', // Height of header
                }, children: [_jsx("div", { style: {
                            position: 'fixed',
                            top: '72px', // Below header
                            left: 0,
                            bottom: 0,
                            width: '250px', // Matches AdminSidebar width
                            zIndex: 999,
                        }, children: _jsx(AdminSidebar, {}) }), _jsxs("main", { style: {
                            marginLeft: '250px', // Sidebar width
                            flexGrow: 1,
                            overflowY: 'auto',
                            padding: '32px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px', // Space between sections
                        }, children: [_jsx(MonthlyUsageChart, {}), _jsx(AvailableReports, {}), _jsx(CustomReportForm, {})] })] })] }));
};
export default ReportPage;
