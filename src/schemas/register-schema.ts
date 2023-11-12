import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be longer than 3 characters.")
    .max(32, "Name must be shorten than 32 characters."),
  username: z
    .string()
    .min(3, "Username must be longer than 3 characters.")
    .max(32, "Username must be shorten than 32 characters.")
    .refine(
      (value) => /^[a-zA-Z0-9_]+$/.test(value),
      "Username can only consist of Latin characters, numbers and underscores.",
    ),
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .min(6, "Password must be longer than 6 characters.")
    .max(255, "Password must be shorter than 255 characters."),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
