import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/admincomponents/organisationcomponents/OrganizationDetails.tsx
// NOTE: This file is written in a very beginner-friendly style.
// Every line has a short comment explaining what it does.
// It uses only React and React-Bootstrap (like your original),
// so you can replace your current file with this one safely.
// The code keeps your existing Sidebar, Header, and OrganizationCharts,
// and only refines layout and data to match the dashboard in your image.
// 1) Import React features we need from the React library.
import { useEffect, useState } from "react";
// 2) Import helpers from react-router-dom to read the URL and navigate to other pages.
import { useParams, useNavigate } from "react-router-dom";
// 3) Import UI components from react-bootstrap for layout and styling.
import { Container, // A full-width wrapping area
Card, // A panel with header/body
Row, // A horizontal layout row
Col, // A column inside a row
Button, // A clickable button
ListGroup, // A list container for items
ProgressBar, // A progress bar (we will use it to mimic a bar chart)
Spinner, // A loading spinner shown while fetching data
Badge, // A small status pill for the "Active" state
 } from "react-bootstrap";
// 4) Import your existing Sidebar component (left navigation).
import Sidebar from "../../../components/admincomponents/adminsidebar";
// 5) Import your existing Header component (top navigation).
import Header from "../../../components/admincomponents/adminheader";
// 6) Import your existing charts component for the "Platform Usage" line graph.
//    We will keep using it to avoid breaking working parts.
import OrganizationCharts from "../../../components/admincomponents/organisationcomponents/organisation.chats";
// 8) Create the React functional component for the Organization Details page.
const OrganizationDetails = () => {
    // 9) Read the "id" parameter from the URL (e.g., /organizations/:id).
    const { id } = useParams();
    // 10) Create a helper function to navigate to other pages when buttons are clicked.
    const navigate = useNavigate();
    // 11) Create a state variable "org" to hold the organization data once loaded.
    //     It starts as null until we fetch or prepare data.
    const [org, setOrg] = useState(null);
    // 12) Create a state variable "loading" to indicate when data is being loaded.
    //     We show a spinner while loading is true.
    const [loading, setLoading] = useState(true);
    // 13) Load the organization data when the component first renders or when the "id" changes.
    useEffect(() => {
        // 14) Set loading to true before we start fetching/preparing data.
        setLoading(true);
        // 15) Simulate an asynchronous fetch using setTimeout.
        //     In your real app, you will replace this with an actual API call (e.g., fetch or axios).
        setTimeout(() => {
            // 16) This is the placeholder data shaped to match the dashboard image.
            const placeholder = {
                // 17) Organization name shown at the top and in cards.
                name: "Wellness Center Inc.",
                // 18) The admin responsible for the organization.
                admin: "Sarah Paul",
                // 19) Total clients count shown in the summary area.
                clients: 245,
                // 20) The number of active programs (image shows 8).
                programs: 8,
                // 21) Last active time shown in the header details.
                lastActive: "2 hours ago",
                // 22) The unique ID (image shows "ORG-001").
                id: "ORG-001",
                // 23) The subscription plan (image shows "Premium").
                subscription: "Premium",
                // 24) Current status (image shows "Active").
                status: "Active",
                // 25) Created time (your original had "2 years ago"; we keep it).
                created: "2 years ago",
                // 26) The region for this organization (image shows "West").
                region: "West",
                // 27) Program engagement values matching the image (percent values).
                engagementBreakdown: {
                    crisisSupport: 45,
                    wellbeing: 15,
                    other1: 30,
                    other2: 20,
                },
                // 28) Recent activity items expanded to match the image.
                activity: [
                    "Subscription Renewed: 2 days ago - Premium Plan",
                    "Monthly Report Generated: 1 week ago - August 2023",
                    "Activity Threshold Alert: 3 weeks ago - Low engagement detected",
                    "Client Milestone Achieved: 1 month ago - 50 new active clients",
                ],
                // 29) Optional navigation links we can show in the page (to mirror the image).
                navigationLinks: [
                    "Organization Settings",
                    "User Management",
                    "Program Settings",
                    "Billing History",
                    "Deactivate Organization",
                ],
            };
            // 30) Save the placeholder data into our "org" state, so the UI can render it.
            setOrg(placeholder);
            // 31) Set loading to false because we are done preparing data.
            setLoading(false);
        }, 800); // 32) A short delay to simulate network time (800ms).
    }, [id]); // 33) If the "id" changes, this effect runs again to load the new org data.
    // 34) If we are still loading, show a full-page layout with the spinner.
    if (loading) {
        return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsxs(Container, { fluid: true, className: "p-5 text-center", children: [_jsx(Spinner, { animation: "border", variant: "primary" }), _jsx("p", { className: "mt-3", children: "Loading organization details..." })] })] })] }));
    }
    // 39) If loading is done but org is missing (e.g., fetch failed), show a simple error.
    if (!org) {
        return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx(Container, { fluid: true, className: "p-5 text-danger", children: "Organization not found." })] })] }));
    }
    // 42) If we have data and we are not loading, render the main content.
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsxs(Container, { fluid: true, className: "p-4 overflow-auto", children: [_jsx(Button, { variant: "outline-secondary", onClick: () => navigate("/system-admin/organizations"), className: "mb-4", children: "\u2190 Wellness Center Inc." }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Actions" }), _jsx(Card.Body, { children: _jsxs("div", { className: "d-flex gap-2", children: [_jsx(Button, { variant: "outline-success", size: "sm", children: "Manage Subscription" }), _jsx(Button, { variant: "outline-primary", size: "sm", children: "Save Changes" })] }) })] }), _jsxs("h3", { className: "text-success fw-bold mb-4", children: ["Organization Overview: ", org.name] }), _jsxs(Row, { className: "gy-4 mb-4", children: [_jsx(Col, { md: 4, children: _jsxs(Card, { className: "shadow-sm h-100", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Organization Summary" }), _jsx(Card.Body, { children: _jsxs(Row, { className: "gy-3", children: [_jsxs(Col, { xs: 12, children: [_jsx("strong", { children: "Name:" }), " ", _jsx("div", { children: org.name })] }), _jsxs(Col, { xs: 12, children: [_jsx("strong", { children: "ID:" }), " ", _jsx("div", { children: org.id })] }), _jsxs(Col, { xs: 12, children: [_jsx("strong", { children: "Subscription Plan:" }), " ", _jsx("div", { children: org.subscription })] }), _jsxs(Col, { xs: 12, children: [_jsx("strong", { children: "Status:" }), " ", _jsx(Badge, { bg: org.status === "Active" ? "success" : "secondary", children: org.status })] }), _jsxs(Col, { xs: 12, children: [_jsx("strong", { children: "Region:" }), " ", _jsx("div", { children: org.region })] }), _jsxs(Col, { xs: 12, children: [_jsx("strong", { children: "Last Active:" }), " ", _jsx("div", { children: org.lastActive })] })] }) })] }) }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx("strong", { children: "Total Clients:" }), _jsx("h4", { className: "mt-2 text-primary", children: org.clients })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "shadow-sm h-100", children: _jsxs(Card.Body, { children: [_jsx("strong", { children: "Active Programs:" }), _jsx("h4", { className: "mt-2 text-primary", children: org.programs })] }) }) })] }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Navigation Links" }), _jsx(Card.Body, { children: _jsx(ListGroup, { variant: "flush", children: (org.navigationLinks && org.navigationLinks.length > 0
                                                ? org.navigationLinks
                                                : [
                                                    "Organization Settings",
                                                    "User Management",
                                                    "Program Settings",
                                                    "Billing History",
                                                    "Deactivate Organization",
                                                ]).map((linkText, index) => (
                                            // 69) Each item is clickable in the future; for now, we just display them.
                                            _jsx(ListGroup.Item, { children: linkText }, index))) }) })] }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Program Engagement (%)" }), _jsxs(Card.Body, { children: [_jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: "Crisis Support" }), _jsx(ProgressBar, { now: org.engagementBreakdown.crisisSupport, label: `${org.engagementBreakdown.crisisSupport}%`, variant: "danger" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: "Wellbeing" }), _jsx(ProgressBar, { now: org.engagementBreakdown.wellbeing, label: `${org.engagementBreakdown.wellbeing}%`, variant: "success" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("strong", { children: "Program A" }), _jsx(ProgressBar, { now: org.engagementBreakdown.other1, label: `${org.engagementBreakdown.other1}%`, variant: "info" })] }), _jsxs("div", { children: [_jsx("strong", { children: "Program B" }), _jsx(ProgressBar, { now: org.engagementBreakdown.other2, label: `${org.engagementBreakdown.other2}%`, variant: "warning" })] })] })] }), _jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Platform Usage (Last 6 Weeks)" }), _jsx(Card.Body, { children: _jsx(OrganizationCharts, {}) })] }), _jsxs(Card, { className: "shadow-sm", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Recent Activity" }), _jsx(Card.Body, { children: _jsx(ListGroup, { variant: "flush", children: org.activity.map((event, index) => (
                                            // 90) Each event gets its own list item with a unique key
                                            _jsx(ListGroup.Item, { children: event }, index))) }) })] })] })] })] }));
};
// 91) Export the component as the default export so it can be imported elsewhere.
export default OrganizationDetails;
