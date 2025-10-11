import * as yup from "yup";
export const loginValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
export const registerValidationSchema = yup.object({
  username: yup.string().required("Username is required").min(3),
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
//
