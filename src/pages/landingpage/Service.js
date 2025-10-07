import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, Brain, Users, Calendar, TrendingUp, Heart, CheckCircle2 } from "lucide-react";
import image3 from "@/assets/Images/image3.png";
import "bootstrap/dist/css/bootstrap.min.css";
const Services = () => {
    const services = [
        { icon: FileText, title: "Simple Plan", desc: "One clear plan with transparent pricing." },
        { icon: Brain, title: "Mood Tracking", desc: "Track your emotions and mental health daily." },
        { icon: Users, title: "Crisis Support", desc: "Instant help whenever you need it most." },
        { icon: Calendar, title: "Check-ins", desc: "Stay on top of your wellness with guided reviews." },
        { icon: TrendingUp, title: "Skill Building", desc: "Grow with evidence-based resilience tools." },
        { icon: Heart, title: "Assessments", desc: "Learn more about yourself through regular self-checks." },
        { icon: CheckCircle2, title: "Unified Portal", desc: "Everything you need, all in one easy place." },
    ];
    return (_jsx("section", { className: "section-bg py-5", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "text-center mb-5", children: [_jsx("h2", { className: "fw-bold text-primary", children: "Our Core Services" }), _jsx("p", { className: "text-muted", children: "Powerful tools to help you and your organization thrive mentally." })] }), _jsxs("div", { className: "row align-items-center", children: [_jsx("div", { className: "col-lg-5 mb-4 mb-lg-0", children: _jsx("img", { src: image3, alt: "Professional working", className: "img-fluid rounded-4 shadow-lg" }) }), _jsx("div", { className: "col-lg-7", children: _jsx("div", { className: "row g-4", children: services.map((s, i) => (_jsx("div", { className: "col-md-6", children: _jsxs("div", { className: "card card-feature h-100 p-3", children: [_jsx("div", { className: "text-primary mb-2", children: _jsx(s.icon, { size: 28 }) }), _jsx("h6", { className: "fw-semibold", children: s.title }), _jsx("p", { className: "text-muted small", children: s.desc })] }) }, i))) }) })] })] }) }));
};
export default Services;
