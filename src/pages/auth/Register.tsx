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

const customStyles = {
    primaryColor: "#3CB371",
    backgroundColor: "#f0f2f5",
    logoText: "Obeeoma",
};

const organisation_size_options = [
    { label: "Select Size", value: "" },
    { label: "1-10 Employees", value: "1-10" },
    { label: "11-50 Employees", value: "11-50" },
    { label: "51-200 Employees", value: "51-200" },
    { label: "201-500 Employees", value: "201-500" },
    { label: "500+ Employees", value: "500+" },
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
    email: string;
    phoneNumber: string;
    organisationSize: number | string; 
    companyEmail: string;
    Location: string;
    password: string;
    confirmPassword: string;
};

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
            contactPerson: [
                {
                    fullname: values.contactPersonName,
                    role: values.contactPersonRole,
                    email: values.email,
                },
            ],
        };

        try {
            await dispatch(registerUser(credentials)).unwrap();
            navigate("/login", { replace: true });
        } catch (err) {
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

    const labelStyle: React.CSSProperties = {
        fontWeight: 500,
        marginBottom: '0.25rem',
        fontSize: '0.9rem',
        color: '#333',
    };


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
                            maxWidth: "600px", 
                            width: "100%", 
                            borderRadius: "10px", 
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                            
                        }}
                    >
                        <Card.Body style={{ padding: '2.5rem' }} className="d-flex flex-column col-12">
                            <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
                                <img
                                    src={logo}
                                    alt={`${customStyles.logoText} Logo`}
                                    width="100"
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

                            <Formik
                                validationSchema={registerValidationSchema}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <FormikForm noValidate onSubmit={handleSubmit}>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Organization Name</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="organizationName" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Contact Person Full Name</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="contactPersonName" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Organization Email Address</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="companyEmail" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Contact Email Address</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="email" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Organization Size</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="organisationSize" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Contact Person Role</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="contactPersonRole" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Location</BootstrapForm.Label>
                                                    <InputGroup>
                                                        <InputGroup.Text style={inputGroupTextStyle}><FontAwesomeIcon icon={faMapMarkerAlt} /></InputGroup.Text>
                                                        <BootstrapForm.Control
                                                            type="text"
                                                            name="Location"
                                                            placeholder="Organization Location (e.g., City, Country)"
                                                            value={values.Location}
                                                            onChange={handleChange}
                                                            style={inputStyle}
                                                            isInvalid={!!touched.Location && !!errors.Location}
                                                        />
                                                    </InputGroup>
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="Location" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3">
                                                    <BootstrapForm.Label style={labelStyle}>Contact Person's Phone Number</BootstrapForm.Label>
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
                                                    <BootstrapForm.Control.Feedback type="invalid">
                                                        <ErrorMessage name="phoneNumber" />
                                                    </BootstrapForm.Control.Feedback>
                                                </BootstrapForm.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-3" controlId="password">
                                                    <BootstrapForm.Label style={labelStyle}>Password</BootstrapForm.Label>
                                                    <InputGroup>
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
                                                    <ErrorMessage name="password" component="div" className="invalid-feedback d-block" />
                                                </BootstrapForm.Group>
                                            </Col>

                                            <Col md={6}>
                                                <BootstrapForm.Group className="mb-4" controlId="confirmPassword">
                                                    <BootstrapForm.Label style={labelStyle}>Confirm Password</BootstrapForm.Label>
                                                    <InputGroup>
                                                        <BootstrapForm.Control
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            value={values.confirmPassword}
                                                            onChange={handleChange}
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
                                        </Row>

                                        <Button
                                            type="submit"
                                            className="w-100 mb-3 py-3 fw-semibold"
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
            <footer
                className="text-center text-muted py-3 small border-top"
                style={{
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    fontFamily: "body"
                }}
            >
                <div className="d-flex justify-content-between align-items-center container">
                    <div className="footer-copyright" >
                        &copy; 2025 {customStyles.logoText}. All rights reserved.
                    </div>

                    <div className="d-flex align-items-center">
                        <Link
                            className="text-muted text-decoration-none me-3"
                            style={{ fontFamily: "body" }}
                            role="button"
                            to="/system-admin"
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
                </div>
            </footer>
        </div>
    );
};

export default Register;