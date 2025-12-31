import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { Phone, Clock, XCircle } from "lucide-react";
import { StatCard } from "./startCards";
const TopMetrics = ({ totalCalls, avgCallTime, missedCalls, }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Row, { className: "mb-4", children: _jsxs(Col, { children: [_jsx("h1", { className: "fw-bold text-dark", style: { fontFamily: 'heading' }, children: "Hotline Activity" }), _jsx("p", { className: "text-muted small", style: { fontFamily: 'body' }, children: "Real-time monitoring of crisis line operations and performance." })] }) }), _jsxs(Row, { className: "mb-4", style: { fontFamily: 'body', fontWeight: '600px' }, children: [_jsx(Col, { xs: 12, md: 4, className: "mb-3 mb-md-0", children: _jsx(StatCard, { title: "Today's Calls", value: String(totalCalls), subtitle: "Total incoming calls", trend: "+8% vs yesterday", icon: Phone, color: "emerald" }) }), _jsx(Col, { xs: 12, md: 4, className: "mb-3 mb-md-0", children: _jsx(StatCard, { title: "Avg. Call Time", value: avgCallTime, subtitle: "Average duration", trend: "-0:05 vs last week", icon: Clock, color: "blue" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(StatCard, { title: "Missed Calls", value: String(missedCalls), subtitle: "Calls not answered", trend: "+1 vs yesterday", icon: XCircle, color: "rose" }) })] })] }));
};
export default TopMetrics;
