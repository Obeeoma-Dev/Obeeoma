import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navigation from "@/components/shared/Navigation";
import Hero from "@/pages/landingpage/Hero";
import Features from "@/pages/landingpage/Features";
import Benefits from "@/pages/landingpage/Benefits";
import Footer from "@/components/shared/Footer";
const Index = () => {
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Navigation, {}), _jsxs("main", { children: [_jsx("section", { id: "Hero", children: _jsx(Hero, {}) }), _jsx("section", { id: "features", className: "section-bg py-5", children: _jsx(Features, {}) }), _jsx("section", { id: "benefits", className: "section-bg py-5", children: _jsx(Benefits, {}) })] }), _jsx(Footer, {})] }));
};
export default Index;
