import { z } from "zod";

export const registerValidator = z.object({

  name: z.string({
    required_error: "Please enter your name"
  })
  .min(2)
  .max(100)
  .trim(),

  email: z.string({
    required_error: "Please enter your email"
  })
  .email("Invalid email")
  .transform(v => v.toLowerCase().trim()),

  password: z.string({
    required_error: "Please enter a password"
  })
  .min(6),

  surname: z.string().max(100).optional(),

  phoneNumber: z.string().optional(),
});

export const loginValidator = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});