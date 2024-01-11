import * as z from "zod";

// define a schema for input validation
export const SignUpFormSchemaBackend = z.object({
  name: z.string().min(1, "name is required").max(255),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  dot_lsa_location: z.string().min(1, "Please select a Location"), // Assuming dot_Lsa
});

export const SignUpFormSchemaFrontend = z
  .object({
    name: z.string().min(1, "name is required").max(255),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    dot_lsa_location: z.string().min(1, "Please select a Location"), // Assuming dot_Lsa
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const SignInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const ResetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});
