import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// clientEngagement.tsx
// Main page for displaying client engagement dashboard with sidebar layout
// Data loaded from backend API (admin/client-engagement/)
import { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import EngagementSummary from "../../../components/admincomponents/Clientcomponents/engagementsummary";
import EngagementCharts from "../../../components/admincomponents/Clientcomponents/engagementCharts";
import PatientSearchFilter from "../../../components/admincomponents/Clientcomponents/patientsearchfilter";
import PatientEngagementTable from "../../../components/admincomponents/Clientcomponents/patientEngagementTable";
import EngagementStatsPanel from "../../../components/admincomponents/Clientcomponents/engagemntStartsPanel";
import { adminAPI } from "../../../api/apiConfig";
const engagementLevelToRate = {
    high: 85,
    medium: 60,
    low: 35,
};
function formatLastActive(isoDate) {
    if (!isoDate)
        return "—";
    const d = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 60)
        return `${diffMins}m ago`;
    if (diffHours < 24)
        return `${diffHours}h ago`;
    if (diffDays < 7)
        return `${diffDays}d ago`;
    return d.toLocaleDateString();
}
const ClientEngagement = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await adminAPI.getClientEngagement();
                setData(response.data);
            }
            catch (err) {
                setError(err.message ?? "Failed to load engagement data");
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (error) {
        return (_jsx(SystemAdminLayout, { title: "Client Engagement", children: _jsx(Container, { className: "mt-5", children: _jsxs(Alert, { variant: "danger", children: ["Error: ", error] }) }) }));
    }
    if (loading) {
        return (_jsx(SystemAdminLayout, { title: "Client Engagement", children: _jsxs(Container, { className: "py-5 text-center", children: [_jsx(Spinner, { animation: "border" }), _jsx("p", { className: "mt-2", children: "Loading engagement data..." })] }) }));
    }
    const engagementRate = data ? Number(data.average_daily_engagement) : 0;
    const trends = (data?.engagement_trends ?? []).reduce((acc, t) => {
        if (t.trend.toLowerCase().includes("morning"))
            acc.courseCompletion = t.percentage;
        else if (t.trend.toLowerCase().includes("weekend"))
            acc.memberActivity = t.percentage;
        return acc;
    }, { courseCompletion: 0, memberActivity: 0 });
    const streakList = data?.streak_statistics ?? [];
    const sevenDay = streakList.find((s) => s.streak.includes("7"))?.active_users ?? 0;
    const thirtyDay = streakList.find((s) => s.streak.includes("14"))?.active_users ?? 0;
    const sixtyDay = streakList.find((s) => s.streak.includes("30"))?.active_users ?? 0;
    const streaks = { sevenDay, thirtyDay, sixtyDay };
    const tablePatients = (data?.clients ?? []).map((c) => ({
        name: c.client_name,
        organization: c.organization_name,
        engagementRate: engagementLevelToRate[c.engagement_level] ?? 50,
        lastActivity: formatLastActive(c.last_active),
    }));
    return (_jsx(SystemAdminLayout, { title: "Client Engagement", children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { className: "py-4", children: [_jsx(EngagementSummary, { engagementRate: engagementRate }), _jsx(EngagementCharts, { weeklyEngagement: data?.weekly_engagement ?? [] }), _jsx(PatientSearchFilter, {}), _jsx(PatientEngagementTable, { patients: tablePatients }), _jsx(EngagementStatsPanel, { trends: trends, streaks: streaks })] }) }) }));
};
export default ClientEngagement;
