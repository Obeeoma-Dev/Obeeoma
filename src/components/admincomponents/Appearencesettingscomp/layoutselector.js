import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from 'react-bootstrap';
// This component renders radio buttons for selecting dashboard layout.
const LayoutSelector = ({ selectedLayout, onChange }) => {
    const layouts = ['Default', 'Compact'];
    return (_jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Dashboard Layout" }), layouts.map((layout) => (_jsx(Form.Check, { type: "radio", label: layout, name: "layout", value: layout, checked: selectedLayout === layout, onChange: () => onChange(layout) }, layout)))] }));
};
export default LayoutSelector;
