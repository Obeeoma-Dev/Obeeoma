import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Stack, Button, Spinner } from "react-bootstrap";
import { ArrowLeft, CreditCard, Save } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// Page components
import Sidebar from "../../../components/admincomponents/adminsidebar";
import Header from "../../../components/admincomponents/adminheader";
import { OrganizationProfile } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationProfile";
import { OrganizationStats } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationStats";
import { PlatformUsageChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/organizationPlatformUse";
// import { ProgramEngagementChart } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/programEngagementChart";
import { RecentActivity } from "../../../components/admincomponents/organisationcomponents/OrganizationDetails/recentActivity";
import "./orgpage.css";
export function OrganizationDetails() {
    // Get organization ID from URL params
    const { id } = useParams();
    const navigate = useNavigate();
    // Environment detection and conditional API setup
    const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
    const conditionalAPIBaseURL = isLocalhost
        ? "http://127.0.0.1:8000/api/v1" // Neon backend for localhost development
        : "https://obeeoma-api.com/api/v1"; // Digital Ocean backend for production
    // Create a stable API instance (so it doesn't change every render)
    const conditionalAPI = useMemo(() => {
        const instance = axios.create({
            baseURL: conditionalAPIBaseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        return instance;
    }, [conditionalAPIBaseURL]);
    // Use the stable instance for requests
    const getOrganizationsList = React.useCallback(async (page = 1, pageSize = 10, search = "") => {
        const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
        });
        if (search) {
            params.append("search", search);
        }
        const response = await conditionalAPI.get(`/admin/organizations/?${params}`);
        return response;
    }, [conditionalAPI]);
    // State for organization data
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch organization details
    useEffect(() => {
        const fetchOrganizationDetails = async () => {
            if (!id) {
                setError("Organization ID not found");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                // Use conditional API to avoid /v1/ duplication
                const response = await getOrganizationsList(1, 100, ""); // Get all orgs
                const allOrgs = response.data.results || response.data || [];
                const foundOrg = allOrgs.find((org) => org.id.toString() === id);
                if (foundOrg) {
                    setOrganization(foundOrg);
                }
                else {
                    setError("Organization not found");
                }
            }
            catch (err) {
                console.error("Error fetching organization details:", err);
                setError("Failed to load organization details");
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrganizationDetails();
    }, [id, getOrganizationsList]);
    // Show loading state
    if (loading) {
        return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { className: "flex-grow-1 d-flex align-items-center justify-content-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Spinner, { animation: "border", variant: "success" }), _jsx("div", { className: "mt-2", children: "Loading organization details..." })] }) })] })] }));
    }
    // Show error state
    if (error || !organization) {
        return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { className: "flex-grow-1 d-flex align-items-center justify-content-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-danger mb-3", children: error || "Organization not found" }), _jsx(Button, { variant: "outline-success", onClick: () => navigate(-1), children: "Go Back" })] }) })] })] }));
    }
    return (
    // Root layout: sidebar + main content
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsxs(Container, { fluid: "xl", children: [_jsxs(Row, { className: "align-items-center mb-4", children: [_jsx(Col, { children: _jsx(Stack, { direction: "horizontal", gap: 3, children: _jsx(Button, { variant: "light", onClick: () => navigate(-1), "aria-label": "Go back", children: _jsx(ArrowLeft, { size: 20 }) }) }) }), _jsx(Col, { xs: "auto", children: _jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsxs(Button, { variant: "outline-success", children: [_jsx(CreditCard, { size: 16 }), "Manage Subscription"] }), _jsxs(Button, { variant: "success", children: [_jsx(Save, { size: 16 }), "Save Changes"] })] }) })] }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { lg: 6, className: "mb-4", children: _jsx(OrganizationProfile, { name: organization.name, id: `ORG-${organization.id}`, subscriptionPlan: organization.current_plan || "Freemium", status: organization.is_active ? "Active" : "Inactive", location: organization.Location || "Not specified", lastActive: new Date(organization.joined_date).toLocaleDateString() }) }), _jsx(Col, { lg: 6, className: "mb-4", children: _jsx(OrganizationStats, { organization: organization }) })] }), _jsxs(Col, { lg: 12, children: [_jsx("div", { className: "chart-row-wrapper", children: _jsx(Row, { className: "align-items-stretch mb-4 mb-lg-0", children: _jsx(Col, { lg: 12, className: "d-flex flex-column", children: _jsx("div", { className: "flex-grow-1", children: _jsx(PlatformUsageChart, {}) }) }) }) }), _jsx("div", { className: "mt-4", children: _jsx(RecentActivity, {}) })] })] }) })] })] }));
}
