import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Building2, Users, BarChart3 } from "lucide-react";
<<<<<<< HEAD
import happyPersonImage from "../../assets/Images/professional-worker.png";
=======
import happyPersonImage from "@/assets/Images/professional-worker.png";
>>>>>>> 0625a07dda717cadb4821efcc497060fe62f6081
const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            icon: Building2,
            title: "Sign up your company",
            description: "Register your organization - it's fast",
        },
        {
            number: "2",
            icon: Users,
            title: "Invite Employees",
            description: "Send invitations to your team members to access mental health support",
        },
        {
            number: "3",
            icon: BarChart3,
            title: "Track Anonymized Insights",
            description: "Keep tabs on usage, monitor progress, and gain high-level insights into wellbeing trends across your teams",
        },
    ];
    return (_jsx("section", { className: "py-24 bg-background", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold mb-4", children: "How it works for Employers" }), _jsx("p", { className: "text-xl text-muted-foreground", children: "3 simple steps" })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [_jsx("div", { className: "space-y-12", children: steps.map((step, index) => (_jsxs("div", { className: "flex gap-6 items-start", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl", children: step.number }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(step.icon, { className: "w-5 h-5 text-primary" }), _jsx("h3", { className: "text-xl font-semibold", children: step.title })] }), _jsx("p", { className: "text-muted-foreground", children: step.description })] })] }, index))) }), _jsx("div", { className: "relative", children: _jsx("img", { src: happyPersonImage, alt: "Happy person", className: "rounded-3xl shadow-2xl w-full object-cover" }) })] })] }) }));
};
export default HowItWorks;
