import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { employerAPI } from "../../../api/apiConfig";
import { useToast } from "../../../hooks/use-toast";
import { useState } from "react";
import { UserPlus, Mail, Phone, Building, Upload } from "lucide-react";
import RHFPhoneInput from "../../RHPhoneInput";
const employeeSchema = z.object({
    email: z.email("Please enter a valid email address").trim(),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number too long")
        .optional(),
    department: z.string().min(1, "Please select a department"),
});
const AddEmployeeForm = ({ showModal, onClose, onEmployeeAdded, }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, control, } = useForm({
        resolver: zodResolver(employeeSchema),
    });
    const onSubmit = async (data) => {
        console.log("Form data:", data);
        try {
            setIsLoading(true);
            // Transforming form data to match API expectations
            const apiData = {
                email: data.email,
                phone: data.phone,
                department: data.department,
            };
            await employerAPI.inviteEmployee(apiData);
            toast({
                title: "Success",
                description: "Employee invitation sent!",
                message: "Employee invitation sent successfully!",
            });
            reset();
            onEmployeeAdded();
            onClose();
        }
        catch (error) {
            console.error("Error adding employee:", error);
            toast({
                title: "Error",
                description: "Failed to add employee. Please try again.",
                message: "Failed to add employee. Please try again.",
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleClose = () => {
        reset();
        onClose();
    };
    if (!showModal)
        return null;
    return (_jsx("div", { className: "modal fade show d-block", tabIndex: -1, role: "dialog", style: {
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
        }, children: _jsx("div", { className: "modal-dialog modal-dialog-centered modal-lg", role: "document", children: _jsxs("div", { className: "modal-content border-0 shadow-lg", style: {
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                }, children: [_jsxs("div", { className: "modal-header border-0 pb-0", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { className: "p-2 rounded-circle me-3", style: { backgroundColor: "rgba(34, 197, 94, 0.1)" }, children: _jsx(UserPlus, { size: 24, style: { color: "#22C55E" } }) }), _jsxs("div", { children: [_jsx("h4", { className: "modal-title fw-bold mb-0 text-dark", children: "Invite New Employee" }), _jsx("p", { className: "text-muted small mb-0", children: "Send an invitation to join your organization" })] })] }), _jsx("button", { type: "button", className: "btn-close", onClick: handleClose, "aria-label": "Close", style: { filter: "none" } })] }), _jsx("div", { className: "modal-body px-4", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "row g-3", children: [_jsxs("div", { className: "col-12", children: [_jsxs("label", { htmlFor: "employee-email", className: "form-label fw-semibold text-dark mb-2", children: [_jsx(Mail, { size: 16, className: "me-2", style: { color: "#22C55E" } }), "Email Address ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "email", className: `form-control form-control-lg ${errors.email ? "is-invalid" : ""}`, id: "employee-email", placeholder: "employee@company.com", style: {
                                                        borderRadius: "8px",
                                                        border: "2px solid #e9ecef",
                                                        transition: "all 0.2s ease",
                                                    }, ...register("email") }), errors.email && (_jsx("div", { className: "invalid-feedback d-block mt-2", children: errors.email.message }))] }), _jsxs("div", { className: "col-12", children: [_jsxs("label", { htmlFor: "phone", className: "form-label fw-semibold text-dark mb-2", children: [_jsx(Phone, { size: 16, className: "me-2", style: { color: "#22C55E" } }), "Phone Number ", _jsx("span", { className: "text-muted", children: "(Optional)" })] }), _jsx(RHFPhoneInput, { name: "phone", control: control, inputStyle: {
                                                        height: "2.5rem",
                                                        fontSize: "1rem",
                                                        borderRadius: "8px",
                                                        border: "2px solid #e9ecef",
                                                        transition: "all 0.2s ease",
                                                    }, placeholder: "+1 (555) 123-4567" }), errors.phone && (_jsx("div", { className: "invalid-feedback d-block mt-2", children: errors.phone.message }))] }), _jsxs("div", { className: "col-12", children: [_jsxs("label", { htmlFor: "department", className: "form-label fw-semibold text-dark mb-2", children: [_jsx(Building, { size: 16, className: "me-2", style: { color: "#22C55E" } }), "Department ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs("select", { className: `form-select form-select-lg ${errors.department ? "is-invalid" : ""}`, id: "department", style: {
                                                        borderRadius: "8px",
                                                        border: "2px solid #e9ecef",
                                                        transition: "all 0.2s ease",
                                                    }, ...register("department"), children: [_jsx("option", { value: "", children: "Select department" }), _jsx("option", { value: "Marketing", children: " Marketing" }), _jsx("option", { value: "HR", children: " Human Resources" }), _jsx("option", { value: "Finance", children: " Finance" }), _jsx("option", { value: "Engineering", children: " Engineering" }), _jsx("option", { value: "Operations", children: " Operations" }), _jsx("option", { value: "Sales", children: " Sales" }), _jsx("option", { value: "Customer Service", children: "Customer Service" }), _jsx("option", { value: "Other", children: " Other" })] }), errors.department && (_jsx("div", { className: "invalid-feedback d-block mt-2", children: errors.department.message }))] })] }), _jsxs("div", { className: "mt-4 p-3 bg-light rounded-3 border", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Upload, { size: 18, className: "me-2", style: { color: "#22C55E" } }), _jsx("span", { className: "fw-medium text-dark", children: "Bulk Import" })] }), _jsx("button", { type: "button", className: "btn btn-sm", title: "Upload an excel document", style: {
                                                        backgroundColor: "#22C55E",
                                                        borderColor: "#22C55E",
                                                        color: "white",
                                                        borderRadius: "8px",
                                                        fontWeight: "600",
                                                        minWidth: "140px",
                                                    }, onClick: (e) => {
                                                        e.preventDefault();
                                                        const input = document.getElementById("upload-excel");
                                                        if (!input)
                                                            return;
                                                        const onChange = () => {
                                                            const file = input.files?.[0];
                                                            if (!file)
                                                                return;
                                                            toast({
                                                                title: "File selected",
                                                                description: file.name,
                                                                message: file.name,
                                                            });
                                                            input.removeEventListener("change", onChange);
                                                            // TODO: process or upload the file here (e.g. send to API or parse client-side)
                                                        };
                                                        input.addEventListener("change", onChange);
                                                        input.click();
                                                    }, children: "Choose File" })] }), _jsx("p", { className: "text-muted small mt-2 mb-0", children: "Upload a CSV or Excel file to invite multiple employees at once" }), _jsx("input", { type: "file", className: "d-none", id: "upload-excel", accept: ".xlsx,.xls,.csv" })] })] }) }), _jsxs("div", { className: "modal-footer border-0 pt-0", children: [_jsx("button", { type: "button", className: "btn btn-outline-secondary px-4 py-2", onClick: handleClose, disabled: isLoading, style: { borderRadius: "8px" }, children: "Cancel" }), _jsx("button", { type: "submit", className: "btn px-4 py-2 d-flex align-items-center", disabled: isLoading, onClick: handleSubmit(onSubmit), style: {
                                    backgroundColor: "#22C55E",
                                    borderColor: "#22C55E",
                                    color: "white",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                    minWidth: "140px",
                                }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "spinner-border spinner-border-sm me-2", role: "status" }), "Sending..."] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { size: 18, className: "me-2", style: { color: "white" } }), "Send Invite"] })) })] })] }) }) }));
};
export default AddEmployeeForm;
