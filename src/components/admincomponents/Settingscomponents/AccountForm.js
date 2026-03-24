import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import { Upload, X, User, Mail, FileText, Check, RotateCcw } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// Role options matching the register.tsx
const ROLE_OPTIONS = [
    { label: "Select Role", value: "" },
    { label: "Owner/CEO", value: "CEO" },
    { label: "HR Manager", value: "HR_MANAGER" },
    { label: "Recruiter", value: "RECRUITER" },
    { label: "Office Manager", value: "OFFICE_MANAGER" },
    { label: "System Administrator", value: "SYSTEM_ADMINISTRATOR" },
    { label: "Other", value: "OTHER" },
];
const AccountForm = () => {
    // State to hold form input values
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        role: "",
        phone: "",
        bio: "",
    });
    // State for validation errors
    const [errors, setErrors] = useState({});
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // State for profile image
    const [profileImage, setProfileImage] = useState(null);
    const [originalProfileImage, setOriginalProfileImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    // State for tracking if form has unsaved changes
    const [hasChanges, setHasChanges] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    // Load data from localStorage on component mount
    useEffect(() => {
        const storedFullName = localStorage.getItem("fullName");
        const storedEmail = localStorage.getItem("email");
        const storedRole = localStorage.getItem("role");
        const storedPhone = localStorage.getItem("phone");
        const storedBio = localStorage.getItem("bio");
        const storedProfileImage = localStorage.getItem("profileImage");
        // Default values if nothing in localStorage (Nigerian phone format for react-phone-input-2)
        const defaultValues = {
            fullName: "Dr. Patricia Kuluweeza",
            email: "patricia.kuluweeza@obeema.com",
            role: "System Administrator",
            phone: "2348030000000", // Nigerian format: 234 + phone number
            bio: "Dr. Patricia is a system administrator with over 10 years of experience in mental health care.",
        };
        setFormData({
            fullName: storedFullName || defaultValues.fullName,
            email: storedEmail || defaultValues.email,
            role: storedRole || defaultValues.role,
            phone: storedPhone || defaultValues.phone,
            bio: storedBio || defaultValues.bio,
        });
        if (storedProfileImage) {
            setProfileImage(storedProfileImage);
            setOriginalProfileImage(storedProfileImage);
        }
        setLoading(false);
    }, []);
    // Track changes when formData changes
    // Track changes when formData changes
    useEffect(() => {
        const currentData = { ...formData, profileImage };
        const originalData = {
            fullName: localStorage.getItem("fullName") || "Dr. Patricia Kuluweeza",
            email: localStorage.getItem("email") || "patricia.kuluweeza@obeema.com",
            role: localStorage.getItem("role") || "System Administrator",
            phone: localStorage.getItem("phone") || "2348030000000",
            bio: localStorage.getItem("bio") || "Dr. Patricia is a system administrator with over 10 years of experience in mental health care.",
        };
        const hasUnsavedChanges = currentData.fullName !== originalData.fullName ||
            currentData.email !== originalData.email ||
            currentData.role !== originalData.role ||
            currentData.phone !== originalData.phone ||
            currentData.bio !== originalData.bio ||
            profileImage !== originalProfileImage;
        setHasChanges(hasUnsavedChanges);
    }, [formData, profileImage, originalProfileImage]);
    // Handle input changes for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSaveSuccess(false);
        // Clear error for the field being edited
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };
    // Handle cancel - reset to original values
    const handleCancel = useCallback(() => {
        const defaultValues = {
            fullName: localStorage.getItem("fullName") || "Dr. Patricia Kuluweeza",
            email: localStorage.getItem("email") || "patricia.kuluweeza@obeema.com",
            role: localStorage.getItem("role") || "System Administrator",
            phone: localStorage.getItem("phone") || "2348030000000",
            bio: localStorage.getItem("bio") || "Dr. Patricia is a system administrator with over 10 years of experience in mental health care.",
        };
        setFormData(defaultValues);
        setProfileImage(originalProfileImage);
        setErrors({});
        setSaveSuccess(false);
    }, [originalProfileImage]);
    // Handle profile image upload
    const handleImageUpload = useCallback((event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        if (file.size > 5 * 1024 * 1024) {
            // 5MB limit
            alert("File size should be less than 5MB");
            return;
        }
        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageUrl = reader.result;
            setProfileImage(imageUrl);
            setIsUploading(false);
        };
        reader.onerror = () => {
            alert("Error uploading image");
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    }, []);
    // Remove profile image
    const removeProfileImage = useCallback(() => {
        setProfileImage(null);
        localStorage.removeItem("profileImage");
    }, []);
    // Validate form - matching register.tsx validation
    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.fullName?.trim()) {
            newErrors.fullName = "Full name is required.";
        }
        // Email validation - matches authValidation.ts
        if (!formData.email?.trim()) {
            newErrors.email = "Email is required.";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Must be a valid email format";
        }
        // Role validation
        if (!formData.role?.trim()) {
            newErrors.role = "Role is required.";
        }
        // Phone validation - matches authValidation.ts (E.164 format)
        // react-phone-input-2 provides value in format: "234xxxxxxxxxx" (country code + number)
        const phoneValue = formData.phone?.replace(/\s/g, "") || "";
        if (phoneValue) {
            // Check if it starts with country code (digits only, no + prefix needed from input)
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(phoneValue)) {
                newErrors.phone = "Invalid phone number format";
            }
            else if (phoneValue.replace(/\+/g, "").length < 10) {
                newErrors.phone = "Phone number must be at least 10 digits";
            }
            else if (phoneValue.replace(/\+/g, "").length > 15) {
                newErrors.phone = "Phone number cannot exceed 15 digits";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);
    // Handle form submission
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        // Save to localStorage
        localStorage.setItem("fullName", formData.fullName);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("role", formData.role);
        localStorage.setItem("phone", formData.phone);
        localStorage.setItem("bio", formData.bio);
        if (profileImage) {
            localStorage.setItem("profileImage", profileImage);
        }
        // Update original values to current (so cancel won't revert)
        setOriginalProfileImage(profileImage);
        setHasChanges(false);
        setSaveSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
        console.log("Form submitted:", formData);
    }, [formData, profileImage, validateForm]);
    // Show loading spinner while data is being fetched
    if (loading) {
        return (_jsxs("div", { className: "text-center py-5", children: [_jsx(Spinner, { animation: "border", variant: "success" }), _jsx("p", { className: "mt-3", children: "Loading account data..." })] }));
    }
    // Get initials for avatar
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };
    // Render the form once data is loaded and no error
    return (_jsxs(_Fragment, { children: [_jsx(Card, { className: "settings-card-compact shadow-sm border-0 mb-3", children: _jsxs(Card.Body, { className: "p-3", children: [_jsxs("div", { className: "d-flex align-items-center mb-3", children: [_jsx("div", { className: "position-relative me-3", children: _jsxs("div", { style: {
                                            width: 56,
                                            height: 56,
                                            borderRadius: 56,
                                            background: "#f1f7f3",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--obeeoma-green)",
                                            fontWeight: 700,
                                            overflow: "hidden",
                                        }, children: [profileImage ? (_jsx("img", { src: profileImage, alt: "Profile", className: "w-100 h-100 object-fit-cover" })) : (_jsx("span", { style: { fontSize: "1.2rem" }, children: getInitials(formData.fullName) })), profileImage && (_jsx("button", { onClick: removeProfileImage, className: "position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle p-1", style: {
                                                    width: "20px",
                                                    height: "20px",
                                                    transform: "translate(30%, -30%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }, children: _jsx(X, { size: 10 }) }))] }) }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("div", { className: "fw-bold", style: { fontSize: "0.98rem" }, children: formData.fullName }), _jsx("div", { className: "text-muted small", children: formData.role })] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "profileImageUpload", className: `btn btn-sm ${isUploading ? "btn-secondary" : "btn-outline-success"}`, children: [_jsx(Upload, { size: 14, className: "me-2" }), isUploading ? "Uploading..." : "Change Photo"] }), _jsx("input", { id: "profileImageUpload", type: "file", accept: "image/*", className: "d-none", onChange: handleImageUpload, disabled: isUploading }), _jsx("p", { className: "small text-muted mt-2 mb-0", children: "Recommended: Square image, 400x400px or larger. Max 5MB." })] })] }) }), _jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Account Information" }), _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "formFullName", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-medium", children: "Full Name" }), _jsxs("div", { className: "position-relative", children: [_jsx(User, { size: 16, className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", style: { zIndex: 10 } }), _jsx(Form.Control, { type: "text", name: "fullName", value: formData.fullName, onChange: handleChange, placeholder: "Enter full name", className: `ps-5 ${errors.fullName ? "is-invalid" : ""}` }), errors.fullName && (_jsx("div", { className: "invalid-feedback", children: errors.fullName }))] })] }), _jsxs(Form.Group, { controlId: "formEmail", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-medium", children: "Email Address" }), _jsxs("div", { className: "position-relative", children: [_jsx(Mail, { size: 16, className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", style: { zIndex: 10 } }), _jsx(Form.Control, { type: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "Enter email", className: `ps-5 ${errors.email ? "is-invalid" : ""}` }), errors.email && (_jsx("div", { className: "invalid-feedback", children: errors.email }))] })] }), _jsxs(Form.Group, { controlId: "formRole", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-medium", children: "Role" }), _jsxs("div", { className: "position-relative", children: [_jsx(FileText, { size: 16, className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted", style: { zIndex: 10 } }), _jsx(Form.Select, { name: "role", value: formData.role, onChange: handleChange, className: `ps-5 ${errors.role ? "is-invalid" : ""}`, children: ROLE_OPTIONS.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), errors.role && (_jsx("div", { className: "invalid-feedback", children: errors.role }))] })] }), _jsxs(Form.Group, { controlId: "formPhone", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-medium", children: "Phone Number" }), _jsx(PhoneInput, { country: "ng", enableSearch: true, value: formData.phone, onChange: (value) => {
                                            setFormData((prev) => ({ ...prev, phone: value }));
                                            setSaveSuccess(false);
                                            // Clear error when user starts typing
                                            if (errors.phone) {
                                                setErrors((prev) => ({ ...prev, phone: undefined }));
                                            }
                                        }, inputClass: `${errors.phone ? "is-invalid" : ""}`, inputStyle: {
                                            width: "100%",
                                            height: "calc(38px + 2px)",
                                            fontSize: "1rem",
                                            borderRadius: "0.375rem",
                                        }, dropdownStyle: { zIndex: 1050 }, placeholder: "Enter phone number" }), errors.phone && (_jsx("div", { className: "invalid-feedback d-block", children: errors.phone })), _jsx(Form.Text, { className: "text-muted", children: "Phone number should be 10-12 digits (E.164 format)" })] }), _jsxs(Form.Group, { controlId: "formBio", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-medium", children: "Professional Bio" }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "bio", value: formData.bio, onChange: handleChange, placeholder: "Enter bio" })] }), saveSuccess && (_jsxs(Alert, { variant: "success", className: "d-flex align-items-center py-2 px-3 mb-3", children: [_jsx(Check, { size: 16, className: "me-2" }), "Changes saved successfully!"] })), _jsxs("div", { className: "d-flex justify-content-end gap-2 mt-2", children: [hasChanges && (_jsxs(Button, { variant: "outline-secondary", onClick: handleCancel, type: "button", children: [_jsx(RotateCcw, { size: 16, className: "me-2" }), "Cancel"] })), _jsxs(Button, { className: "settings-save-btn", type: "submit", disabled: !hasChanges, children: [_jsx(Check, { size: 16, className: "me-2" }), "Save Changes"] })] })] })] })] }));
};
export default AccountForm;
