import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Shield, Globe, Sparkles, Heart, Smartphone, BarChart } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
const Features = () => {
    const features = [
        { icon: Shield, title: "Secure & Private", desc: "Your wellbeing data stays confidential and encrypted." },
        { icon: Globe, title: "Culturally Relevant", desc: "Built with empathy for diverse African communities." },
        { icon: Sparkles, title: "AI Insights", desc: "Personalized feedback powered by smart analytics." },
        { icon: Heart, title: "Workplace Support", desc: "Tools to improve team wellbeing and harmony." },
        { icon: Smartphone, title: "Mobile Ready", desc: "Access your support from any device, anytime." },
        { icon: BarChart, title: "Analytics", desc: "Understand wellbeing trends and program impact." },
    ];
    return (_jsx("section", { className: "section-bg py-5", children: _jsxs("div", { className: "container text-center", children: [_jsx("h2", { className: "fw-bold mb-3 text-primary", children: "Comprehensive Obeeoma Features" }), _jsx("p", { className: "text-muted mb-5", children: "Explore tools designed to enhance mental health in your organization." }), _jsx("div", { className: "row g-4", children: features.map((f, i) => (_jsx("div", { className: "col-md-4", children: _jsxs("div", { className: "card card-feature h-100 p-4", children: [_jsx("div", { className: "mb-3 text-primary", children: _jsx(f.icon, { size: 36 }) }), _jsx("h5", { className: "fw-semibold", children: f.title }), _jsx("p", { className: "text-muted", children: f.desc })] }) }, i))) })] }) }));
};
export default Features;
