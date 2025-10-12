import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Building2, Users, BarChart3 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import happyPersonImage from "../../assets/Images/professional-worker.png";
const HowItWorks = () => {
    const steps = [
        {
            icon: Building2,
            title: "Register Your Company",
            desc: "Get started in minutes and set up your workplace hub.",
        },
        {
            icon: Users,
            title: "Invite Employees",
            desc: "Give your team instant access to mental health tools.",
        },
        {
            icon: BarChart3,
            title: "Track Progress",
            desc: "View insights and see how your people are improving.",
        },
    ];
    return (_jsx("section", { className: "section-bg-dark text-white py-5", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "text-center mb-5", children: [_jsx("h2", { className: "fw-bold", children: "How It Works" }), _jsx("p", { className: "text-light opacity-75", children: "Three simple steps to start empowering wellbeing at work" })] }), _jsxs("div", { className: "row align-items-center", children: [_jsx("div", { className: "col-md-6 mb-4 mb-md-0", children: _jsx("img", { src: happyPersonImage, alt: "Happy worker", className: "img-fluid rounded-4 shadow-lg" }) }), _jsx("div", { className: "col-md-6", children: steps.map((s, i) => (_jsxs("div", { className: "d-flex align-items-start mb-4", children: [_jsx("div", { className: "me-3 p-3 rounded-circle bg-light text-success", children: _jsx(s.icon, { size: 24 }) }), _jsxs("div", { children: [_jsx("h5", { className: "fw-semibold", children: s.title }), _jsx("p", { className: "text-light opacity-75 mb-0", children: s.desc })] })] }, i))) })] })] }) }));
};
export default HowItWorks;
