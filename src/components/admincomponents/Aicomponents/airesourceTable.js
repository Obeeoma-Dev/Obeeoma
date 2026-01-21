import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Table, Badge, ProgressBar, Button } from "react-bootstrap";
import { CheckCircleFill, ExclamationTriangleFill, } from "react-bootstrap-icons";
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";
const ResourcesTable = ({ resources }) => {
    return (_jsxs(Card, { className: "shadow-sm mb-4", children: [_jsx(Card.Header, { className: "fw-semibold", children: "Resources Overview" }), _jsx(Card.Body, { className: "p-0", children: _jsxs(Table, { responsive: true, hover: true, borderless: true, className: "mb-0", children: [_jsx("thead", { className: "table-light text-uppercase small text-muted", style: { fontFamily: "heading" }, children: _jsxs("tr", { children: [_jsx("th", { className: "pl-2", children: "Resource" }), _jsx("th", { children: "Recommended" }), _jsx("th", { style: { width: "120px" }, children: "Engagement" }), _jsx("th", { children: "Effectiveness" }), _jsx("th", { children: "Last Updated" }), _jsx("th", { className: "text-end pr-2", children: "Actions" })] }) }), _jsx("tbody", { children: resources.map((resource) => {
                                const IconComponent = resource.icon;
                                return (_jsxs("tr", { children: [_jsx("td", { className: "align-middle", children: _jsxs("div", { className: "d-flex align-items-center gap-2", children: [_jsx("div", { className: "d-flex align-items-center justify-content-center rounded", style: {
                                                            width: 36,
                                                            height: 36,
                                                            backgroundColor: "#f1f3f5",
                                                        }, children: _jsx(IconComponent, { size: 18, color: resource.type === "Article"
                                                                ? "#0d6efd"
                                                                : resource.type === "Video"
                                                                    ? "#dc3545"
                                                                    : resource.type === "Audio"
                                                                        ? "#198754"
                                                                        : resource.type === "Interactive"
                                                                            ? "#fd7e14"
                                                                            : "#6c757d" }) }), _jsxs("div", { style: { fontFamily: "body" }, children: [_jsx("div", { className: "fw-medium", children: resource.name }), _jsx("div", { className: "text-muted small", children: resource.type })] })] }) }), _jsx("td", { className: "align-middle text-muted", style: { fontFamily: "body" }, children: resource.recommended }), _jsx("td", { className: "align-middle", children: _jsxs("div", { className: "d-flex align-items-center gap-2", children: [_jsxs("span", { className: "small fw-medium", style: { width: 30, fontFamily: "body" }, children: [resource.engagement, "%"] }), _jsx(ProgressBar, { now: resource.engagement, variant: resource.engagement > 75
                                                            ? "success"
                                                            : resource.engagement > 60
                                                                ? "warning"
                                                                : "danger", style: { height: 6, flex: 1 } })] }) }), _jsx("td", { className: "align-middle", style: { fontFamily: "body" }, children: _jsxs(Badge, { bg: resource.effectiveness === "High"
                                                    ? "success"
                                                    : resource.effectiveness === "Medium"
                                                        ? "warning"
                                                        : "danger", className: "d-inline-flex align-items-center gap-2 px-3 py-2", children: [resource.effectiveness === "High" ? (_jsx(CheckCircleFill, { size: 14 })) : (_jsx(ExclamationTriangleFill, { size: 14 })), resource.effectiveness] }) }), _jsx("td", { className: "align-middle text-muted", style: { fontFamily: "body" }, children: resource.lastUpdated }), _jsx("td", { className: "align-middle text-end", children: _jsxs("div", { className: "d-flex justify-content-end gap-2", children: [_jsx(Button, { variant: "link", className: "p-1 text-muted", children: _jsx(ThumbsUp, { size: 16, color: "#198754" }) }), _jsx(Button, { variant: "link", className: "p-1 text-danger", children: _jsx(ThumbsDown, { size: 16, color: "#dc3545" }) }), _jsx(Button, { variant: "link", className: "p-1 text-muted", children: _jsx(MoreVertical, { size: 16, color: "#6c757d" }) })] }) })] }, resource.id));
                            }) })] }) })] }));
};
export default ResourcesTable;
