import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/adminpages/AIRecommendationsPage.tsx
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GlobeIcon, LayoutDashboardIcon, SmartphoneIcon } from "lucide-react";
import './aiControls.css';
import TopMetrics from "../../../components/admincomponents/Aicomponents/topmetric";
import EffectivenessChart from "../../../components/admincomponents/Aicomponents/effectivenessChart";
import WeeklyRecommendationsChart from "../../../components/admincomponents/Aicomponents/weeklyRecomendationChart";
// import AIResourcesTable from "../../../components/admincomponents/Aicomponents/airesourceTable";
import ModelPerformance from "../../../components/admincomponents/Aicomponents/modelPerformance";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { AIAssistant } from "../../../components/Aipopup/AiAssintant";
import { AIStatusToggle } from "../../../components/admincomponents/Aicomponents/Aitoggle";
import { FileText, Video, Headphones, MousePointerClick } from "lucide-react";
import { adminAPI } from "../../../api/apiConfig";
/**
 * AIRecommendationsPage renders the AI management dashboard.
 * Sidebar and header are fixed; main content scrolls independently.
 */
const AIRecommendationsPage = () => {
    // Placeholder metrics — replace with backend data later
    const metrics = {
        totalRecommendations: 1245,
        engagementRate: 72,
        averageTime: "5m 32s",
    };
    // AI enabled state
    const [aiEnabled, setAiEnabled] = useState(true);
    // Individual AI toggle states
    const [landingAI, setLandingAI] = useState(true);
    const [adminAI, setAdminAI] = useState(true);
    const [mobileAI, setMobileAI] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // Load AI status on component mount
    useEffect(() => {
        loadAIStatus();
    }, []);
    const loadAIStatus = async () => {
        try {
            const response = await adminAPI.getAIStatus();
            const statusData = response.data;
            if (statusData) {
                // Only use defaults if the feature doesn't exist at all
                setLandingAI(statusData.landing_ai?.is_enabled ?? true);
                setAdminAI(statusData.admin_ai?.is_enabled ?? true);
                setMobileAI(statusData.mobile_ai?.is_enabled ?? true);
            }
        }
        catch (error) {
            console.error('Failed to load AI status:', error);
            // Keep default values if API fails
        }
    };
    const handleAdminAIToggle = async (enabled) => {
        setIsLoading(true);
        try {
            await adminAPI.toggleAdminAI({ enabled });
            setAdminAI(enabled);
        }
        catch (error) {
            console.error('Failed to toggle Admin AI:', error);
            // Revert the state on error
            setAdminAI(!enabled);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleLandingAIToggle = async (enabled) => {
        setIsLoading(true);
        try {
            await adminAPI.toggleLandingAI({ enabled });
            setLandingAI(enabled);
        }
        catch (error) {
            console.error('Failed to toggle Landing AI:', error);
            // Revert the state on error
            setLandingAI(!enabled);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleMobileAIToggle = async (enabled) => {
        setIsLoading(true);
        try {
            await adminAPI.toggleMobileAI({ enabled });
            setMobileAI(enabled);
        }
        catch (error) {
            console.error('Failed to toggle Mobile AI:', error);
            // Revert the state on error
            setMobileAI(!enabled);
        }
        finally {
            setIsLoading(false);
        }
    };
    // AI resource effectiveness table
    const resources = [
        {
            id: 1,
            name: "Anxiety Management Techniques",
            type: "Article",
            icon: FileText,
            recommended: "156 times",
            engagement: 78,
            effectiveness: "High",
            lastUpdated: "2023-09-12",
            status: "High Effectiveness",
        },
        {
            id: 2,
            name: "Breathing Exercises for Anxiety",
            type: "Video",
            icon: Video,
            recommended: "243 times",
            engagement: 82,
            effectiveness: "High",
            lastUpdated: "2023-08-10",
            status: "High Effectiveness",
        },
        {
            id: 3,
            name: "Understanding Panic Attacks",
            type: "Article",
            icon: FileText,
            recommended: "124 times",
            engagement: 65,
            effectiveness: "Medium",
            lastUpdated: "2023-09-05",
            status: "High Effectiveness",
        },
        {
            id: 4,
            name: "Guided Meditation for Relief",
            type: "Audio",
            icon: Headphones,
            recommended: "198 times",
            engagement: 72,
            effectiveness: "Medium",
            lastUpdated: "2023-09-08",
            status: "High Effectiveness",
        },
        {
            id: 5,
            name: "Social Anxiety Coping Strategies",
            type: "Interactive",
            icon: MousePointerClick,
            recommended: "87 times",
            engagement: 58,
            effectiveness: "Low",
            lastUpdated: "2023-08-28",
            status: "High Effectiveness",
        },
    ];
    // Model performance scores
    const modelScores = [
        { name: "Activity Assignment Templates", score: 92 },
        { name: "Social Connection Prompts", score: 89 },
        { name: "Personalized Coping Strategies", score: 85 },
        { name: "Peer Support", score: 68 },
        { name: "Family Involvement", score: 64 },
    ];
    // Top anxiety triggers
    const triggers = [
        { name: "Social situations", score: 76 },
        { name: "Academic pressure", score: 68 },
        { name: "Peer pressure", score: 65 },
        { name: "Family relationships", score: 61 },
    ];
    return (_jsxs(SystemAdminLayout, { title: "AI Management", children: [_jsxs(Container, { fluid: true, className: "py-4", children: [_jsxs("div", { className: "ai-controls-section", children: [_jsxs("div", { className: "ai-controls-header", children: [_jsxs("div", { children: [_jsx("h2", { className: "ai-controls-title", children: "AI Controls" }), _jsx("p", { className: "ai-controls-subtitle", children: "Independently manage AI across each part of the platform" })] }), _jsxs("div", { className: "ai-controls-status", children: [_jsx("span", { className: "ai-controls-indicator" }), [landingAI, adminAI, mobileAI].filter(Boolean).length, " of 3 active"] })] }), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { xs: 12, md: 4, children: _jsx(AIStatusToggle, { isActive: landingAI, onToggle: handleLandingAIToggle, label: "Landing Page AI", description: "Reception chatbot that talks about the app and directs visitors. Does not save conversations.", icon: _jsx(GlobeIcon, { size: 20 }), lastActive: "Today at 1:12 PM" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(AIStatusToggle, { isActive: adminAI, onToggle: handleAdminAIToggle, label: "Admin Dashboard AI", description: "Provides insights, growth recommendations, and analytics summaries to the system admin.", icon: _jsx(LayoutDashboardIcon, { size: 20 }), lastActive: "Today at 2:34 PM" }) }), _jsx(Col, { xs: 12, md: 4, children: _jsx(AIStatusToggle, { isActive: mobileAI, onToggle: handleMobileAIToggle, label: "Mobile App AI", description: "Recommends hotline numbers and uploaded resources to users inside the mobile app.", icon: _jsx(SmartphoneIcon, { size: 20 }), lastActive: "Today at 3:05 PM" }) })] })] }), _jsx(TopMetrics, { ...metrics }), _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { md: 6, children: _jsx(EffectivenessChart, {}) }), _jsx(Col, { md: 6, children: _jsx(WeeklyRecommendationsChart, {}) })] }), _jsx(Row, { children: _jsx(ModelPerformance, {}) })] }), _jsx(AIAssistant, { isEnabled: adminAI })] }));
};
export default AIRecommendationsPage;
