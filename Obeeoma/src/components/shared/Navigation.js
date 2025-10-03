import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
const Navigation = () => {
    return (_jsx("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border", children: _jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-12", children: [_jsx("h1", { className: "text-2xl font-bold text-primary", children: "Obeeoma" }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [_jsx("a", { href: "#learn", className: "text-sm font-medium text-foreground hover:text-primary transition-colors", children: "Resources" }), _jsx("a", { href: "#pricing", className: "text-sm font-medium text-foreground hover:text-primary transition-colors", children: "Pricing" }), _jsx("a", { href: "#benefits", className: "text-sm font-medium text-foreground hover:text-primary transition-colors", children: "Benefits" })] })] }), _jsx(Button, { variant: "hero", size: "lg", children: "Create Account" })] }) }));
};
export default Navigation;
