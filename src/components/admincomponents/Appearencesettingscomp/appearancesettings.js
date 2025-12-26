import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Systemadmin/Settingspages/appearancesettings.tsx
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ThemeSelector from './themeselector';
import AccentColorSelector from './accentcolourselector';
import LayoutSelector from './layoutselector';
import SaveButton from './savebutton';
// This page renders the full Appearance Settings interface.
const AppearanceSettings = () => {
    // Local state for each setting
    const [theme, setTheme] = useState("Light");
    const [accentColor, setAccentColor] = useState("Green");
    const [layout, setLayout] = useState("Default");
    // Placeholder save function (ready to connect to backend)
    const handleSave = () => {
        console.log("Saving settings:", { theme, accentColor, layout });
        // Future: send to backend via API call
    };
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Appearance Settings" }), _jsxs("div", { className: "row g-3", children: [_jsx("div", { className: "col-md-6", children: _jsxs("div", { className: "p-2 border rounded-2 settings-section-compact", children: [_jsx("h6", { className: "fw-semibold mb-2", children: "Theme" }), _jsx(ThemeSelector, { selectedTheme: theme, onChange: setTheme })] }) }), _jsx("div", { className: "col-md-6", children: _jsxs("div", { className: "p-2 border rounded-2 settings-section-compact", children: [_jsx("h6", { className: "fw-semibold mb-2", children: "Accent Color" }), _jsx(AccentColorSelector, { selectedColor: accentColor, onChange: setAccentColor })] }) }), _jsx("div", { className: "col-12", children: _jsxs("div", { className: "p-2 border rounded-2 settings-section-compact", children: [_jsx("h6", { className: "fw-semibold mb-2", children: "Layout" }), _jsx(LayoutSelector, { selectedLayout: layout, onChange: setLayout })] }) })] }), _jsx("div", { className: "d-flex justify-content-end gap-2 mt-2", children: _jsx(SaveButton, { onClick: handleSave }) })] }));
};
export default AppearanceSettings;
