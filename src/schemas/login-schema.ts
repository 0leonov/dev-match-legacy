import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email ir required." }),
  password: z.string().min(1, { message: "Password ir required." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
