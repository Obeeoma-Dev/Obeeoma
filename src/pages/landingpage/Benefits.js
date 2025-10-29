import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Network, } from "lucide-react"; // lucide-react icon components
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap grid & utility classes
// Benefits functional component (default export)
const Benefits = () => {
    // Array of benefit items to render; swap icon components here if needed.
    const benefits = [
        {
            icon: Network,
            title: "Anonymous & secure", // card title text
            description: "End-to-end encryption ensures complete privacy and anonymity for all user interactions.", // card description text
        },
        {
            icon: Network,
            title: "Culturally Relevant", // title
            description: "Built specifically for African workplace cultures with local mental health practices and languages.", // description
        },
        {
            icon: Network,
            title: "AI Powered Insights", // title
            description: "Advanced AI provides personalized recommendations and identifies early warning signs.", // description
        },
        {
            icon: Network,
            title: "Team Wellbeing", // title
            description: "Track team morale and wellness trends without compromising individual privacy.", // description
        },
        {
            icon: Network,
            title: "Responsive Application", // title
            description: "A responsive application adapts its layout across devices for a consistent user experience.", // description
        },
        {
            icon: Network,
            title: "ROI Analytics", // title
            description: "Measure the impact of mental health initiatives on productivity and employee satisfaction.", // description
        },
    ];
    // Render the benefits section using Bootstrap responsive grid
    return (_jsx("section", { 
        // Accessible section wrapper with spacing and light background
        className: "py-5 bg-light", "data-testid": "benefits-section", "aria-label": "Benefits", 
        // inline style kept minimal so Prettier/ESLint don't complain about unused classes
        style: { marginBottom: 0 }, children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "text-center mb-5", children: [_jsx("h2", { className: "display-5 fw-bold mb-3", children: "Comprehensive Obeeoma Features" }), _jsx("p", { className: "text-muted lead mb-5", children: "Everything your organization needs to build a mentally healthy workplace" })] }), _jsx("div", { className: "row g-4", children: benefits.map((benefit, index) => {
                        // Extract icon component for this benefit item
                        const Icon = benefit.icon;
                        return (_jsx("div", { className: "col-md-6 col-lg-4", "data-testid": `benefit-card-${index}`, children: _jsxs("div", { 
                                // Card container: white background, rounded corners, subtle shadow
                                className: "card h-100 border-0 bg-white p-4 rounded-3 shadow-sm", role: "group", "aria-labelledby": `benefit-title-${index}`, children: [_jsx("div", { className: "d-inline-flex align-items-center justify-content-center mb-4", style: {
                                            width: 64, // fixed diameter for visual consistency
                                            height: 64,
                                            borderRadius: "50%", // make it circular
                                            background: "#ffffff", // white background to create the 'white round border' look
                                            border: "1px solid rgba(15,157,89,0.06)", // faint green border
                                            marginBottom: 16, // spacing under the icon
                                        }, "aria-hidden": "true", children: _jsx(Icon, { className: "text-success", size: 20 }) }), _jsx("h4", { id: `benefit-title-${index}`, className: "h5 mb-3", children: benefit.title }), _jsx("p", { className: "text-muted mb-0 small", children: benefit.description })] }) }, index));
                    }) })] }) }));
};
export default Benefits;
