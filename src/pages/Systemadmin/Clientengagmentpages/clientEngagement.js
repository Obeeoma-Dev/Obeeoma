import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// clientEngagement.tsx
// Main page for displaying client engagement dashboard with sidebar layout
import { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
// Import sidebar and dashboard components
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import EngagementSummary from "../../../components/admincomponents/Clientcomponents/engagementsummary";
import EngagementCharts from "../../../components/admincomponents/Clientcomponents/engagementCharts";
import PatientSearchFilter from "../../../components/admincomponents/Clientcomponents/patientsearchfilter";
import PatientEngagementTable from "../../../components/admincomponents/Clientcomponents/patientEngagementTable";
import EngagementStatsPanel from "../../../components/admincomponents/Clientcomponents/engagemntStartsPanel";
import Header from "../../../components/admincomponents/adminheader";
// Placeholder data to simulate backend response
const placeholderData = {
    engagementRate: 78,
    activePrograms: 12,
    totalPoints: 285432,
    patients: [
        {
            name: "Madison Carano",
            organization: "HealthOne",
            engagementRate: 92,
            pointsRedeemed: 1200,
            lastActivity: "2h ago",
        },
        {
            name: "William Johnson",
            organization: "MediCare",
            engagementRate: 88,
            pointsRedeemed: 980,
            lastActivity: "3h ago",
        },
        {
            name: "Vanessa Jefferson",
            organization: "HealthOne",
            engagementRate: 85,
            pointsRedeemed: 1100,
            lastActivity: "1h ago",
        },
    ],
    trends: {
        weekly: 5,
        monthly: 12,
        rewardActivity: 8,
    },
    streaks: {
        sevenDay: 65,
        thirtyDay: 45,
        sixtyDay: 30,
    },
};
// Main component
const ClientEngagement = () => {
    // State to hold engagement data
    const [data, setData] = useState(null);
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // State to track any errors
    const [error, setError] = useState(null);
    // Simulate backend fetch using placeholder data
    useEffect(() => {
        const simulateFetch = async () => {
            try {
                // Simulate network delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Set placeholder data as if it came from backend
                setData(placeholderData);
            }
            catch (err) {
                // Catch any unexpected errors
                setError(err.message);
            }
            finally {
                // Stop loading spinner
                setLoading(false);
            }
        };
        simulateFetch();
    }, []);
    // Temporary usage to satisfy ESLint (remove once real props are passed)
    console.log("Simulated data:", data);
    console.log("Loading state:", loading);
    // Show error message if something goes wrong
    if (error) {
        return (_jsxs("div", { style: { display: "flex" }, children: [_jsx(AdminSidebar, {}), _jsx(Container, { className: "mt-5", children: _jsxs(Alert, { variant: "danger", children: ["Error: ", error] }) })] }));
    }
    // Render dashboard layout
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx(AdminSidebar, {}), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx(Header, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { className: "py-4", children: [_jsx(EngagementSummary, { engagementRate: data?.engagementRate ?? 0, activePrograms: data?.activePrograms ?? 0, totalPoints: data?.totalPoints ?? 0 }), _jsx(EngagementCharts, {}), _jsx(PatientSearchFilter, {}), _jsx(PatientEngagementTable, {}), _jsx(EngagementStatsPanel, { topRewards: data?.patients
                                            .sort((a, b) => b.pointsRedeemed - a.pointsRedeemed)
                                            .slice(0, 3)
                                            .map((patient) => ({
                                            name: patient.name,
                                            points: patient.pointsRedeemed,
                                        })) ?? [], trends: {
                                            courseCompletion: data?.trends.weekly ?? 0,
                                            rewardRedemption: data?.trends.rewardActivity ?? 0,
                                            memberActivity: data?.trends.monthly ?? 0,
                                        }, streaks: {
                                            sevenDay: data?.streaks.sevenDay ?? 0,
                                            thirtyDay: data?.streaks.thirtyDay ?? 0,
                                            sixtyDay: data?.streaks.sixtyDay ?? 0,
                                        } })] }) }) })] })] }));
};
export default ClientEngagement;
