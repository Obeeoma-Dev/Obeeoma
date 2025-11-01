import * as yup from "yup";

export const loginValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const registerValidationSchema = yup.object({
  username: yup.string().required("Username is required").min(3),
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(8, 'Password is too short Should be 8 characters minimum.' ),
  //.matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const forgotPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
});

export const resetPasswordValidationSchema = yup.object({
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
