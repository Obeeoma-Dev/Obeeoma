import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Shield, Brain, Users, Calendar, TrendingUp, Heart, } from "lucide-react"; // Import icons we'll use
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
const Benefits = () => {
    // Define benefits data matching the design
    const benefits = [
        {
            icon: Shield,
            title: "Anonymous & secure",
            description: "End-to-end encryption ensures complete privacy and anonymity for all user interactions.",
        },
        {
            icon: Brain,
            title: "Culturally Relevant",
            description: "Built specifically for African workplace cultures with local mental health practices and languages.",
        },
        {
            icon: Users,
            title: "AI Powered Insights",
            description: "Advanced AI provides personalized recommendations and identifies early warning signs.",
        },
        {
            icon: Calendar,
            title: "Team Wellbeing",
            description: "Track team morale and wellness trends without compromising individual privacy.",
        },
        {
            icon: TrendingUp,
            title: "Responsive Application",
            description: "A responsive application is one that adapts its layout and design to deferent devices and screen sizes for a consistent user experience.",
        },
        {
            icon: Heart,
            title: "ROI Analytics",
            description: "Measure the impact of mental health initiatives on productivity and employee satisfaction.",
        },
    ];
    return (_jsx("section", { className: "py-5 bg-light", "data-testid": "benefits-section", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "text-center mb-5", children: [_jsx("h2", { className: "display-5 fw-bold mb-3", children: "Comprehensive Obeeoma Features" }), _jsx("p", { className: "text-muted lead mb-5", children: "Everything your organization needs to build a mentally healthy workplace" })] }), _jsx("div", { className: "row g-4", children: benefits.map((benefit, index) => (_jsx("div", { className: "col-md-6 col-lg-4", "data-testid": `benefit-card-${index}`, children: _jsxs("div", { className: "card h-100 border-0 bg-white p-4", children: [_jsx("div", { className: "d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 p-3 mb-4", style: { width: "64px", height: "64px" }, children: _jsx(benefit.icon, { className: "text-success", size: 24 }) }), _jsx("h4", { className: "h5 mb-3", children: benefit.title }), _jsx("p", { className: "text-muted mb-0 small", children: benefit.description })] }) }, index))) })] }) }));
};
export default Benefits;
