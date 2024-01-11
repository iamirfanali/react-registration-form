import * as yup from "yup";

export const registrationSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .notOneOf(["hello"], "Username 'hello' is already taken"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
