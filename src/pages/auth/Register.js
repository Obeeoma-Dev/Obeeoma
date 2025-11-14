import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthStatus } from "../../store/slices/authSlice";
// Assuming registerValidationSchema is imported, ensure it's built with YUP
import { registerValidationSchema } from "../../validation/authValidation";
import { Container, Button, Form as BootstrapForm, Alert, Card, Spinner, InputGroup, Row, Col, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEnvelope, faUserTie, faMapMarkerAlt, faSitemap, faBuilding, faArrowRight, faArrowLeft, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import logo from "./../../assets/Images/obeeomalogoword1.png";
import CustomStepper from "./../../components/stepper";
import SuccessModal from './../../components/SuccessModal';
const customStyles = {
    primaryColor: "#3CB371",
    backgroundColor: "#f0f2f5",
    logoText: "Obeeoma",
};
const organisation_size_options = [
    { label: "Select Size", value: "" },
    { label: "1-10 Employees", value: 10 },
    { label: "11-50 Employees", value: 50 },
    { label: "51-200 Employees", value: 200 },
    { label: "201-500 Employees", value: 500 },
    { label: "500+ Employees", value: 600 },
];
const contact_role_options = [
    { label: "Select Contact Role", value: "" },
    { label: "Owner/CEO", value: "CEO" },
    { label: "HR Manager", value: "HR_MANAGER" },
    { label: "Recruiter", value: "RECRUITER" },
    { label: "Office Manager", value: "OFFICE_MANAGER" },
    { label: "Other", value: "OTHER" },
];
const stepperSteps = ["Organization", "Contact", "Verify"];
const Register = () => {
    const [role] = useState("employer");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.auth);
    const [activeStep, setActiveStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };
    // for a pop up modal on successful registration
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [localError, setLocalError] = useState(null);
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        navigate("/login", { replace: true });
    };
    const initialValues = {
        organizationName: "",
        contactPersonFirstName: "",
        contactPersonLastName: "",
        contactPersonRole: "",
        companyEmail: "",
        email: "",
        phoneNumber: "",
        organisationSize: "",
        Location: "",
        password: "",
        confirmPassword: "",
    };
    useEffect(() => {
        dispatch(clearAuthStatus());
    }, [dispatch]);
    const formGroupStyle = {
        marginBottom: '1rem',
    };
    const inputStyle = {
        height: '48px',
        borderRadius: '4px',
    };
    const inputGroupTextStyle = {
        height: '48px',
        backgroundColor: 'white',
        borderColor: '#ced4da',
        color: customStyles.primaryColor,
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const passwordToggleStyle = {
        cursor: 'pointer',
        backgroundColor: 'white',
        borderColor: '#ced4da',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    // to handle step navigation when user clicks on step labels and icons 
    const handleStepNavigation = (stepIndex) => {
        // Map step index to a specific route
        let path = '';
        switch (stepIndex) {
            case 0:
                path = '/registration/details';
                break;
            case 1:
                path = '/registration/verify'; // The "verify page" you requested
                break;
            case 2:
                path = '/registration/complete';
                break;
            default:
                return;
        }
        navigate(path);
        // // Optional: Update the active step state if you are navigating to a previous step
        // setCurrentStep(stepIndex); 
    };
    const stepFields = [
        ['organizationName', 'companyEmail', 'organisationSize', 'Location'], // Step 0: Organization Details
        ['contactPersonFirstName', 'contactPersonLastName', 'email', 'contactPersonRole', 'phoneNumber', 'password', 'confirmPassword'], // Step 1: Contact/Access Details
        [], // Step 2 (Success - no fields to validate)
    ];
    // ---  handleNext FUNCTION (Handles Step with accept privacy policy) ---
    const handleNext = async (values, setTouched, setErrors, validateForm) => {
        setLocalError(null);
        const currentStepFields = stepFields[activeStep];
        // 1. Validation Check for Current Step
        const newTouched = {};
        currentStepFields.forEach(field => { newTouched[field] = true; });
        setTouched(newTouched);
        const allErrors = await validateForm(values);
        const currentStepErrors = {};
        let hasErrorsInCurrentStep = false;
        currentStepFields.forEach(field => {
            if (allErrors[field]) {
                currentStepErrors[field] = allErrors[field];
                hasErrorsInCurrentStep = true;
            }
        });
        setErrors(currentStepErrors);
        if (hasErrorsInCurrentStep) {
            const errorFieldNames = Object.keys(currentStepErrors).map(f => f.charAt(0).toUpperCase() + f.slice(1));
            setLocalError(`Please correct the following fields before proceeding: ${errorFieldNames.join(', ')}.`);
            return; // Stop if validation failed
        }
        // 2. Conditional API Submission (Triggered only on Step 1 to Step 2 transition)
        if (activeStep === 1) {
            // Prepare API Payload
            const credentials = {
                organizationName: values.organizationName, phoneNumber: values.phoneNumber,
                organisationSize: values.organisationSize, companyEmail: values.companyEmail,
                Location: values.Location, password: values.password, confirmPassword: values.confirmPassword,
                role: role, contactPerson: {
                    firstName: values.contactPersonFirstName, lastName: values.contactPersonLastName,
                    role: values.contactPersonRole, email: values.email,
                },
            };
            try {
                // API Call
                await dispatch(registerUser(credentials)).unwrap();
                // On API Success: 
                setShowSuccessModal(true); // Show the success modal pop-up
                setActiveStep((prev) => prev + 1); // Advance stepper visually to Step 2/Verify
                // eslint-disable-next-line @typescript-eslint/no-explicit-any    
            }
            catch (err) {
                console.error("Registration failed:", err);
                setLocalError(err.message || "Registration failed. Please try again.");
                // Keep activeStep at 1 if API fails
            }
        }
        else {
            // 3. Default Next Step (Step 0 to Step 1 transition)
            setActiveStep((prev) => prev + 1);
        }
    };
    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (values, { setSubmitting }) => {
        // Only submit if we are on the final data entry step (Step 1, index 1)
        if (activeStep !== 1) {
            setSubmitting(false);
            return;
        }
        const credentials = {
            organizationName: values.organizationName,
            phoneNumber: values.phoneNumber,
            organisationSize: values.organisationSize,
            companyEmail: values.companyEmail,
            Location: values.Location,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: role,
            contactPerson: {
                firstName: values.contactPersonFirstName,
                lastName: values.contactPersonLastName,
                role: values.contactPersonRole,
                email: values.email,
            },
        };
        try {
            await dispatch(registerUser(credentials)).unwrap();
            setActiveStep(2); // Move to success step on successful registration
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            console.error("Registration failed:", err);
            setLocalError(err.message || "Registration failed. Please try again.");
        }
        finally {
            setSubmitting(false);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderStepContent = (values, handleChange, touched, errors) => {
        switch (activeStep) {
            case 0: // Step 1: Organization Details
                return (_jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faBuilding }) }), _jsx(BootstrapForm.Control, { type: "text", name: "organizationName", placeholder: "Organization Name", value: values.organizationName, onChange: handleChange, style: inputStyle, isInvalid: !!touched.organizationName && !!errors.organizationName })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "organizationName" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faEnvelope }) }), _jsx(BootstrapForm.Control, { type: "email", name: "companyEmail", placeholder: "Organization Email Address", value: values.companyEmail, onChange: handleChange, style: inputStyle, isInvalid: !!touched.companyEmail && !!errors.companyEmail })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "companyEmail" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faSitemap }) }), _jsx(BootstrapForm.Select, { name: "organisationSize", value: values.organisationSize, onChange: handleChange, style: inputStyle, isInvalid: !!touched.organisationSize && !!errors.organisationSize, children: organisation_size_options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.label))) })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "organisationSize" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faMapMarkerAlt }) }), _jsx(BootstrapForm.Control, { type: "text", name: "Location", placeholder: "Organization Location (e.g., State)", value: values.Location, onChange: handleChange, style: inputStyle, isInvalid: !!touched.Location && !!errors.Location })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "Location" }) })] }) })] }));
            case 1: // Step 2: Contact Person Details & Password
                return (_jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsx(BootstrapForm.Control, { type: "text", name: "contactPersonFirstName", placeholder: "First Name", value: values.contactPersonFirstName, onChange: handleChange, style: inputStyle, isInvalid: !!touched.contactPersonFirstName && !!errors.contactPersonFirstName }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "contactPersonFirstName" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsx(BootstrapForm.Control, { type: "text", name: "contactPersonLastName", placeholder: "Last Name", value: values.contactPersonLastName, onChange: handleChange, style: inputStyle, isInvalid: !!touched.contactPersonLastName && !!errors.contactPersonLastName }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "contactPersonLastName" }) })] }) }), _jsx(Col, { md: 12, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsx(BootstrapForm.Control, { type: "email", name: "email", placeholder: "Contact Email Address", value: values.email, onChange: handleChange, style: inputStyle, isInvalid: !!touched.email && !!errors.email }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "email" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsx(BootstrapForm.Control, { type: "tel", name: "phoneNumber", placeholder: "Contact Person Phone Number", value: values.phoneNumber, onChange: handleChange, style: inputStyle, isInvalid: !!touched.phoneNumber && !!errors.phoneNumber }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "phoneNumber" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faUserTie }) }), _jsx(BootstrapForm.Select, { name: "contactPersonRole", value: values.contactPersonRole, onChange: handleChange, style: inputStyle, isInvalid: !!touched.contactPersonRole && !!errors.contactPersonRole, children: contact_role_options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.label))) })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "contactPersonRole" }) })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, controlId: "password", children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faLock }) }), _jsx(BootstrapForm.Control, { type: showPassword ? "text" : "password", name: "password", value: values.password, onChange: handleChange, placeholder: "Password", style: inputStyle, isInvalid: touched.password && !!errors.password }), _jsx(InputGroup.Text, { onClick: togglePasswordVisibility, style: passwordToggleStyle, children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(ErrorMessage, { name: "password", component: "div", className: "invalid-feedback d-block" })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, controlId: "confirmPassword", children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faLock }) }), _jsx(BootstrapForm.Control, { type: showConfirmPassword ? "text" : "password", name: "confirmPassword", value: values.confirmPassword, onChange: handleChange, placeholder: "Confirm Password", style: inputStyle, isInvalid: !!touched.confirmPassword && !!errors.confirmPassword }), _jsx(InputGroup.Text, { onClick: toggleConfirmPasswordVisibility, style: passwordToggleStyle, children: _jsx(FontAwesomeIcon, { icon: showConfirmPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(ErrorMessage, { name: "confirmPassword", component: "div", className: "invalid-feedback d-block" })] }) })] }));
            case 2: // Step 3: Verification/Review (Informational after successful API call)
                return (_jsxs("div", { className: "text-center my-3", children: [_jsx(FontAwesomeIcon, { icon: faCheckCircle, size: "3x", style: { color: customStyles.primaryColor, marginBottom: '1rem' } }), _jsx("h4", { className: "fw-semibold text-dark", children: "Review Complete!" }), _jsx("p", { className: "text-muted mb-4", children: "Your account is created and verification details have been sent. Please review the key information below." }), _jsxs(Card, { className: "text-start mb-4 p-3 border-light shadow-sm", children: [_jsx(Card.Title, { style: { color: customStyles.primaryColor, fontSize: '1.1rem' }, className: "mb-2", children: "Privacy & Terms" }), _jsx(Card.Text, { className: "small text-muted mb-1", children: "We've successfully processed your registration. We encourage you to review our full policies:" }), _jsxs("ul", { className: "text-start small mb-0", style: { listStyleType: 'disc', paddingLeft: '20px' }, children: [_jsx("li", { children: _jsx("a", { href: "/terms", target: "_blank", style: { color: customStyles.primaryColor }, children: "Terms of Service" }) }), _jsx("li", { children: _jsx("a", { href: "/privacy", target: "_blank", style: { color: customStyles.primaryColor }, children: "Privacy Policy" }) })] })] })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { style: {
            backgroundColor: customStyles.backgroundColor,
            maxHeight: "100vh",
            overflow: "auto",
            paddingBottom: "80px",
        }, className: "d-flex flex-column col-12", children: [_jsx(Container, { className: "flex-grow-1 d-flex justify-content-center align-items-center py-5", children: _jsx("div", { className: "d-flex justify-content-center w-100", children: _jsx(Card, { className: "shadow-lg border-0", style: {
                            maxWidth: activeStep === 2 ? "500px" : "800px",
                            width: "100%",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }, children: _jsxs(Card.Body, { style: { padding: '2.5rem' }, className: "d-flex flex-column col-12", children: [_jsx(Link, { to: "/employer-dashboard", children: _jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-3", style: { fontFamily: "heading" }, children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                                                height: "50px",
                                                width: "auto"
                                            }, className: "mb-1" }) }) }), _jsxs("h3", { className: "text-center mb-2 fw-semibold text-dark", style: { fontFamily: "heading" }, children: [activeStep === 0 && "Step 1: Organization Details", activeStep === 1 && "Step 2: Contact & Access", activeStep === 2 && "Registration Complete"] }), _jsx("p", { className: "text-center mb-3 text-muted", style: { fontSize: '1rem' }, children: "Get early access to Obeeoma and empower your team with smarter mental health support." }), _jsx(CustomStepper, { activeStep: activeStep, primaryColor: customStyles.primaryColor, steps: stepperSteps, onStepClick: handleStepNavigation }), localError && (_jsx(Alert, { variant: "danger", dismissible: true, onClose: () => setLocalError(null), children: localError })), error && (_jsx(Alert, { variant: "danger", dismissible: true, onClose: () => dispatch(clearAuthStatus()), children: error })), _jsx(Formik, { validationSchema: registerValidationSchema, initialValues: initialValues, onSubmit: handleSubmit, children: ({ handleSubmit, handleChange, values, touched, errors, setTouched, setErrors, validateForm, isSubmitting }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: handleSubmit, children: [renderStepContent(values, handleChange, touched, errors), activeStep < 2 && (_jsxs(Row, { className: "mt-3", children: [_jsx(Col, { md: activeStep > 0 ? 6 : 12, children: activeStep > 0 && (_jsxs(Button, { variant: "secondary", onClick: handleBack, className: "w-100 py-3 fw-semibold mb-2 mb-md-0", disabled: isLoading || isSubmitting, children: [_jsx(FontAwesomeIcon, { icon: faArrowLeft, className: "me-2" }), "Back"] })) }), _jsx(Col, { md: activeStep > 0 ? 6 : 12, children: _jsx(Button, { type: activeStep === 1 ? "submit" : "button", onClick: activeStep === 0 ? () => handleNext(values, setTouched, setErrors, validateForm) : undefined, className: "w-100 py-3 fw-semibold", disabled: isLoading || isSubmitting, style: {
                                                                backgroundColor: customStyles.primaryColor,
                                                                borderColor: customStyles.primaryColor,
                                                                color: "white",
                                                                boxShadow: "none",
                                                            }, children: isLoading || isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Signing Up..."] })) : (activeStep === 0 ? (_jsxs(_Fragment, { children: [_jsx(FontAwesomeIcon, { icon: faArrowRight, className: "me-2" }), "Next: Contact Details"] })) : ("Sign Up")) }) })] })), activeStep < 2 && (_jsxs("p", { className: "text-center mt-3 text-muted", children: ["Already have an account? ", _jsx(Link, { to: "/login", style: { color: customStyles.primaryColor, textDecoration: "none", fontWeight: "600" }, children: "Log in" })] }))] })) }), _jsx(SuccessModal, { show: showSuccessModal, onHide: handleCloseSuccessModal, primaryColor: customStyles.primaryColor, handleClose: handleCloseSuccessModal })] }) }) }) }), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    fontFamily: "body"
                }, children: _jsx(Container, { className: "d-flex justify-content-between align-items-center", children: _jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }) }) })] }));
};
export default Register;
