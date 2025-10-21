import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PrivacySection = ({ privacySettings, onPrivacySettingsChange }) => {
    const handleToggleChange = (field, value) => {
        onPrivacySettingsChange({
            ...privacySettings,
            [field]: value
        });
    };
    const handleRangeChange = (value) => {
        onPrivacySettingsChange({
            ...privacySettings,
            dataRetentionPeriod: value
        });
    };
    const privacyItems = [
        {
            key: 'anonymizeData',
            title: 'Anonymize Data',
            description: 'Always anonymize employee test results'
        },
        {
            key: 'enhancedPrivacy',
            title: 'Enhanced Privacy',
            description: 'Apply additional anonymization techniques'
        }
    ];
    return (_jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Privacy Settings" }), _jsx("p", { className: "text-muted mb-4", children: "Configure how employee data is handled" }), _jsxs("div", { className: "space-y-4", children: [privacyItems.map((item) => (_jsxs("div", { className: "d-flex justify-content-between align-items-center p-3 border rounded", style: { borderRadius: "8px" }, children: [_jsxs("div", { children: [_jsx("div", { className: "fw-medium", children: item.title }), _jsx("div", { className: "text-muted small", children: item.description })] }), _jsx("div", { className: "form-check form-switch", children: _jsx("input", { className: "form-check-input", type: "checkbox", checked: privacySettings[item.key], onChange: (e) => handleToggleChange(item.key, e.target.checked), style: { width: "3em", height: "1.5em" } }) })] }, item.key))), _jsxs("div", { className: "p-3 border rounded", style: { borderRadius: "8px" }, children: [_jsxs("div", { className: "mb-3", children: [_jsx("div", { className: "fw-medium", children: "Data Retention Period" }), _jsx("div", { className: "text-muted small", children: "How long to keep employee data" })] }), _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("input", { type: "range", className: "form-range flex-grow-1", min: "30", max: "365", step: "30", value: privacySettings.dataRetentionPeriod, onChange: (e) => handleRangeChange(parseInt(e.target.value)) }), _jsxs("span", { className: "fw-medium text-nowrap", children: [privacySettings.dataRetentionPeriod, " days"] })] }), _jsx("div", { className: "form-text text-muted mt-2", children: "Data will be automatically deleted after this period" })] })] }), _jsxs("div", { className: "mt-4 p-3 bg-light rounded", children: [_jsx("h5", { className: "h6 fw-semibold mb-3", children: "Data Export & Deletion" }), _jsxs("div", { className: "row g-2", children: [_jsx("div", { className: "col-12 col-md-6", children: _jsx("button", { className: "btn btn-outline-primary w-100 btn-sm", children: "Export All Data" }) }), _jsx("div", { className: "col-12 col-md-6", children: _jsx("button", { className: "btn btn-outline-danger w-100 btn-sm", children: "Delete All Data" }) })] }), _jsx("div", { className: "form-text text-muted mt-2", children: "Export or permanently delete all organization data" })] }), _jsxs("div", { className: "mt-4 p-3 border rounded", children: [_jsx("h5", { className: "h6 fw-semibold mb-2", children: "GDPR Compliance" }), _jsxs("div", { className: "form-check", children: [_jsx("input", { className: "form-check-input", type: "checkbox", id: "gdprConsent" }), _jsx("label", { className: "form-check-label small", htmlFor: "gdprConsent", children: "I acknowledge that this organization complies with GDPR regulations for data protection" })] })] })] }) }));
};
export default PrivacySection;
