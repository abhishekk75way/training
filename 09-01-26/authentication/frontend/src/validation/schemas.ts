import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema;

export const resetPasswordSchema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters"),
});
