import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col } from "react-bootstrap";
import { Phone, Clock, XCircle } from "lucide-react";
import { HoverStatCard } from "./hoverCard";
const TopMetrics = ({ totalCalls, avgCallTime, missedCalls = 0, activeOperators, }) => {
    const useActiveOps = activeOperators != null;
    return (_jsx(_Fragment, { children: _jsxs(Row, { className: "mb-4", style: { fontFamily: "body", fontWeight: "600px" }, children: [_jsx(Col, { xs: 12, md: 4, className: "mb-3 mb-md-0", children: _jsx(HoverStatCard, { title: "Today's Calls", value: String(totalCalls), subtitle: "Total incoming calls", trend: "+8% vs yesterday", icon: Phone, color: "emerald" }) }), _jsx(Col, { xs: 12, md: 4, className: "mb-3 mb-md-0", children: _jsx(HoverStatCard, { title: "Avg. Call Time", value: avgCallTime, subtitle: "Average duration", trend: "-0:05 vs last week", icon: Clock, color: "emerald" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(HoverStatCard, { title: useActiveOps ? "Active Operators" : "Missed Calls", value: String(useActiveOps ? activeOperators : missedCalls), subtitle: useActiveOps ? "Operators on duty today" : "Calls not answered", trend: useActiveOps ? "Currently active" : "+1 vs yesterday", icon: useActiveOps ? Phone : XCircle, color: "emerald" }) })] }) }));
};
export default TopMetrics;
