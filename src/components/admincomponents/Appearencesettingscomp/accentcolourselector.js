import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "react-bootstrap";
// This component renders radio buttons for selecting an accent color.
const AccentColorSelector = ({ selectedColor, onChange, }) => {
    const colors = ["Green", "Red", "Blue", "Purple"];
    return (_jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Accent Color" }), colors.map((color) => (_jsx(Form.Check, { type: "radio", label: color, name: "accentColor", value: color, checked: selectedColor === color, onChange: () => onChange(color) }, color)))] }));
};
export default AccentColorSelector;
