import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PhoneIcon } from 'lucide-react';
import { Card } from 'react-bootstrap';
import './HotlineRecommendations.css';
const categoryStyles = {
    Crisis: 'hotline-category-crisis',
    Anxiety: 'hotline-category-anxiety',
    Youth: 'hotline-category-youth',
    General: 'hotline-category-general',
};
const defaultHotlines = [
    {
        name: 'National Suicide Prevention Lifeline',
        number: '988',
        category: 'Crisis',
        timesRecommended: 34,
        status: 'Active',
    },
    {
        name: 'Crisis Text Line',
        number: 'Text HOME to 741741',
        category: 'Crisis',
        timesRecommended: 28,
        status: 'Active',
    },
    {
        name: 'Anxiety & Depression Helpline',
        number: '1-800-950-6264',
        category: 'Anxiety',
        timesRecommended: 19,
        status: 'Active',
    },
    {
        name: 'Teen Line',
        number: '1-800-852-8336',
        category: 'Youth',
        timesRecommended: 15,
        status: 'Active',
    },
    {
        name: 'SAMHSA Helpline',
        number: '1-800-662-4357',
        category: 'General',
        timesRecommended: 11,
        status: 'Active',
    },
    {
        name: 'Domestic Violence Hotline',
        number: '1-800-799-7233',
        category: 'Crisis',
        timesRecommended: 8,
        status: 'Paused',
    },
];
export function HotlineRecommendations({ hotlines = defaultHotlines }) {
    return (_jsx(Card, { className: "hotline-recommendations-card", children: _jsxs(Card.Body, { className: "hotline-recommendations-body", children: [_jsxs("div", { className: "hotline-recommendations-header", children: [_jsx("h3", { className: "hotline-recommendations-title", children: "Hotline Recommendations" }), _jsx("p", { className: "hotline-recommendations-subtitle", children: "Numbers the AI is currently recommending to users in crisis" })] }), _jsxs("div", { className: "hotline-recommendations-content", children: [_jsxs("div", { className: "hotline-recommendations-grid-header", children: [_jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-name", children: "Hotline" }), _jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-category", children: "Category" }), _jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-times", children: "Times" }), _jsx("span", { className: "hotline-recommendations-header-cell hotline-recommendations-header-status", children: "Status" })] }), _jsx("div", { className: "hotline-recommendations-list", children: hotlines.map((hotline) => (_jsxs("div", { className: "hotline-recommendations-row", children: [_jsxs("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-name", children: [_jsx("p", { className: "hotline-recommendations-name", children: hotline.name }), _jsxs("div", { className: "hotline-recommendations-number-wrapper", children: [_jsx(PhoneIcon, { size: 11, className: "hotline-recommendations-phone-icon" }), _jsx("span", { className: "hotline-recommendations-number", children: hotline.number })] })] }), _jsx("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-category", children: _jsx("span", { className: `hotline-recommendations-category ${categoryStyles[hotline.category]}`, children: hotline.category }) }), _jsxs("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-times", children: [_jsx("span", { className: "hotline-recommendations-times-count", children: hotline.timesRecommended }), _jsx("span", { className: "hotline-recommendations-times-multiply", children: "\u00D7" })] }), _jsx("div", { className: "hotline-recommendations-cell hotline-recommendations-cell-status", children: _jsxs("span", { className: `hotline-recommendations-status ${hotline.status === 'Active' ? 'hotline-recommendations-status-active' : 'hotline-recommendations-status-paused'}`, children: [_jsx("span", { className: `hotline-recommendations-status-indicator ${hotline.status === 'Active' ? 'hotline-recommendations-indicator-active' : 'hotline-recommendations-indicator-paused'}` }), hotline.status] }) })] }, hotline.name))) })] })] }) }));
}
export default HotlineRecommendations;
