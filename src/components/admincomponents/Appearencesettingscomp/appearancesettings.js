import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Systemadmin/Settingspages/appearancesettings.tsx
import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ThemeSelector from './themeselector';
import AccentColorSelector from './accentcolourselector';
import LayoutSelector from './layoutselector';
import SaveButton from './savebutton';
// This page renders the full Appearance Settings interface.
const AppearanceSettings = () => {
    // Local state for each setting
    const [theme, setTheme] = useState('Light');
    const [accentColor, setAccentColor] = useState('Green');
    const [layout, setLayout] = useState('Default');
    // Placeholder save function (ready to connect to backend)
    const handleSave = () => {
        console.log('Saving settings:', { theme, accentColor, layout });
        // Future: send to backend via API call
    };
    return (_jsx(Container, { fluid: true, children: _jsx(Row, { children: _jsx(Col, { md: 10, children: _jsxs(Card, { className: "mt-4 p-4", children: [_jsx("h4", { children: "Appearance Settings" }), _jsx(ThemeSelector, { selectedTheme: theme, onChange: setTheme }), _jsx(AccentColorSelector, { selectedColor: accentColor, onChange: setAccentColor }), _jsx(LayoutSelector, { selectedLayout: layout, onChange: setLayout }), _jsx("div", { className: "mt-3", children: _jsx(SaveButton, { onClick: handleSave }) })] }) }) }) }));
};
export default AppearanceSettings;
