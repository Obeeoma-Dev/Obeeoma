import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { ArrowLeft, CreditCard, Save } from "lucide-react";
// Page components
import Sidebar from "../../../components/admincomponents/adminsidebar";
import Header from "../../../components/admincomponents/adminheader";
import { OrganizationProfile } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationProfile";
import { OrganizationStats } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationStats";
import { PlatformUsageChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationPlatformUse";
import { ProgramEngagementChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/programEngagementChart";
import { RecentActivity } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/recentActivity";
import { useNavigate } from "react-router-dom";
export function OrganizationDetails() {
    // A navigation function.
    const navigate = useNavigate();
    return (
    // Root layout: sidebar + main content
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsxs(Container, { fluid: "xl", children: [_jsxs(Row, { className: "align-items-center mb-4", children: [_jsx(Col, { children: _jsxs(Stack, { direction: "horizontal", gap: 3, children: [_jsx(Button, { variant: "light", onClick: () => navigate(-1), "aria-label": "Go back", children: _jsx(ArrowLeft, { size: 20 }) }), _jsx("h1", { className: "h4 mb-0 fw-bold", children: "Wellness Center Inc." })] }) }), _jsx(Col, { xs: "auto", children: _jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsxs(Button, { variant: "outline-primary", children: [_jsx(CreditCard, { size: 16 }), "Manage Subscription"] }), _jsxs(Button, { variant: "primary", children: [_jsx(Save, { size: 16 }), "Save Changes"] })] }) })] }), _jsxs(Row, { children: [_jsx(Col, { lg: 3, className: "mb-4", children: _jsx(OrganizationProfile, { name: "Wellness Center Inc.", id: "ORG-001", subscriptionPlan: "Premium", status: "Active", region: "West", lastActive: "2 hours ago" }) }), _jsxs(Col, { lg: 9, children: [_jsx(OrganizationStats, {}), _jsxs(Row, { className: "mt-4", children: [_jsx(Col, { lg: 6, className: "mb-4 mb-lg-0", children: _jsx(PlatformUsageChart, {}) }), _jsx(Col, { lg: 6, children: _jsx(ProgramEngagementChart, {}) })] }), _jsx("div", { className: "mt-4", children: _jsx(RecentActivity, {}) })] })] })] }) })] })] }));
}
