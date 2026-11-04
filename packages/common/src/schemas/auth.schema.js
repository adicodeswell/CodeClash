import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can contain letters, numbers, and underscores only",
      ),

    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .transform((value) => value.toLowerCase()),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long"),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .transform((value) => value.toLowerCase()),
    password: z.string().min(1, "Password is required").max(128),
  })
  .strict();
