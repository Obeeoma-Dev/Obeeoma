import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Systemadmin/Hotlinepages/hotlineActivity.tsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import TopMetrics from "../../../components/admincomponents/Hotlinecomponents/hotLinetopmetrics";
import HourlyCallChart from "../../../components/admincomponents/Hotlinecomponents/hourlyCallChart";
import CallReasonsChart from "../../../components/admincomponents/Hotlinecomponents/callsResourcesChart";
import CallLogTable from "../../../components/admincomponents/Hotlinecomponents/callLogTable";
import CriticalCases from "../../../components/admincomponents/Hotlinecomponents/criticalCases";
import OperatorPerformance from "../../../components/admincomponents/Hotlinecomponents/operatorPerformance";
import { adminAPI } from "../../../api/apiConfig";
function formatCallDate(isoDate) {
    try {
        const d = new Date(isoDate);
        return {
            time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
            date: d.toLocaleDateString(),
        };
    }
    catch {
        return { time: "—", date: "—" };
    }
}
const HotlineActivity = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await adminAPI.getHotlineActivity();
                if (!cancelled)
                    setData(res?.data ?? res ?? null);
            }
            catch (e) {
                if (!cancelled)
                    setError(e instanceof Error ? e.message : "Failed to load hotline data");
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);
    const totalCalls = data?.today_calls ?? 0;
    const avgCallTime = data?.average_duration ?? "0:00";
    const activeOperators = data?.active_operators;
    const hourlyVolume = data?.hourly_volume;
    const callReasons = data?.call_reasons;
    const logs = (data?.recent_calls ?? []).map((c) => {
        const { time, date } = formatCallDate(c.call_date ?? "");
        return {
            time,
            date,
            reason: (c.reason ?? "").charAt(0).toUpperCase() + (c.reason ?? "").slice(1),
            operator: c.operator_name ?? "—",
            status: (c.status ?? "").charAt(0).toUpperCase() + (c.status ?? "").slice(1),
        };
    });
    const criticalCasesList = (data?.critical_cases ?? []).map((c) => ({
        id: c.call_id ?? "",
        reason: (c.reason ?? "").charAt(0).toUpperCase() + (c.reason ?? "").slice(1),
        status: (c.status ?? "").charAt(0).toUpperCase() + (c.status ?? "").slice(1),
        assignedTo: c.operator_name ?? "—",
        type: (c.urgency === "critical" ? "critical" : "warning"),
    }));
    const operatorList = (data?.operator_performance ?? []).map((o) => ({
        name: o.name ?? "—",
        performance: Number(o.resolution_rate) ?? 0,
        calls: o.calls,
    }));
    if (loading) {
        return (_jsx(SystemAdminLayout, { title: "Hotline Activity", children: _jsx(Container, { fluid: true, className: "py-4 d-flex justify-content-center align-items-center min-vh-50", children: _jsx(Spinner, { animation: "border" }) }) }));
    }
    if (error) {
        return (_jsx(SystemAdminLayout, { title: "Hotline Activity", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Alert, { variant: "danger", children: error }), _jsx(TopMetrics, { totalCalls: 0, avgCallTime: "0:00" }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsx(HourlyCallChart, {}) }), _jsx(Col, { md: 6, children: _jsx(CallReasonsChart, {}) })] }), _jsx(CallLogTable, {}), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { xs: 12, lg: 6, children: _jsx(CriticalCases, {}) }), _jsx(Col, { xs: 12, lg: 6, children: _jsx(OperatorPerformance, {}) })] })] }) }));
    }
    return (_jsx(SystemAdminLayout, { title: "Hotline Activity", children: _jsxs(Container, { fluid: true, children: [_jsx(TopMetrics, { totalCalls: totalCalls, avgCallTime: avgCallTime, activeOperators: activeOperators }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsx(HourlyCallChart, { hourlyVolume: hourlyVolume }) }), _jsx(Col, { md: 6, children: _jsx(CallReasonsChart, { callReasons: callReasons }) })] }), _jsx(CallLogTable, { logs: logs.length ? logs : undefined }), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { xs: 12, lg: 6, children: _jsx(CriticalCases, { cases: criticalCasesList.length ? criticalCasesList : undefined }) }), _jsx(Col, { xs: 12, lg: 6, children: _jsx(OperatorPerformance, { operators: operatorList.length ? operatorList : undefined }) })] })] }) }));
};
export default HotlineActivity;
