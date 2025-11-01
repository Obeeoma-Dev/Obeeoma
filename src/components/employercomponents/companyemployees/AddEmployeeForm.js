import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useFetch } from "../../../hooks/useFetch";
const AddEmployeeForm = () => {
    const { commonFetch, isLoading } = useFetch({ url: 'https://api-0904.onrender.com/api/v1/dashboard/employees/', method: 'POST' });
    // existing form setup (if any)
    // For example, using useForm from react-hook-form:
    const createForm = useForm();
    const handleSubmit = async () => {
        const values = createForm.getValues();
        // Call the fetch function with the form data
        await commonFetch({ input: values });
    };
    return (_jsx("div", { className: "row mt-5", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Add Employee" }), _jsx("div", { className: "row", children: _jsxs("div", { className: "col-12 col-md-6", children: [_jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label fw-medium", children: "Name" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter employee name" })] }), _jsxs("div", { className: "mb-3", children: [_jsx("label", { className: "form-label fw-medium", children: "Department" }), _jsxs("select", { className: "form-select", children: [_jsx("option", { children: "Select department" }), _jsx("option", { children: "Marketing" }), _jsx("option", { children: "HR" }), _jsx("option", { children: "Finance" }), _jsx("option", { children: "Engineering" }), _jsx("option", { children: "Other" })] })] }), _jsx("button", { className: "btn btn-success", onClick: handleSubmit, disabled: isLoading, children: isLoading ? 'Adding...' : 'Add Employee' })] }) })] }) }) }) }));
};
export default AddEmployeeForm;
