import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { registerUser, clearAuthStatus } from "../../store/slices/authSlice";

import { registerValidationSchema } from "../../validation/authValidation";
import {
    Container,
    Button,
    Form as BootstrapForm,
    Alert,
    Card,
    Spinner,
    InputGroup,
    Row,
    Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faPhone, faEnvelope, faUser, faMapMarkerAlt, faSitemap, faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import logo from "./../../assets/Images/obeeomalogoword1.png";

// --- Custom Styles and Data ---

const customStyles = {
    primaryColor: "#3CB371",
    backgroundColor: "#f0f2f5",
    logoText: "Obeeoma",
};

const organisation_size_options = [
    { label: "Select Size", value: 0 },
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

type Role = "employee" | "employer";

type RegisterFormValues = {
    organizationName: string;
    contactPersonName: string;
    contactPersonRole: string;
    email: string; // Contact Email Address
    phoneNumber: string; // Contact Person's Phone Number
    organisationSize: number | string;
    companyEmail: string; // Organization Email Address
    Location: string; // Organization Location
    password: string;
    confirmPassword: string;
};

// --- Component Start ---

const Register: React.FC = () => {

    const [role] = useState<Role>("employer");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state: RootState) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const initialValues: RegisterFormValues = {
        organizationName: "",
        contactPersonName: "",
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

    const handleSubmit = async (values: RegisterFormValues) => {
        const credentials = {
            organizationName: values.organizationName,
            phoneNumber: values.phoneNumber,
            organisationSize: values.organisationSize,
            companyEmail: values.companyEmail,
            Location: values.Location,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: role,
            contactPerson:
                {
                    fullname: values.contactPersonName,
                    role: values.contactPersonRole,
                    email: values.email,
                },

        };

        try {
            await dispatch(registerUser(credentials)).unwrap();
            // Navigate to login page upon successful registration
            navigate("/login", { replace: true });
        } catch (err) {
            // Error handling
            console.error("Registration failed:", err);
        }
    };


    const inputStyle: React.CSSProperties = {
        height: '48px',
        borderRadius: '4px',
    };

    const inputGroupTextStyle: React.CSSProperties = {
        height: '48px',
        backgroundColor: 'white',
        borderColor: '#ced4da',
        color: customStyles.primaryColor,
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const passwordToggleStyle: React.CSSProperties = {
        cursor: 'pointer',
        backgroundColor: 'white',
        borderColor: '#ced4da',
    }

    const formGroupStyle: React.CSSProperties = {
        marginBottom: '1rem', // Standard margin for a compact, two-column form
    }
    // --- End Styling Adjustments ---

    return (
        <div
            style={{
                backgroundColor: customStyles.backgroundColor,
                minHeight: "100vh",
            }}
            className="d-flex flex-column col-12"
        >
            <Container className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
                <div className="d-flex justify-content-center w-100">
                    <Card
                        className="shadow-lg border-0"
                        style={{
                            maxWidth: "800px",
                            borderRadius: "10px",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",

                        }}
                    >
                        <Card.Body style={{ padding: '2.5rem' }} className="d-flex flex-column col-12">
                            {/* Logo and Title Section */}
                            <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
                                <img
                                    src={logo}
                                    alt="Obeeoma Logo"
                                    style={{
                                        height: "50px",
                                        width: "auto"
                                    }}
                                    className="mb-1"
                                />


                            </div>

                            <h3 className="text-center mb-2 fw-semibold text-dark" style={{ fontFamily: "heading" }}>
                                Create your Organisation account
                            </h3>
                            <p className="text-center mb-4 text-muted" style={{ fontSize: '1rem' }}>
                                Get early access to Obeeoma and empower your team with smarter mental health support. Please fill in the required details below.
                            </p>
                            {error && (<Alert variant="danger" dismissible>{error}</Alert>)}

                            {/* Form Section */}
                            <Formik
                                validationSchema={registerValidationSchema}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <FormikForm noValidate onSubmit={handleSubmit}>
                                        <Row>
                                            {/* Column 1 Fields (Left) */}
                                            <Col md={6}>
                                                {/* Organization Name */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faBuilding} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            name="organizationName"
                                                            placeholder="Organization Name"
                                                            value={values.organizationName}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.organizationName && !!errors.organizationName}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="organizationName" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>

                                                {/* Organization Email Address */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="email"
                                                            name="companyEmail"
                                                            placeholder="Organization Email Address"
                                                            value={values.companyEmail}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.companyEmail && !!errors.companyEmail}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="companyEmail" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>

                                                {/* Organization Size (Dropdown) */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faSitemap} /></InputGroup.Text>
                                                        <BootstrapForm.Select
                                                            name="organisationSize"
                                                            value={values.organisationSize}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.organisationSize && !!errors.organisationSize}
                                                        >
                                                            {organisation_size_options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </BootstrapForm.Select>
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="organisationSize" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>

                                                {/* Location */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            name="Location"
                                                            placeholder="Organization Location (e.g., State)"
                                                            value={values.Location}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.Location && !!errors.Location}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="Location" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>

                                            {/* Column 2 Fields (Right) */}
                                            <Col md={6}>
                                                {/* Contact Person Full Name */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            name="contactPersonName"
                                                            placeholder="Contact Person Full Name"
                                                            value={values.contactPersonName}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.contactPersonName && !!errors.contactPersonName}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="contactPersonName" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>

                                                {/* Contact Email Address */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="email"
                                                            name="email"
                                                            placeholder="Contact Email Address"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.email && !!errors.email}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="email" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>

                                                {/* Contact Person Role (Dropdown) */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faUserTie} /></InputGroup.Text>
                                                        <BootstrapForm.Select
                                                            name="contactPersonRole"
                                                            value={values.contactPersonRole}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.contactPersonRole && !!errors.contactPersonRole}
                                                        >
                                                            {contact_role_options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </BootstrapForm.Select>
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="contactPersonRole" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>

                                                {/* Contact Person's Phone Number */}
                                                <BootstrapForm.Group style={formGroupStyle}>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faPhone} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="tel"
                                                            name="phoneNumber"
                                                            placeholder="Contact Person's Phone Number"
                                                            value={values.phoneNumber}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.phoneNumber && !!errors.phoneNumber}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid"><ErrorMessage name="phoneNumber" /></BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>

                                            {/* Passwords - Full Width at the Bottom (using Col md=6 for two side-by-side inputs) */}
                                            <Col md={6}>
                                                {/* Password */}
                                                <BootstrapForm.Group style={formGroupStyle} controlId="password">
                                                    <InputGroup>
                                                        {/* No prepended icon for a cleaner password field next to the other column fields */}
                                                        <BootstrapForm.Control
                                                            type={showPassword ? "text" : "password"}
                                                            name="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            placeholder="Password"
                                                            style={inputStyle}
                                                            isInvalid={touched.password && !!errors.password}
                                                        />
                                                        <InputGroup.Text
                                                            onClick={togglePasswordVisibility}
                                                            style={passwordToggleStyle}
                                                        >
                                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEyeRegular} style={{ color: customStyles.primaryColor }} />
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                    {/* Using d-block to ensure it displays correctly within the custom layout */}
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback d-block" />
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                {/* Confirm Password */}
                                                <BootstrapForm.Group style={formGroupStyle} controlId="confirmPassword">
                                                    <InputGroup>
                                                        <BootstrapForm.Control
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            name="confirmPassword"
                                                            value={values.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder="Confirm Password"
                                                            style={inputStyle}
                                                            isInvalid={!!touched.confirmPassword && !!errors.confirmPassword}
                                                        />
                                                        <InputGroup.Text
                                                            onClick={toggleConfirmPasswordVisibility}
                                                            style={passwordToggleStyle}
                                                        >
                                                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEyeRegular} style={{ color: customStyles.primaryColor }} />
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback d-block" />
                                                </BootstrapForm.Group>
                                            </Col>

                                            {/* Sign up Button - Now in a full-width Col (12) to match the outer form content width */}
                                            <Col md={12} className="mt-2 mb-3"> 
                                                <Button
                                                    type="submit"
                                                    className="w-100 py-3 fw-semibold"
                                                    disabled={isLoading}
                                                    style={{
                                                        backgroundColor: customStyles.primaryColor,
                                                        borderColor: customStyles.primaryColor,
                                                        color: "white",
                                                        boxShadow: "none",
                                                        fontFamily: "body",
                                                    }}
                                                >
                                                    {isLoading ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" style={{ fontFamily: "heading" }} />Signing Up...</>) : ("Sign up")}
                                                </Button>
                                            </Col>

                                        </Row>
                                        
                                        {/* Already have an account link - Placed outside the Row for full-width alignment */}
                                        <p className="text-center mt-3 text-muted">
                                            Already have an account? <Link to="/login" style={{ color: customStyles.primaryColor, textDecoration: "none", fontWeight: "600" }}>Log in</Link>
                                        </p>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </div>
            </Container>

            {/* Footer Section */}
            <footer
                className="text-center text-muted py-3 small border-top"
                style={{
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    fontFamily: "body"
                }}
            >
                <Container className="d-flex justify-content-between align-items-center">
                    <div className="footer-copyright" >
                        &copy; 2025 {customStyles.logoText}. All rights reserved.
                    </div>

                    <div className="d-flex align-items-center">
                        <Link
                            className="text-muted text-decoration-none me-3"
                            style={{ fontFamily: "body" }}
                            role="button"
                            to="/privacy-policy"
                        >
                            Privacy Policy
                        </Link>

                        <a
                            href="#"
                            className="text-muted text-decoration-none me-3"
                            style={{ fontFamily: "body" }}
                        >
                            Terms of Service
                        </a>

                        <a
                            href="#"
                            className="text-muted text-decoration-none"
                            style={{ fontFamily: "body" }}
                        >
                            Contact Us
                        </a>
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Register;
