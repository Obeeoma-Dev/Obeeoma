import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import reusable Card components from your UI library
import { Card, CardContent } from "@/components/ui/card";
// Import icons from lucide-react
import { Shield, Globe, Sparkles, Heart, Smartphone, BarChart, } from "lucide-react";
const Features = () => {
    // List of features with icon, title, and description
    const features = [
        {
            icon: Shield,
            title: "Anonymous & Secure",
            description: "Built to be a safe and secure space so you can comfortably share what is on your mind without any worry of disclosure",
        },
        {
            icon: Globe,
            title: "Culturally Relevant",
            description: "Designed to suit the beliefs and practices unique with emphasis on cultural sensitivity and respect",
        },
        {
            icon: Sparkles,
            title: "AI Powered Insights",
            description: "Know more about the activities and services that resonate most with you through our data and learning algorithms",
        },
        {
            icon: Heart,
            title: "Team Wellbeing",
            description: "Comprehensive tools designed to support your team's wellbeing and mental health in the workplace",
        },
        {
            icon: Smartphone,
            title: "Responsive Application",
            description: "Optimized to work seamlessly on any device so you can access your mental health support from anywhere",
        },
        {
            icon: BarChart,
            title: "ROI Analytics",
            description: "Get meaningful metrics showing you the impact of your mental health programs on your organization's performance",
        },
    ];
    return (_jsx("section", { className: "py-24 bg-background", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold mb-4", children: "Comprehensive Obeeoma Features" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Everything you need to support mental health and wellness in one platform" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => {
                        const Icon = feature.icon; // ✅ Cast icon to JSX component
                        return (_jsx(Card, { className: "text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6", children: _jsx(Icon, { className: "w-8 h-8 text-primary" }) }), _jsx("h3", { className: "text-xl font-semibold mb-3", children: feature.title }), _jsx("p", { className: "text-muted-foreground", children: feature.description })] }) }, index));
                    }) })] }) }));
};
export default Features;
