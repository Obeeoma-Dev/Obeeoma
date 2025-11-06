import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// 2. Use the interface in the component function signature
const AddEmployeeForm = ({ onClose }) => {
    // ... form logic ...
    return (_jsxs("div", { className: "card p-4", children: [_jsx("h5", { className: "card-title", children: "Add New Employee" }), _jsx("button", { className: "btn btn-sm btn-outline-secondary float-end", onClick: onClose, children: "Close Form" })] }));
};
export default AddEmployeeForm;
