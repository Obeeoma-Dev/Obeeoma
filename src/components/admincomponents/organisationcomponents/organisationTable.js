import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Button, Tabs, Tab, Form, Row, Col, InputGroup, Spinner, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle, FaSearch, } from "react-icons/fa";
import { adminAPI } from "../../../api/apiConfig";
import "./organisation.css";
import OrganizationRegistrationPopup from "./OrganizationRegistrationPopup";
// Convert database organization to table format
const convertToTableFormat = (org) => ({
    id: org.id.toString(),
    name: org.name,
    clients: org.client_count || 0,
    plan: org.current_plan === "Premium" ? "Premium" : "Freemium",
    status: org.is_active ? "Active" : "Inactive",
    lastActive: new Date(org.joined_date).toLocaleDateString(),
    address: org.Location || "Not specified", // Use Location with capital L
    programs: 0, // Not available from API
    icon: "", // Not available from API
});
// Render status icon based on status
const renderStatusIcon = (status) => {
    switch (status) {
        case "Active":
            return _jsx(FaCheckCircle, { className: "text-success me-1" });
        case "Pending":
            return _jsx(FaClock, { className: "text-warning me-1" });
        case "Inactive":
            return _jsx(FaTimesCircle, { className: "text-danger me-1" });
        default:
            return null;
    }
};
// Main dashboard component
const OrganizationDashboard = ({ organizations: propOrganizations = [], loading: propLoading = false, error: propError = null, hasMore: propHasMore = true, totalCount: propTotalCount = 0, onRefresh, onFetchMore, onSearch, onAdd, onUpdate, onDelete, conditionalAPI, }) => {
    // State for organizations (use prop data if provided, otherwise fallback to internal state)
    const [organizations, setOrganizations] = useState(propOrganizations);
    const [loading, setLoading] = useState(propLoading);
    const [hasMore, setHasMore] = useState(propHasMore);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(propTotalCount);
    // State for search input
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    // State for registration popup
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
    // Intersection Observer for endless scroll
    const observer = useRef(null);
    const lastOrganizationElementRef = useRef(null);
    // Update internal state when props change
    useEffect(() => {
        setOrganizations(propOrganizations);
        setLoading(propLoading);
        setHasMore(propHasMore);
        setTotalCount(propTotalCount);
    }, [
        propOrganizations,
        propLoading,
        propHasMore,
        propTotalCount,
    ]);
    // Fetch organizations with pagination (fallback if no onFetchMore provided)
    const fetchOrganizations = useCallback(async (pageNum = 1, search = "") => {
        if (onFetchMore) {
            onFetchMore(search);
            return;
        }
        // Fallback to original logic if no hook provided
        try {
            setLoading(true);
            console.log(`Fetching organizations: page=${pageNum}, search="${search}"`);
            // Use conditionalAPI if provided, otherwise use original adminAPI
            const apiInstance = conditionalAPI || adminAPI;
            const response = await apiInstance.getOrganizationsList?.(pageNum, 20, // Increased page size to show more organizations
            search);
            console.log("Table API Response:", response);
            // Handle response with simple typing
            const results = response?.data?.results || response?.data || [];
            const totalCount = response?.data?.count || (Array.isArray(results) ? results.length : 0);
            const hasNext = response?.data?.next !== undefined ? response?.data?.next !== null : false;
            // Convert to table format
            const formattedOrgs = results.map((org) => convertToTableFormat(org));
            if (pageNum === 1) {
                setOrganizations(formattedOrgs);
            }
            else {
                setOrganizations((prev) => {
                    // Create a Map to ensure uniqueness by ID
                    const orgMap = new Map();
                    // Add existing organizations
                    prev.forEach(org => orgMap.set(org.id, org));
                    // Add new organizations (this will overwrite duplicates with newer data)
                    formattedOrgs.forEach((org) => orgMap.set(org.id, org));
                    // Convert back to array
                    return Array.from(orgMap.values());
                });
            }
            setHasMore(hasNext);
            setTotalCount(totalCount);
            console.log(`Table: Processed ${formattedOrgs.length} organizations, total: ${totalCount}, hasMore: ${hasNext}`);
        }
        catch (error) {
            console.error("Error fetching organizations for table:", error);
            setOrganizations([]);
            setHasMore(false);
            setTotalCount(0);
        }
        finally {
            setLoading(false);
        }
    }, [conditionalAPI, onFetchMore]);
    // Initial fetch and search
    useEffect(() => {
        if (onSearch && searchTerm !== undefined) {
            onSearch(searchTerm);
            setPage(1);
            setHasMore(true);
        }
        else {
            setPage(1);
            setHasMore(true);
            fetchOrganizations(1, searchTerm);
        }
    }, [
        searchTerm,
        activeTab,
        fetchOrganizations,
        onSearch,
    ]);
    // Infinite scroll observer
    useEffect(() => {
        if (loading)
            return;
        if (observer.current)
            observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                const nextPage = page + 1;
                setPage(nextPage);
                if (onFetchMore) {
                    onFetchMore(searchTerm);
                }
                else {
                    fetchOrganizations(nextPage, searchTerm);
                }
            }
        });
        if (lastOrganizationElementRef.current) {
            observer.current.observe(lastOrganizationElementRef.current);
        }
        return () => {
            if (observer.current)
                observer.current.disconnect();
        };
    }, [
        loading,
        hasMore,
        page,
        searchTerm,
        fetchOrganizations,
        onFetchMore,
    ]);
    // Filter organizations by tab category
    const filterByTab = (orgs, tab) => {
        switch (tab) {
            case "Active":
                return orgs.filter((org) => org.status === "Active");
            case "Inactive":
                return orgs.filter((org) => org.status === "Inactive");
            case "Premium":
                return orgs.filter((org) => org.plan === "Premium");
            case "Freemium":
                return orgs.filter((org) => org.plan === "Freemium");
            default:
                return orgs;
        }
    };
    // Filter by search term
    const filterBySearch = (orgs) => orgs.filter((org) => `${org.name} ${org.id} ${org.plan}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()));
    // Handle successful organization registration
    const handleRegistrationSuccess = (newOrg) => {
        if (newOrg && onAdd) {
            onAdd(newOrg);
        }
        else {
            // Refresh organizations list to show newly registered organization
            fetchOrganizations(1, searchTerm);
        }
    };
    // Render table rows
    const renderTable = (orgs) => (_jsxs("div", { children: [propError && (_jsxs("div", { className: "alert alert-danger mb-3", children: [_jsxs("p", { className: "mb-2", children: ["Error loading organizations: ", propError] }), onRefresh && (_jsx(Button, { variant: "outline-danger", size: "sm", onClick: onRefresh, children: "Retry" }))] })), _jsxs("div", { className: "mb-2 text-muted", children: ["Showing ", orgs.length, " of ", totalCount, " organizations"] }), _jsx("div", { style: { height: "450px", overflowY: "auto" }, children: _jsxs(Table, { bordered: true, hover: true, responsive: true, className: "shadow-sm table-sm align-middle", children: [_jsx("thead", { className: "table-success align-middle sticky-top", children: _jsxs("tr", { children: [_jsx("th", { children: "Organization" }), _jsx("th", { children: "Clients" }), _jsx("th", { children: "Plan" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Last Active" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: orgs.length === 0 && !loading ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "text-center text-muted py-4", children: "No organizations found." }) })) : (orgs.map((org, index) => (_jsxs("tr", { ref: index === orgs.length - 1
                                    ? lastOrganizationElementRef
                                    : null, children: [_jsx("td", { children: _jsx("div", { className: "d-flex align-items-center", children: _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: org.name }), _jsxs("div", { className: "text-muted small", children: ["ID: ", org.id] })] }) }) }), _jsx("td", { children: org.clients.toLocaleString() }), _jsx("td", { children: _jsx("span", { className: `badge ${org.plan === "Premium" ? "bg-success" : "bg-secondary"}`, children: org.plan }) }), _jsxs("td", { children: [renderStatusIcon(org.status), org.status] }), _jsx("td", { children: _jsx("span", { className: "text-muted", children: org.lastActive }) }), _jsx("td", { children: _jsx(Link, { to: `/systemadmin/organizations/${org.id}`, children: _jsxs(Button, { variant: "outline-success", size: "sm", children: [_jsx(FaEye, { className: "me-1" }), "View Details"] }) }) })] }, `${org.id}-${index}`)))) })] }) }), loading && (_jsxs("div", { className: "text-center p-3", children: [_jsx(Spinner, { animation: "border", variant: "success" }), _jsx("div", { className: "mt-2 text-muted", children: "Loading more organizations..." })] })), !hasMore && orgs.length > 0 && (_jsx("div", { className: "text-center p-3 text-muted", children: "All organizations loaded" }))] }));
    return (_jsxs("div", { className: "mt-4", children: [_jsxs(Row, { className: "mb-3 align-items-center", children: [_jsx(Col, { children: _jsx("h5", { className: "fw-semibold text-success", style: { fontFamily: "heading" }, children: "Organization Dashboard" }) }), _jsx(Col, { className: "text-end", children: _jsx(Button, { className: "btn-organization", onClick: () => setShowRegistrationPopup(true), children: "+ Add Organization" }) })] }), _jsx(Row, { className: "mb-3", children: _jsx(Col, { md: 6, children: _jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { children: _jsx(FaSearch, {}) }), _jsx(Form.Control, { type: "text", placeholder: "Search by name, ID, or plan...", "aria-label": "Search organizations", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }) }) }), _jsx("style", { children: `
    .nav-pills .nav-link.active {
      background-color: #3CB371 !important;
      color: white !important;
    }

    .nav-pills .nav-link {
      border-radius: 6px;
      margin-right: 4px;
    }

    .nav-pills .nav-link:hover {
      background-color: #0B6E45 !important;
      color: white !important;
    }
  ` }), _jsx(Tabs, { activeKey: activeTab, onSelect: (k) => setActiveTab(k || "All"), className: "mb-3", justify: true, variant: "pills", "aria-label": "Organization filters", children: ["All", "Active", "Inactive", "Premium", "Freemium"].map((tab) => (_jsx(Tab, { eventKey: tab, title: tab, children: renderTable(filterBySearch(filterByTab(organizations, tab))) }, tab))) }), _jsx(OrganizationRegistrationPopup, { show: showRegistrationPopup, onHide: () => setShowRegistrationPopup(false), onRegistrationSuccess: handleRegistrationSuccess, conditionalAPI: conditionalAPI })] }));
};
export default OrganizationDashboard;
