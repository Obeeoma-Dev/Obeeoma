import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Systemadmin/Hotlinepages/hotlineActivity.tsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import TopMetrics from "../../../components/admincomponents/Hotlinecomponents/hotLinetopmetrics";
import HourlyCallChart from "../../../components/admincomponents/Hotlinecomponents/hourlyCallChart";
import CallLogTable from "../../../components/admincomponents/Hotlinecomponents/callLogTable";
import { adminAPI } from "../../../api/apiConfig";
function formatCallDate(isoDate) {
    try {
        const d = new Date(isoDate);
        return {
            time: d.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
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
        return () => {
            cancelled = true;
        };
    }, []);
    const totalCalls = data?.today_calls ?? 0;
    const avgCallTime = data?.average_duration ?? "0:00";
    const activeOperators = data?.active_operators;
    const hourlyVolume = data?.hourly_volume;
    const logs = (data?.recent_calls ?? []).map((c) => {
        const { time, date } = formatCallDate(c.call_date ?? "");
        return {
            time,
            date,
            operator: c.operator_name ?? "—",
            status: (c.status ?? "").charAt(0).toUpperCase() + (c.status ?? "").slice(1),
        };
    });
    if (loading) {
        return (_jsx(SystemAdminLayout, { title: "Hotline Activity", children: _jsx(Container, { fluid: true, className: "py-4 d-flex justify-content-center align-items-center min-vh-50", children: _jsx(Spinner, { animation: "border" }) }) }));
    }
    if (error) {
        return (_jsx(SystemAdminLayout, { title: "Hotline Activity", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(Alert, { variant: "danger", children: error }), _jsx(TopMetrics, { totalCalls: 0, avgCallTime: "0:00" }), _jsx(Row, { children: _jsx(Col, { md: 12, children: _jsx(HourlyCallChart, {}) }) }), _jsx(CallLogTable, {})] }) }));
    }
    return (_jsx(SystemAdminLayout, { title: "Hotline Activity", children: _jsxs(Container, { fluid: true, children: [_jsx(TopMetrics, { totalCalls: totalCalls, avgCallTime: avgCallTime, activeOperators: activeOperators }), _jsx(Row, { children: _jsx(Col, { md: 12, children: _jsx(HourlyCallChart, { hourlyVolume: hourlyVolume }) }) }), _jsx(CallLogTable, { logs: logs.length ? logs : undefined })] }) }));
};
export default HotlineActivity;
