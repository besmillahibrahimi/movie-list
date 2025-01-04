import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email").max(50),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters")
    .max(50, "It's good to have password with max length 50 characters"),
  rememberMe: z.boolean().optional(),
});
export type LoginType = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  name: z.string().max(50),
  email: z.string().email("Enter a valid email").max(50),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters")
    .max(50, "It's good to have password with max length 50 characters"),
});
export type SignupType = z.infer<typeof SignupSchema>;
