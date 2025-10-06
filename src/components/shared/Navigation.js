import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import logo from '../../assets/Images/obeeomalogoicon2.png';
const Navigation = () => {
    return (_jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border", children: _jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-12", children: [_jsx("img", { src: logo, alt: "Obeeoma Logo", className: "h-8 w-auto" }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [_jsx("a", { href: "#learn", className: "text-sm font-medium text-white hover:text-[#3CB371] transition-colors", children: "Resources" }), _jsx("a", { href: "#pricing", className: "text-sm font-medium text-white hover:text-[#3CB371] transition-colors", children: "Pricing" }), _jsx("a", { href: "#benefits", className: "text-sm font-medium text-white hover:text-[#3CB371] transition-colors", children: "Benefits" })] })] }), _jsx(Button, { variant: "hero", className: "bg-gradient-to-r from-green-500 to-red-500 hover:from-green-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl", size: "lg", children: "Create Account" })] }) }));
};
export default Navigation;
