import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FileText, Brain, Users, Calendar, TrendingUp, Heart, CheckCircle2, } from "lucide-react";
import image3 from "@/assets/Images/image3.png";
import image4 from "@/assets/Images/alex-green-2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
const Benefits = () => {
    const benefits = [
        {
            icon: FileText,
            title: "Know Just One Plan",
            description: "Simple, clear and easy-to-understand pricing structure. No hidden fees or unexpected expenses to deal with.",
        },
        {
            icon: Brain,
            title: "Mood Tracking",
            description: "Monitor your mental health in a quick-to-use daily diary. Keep an eye on how you feel as time goes by.",
        },
        {
            icon: Users,
            title: "Crisis Support",
            description: "Access immediate help. Get the right level of support if you need it, whether it's in the moment or ongoing.",
        },
        {
            icon: Calendar,
            title: "Mood Checking",
            description: "Regular check-ins to see how you're doing. Get insights to guide you on your mental wellness journey.",
        },
        {
            icon: TrendingUp,
            title: "Skill Building",
            description: "Develop strategies to cope and manage in your situation. Build skills that can enhance your mental strength.",
        },
        {
            icon: Heart,
            title: "Self Assessments",
            description: "Regular assessments to track progress and see how your journey is going. Understand yourself better with data.",
        },
        {
            icon: CheckCircle2,
            title: "Complete Portal",
            description: "Easy-to-use tools in one place for optimized mental health management. Simple and intuitive interface.",
        },
    ];
    // Divide benefits into rows of 6 cards per side (3x2)
    const half = Math.ceil(benefits.length / 2);
    const firstHalf = benefits.slice(0, half);
    const secondHalf = benefits.slice(half);
    const renderBenefitsGrid = (benefitSet) => (_jsx("div", { className: "row g-4", children: benefitSet.map((benefit, index) => (_jsx("div", { className: "col-12 col-md-6 col-lg-4", children: _jsx("div", { className: "card h-100 border-0 shadow-sm hover-shadow bg-white rounded-4", children: _jsxs("div", { className: "card-body text-center p-4", children: [_jsx("div", { className: "d-flex justify-content-center align-items-center bg-success-subtle rounded-circle mb-3", style: { width: "60px", height: "60px", margin: "0 auto" }, children: _jsx(benefit.icon, { className: "text-success fs-4" }) }), _jsx("h5", { className: "card-title fw-semibold", children: benefit.title }), _jsx("p", { className: "card-text text-muted small", children: benefit.description })] }) }) }, index))) }));
    return (_jsxs(_Fragment, { children: [_jsx("section", { className: "py-5", style: {
                    background: "linear-gradient(180deg, rgba(230, 255, 237, 0.7) 0%, #ffffff 100%)",
                    marginBottom: "-1rem",
                }, children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "text-center mb-5", children: [_jsx("h2", { className: "fw-bold text-success mb-3", children: "Mental Health Care Benefits" }), _jsx("p", { className: "text-muted fs-5 mx-auto", style: { maxWidth: "700px" }, children: "Our platform offers a range of benefits designed to support your mental health journey." })] }), _jsxs("div", { className: "row align-items-center g-5", children: [_jsx("div", { className: "col-lg-7", children: renderBenefitsGrid(firstHalf) }), _jsx("div", { className: "col-lg-5 text-center", children: _jsx("img", { src: image3, alt: "Professional working", className: "img-fluid rounded-4 shadow-lg", style: { maxHeight: "480px", objectFit: "cover" } }) })] })] }) }), _jsxs("section", { className: "py-5", style: {
                    background: "linear-gradient(180deg, #ffffff 0%, rgba(230, 255, 237, 0.7) 100%)",
                    marginBottom: "0",
                }, children: [_jsx("div", { className: "container", children: _jsxs("div", { className: "row align-items-center g-5 flex-lg-row-reverse", children: [_jsx("div", { className: "col-lg-5 text-center", children: _jsx("img", { src: image4, alt: "Supportive conversation", className: "img-fluid rounded-4 shadow-lg", style: { maxHeight: "480px", objectFit: "cover" } }) }), _jsx("div", { className: "col-lg-7", children: renderBenefitsGrid(secondHalf) })] }) }), _jsx("div", { style: {
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "100px",
                            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #00A859 100%)",
                        } })] })] }));
};
export default Benefits;
