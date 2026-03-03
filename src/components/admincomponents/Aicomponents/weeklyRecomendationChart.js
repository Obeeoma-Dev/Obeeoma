import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileTextIcon, VideoIcon, HeadphonesIcon, ZapIcon } from 'lucide-react';
import './weeklyRecommendationChart.css';
const typeConfig = {
    Article: {
        icon: _jsx(FileTextIcon, { size: 16 }),
        badgeClass: 'resource-type-badge article',
    },
    Video: {
        icon: _jsx(VideoIcon, { size: 16 }),
        badgeClass: 'resource-type-badge video',
    },
    Audio: {
        icon: _jsx(HeadphonesIcon, { size: 16 }),
        badgeClass: 'resource-type-badge audio',
    },
    Interactive: {
        icon: _jsx(ZapIcon, { size: 16 }),
        badgeClass: 'resource-type-badge interactive',
    },
};
const resources = [
    {
        name: 'Anxiety Management Techniques',
        type: 'Article',
        timesThisWeek: 156,
    },
    {
        name: 'Breathing Exercises for Anxiety',
        type: 'Video',
        timesThisWeek: 243,
    },
    {
        name: 'Understanding Panic Attacks',
        type: 'Article',
        timesThisWeek: 124,
    },
    {
        name: 'Guided Meditation for Relief',
        type: 'Audio',
        timesThisWeek: 198,
    },
    {
        name: 'Social Anxiety Coping Strategies',
        type: 'Interactive',
        timesThisWeek: 87,
    },
];
export function ResourceRecommendations() {
    return (_jsxs("div", { className: "resource-recommendations-container", children: [_jsxs("div", { className: "resource-recommendations-header", children: [_jsx("h3", { className: "resource-recommendations-title", children: "Recommended Resources" }), _jsx("p", { className: "resource-recommendations-subtitle", children: "Uploaded resources the AI is sharing with users" })] }), _jsx("div", { className: "resource-recommendations-list", children: resources.map((resource) => {
                    const config = typeConfig[resource.type];
                    return (_jsxs("div", { className: "resource-item", children: [_jsx("div", { className: "resource-icon-container", children: config.icon }), _jsxs("div", { className: "resource-content", children: [_jsx("p", { className: "resource-name", children: resource.name }), _jsx("span", { className: config.badgeClass, children: resource.type })] }), _jsxs("div", { className: "resource-stats", children: [_jsx("span", { className: "resource-count", children: resource.timesThisWeek.toLocaleString() }), _jsx("p", { className: "resource-label", children: "this week" })] })] }, resource.name));
                }) })] }));
}
export default ResourceRecommendations;
