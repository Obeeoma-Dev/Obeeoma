import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const loginValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});


// Step 1: Organization Details Validation
export const organizationStepSchema = yup.object().shape({
  organizationName: yup
    .string()
    .required("Organization Name is required"),
  
  companyEmail: yup
    .string()
    .email("Must be a valid email format")
    .required("Organization Email Address is required"),
  
  organisationSize: yup
    .number()
    .oneOf([10, 50, 200, 500, 600], "Please select a valid organization size")
    .required("Organization Size is required"),
  
  Location: yup
    .string()
    .required("Location is required"),
  
  otherLocation: yup
    .string()
    .when('Location', {
      is: 'OTHER',
      then: (schema) => schema.required('Please specify your location'),
      otherwise: (schema) => schema.notRequired()
    })
});

// Step 2: Contact Details Validation
export const contactStepSchema = yup.object().shape({
  contactPersonFirstName: yup 
    .string()
    .required("First Name is required"),
  
  contactPersonLastName: yup 
    .string()
    .required("Last Name is required"),
  
  email: yup
    .string()
    .email("Must be a valid email format")
    .required("Contact Email Address is required"),
  
  contactPersonRole: yup
    .string()
    .oneOf(["CEO", "HR_MANAGER", "RECRUITER", "OFFICE_MANAGER", "OTHER"], "Please select a valid role")
    .required("Contact Person Role is required"),
  
  otherContactPersonRole: yup
    .string()
    .when('contactPersonRole', {
      is: 'OTHER',
      then: (schema) => schema.required('Please specify your role'),
      otherwise: (schema) => schema.notRequired()
    }),
  
  phoneNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format") // E.164 format
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Contact Person's Phone Number is required"),
  
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, { 
      message: "Password must contain 1 uppercase letter, 1 lowercase letter, 1 character and 1 number" 
    })
    .required("Password is required"),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Confirm Password is required")
});

export const getStepValidationSchema = (step: number) => {
  switch (step) {
    case 0:
      return organizationStepSchema;
    case 1:
      return contactStepSchema;
    default:
      return yup.object().shape({}); 
  }
};


// export const registerValidationSchema = yup.object().shape({
//   // Obeeoma Fields
//   organizationName: yup
//       .string()
//       .required("Organization Name is required"),

//   companyEmail: yup
//       .string()
//       .email("Must be a valid email format")
//       .required("Organization Email Address is required"),

//   organisationSize: yup
//       .number()
//       .oneOf([ 10,50, 200, 500, 600], "Please select a valid organization size")
//       .required("Organization Size is required"),

//   Location: yup
//       .string()
//       .required("Location is required"),

// //  Location: yup.object()
// //     // Check if the Location object is present and valid
// //     .required('A location is required.') // <--- This assigns a simple string error
// //     .nullable(),

//   contactPersonFirstName: yup 
//     .string()
//     .required("First Name is required"), // Specific error message

//   contactPersonLastName: yup 
//     .string()
//     .required("Last Name is required"), // Specific error message

//   email: yup
//       .string()
//       .email("Must be a valid email format")
//       .required("Contact Email Address is required"),

//   contactPersonRole: yup
//       .string()
//       .oneOf(["CEO", "HR_MANAGER", "RECRUITER", "OFFICE_MANAGER", "OTHER"], "Please select a valid role")
//       .required("Contact Person Role is required"),

//   phoneNumber: yup
//       .string()
//       // Simple regex for a typical phone number format check (you may need to adjust this for specific international standards)
//       .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, "Invalid phone number format")
//       .min(10, "Phone number must be at least 10 digits")
//       .required("Contact Person's Phone Number is required"),
      
//   // Password Fields
//   password: yup
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .matches(passwordRules, { message: "[Password must contain 1 uppercase letter, 1 lowercase letter, and 1 number.]" })
//       .required("Password is required"),

//   confirmPassword: yup
//       .string()
//       .oneOf([yup.ref('password'),], "Passwords must match")
//       .required("Confirm Password is required"),
// });

export const resetPasswordValidationSchema = yup.object({
 email: yup
    .string()
    .email("Enter a valid email") // Ensures the format is like an email
    .required("Email address is required"), // Ensures the field is not empt
  new_password: yup
    .string()
    .required("New Password is required")
    .min(8, "Password must be at least 8  characters"),
  confirm_password: yup
      .string()
      .oneOf([yup.ref('new_password'),], "Passwords must match")
      .required("Confirm Password is required"),

});

export const changePasswordValidationSchema = yup.object({
  old_password: yup
    .string()
    .required("Old Password is required"),
  new_password: yup
    .string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, { message: "Password must contain 1 uppercase letter, 1 lowercase letter, 1 character and 1 number" }),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], "Passwords must match")
    .required("Confirm Password is required"),
});
