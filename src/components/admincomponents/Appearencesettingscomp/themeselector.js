import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from 'react-bootstrap';
// This component renders radio buttons for selecting the theme.
const ThemeSelector = ({ selectedTheme, onChange }) => {
    const themes = ['Light', 'Dark', 'System'];
    return (_jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Theme" }), themes.map((theme) => (_jsx(Form.Check, { type: "radio", label: theme, name: "theme", value: theme, checked: selectedTheme === theme, onChange: () => onChange(theme) }, theme)))] }));
};
export default ThemeSelector;
