import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../../hooks/use-toast";
import { inviteEmployee, fetchEmployeeInvites } from "../../../store/slices/EmployerSlice";
import { useDispatch, useSelector } from 'react-redux';
const employeeSchema = z.object({
    email: z.email("Please enter a valid email address").trim(),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long").optional(),
    department: z.string().min(1, "Please select a department"),
});
const AddEmployeeForm = ({ showModal, onClose, onEmployeeAdded }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { isActionLoading, error } = useSelector((state) => state.employer);
    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: zodResolver(employeeSchema),
    });
    const onSubmit = async (data) => {
        try {
            // Transform form data to match API expectations (use email directly, not emailAddress)
            const result = await dispatch(inviteEmployee({
                email: data.email,
                phone: data.phone,
                department: data.department,
            }));
            // Check if the thunk was fulfilled
            if (inviteEmployee.fulfilled.match(result)) {
                toast({
                    title: "Success",
                    description: "Employee invitation sent!",
                    message: "Employee invitation sent successfully!",
                });
                reset();
                onEmployeeAdded();
                onClose();
                // Refresh the employee invites list
                dispatch(fetchEmployeeInvites());
            }
            else if (inviteEmployee.rejected.match(result)) {
                toast({
                    title: "Error",
                    description: result.payload || "Failed to add employee. Please try again.",
                    message: result.payload || "Failed to add employee. Please try again.",
                });
            }
        }
        catch (error) {
            console.error("Error adding employee:", error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "An unexpected error occurred.",
                message: "Failed to add employee. Please try again.",
            });
        }
    };
    const handleClose = () => {
        reset();
        onClose();
    };
    if (!showModal)
        return null;
    return (_jsx("div", { className: "modal fade show d-block", tabIndex: -1, role: "dialog", style: { backgroundColor: 'rgba(0,0,0,0.5)' }, children: _jsx("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: _jsxs("div", { className: "modal-content", children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { className: "modal-title fw-semibold", children: "Invite Employee" }), _jsx("button", { type: "button", className: "close border-0 bg-transparent", onClick: handleClose, style: { fontSize: '1.5rem' }, children: _jsx("span", { "aria-hidden": "true", children: "\u00D7" }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "employee-email", className: "form-label fw-medium", children: "Email address:" }), _jsx("input", { type: "email", className: `form-control ${errors.email ? 'is-invalid' : ''}`, id: "employee-email", placeholder: "Enter employee email", ...register("email") }), errors.email && (_jsx("div", { className: "invalid-feedback d-block", children: errors.email.message }))] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "phone", className: "form-label fw-medium", children: "Phone number (optional):" }), _jsx("input", { type: "tel", className: `form-control ${errors.phone ? 'is-invalid' : ''}`, id: "phone", placeholder: "Enter phone number", ...register("phone") }), errors.phone && (_jsx("div", { className: "invalid-feedback d-block", children: errors.phone.message }))] }), _jsxs("div", { className: "form-group mb-3", children: [_jsx("label", { htmlFor: "department", className: "form-label fw-medium", children: "Department:" }), _jsxs("select", { className: `form-select ${errors.department ? 'is-invalid' : ''}`, id: "department", ...register("department"), children: [_jsx("option", { value: "", children: "Select department" }), _jsx("option", { value: "Marketing", children: "Marketing" }), _jsx("option", { value: "HR", children: "HR" }), _jsx("option", { value: "Finance", children: "Finance" }), _jsx("option", { value: "Engineering", children: "Engineering" }), _jsx("option", { value: "Other", children: "Other" })] }), errors.department && (_jsx("div", { className: "invalid-feedback d-block", children: errors.department.message }))] }), _jsxs("div", { className: "form-group mt-1 mb-3", children: [_jsx("button", { type: "button", className: "btn btn-link p-0 text-decoration-none", title: "Upload an excel document", onClick: (e) => {
                                                e.preventDefault();
                                                const input = document.getElementById('upload-excel');
                                                if (!input)
                                                    return;
                                                const onChange = () => {
                                                    const file = input.files?.[0];
                                                    if (!file)
                                                        return;
                                                    toast({
                                                        title: 'File selected',
                                                        description: file.name,
                                                        message: file.name,
                                                    });
                                                    input.removeEventListener('change', onChange);
                                                    // TODO: process or upload the file here (e.g. send to API or parse client-side)
                                                };
                                                input.addEventListener('change', onChange);
                                                input.click();
                                            }, children: "Try bulk add" }), _jsx("br", {}), _jsx("input", { type: "file", className: "form-control-file mt-1", id: "upload-excel", accept: ".xlsx,.xls,.csv" })] })] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { type: "submit", className: "btn btn-success", disabled: isActionLoading, children: isActionLoading ? 'Adding...' : 'Add Employee' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleClose, disabled: isActionLoading, children: "Close" })] })] }) }) }));
};
export default AddEmployeeForm;
